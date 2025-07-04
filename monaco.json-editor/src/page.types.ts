import type { ComponentProps } from './component.types';

export type JSONPrimitive = string | number | boolean | null | undefined;

export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type JSONObject = {
	[x: string]: JSONValue;
};

export type JSONArray = JSONValue[];

export type JSONPrimitiveObject = {
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

type PageProps = {
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
	onClick?: VoidFunction;
	jsonPrimitive: JSONPrimitive;
	jsonValue: JSONValue;
	jsonArray: JSONArray;
	jsonPrimitiveObject?: JSONPrimitiveObject;
	jsonObject?: JSONObject;
};

type PageJsonCompatible = JSONCompatibleProps<PageProps>;

export type Page = PageJsonCompatible;
