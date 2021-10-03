
Создал(а) Vyacheslav Gerasimov, редактировал(а) Sergey Makoveev апр 23, 2020

# Sink and Context monads

## Preface
The aim of this article is to clarify the meaning behind Sink monad and its usage. It also touches upon Context and its helpers, due to Sink's integration with Context. We'll take the bottom-up approach and start with Sink itself, then move on to Context, discuss its helpers and finally talk about the practical side of things. The code could be found here. The main focus is put on these particular files/versions: sink.utils and context.utils, as they are mostly self-contained and easier to dissect.

## Sink
So what is it exactly? By the type definition it's clear that it implements a Monad typeclass, but what effect does it encapsulate? Let's take a look at the code. There are two main exports:

```ts
export class Sink<A>;
export const sink: Monad1<URI>;
The instance(sink) simply creates class instances and uses their methods to implement the Monad interface. So it's sufficient to look at the class definition to know what is going on:

constructor(
    readonly value: A,
    readonly sink$: Observable<unknown> = EMPTY
) {}
```

The constructor takes some value of a generic type and an observable, which defaults to EMPTY. So the class instance always contains an arbitrary value and an observable.

`map` method applies the function, while also preserving the observable, passing it to the new Sink instance:

```ts
map<B>(f: (a: A) => B): Sink<B> {
	return new Sink(f(this.value), this.sink$);
}
```

`ap` creates a new instance, applying the unwrapped function and merging the observables.

```ts
ap<B>(fab: Sink<(a: A) => B>): Sink<B> {
	return new Sink(fab.value(this.value), merge(fab.sink$, this.sink$));
}
```

`chain` follows the same logic, taking a value and an observable from a function result, then creating a new instance with an updated value and combined observables.

```ts
chain<B>(f: (a: A) => Sink<B>): Sink<B> {
	const fb = f(this.value);
	return new Sink(fb.value, merge(fb.sink$, this.sink$));
}
```

All in all Sink doesn't do much. Its computational context could simply be described as "A value with(or followed by) an observable". In fact, this concept(a value "followed" by an accumulator(a monoid)) is not unique to Sink - it is basically a Writer monad applied to observable and alternatively could be defined as

```ts
import { getMonad } from 'fp-ts/lib/Writer';
import { EMPTY, merge } from 'rxjs';

const sink = getMonad({
  empty: EMPTY,
  concat: (a, b) => merge(a, b),
});
```

## Context

The Context monad mirrors the behavior of Reader, with the addition of Sink, as seen in the constructor:

```ts
constructor(readonly run: (e: E) => Sink<A>) {}
```

Type-wise it could be described as

```ts
type Context<E, A> = (e: E) => Sink<A>;
```

which in turn translates to

```ts
type Context<E, A> = Reader<E, Sink<A>>;
```

Now it should be quite obvious that what we have here is a monad within a monad(or Writer value in the context of Reader). While it's somewhat out of scope of this article, we should take a look at the monad transformer, which is used in Context implementation:

```ts
import { getReaderM } from 'fp-ts/lib/ReaderT';
const readerTSink = getReaderM(sink);
```

Essentially this allows us to apply Reader's functions, while also using the passed monad instance to unwrap the value inside of a Reader. This way we can map, ap or chain Context, while also being aware of the Sink inside. To gain a better understanding of how is this implemented, let's look at an excerpt from the source:

```ts
export function getReaderM<M>(M: Monad<M>): ReaderM<M> {
  return {
    map: (ma, f) => r => M.map(ma(r), f),
    of: a => () => M.of(a),
    ap: (mab, ma) => r => M.ap(mab(r), ma(r)),
    chain: (ma, f) => r => M.chain(ma(r), a => f(a)(r)),
  }
}
```

`map` takes a stacked monad `ma(Reader<E, Sink<A>>)` and a mapping function `f((a: A) => B)`, which should be applied to the inner monad's value. It returns a Reader, which upon execution will first unwrap its value by passing dependencies, then will use the inner monad(Sink in our case) instance to map f over the result. Other functions follow the same pattern of unwrapping the Reader and using the provided monad instance.

In conclusion, Context is a Reader with a Sink(Writer) within, which represents the resolved value. It is a computation, which requires dependencies to resolve, where the resolution result is also a monadic value with the added context of an accumulating observable.

