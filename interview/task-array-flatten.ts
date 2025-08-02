// https://habr.com/ru/articles/741108/
// Развернуть вложенные массивы с помощью рекурсии.

{
	type Value = unknown | Value[];
	const flatten = (value: Value[]) =>
		value.reduce<unknown[]>((acc, next) => [...acc, ...(Array.isArray(next) ? flatten(next) : [next])], []);

	console.log('## flatten', flatten([1, 2, 3, [4], 5, [6, [7, [8, 9]]]]));
}
{
	const flattenArray = (array: any): number[] =>
		array.reduce(
			(flatArray, item) => [...flatArray, ...(Array.isArray(item) ? flattenArray(item) : [item])],
			[] as number[],
		);

	const nestedArray = [1, [2, [3, 4], 5], 6];
	console.log(flattenArray(nestedArray)); // [1, 2, 3, 4, 5, 6]
}
