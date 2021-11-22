#!/usr/bin/env ts-node

function promiseAll(promises: Array<Promise<unknown>>, results: Array<unknown> = []): Promise<Array<unknown>> {
	const [promise, ...restPromises] = promises;
	return promise
		? promise.then(promiseResult => promiseAll(restPromises, [...results, promiseResult]))
		: Promise.resolve(results);
}

const aa = () => Promise.resolve('a');
const bb = () => Promise.resolve('b');
const cc = () => Promise.resolve('c');

aa().then(aaResult => bb().then(bbResult => cc().then(ccResult => console.log([aaResult, bbResult, ccResult]))));
promiseAll([aa(), bb(), cc()]).then(console.log); // 1,2,3

const a = () => Promise.resolve(1);
const b = () => new Promise(rs => setTimeout(() => rs(2), 3000));
const c = () => new Promise(rs => setTimeout(() => rs(3), 1000));

promiseAll([a(), b(), c()]).then(console.log); // 1,2,3
promiseAll([a(), c(), b()]).then(console.log); // 1,3,2
