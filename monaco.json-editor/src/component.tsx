import React from 'react';

import type { ComponentProps } from './component.types';

export const Component: React.FC<ComponentProps> = props => (
	<div>
		{Object.entries(props).map(([key, value]) => (
			<div>
				{key}: {value}
			</div>
		))}
	</div>
);
