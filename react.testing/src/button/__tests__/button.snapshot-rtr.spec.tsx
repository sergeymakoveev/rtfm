/**
 * Use react-test-renderer
 * https://ru.reactjs.org/docs/test-renderer.html
 * https://www.npmjs.com/package/react-test-renderer
 * https://jestjs.io/docs/tutorial-react#snapshot-testing
 */

import React from 'react';

import { create, act, ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer';

import { Button } from '../button';

const className = 'ClassName';

type Tree = ReturnType<ReactTestRenderer['toJSON']>;
const getFirstTree = (tree: Tree): ReactTestRendererJSON | undefined =>
	(Array.isArray(tree) ? [...tree] : tree ? [tree] : []).shift();

describe('<Button />', () => {
	it('Button changes the class when hovered', async done => {
		const component = create(<Button>Hi!</Button>);

		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();

		// manually trigger the callback
		act(() => getFirstTree(tree)?.props.onMouseEnter());
		// re-rendering
		tree = component.toJSON();
		expect(tree).toMatchSnapshot();

		// manually trigger the callback
		act(() => getFirstTree(tree)?.props.onMouseLeave());
		// re-rendering
		tree = component.toJSON();
		expect(tree).toMatchSnapshot();
		done();
	});

	it('Button apply value from className prop', () => {
		const component = create(<Button className={className}>Hey!</Button>);
		const instance = component.getInstance();
		if (instance) {
			expect(instance.props.className).toEqual(className);
		}
	});
});
