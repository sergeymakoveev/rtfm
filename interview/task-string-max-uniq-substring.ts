/**
 * https://purpleschool.ru/blog/pyat-zadach-dlya-javascript-razrabotchikov
 * Задача 5: Максимальная подстрока без повторений
 * Описание задачи:
 * Напишите функцию для нахождения длины самой длинной подстроки без повторяющихся символов в строке.
 */

{
	const testValues = ['1234516789', '1234511678'];
	const test = (fn: (input: string) => string | undefined) => {
		console.log('=====');
		for (const testedString of testValues) {
			console.log(`"${testedString}"`, ':', `"${fn(testedString)}"`);
		}
	};

	// Не оптимальная реализация: сложность O(n^2)
	if (true) {
		const getSubstringUniqMax = (input: string) => {
			let uniqSubstring = '';
			let uniqSubstringMax = '';
			for (let i = 0; i < input.length; i++) {
				const inputSubstring = input.substring(i);
				uniqSubstring = '';
				for (const currentSymbol of inputSubstring) {
					if (uniqSubstring.includes(currentSymbol)) {
						uniqSubstringMax =
							uniqSubstring.length > uniqSubstringMax.length ? uniqSubstring : uniqSubstringMax;
						uniqSubstring = '';
					}
					uniqSubstring += currentSymbol;
				}
				uniqSubstringMax = uniqSubstring.length > uniqSubstringMax.length ? uniqSubstring : uniqSubstringMax;
			}
			return uniqSubstringMax;
		};

		test(getSubstringUniqMax);
	}

	// Оптимальная реализация: сложность O(n)
	if (true) {
		const getSubstringUniqMax = (symbols: string) => {
			let substringUniqMax = '';
			let substringUniqPartial = '';
			let symbol = symbols.at(0);
			symbols = symbols.substring(1);

			while (symbol && symbols.length > 0) {
				if (substringUniqPartial.length > substringUniqMax.length) {
					substringUniqMax = substringUniqPartial;
				}
				if (substringUniqPartial.includes(symbol)) {
					substringUniqPartial = substringUniqPartial.substring(1);
				} else {
					substringUniqPartial += symbol;
					symbol = symbols.at(0);
					symbols = symbols.substring(1);
				}

				// console.log('## ', { symbols, symbol, substringUniqPartial, substringUniqMax });
			}

			return substringUniqMax || undefined;
		};

		test(getSubstringUniqMax);
	}
}
