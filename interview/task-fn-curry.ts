{
	/**
	 * реализовать карированую функцию sum:
	 * sum() === 0
	 * sum(1)() === 1
	 * sum(1)(2)() === 3
	 */

	if (true) {
		const addFn = (value: number) => (valueNext?: number) =>
			valueNext === undefined ? value : addFn(value + valueNext);
		const sum = (value?: number) => {
			return value === undefined ? 0 : addFn(value);
		};
		// @ts-ignore
		console.log('## ', sum(), sum(1), sum(1)(), sum(1)(2), sum(1)(2)(), sum(2)(3)(5)());
	}

	if (true) {
		const sum = (value?: number) => {
			let result = 0;
			const addFn = (value?: number) => {
				if (value === undefined) {
					return result;
				}
				result += value;
				return addFn;
			};
			return value === undefined ? result : addFn(value);
		};
		// @ts-ignore
		console.log('## ', sum(), sum(1), sum(1)(), sum(1)(2), sum(1)(2)(), sum(2)(3)(5)());
	}
}
