/**
 * Задачи на работу с массивами
 * https://habr.com/ru/articles/741108/
 */
{
	type Interval = [min: number, max: number];

	type Intervals = Interval[];

	const merge = (...intervals: Intervals) => {
		const sortedBoundaries = Array.from(
			new Set(
				intervals
					.sort(([aStart], [bStart]) => (aStart > bStart ? 1 : aStart < bStart ? -1 : 0))
					.map(([start, end]) => new Array(end - start + 1).fill(1).map((_, i) => i + start))
					.flat()
					.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0)),
			),
		);

		const [start, end, ...restSortedBoundaries] = sortedBoundaries;
		const mergedIntervals = [[start, end]];
		for (const boundary of restSortedBoundaries) {
			const [start, end] = mergedIntervals.pop() ?? [];
			if (start !== undefined && end !== undefined) {
				if (boundary === end + 1) {
					mergedIntervals.push([start, boundary]);
				} else {
					mergedIntervals.push([start, end]);
					mergedIntervals.push([boundary, boundary]);
				}
			}
		}
		return mergedIntervals;
	};

	console.log('## merge', merge([11, 12], [2, 3], [5, 7], [1, 4], [8, 10], [6, 8]));
	console.log('## merge', merge([11, 12], [2, 3], [6, 7], [1, 4], [6, 8]));
}
/*
{
	// Объединение интервалов в массиве
	console.log('\n--- Объединение интервалов в массиве '.padEnd(80, '-'), '\n');

	type Interval = [min: number, max: number];

	type Intervals = Interval[];

	const array1: Intervals = [
		[1, 3],
		[2, 6],
		[8, 10],
		[15, 18],
	]; // [[1, 6], [8, 10], [15, 18]]

	const res1 = [
		[1, 6],
		[8, 10],
		[15, 18],
	];

	const array2: Intervals = [
		[1, 4],
		[4, 5],
	]; // [[1, 5]]

	const res2 = [[1, 5]];

	const array3: Intervals = [
		[11, 12],
		[2, 3],
		[5, 7],
		[1, 4],
		[8, 10],
		[6, 8],
	]; // [[1, 4], [5, 10], [11, 12]]

	const res3 = [
		[1, 4],
		[5, 10],
		[11, 12],
	];

	const array4: Intervals = [
		[2, 4],
		[1, 5],
	]; // [[1, 5]]

	const res4 = [[1, 5]];

	const arrays = [
		[array1, res1],
		[array2, res2],
		[array3, res3],
		[array4, res4],
	];

	const checkHasIntersection = ([minA, maxA]: Interval, [minB]: Interval) => minB >= minA && minB <= maxA;

	const merge = (intervals: Intervals): Intervals => {
		const mergedIntervals: Intervals = [];
		const sortedIntervals = [...intervals.sort(([minA], [minB]) => (minA > minB ? 1 : -1))];
		// console.log('## ', { sortedIntervals });
		let interval = sortedIntervals.shift();

		while (sortedIntervals.length > 0) {
			const nextInterval = sortedIntervals.shift();
			if (interval && nextInterval) {
				const hasIntersection = checkHasIntersection(interval, nextInterval);
				// console.log('## ', { interval, nextInterval, isInner, isOuter, isIntersectionLeft, isIntersectionRight });
				if (hasIntersection) {
					interval = [interval[0], Math.max(interval[1], nextInterval[1])];
				} else {
					mergedIntervals.push(interval);
					interval = nextInterval;
				}
				// console.log('## ', { nextInterval, mergedInterval, interval, mergedIntervals });
			}
		}

		interval && mergedIntervals.push(interval);

		return mergedIntervals;
	};

	function merge1(intervals: Intervals) {
		if (intervals.length < 2) {
			return intervals;
		}

		intervals.sort((a, b) => a[0] - b[0]);

		const result = [intervals[0]];

		for (const interval of intervals) {
			const recent = result[result.length - 1];
			if (recent[1] >= interval[0]) {
				recent[1] = Math.max(recent[1], interval[1]);
			} else {
				result.push(interval);
			}
		}

		return result;
	}

	const mergeApply = (mergeFn: (Intervals) => Intervals) => {
		for (const [array, res] of arrays) {
			console.log('src: ', array);
			console.log('mrg: ', mergeFn(array));
			console.log('res: ', res);
			console.log('---');
		}
	};

	mergeApply(merge);
	mergeApply(merge1);
}
*/
