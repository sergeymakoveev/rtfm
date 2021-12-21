/**
 * https://virtuoso.dev/prepend-items/
 * https://github.dev/petyosi/react-virtuoso/blob/367b8ee07f2950c52bc32154199d5a9b55648630/e2e/auto-prepend-items.tsx
 */

import React, { useCallback, useState, useRef } from 'react';

import { Virtuoso, VirtuosoHandle, VirtuosoProps } from 'react-virtuoso';
import faker from 'faker';
import { AutoSizer } from 'react-virtualized';

import './virtuoso.example.css';

function toggleBg(index: number) {
	return index % 2 ? 'var(--ifm-background-color)' : 'var(--ifm-color-emphasis-200)';
}

type User = ReturnType<typeof user>;

function user(index = 0) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const resolution = faker.datatype.number({ min: 100, max: 500 });
	return {
		index: index + 1,
		image: faker.datatype.boolean() ? faker.image.imageUrl(resolution, resolution, undefined, true) : undefined,
		bgColor: toggleBg(index),
		name: `${firstName} ${lastName}`,
		initials: `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`,
		jobTitle: faker.name.jobTitle(),
		description: faker.lorem.sentence(10),
		longText: faker.lorem.paragraphs(1),
	};
}

const generated: ReturnType<typeof user>[] = [];

const generateUsers = (length: number, startIndex = 0) => {
	return Array.from({ length }, (_, i) => getUser(i + startIndex));
};

const getUser = (index: number) => {
	if (!generated[index]) {
		generated[index] = user(index);
	}

	return generated[index];
};

export const ExampleVirtuoso = React.memo(() => {
	const START_INDEX = 10000;
	const INITIAL_ITEM_COUNT = 20;

	const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
	const [users, setUsers] = useState(() => generateUsers(INITIAL_ITEM_COUNT, START_INDEX));

	const prependItems = useCallback(() => {
		console.log('prependItems()');
		const usersToPrepend = 20;
		const nextFirstItemIndex = firstItemIndex - usersToPrepend;

		setTimeout(() => {
			setFirstItemIndex(() => nextFirstItemIndex);
			setUsers(() => [...generateUsers(usersToPrepend, nextFirstItemIndex), ...users]);
		}, 5);

		return false;
	}, [firstItemIndex, users, setUsers]);

	return (
		<AutoSizer disableWidth={true}>
			{({ height }) => {
				console.log('## height', { height });
				return (
					<Virtuoso
						style={{ height: `${height}px` }}
						components={{
							Header: () => <div style={{ textAlign: 'center', padding: '1rem' }}>Loading...</div>,
						}}
						firstItemIndex={firstItemIndex}
						initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
						data={users}
						startReached={prependItems}
						itemContent={(_, user) => {
							return (
								<div style={{ backgroundColor: user.bgColor, padding: '1rem 0.5rem' }}>
									<h4>
										{user.index}. {user.name}
									</h4>
									<div style={{ marginTop: '1rem' }}>
										{user.image && <img src={user.image} />}
										{user.description}
									</div>
								</div>
							);
						}}
					/>
				);
			}}
		</AutoSizer>
	);
});

export const ExampleVirtuoso2 = React.memo(() => {
	const START_INDEX = 10000;
	const INITIAL_ITEM_COUNT = 20;

	const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
	const [users, setUsers] = useState(() => generateUsers(INITIAL_ITEM_COUNT, START_INDEX));

	const prependItems = useCallback(() => {
		console.log('prependItems()');
		const usersToPrepend = 20;
		const nextFirstItemIndex = firstItemIndex - usersToPrepend;

		setTimeout(() => {
			setFirstItemIndex(() => nextFirstItemIndex);
			setUsers(() => [...generateUsers(usersToPrepend, nextFirstItemIndex), ...users]);
		}, 5);

		return false;
	}, [firstItemIndex, users, setUsers]);

	const handleBottomStateChange: VirtuosoProps<User>['atBottomStateChange'] = React.useCallback(atBottom => {
		console.log('## handleBottomStateChange', { atBottom });
	}, []);

	return (
		<Virtuoso
			style={{ height: '100vh' }}
			components={{
				Header: () => <div style={{ textAlign: 'center', padding: '1rem' }}>Loading...</div>,
			}}
			firstItemIndex={firstItemIndex}
			initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
			data={users}
			alignToBottom={true}
			startReached={prependItems}
			atBottomStateChange={handleBottomStateChange}
			itemContent={(_, user) => {
				return (
					<div style={{ backgroundColor: user.bgColor, padding: '1rem 0.5rem' }}>
						<h4>
							{user.index}. {user.name}
						</h4>
						<div className="description">
							{user.image && <img src={user.image} />}
							{user.description}
						</div>
					</div>
				);
			}}
		/>
	);
});

/**
 * https://virtuoso.dev/stick-to-bottom/
 */

export const ExampleVirtuosoStickToBottom = React.memo(() => {
	const [users, setUsers] = React.useState(() => generateUsers(100));
	const virtuosoRef = React.useRef<VirtuosoHandle>(null);

	const prependUsers = React.useCallback(() => setUsers(users => [user(), ...users]), []);
	const appendUsers = React.useCallback(() => setUsers(users => [...users, user()]), []);
	const handleScrolling = React.useCallback(isScrolling => console.log('## handleScrolling', { isScrolling }), []);
	const handleBottomStateChange: VirtuosoProps<User>['atBottomStateChange'] = React.useCallback(atBottom => {
		console.log('## handleBottomStateChange', { atBottom });
	}, []);
	const style = React.useMemo(() => ({ height: '100vh' }), []);

	React.useEffect(() => console.log('## users change', users.length), [users]);

	return (
		<Virtuoso
			ref={virtuosoRef}
			style={style}
			initialTopMostItemIndex={1000}
			// totalCount={users.length}
			data={users}
			// alignToBottom={true}
			// isScrolling={handleScrolling}
			atBottomStateChange={handleBottomStateChange}
			itemContent={(index, user) => {
				return (
					<div style={{ backgroundColor: toggleBg(index), padding: '1rem 0.5rem' }}>
						<h4>{user.name}</h4>
						<div className="description">
							{/* {user.image && <img src={user.image} />} */}
							<div>
								{user.description}
								<br />
								<button onClick={prependUsers}>Prepend Users</button>
								<button onClick={appendUsers}>Append Users</button>
							</div>
						</div>
					</div>
				);
			}}
			followOutput={'smooth'}
		/>
	);
});

export const ExampleVirtuosoFollowOutput = React.memo(() => {
	const [count, setCount] = useState(100);
	const appendInterval = useRef<NodeJS.Timeout>();
	const itemContent = useCallback((index: number) => {
		const resolution = faker.datatype.number({ min: 100, max: 500 });
		const image = faker.datatype.boolean()
			? faker.image.imageUrl(resolution, resolution, undefined, true)
			: undefined;
		return (
			<div>
				{image && <img src={image} />}
				Item {index}
				<button
					onClick={() => {
						setCount(count => count + 3);
					}}>
					+3
				</button>
			</div>
		);
	}, []);

	const style = React.useMemo(() => ({ height: '100vh' }), []);

	return (
		<Virtuoso
			totalCount={count}
			initialTopMostItemIndex={99}
			followOutput={'smooth'}
			itemContent={itemContent}
			style={style}
			atBottomStateChange={atBottom => {
				appendInterval.current && clearInterval(appendInterval.current);
				if (atBottom) {
					appendInterval.current = setInterval(() => {
						// setCount(count => count + 3);
					}, 3000);
				}
			}}
		/>
	);
});
