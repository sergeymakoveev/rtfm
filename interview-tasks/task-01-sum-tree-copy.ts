/**
 *  Дано дерево, надо найти сумму всех вершин.
 *
 **/
{
	const tree = {
		valueNode: 3,
		next: [
			{
				valueNode: 1,
				next: null,
			},
			{
				valueNode: 3,
				next: null,
			},
			{
				valueNode: 2,
				next: null,
			},
			{
				valueNode: 2,
				next: [
					{
						valueNode: 1,
						next: null,
					},
					{
						valueNode: 5,
						next: null,
					},
				],
			},
		],
	};

	const sumTree = tree =>
		tree.next === null
			? tree.valueNode
			: tree.valueNode + tree.next.reduce((acc, subTree) => acc + sumTree(subTree), 0);

	console.log(sumTree(tree));
}
