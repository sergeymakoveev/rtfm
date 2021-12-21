#!/usr/bin/env ts-node

Promise.resolve(+process.argv[process.argv.length - 1])
	.then(value => {
		if (isNaN(value)) {
			throw new Error('Value is not a number');
		}
		return value;
	})
	.then(
		value => console.log({ value }),
		error => console.log({ error }),
	);

Promise.resolve()
	.then(() => console.log(1))
	.then(() => console.log(2))
	.then(() => {
		throw Error('Exception');
	})
	.then(
		() => console.log(3),
		() => console.log(4),
	)
	.then(() => console.log(5))
	.catch(() => console.log(6))
	.then(() => console.log(7))
	.then(() => console.log(8))
	.catch(() => console.log(9));
