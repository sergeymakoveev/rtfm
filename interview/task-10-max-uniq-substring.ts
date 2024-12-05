/**
 * https://purpleschool.ru/blog/pyat-zadach-dlya-javascript-razrabotchikov
 * Задача 5: Максимальная подстрока без повторений
 * Описание задачи:
 * Напишите функцию для нахождения длины самой длинной подстроки без повторяющихся символов в строке.
 */

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

const getSubstringUniqMax1 = (string: string) =>
	string
		.split('')
		.reduce(
			([substringUniqMax, substringUniqPartial], letter) =>
				substringUniqPartial.includes(letter) && substringUniqPartial.length > substringUniqMax.length
					? [substringUniqPartial, '']
					: substringUniqPartial.includes(letter) && substringUniqPartial.length <= substringUniqMax.length
					? [substringUniqMax, '']
					: [substringUniqMax, substringUniqPartial + letter],
			['', ''],
		)
		.at(0);

console.log(getSubstringUniqMax('12345qweqweqwasdfghjkqweqe3'));
console.log(getSubstringUniqMax1('12345qweqweqwasdfghjkqweqe3'));
