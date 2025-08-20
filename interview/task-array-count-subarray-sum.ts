/**
 * Нахождение числа подмассивов с заданной суммой.
 */

// Не оптимальное решение, сложность O(n^2) (вложенные циклы)
if (true) {
	function solution(sum, numbers) {
		let variantCount = 0;

		for (let i = 0; i < numbers.length; i++) {
			let currentSum = 0;
			for (let j = i; j < numbers.length; j++) {
				currentSum += +numbers[j];
				if (currentSum === sum) {
					variantCount++;
					break;
				}
				if (currentSum > sum) {
					break;
				}
			}
		}
		console.log(variantCount);
	}
	solution(17, [17, 7, 10, 7, 10]); // 4
	solution(10, [1, 2, 3, 4, 1]); // 2
	solution(10, [1, 2, 3, 4, 5]); // 1
	solution(10, [1, 2, 3, 4, 1, 2, 3, 4]); // 5
	solution(15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5]); // 4
}

// Оптимальное решение, сложность O(n), один цикл, "плавающее окно"
if (true) {
	function solution(sum, numbers) {
		let start = 0;
		let end = 0;
		let variantsCount = 0;
		let currentSum = +numbers[start];
		let countRecursion = 0;
		const maxIndex = numbers.length - 1;

		// while (end <= maxIndex && countRecursion++ < 20) {
		while (end <= maxIndex) {
			if (currentSum === sum) {
				variantsCount++;
			}
			if (currentSum >= sum) {
				currentSum -= +numbers[start];
				start++;
				if (end < start) {
					end = start;
					currentSum += +(numbers[end] ?? 0);
				}
			}
			if (currentSum < sum) {
				end++;
				currentSum += +(numbers[end] ?? 0);
			}
			// console.log(start, end, currentSum, variantsCount);
		}
		console.log(variantsCount);
	}
	// Простые случаи
	solution(17, [17]); // 1
	solution(7, [7, 10]); // 1
	solution(17, [17, 7, 10]); // 2

	// Сложные случаи
	solution(17, [17, 7, 10, 7, 10]); // 4
	solution(10, [1, 2, 3, 4, 1]); // 2
	solution(15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // 3
	// 1 15      [1, 2, 3, 4, 5]
	//   14         [2, 3, 4, 5]
	//   20         [2, 3, 4, 5, 6]
	//   18            [3, 4, 5, 6]
	// 2 15               [4, 5, 6]
	//   11                  [5, 6]
	//   18                  [5, 6, 7]
	//   13                     [6, 7]
	//   21                     [6, 7, 8]
	// 3 15                        [7, 8]
	//   8                            [8]
	//   17                           [8 ,9]
	//   9                               [9]
	//   19                              [9, 10]

	// Пустой массив
	solution(17, []); // 0

	// Подмассивы с разными суммами
	solution(10, [1, 2, 3, 4, 5]); // 1
	//           [1]
	//           [1, 2]
	//           [1, 2, 3]
	// 1         [1, 2, 3, 4]
	//              [2, 3, 4, 5]
	//                 [3, 4, 5]
	//                    [4, 5]
	//                       [5]
	solution(15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // 3

	// Несколько подмассивов с одинаковой суммой
	solution(10, [1, 2, 3, 4, 1, 2, 3, 4]); // 4
	solution(15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5]); // 6
}
