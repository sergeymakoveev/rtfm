/**
 * https://purpleschool.ru/blog/pyat-zadach-dlya-javascript-razrabotchikov
 * Задача 4:
 * Нахождение подмассива с максимальной суммой.
 * Описание задачи:
 * Напишите функцию для нахождения непрерывного подмассива в массиве целых чисел, который имеет максимальную сумму элементов.
 * https://learn.javascript.ru/task/maximal-subarray
 */

// Примеры использования:
// console.log(getSubarrayMaxSum([1, 2, 3, 4]), 10);
// console.log(getSubarrayMaxSum([-1, 2, 3, -9]), 5);
// console.log(getSubarrayMaxSum([2, -1, 2, 3, -9]), 6);
// console.log(getSubarrayMaxSum([-1, 2, 3, -9, 11]), 11);
// console.log(getSubarrayMaxSum([-2, -1, 1, 2]), 3);
// console.log(getSubarrayMaxSum([100, -9, 2, -3, 5]), 100);
// console.log(getSubarrayMaxSum([1, 2, 3]), 6);

{
	const getSubarrayMaxSum = (array: number[]) => {
		const subarraySums: number[] = [];
		for (let i = 0; i < array.length; i++) {
			let subarraySum = 0;
			for (let j = i; j < array.length; j++) {
				subarraySum += array[j];
				subarraySums.push(subarraySum);
			}
		}
		return Math.max(...subarraySums);
	};

	const getSubarrayMaxSum1 = (array: number[]) => {
		let subarrayMaxSum = 0;
		let subarrayPartialSum = 0;
		for (const item of array) {
			subarrayPartialSum += item;
			subarrayMaxSum = Math.max(subarrayMaxSum, subarrayPartialSum);
			subarrayPartialSum = Math.max(0, subarrayPartialSum);
		}
		return subarrayMaxSum;
	};

	((data: [number[], number][]) => {
		for (const [array, result] of data) {
			console.log(result, getSubarrayMaxSum(array), getSubarrayMaxSum1(array));
		}
	})([
		[[1, 2, 3, 4], 10],
		[[-1, 2, 3, -9], 5],
		[[2, -1, 2, 3, -9], 6],
		[[-1, 2, 3, -9, 11], 11],
		[[-2, -1, 1, 2], 3],
		[[100, -9, 2, -3, 5], 100],
		[[1, 2, 3], 6],
		// не работает
		[[-1, -2, -3], -1],
	] as const);
}

{
	const getSubarrayMaxSum = (arr: number[]) => {
		let subarray: number[] = [];
		let subarrayMaxSumm = 0;
		for (let i = 0; i < arr.length; i++) {
			let currentSumm = 0;
			for (let j = i; j < arr.length; j++) {
				currentSumm += arr[j];
				if (currentSumm > subarrayMaxSumm) {
					subarrayMaxSumm = currentSumm;
					subarray = arr.slice(i, j + 1);
				}
			}
		}
		return [subarray, subarrayMaxSumm];
	};

	console.log(getSubarrayMaxSum([1, 2, 3, 4]), 10);
	console.log(getSubarrayMaxSum([-1, 2, 3, -9]), 5);
	console.log(getSubarrayMaxSum([2, -1, 2, 3, -9]), 6);
	console.log(getSubarrayMaxSum([-1, 2, 3, -9, 11]), 11);
	console.log(getSubarrayMaxSum([-2, -1, 1, 2]), 3);
	console.log(getSubarrayMaxSum([100, -9, 2, -3, 5]), 100);
	console.log(getSubarrayMaxSum([1, 2, 3]), 6);
	// не работает
	console.log(getSubarrayMaxSum([-1, -2, -3]), -1);
}
