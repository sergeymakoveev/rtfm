import * as React from 'react';

import { spy } from 'sinon';
import { mount } from 'enzyme';

import { Button } from '../button';
import { checkAccessibility } from '../../testing/checkAccessibility';

const className = 'button';

describe('<Button />', () => {
	it('is accessible', async done => {
		const agent = spy();
		const results = await checkAccessibility(
			<Button className={className} onClick={agent}>
				Text
			</Button>,
			container => {
				container.find(`.${className}`).first().simulate('keydown', { key: 'Enter' });
			},
		);
		expect(agent.calledOnce).toBeTruthy();
		expect(results.violations).toEqual([]);
		done();
	});

	it('is accessible with isLoading', async done => {
		const result = await checkAccessibility(<Button isLoading>Text</Button>);

		expect(result.violations).toEqual([]);
		done();
	});

	it('<div />: check accessibility', async done => {
		const result = await checkAccessibility(<div />);

		expect(result.violations).toEqual([]);
		done();
	});

	it('has correct ref', () => {
		const ref = React.createRef<HTMLDivElement>();
		mount(<Button ref={ref}>Text</Button>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
