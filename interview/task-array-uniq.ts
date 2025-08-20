/**
 * https://habr.com/ru/articles/488510/
 * Задача: Уникализация значений в массиве.
 * Необходимо написать функцию, принимающую в аргументах массив целых чисел и возвращающую новый массив, состоящий только из уникальных значений первого массива.
 * Например:
 * unique([1, 1, 2, 2, 4, 2, 3, 7, 3]); // => [1, 2, 4, 3, 7]
 */
{
	const array = [1, 1, 2, 2, 4, 2, 3, 7, 3];

	const unique = array => Array.from(new Set(array));
	const unique1 = array =>
		array.reduce((arrayUniq, item) => (arrayUniq.includes(item) ? arrayUniq : [...arrayUniq, item]), []);

	console.log(unique(array));
	console.log(unique1(array));
}

{
	const uniq = (nums: number[]) => Array.from(new Set(nums));
	console.log('## ', uniq([1, 1, 2, 2, 4, 2, 3, 7, 3]));
}
{
	const uniq = (nums: number[]) =>
		Object.values(nums.reduce<Record<number, number>>((acc, num) => ({ ...acc, [num]: num }), {}));
	console.log('## ', uniq([1, 1, 2, 2, 4, 2, 3, 7, 3]));
}
{
	const uniq = (nums: number[]) => nums.reduce<number[]>((acc, num) => (acc.includes(num) ? acc : [...acc, num]), []);
	console.log('## ', uniq([1, 1, 2, 2, 4, 2, 3, 7, 3]));
}
