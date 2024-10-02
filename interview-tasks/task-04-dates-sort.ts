// https://habr.com/ru/articles/351874/
// 12. Есть массив в котором лежат объекты с датами, отсортировать по датам.

const dates = new Array(20)
	.fill(Date.now())
	.map((timestamp: number) => (timestamp - Math.random() * 100000000000).toFixed())
	.map(timestamp => new Date(+timestamp));

console.log(
	dates.sort((a, b) => {
		const aIso = a.toISOString();
		const bIso = b.toISOString();
		return aIso > bIso ? 1 : aIso < bIso ? -1 : 0;
	}),
);
