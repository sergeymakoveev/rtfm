type ExObj = {
	a: string;
	b: number;
	c: { cc: { ccc: { cccc: boolean } } };
	d?: boolean;
	e?: boolean;
	f?: boolean;
	g?: boolean;
};

export type IntersectionToFlat1<T> = T extends object ? { [K in keyof T]: IntersectionToFlat1<T[K]> } : T;

export type IntersectionToFlat<T> = Omit<T, never>;
type ExIntersection = { a: string } & { b: string };
// type ExFlat = { a: string, b: string };
// { a: string } & { b: string } -> { a: string, b: string }
type _ExFlat = IntersectionToFlat<ExIntersection>;

export type PartialKeys<T extends {}, K extends keyof T> = IntersectionToFlat<Omit<T, K> & Partial<Pick<T, K>>>;
type _ExPartialKeys = PartialKeys<ExObj, 'a'>;

export type PartialKeysExclude<T extends Record<string, unknown>, K extends keyof T> = IntersectionToFlat<
	Pick<T, K> & Partial<Omit<T, K>>
>;
type _ExPartialKeysExclude = PartialKeysExclude<ExObj, 'g' | 'a'>;

export type RequiredKeys<T extends {}, K extends keyof T> = IntersectionToFlat<Omit<T, K> & Required<Pick<T, K>>>;
type _ExRequiredKeys = RequiredKeys<ExObj, 'd' | 'e' | 'f'>;

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type _ExDeepPartial = DeepPartial<ExObj>;

export type TypeWithSuggest<T extends string | number | symbol, Suggest extends T> = Suggest | Omit<T, Suggest>;
// export type TypeWithSuggest<T, Suggest extends T> = (T & Record<never, never>) | Suggest;
type _ExTypeWithSuggest = TypeWithSuggest<`${number}/${number}`, '16/9' | '16/10' | '4/3'>;

export type ReplaceTo<T extends object, K extends keyof T, R = unknown> = IntersectionToFlat<
	Omit<T, K> & {
		[P in K]: T[P] extends undefined ? R | undefined : R;
	}
>;
type _ExReplaceTo = ReplaceTo<ExObj, 'd' | 'e' | 'f', true>;

export type valueof<C extends object> = C[keyof C];
type _ExValueof = valueof<ExObj>;
