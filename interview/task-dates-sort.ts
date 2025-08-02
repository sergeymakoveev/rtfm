// https://habr.com/ru/articles/351874/
// 12. Есть массив в котором лежат объекты с датами, отсортировать по датам.

{
	const dates: Date[] = new Array(20)
		.fill(Date.now())
		.map(dateTimestamp => new Date(dateTimestamp - Math.round(Math.random() * 1000 * 60 * 60 * 24 * 30 * 3)));
	const sortedDates = dates.toSorted((a, b) => {
		const aTime = a.getTime();
		const bTime = b.getTime();
		return aTime > bTime ? 1 : aTime < bTime ? -1 : 0;
	});
	console.log('## ', { dates, sortedDates });
}

{
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
}
