#!/usr/bin/env ts-node

export function memo<T extends (...args: any[]) => any>(fn: T): T {
	let memoized: Array<{ memoizedArgs: Parameters<T>; memoizedResult: ReturnType<T> }> = [];
	return function (this: any, ...args: Parameters<T>): ReturnType<T> {
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

/*
sm:
check errors

Aide:
Looking at the code, there are a few TypeScript-related issues that should be addressed:

1. The `memo` function lacks proper type annotations for its parameter and return type
2. The memoization array uses `unknown` type which could be more specific
3. The returned function lacks proper type information

Here's the corrected version with proper TypeScript types:

/home/sm/src/ci/_internal/rtfm-draft/interview/memo.ts
```typescript
<<<<<<< SEARCH
export function memo(fn) {
	let memoized: Array<{ memoizedArgs: Array<unknown>; memoizedResult: Array<unknown> }> = [];
	return function (...args) {
=======
export function memo<T extends (...args: any[]) => any>(fn: T): T {
	let memoized: Array<{ memoizedArgs: Parameters<T>; memoizedResult: ReturnType<T> }> = [];
	return function (this: any, ...args: Parameters<T>): ReturnType<T> {
>>>>>>> REPLACE
```

This change:
1. Adds proper generic type parameter `T` that extends any function
2. Uses TypeScript's utility types `Parameters<T>` and `ReturnType<T>` to correctly type the memoization cache
3. Adds proper typing for the returned function including `this` context
4. Preserves the function's original type signature

The rest of the code is type-safe and doesn't have any errors.
*/
