/**
 * Use @testing-library/react
 * https://testing-library.com/docs/react-testing-library/intro/
 */

import React from 'react';

import { render, screen } from '@testing-library/react';
import { Button } from '../button';

const className = 'button';

describe('<Button />', () => {
	it('has content', async done => {
		render(<Button className={className}>Hi!</Button>);
		screen.debug();
		done();
	});
});
