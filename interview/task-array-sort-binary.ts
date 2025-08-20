/**
 * Задача: реализовать бинарный поиск в отсортированном массиве
 * binarySearch([1, 3, 4, 9, 15, 22, 117], 22);
 */
{
	const array = [1, 3, 4, 9, 15, 22, 117];

	const binaryRecursiveSearch = (array: number[], value: number) => {
		const midIndex = Math.floor(array.length - 1 / 2);
		const midValue = array[midIndex];
		return array.length <= 0
			? undefined
			: midValue === value
			? midIndex
			: midValue > value
			? binaryRecursiveSearch(array.slice(0, midIndex), value)
			: binaryRecursiveSearch(array.slice(midIndex + 1), value);
	};

	console.log(
		'binaryRecursiveSearch',
		binaryRecursiveSearch(array, array[0]),
		binaryRecursiveSearch(array, array[3]),
		binaryRecursiveSearch(array, array[6]),
		binaryRecursiveSearch(array, 999),
	);
}
{
	const array = [1, 3, 4, 9, 15, 22, 117];

	const binarySearch = (array: number[], value: number) => {
		while (array.length) {
			const midIndex = Math.floor(array.length - 1 / 2);
			const midValue = array[midIndex];
			if (midValue === value) {
				return midIndex;
			}
			array = midValue > value ? array.slice(0, midIndex) : array.slice(midIndex + 1);
		}
		return undefined;
	};

	console.log(
		'binarySearch',
		binarySearch(array, array[0]),
		binarySearch(array, array[3]),
		binarySearch(array, array[6]),
		binarySearch(array, 999),
	);
}
