{
	const delayedPromise = <T>(promiseSrc: Promise<T>, timeout): Promise<T> =>
		new Promise<T>((resolve, reject) => {
			promiseSrc.then(
				result => {
					setTimeout(resolve, timeout, result);
				},
				error => {
					setTimeout(reject, timeout, error);
				},
			);
		});

	delayedPromise(Promise.resolve(1), 1000)
		.then(result => console.log('delayedPromise:', result))
		.catch(error => console.log('delayedPromise:', error));

	if (false) {
		function cancellableTimeout(callback, delay, signal) {
			if (signal.aborted) {
				return;
			}

			const timeoutId = setTimeout(() => {
				if (!signal.aborted) {
					callback();
				}
			}, delay);

			const onAbort = () => clearTimeout(timeoutId);
			signal.addEventListener('abort', onAbort, { once: true });

			return timeoutId;
		}

		// Использование
		const controller = new AbortController();

		cancellableTimeout(
			() => {
				console.log('Таймер сработал!');
			},
			3000,
			controller.signal,
		);

		// Отмена
		controller.abort();
	}

	/*
Отменяемый timeout через AbortSignal
*/

	if (false) {
		const cancellableTimeout = (callback: () => void, timeout: number, signal: AbortSignal) => {
			console.log('timeout is started');

			const handleAbort = () => clearTimeout(timer);
			const cancellableCallback = () => !signal.aborted && callback();
			// signal.throwIfAborted();
			signal.addEventListener('abort', handleAbort, { once: true });
			const timer = setTimeout(cancellableCallback, timeout);
			return timer;
		};

		const abController = new AbortController();
		const abSignal = abController.signal;
		// const abSignal = AbortSignal.timeout(1000);
		abSignal.addEventListener(
			'abort',
			event => {
				console.log(abSignal.reason, '\n', event);
			},
			{ once: true },
		);
		cancellableTimeout(() => console.log('timeout is done'), 2000, abSignal);
		setTimeout(() => abController.abort('timeout is aborted'), 3000);
		// abController.abort('timeout is aborted');
	}

	/*
Отменяемый promise через AbortSignal
*/
	if (true) {
		const cancellablePromise = <T>(promiseSrc: Promise<T>, signal: AbortSignal): Promise<T> =>
			new Promise<T>((resolve, reject) => {
				promiseSrc.then(resolve, reject);
				const handleAbort = () => reject(Error(signal.reason));
				signal.addEventListener('abort', handleAbort, { once: true });
			});

		const abController = new AbortController();
		const abSignal = abController.signal;
		// const abSignal = AbortSignal.timeout(1000);
		// abSignal.addEventListener(
		// 	'abort',
		// 	event => {
		// 		console.log(abSignal.reason, '\n', event);
		// 	},
		// 	{ once: true },
		// );
		cancellablePromise(delayedPromise(Promise.resolve(1), 2000), abSignal).then(
			result => console.log('cancellablePromise:', { result }),
			error => console.log('cancellablePromise:', { error: error.message }),
		);
		setTimeout(() => abController.abort('promise is aborted'), 1000);
		// abController.abort('timeout is aborted');
	}
}
