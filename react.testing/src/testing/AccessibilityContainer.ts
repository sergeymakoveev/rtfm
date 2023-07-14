import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { runAxe } from './runAxe';
import { mountComponent } from './mountComponent';

type Action<PropType extends {}> = (container: ReactWrapper<PropType>) => any | Promise<any>;

export class AccessibilityContainer<PropType> {
	private wrapper = document.documentElement.appendChild(document.createElement('div'));
	private container: ReactWrapper<PropType>;
	constructor(component: React.ReactElement<PropType> | ((container: Element) => React.ReactElement<PropType>)) {
		const element = typeof component === 'function' ? component(this.wrapper) : component;
		this.container = mountComponent(element, this.wrapper);
	}

	/**
	 * @param cb action to do
	 * @returns the result of the action
	 */
	action<Result>(cb: (container: ReactWrapper<PropType>) => Result): Result {
		const result = cb(this.container);

		return result;
	}

	/**
	 * @param action optional function to do actions before the axe test
	 * @returns {Promise<AxeResults>}
	 * @description method that runs the axe tests
	 */
	async axeCheck(action?: Action<PropType>) {
		if (action) {
			await action(this.container);
		}
		return runAxe(this.wrapper);
	}
	/**
	 *  @description Do not forget to run this method after all tests with the container.
	 */
	destroy() {
		this.container.unmount();
		this.wrapper.remove();
	}
}
