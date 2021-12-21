import React from 'react';

import { default as faker } from 'faker';
import { default as BxInfiniteScroll } from 'bx-stable-infinite-scroll';

const getImageUrl = (index?: number) => {
	const resolution = faker.datatype.number({ min: 100, max: 500 });

	return faker.image.imageUrl(resolution, resolution, index?.toString(), true);
};

type Item = { color: string; text: string; image: string };

export const ExampleBxInfiniteScroll = React.memo(() => {
	const [items, setItems] = React.useState<Item[]>(
		[...new Array(200)].map((_value, i) => ({ color: '#AAA', text: `Initial item ${i}`, image: getImageUrl() })),
	);
	const [loadingNext, setLoadingNext] = React.useState(false);
	const [loadingPrevious, setLoadingPrevious] = React.useState(false);

	const handleNextDataLoad = () => {
		setLoadingNext(true);
		setTimeout(() => {
			const color = faker.internet.color();
			const time = new Date().toLocaleTimeString();
			const loadedItems = [1, 2, 3, 4, 5].map(i => ({ color, text: `Next ${i}: ${time}`, image: getImageUrl() }));
			setItems(prevItems => [...prevItems, ...loadedItems]);
			setLoadingNext(false);
		}, 1000);
	};

	const handlePreviousDataLoad = () => {
		setLoadingPrevious(true);
		setTimeout(() => {
			const color = faker.internet.color();
			const time = new Date().toLocaleTimeString();
			const loadedItems = [1, 2, 3, 4, 5].map(i => ({
				color,
				text: `Previous ${i}: ${time}`,
				image: getImageUrl(),
			}));
			setItems(prevItems => [...loadedItems, ...prevItems]);
			setLoadingPrevious(false);
		}, 1000);
	};

	return (
		<div
			style={{
				boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				height: '100vh',
			}}>
			<BxInfiniteScroll
				loadingComponent={<div style={{ padding: '8px 16px' }}>Loading 5 more items...</div>}
				nextDataFn={handleNextDataLoad}
				nextEnd={false}
				nextLoading={loadingNext}
				previousDataFn={handlePreviousDataLoad}
				previousEnd={false}
				previousLoading={loadingPrevious}>
				{items.map(item => (
					<div
						key={item.text}
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '8px 16px',
							borderBottom: '1px solid #DDD',
						}}>
						<div
							style={{
								backgroundColor: item.color,
								height: '16px',
								width: '16px',
								borderRadius: '4px',
								marginRight: '4px',
							}}
						/>
						<img src={item.image} />
						{item.text}
					</div>
				))}
			</BxInfiniteScroll>
		</div>
	);
});
