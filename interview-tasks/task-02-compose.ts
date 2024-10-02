const value = 5;

const fn1 = (a: number) => a + 1;
const fn2 = (a: number) => a * 2;

const res = fn1(fn2(value));

const compose1 = (...fns) => value => fns.reduceRight((result, fn) => fn(result), value);
const res1 = compose1(fn1, fn2)(value);

// реализация с рекурсией
// const compose2 = (...fns) => value => {}

console.log(value, res, res1);
