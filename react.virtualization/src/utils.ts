import { default as faker } from 'faker';

export type IndexRange = {
	startIndex: number;
	stopIndex: number;
};

export type Row = {
	index: number;
	text: string;
	image?: string;
};

export type RowsMap = Record<number, Row>;

export const toMap = (arrayRow: Row[]): RowsMap =>
	arrayRow.reduce((items, item) => ({ ...items, [item.index]: item }), {});
const toArray = (mapRow: RowsMap): Row[] => Object.values(mapRow);

export const getRow = (index: number): Row => ({
	index,
	text: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 5 })),
	image: faker.datatype.boolean()
		? `https://plchldr.co/i/${faker.datatype.number({ min: 50, max: 300 })}?text=${index}`
		: undefined,
});

export const getRows = (count: number) => [...new Array(count)].map((_value, index) => getRow(index));

export const getRowsRange = ({ startIndex, stopIndex }: IndexRange): Row[] =>
	[...Array(Math.abs(stopIndex - startIndex) + 1)].map((_value, index) => getRow(startIndex + index));

const getRowsRangeMap = (indexRange: IndexRange): RowsMap => toMap(getRowsRange(indexRange));

const loadItemsRange = (indexRange: IndexRange): Promise<Row[]> =>
	new Promise((resolve, _reject) => setTimeout(() => resolve(getRowsRange(indexRange)), 1000));

export const loadItemsRangeMap = (indexRange: IndexRange): Promise<RowsMap> => loadItemsRange(indexRange).then(toMap);
