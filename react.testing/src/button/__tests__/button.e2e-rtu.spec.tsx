/**
 * Use react-dom/test-utils
 * https://ru.reactjs.org/docs/test-utils.html
 */

import React from 'react';

import ReactDom from 'react-dom';
import { act, Simulate, isDOMComponent, isCompositeComponent } from 'react-dom/test-utils';

import { Button } from '../button';

const className = 'button';

let container: HTMLDivElement | null = null;
beforeEach(done => {
	container = document.createElement('div');
	document.body.appendChild(container);
	done();
});

afterEach(() => {
	if (container !== null) {
		ReactDom.unmountComponentAtNode(container);
		container.remove();
		container = null;
	}
});

describe('<Button />', () => {
	it('has content', async done => {
		act(() => {
			ReactDom.render(
				<Button className={className}>
					<Button>Hi!</Button>
				</Button>,
				container,
			);
		});
		console.log('## document', document);
		console.log('## container', container?.outerHTML);
		const button = container?.querySelector(`.${className}`);

		if (button) {
			expect(button.textContent).toBe('Hi!');
			act(() => {
				button.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
			});
			expect(button.classList.contains('hover')).toBe(true);

			Simulate.mouseLeave(button);
			expect(button.classList.contains('hover')).toBe(false);

			expect(isDOMComponent(button)).toBe(true);

			console.log('## ', isCompositeComponent(button));
		}

		done();
	});
});
