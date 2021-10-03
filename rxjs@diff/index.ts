#!/usr/bin/env ts-node

import { produce } from 'immer';
import { applyPatch, compare, deepClone } from 'fast-json-patch';
import { none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { filterMap } from 'fp-ts-rxjs/lib/Observable';
import { tap } from 'rxjs/operators';
import { from, identity, MonoTypeOperatorFunction } from 'rxjs';

export const diff = <A>(): MonoTypeOperatorFunction<A> => s => {
	let previous: A;
	return pipe(
		s,
		filterMap(a => {
		if (typeof previous === 'undefined' || compare(previous, a).length > 0) {
			previous = deepClone(a);
			return some(a);
		}
		return none;
	});
};

const diffWithMap = <A, B>(f?: (a: A) => B): MonoTypeOperatorFunction<A> => fa => {
	let previous: A | B;
	return pipe(
		fa,
		filterMap((a: A) => {
			const b = f ? f(a) : a;
			if (
				typeof previous === 'undefined' ||
				(typeof b === 'object' ? compare(previous, b).length > 0 : previous !== b)
			) {
				previous = deepClone(b);
				return some(a);
			}
			return none;
		}),
	);
};

const baseState = [
	{
		todo: 'Learn typescript',
		done: true,
	},
	{
		todo: 'Try immer',
		done: false,
	},
];

const nextState = produce(baseState, draftState => {
	draftState.push({ todo: 'Tweet about it', done: false });
	draftState.push(draftState[1]);
	draftState.push(draftState[1]);
	// draftState[1].done = true;
});

const patch = compare(baseState, nextState);
const baseStatePatched = applyPatch(baseState, patch, false, true, true);

console.log('compare', compare(true, false));
// console.log(JSON.stringify({ baseState, nextState, patch, baseStatePatched }, null, 2));
console.log(JSON.stringify({ nextState }, null, 2));

pipe(
	from(nextState),
	diff(({ done }) => done),
	// eslint-disable-next-line no-console
	tap(value => console.log('## diff', value)),
).subscribe();
