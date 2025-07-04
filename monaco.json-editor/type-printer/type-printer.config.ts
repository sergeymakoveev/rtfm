/* eslint-disable @typescript-eslint/no-unused-vars */

import type {
	Page as PageRAW,
	JSONPrimitive as JSONPrimitiveRAW,
	JSONValue as JSONValueRAW,
	JSONArray as JSONArrayRAW,
	JSONPrimitiveObject as JSONPrimitiveObjectRAW,
	JSONObject as JSONObjectRAW,
} from '../src/page.types';
import type { ComponentProps as ComponentPropsRAW } from '../src/component.types';

type ComponentProps = ComponentPropsRAW;
type Page = PageRAW;
type JSONPrimitive = JSONPrimitiveRAW;
type JSONValue = JSONValueRAW;
type JSONArray = JSONArrayRAW;
type JSONPrimitiveObject = JSONPrimitiveObjectRAW;
type JSONObject = JSONObjectRAW;
type UnknownType = unknown;

/**
 * @description list of type names for dump to file
 */
export const DUMPED_TYPES = [
	'Page',
	'ComponentProps',
	'JSONPrimitive',
	'JSONValue',
	'JSONArray',
	'JSONPrimitiveObject',
	'JSONObject',
	'UnknownType',
] as const;
export type DumpedTypes = typeof DUMPED_TYPES;
export type DumpedType = DumpedTypes[number];

/**
 * @description list of type names from DUMPED_TYPES for set it to `any`
 */
export const SKIPPED_TYPES = ['JSONPrimitiveObject', 'JSONArray', 'JSONObject', 'UnknownType'] as const;
export type SkippedTypes = typeof SKIPPED_TYPES;
