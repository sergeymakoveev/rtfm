#!/usr/bin/env ts-node

/**
 * [Функциональное программирование на TypeScript: полиморфизм родов высших порядков](https://habr.com/ru/post/526024/)
 * [How to write type class instances for your data type](https://gcanti.github.io/fp-ts/guides/HKT.html)
 */

import { Functor1 } from 'fp-ts/lib/Functor';

type Identity<A> = A;

// const add = <F extends number | string>(a: F, b: F) => a + b;
// Identity.ts

const IdentityURI = 'Identity';

type URI = typeof IdentityURI;

declare module 'fp-ts/lib/HKT' {
	interface URItoKind<A> {
		readonly Identity: Identity<A>;
	}
}

// Functor instance
export const identity: Functor1<URI> = {
	URI: IdentityURI,
	map: (ma, f) => f(ma),
};
