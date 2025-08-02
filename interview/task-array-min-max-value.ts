/**
 * Задачи на работу с массивами
 * https://habr.com/ru/articles/741108/
 */

// Найти наибольший и наименьший элемент в массиве, не используя Math.max и Math.min.
{
	const min = (...args: number[]) => {
		let valueMin = args.at(0);
		for (const value of args) {
			if (valueMin === undefined || valueMin > value) {
				valueMin = value;
			}
		}
		return valueMin;
	};

	const max = (...args: number[]) => {
		let valueMax = args.at(0);
		for (const value of args) {
			if (valueMax === undefined || value > valueMax) {
				valueMax = value;
			}
		}
		return valueMax;
	};

	console.log('## min', min(312, 3123, 123, 4324, 5345, 345, 3453, 453453, 423433, 234));
	console.log('## max', max(312, 3123, 123, 4324, 5345, 345, 3453, 453453, 423433, 234));
}

{
	console.log('--- Hаибольший и наименьший элемент в массиве '.padEnd(80, '-'));

	const array = [1, 2, 5, 8, 0, 44, 33];

	const getMax = (array: number[]) => {
		let maxItem: number | null = null;
		for (const item of array) {
			if (maxItem === null || item > maxItem) {
				maxItem = item;
			}
		}
		return maxItem;
	};

	const getMin = (array: number[]) => {
		let minItem: number | null = null;
		for (const item of array) {
			if (minItem === null || item < minItem) {
				minItem = item;
			}
		}
		return minItem;
	};

	console.log(array);
	console.log({ min: getMin(array), max: getMax(array) });
}
