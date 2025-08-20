#!/usr/bin/env -S node --harmony

'use strict'; // для браузера

// Хвостовая рекурсия

// https://habr.com/ru/articles/464915/
// https://www.perplexity.ai/search/optimizatsiia-khvostovoi-rekur-KVUn9XCpR8yc8dNSiNUupA
{
	const test = sum => {
		console.log('=================');
		for (const i of [100, 8200, 10000, 100000]) {
			console.time();
			try {
				console.log(`## sum(${i})`, sum(i));
			} catch (error) {
				console.error(`## sum(${i})`, error);
			}
			console.timeEnd();
		}
	};

	// не оптимизированная функция, переполнение стека
	if (true) {
		const sum = n => {
			if (n === 0) {
				console.log(n, ' stack:', new Error().stack);
			}
			return n === 0 ? 0 : n + sum(n - 1);
		};
		test(sum);
	}

	// функция с оптимизацией хвостовой рекурсии (возвращает вызов функции, который может быть оптимизирован)
	if (true) {
		const sum = (n, acc = 0) => {
			// глубина стека
			// console.log(n, ' stack depth:', new Error().stack.split('\n').length);
			return n === 0 ? acc : sum(n - 1, acc + n);
		};
		test(sum);
	}

	// функция без рекурсивных вызовов, переполнения стека не происходит
	if (true) {
		const sum = n => {
			let res = 0;
			for (let i = 1; i <= n; i++) {
				res += i;
			}
			console.log(n, ' stack depth:', new Error().stack.split('\n').length);
			return res;
		};
		test(sum);
	}
}
