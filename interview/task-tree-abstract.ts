{
	type Tree<Value extends {}> = Value & {
		children: Tree<Value>[];
	};

	type TreeValue = { value: number };

	/*
	                1
	    11          12          13
	111 112 113 121 122 123 131 132 133
	*/

	const tree: Tree<TreeValue> = {
		value: 1,
		children: [
			{
				value: 11,
				children: [
					{ value: 111, children: [] },
					{ value: 112, children: [] },
					{ value: 113, children: [] },
				],
			},
			{
				value: 12,
				children: [
					{ value: 121, children: [] },
					{ value: 122, children: [] },
					{ value: 123, children: [] },
				],
			},
			{
				value: 13,
				children: [
					{ value: 131, children: [] },
					{ value: 132, children: [] },
					{ value: 133, children: [] },
				],
			},
		],
	};

	type ReduceTreeReducer<State, Value extends {}> = (state: State, tree: Tree<Value>) => State;

	type ReduceTree<Value extends {}, State> = (
		tree: Tree<Value>,
		reducer: ReduceTreeReducer<State, Value>,
		state: State,
		isRoot?: boolean, // for BFS-traverse
	) => State;

	type State = number[];

	const reducer: ReduceTreeReducer<State, TreeValue> = (state, tree) => [...state, tree.value];

	const reduceDfsPreOrder: ReduceTree<TreeValue, State> = (tree, reducer, state) =>
		tree.children.reduce((state, tree) => reduceDfsPreOrder(tree, reducer, state), reducer(state, tree));

	console.log(
		'## reduceDfsPreOrder:',
		[1, 11, 111, 112, 113, 12, 121, 122, 123, 13, 131, 132, 133],
		reduceDfsPreOrder(tree, reducer, []),
	);

	const reduceDfsPostOrder: ReduceTree<TreeValue, State> = (tree, reducer, state) =>
		reducer(
			tree.children.reduce((state, tree) => reduceDfsPostOrder(tree, reducer, state), state),
			tree,
		);

	console.log(
		'## reduceDfsPostOrder:',
		[111, 112, 113, 11, 121, 122, 123, 12, 131, 132, 133, 13, 1],
		reduceDfsPostOrder(tree, reducer, []),
	);

	const reduceBfs: ReduceTree<TreeValue, State> = (tree, reducer, state, isRoot = true) =>
		tree.children.reduce(
			(state, tree) => reduceBfs(tree, reducer, state, false),
			(isRoot ? [tree] : []).concat(tree.children).reduce(reducer, state),
		);

	console.log(
		'## reduceBfs:',
		[1, 11, 12, 13, 111, 112, 113, 121, 122, 123, 131, 132, 133],
		reduceBfs(tree, reducer, []),
	);
}
{
	type Tree<Value> = {
		value: Value;
		children: Tree<Value>[];
	};

	const tree: Tree<number> = {
		value: 1,
		children: [
			{
				value: 11,
				children: [
					{
						value: 111,
						children: [],
					},
					{
						value: 112,
						children: [],
					},
					{
						value: 113,
						children: [],
					},
				],
			},
			{
				value: 12,
				children: [
					{
						value: 121,
						children: [],
					},
					{
						value: 122,
						children: [],
					},
					{
						value: 123,
						children: [],
					},
				],
			},
			{
				value: 13,
				children: [
					{
						value: 131,
						children: [],
					},
					{
						value: 132,
						children: [],
					},
					{
						value: 133,
						children: [],
					},
				],
			},
		],
	};

	/*
	1
	21 22 23
	31 32
	*/

	const traversePreOrderDfs = <Value>(tree: Tree<Value>): Value[] => [
		tree.value,
		...tree.children.reduce((acc, tree) => [...acc, ...traversePreOrderDfs(tree)], [] as Value[]),
	];
	console.log('## traversePreOrderDfs', traversePreOrderDfs(tree));

	const traversePostOrderDfs = <Value>(tree: Tree<Value>): Value[] => [
		...tree.children.reduce((acc, tree) => [...acc, ...traversePostOrderDfs(tree)], [] as Value[]),
		tree.value,
	];
	console.log('## traversePostOrderDfs', traversePostOrderDfs(tree));

	const traverseBfs = <Value>(tree: Tree<Value>, isRoot = true): Value[] => [
		...(isRoot ? [tree.value] : []),
		...tree.children.map(tree => tree.value),
		...tree.children.reduce((acc, tree) => [...acc, ...traverseBfs(tree, false)], [] as Value[]),
	];
	console.log('## traverseBfs', traverseBfs(tree));

	const map = <Value, ValueMapped>(tree: Tree<Value>, fn: (value: Value) => ValueMapped): Tree<ValueMapped> => ({
		value: fn(tree.value),
		children: tree.children.map(tree => map(tree, fn)),
	});
	console.log(
		'## map',
		JSON.stringify(
			map(tree, value => `*${value}`),
			null,
			4,
		),
	);

	const reduce = <Value, ValueReduced>(
		tree: Tree<Value>,
		fn: (acc: ValueReduced, tree: Value) => ValueReduced,
		acc: ValueReduced,
	): ValueReduced => tree.children.reduce((acc, tree) => reduce(tree, fn, acc), fn(acc, tree.value));

	console.log(
		'## reduce',
		reduce(tree, (acc, value) => `${acc}*${value}`, ''),
	);
}
