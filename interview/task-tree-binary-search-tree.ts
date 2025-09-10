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
* Вставка (insert/add)
* Фильтрация (filter)
* Вхождение (has)
* Получение поддерева (get)
* Удаление (Delete)
* Обходы (Traversals): DFS In-order, DFS Pre-order, DFS Post-order, BFS
* Высота (getHeight)
* Максимальная высота (getHeightMax)
* Минимальная высота (getHeightMin)
* Получение наибольшего (getMax)
* Получение наименьшего (getMin)
*/

{
	// const binaryTreeValues = [10, 9, 12, 7, 8, 11, 13, 14];
	/*
	      10
	   9      12
	 7      11  13
	  8           14
	*/

	const binaryTreeValues = [20, 10, 30, 5, 15, 25, 35, 2, 8, 12, 18, 22, 28, 32, 38];
	/*
                 20
	      10               30
	  5       15      	 25      35
  2   8   12   18    22  28  32  38
	*/

	type BinaryTree = {
		value: number;
		left?: BinaryTree;
		right?: BinaryTree;
	};

	const binaryTreeExample: BinaryTree = {
		value: 20,
		left: {
			value: 10,
			left: {
				value: 5,
				left: {
					value: 2,
				},
				right: {
					value: 8,
				},
			},
			right: {
				value: 15,
				left: {
					value: 12,
				},
				right: {
					value: 18,
				},
			},
		},
		right: {
			value: 30,
			left: {
				value: 25,
				left: {
					value: 22,
				},
				right: {
					value: 28,
				},
			},
			right: {
				value: 35,
				left: {
					value: 32,
				},
				right: {
					value: 38,
				},
			},
		},
	};
	false && console.log(binaryTreeExample);

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

		const getDepth = (tree?: BinaryTree): number =>
			tree === undefined ? 0 : Math.max(1, getDepth(tree.left) + 1, getDepth(tree.right) + 1);

		const bsTree = binaryTreeValues.reduce<BinaryTree | undefined>((tree, value) => add(tree)(value), undefined);
		console.log('depth: ', getDepth(bsTree));
		console.log('tree: ', JSON.stringify(bsTree, null, 2));

		const dfsValues = traverseDfs(bsTree);
		console.log('dfs values:', dfsValues);

		// const bfsValues = traverseBfs(bsTree);
		// console.log('bfs values:', bfsValues);

		const bsTreeFind12 = find(bsTree)(12);
		console.log('find 12:', JSON.stringify(bsTreeFind12, null, 2));

		// const bsTreeDel12 = del(bsTree)(12);
		// console.log('depth: ', getDepth(bsTreeDel12));
		// console.log('del 12:', JSON.stringify(bsTreeDel12, null, 2));

		// const bsTreeDel9 = del(bsTree)(9);
		// console.log('depth: ', getDepth(bsTreeDel9));
		// console.log('del 9:', JSON.stringify(bsTreeDel9, null, 2));
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
					tree.left = {} as BinaryTree;
				}
				return add(tree.left, el) + 1;
			} else {
				if (tree.right === undefined) {
					tree.right = {} as BinaryTree;
				}
				return add(tree.right, el) + 1;
			}
		};

		const create = (input: number[]) => {
			const tree = {} as BinaryTree;
			let heightTree = 0;
			input.forEach(num => {
				heightTree = Math.max(heightTree, add(tree, num));
			});
			console.log(heightTree);
			// console.log(JSON.stringify(tree, null, 4));
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

		const find = (tree: BinaryTree | undefined, value: number): number | undefined =>
			tree === undefined
				? undefined
				: tree.value === value
				? value
				: find(value > tree.value ? tree.right : tree.left, value);

		const binaryTree = binaryTreeValues.reduce((tree, value) => add(tree, value), (undefined as any) as BinaryTree);

		console.log('## binaryTree:\n', JSON.stringify(binaryTree, null, 2));
		console.log('## traverseDFS:\n', traverseDFS(binaryTree));
		console.log('## find(1):\n', find(binaryTree, 1));
		console.log('## find(10):\n', find(binaryTree, 10));
		console.log('## find(11):\n', find(binaryTree, 11));
	}

	// реализация на рекурсии
	if (false) {
		const add = (tree: BinaryTree | undefined, value: number) =>
			tree === undefined
				? { value }
				: value === tree.value
				? tree
				: value > tree.value
				? { ...tree, right: add(tree.right, value) }
				: { ...tree, left: add(tree.left, value) };

		const tree = binaryTreeValues.reduce<BinaryTree | undefined>((tree, value) => add(tree, value), undefined);
		console.log('## tree', JSON.stringify(tree, null, 4));

		const traversePreOrderDFS = (tree?: BinaryTree) =>
			tree === undefined
				? []
				: [tree.value, ...traversePreOrderDFS(tree.left), ...traversePreOrderDFS(tree.right)];
		console.log('## traversePreOrderDFS', traversePreOrderDFS(tree).join(','));

		const traverseInOrderDFS = (tree?: BinaryTree) =>
			tree === undefined ? [] : [...traverseInOrderDFS(tree.left), tree.value, ...traverseInOrderDFS(tree.right)];
		console.log('## traverseInOrderDFS', traverseInOrderDFS(tree).join(','));

		const traversePostOrderDFS = (tree?: BinaryTree) =>
			tree === undefined
				? []
				: [...traversePostOrderDFS(tree.left), ...traversePostOrderDFS(tree.right), tree.value];
		console.log('## traversePostOrderDFS', traversePostOrderDFS(tree).join(','));

		const traverseBFS = trees =>
			trees.length
				? [
						...trees.map(tree => tree.value),
						...traverseBFS(
							trees.reduce(
								(acc, tree) => [
									...acc,
									...(tree.left ? [tree.left] : []),
									...(tree.right ? [tree.right] : []),
								],
								[],
							),
						),
				  ]
				: [];
		console.log('traverseBFS', traverseBFS([tree]));

		const getHeightMax = (tree?: BinaryTree) =>
			tree === undefined ? 0 : 1 + Math.max(getHeightMax(tree.left), getHeightMax(tree.right));
		console.log('## getHeightMax', getHeightMax(tree));

		const getHeightMin = (tree?: BinaryTree) =>
			tree
				? 1 +
				  (tree.left || tree.right
						? Math.max(getHeightMin(tree.left), getHeightMin(tree.right))
						: Math.min(getHeightMin(tree.left), getHeightMin(tree.right)))
				: 0;
		console.log('## getHeightMin', getHeightMin(tree));

		const getMin = (tree?: BinaryTree): number | undefined => (tree?.left ? getMin(tree.left) : tree?.value);
		console.log('## getMin', getMin(tree));

		const getMax = (tree?: BinaryTree): number | undefined => (tree?.right ? getMax(tree.right) : tree?.value);
		console.log('## getMax', getMax(tree));

		const has = (tree: BinaryTree | undefined, value: number): boolean =>
			tree === undefined
				? false
				: value === tree.value
				? true
				: has(value < tree.value ? tree.left : tree.right, value);
		console.log('## has(14)', has(tree, 14));
		console.log('## has(10)', has(tree, 10));
		console.log('## has(5)', has(tree, 5));
		console.log('## has(6)', has(tree, 6));

		const get = (tree: BinaryTree | undefined, value: number) =>
			tree === undefined
				? undefined
				: value === tree.value
				? tree
				: value > tree.value
				? get(tree.right, value)
				: get(tree.left, value);
		console.log('## get(14)', JSON.stringify(get(tree, 14), null, 2));
		console.log('## get(10)', JSON.stringify(get(tree, 10), null, 2));
		console.log('## get(13)', JSON.stringify(get(tree, 13), null, 2));
		console.log('## get(5)', JSON.stringify(get(tree, 5), null, 2));
		console.log('## get(6)', JSON.stringify(get(tree, 6), null, 2));

		const filter = (tree: BinaryTree | undefined, predicate: (value: number) => boolean) =>
			tree
				? [
						...(predicate(tree.value) ? [tree.value] : []),
						...filter(tree.left, predicate),
						...filter(tree.right, predicate),
				  ]
				: [];
		console.log(
			'## filter(odd)',
			filter(tree, (value: number) => Boolean(value % 2)),
		);
		console.log(
			'## filter(even)',
			filter(tree, value => !Boolean(value % 2)),
		);

		const del = (tree, value) =>
			value > tree.value && tree.right
				? { ...tree, right: del(tree.right, value) }
				: value < tree.value && tree.left
				? { ...tree, left: del(tree.left, value) }
				: value === tree.value && tree.right
				? { ...tree.right, left: addLeftTree(tree.right.left, tree.left) }
				: value === tree.value && tree.left
				? tree.left
				: undefined;

		const addLeftTree = (tree, subtree) =>
			tree.left ? { ...tree, left: addLeftTree(tree.left, subtree) } : { ...tree, left: subtree };

		console.log('del(10)\n', JSON.stringify(del(tree, 10), null, 2));

		// const addRightTree = (tree, subtree) =>
		// 	tree.right ? { ...tree, right: addRightTree(tree.right, subtree) } : { ...tree, right: subtree };
	}

	// реализация на итерациях
	if (true) {
		const add = (treeSource: BinaryTree | {}, value: number): BinaryTree => {
			let tree = treeSource;
			while (tree) {
				if (!('value' in tree)) {
					(tree as BinaryTree).value = value;
					break;
				} else if (tree.value === value) {
					break;
				} else if (value > tree.value) {
					if (tree.right) {
						tree = tree.right;
					} else {
						tree.right = { value };
						break;
					}
				} else {
					if (tree.left) {
						tree = tree.left;
					} else {
						tree.left = { value };
						break;
					}
				}
			}
			return treeSource as BinaryTree;
		};

		// const tree = {} as BinaryTree;
		// for (const value of binaryTreeValues) {
		// 	add(tree, value);
		// }

		const tree = binaryTreeValues.reduce<BinaryTree>((tree, value) => add(tree, value), {} as BinaryTree);

		console.log('## tree', JSON.stringify(tree, null, 4));

		const get = (tree: BinaryTree, value: number): BinaryTree | undefined => {
			let currentTree: BinaryTree | undefined = tree;
			while (currentTree) {
				if (currentTree.value === value) {
					return currentTree;
				}
				currentTree = value > currentTree.value ? currentTree.right : currentTree.left;
			}
			return undefined;
		};
		console.log('## get(12)', get(tree, 12));
		console.log('## get(11)', get(tree, 11));

		const traverseBFS = (tree: BinaryTree): number[] => {
			const queue = [tree];
			const values: number[] = [];
			while (queue.length) {
				const tree = queue.shift() as BinaryTree;
				values.push(tree.value);
				if (tree.left) {
					queue.push(tree.left);
				}
				if (tree.right) {
					queue.push(tree.right);
				}
			}
			return values;
		};
		console.log('traverseBFS', traverseBFS(tree));

		const traversePreOrderDFS = (tree: BinaryTree): number[] => {
			const stack = [tree];
			const values: number[] = [];
			while (stack.length) {
				const tree = stack.pop() as BinaryTree;
				values.push(tree.value);
				if (tree.right) {
					stack.push(tree.right);
				}
				if (tree.left) {
					stack.push(tree.left);
				}
			}
			return values;
		};
		console.log('traversePreOrderDFS', traversePreOrderDFS(tree));

		function traverseInOrderDFS(tree: BinaryTree): number[] {
			const values: number[] = [];
			const stack: BinaryTree[] = [];
			let node: BinaryTree | undefined = tree;

			// Пока есть узлы для обработки
			while (node || stack.length) {
				// Идем влево до конца
				if (node) {
					stack.push(node);
					node = node.left;
					continue;
				}
				// Извлекаем узел из стека
				node = stack.pop();
				if (node) {
					values.push(node.value);
					// Идем вправо
					node = node.right;
				}
			}
			return values;
		}
		console.log('traverseInOrderDFS', traverseInOrderDFS(tree));

		function traversePostOrderDFS(root: BinaryTree): number[] {
			const values: number[] = [];
			const stack1 = [root];
			const stack2: BinaryTree[] = [];

			while (stack1.length > 0) {
				const node = stack1.pop() as BinaryTree;
				stack2.push(node);

				if (node.left) {
					stack1.push(node.left);
				}
				if (node.right) {
					stack1.push(node.right);
				}
			}

			while (stack2.length > 0) {
				values.push((stack2.pop() as BinaryTree).value);
			}

			return values;
		}
		console.log('traversePostOrderDFS', traversePostOrderDFS(tree));
	}

	// реализация на рекурсии
	if (false) {
		const add = (tree, value) =>
			tree === undefined || tree.value === undefined
				? { value }
				: value === tree.value
				? tree
				: value > tree.value
				? { ...tree, right: add(tree.right, value) }
				: { ...tree, left: add(tree.left, value) };

		const tree = binaryTreeValues.reduce((tree, value) => add(tree, value), {});
		console.log('tree\n', JSON.stringify(tree, null, 4));

		const traversePreOrderDFS = tree =>
			tree === undefined
				? []
				: [tree.value, ...traversePreOrderDFS(tree.left), ...traversePreOrderDFS(tree.right)];
		console.log('traversePreOrderDFS', traversePreOrderDFS(tree));

		const traverseInOrderDFS = tree =>
			tree === undefined ? [] : [...traverseInOrderDFS(tree.left), tree.value, ...traverseInOrderDFS(tree.right)];
		console.log('traverseInOrderDFS', traverseInOrderDFS(tree));

		const traversePostOrderDFS = tree =>
			tree === undefined
				? []
				: [...traversePostOrderDFS(tree.left), ...traversePostOrderDFS(tree.right), tree.value];
		console.log('traversePostOrderDFS', traversePostOrderDFS(tree));

		const traverseBFS = trees =>
			trees.length
				? [
						...trees.map(tree => tree.value),
						...traverseBFS(
							trees.reduce(
								(acc, tree) => [
									...acc,
									...(tree.left ? [tree.left] : []),
									...(tree.right ? [tree.right] : []),
								],
								[],
							),
						),
				  ]
				: [];
		console.log('traverseBFS', traverseBFS([tree]));

		const get = (tree, value) =>
			tree === undefined
				? undefined
				: value === tree.value
				? tree
				: value > tree.value
				? get(tree.right, value)
				: get(tree.left, value);
		console.log('get(30)', get(tree, 30));
		console.log('get(9)', get(tree, 9));
		console.log('get(24)', get(tree, 24));

		const del = (tree, value) =>
			value > tree.value && tree.right
				? { ...tree, right: del(tree.right, value) }
				: value < tree.value && tree.left
				? { ...tree, left: del(tree.left, value) }
				: value === tree.value && tree.right
				? { ...tree.right, left: addLeftTree(tree.right.left, tree.left) }
				: value === tree.value && tree.left
				? tree.left
				: undefined;

		const addLeftTree = (tree, subtree) =>
			tree.left ? { ...tree, left: addLeftTree(tree.left, subtree) } : { ...tree, left: subtree };

		console.log('del(10)\n', JSON.stringify(del(tree, 10), null, 2));

		// const addRightTree = (tree, subtree) =>
		// 	tree.right ? { ...tree, right: addRightTree(tree.right, subtree) } : { ...tree, right: subtree };
	}
}
