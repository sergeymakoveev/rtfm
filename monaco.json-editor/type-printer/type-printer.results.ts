/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

type Page = {
  blocks: ({ type: "Component1"; params: { param1: boolean; param2: string; param3: number; booleanParam: boolean; stringParam: string; numberParam: number; }; } | { type: "Component2"; params: ComponentProps; })[];
  onClick?: VoidFunction;
  jsonPrimitive: JSONPrimitive;
  jsonValue: JSONValue;
  jsonArray: JSONArray;
  jsonPrimitiveObject?: JSONPrimitiveObject;
  jsonObject?: JSONObject;
  key?: number;
};

type ComponentProps = {
  paramBooleanRequired: boolean;
  paramNumber?: number;
  paramStringRequired: string;
};

type JSONPrimitive = string | number | false | true;

type JSONValue = string | number | false | true | JSONObject | JSONArray;

type JSONArray = unknown;

type JSONPrimitiveObject = unknown;

type JSONObject = unknown;

type UnknownType = unknown;
