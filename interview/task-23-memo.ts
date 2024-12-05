/**
 * Задачи на работу с массивами
 * https://habr.com/ru/articles/741108/
 */

/**
 * Написать функцию мемоизации значений
 **/
{
	const factorial = value => {
		console.log('calculate factorial');
		return value > 1 ? value * factorial(--value) : value;
	};

	const memo = fn => {
		const cache = new Map();
		return function (arg) {
			if (cache.has(arg)) {
				return cache.get(arg);
			} else {
				const result = fn(arg);
				cache.set(arg, result);
				return result;
			}
		};
	};

	const factorialMemoised = memo(factorial);

	console.log(factorial(5), factorial(5));
	console.log(factorialMemoised(5), factorialMemoised(5));
}
