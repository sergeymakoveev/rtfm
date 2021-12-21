import React from 'react';

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
	new Promise((resolve, _reject) => setTimeout(() => resolve(cb()), 1000));

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

	const scrollToTop = () => {
		if (listWrapperRef.current) {
			listWrapperRef.current.scrollTop = 0;
		}
	};

	const handleScroll = React.useCallback(() => {
		const scrollParams = measureScroll();
		if (scrollParams) {
			const isScrollToTop = scrollTop > scrollParams.scrollTop;
			const scrollRatio = Math.abs(scrollParams.scrollTop / scrollParams.scrollHeight);
			const isLoadNeeded = isScrollToTop && scrollRatio > 0.5;
			const isEnabledAutoScroll = !isScrollToTop && Math.abs(scrollParams.scrollTop) < 100;
			isEnabledAutoScroll && scrollToTop();
			setLoadNeeded(isLoadNeeded);
			setScrollTop(scrollParams.scrollTop);
		}
	}, [scrollTop]);

	const prependRows = React.useCallback(() => setRows(rows => [...getPrevPage(rows, 1), ...rows]), []);
	const appendRows = React.useCallback(() => setRows(rows => [...rows, ...getNextPage(rows, 1)]), []);

	React.useEffect(() => console.log('## rows', rows), [rows]);

	React.useEffect(() => {
		!loadRequest &&
			isLoadNeeded &&
			setLoadRequest(
				load(prependRows).then(() => {
					setLoadNeeded(false);
					setLoadRequest(undefined);
				}),
			);
	}, [isLoadNeeded, loadRequest, prependRows]);

	const observer = React.useMemo<IntersectionObserver>(
		() =>
			new IntersectionObserver(
				entries => {
					console.log(
						'## observe',
						entries.map(
							({
								boundingClientRect,
								intersectionRatio,
								intersectionRect,
								isIntersecting,
								rootBounds,
								target,
								time,
							}) => ({
								index: target.attributes.getNamedItem('data-index')?.value,
								boundingClientRect,
								intersectionRatio,
								intersectionRect,
								isIntersecting,
								rootBounds,
								target,
								time,
							}),
						),
					);
				},
				{
					root: listWrapperRef.current,
				},
			),
		[],
	);

	const observe: React.LegacyRef<HTMLDivElement> = ref => ref && observer.observe(ref);

	return (
		<div id="InfiniteScrollNativeExample">
			<h1>
				<button onClick={prependRows}>Prepend Rows</button>
				<button onClick={appendRows}>Append Rows</button>
			</h1>
			<div ref={listWrapperRef} className="content-wrapper" onScroll={handleScroll}>
				<div className="content">
					{rows.map(({ index, text, image }) => (
						<div ref={observe} key={index} data-index={index} className="row">
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
