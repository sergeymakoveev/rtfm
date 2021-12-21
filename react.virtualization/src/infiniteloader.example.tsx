/**
 * [react-virtualized/InfiniteLoader](https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md)
 */

import React from 'react';

import { default as faker } from 'faker';
import {
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
	InfiniteLoaderProps,
	List,
	ListProps,
	ScrollParams,
} from 'react-virtualized';

import ROWS from './index.fixture.json';
import { getRowsRange, loadItemsRangeMap, Row, RowsMap, toMap } from './utils';

const getNextPage = (rows: Row[], pageSize = 100): Row[] => {
	const lastIndex = rows.reverse().shift()?.index;
	const startIndex = lastIndex === undefined ? undefined : lastIndex + 1;
	const stopIndex = lastIndex === undefined ? undefined : lastIndex + pageSize;
	return startIndex !== undefined && stopIndex !== undefined ? getRowsRange({ startIndex, stopIndex }) : [];
};
const getPrevPage = (rows: Row[], pageSize = 100): Row[] => {
	const firstIndex = rows.shift()?.index;
	const stopIndex = firstIndex && firstIndex - 1;
	const startIndex = stopIndex && stopIndex - pageSize;
	return startIndex !== undefined && stopIndex !== undefined
		? getRowsRange({ startIndex: startIndex > 0 ? startIndex : 0, stopIndex })
		: [];
};

const cache = new CellMeasurerCache({
	fixedWidth: true,
	minHeight: 58,
});

const ITEMS_COUNT = 1000;

const calculateScrollBottom = (scrollParams: ScrollParams) =>
	scrollParams.scrollHeight - scrollParams.scrollTop - scrollParams.clientHeight;

export const InfiniteLoaderExample = React.memo(() => {
	const [rows, setRows] = React.useState<RowsMap>({});
	const [isEnabledAutoScroll, setEnabledAutoScroll] = React.useState(true);
	const [scrollBottom, setScrollBottom] = React.useState(0);

	const loadMoreRows: InfiniteLoaderProps['loadMoreRows'] = React.useCallback(range => {
		console.log('## loadMoreRows', { range });
		return loadItemsRangeMap(range).then(itemsRange => setRows(items => ({ ...items, ...itemsRange })));
	}, []);

	const checkRowLoaded: InfiniteLoaderProps['isRowLoaded'] = React.useCallback(
		({ index }) => {
			// console.log('## checkRowLoaded', { index, item: rows[index] });
			return rows[index] !== undefined;
		},
		[rows],
	);

	// const indexOfLastMessage = React.useMemo(
	// 	() =>
	// 		Object.keys(rows)
	// 			.map(index => +index)
	// 			.sort()
	// 			.reverse()
	// 			.shift(),
	// 	[rows],
	// );

	const rowCount = React.useMemo(() => Object.keys(rows).length, [rows]);

	const appendRows = React.useCallback(
		() => setRows(rows => ({ ...rows, ...toMap(getNextPage(Object.values(rows), 1)) })),
		[],
	);
	const prependRows = React.useCallback(
		() => setRows(rows => ({ ...toMap(getPrevPage(Object.values(rows), 1)), ...rows })),
		[],
	);

	// console.log('## indexOfLastMessage', { indexOfLastMessage });
	const rowRenderer: ListProps['rowRenderer'] = React.useCallback(
		({ index, key, parent, style, isScrolling, isVisible }) => {
			const row = rows[index];
			console.log('## ', { index, isScrolling, isVisible, row });
			return row === undefined ? (
				<div key={key} className="row placeholder" style={style} />
			) : (
				<CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
					{({ measure, registerChild }) => (
						<div ref={el => el && registerChild && registerChild(el)} className="row" style={style}>
							<div>
								<span>{row.index}</span>
								{row.text}
								<p>
									<button onClick={prependRows}>Prepend Rows</button>
									<button onClick={appendRows}>Append Rows</button>
								</p>
							</div>
							{row.image && <img src={row.image} onLoad={measure} />}
						</div>
					)}
				</CellMeasurer>
			);
		},
		[rows, appendRows, prependRows],
	);

	const handleScroll = React.useCallback((scrollParams: ScrollParams) => {
		const scrollBottomCurrent = calculateScrollBottom(scrollParams);
		// console.log('## handleScroll', { scrollBottom, scrollBottomCurrent });
		setScrollBottom(scrollBottomCurrent);
	}, []);

	return (
		<InfiniteLoader isRowLoaded={checkRowLoaded} loadMoreRows={loadMoreRows} rowCount={ITEMS_COUNT}>
			{({ onRowsRendered, registerChild }) => (
				<AutoSizer>
					{({ height, width }) => (
						<List
							ref={registerChild}
							height={height}
							width={width}
							rowCount={ITEMS_COUNT}
							rowHeight={cache.rowHeight}
							deferredMeasurementCache={cache}
							scrollToAlignment="end"
							{...(isEnabledAutoScroll && { scrollToIndex: ITEMS_COUNT })}
							rowRenderer={rowRenderer}
							onScroll={handleScroll}
							onRowsRendered={onRowsRendered}
						/>
					)}
				</AutoSizer>
			)}
		</InfiniteLoader>
	);
});

