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
