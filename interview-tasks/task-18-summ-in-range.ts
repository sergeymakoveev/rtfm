// https://habr.com/ru/articles/741108/
// Найти сумму всех чисел в заданном диапазоне.

const sumRange = ([min, max]: [number, number]): number => {
	let current = min;
	let sum = min;
	while (++current <= max) {
		sum += current;
	}
	return sum;
};

console.log([1, 3], sumRange([-3, 3]));
