#!/usr/bin/env ts-node

/**
 * https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e
 * https://medium.com/@stephaneledorze/the-contravariant-functor-a7ae93e2eae0
 * https://gitmemory.com/issue/gcanti/fp-ts/795/477580914
 */

import { eq } from 'fp-ts';
import { eqNumber } from 'fp-ts/lib/Eq';
import { contramap, ordNumber, Ord, getDualOrd, reverse } from 'fp-ts/lib/Ord';
import { distinctUntilChanged, pipe, tap } from 'rxjs';
import { fromArrayLike } from 'rxjs/internal/observable/from';

type User = {
	name: string;
	age: number;
};

function min<A>(O: Ord<A>): (x: A, y: A) => A {
	return (x, y) => (O.compare(x, y) === 1 ? y : x);
}

function max<A>(O: Ord<A>): (x: A, y: A) => A {
	return min(reverse(O));
}

const byAge: Ord<User> = contramap((user: User) => user.age)(ordNumber);

const getYounger = min(byAge);
const getOlder = max(byAge);

const younger = getYounger({ name: 'Guido', age: 48 }, { name: 'Giulio', age: 45 });
const older = getOlder({ name: 'Guido', age: 48 }, { name: 'Giulio', age: 45 });

console.log({ younger, older });

// ---------------------------------------------

type Quote = {
	id: string;
	quote: number;
};

const quotes: Array<Quote> = [
	{ id: '1', quote: 1 },
	{ id: '2', quote: 1 },
	{ id: '3', quote: 3 },
	{ id: '4', quote: 3 },
	{ id: '5', quote: 4 },
];

const ordQuote = contramap((quote: Quote) => quote.quote)(ordNumber);

fromArrayLike(quotes)
	.pipe(
		distinctUntilChanged(ordQuote.equals),
		tap(value => console.log('## ', { value })),
	)
	.subscribe();

// ---------------------------------------------

const ordDescQuote = reverse(ordQuote);

const sortedAscQuotes = quotes.sort(ordQuote.compare);
const sortedDescQuotes = quotes.sort(ordDescQuote.compare);

console.log({ sortedAscQuotes, sortedDescQuotes });
