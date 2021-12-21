import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';

import { InfiniteLoaderExample, ListExample } from './infiniteloader.example';
import {
	ExampleVirtuoso,
	ExampleVirtuoso2,
	ExampleVirtuosoFollowOutput,
	ExampleVirtuosoStickToBottom,
} from './virtuoso.example';
import { ExampleBxInfiniteScroll } from './bx-stable-infinite-scroll.example';
import { InfiniteScrollComponentExample } from './infinite-scroll-component.example';
import { InfiniteScrollNativeExample } from './infinite-scroll-native.example';

import './index.css';

const Toc = React.memo(() => (
	<ol>
		<li>
			<Link to="/InfiniteScrollNativeExample">InfiniteScrollNativeExample</Link>
		</li>
		<li>
			<Link to="/InfiniteScrollComponentExample">InfiniteScrollComponentExample</Link>
		</li>
		<li>
			<Link to="/InfiniteLoaderExample">InfiniteLoaderExample</Link>
			<br />
			<Link to="/ListExample">ListExample</Link>
		</li>
		<li>
			<Link to="/virtuoso">Virtuoso</Link>
			<br />
			<Link to="/virtuoso2">Virtuoso 2</Link>
			<br />
			<Link to="/virtuoso-stick-to-bottom">stick-to-bottom</Link>
			<br />
			<Link to="/virtuoso-follow-output">follow-output</Link>
		</li>
		<li>
			<Link to="/bx-infinite-scroll">BxInfiniteScroll</Link>
		</li>
	</ol>
));

const Index = React.memo(() => (
	<Router>
		<Routes>
			<Route path="/" element={<Toc />} />
			<Route path="/InfiniteScrollNativeExample" element={<InfiniteScrollNativeExample />} />
			<Route path="/InfiniteScrollComponentExample" element={<InfiniteScrollComponentExample />} />
			<Route path="/bx-infinite-scroll" element={<ExampleBxInfiniteScroll />} />
			<Route path="/InfiniteLoaderExample" element={<InfiniteLoaderExample />} />
			<Route path="/ListExample" element={<ListExample />} />
			<Route path="/virtuoso" element={<ExampleVirtuoso />} />
			<Route path="/virtuoso2" element={<ExampleVirtuoso2 />} />
			<Route path="/virtuoso-stick-to-bottom" element={<ExampleVirtuosoStickToBottom />} />
			<Route path="/virtuoso-follow-output" element={<ExampleVirtuosoFollowOutput />} />
		</Routes>
	</Router>
));

render(React.createElement(Index), document.getElementById('root'));
