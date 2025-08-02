/**
 * https://purpleschool.ru/blog/pyat-zadach-dlya-javascript-razrabotchikov
 * Задача 3: Палиндром
 * Напишите функцию, которая определяет, является ли переданная строка палиндромом.
 * Палиндромом считается строка, которая читается одинаково как слева направо, так и справа налево.
 */

{
	const checkIsPalindrom = (str: string) => {
		const symbols = str.split('');
		for (let i = 0; i < Math.floor(symbols.length / 2); i++) {
			if (symbols.at(i) !== symbols.at(symbols.length - 1 - i)) {
				return false;
			}
		}
		return true;
	};

	console.log(checkIsPalindrom('ab'), checkIsPalindrom('abba'), checkIsPalindrom('abcba'));
}

{
	const checkIsPalindrom = (word: string) => word === word.split('').reverse().join('');

	// Примеры использования:
	console.log(checkIsPalindrom('level'));
	console.log(checkIsPalindrom('racecar'));
	console.log(checkIsPalindrom('hello'));
}
