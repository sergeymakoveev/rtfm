import * as React from 'react';

import { ReactWrapper } from 'enzyme';
import { RunOptions } from 'axe-core';

import { runAxe } from './runAxe';
import { mountComponent } from './mountComponent';

type Action<PropType extends {}> = (container: ReactWrapper<PropType>) => any | Promise<any>;

/**
 * @description Use this function for fast tests.
 * @param element React element to test
 * @param action options action that u want to apply to ur container
 * @returns Axe results
 */
export const checkAccessibility = async <PropType extends {}>(
	component: React.ReactElement<PropType> | ((container: Element) => React.ReactElement<PropType>),
	action?: Action<PropType>,
	options?: RunOptions,
) => {
	const wrapper = document.documentElement.appendChild(document.createElement('div'));
	const element = typeof component === 'function' ? component(wrapper) : component;
	const container = mountComponent(element, wrapper);

	if (action) {
		await action(container);
	}
	const result = await runAxe(wrapper, options);

	container.unmount();
	wrapper.remove();

	return result;
};
