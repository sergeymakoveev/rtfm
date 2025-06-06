import React from 'react';

export type ComponentProps = {
	paramBooleanRequired: boolean;
	paramNumber?: number;
	paramStringRequired: string;
};

export const Component: React.FC<ComponentProps> = props => (
	<div>
		{Object.entries(props).map(([key, value]) => (
			<div>
				{key}: {value}
			</div>
		))}
	</div>
);
