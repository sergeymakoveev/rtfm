#!/usr/bin/env -S node --harmony

'use strict'; // для браузера

// Хвостовая рекурсия

// https://habr.com/ru/articles/464915/
// https://www.perplexity.ai/search/optimizatsiia-khvostovoi-rekur-KVUn9XCpR8yc8dNSiNUupA
{
	const test = name => fn => {
		console.log('=================');
		for (const n of [0, 1, 2, 5, 10, 100, 8200, 10000, 100000]) {
			console.time();
			try {
				console.log(`## ${name}(${n})`, fn(n));
			} catch (error) {
				console.error(`## ${name}(${n})`, error);
			}
			console.timeEnd();
		}
	};

	const testSum = test('sum');

	// sum - сумма членов арифметической прогрессии
	// sum(10) = 10+9+8+7+6+5+4+3+2+1

	// не оптимизированная функция, переполнение стека
	if (false) {
		const sum = n => {
			if (n === 0) {
				console.log(n, ' stack:', new Error().stack);
			}
			return n === 0 ? 0 : n + sum(n - 1);
		};
		testSum(sum);
	}

	// функция с оптимизацией хвостовой рекурсии (возвращает вызов функции, который может быть оптимизирован)
	if (false) {
		const sum = (n, acc = 0) => {
			// глубина стека
			// console.log(n, ' stack depth:', new Error().stack.split('\n').length);
			return n === 0 ? acc : sum(n - 1, acc + n);
		};
		testSum(sum);
	}

	// функция без рекурсивных вызовов, переполнения стека не происходит
	if (false) {
		const sum = n => {
			let res = 0;
			for (let i = 1; i <= n; i++) {
				res += i;
			}
			console.log(n, ' stack depth:', new Error().stack.split('\n').length);
			return res;
		};
		testSum(sum);
	}

	// factorial - факториал числа
	// factorial(10) = 10*9*8*7*6*5*4*3*2*1
	const testFactorial = test('factorial');

	if (false) {
		const factorial = (n, acc = 1) => (n === 0 ? acc : factorial(n - 1, acc * n));
		testFactorial(factorial);
	}

	// fibonacci - число Фибоначчи
	// fibonacci(10) = fibonacci(9) + fibonacci(8) = 13 + 21 = 34
	// fibonacci: 0,1,1,2,3,5,8,13,21,34,55,89
	//    number: 1,2,3,4,5,6,7, 8, 9,10
	const testFibonacci = test('fibonacci');

	// рекурсия
	if (false) {
		const fibonacci = (n, delta = 2) => (n > delta ? fibonacci(n - delta - 1, 0) + fibonacci(n - delta - 2, 0) : 1);
		testFibonacci(fibonacci);
	}

	// итерации
	if (true) {
		const fibonacci = n => {
			const skip = 2;
			if (n > skip) {
				let result = 0;
				let n1 = 1;
				let n2 = 0;
				for (let i = skip + 1; i <= n; ++i) {
					result = n1 + n2;
					n2 = n1;
					n1 = result;
				}
				return result;
			}
			return 1;
		};

		testFibonacci(fibonacci);
	}
}
