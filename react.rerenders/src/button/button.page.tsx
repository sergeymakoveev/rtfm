import React from 'react';

import { Button } from './button';

export const ButtonPage = React.memo(() => {
	const handleClick = React.useCallback(() => {
		console.log(this);
	}, []);
	return <Button onClick={handleClick}>Button text</Button>;
});
