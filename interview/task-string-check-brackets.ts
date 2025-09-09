// https://habr.com/ru/articles/351874/
// 38. Есть строка, состоящая из разных скобок, проверить закрыты ли все.  Пример строки: "())({}}{()][]["
if (false) {
	const checkIsOpened = (symbol: string) => symbol === '(';
	const checkIsClosed = (symbol: string) => symbol === ')';
	const checkBrackets = (input: string) => {
		let openedCounter = 0;
		const symbols = input.split('');
		for (const symbol of symbols) {
			if (checkIsOpened(symbol)) {
				openedCounter++;
			} else if (checkIsClosed(symbol)) {
				openedCounter--;
			}
			if (openedCounter < 0) {
				return false;
			}
		}
		return openedCounter === 0 ? true : false;
	};

	console.log('## checkBrackets', checkBrackets('((())((())))(()'));
}

if (false) {
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

if (false) {
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

if (false) {
	// Не проходит все тесты на coderun.
	// https://coderun.yandex.ru/selections/hr-tech-interview/problems/correct-bracket-sequence/description

	const allSymbols = '()[]{}';
	const allowedNextSymbols = {
		'(': '(){[',
		')': allSymbols,
		'[': '[]{(',
		']': allSymbols,
		'{': '{}([',
		'}': allSymbols,
	};
	const solution = stdin => {
		let countRound = 0;
		let countSquare = 0;
		let countBrace = 0;
		const symbols = [];
		if (!stdin) {
			console.log('yes');
			return;
		}
		if (stdin.length % 2 !== 0 || ')]}'.includes(stdin.at(0)) || '([{'.includes(stdin.at(-1))) {
			console.log('no');
			return;
		}
		for (const symbolNext of stdin) {
			const symbolPrev = symbols.at(-1);
			if (symbolPrev && !allowedNextSymbols[symbolPrev].includes(symbolNext)) {
				console.log('no', stdin);
				return;
			}
			switch (symbolNext) {
				case '(':
					countRound++;
					break;
				case ')':
					countRound--;
					break;
				case '[':
					countSquare++;
					break;
				case ']':
					countSquare--;
					break;
				case '{':
					countBrace++;
					break;
				case '}':
					countBrace--;
					break;
			}
			if (countRound < 0 || countSquare < 0 || countBrace < 0) {
				console.log('no', stdin);
				return;
			}
			symbols.push(symbolNext);
		}
		console.log(countBrace === 0 && countRound === 0 && countSquare === 0 ? 'yes' : 'no', stdin);
	};

	[
		'([)]',
		'({[[]]}{(){}}[({})])[{[{}]}[()]{([])}[[{}]]([]){}{}[()][',
		'{[({})]}{[[]]}({()})[[{}]]{}{}[()]{([])}[({})]]([]){}[',
		'[({})]{(){}}[[{}]]{}{}[()]{([])}[({})]([]){[[]]}{[({})]}[',
		'{([])}[({})]{[[]]}([]){}{}[()]{([])}[[{}]]{}{}[({})][',
		'[[{}]]{}{}[()]{([])}[({})]([]){[[]]}{[({})]}{(){}}[[{}]]{}{}({})[',
		'{[({})]}{(){}}[[{}]]{}{}[()]{([])}[({})]([]){[[]]}{}{}[',
		'[()]{([])}[({})]([]){[[]]}{[({})]}{(){}}[[{}]]{}{}({})[',
		'{(){}}[[{}]]{}{}[()]{([])}[({})]{[[]]}([]){[({})]}{[]{}}[({})][',
		'({}){[[]]}{[({})]}([]){}{}[()]{([])}[[{}]]{(){}}[({})][',
		'[[[]]]{(){}}[({})]{}{}[()]{([])}[[{}]]{}{}([{}]){[({})]}[',
	].forEach(solution);
}
{
	const testStrings = [
		// yes
		'()[]{}', // Простые пары
		'[({})]', // Вложенные скобки
		'(([{}]))', // Глубокая вложенность
		'({[]})({[]})', // Множественные блоки
		'[()]{}{[()()]()}', // Комбинированные вложенные
		'((([]{})))', // Много закрывающих подряд
		'{{{[[(())]]}}}', // Симметричная глубокая вложенность
		'({[({[({[()]})]})]})', // Максимальная вложенность
		'()(()[()]{()(){[]}})', // Сложная комбинация
		'[[][]]{}{()}([])()', // Чередование разных типов
		// no
		'(', // Незакрытая скобка
		')', // Лишняя закрывающая
		'([)]', // Нарушен порядок закрытия
		'({[}])', // Неправильное закрытие
		'((())', // Не хватает закрывающей
		'(()))', // Лишняя закрывающая
		'[[[]]', // Дисбаланс квадратных скобок
		'{}{}}{', // Лишняя фигурная скобка
		'[{()()}]()(){]]', // Ошибка в конце
		'({)}', // Нарушенная вложенность
		'][][', // Закрывающие до открывающих
		'({[({[({[())]})]})]', // Несбалансированная глубокая вложенность
		'((((((())))))]]', // Лишние закрывающие
		'{{{{}}}[[[[]]]](())))', // Дисбаланс в разных типах
		'([{)]}', // Хаотичный порядок
		'({[({[({[({[}])}])}])}', // Неправильное закрытие в глубине
	];

	if (true) {
		const openedBrackets = new Set(['[', '{', '(']);
		const mapBrackets = { '}': '{', ')': '(', ']': '[' };

		const solution = input => {
			if (input.length % 2 !== 0 || ')]}'.includes(input.at(0)) || '([{'.includes(input.at(-1))) {
				console.log('no');
				return;
			}
			const stackOpenedBrackets = [];
			for (const symbol of input) {
				if (openedBrackets.has(symbol)) {
					stackOpenedBrackets.push(symbol);
				} else {
					if (stackOpenedBrackets.at(-1) !== mapBrackets[symbol] || stackOpenedBrackets.length === 0) {
						console.log('no');
						return;
					}
					stackOpenedBrackets.pop();
				}
			}
			console.log(input, stackOpenedBrackets.length === 0 ? 'yes' : 'no');
		};
		testStrings.forEach(solution);
	}

	if (true) {
		const checkBrackets = (bracketsString: string): boolean => {
			const openedBrackets: string[] = [];
			const isOpenedBracket = (symbol?: string): boolean => symbol !== undefined && '{[('.includes(symbol);
			const closedBracket2openedBracket = { ')': '(', '}': '{', ']': '[' };
			if (
				bracketsString.length % 2 !== 0 ||
				!isOpenedBracket(bracketsString.at(0)) ||
				isOpenedBracket(bracketsString.at(-1))
			) {
				return false;
			}
			for (const bracket of bracketsString) {
				if (isOpenedBracket(bracket)) {
					openedBrackets.push(bracket);
				} else {
					if (closedBracket2openedBracket[bracket] !== openedBrackets.pop()) {
						return false;
					}
				}
			}
			// console.log('## ', { openedBracketCounters });
			return openedBrackets.length ? false : true;
		};

		testStrings.forEach(testString => console.log(checkBrackets(testString), testString));
	}
}
