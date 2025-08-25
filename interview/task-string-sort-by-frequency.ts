/**
 * Задача 2: Сортировка строки
 * Напишите функцию для сортировки символов в строке по их частоте встречаемости.
 * Это означает, что необходимо разработать алгоритм, который принимает строку в качестве входных данных и возвращает новую строку,
 * в которой символы упорядочены по частоте их встречаемости — от самого часто встречающегося до наименее.
 */

{
	const testValues = ['1234516789', '1234511678', 'asdasdasddad;kasdq.w,emq.wemqwe', '11111112222244333'];
	const test = (fn: (input: string) => string | undefined) => {
		console.log('=====');
		for (const testedString of testValues) {
			console.log(`"${testedString}"`, ':', `"${fn(testedString)}"`);
		}
	};

	if (true) {
		const sortByFrequency = (str: string) => {
			const symbols = str.split('');
			const symbolsHash = {};
			symbols.forEach(symbol => {
				symbolsHash[symbol] = [...(symbolsHash[symbol] ?? []), symbol];
			});
			return Object.entries<string[]>(symbolsHash)
				.sort(([_aKey, aValues], [_bKey, bValues]) => bValues.length - aValues.length)
				.map(([key]) => key)
				.join(' ');
		};
		test(sortByFrequency);
	}

	if (true) {
		const sortByFrequency = (input: string) =>
			Object.entries(
				input
					.split('')
					.reduce((acc, value) => ({ ...acc, [value]: (acc[value] ?? 0) + 1 }), {} as Record<string, number>),
			)
				.sort(([_aKey, aCount], [_bKey, bCount]) => bCount - aCount)
				.reduce((acc, [key, _count]) => `${acc} ${key}`, '');

		test(sortByFrequency);
	}
}
