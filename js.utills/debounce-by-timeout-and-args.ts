import { default as fp } from 'lodash/fp';

export const debounceByTimeoutAndArgs = <F extends (...args: Parameters<F>) => ReturnType<F>>(func: F) => (
	waitFor: number,
): ((...args: Parameters<F>) => void) => {
	let timeout: ReturnType<typeof setTimeout>;
	let argsPrev: Parameters<F> | undefined = undefined;
	return (...args: Parameters<F>): void => {
		clearTimeout(timeout);
		if (argsPrev !== undefined && !fp.isEqual(args, argsPrev)) {
			func(...(argsPrev as Parameters<F>));
		}
		timeout = setTimeout(() => func(...args), waitFor);
		argsPrev = args;
	};
};
