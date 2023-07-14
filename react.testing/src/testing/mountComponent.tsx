import * as React from 'react';

import { mount } from 'enzyme';

export const mountComponent = <PropsType extends {}>(element: React.ReactElement<PropsType>, target: HTMLElement) => {
	const container = mount<PropsType>(element, { attachTo: target });

	return container;
};
