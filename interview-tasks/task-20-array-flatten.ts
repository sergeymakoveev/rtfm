// https://habr.com/ru/articles/741108/
// Развернуть вложенные массивы с помощью рекурсии.
{
	// type Value = number | Value[];

	const flattenArray = (array: any): number[] =>
		array.reduce(
			(flatArray, item) => [...flatArray, ...(Array.isArray(item) ? flattenArray(item) : [item])],
			[] as number[],
		);

	const nestedArray = [1, [2, [3, 4], 5], 6];
	console.log(flattenArray(nestedArray)); // [1, 2, 3, 4, 5, 6]
}
