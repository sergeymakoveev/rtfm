import React from 'react';

import { default as InfiniteScroll } from 'react-infinite-scroll-component';

import { getRowsRange, Row } from './utils';

import './infinite-scroll-component.example.css';

const getNextPage = (rows: Row[], pageSize = 100): Row[] => {
	const hiIndex = [...rows].shift()?.index;
	const startIndex = hiIndex === undefined ? undefined : hiIndex + 1;
	const stopIndex = hiIndex === undefined ? undefined : hiIndex + pageSize;
	return startIndex === undefined || stopIndex === undefined ? [] : getRowsRange({ startIndex, stopIndex });
};

const getPrevPage = (rows: Row[], pageSize = 100): Row[] => {
	const loIndex = [...rows].reverse().shift()?.index;
	const stopIndex = loIndex === undefined ? undefined : loIndex - 1;
	const startIndex = loIndex === undefined ? undefined : loIndex - pageSize;
	return startIndex === undefined || stopIndex === undefined
		? []
		: getRowsRange({ startIndex: startIndex > 0 ? startIndex : 0, stopIndex });
};

export const InfiniteScrollComponentExample = React.memo(() => {
	const [rows, setRows] = React.useState(getRowsRange({ startIndex: 981, stopIndex: 1000 }).reverse());

	const fetchMoreData = React.useCallback(
		() => setTimeout(() => setRows(rows => [...rows, ...getPrevPage(rows, 20).reverse()]), 1500),
		[],
	);

	const prependRows = React.useCallback(() => setRows(rows => [...rows, ...getPrevPage(rows, 1).reverse()]), []);
	const appendRows = React.useCallback(() => setRows(rows => [...getNextPage(rows, 1), ...rows]), []);

	React.useEffect(() => console.log('## rows', rows), [rows]);

	return (
		<div id="InfiniteScrollComponentExample">
			<InfiniteScroll
				dataLength={rows.length}
				next={fetchMoreData}
				style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
				inverse={true}
				hasMore={true}
				loader={<h4>Loading...</h4>}
				scrollableTarget="InfiniteScrollComponentExample">
				{rows.map(({ index, text, image }) => (
					<div key={index} data-index={index} className="row">
						<div>
							<span>{index}</span>
							{text}
							<p>
								<button onClick={prependRows}>Prepend Rows</button>
								<button onClick={appendRows}>Append Rows</button>
							</p>
						</div>
						{image && <img src={image} />}
					</div>
				))}
			</InfiniteScroll>
		</div>
	);
});
