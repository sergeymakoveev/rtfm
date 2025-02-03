#!/usr/bin/env ts-node

export function memo(fn) {
	let memoized: Array<{ memoizedArgs: Array<unknown>; memoizedResult: Array<unknown> }> = [];
	return function (...args) {
		const memoizedIndex = memoized.findIndex(({ memoizedArgs }) =>
			args.map((arg, index) => arg === memoizedArgs[index]).reduce((acc, value) => acc && value, true),
		);
		if (memoizedIndex !== -1) {
			return memoized[memoizedIndex].memoizedResult;
		}

		const result = fn(...args);
		memoized = [...memoized, { memoizedArgs: args, memoizedResult: result }];
		return result;
	};
}

function sum(a: number, b: number) {
	console.log('start');
	return a + b;
}

const memoizedSum = memo(sum);

console.log(sum(1, 2));
console.log(memoizedSum(1, 2));
console.log(memoizedSum(1, 2));
console.log(memoizedSum(5, 2));
console.log(memoizedSum(5, 2));
