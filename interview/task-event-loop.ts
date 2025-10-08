{
	if (true) {
		setInterval(() => console.log(1), 1); // macro 1
		setTimeout(() => console.log(2), 1); // macro 2
		console.log(3); // 1
		Promise.resolve().then(() => console.log(4)); // micro 1
		const promiseTest = new Promise(() => {
			console.log(5);
		}); // 2
		setTimeout(() => console.log(6), 0); // macro 3
		console.log(7); // 3
		promiseTest.then(() => console.log(8)); // не сработает, т.к. promiseTest не зарезолвлен

		/*
		3
		5
		7
		4 // micro 1
		1 // macro 1
		2 // macro 2
		6 // macro 3
		1 // macro 1
		1 // macro 1
		...
		1 // macro 1
		*/
	}
}
