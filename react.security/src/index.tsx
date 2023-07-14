import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';

import { Lesson1 } from './lesson-1';

const Toc = React.memo(() => (
	<ol>
		<li>
			<Link to="/lesson-1">Lesson 1</Link>
		</li>
	</ol>
));

const Index = React.memo(() => (
	<Router>
		<Routes>
			<Route path="/" element={<Toc />} />
			<Route path="/lesson-1" element={<Lesson1 />} />
		</Routes>
	</Router>
));

render(React.createElement(Index), document.getElementById('root'));
