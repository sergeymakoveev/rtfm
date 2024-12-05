/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';

import { render } from 'react-dom';
import { faker } from '@faker-js/faker';
// import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { DataGridPremium, GridColDef, GridRowId, GridToolbar } from '@mui/x-data-grid-premium';

// const options: AutocompleteOption[] = Array.from(Array(1000)).map((_, index) => ({
// 	label: `${index} ${faker.lorem.words({ min: 1, max: 5 })}`,
// 	description: faker.lorem.lines({ min: 1, max: 3 }),
// }));

export interface DataRowModel {
	id: GridRowId;
	[price: string]: number | string;
}

export interface GridData {
	columns: GridColDef[];
	rows: DataRowModel[];
}

function useData(rowLength: number, columnLength: number) {
	const [data, setData] = React.useState<GridData>({ columns: [], rows: [] });

	React.useEffect(() => {
		const rows: DataRowModel[] = Array.from(Array(rowLength)).map((_, indexRow) => ({
			id: indexRow,
			...Array.from(Array(columnLength)).reduce(
				(acc, _, indexCol) => ({ ...acc, [`column${indexCol}`]: `${indexRow}:${indexCol}` }),
				{},
			),
		}));

		// for (let i = 0; i < rowLength; i += 1) {
		// 	const row: DataRowModel = {
		// 		id: i,
		// 	};

		// 	for (let j = 1; j <= columnLength; j += 1) {
		// 		row[`price${j}M`] = `${i.toString()}, ${j} `;
		// 	}

		// 	rows.push(row);
		// }

		const columns: GridColDef[] = Array.from(Array(columnLength)).map((_, indexCol) => ({
			field: `column${indexCol}`,
			headerName: `Сolumn ${indexCol}`,
		}));

		console.log('## ', { rows, columns });

		setData({
			rows,
			columns,
		});
	}, [rowLength, columnLength]);

	return data;
}

function ColumnVirtualizationGrid() {
	const data = useData(100, 100);

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGridPremium
				{...data}
				columnBuffer={2}
				columnThreshold={2}
				slots={{
					toolbar: GridToolbar,
				}}
			/>
			{/* <DataGrid {...data} columnBuffer={2} columnThreshold={2} /> */}
		</div>
	);
}

const Index = React.memo(() => <ColumnVirtualizationGrid />);

render(React.createElement(Index), document.getElementById('root'));
