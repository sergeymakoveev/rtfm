/* eslint-disable @typescript-eslint/no-unused-vars */

type MyOmit<T extends Object, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
type MyPick<T extends Object, K extends keyof T> = { [P in K]: T[P] };

{
	// Написать собственную реализацию типа Omit
	type ExObj = { a: boolean; b: boolean; c: boolean };
	type ExOmit = Omit<ExObj, 'b'>;
	type ExMyOmit = MyOmit<ExObj, 'b'>;
}

{
	// Написать собственную реализацию типа Pick
	type ExObj = { a: boolean; b: boolean; c: boolean };
	type ExPick = Pick<ExObj, 'b'>;
	type ExMyPick = MyPick<ExObj, 'b'>;
}
