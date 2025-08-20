#!/usr/bin/env tsx

const value = 5;

const fn1 = (a: number) => a + 1;
const fn2 = (a: number) => a * 2;

const rightRes = fn1(fn2(value));

// compose(fn1, fn2)(value) === fn1(fn2(value));

{
	const compose = (...fns: Function[]) => (value: unknown) => fns.reduceRight((acc, fn) => fn(acc), value);

	console.log(rightRes, compose(fn1, fn2)(value));
}

{
	const compose = (...fns: ((...args: any[]) => unknown)[]) => (value: unknown) =>
		fns.reduceRight((acc, fn) => fn(acc), value);

	const res = compose(fn1, fn2)(value);

	console.log(rightRes, res);
}

{
	// реализация с рекурсией
	const compose2 = (...fns: ((...args: any[]) => unknown)[]) => (value: unknown) => {
		const fn = fns.at(-1);
		const fnRest = fns.slice(0, -1);
		return fnRest && fn ? compose2(...fnRest)(fn(value)) : fn ? fn(value) : value;
	};

	const res2 = compose2(fn1, fn2)(value);

	console.log(rightRes, res2);
}
