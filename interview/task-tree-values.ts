/**
 * https://habr.com/ru/articles/488510/
 * Задача: Обход дерева
 * Дана структура данных в виде дерева:
 * Необходимо написать функцию, возвращающую значения всех вершин дерева:
 * getTreeValues(tree); // => [1, 2, 3, 4, 5, 6, 7]
 */
{
	const tree = {
		value: 1,
		children: [
			{
				value: 2,
				children: [{ value: 4 }, { value: 5 }],
			},
			{
				value: 3,
				children: [{ value: 6 }, { value: 7 }],
			},
		],
	};

	const getTreeValues = tree =>
		(tree.children ?? []).reduce((treeValues, tree) => [...treeValues, ...getTreeValues(tree)], [tree.value]);

	console.log('getTreeValues', getTreeValues(tree));

	const getTreeValuesSum = tree =>
		(tree.children ?? []).reduce((treeValuesSum, tree) => treeValuesSum + getTreeValuesSum(tree), tree.value);

	console.log('getTreeValuesSum', getTreeValuesSum(tree));
}

{
	// n-арное дерево
	type Tree = {
		value: string;
		children: Tree[];
	};

	const tree: Tree = {
		value: 'A',
		children: [
			{
				value: 'B',
				children: [
					{ value: 'E', children: [] },
					{ value: 'F', children: [] },
				],
			},
			{
				value: 'C',
				children: [
					{ value: 'G', children: [] },
					{ value: 'H', children: [] },
					{ value: 'I', children: [] },
				],
			},
			{
				value: 'D',
				children: [{ value: 'J', children: [] }],
			},
		],
	};

	// Рекурсивный обход в глубину n-арного дерева (DFS): ['A', 'B', 'E', 'F', 'C', 'G', 'H', 'I', 'D', 'J']
	{
		const getTreeValues = (tree: Tree) => [tree.value, ...tree.children.flatMap(getTreeValues)];

		console.log('## DFS recursive treeValues', getTreeValues(tree));
	}

	// Итеративный обход в глубину n-арного дерева (DFS): ['A', 'B', 'E', 'F', 'C', 'G', 'H', 'I', 'D', 'J']
	{
		const getTreeValues = (tree: Tree) => {
			const values = [tree.value];
			const children = tree.children;
			while (children.length) {
				const child = children.shift();
				child?.value && values.push(child.value);
				children.unshift(...(child?.children ?? []));
			}
			return values;
		};

		console.log('## DFS iterative treeValues', getTreeValues(structuredClone(tree)));
	}

	// Рекурсивный обход в ширину n-арного дерева  (BFS): ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
	{
		const getTreeValues = (children: Tree[]) => [
			...children.map(({ value }) => value),
			...children.flatMap(({ children }) => getTreeValues(children)),
		];

		console.log('## BFS recursive treeValues', getTreeValues([tree]));
	}

	// Итеративный обход в ширину n-арного дерева (BFS): ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
	{
		const getTreeValues = (tree: Tree) => {
			const values = [tree.value];
			const children = tree.children;
			while (children.length) {
				const child = children.shift();
				child?.value && values.push(child.value);
				children.push(...(child?.children ?? []));
			}
			return values;
		};

		console.log('## BFS iterative treeValues', getTreeValues(structuredClone(tree)));
	}
}

{
	// бинарное дерево
	type BinaryTree = { value: string; left: BinaryTree | null; right: BinaryTree | null };

	const binaryTree: BinaryTree = {
		value: 'A',
		left: {
			value: 'B',
			left: { value: 'D', left: null, right: null },
			right: { value: 'E', left: null, right: null },
		},
		right: {
			value: 'C',
			left: { value: 'F', left: null, right: null },
			right: { value: 'G', left: null, right: null },
		},
	};

	// Рекурсивный обход в глубину бинарного дерева (DFS): ['A', 'B', 'D', 'E', 'C', 'F', 'G']
	{
		const getBinaryTreeValues = (tree: BinaryTree | null) =>
			tree === null ? [] : [tree.value, ...getBinaryTreeValues(tree.left), ...getBinaryTreeValues(tree.right)];

		console.log('## DFS recursive binaryTreeValues', getBinaryTreeValues(binaryTree));
	}

	// TODO: Итеративный обход в глубину бинарного дерева (DFS): ['A', 'B', 'D', 'E', 'C', 'F', 'G']
	{
		const getBinaryTreeValues = (tree: BinaryTree) => {
			const values = [tree.value];
			const children = [tree.right, tree.left];
			while (children.length) {
				const subTree = children.pop();
				values.push(subTree?.value);
				subTree?.right && children.push(subTree.right);
				subTree?.left && children.push(subTree.left);
			}
			return values;
		};

		console.log('## DFS iterative binaryTreeValues', getBinaryTreeValues(binaryTree));
	}

	// Рекурсивный обход в ширину бинарного дерева  (BFS): ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
	{
		const getBinaryTreeValues = (tree: BinaryTree | null) =>
			tree === null
				? []
				: [
						...(tree.left?.value === undefined ? [] : [tree.left?.value]),
						...(tree.right?.value === undefined ? [] : [tree.right?.value]),
						...getBinaryTreeValues(tree.left),
						...getBinaryTreeValues(tree.right),
				  ];

		console.log(
			'## BFS recursive binaryTreeValues',
			getBinaryTreeValues({ value: '', left: binaryTree, right: null }),
		);
	}

	// TODO: Итеративный обход в ширину бинарного дерева  (BFS): ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
	{
		const getBinaryTreeValues = (tree: BinaryTree) => {
			const values = [tree.value];
			const children = [tree.left, tree.right];
			while (children.length) {
				const subTree = children.shift();
				values.push(subTree?.value);
				subTree?.left && children.push(subTree.left);
				subTree?.right && children.push(subTree.right);
			}
			return values;
		};

		console.log('## BFS iterative binaryTreeValues', getBinaryTreeValues(binaryTree));
	}
}
