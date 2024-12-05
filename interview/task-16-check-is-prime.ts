// https://habr.com/ru/articles/741108/
// https://learn.javascript.ru/task/list-primes
// Проверить, является ли заданное число простым

const checkIsPrime = (number: number) => {
	for (let i = 2; i < number; i++) {
		if (number % i === 0) {
			return false;
		}
	}
	return number <= 1 ? false : true;
};

for (let number = 0; number < 100; number++) {
	console.log(number, checkIsPrime(number));
}
