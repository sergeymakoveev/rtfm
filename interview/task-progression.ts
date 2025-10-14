/**
 * Найти пропущенное число в массиве натуральных чисел от 0 до т
 */
{
	const srcArray = [8, 5, 6, 3, 1, 2, 4, 0];
	if (true) {
		const sortedArray = srcArray.sort((a, b) => a - b);
		// eslint-disable-next-line no-var
		for (let i = 0; i < sortedArray.length; i++) {
			if (sortedArray[i] !== i) {
				console.log('## ', { lostNumber: i });
				break;
			}
		}
	}

	if (true) {
		// сумма n-членов арифметической прогрессии через итерации
		const progress = (n: number): number => {
			let result = 0;
			for (let i = 1; i < n; i++) {
				result += i;
			}
			return result;
		};

		// сумма n-членов арифметической прогрессии через формулу
		const dstArraySum = (srcArray.length / 2) * (srcArray.length + 1);
		const srcArraySum = srcArray.reduce((acc, n) => acc + n, 0);
		console.log('## ', {
			dstArraySum,
			progress: progress(srcArray.length + 1),
			// пропущенное число
			lostNumber: dstArraySum - srcArraySum,
		});
	}
}
