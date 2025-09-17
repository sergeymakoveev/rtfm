{
	type TreeItem<T extends object> = T & {
		children: TreeItem<T>[];
	};

	/**
	 * Функция сворачивает дерево `root`, начиная со состояния `initialState`,
	 * и применяя `reducer` к каждому элементу в порядке `traversal`
	 */
	function reduceTree<T extends object, S>(
		root: TreeItem<T>,
		reducer: (state: S, item: T) => S,
		initialState: S,
		traversal: 'pre-order' | 'post-order',
	): S {
		let state = initialState;
		const trees = [root];
		while (trees.length) {
			const tree = trees.shift();
			if (tree === undefined) {
				break;
			}
			state = reducer(state, tree);
			trees.concat(tree.children);
		}
		return state;
	}

	type TreeValue = { value: number };
	type State = number[];

	const root: TreeItem<TreeValue> = {
		value: 1,
		children: [
			{
				value: 21,
				children: [],
			},
			{
				value: 22,
				children: [],
			},
		],
	};

	const reducer = (acc: State, item: TreeValue): State => [...acc, item.value];

	const result = reduceTree<TreeValue, State>(root, reducer, [], 'pre-order');

	/**
	 * Возвращает `true`, если переданное значение изменилось по сравнению
	 * с предыдущим рендерингом. При первом рендеринге возвращает `false`.
	 */
	function useHasChanged<T>(value: T): boolean {
		const refPrev = useRef<T>(value);
		const res = refPrev.current !== value;
		refPrev.current = value;
		return res;
	}

	// get /users?sortBy=S&page=P&filterBy=F&pageSize=PS

	type User = {
		name: string;
		status: 'active' | 'blocked' | 'fired';
		divisions: number[];
		groups: number[];
		roles: number[];
	};

	const getList = (
		sortOrder: 'asc' | 'desc',
		sortBy: 'name' | 'group' | 'division',
		pageNumber: number,
		pageSize: 10 | 20 | 50 | 100 | 500,
		filterBy: Record<'status' | 'division' | 'role' | 'group', number[]>,
	): Users[] => {};
}
