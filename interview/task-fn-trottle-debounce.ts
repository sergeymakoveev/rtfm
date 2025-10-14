/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Задачи на работу с массивами
 * https://habr.com/ru/articles/741108/
 */

/**
 * Написать собственные функции debounce и throttle
 **/
{
	if (false) {
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

	if (false) {
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

	if (false) {
		const logging = name => value => console.log(name, value);

		const debounceStart = (fn, interval) => {
			let timer;
			let firstArgs;
			return (...args) => {
				if (!firstArgs) {
					firstArgs = args;
				}
				clearTimeout(timer);
				timer = setTimeout(fn, interval, firstArgs);
			};
		};

		const debounceEnd = (fn, interval) => {
			let timer;
			return (...args) => {
				clearTimeout(timer);
				timer = setTimeout(fn, interval, args);
			};
		};

		const throttleStart = (fn, interval) => {
			let timer;
			return (...args) => {
				if (!timer) {
					timer = setTimeout(fn, interval, args);
				}
			};
		};

		const throttleEnd = (fn, interval) => {
			let timer;
			let lastArgs;
			return (...args) => {
				lastArgs = args;
				if (!timer) {
					timer = setTimeout(() => fn(lastArgs), interval);
				}
			};
		};

		const loggingDebouncedStart = debounceStart(logging('debounceStart'), 300);
		loggingDebouncedStart(1);
		setTimeout(loggingDebouncedStart, 100, 3);
		loggingDebouncedStart(2);

		const loggingDebouncedEnd = debounceEnd(logging('debounceEnd'), 300);
		loggingDebouncedEnd(1);
		setTimeout(loggingDebouncedEnd, 100, 3);
		loggingDebouncedEnd(2);

		const loggingThrottledStart = throttleStart(logging('throttleStart'), 300);
		loggingThrottledStart(1);
		setTimeout(loggingThrottledStart, 100, 3);
		loggingThrottledStart(2);

		const loggingThrottledEnd = throttleEnd(logging('throttleEnd'), 300);
		loggingThrottledEnd(1);
		setTimeout(loggingThrottledEnd, 100, 3);
		loggingThrottledEnd(2);
	}

	if (false) {
		const debounce = (fn: Function, timeout: number) => {
			let debounceTimer: NodeJS.Timeout | undefined = undefined;
			return (...fnArgs) => {
				clearTimeout(debounceTimer);
				debounceTimer = setTimeout(() => fn(...fnArgs), timeout);
			};
		};

		const fn = () => console.log('debounce');
		const debouncedFn = debounce(fn, 1000);
		debouncedFn();
	}

	const delayedPromise = <T>(timeout: number, value: T | Error) =>
		new Promise((resolve, reject) => {
			setTimeout(value instanceof Error ? reject : resolve, timeout, value);
		});

	if (false) {
		const debounce = (fn: (...args: unknown[]) => unknown, timeout: number) => {
			let timer;
			return (...args: unknown[]) => {
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(fn, timeout, args);
			};
		};

		const debounced20 = debounce((...args) => console.log('debounced20:', args), 20);
		debounced20('start');

		(async () => {
			for (const value of '0123456789') {
				console.time(value);
				debounced20(value);
				await delayedPromise(15 + +value, value);
				console.timeEnd(value);
			}
		})();
	}

	if (true) {
		const throttle = (fn: (...args: unknown[]) => unknown, timeout: number) => {
			let timer;
			let appliedArgs;
			return (...args: unknown[]) => {
				appliedArgs = args;
				if (!timer) {
					timer = setTimeout(() => {
						timer = undefined;
						fn(appliedArgs);
					}, timeout);
				}
			};
		};

		const throttle30 = throttle((...args) => console.log('throttle30:', args), 30);
		throttle30('start');

		(async () => {
			for (const value of '0123456789') {
				console.time(value);
				throttle30(value);
				await delayedPromise(10, value);
				console.timeEnd(value);
			}
		})();
	}
}
