#!/usr/bin/env ts-node

/**
 * [Функциональное программирование на TypeScript: полиморфизм родов высших порядков](https://habr.com/ru/post/526024/)
 * [Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
 */

//
interface MappableArray {
	readonly map: <A, B>(f: (a: A) => B) => (as: A[]) => B[];
}

type MapForArray = <A, B>(f: (a: A) => B) => (as: Array<A>) => Array<B>;
type MapForSet = <A, B>(f: (a: A) => B) => (as: Set<A>) => Set<B>;
type MapForMap = <A, B>(f: (a: A) => B) => (as: Map<string, A>) => Map<string, B>;

type Identity<A> = A;
type MapForIdentity = <A, B>(f: (a: A) => B) => (as: Identity<A>) => Identity<B>;

// const map: MapForArray = <A, B>(f: (a: A) => B) => (as: Array<A>) => as.map(f);
// console.log(map((v: number) => v + 1)([1, 2, 3, 4]));

// interface Mappable<F> {
// 	// Type 'F' is not generic. ts(2315)
// 	readonly map: <A, B>(f: (a: A) => B) => (as: F<A>) => F<B>;
// }

// словарь для типов 1-арности: Array, Set, Tree, Promise, Maybe, Task...
interface URItoKind<A> {
	Array: Array<A>;
	Set: Set<A>;
	Promise: Promise<A>;
	Identity: Identity<A>;
}

// словарь для типов 2-арности: Map, Either, Bifunctor...
interface URItoKind2<A, B> {
	Map: Map<A, B>;
}

type URIS = keyof URItoKind<unknown>; // тип-сумма всех «имён» типов 1-арности
type URIS2 = keyof URItoKind2<unknown, unknown>; // все типы 2-арности

type Kind<F extends URIS, A> = URItoKind<A>[F];
type Kind2<F extends URIS2, A, B> = URItoKind2<A, B>[F];

interface Mappable<F extends URIS> {
	readonly map: <A, B>(f: (a: A) => B) => (as: Kind<F, A>) => Kind<F, B>;
}

const mappableArray: Mappable<'Array'> = {
	// здесь `as` будет иметь тип A[], без какого-либо упоминания служебного конструктора `Kind`:
	map: f => as => as.map(f),
};

const mappableSet: Mappable<'Set'> = {
	// немного нечестно — можно сделать эффективнее, перебирая итератор для множества вручную,
	// но цель этой статьи не сделать максимально эффективную реализацию, а объяснить концепцию
	map: f => as => new Set(Array.from(as).map(f)),
};

const mappableIdentity: Mappable<'Identity'> = {
	map: f => as => f(as),
};

// const myMap = new Map([
// 	[1, 'one'],
// 	[1, 'one'],
// 	[2, 'two'],
// ]);
// console.log(
// 	myMap,
// 	Array.from(myMap),
// 	myMap.get(1),
// 	myMap.size,
// 	myMap.values(),
// 	Array.from(myMap.values()),
// 	myMap.keys(),
// 	Array.from(myMap.keys()),
// );
