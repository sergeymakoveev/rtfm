/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';

import { render } from 'react-dom';
import { faker } from '@faker-js/faker';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowRenderer } from 'react-virtualized';
import cn from 'classnames';
import { TextField, Autocomplete, AutocompleteProps } from '@mui/material';

import { PartialKeys } from './utils.typescript';
import css from './index.module.scss';
// import { composeRef, fillRef } from './utils.react';

const rowHeight = 60;
const listHeight = rowHeight * 10;
const listWidth = 300;

type AutocompleteOption = {
	label: string;
	description: string;
};
const options: AutocompleteOption[] = Array.from(Array(1000)).map((_, index) => ({
	label: `${index} ${faker.lorem.words({ min: 1, max: 5 })}`,
	description: faker.lorem.lines({ min: 1, max: 3 }),
}));

const LIST_STYLE = {
	maxHeight: `${listHeight}px`,
	height: 'auto',
};

const ListboxVirtualized = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
	({ children, className, role, ...props }, ref) => {
		const cnListbox = cn(className, css.listbox);
		const rowCount = Array.isArray(children) ? children.length : 0;
		const rowRenderer: ListRowRenderer = ({ index, style, key, parent }) =>
			Array.isArray(children) && children[index] ? React.cloneElement(children[index], { style }) : null;

		return (
			<div ref={ref}>
				<div {...props}>
					<List
						role={role}
						className={cnListbox}
						rowHeight={rowHeight}
						height={listHeight}
						rowCount={rowCount}
						width={listWidth}
						autoWidth={true}
						autoContainerWidth={true}
						rowRenderer={rowRenderer}
						style={LIST_STYLE}
					/>
				</div>
			</div>
		);
	},
);

const ListboxVirtualizedAutosized = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
	({ children, className, role, ...props }, ref) => {
		const measurerCache = React.useMemo(
			() =>
				new CellMeasurerCache({
					defaultHeight: rowHeight,
					fixedWidth: true,
				}),
			[children],
		);

		const cnListbox = cn(className, css.listbox);
		const rowRenderer: ListRowRenderer = ({ index, style, key, parent }) =>
			Array.isArray(children) && children[index] ? (
				<CellMeasurer cache={measurerCache} key={key} parent={parent} rowIndex={index} columnIndex={0}>
					{React.cloneElement(children[index], { style })}
				</CellMeasurer>
			) : null;
		const rowCount = Array.isArray(children) ? children.length : 0;

		return (
			<AutoSizer className={css.autosizer} disableHeight={true} style={{ width: '100%' }}>
				{({ width }) => (
					<div ref={ref}>
						<div {...props}>
							<List
								role={role}
								className={cnListbox}
								rowHeight={measurerCache.rowHeight}
								deferredMeasurementCache={measurerCache}
								height={listHeight}
								rowCount={rowCount}
								rowRenderer={rowRenderer}
								width={width}
								autoWidth={true}
								autoContainerWidth={true}
								style={LIST_STYLE}
							/>
						</div>
					</div>
				)}
			</AutoSizer>
		);
	},
);

type AutocompleteVirtualizedProps<
	T,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined
> = PartialKeys<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>;

const AutocompleteVirtualized = <
	T,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined
>({
	placeholder,
	...props
}: AutocompleteVirtualizedProps<T, Multiple, DisableClearable, FreeSolo>) => (
	<Autocomplete
		disablePortal={true}
		// disableListWrap={true}
		fullWidth={true}
		className={css.anchor}
		ListboxComponent={ListboxVirtualizedAutosized}
		renderInput={params => <TextField label={placeholder} {...params} />}
		{...props}
	/>
);

const Index = React.memo(() => (
	<div style={{ display: 'flex' }}>
		<div style={{ flexGrow: '1' }}>
			<Autocomplete
				// open={true}
				options={options}
				renderInput={params => <TextField {...params} label="Autocomplete" />}
			/>
		</div>
		<div style={{ flexGrow: '1' }}>
			<AutocompleteVirtualized
				// open={true}
				placeholder="AutocompleteVirtualized"
				options={options}
				ListboxComponent={ListboxVirtualized}
				renderOption={(props, { label, description }) => (
					<li {...props}>
						<div className={css.label} title={label}>
							{label}
						</div>
						<div className={css.description} title={description}>
							{description}
						</div>
					</li>
				)}
			/>
		</div>
		<div style={{ flexGrow: '1' }}>
			<AutocompleteVirtualized
				// open={true}
				placeholder="AutocompleteVirtualizedAutosized"
				options={options}
				renderOption={(props, { label, description }) => (
					<li {...props}>
						<div className={css.label} title={label}>
							{label}
						</div>
						<div className={css.description} title={description}>
							{description}
						</div>
					</li>
				)}
			/>
		</div>
	</div>
));

render(React.createElement(Index), document.getElementById('root'));
