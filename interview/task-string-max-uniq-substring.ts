/**
 * https://purpleschool.ru/blog/pyat-zadach-dlya-javascript-razrabotchikov
 * Задача 5: Максимальная подстрока без повторений
 * Описание задачи:
 * Напишите функцию для нахождения длины самой длинной подстроки без повторяющихся символов в строке.
 */
{
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
	console.log(getSubstringUniqMax('12345qweqweqwasdfghjkqweqe3'));
	console.log(getSubstringUniqMax('12345'));
}
{
	const getSubstringUniqMax = (string: string) => {
		let substringUniqMax = '';
		let substringUniqPartial = '';
		for (const letter of string) {
			if (substringUniqPartial.includes(letter)) {
				if (substringUniqPartial.length > substringUniqMax.length) {
					substringUniqMax = substringUniqPartial;
				}
				substringUniqPartial = '';
			} else {
				substringUniqPartial += letter;
			}
		}
		return substringUniqMax;
	};
	console.log(getSubstringUniqMax('12345qweqweqwasdfghjkqweqe3'));
	console.log(getSubstringUniqMax('12345'));
}
{
	const getSubstringUniqMax = (string: string) =>
		string
			.split('')
			.reduce(
				([substringUniqMax, substringUniqPartial], letter) =>
					substringUniqPartial.includes(letter) && substringUniqPartial.length > substringUniqMax.length
						? [substringUniqPartial, '']
						: substringUniqPartial.includes(letter) &&
						  substringUniqPartial.length <= substringUniqMax.length
						? [substringUniqMax, '']
						: [substringUniqMax, substringUniqPartial + letter],
				['', ''],
			)
			.at(0);

	console.log(getSubstringUniqMax('12345qweqweqwasdfghjkqweqe3'));
	console.log(getSubstringUniqMax('12345'));
}
