/**
 * Стрелочные функции не имеют своего this, поэтому ведут себя иначе внутри объектов.
 * У них нет собственного объекта arguments — вместо него используется rest-синтаксис (...args).
 * Стрелочные функции нельзя использовать как конструкторы вместе с new.
 */
{
	const fn = function () {
		// eslint-disable-next-line prefer-rest-params
		this.foo = arguments;
		// eslint-disable-next-line prefer-rest-params
		console.log('', { arguments, _this: this });
	};

	const FN = new fn();
	console.log(FN, FN.foo);
}
console.log('-----------------------');
{
	const fn = () => {
		// eslint-disable-next-line prefer-rest-params
		// this.foo = arguments;
		// eslint-disable-next-line prefer-rest-params
		console.log('', { arguments, _this: this });
	};

	// const FN = new fn();
	fn();
}
