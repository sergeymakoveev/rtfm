// https://habr.com/ru/articles/904688/

import { NonEmptyReadonlyArray } from './';

export type Tuple<T1 = undefined, T2 = undefined, T3 = undefined, T4 = undefined, T5 = undefined> = T1 extends undefined
	? never
	: T2 extends undefined
	? readonly [T1]
	: T3 extends undefined
	? readonly [T1, T2]
	: T4 extends undefined
	? readonly [T1, T2, T3]
	: T5 extends undefined
	? readonly [T1, T2, T3, T4]
	: readonly [T1, T2, T3, T4, T5];

type Responses<T1 = undefined, T2 = undefined, T3 = undefined, T4 = undefined, T5 = undefined> = Tuple<
	T1,
	T2,
	T3,
	T4,
	T5
>;

// type ResponseData<T> = { data: T };

// type Responses<T1 = undefined, T2 = undefined, T3 = undefined, T4 = undefined, T5 = undefined> = Tuple<
// 	T1 extends undefined ? never : ResponseData<T1>,
// 	T2 extends undefined ? never : ResponseData<T2>,
// 	T3 extends undefined ? never : ResponseData<T3>,
// 	T4 extends undefined ? never : ResponseData<T4>,
// 	T5 extends undefined ? never : ResponseData<T5>
// >;

type RequestParams = Record<string, unknown>;

type Requests<T1 = undefined, T2 = undefined, T3 = undefined, T4 = undefined, T5 = undefined> = Tuple<
	T1 extends undefined ? never : RequestParams,
	T2 extends undefined ? never : RequestParams,
	T3 extends undefined ? never : RequestParams,
	T4 extends undefined ? never : RequestParams,
	T5 extends undefined ? never : RequestParams
>;

const request = <T1 = undefined, T2 = undefined, T3 = undefined, T4 = undefined, T5 = undefined>(
	params: Requests<T1, T2, T3, T4, T5>,
): Promise<Responses<T1, T2, T3, T4, T5>> => {
	return Promise.resolve(params);
};

/**
 * Создает кортеж заданной длины
 * @template T типа элементов кортежа
 * @template N длина кортежа
 */
type BuildTuple<T, N extends number> = _buildTuple<T, N>;
type _buildTuple<T, N extends number, Result extends T[] = []> = Result['length'] extends N
	? _Tuple<Result>
	: _buildTuple<T, N, [T, ...Result]>;

type _BuildedTuple0 = BuildTuple<RequestParams, 0>;
type _BuildedTuple3 = BuildTuple<RequestParams, 3>;

// type _Tuple<T extends NonEmptyReadonlyArray<any> = NonEmptyReadonlyArray<any>> = T;
type _Tuple<T extends any[] = []> = readonly [...T];

type _TupleRightExample = _Tuple<[string, number]>;
type _TupleRightExampleLength = _TupleRightExample['length'];
type _TupleLeftExample = _Tuple<[]>;

type _Requests<T extends _Tuple> = BuildTuple<RequestParams, T['length']>;

const _request = <T extends _Tuple>(params: _Requests<T>): Promise<T> => Promise.resolve(params);
