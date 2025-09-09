/*
11. Минимум на отрезке
Рассмотрим последовательность целых чисел длины n.

По ней двигается «окно» длины k
сначала в «окне» находятся первые k чисел, на следующем шаге в «окне» уже будут находиться
k чисел, начиная со второго, и так далее до конца последовательности.

Требуется для каждого положения «окна» определить минимум в нём.
*/

{
	const testValues: [number, number[]][] = [
		[3, [1, 3, 2, 4, 5, 3, 1]],
		[1, [1, 3, 2, 4, 5, 3, 1]],
		[100, [1, 3, 2, 4, 5, 3, 1]],
		[1, [1]],
	];
	const test = (fn: (windowLength: number, numbers: number[]) => void) => {
		console.log('=====');
		for (const testValue of testValues) {
			fn(...testValue);
		}
	};

	if (true) {
		function solution(windowLength, numbers) {
			const maxIndex = numbers.length - 1;
			let windowStartIndex = 0;

			// console.log('## ', { windowLength, numbers });

			if (windowLength >= numbers.length) {
				console.log(Math.min(...numbers));
				return;
			}

			while (windowStartIndex + windowLength - 1 <= maxIndex) {
				const window = numbers.slice(windowStartIndex, windowStartIndex + windowLength);
				console.log(Math.min(...window), window);
				windowStartIndex++;
			}
		}

		test(solution);
	}
}
