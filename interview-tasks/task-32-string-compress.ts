/**
 * https://habr.com/ru/articles/488510/
 * Задача: «Сжатие строк»
 * Необходимо реализовать функцию, принимающую в аргументах строку,
 * состоящую из букв и вернуть новую строку, в которой повторяющиеся буквы заменены количеством повторений.
 * Например:
 * rle('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD'); // => 'AV3B3V2XDHJF4D6HA4J3D2SLS3D4'
 */
{
	const string = 'AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD';

	const rle = string =>
		string
			.split('')
			.reduce(
				([compressedString, count], symbol) => {
					const isRepeatedSymbol = compressedString.endsWith(symbol);
					// console.log('## ', { compressedString, count, symbol });
					return isRepeatedSymbol
						? [compressedString, ++count]
						: count > 0
						? [`${compressedString}${count}`, 0]
						: [`${compressedString}${symbol}`, 0];
				},
				['', 0],
			)
			.shift();

	console.log('rle', rle(string));
}
