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
