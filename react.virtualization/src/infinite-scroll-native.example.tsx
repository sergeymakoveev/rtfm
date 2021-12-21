import React, { useEffect } from 'react';

import { getRowsRange, Row } from './utils';

import './infinite-scroll-native.example.css';

type ScrollParams = {
	clientHeight: number;
	clientWidth: number;
	scrollHeight: number;
	scrollLeft: number;
	scrollTop: number;
	scrollWidth: number;
};

const getNextPage = (rows: Row[], pageSize = 100): Row[] => {
	const hiIndex = [...rows].reverse().shift()?.index;
	const startIndex = hiIndex === undefined ? undefined : hiIndex + 1;
	const stopIndex = hiIndex === undefined ? undefined : hiIndex + pageSize;
	return startIndex === undefined || stopIndex === undefined ? [] : getRowsRange({ startIndex, stopIndex });
};

const getPrevPage = (rows: Row[], pageSize = 100): Row[] => {
	const loIndex = [...rows].shift()?.index;
	const stopIndex = loIndex === undefined ? undefined : loIndex - 1;
	const startIndex = loIndex === undefined ? undefined : loIndex - pageSize;
	return startIndex === undefined || stopIndex === undefined
		? []
		: getRowsRange({ startIndex: startIndex > 0 ? startIndex : 0, stopIndex });
};

const load = (cb: () => void): Promise<void> =>
	new Promise((resolve, _reject) =>
		setTimeout(() => {
			console.log('## load');
			return resolve(cb());
		}, 500),
	);

export const InfiniteScrollNativeExample = React.memo(() => {
	const [rows, setRows] = React.useState(getRowsRange({ startIndex: 981, stopIndex: 1000 }));
	const [isLoadNeeded, setLoadNeeded] = React.useState(false);
	const [loadRequest, setLoadRequest] = React.useState<Promise<void>>();
	const [scrollTop, setScrollTop] = React.useState<number>(0);

	const listWrapperRef = React.useRef<HTMLDivElement>(null);

	const measureScroll = (): ScrollParams | undefined => {
		const listWrapperElement = listWrapperRef.current;
		if (listWrapperElement) {
			const { scrollHeight, scrollWidth, scrollTop, scrollLeft, clientHeight, clientWidth } = listWrapperElement;
			return { scrollHeight, scrollWidth, scrollTop, scrollLeft, clientHeight, clientWidth };
		}
		return undefined;
	};

	const checkScrollToTop = React.useCallback((scrollParams: ScrollParams) => scrollTop > scrollParams.scrollTop, [
		scrollTop,
	]);
	const checkLoadNeeded = React.useCallback(
		(scrollParams?: ScrollParams): boolean => {
			if (scrollParams) {
				const isScrollToTop = checkScrollToTop(scrollParams);
				const scrollRatio = Math.abs(scrollParams.scrollTop / scrollParams.scrollHeight);
				console.log('## checkLoadNeeded', { isScrollToTop, scrollRatio });
				const isLoadNeeded = isScrollToTop && scrollRatio > 0.5;
				return isLoadNeeded;
			}
			return false;
		},
		[checkScrollToTop],
	);

	const scrollToTop = () => {
		if (listWrapperRef.current) {
			listWrapperRef.current.scrollTop = 0;
		}
	};

	const handleScroll = React.useCallback(() => {
		const scrollParams = measureScroll();
		if (scrollParams) {
			const isScrollToTop = checkScrollToTop(scrollParams);
			const isLoadNeededNew = checkLoadNeeded(scrollParams);
			const isEnabledAutoScroll = !isScrollToTop && Math.abs(scrollParams.scrollTop) < 100;
			isEnabledAutoScroll && scrollToTop();
			setLoadNeeded(isLoadNeededNew);
			setScrollTop(scrollParams.scrollTop);
		}
	}, [checkScrollToTop, checkLoadNeeded]);

	const prependRows = React.useCallback(() => setRows(rows => [...getPrevPage(rows, 1), ...rows]), []);
	const appendRows = React.useCallback(() => setRows(rows => [...rows, ...getNextPage(rows, 1)]), []);

	React.useEffect(() => console.log('## rows', rows), [rows]);

	React.useEffect(() => {
		!loadRequest &&
			isLoadNeeded &&
			setLoadRequest(
				load(prependRows).then(() => {
					setLoadRequest(undefined);
				}),
			);
	}, [isLoadNeeded, loadRequest, prependRows]);

	React.useEffect(() => {
		loadRequest === undefined && setLoadNeeded(checkLoadNeeded(measureScroll()));
	}, [loadRequest, checkLoadNeeded]);

	// debug
	React.useEffect(() => console.log('## isLoadNeeded change', isLoadNeeded), [isLoadNeeded]);
	React.useEffect(() => console.log('## scrollTop change', scrollTop), [scrollTop]);

	return (
		<div id="InfiniteScrollNativeExample">
			<h1>
				<button onClick={prependRows}>Prepend Rows</button>
				<button onClick={appendRows}>Append Rows</button>
			</h1>
			<div ref={listWrapperRef} className="content-wrapper" onScroll={handleScroll}>
				<div className="content">
					{rows.map(({ index, text, image }) => (
						<div key={index} data-index={index} className="row">
							<div>
								<span>{index}</span>
								{text}
							</div>
							{image && <img src={image} />}
						</div>
					))}
				</div>
			</div>
		</div>
	);
});