const lastPageRange = { startIndex: ITEMS_COUNT - 100, stopIndex: ITEMS_COUNT };

export const ListExample = React.memo(() => {
	// const [rows, setRows] = React.useState<Row[]>(ROWS);
	const [rows, setRows] = React.useState<Row[]>(getRowsRange(lastPageRange));
	const [isEnabledAutoScrollToBottom, setEnabledAutoScrollToBottom] = React.useState(true);
	const [scrollBottom, setScrollBottom] = React.useState(0);
	// const listRef = React.useRef<List>(null);
	const listWrapperRef = React.useRef<HTMLDivElement>(null);

	const measureScroll = (): ScrollParams | undefined => {
		const listWrapperElement = listWrapperRef.current;
		const scrollableArea = listWrapperElement?.querySelector<HTMLElement>('.list');
		if (scrollableArea) {
			const { scrollHeight, scrollWidth, scrollTop, scrollLeft, clientHeight, clientWidth } = scrollableArea;
			return { scrollHeight, scrollWidth, scrollTop, scrollLeft, clientHeight, clientWidth };
		}
		return undefined;
	};

	const appendRows = React.useCallback(() => setRows(rows => [...rows, ...getNextPage(rows, 1)]), []);
	const prependRows = React.useCallback(() => setRows(rows => [...getPrevPage(rows, 1), ...rows]), []);

	const rowCount = React.useMemo(() => {
		const rowCount = Object.keys(rows).length;
		console.log('### rowCount change', { rowCount, rows });
		return rowCount;
	}, [rows]);

	const rowRenderer: ListProps['rowRenderer'] = React.useCallback(
		({ index, key, parent, style, isScrolling, isVisible }) => {
			isScrolling && setEnabledAutoScrollToBottom(false);
			const row = rows[index];
			// const { top, height, ...restStyles } = style as { top: number; height: number };
			// const scrollHeight = measureScroll()?.scrollHeight;
			// const bottom = scrollHeight && scrollHeight - (top + height);
			// const itemStyle = bottom === undefined ? undefined : { ...restStyles, bottom };
			console.log('## ', { index, isScrolling, isVisible, style }, style.height, style.top);
			return row === undefined /*|| itemStyle === undefined*/ ? (
				<div key={key} className="row placeholder" style={style} />
			) : (
				<CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
					{({ measure, registerChild }) => (
						<div
							data-index={index}
							data-visible={isVisible}
							// style={itemStyle}
							style={style}
							ref={el => el && registerChild && registerChild(el)}
							className="row">
							<div>
								<span>{row.index}</span>
								<div>
									{row.text}
									<p>
										<button onClick={prependRows}>Prepend Rows</button>
										<button onClick={appendRows}>Append Rows</button>
									</p>
								</div>
							</div>
							{row.image && <img src={row.image} onLoad={measure} />}
						</div>
					)}
				</CellMeasurer>
			);
		},
		[rows, appendRows, prependRows],
	);

	const handleScroll = React.useCallback(
		(scrollParams: ScrollParams) => {
			const scrollBottomCurrent = calculateScrollBottom(scrollParams);
			console.log('## handleScroll', { scrollBottom, scrollBottomCurrent });
			setScrollBottom(scrollBottomCurrent);

			// enable autoscroll to bottom after manual scroll to bottom bound
			scrollBottomCurrent === 0 && setEnabledAutoScrollToBottom(true);
		},
		[scrollBottom],
	);

	React.useEffect(() => console.log('## isEnabledAutoScroll', isEnabledAutoScrollToBottom), [
		isEnabledAutoScrollToBottom,
	]);

	return (
		<div ref={listWrapperRef} className="wrapper">
			<AutoSizer>
				{({ height, width }) => (
					<List
						className="list"
						// ref={listRef}
						height={height}
						width={width}
						// overscanRowCount={5}
						rowCount={rowCount}
						rowHeight={cache.rowHeight}
						deferredMeasurementCache={cache}
						scrollToAlignment="end"
						{...(isEnabledAutoScrollToBottom && { scrollToIndex: rowCount })}
						rowRenderer={rowRenderer}
						onScroll={handleScroll}
						// onRowsRendered={onRowsRendered}
					/>
				)}
			</AutoSizer>
		</div>
	);
});
