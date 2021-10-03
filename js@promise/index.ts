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
