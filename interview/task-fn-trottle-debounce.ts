/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Задачи на работу с массивами
 * https://habr.com/ru/articles/741108/
 */

/**
 * Написать собственные функции debounce и throttle
 **/

{
	const throttle = (fn, interval, mystUseLastValue?) => {
		let timer;
		let throttledArgs;
		let throttledContext;
		return function (...args) {
			if (mystUseLastValue) {
				throttledArgs = args;
				// @ts-ignore
				throttledContext = this;
			} else if (throttledArgs === undefined) {
				throttledArgs = args;
				// @ts-ignore
				throttledContext = this;
			}
			if (!timer) {
				timer = setTimeout(() => {
					fn.apply(throttledContext, throttledArgs);
					throttledArgs = undefined;
				}, interval);
			}
		};
	};

	const throttledLogFirstValue = throttle((...args) => console.log(...args), 200);
	const throttledLogLastValue = throttle((...args) => console.log(...args), 200, true);

	let count = 0;
	throttledLogFirstValue('throttledLogFirstValue', count++);
	throttledLogLastValue('throttledLogLastValue', count++);
	throttledLogFirstValue('throttledLogFirstValue', count++);
	throttledLogLastValue('throttledLogLastValue', count++);
	throttledLogFirstValue('throttledLogFirstValue', count++);
	throttledLogLastValue('throttledLogLastValue', count++);
	throttledLogFirstValue('throttledLogFirstValue', count++);
	throttledLogLastValue('throttledLogLastValue', count++);

	const debounce = (fn, interval, mystUseLastValue?) => {
		let timer: NodeJS.Timeout;
		let debouncedArgs;
		let debouncedContext;
		return function (...args) {
			if (mystUseLastValue) {
				debouncedArgs = args;
				// @ts-ignore
				debouncedContext = this;
			} else if (debouncedArgs === undefined) {
				debouncedArgs = args;
				// @ts-ignore
				debouncedContext = this;
			}
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				fn.apply(debouncedContext, debouncedArgs);
				debouncedArgs = undefined;
			}, interval);
		};
	};

	const debouncedLogFirstValue = debounce(
		function () {
			// @ts-ignore
			// eslint-disable-next-line prefer-rest-params
			console.log(this, ...arguments);
		}.bind({ a: 1 }),
		200,
	);
	const debouncedLogLastValue = debounce((...args) => console.log(...args), 200, true);

	count = 0;
	debouncedLogFirstValue('debouncedLogFirstValue', count++);
	debouncedLogLastValue('debouncedLogLastValue', count++);
	debouncedLogFirstValue('debouncedLogFirstValue', count++);
	debouncedLogLastValue('debouncedLogLastValue', count++);
	debouncedLogFirstValue('debouncedLogFirstValue', count++);
	debouncedLogLastValue('debouncedLogLastValue', count++);
	debouncedLogFirstValue('debouncedLogFirstValue', count++);
	debouncedLogLastValue('debouncedLogLastValue', count++);
}

{
	const debounce = (fn: (...args: unknown[]) => unknown, delay: number) => {
		let timer;
		return (...args: unknown[]) => {
			clearTimeout(timer);
			timer = setTimeout(fn, delay, ...args);
		};
	};

	const logDebounced = debounce(console.log, 1000);
	logDebounced('1');
	logDebounced('2');
	logDebounced('3');
	logDebounced('4');
	logDebounced('5');

	const throttle = (fn: (...args: unknown[]) => unknown, delay: number) => {
		let memoisedArgs: unknown[];
		let timer: NodeJS.Timeout;
		return (...args: unknown[]) => {
			if (!timer) {
				fn(...args);
				timer = setTimeout(() => fn(...memoisedArgs), delay);
			} else {
				memoisedArgs = args;
			}
		};
	};

	const logThrottled = throttle(console.log, 10000);
	logThrottled('1');
	logThrottled('2');
	logThrottled('3');
	logThrottled('4');
	logThrottled('6');
}
