/* eslint-disable @typescript-eslint/no-unused-vars */

// Какие состояния есть у Promise
// Задай промис, который резолвит значение true
Promise.resolve(true);
// Задай промис, который реджектит значение true
Promise.reject(true);
// Залогируй значение промиса

const res = await Promise.resolve('Привет');

{
	const createPromiseWithTimeout = (timeout: number, result: string, isRejected = false) =>
		new Promise((resolve, reject) => {
			setTimeout(isRejected ? () => reject(result) : () => resolve(result), timeout);
		});

	// createPromiseWithTimeout(200, '2', true).then(
	// 	result => console.log('resolve', result),
	// 	error => console.log('reject', error),
	// );

	const PromiseAll = (...promises: Promise<unknown>[]) =>
		new Promise((resolve, reject) => {
			const results = new Array(promises.length);
			let resultsCount = 0;
			promises.forEach((promise, index) =>
				promise.then(
					result => {
						results[index] = result;
						if (++resultsCount === promises.length) {
							resolve(results);
						}
					},
					error => reject(error),
				),
			);
		});

	// PromiseAll(Promise.resolve(1), Promise.resolve(2), Promise.reject(3), Promise.resolve(4)).then(
	// 	result => console.log(result),
	// 	error => console.log(error),
	// );

	PromiseAll(
		createPromiseWithTimeout(500, '1'),
		createPromiseWithTimeout(200, '2'),
		createPromiseWithTimeout(100, '3'),
		createPromiseWithTimeout(400, '4'),
	).then(
		result => console.log('resolve', result),
		error => console.log('reject', error),
	);

	// Promise.resolve(true)
	// 	.then(() => Promise.resolve('result1'))
	// 	.then(() => Promise.reject('error1'))
	// 	.then(() => Promise.reject('error2'))
	// 	.then(() => Promise.resolve('result2'))
	// 	.then(
	// 		result => console.log('then onFulfilled', result),
	// 		error => console.log('then onRejected', error),
	// 	)
	// 	.catch(error => console.log('main promise catch', error));

	// const promises = [createPromiseWithTimeout(500, 'result0'), createPromiseWithTimeout(200, 'error0', true)];

	// new Promise((resolve, reject) =>
	// 	Promise.resolve(true)
	// 		.then(() => resolve(promises[0]))
	// 		.then(() => resolve(promises[1]))
	// 		// .then(resolve)
	// 		.catch(reject),
	// ).then(
	// 	result => console.log('resolve', result),
	// 	error => console.log('reject', error),
	// );

	// Promise.resolve(true)
	// 	.then(() => promises[0])
	// 	.then(() => promises[1])
	// 	// .then(
	// 	// 	result => console.log('then onFulfilled', result),
	// 	// 	error => console.log('then onRejected', error),
	// 	// )
	// 	.catch(error => console.log('main promise catch', error));
}
