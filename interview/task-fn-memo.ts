/**
 * Задачи на работу с массивами
 * https://habr.com/ru/articles/741108/
 */

/**
 * Написать функцию мемоизации значений
 **/
{
	const factorial = value => {
		// console.log('calculate factorial');
		return value > 1 ? value * factorial(--value) : value;
	};
	if (true) {
		const memo = fn => {
			const cache = new Map();
			return (...args: unknown[]) => {
				if (cache.has(args)) {
					return cache.get(args);
				}
				const result = fn(...args);
				cache.set(args, result);
				return result;
			};
		};
		const factorialMemoised = memo(factorial);

		console.time();
		console.log(factorial(5), factorial(5));
		console.timeEnd();
		console.time();
		console.log(factorialMemoised(5), factorialMemoised(5));
		console.timeEnd();
	}
}
