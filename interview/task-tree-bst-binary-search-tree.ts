/**
Бинарное дерево поиска (Binary Search Tree, BST): теория и реализация на JavaScript
Основные понятия

Бинарное дерево поиска (BST) — это структура данных, где:

Каждый узел имеет не более двух дочерних узлов (левый и правый).
Для любого узла:
Все значения в левом поддереве меньше значения узла.
Все значения в правом поддереве больше значения узла.
Дубликаты обычно не допускаются (но можно модифицировать для их поддержки).
Преимущества:

Поиск, вставка и удаление в среднем за O(log n).
Упорядоченное хранение данных.
Недостатки:

В худшем случае (вырожденное дерево) операции занимают O(n).
Требуется балансировка для поддержания эффективности.

Операции с BST:
* Вставка (Insert)
* Поиск (Search)
* Удаление (Delete)
* Обходы (Traversals): DFS/BFS, In-order, Pre-order, Post-order.
* Высота (getHeight)
* Получение наибольшего (getMax)
* Получение наименьшего (getMin)

*/

{
	// 10,9,12,7,8,11,13
	/*
	      10
	   9      12
	 7   8  11  13
	*/

	const binaryTreeValues = [10, 9, 12, 7, 8, 11, 13];

	type BinaryTree = {
		value: number;
		left?: BinaryTree;
		right?: BinaryTree;
	};

	const _binaryTreeExample: BinaryTree = {
		value: 10,
		left: {
			value: 9,
			left: { value: 7 },
			right: { value: 8 },
		},
		right: {
			value: 12,
			left: { value: 11 },
			right: { value: 13 },
		},
	};

	// реализация на рекурсии
	if (false) {
		const add = (tree?: BinaryTree) => (value: number): BinaryTree =>
			tree === undefined
				? { value }
				: value === tree.value
				? tree
				: value > tree.value
				? { ...tree, right: add(tree.right)(value) }
				: { ...tree, left: add(tree.left)(value) };

		const del = (tree: BinaryTree | undefined) => (value: number): BinaryTree | undefined =>
			tree === undefined || tree.value === undefined
				? undefined
				: tree.value === value && tree.right
				? { ...tree, value: tree.right.value, right: tree.right.right }
				: tree.value === value && tree.left
				? { ...tree, value: tree.left.value, left: tree.left.right }
				: tree.value === value
				? undefined
				: value > tree.value && tree.right
				? { ...tree, right: del(tree.right)(value) }
				: value < tree.value && tree.left
				? { ...tree, left: del(tree.left)(value) }
				: tree;

		const find = (tree?: BinaryTree) => (value: number): BinaryTree | undefined =>
			tree === undefined
				? undefined
				: tree.value === value
				? tree
				: value > tree.value && tree.right
				? find(tree.right)(value)
				: value < tree.value && tree.left
				? find(tree.left)(value)
				: undefined;

		const traverseDfs = (tree: BinaryTree | undefined): number[] =>
			tree ? [tree.value, ...traverseDfs(tree.left), ...traverseDfs(tree.right)] : [];

		const traverseBfs = (tree?: BinaryTree, isRecurseCall?: boolean): number[] =>
			tree
				? [
						...(isRecurseCall ? [] : [tree.value]),
						...(tree.left ? [tree.left.value] : []),
						...(tree.right ? [tree.right.value] : []),
						...traverseBfs(tree.left, true),
						...traverseBfs(tree.right, true),
				  ]
				: [];

		const getDepth = (tree?: BinaryTree): number =>
			tree === undefined ? 0 : Math.max(1, getDepth(tree.left) + 1, getDepth(tree.right) + 1);

		const bsTree = binaryTreeValues.reduce<BinaryTree | undefined>((tree, value) => add(tree)(value), undefined);
		console.log('depth: ', getDepth(bsTree));
		console.log('tree: ', JSON.stringify(bsTree, null, 2));

		const dfsValues = traverseDfs(bsTree);
		console.log('dfs values:', dfsValues);

		const bfsValues = traverseBfs(bsTree);
		console.log('bfs values:', bfsValues);

		const bsTreeFind12 = find(bsTree)(12);
		console.log('find 12:', JSON.stringify(bsTreeFind12, null, 2));

		const bsTreeDel12 = del(bsTree)(12);
		console.log('depth: ', getDepth(bsTreeDel12));
		console.log('del 12:', JSON.stringify(bsTreeDel12, null, 2));

		const bsTreeDel9 = del(bsTree)(9);
		console.log('depth: ', getDepth(bsTreeDel9));
		console.log('del 9:', JSON.stringify(bsTreeDel9, null, 2));
	}

	// реализация на рекурсии
	if (false) {
		const add = (tree: BinaryTree, el: number) => {
			if (tree.value === undefined) {
				tree.value = el;
				return 1;
			} else if (tree.value === el) {
				return 1;
			} else if (tree.value > el) {
				if (tree.left === undefined) {
					tree.left = {};
				}
				return add(tree.left, el) + 1;
			} else {
				if (tree.right === undefined) {
					tree.right = {};
				}
				return add(tree.right, el) + 1;
			}
		};

		const create = (input: number[]) => {
			const tree = {};
			let heightTree = 0;
			input.forEach(num => {
				heightTree = Math.max(heightTree, add(tree, num));
			});
			console.log(heightTree);
			// console.log(JSON.stringify(tree, null, 2));
		};

		[
			[],
			[1],
			[10, 9, 12, 7, 8, 11, 13], //4
			[5, 3, 8, 1, 4, 7, 9], //3
			[15, 10, 20, 5, 12, 17, 25], //3
			[50, 30, 70, 20, 40, 60, 80], //3
			[100, 50, 150, 25, 75, 125, 175], //3
			[1, 2, 3, 4, 5, 6, 7], //7
			[7, 6, 5, 4, 3, 2, 1], //7
			[10, 5, 15, 3, 7, 12, 17, 2, 4], //4
			[20, 10, 30, 5, 15, 25, 35, 2, 7], //4
			[8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7], //4
			[9, 5, 13, 3, 7, 11, 15, 2, 6, 8, 10], //4
		].forEach(create);
	}

	// реализация на рекурсии
	if (false) {
		type BTree = {
			value: number;
			left?: BinaryTree;
			right?: BinaryTree;
		};

		const _BinaryTreeEexample: BTree = {
			value: 10,
			left: {
				value: 9,
				left: {
					value: 7,
					right: {
						value: 8,
					},
				},
			},
			right: {
				value: 12,
				left: {
					value: 11,
				},
				right: {
					value: 13,
				},
			},
		};

		const add = (btree: BinaryTree | undefined, value: number): BinaryTree =>
			btree === undefined
				? { value }
				: btree.value > value
				? { ...btree, left: add(btree.left, value) }
				: btree.value < value
				? { ...btree, right: add(btree.right, value) }
				: btree;

		const traverseDFS = (tree?: BinaryTree): number[] =>
			tree ? [tree.value, ...traverseDFS(tree.left), ...traverseDFS(tree.right)] : [];

		const traverseBFS = (tree?: BinaryTree, isFirst = true): number[] =>
			tree
				? [
						...(isFirst ? [tree.value] : []),
						...(tree.left?.value ? [tree.left.value] : []),
						...(tree.right?.value ? [tree.right.value] : []),
						...traverseBFS(tree.left, false),
						...traverseBFS(tree.right, false),
				  ]
				: [];

		const find = (tree: BinaryTree | undefined, value: number): number | undefined =>
			tree === undefined
				? undefined
				: tree.value === value
				? value
				: find(value > tree.value ? tree.right : tree.left, value);

		// const getHeight = (tree?: BinaryTree): number => 1;
		// const del = (tree: BinaryTree, value: number): BinaryTree => {
		// 	tree.value
		// }

		const binaryTree = [10, 9, 12, 7, 8, 11, 13].reduce(
			(tree, value) => add(tree, value),
			(undefined as any) as BinaryTree,
		);

		console.log('## binaryTree:\n', JSON.stringify(binaryTree, null, 2));
		console.log('## traverseDFS:\n', traverseDFS(binaryTree));
		console.log('## traverseBFS:\n', traverseBFS(binaryTree));
		console.log('## find(1):\n', find(binaryTree, 1));
		console.log('## find(10):\n', find(binaryTree, 10));
		console.log('## find(11):\n', find(binaryTree, 11));
	}

	// реализация на итерациях
	if (true) {
		type BinaryTree = {
			value: number;
			left?: BinaryTree;
			right?: BinaryTree;
		};

		const add = (tree: BinaryTree | undefined, value: number) => {
			if (tree === undefined) {
				return { value };
			}
			const stack: BinaryTree[] = [tree];
			while (stack.length) {
				const currentTree = stack.shift();
				if (currentTree === undefined) {
					continue;
				}
				if (value === currentTree.value) {
					break;
				}
				if (value > currentTree.value) {
					if (currentTree.right === undefined) {
						currentTree.right = { value };
						break;
					} else {
						stack.push(currentTree.right);
						continue;
					}
				}
				if (value < currentTree.value) {
					if (currentTree.left === undefined) {
						currentTree.left = { value };
						break;
					} else {
						stack.push(currentTree.left);
						continue;
					}
				}
			}
			return tree;
		};

		const binaryTree = binaryTreeValues.reduce<BinaryTree | undefined>(
			(tree, value) => add(tree, value),
			undefined,
		);

		console.log(binaryTreeValues);
		console.log(JSON.stringify(binaryTree, null, 2));
	}
}
