/**
 * https://habr.com/ru/articles/488510/
 * Задача: Сортировка нечётных.
 * Необходимо написать функцию, принимающую в аргументах массив и возвращающую новый массив,
 * в котором отсортированы все нечетные числа по возрастанию, в то время как чётные остаются на своих местах.
 * Например:
 * oddSort([7, 3, 4, 9, 5, 2, 17]); // => [3, 5, 4, 7, 9, 2, 17]
 */
{
	const array = [7, 3, 4, 9, 5, 2, 17];

	{
		const sortOddValues = array => {
			const arrayWithoutOddValues = array.map(value => (value % 2 === 0 ? value : null));
			const sortedEvenValues = array
				.filter(value => value % 2 !== 0)
				.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
			return arrayWithoutOddValues.map(value => (value === null ? sortedEvenValues.shift() : value));
		};

		console.log('sortOddValues', sortOddValues(array));
	}

	{
		const oddSort = (nums: number[]) => {
			const oddNums = nums.filter(num => num % 2 !== 0).sort((a, b) => a - b);
			return nums.map(value => (value % 2 === 0 ? value : oddNums.shift()));
		};
		console.log('## ', oddSort(array));
	}
}
