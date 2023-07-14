import React from 'react';

import { default as cn } from 'classnames';

import { default as css } from './button.module.css';

type ButtonRawProps = {
	children?: React.ReactNode;
	innerRef?: React.Ref<HTMLDivElement>;
	className?: string;
	isLoading?: boolean;
	onClick?: () => void;
};

const ButtonRaw = React.memo<ButtonRawProps>(props => {
	const { children, innerRef, onClick } = props;
	const [isHover, setHover] = React.useState(false);
	const className = cn(css.container, props.className, { [css.hover]: isHover });
	const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
		e => e.key === 'Enter' && onClick?.(),
		[onClick],
	);
	const handleMouseEnter = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(() => setHover(true), []);
	const handleMouseLeave = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(() => setHover(false), []);
	return (
		<div
			ref={innerRef}
			className={className}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			{children}
		</div>
	);
});

type ButtonProps = Omit<ButtonRawProps, 'innerRef'>;
export const Button = React.forwardRef<HTMLDivElement, ButtonProps>((props, ref) => (
	<ButtonRaw {...props} innerRef={ref} />
));
