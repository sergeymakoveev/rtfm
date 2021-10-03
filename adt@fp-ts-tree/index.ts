import * as t from 'io-ts';
import { Forest, make as makeTree, Tree } from 'fp-ts/lib/Tree';
import { pipe } from 'fp-ts/lib/function';
import { fromEither, Option } from 'fp-ts/lib/Option';

export type WatchlistFilterNode = {
	type: 'private' | 'public' | 'index' | 'sector' | 'industry_group' | 'industry' | 'watchlist_type';
	id: string;
	name: string;
	selected?: boolean;
	expanded?: boolean;
	nodes: Array<WatchlistFilterNode>;
};

const WatchlistFilterNodeCodec = t.type(
	{
		type: t.union([
			t.literal('private'),
			t.literal('public'),
			t.literal('index'),
			t.literal('sector'),
			t.literal('industry_group'),
			t.literal('industry'),
			t.literal('watchlist_type'),
		]),
		id: t.string,
		name: t.string,
		selected: t.boolean,
		expanded: t.boolean,
		nodes: t.array(t.unknown),
	},
	'WatchlistFilterNode',
);

export const DEFAULT_WATCHLIST_FILTER: Array<WatchlistFilterNode> = [
	{
		type: 'private',
		id: '1',
		name: 'Personal',
		nodes: [
			{
				type: 'private',
				id: '11',
				name: 'My Information Technology',
				nodes: [],
			},
			{
				type: 'private',
				id: '12',
				name: 'My Health Care WL',
				selected: false,
				expanded: false,
				nodes: [],
			},
			{
				type: 'private',
				id: '13',
				name: 'My Financials WL',
				selected: false,
				expanded: false,
				nodes: [],
			},
		],
	},
	{
		type: 'public',
		id: '2',
		name: 'Public',
		nodes: [
			{
				type: 'private',
				id: '21',
				name: 'Information Technology',
				nodes: [],
			},
			{
				type: 'private',
				id: '22',
				name: 'Health Care',
				selected: false,
				expanded: false,
				nodes: [],
			},
			{
				type: 'private',
				id: '23',
				name: 'Financials',
				selected: false,
				expanded: false,
				nodes: [],
			},
		],
	},
	{
		type: 'index',
		id: '3',
		name: 'Indices',
		nodes: [
			{
				type: 'index',
				id: '31',
				name: 'Indices 31',
				nodes: [],
			},
		],
	},
	{
		type: 'industry',
		id: '4',
		name: 'By Industry',
		nodes: [
			{
				type: 'industry',
				id: '41',
				name: 'Energy',
				nodes: [
					{
						type: 'industry',
						id: '411',
						name: 'Energy 411',
						nodes: [],
					},
				],
			},
			{
				type: 'industry',
				id: '42',
				name: 'Materials',
				nodes: [
					{
						type: 'industry',
						id: '421',
						name: 'Materials 421',
						nodes: [],
					},
				],
			},
			{
				type: 'industry',
				id: '43',
				name: 'Industrials',
				nodes: [
					{
						type: 'industry',
						id: '431',
						name: 'Industrials 431',
						nodes: [],
					},
				],
			},
			{
				type: 'industry',
				id: '44',
				name: 'Information Technology',
				nodes: [
					{
						type: 'industry',
						id: '441',
						name: 'IT Services',
						nodes: [
							{
								type: 'industry',
								id: '4411',
								name: 'IT Services 4411',
								nodes: [],
							},
						],
					},
					{
						type: 'industry',
						id: '442',
						name: 'Software',
						nodes: [
							{
								type: 'industry',
								id: '4421',
								name: 'Software 4421',
								nodes: [],
							},
						],
					},
					{
						type: 'industry',
						id: '443',
						name: 'Communications Equipment',
						nodes: [
							{
								type: 'industry',
								id: '4431',
								name: 'IT Consulting & Other Services',
								nodes: [],
							},
							{
								type: 'industry',
								id: '4432',
								name: 'Data Processing & Outsourced Services',
								nodes: [],
							},
							{
								type: 'industry',
								id: '4433',
								name: 'Internet Services & Infrastructure',
								nodes: [],
							},
						],
					},
				],
			},
		],
	},
];

const array2tree = (nodes: Array<WatchlistFilterNode>): Forest<WatchlistFilterNode> =>
	nodes.map(node => makeTree(node, array2tree(node.nodes)));

export const getTreeCodec = <A>(valueCodec: t.Type<A, unknown>, name?: string): t.Type<Tree<A>, unknown> =>
	t.recursion(name ? name : `Tree(${valueCodec.name})`, self =>
		t.type({
			value: valueCodec,
			forest: t.array(self),
		}),
	);

const WatchlistFilterNodeTreeCodec = getTreeCodec(WatchlistFilterNodeCodec, 'nodes');
const DEFAULT_WATCHLIST_FILTER_TREE: Option<Tree<WatchlistFilterNode>> = pipe(
	DEFAULT_WATCHLIST_FILTER,
	WatchlistFilterNodeTreeCodec.decode,
	fromEither,
);
