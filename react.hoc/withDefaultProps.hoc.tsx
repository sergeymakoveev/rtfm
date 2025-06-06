import React from 'react';

import { PartialKeys } from '../ts.types/helpers';

export function withDefaultProps<DefaultProps extends Record<string, unknown>, Props extends DefaultProps>(
	Component: React.ComponentType<Props>,
	defaultProps: DefaultProps,
	displayName?: string,
): React.ComponentType<PartialKeys<Props, keyof DefaultProps>> {
	const ComponentWithDefaultProps: React.ComponentType<PartialKeys<Props, keyof DefaultProps>> = partialProps => {
		const propsWithDefaults = { ...defaultProps, ...partialProps } as Props;
		return <Component {...propsWithDefaults} />;
	};

	// Improve debugging experience
	ComponentWithDefaultProps.displayName = displayName || `Partial(${Component.displayName || Component.name})`;

	return ComponentWithDefaultProps;
}

type ComponentProps = { a: string; b: string; c: string; d: string };
const Component: React.FC<ComponentProps> = ({ a, b, c, d }) => (
	<div>
		{a}
		{b}
		{c}
		{d}
	</div>
);

const defaultProps = { c: 'c', d: 'd' };
const ComponentWithDefaultProps = withDefaultProps(Component, defaultProps);

const _TestComponent: React.FC = () => (
	<div>
		<ComponentWithDefaultProps a="a" b="b" />
		<ComponentWithDefaultProps a="a" b="b" c="cc" />
		<ComponentWithDefaultProps a="a" b="b" c="cc" d="dd" />
	</div>
);
