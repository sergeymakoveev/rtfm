// https://habr.com/ru/articles/351874/
// 13. Есть несколько слов, определить состоят ли они из одних и тех же букв('кот', 'ток', 'окт')

{
	const check = (word: string, ...words: string[]) =>
		Array.from(new Set(words.concat(word).join('').split(''))).length ===
		Array.from(new Set(word.split(''))).length;

	console.log(check('кaт', 'ток', 'окт'));
}
{
	const words = ['кот', 'ток', 'окт'];

	const check = ([wordFirst, ...words]: string[]) => {
		const wordSorted = wordFirst.split('').sort().join('');
		return words.every(word => word.split('').sort().join('') === wordSorted);
	};

	console.log(check(words));
}
