import { AxeResults, run, RunOptions } from 'axe-core';

const defaultOptions: RunOptions = {
	rules: {
		'color-contrast': { enabled: false },
		'link-in-text-block': { enabled: false },
	},
};

export const runAxe = (element: HTMLElement, options: RunOptions = defaultOptions) =>
	new Promise<AxeResults>((resolve, reject) => {
		run(element, options, (err, result) => {
			if (err) {
				return reject(err);
			}
			resolve(result);
		});
	});
