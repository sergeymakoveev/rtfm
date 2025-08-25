/**
 * Условие: на вход поступает массив целых чисел.
 * На выходе необходимо вывести массив, в котором все нули расположены в конце, а остальные числа сохраняют свой порядок.
 * Пример
 * Вход:  7 0 1  15 0 0  3 9 0 25
 * Выход: 7 1 15 3  9 25 0 0 0 0
 */

{
	const values = [7, 0, 1, 15, 0, 0, 3, 9, 0, 25];
	console.log('## values:\t\t', values);

	{
		// Сложность O(n)
		const solution = (values: number[]) => {
			const result: number[] = [];
			for (let i = values.length - 1; i >= 0; i--) {
				if (values[i] === 0) {
					result.push(values[i]);
				} else {
					result.unshift(values[i]);
				}
			}
			return result;
		};

		console.log('## solution:\t', solution(values));
	}

	{
		// Оптимальное решение с указателем на первое нулевое значение, сложность O(n)
		const solution = (values: number[]) => {
			let zeroIndex = 0;
			for (let j = 0; j < values.length; j++) {
				// console.log('## ', { i, j, '[i]': values[i], '[j]': values[j] });
				if (values[j] !== 0) {
					if (values[zeroIndex] === 0) {
						[values[zeroIndex], values[j]] = [values[j], values[zeroIndex]];
					}
					zeroIndex += 1;
				}
				// console.log('## ', { values: values.toString() });
			}
			return values;
		};
		console.log('## solution:\t', solution(values));
	}
}
