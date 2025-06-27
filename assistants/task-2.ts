import { dataRaw } from './task-1.data';

type ItemType = 'A' | 'B';
type Item = [cost: number, count: number, type: ItemType];

function isItemType(value: string): value is ItemType {
	return value === 'A' || value === 'B';
}

const data: string[] = dataRaw.split('\n').filter(Boolean);
const amount: number = data.shift()?.split(' ').map(Number).pop() ?? 0;
const items: Item[] = data
	.map(item => item.split(' '))
	.map(([cost, count, type]) => {
		if (!isItemType(type)) {
			throw new Error(`Invalid item type: ${type}`);
		}
		return [Number(cost), Number(count), type];
	});

const itemsA: Item[] = items.filter(([_cost, _count, type]) => type === 'A');

console.log(amount, items, itemsA);

export default {};
