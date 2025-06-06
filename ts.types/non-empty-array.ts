export type NonEmptyArray<T> = [T, ...T[]];
export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];
export const checkIsNonEmptyArray = <T>(value: T[]): value is NonEmptyArray<T> => value.length > 0;

const _ExNonEmptyArray: NonEmptyArray<number> = [1];
const _ExNonEmptyArrayError: NonEmptyArray<number> = [];

checkIsNonEmptyArray([]); // false
checkIsNonEmptyArray([1]); // true
