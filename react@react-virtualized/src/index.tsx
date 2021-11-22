/**
 * [react-virtualized](https://github.com/bvaughn/react-virtualized)
 */

import React from 'react';
import { render } from 'react-dom';

const Index = memo(() => {
	const Resolved = useSink(() => Root({ apiURL }), []);
	return createElement(Resolved, {});
});

render(createElement(Index), document.getElementById('root'));
