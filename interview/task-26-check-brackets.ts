// https://habr.com/ru/articles/351874/
// 38. Есть строка, состоящая из разных скобок, проверить закрыты ли все.  Пример строки: "())({}}{()][]["

{
	// для одного вида скобок
	const string = '((())((())))()';

	const checkIsBracketsAllClosed = (string: string) => {
		const symbols = string.split('');
		let openBracketCount = 0;
		console.log(symbols);
		for (const symbol of symbols) {
			if (symbol === '(') {
				openBracketCount++;
			} else {
				openBracketCount--;
			}
			console.log(symbol, openBracketCount);
			if (openBracketCount < 0) {
				return false;
			}
		}
		return openBracketCount === 0;
	};

	console.log(checkIsBracketsAllClosed(string));
}

{
	const string2 = '(){}()[]';

	const checkIsOpenBracket = (symbol: string) => ['(', '{', '['].includes(symbol);
	const getOpenBracket = (symbol: string) => ({ ')': '(', '}': '{', ']': '[' }[symbol]);

	const checkIsBracketsAllClosed = (string: string) => {
		const symbols = string.split('');
		const openBracketCount = {};
		console.log(symbols);
		for (const symbol of symbols) {
			const openBracket = getOpenBracket(symbol) ?? symbol;
			if (checkIsOpenBracket(symbol)) {
				openBracketCount[openBracket] = (openBracketCount[openBracket] ?? 0) + 1;
			} else {
				openBracketCount[openBracket] = (openBracketCount[openBracket] ?? 0) - 1;
			}
			console.log(symbol, openBracketCount[openBracket]);
			if (openBracketCount[openBracket] < 0) {
				return false;
			}
		}
		return Object.values(openBracketCount).every(count => count === 0);
	};

	console.log(checkIsBracketsAllClosed(string2));
}
