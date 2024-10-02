/**
 *  Дано дерево, надо найти сумму всех вершин.
 *
 **/

type TreeNode = {
	valueNode: number;
	next: TreeNode[] | null;
};

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

const sumTree = (tree: TreeNode) =>
	tree.next !== null ? tree.next.reduce((acc, treeNode) => acc + sumTree(treeNode), tree.valueNode) : tree.valueNode;

console.log(sumTree(tree));
