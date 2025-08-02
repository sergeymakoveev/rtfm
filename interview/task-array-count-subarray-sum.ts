/**
 * Нахождение числа подмассивов с заданной суммой.
 */

if (true) {
	function solution(k, numbers) {
		let variantCount = 0;

		for (let i = 0; i < numbers.length; i++) {
			let summ = 0;
			for (let j = i; j < numbers.length; j++) {
				summ += +numbers[j];
				if (summ === k) {
					variantCount++;
					break;
				}
				if (summ > k) {
					break;
				}
			}
		}
		console.log(variantCount);
	}
	solution(17, [17, 7, 10, 7, 10]); // 4
	solution(10, [1, 2, 3, 4, 1]); // 2
}
