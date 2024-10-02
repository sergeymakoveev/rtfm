// https://habr.com/ru/articles/741108/
// https://learn.javascript.ru/task/fibonaccionacci-numbers#:~:text=%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%87%D0%B8%D1%81%D0%B5%D0%BB%20%D0%A4%D0%B8%D0%B1%D0%BE%D0%BD%D0%B0%D1%87%D1%87%D0%B8%20%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F%20%D1%84%D0%BE%D1%80%D0%BC%D1%83%D0%BB%D0%BE%D0%B9,13%2C%2021...%20.
// Найти сумму всех чисел в заданном диапазоне.

// const fibonacci = (value: number): number => {
// 	let sum = 0;
// 	let prevPrevSum = 0;
// 	let prevSum = 1;
// 	for (let i = 1; i <= value; i++) {
// 		sum = prevPrevSum + prevSum;
// 		prevPrevSum = prevSum;
// 		prevSum = sum;
// 	}
// 	return sum;
// };

// console.log(fibonacci(3)); // 2
// console.log(fibonacci(7)); // 13
// console.log(fibonacci(77)); // 5527939700884757
