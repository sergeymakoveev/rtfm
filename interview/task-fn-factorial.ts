// https://habr.com/ru/articles/741108/
// Вычислить факториал заданного числа
{
	const factorial = (value: number): number => (value > 1 ? value * factorial(--value) : 1);

	console.log(5, factorial(5));
	console.log(15, factorial(15));
}
{
	const factorial = (input: number) => (input === 0 ? 1 : input * factorial(input - 1));
	console.log('## factorial(5):', factorial(5));
}
// C оптимизацией хвостовой рекурсии
{
	const factorial = (value: number, acc: number = 1) => (value === 0 ? acc : factorial(value - 1, acc * value));
	console.log('## factorial(5):', factorial(5));
}