## Context helpers
Neither Sink, nor Context are used "as is", so it's important to understand how do their helpers work before moving on.

### combineContext
```ts
const combineContext: CombineContext = <E, A, R>(
	...args: Array<Context<E, A> | ProjectMany<A, R | Sink<R>>>
) => {
	const fas: Context<E, A>[] = args.slice(0, args.length - 1) as any; //
	const project: ProjectMany<A, R | Sink<R>> = args[args.length - 1] as any;
	const sequenced: Context<E, A[]> = sequenceContext(fas);
	return sequenced.chain(
		as =>
			new Context(() => {
				const result = project(...as);
				return result instanceof Sink ? result : new Sink(result);
			}),
	);
};
```

It may look intimidating at first, but the essense of it is quite simple:

1) We take several instances of Context and a projection function, which takes our resolved dependencies and returns either simply a value or a Sink instance(that is, a value with an observable).

2) fas variable has the type of `Context<E, A>[]`, so we sequence it to apply chain to all Context values at once. Since we're using the Context's monad instance, defined with a monad transformer, all Sinks are also sequenced, which means their observables will be merged.

3) Inside the chain method we call the project function, lifting its result to Sink, if necessary. chain will join our Readers, while also merging the result's observable with the combined sequenced observable.

The result is a Context with combined Reader dependencies as well as merged Sinks inside.

### deferContext

```ts
export const deferContext = <E extends object, A, K extends keyof E>(
	fa: Context<E, A>,
	...keys: K[]
): Context<Omit<E, K>, Context<Pick<E, K>, A>> =>
	new Context(outerE => new Sink(new Context(innerE => fa.run(Object.assign({}, outerE, innerE) as E))));
```

This helper is a bit simpler: it takes a part of the Context and puts it inside another Context. If we were to use the resolved value in a projection function, we would get an unresolved Context with the "deferred" part. The outer part, however, will lose the "deferred" dependencies and they will not propagate any further. To summarize, it allows us to remove some of the dependencies from Context type and apply them inside of the project function.

## Motivation
Finally, time to discuss the problem that led to the creation of Context with Sink. Imagine we have to create an observable that doesn't have a value: it simply emits a side effect(like a subscription or a "send" operation).

```ts
// this logic is reused through 'createHandler'
const subject = new Subject<void>();
const effect$ = subject.asObservable();
const onAction = subject.next.bind(subject);

const send$ = effect$.pipe(tap(() => console.log('SEND')));
```

Now if we decide to use onAction to trigger send$ in withRX(or anywhere, really), simply providing a handle is not enough. We need a subscription to track this call. But where should we subscribe? Keep in mind that this case is not specific to one entity such as container, view-model or store. There is also no indication of which observables require subscription and which don't. withRX provides a solution in form of effects$ field, but what about view-model? We could simply subscribe inside of each one, but then the subscription is in no way bound to our React components' lifecycle: we can't control(and cancel) our subscriptions.

The other problem is that there is no uniform interface between different entities: we could add an effects field to view-model return type, but then we should always remember(by convention) to subscribe when we're using it. Same applies to the store. Considering that these entities are reused, combined and nested throughout the project(with combineContext), this could become hard to track.

The solution we use is a new abstraction, which represents a value with a bound observable, which contains merged observables that require a subscription. In another words, it is our Sink, contained inside of a Reader. We say that the Context is not simply a Reader, but a Reader with an effectful Sink value. This allows us to build Context-aware helpers(such as runOnMount), that manage subscriptions based on the knowledge that the value inside of a Context could contain a Sink with an observable. Here is the code from runOnMount that does exactly that, assuming that the e variable is the value unpacked from Reader:

```ts
if (e instanceof Sink) {
	this.effectSubscription = e.sink$.subscribe();
}
```

Not only that, but we get the automatic management from combineContext, meaning that not only our Reader dependencies get combined, but our effectful observables inside of them as well.

## To summarize:
We solve the problem of the effect subscriptions by binding them to a computation for later processing.
We make use of the common Monad interface, with no dependence on the particular entity(view-model, container, etc).
As a consequence, it allows us to generalize operations over the Context, allowing for easier effect tracking and control.

## The end
Hopefully that sheds some light on the subject of Sink and Context. If you're interested in how is this concept maps to Reader and Writer, you can check out this demo, which only uses Reader and Writer to implement the same pattern. Thanks for reading.