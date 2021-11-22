#!/usr/bin/env ts-node

import { Option, some, none, option } from 'fp-ts/lib/Option';
import { array } from 'fp-ts/lib/Array';
import { liftA2, liftA4 } from 'fp-ts/lib/Apply';
import { Function1 } from 'fp-ts/lib/function';

// Task: find the total age of two users

type TPerson = {
	name: string;
	// age: number;
	age: Option<number>;
	// age: Either<Error, number>;
};

const data: Array<TPerson> = [
	{ name: 'Oleg', age: some(43) },
	{ name: 'Denis', age: none },
];

const sum = (x: number) => (y: number): number => x + y;

const getPersonAgesSum = (data: Array<TPerson>): Option<number> => {
	// const getPersonAgesSum = (data: Array<TPerson>): Option<number> => {
	// const getPersonAgesSum = (data: Array<TPerson>): Either<Error, number> => {

	const x = data[0].age; // Option<number> { value: 43, tag: 'some' }
	const y = data[1].age; // { tag: 'none' }

	// return sum(x)(y);

	// const result = x.map(x => {
	//     return y.map(y => {
	//         return sum(x)(y);
	//     });
	// });
	// return result;

	const fOpt = x.map(x => sum(x)); // Option<a -> b>

	// if (fOpt.isSome() && y.isSome()) {
	//     return some(fOpt.value(y.value));
	// }
	// return none;

	// const ap = <A, B>(f: Option<Function1<A, B>>, v: Option<A>): Option<B> => {
	//     if (f.isSome() && v.isSome()) {
	//         return some(f.value(v.value));
	//     }
	//     return none;
	// }

	// return ap(fOpt, y); // Option<number>

	return y.ap(fOpt);
};

const result = getPersonAgesSum(data);
console.log({ result });

// Lift

const x1 = some(1);
const x2 = some(2);
const x3 = some(3);
const x4 = some(4);

const sum2res = x2.ap(x1.map(sum));
console.log({ sum2res });

const sum4 = (x: number) => (y: number) => (z: number) => (w: number): number => x + y + z + w;

const sum4res = x4.ap(x3.ap(x2.ap(x1.map(sum4))));
console.log({ sum4res });

// const liftA4 => context => f => a => b => x => y => y.ap(x.ap(b.ap(a.map(f))));

const sum4res2 = liftA4(option)(sum4)(x1)(x2)(x3)(x4);
console.log({ sum4res2 });

const sum4res3 = liftA4(option)(sum4)(x1)(x2)(none)(x4);
console.log({ sum4res3 });

// Rules

const identity = <A>(v: A): A => v;
const compose = <A, B, C>(f: Function1<B, C>) => (g: Function1<A, B>) => (x: A): C => f(g(x));

const x = some('v');
const f = (n: string): string => `f(${n})`;
const g = (n: string): string => `g(${n})`;

// Identity law
const identityRes = x.ap(some(identity));
console.log({ identity_res: identityRes });

// Composition law
const composeRes1 = x.ap(some(g).ap(some(f).map(f => compose(f))));
const composeRes2 = x.ap(some(g)).ap(some(f));
console.log({ compose_res_1: composeRes1, compose_res_2: composeRes2 });
console.log(x.ap(some(g)));

const a = some(1);
const b = some(1);
const equals = (a: number) => (b: number): boolean => a === b;
const isEquals = liftA2(option)(equals)(a)(b);
console.log({ is_equals: isEquals });

// const item = some(1);
// const list = [some(1), some(2), some(3)];
// const includes = (item: number) => (list: Option<number>[]): boolean =>
// 	list.some(list_item => list_item.map(list_item_value => list_item_value === item));
// list.ap(item.ap(x => x.map(includes)))
// const is_includes = liftA2(array)(liftA2(option)(includes));
// is_includes(item)(list);
