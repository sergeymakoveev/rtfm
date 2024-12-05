/**
 * Задача 2: Сортировка строки
 * Напишите функцию для сортировки символов в строке по их частоте встречаемости.
 * Это означает, что необходимо разработать алгоритм, который принимает строку в качестве входных данных и возвращает новую строку,
 * в которой символы упорядочены по частоте их встречаемости — от самого часто встречающегося до наименее.
 */

const sortByFrequency = (input: string) =>
	Object.entries(
		input
			.split('')
			.sort()
			.reduce((acc, value) => ({ ...acc, [value]: (acc[value] ?? 0) + 1 }), {} as Record<string, number>),
	)
		.sort(([_aKey, aCount], [_bKey, bCount]) => (aCount === bCount ? 0 : aCount > bCount ? 1 : -1))
		.map(([key, _count]) => key)
		.join('');

const example = '1232343445455';
console.log(sortByFrequency(example));
