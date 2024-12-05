import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';

import { ButtonPage } from './button/button.page';

const Toc = React.memo(() => (
	<ol>
		<li>
			<Link to="/button">ButtonPage</Link>
		</li>
	</ol>
));

const Index = React.memo(() => (
	<Router>
		<Routes>
			<Route path="/" element={<Toc />} />
			<Route path="/button" element={<ButtonPage />} />
		</Routes>
	</Router>
));

render(<Index />, document.getElementById('root'));
