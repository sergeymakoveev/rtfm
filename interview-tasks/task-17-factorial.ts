// https://habr.com/ru/articles/741108/
// Вычислить факториал заданного числа

const factorial = (value: number): number => (value > 1 ? value * factorial(--value) : 1);

console.log(5, factorial(5));
console.log(15, factorial(15));
