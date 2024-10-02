const fn = (n: number) => () => {
	for (var i = 0; i < n; ++i) {
		console.log(i, 'yes');
	}
	console.log(i, 'no');
};

fn(3)();
