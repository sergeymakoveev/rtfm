import React from 'react';

export const Lesson1 = React.memo(() => {
	const jsalert = "javascript:alert('xss!')";
	return (
		<div>
			<a href={jsalert}>jsalert</a>
		</div>
	);
});
