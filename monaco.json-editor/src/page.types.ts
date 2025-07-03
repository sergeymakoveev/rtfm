import type { ComponentProps } from './component.types';

type JSONPrimitive = string | number | boolean | null | undefined;

type JSONValue = JSONPrimitive | JSONObject | JSONArray;

type JSONObject = {
	[x: string]: JSONValue;
};

type JSONArray = JSONValue[];

type JSONPrimitiveObject = {
	[x: string]: JSONPrimitive | JSONPrimitive[];
};

export type JSONCompatibleProps<T, C extends keyof T = never> = Omit<T, C | 'dataset' | 'children'> &
	{
		[P in Extract<keyof T, C>]: P extends 'onClick'
			? // eslint-disable-next-line @typescript-eslint/ban-types
			  // Required<T>[P] extends Function
			  JSONPrimitiveObject | undefined
			: Required<T>[P] extends unknown[]
			? JSONPrimitive[]
			: JSONPrimitive;
	} & {
		key?: number;
	};

export type Page = {
	blocks: (
		| {
				type: 'Component1';
				params: {
					param1: boolean;
					param2: string;
					param3: number;
					booleanParam: boolean;
					stringParam: string;
					numberParam: number;
				};
		  }
		| {
				type: 'Component2';
				params: ComponentProps;
		  }
	)[];
};
