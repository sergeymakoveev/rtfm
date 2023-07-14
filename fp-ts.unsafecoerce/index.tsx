#!/usr/bin/env ts-node

import React from 'react';

import { unsafeCoerce } from 'fp-ts/function';

type SelectboxWrapperProps = {
	value: React.ReactText;
};

const SelectboxWrapper: React.FC<SelectboxWrapperProps> = ({ value }) => <div>{value}</div>;

type SelectboxProps<V> = Omit<React.ComponentProps<typeof SelectboxWrapper>, 'value'> & {
	value: V | undefined;
};

type SelectboxComponent = <V extends React.ReactText>(props: SelectboxProps<V>) => JSX.Element;

const Selectbox = unsafeCoerce<typeof SelectboxWrapper, SelectboxComponent>(SelectboxWrapper);

type _SelectboxWrapperComponent = typeof SelectboxWrapper;
type _SelectboxComponent = typeof Selectbox;

const _S = () => <Selectbox value={'1'} />;
