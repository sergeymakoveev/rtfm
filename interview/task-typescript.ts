/* eslint-disable @typescript-eslint/no-unused-vars */
{
	type ExObj = {
		a: boolean;
		b: boolean;
		c?: number;
		d: string | null;
		e: string | undefined;
		f: null;
		g: undefined;
		h?: undefined;
	};

	/* Написать собственную реализацию типа Omit */
	{
		type MyOmit<T extends object, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
		type ExObj = { a: boolean; b: boolean; c: boolean };
		type ExOmit = Omit<ExObj, 'b'>;
		type ExMyOmit = MyOmit<ExObj, 'b'>;
	}
	{
		type MyOmit1<T extends object, K extends keyof T> = { [F in Exclude<keyof T, K>]: T[F] };
		type MyOmit2<T extends object, K extends keyof T> = {
			[F in keyof T as F extends K ? never : F]: T[F];
		};
		type MyOmit1Res = MyOmit1<ExObj, 'a'>;
		type MyOmit2Res = MyOmit2<ExObj, 'a'>;
	}
	/* Написать собственную реализацию типа Pick */
	{
		type MyPick<T extends object, K extends keyof T> = { [P in K]: T[P] };
		type ExObj = { a: boolean; b: boolean; c: boolean };
		type ExPick = Pick<ExObj, 'b'>;
		type ExMyPick = MyPick<ExObj, 'b'>;
	}
	{
		type MyPick<T extends object, K extends keyof T> = { [F in K]: T[F] };
		type MyPickRes = MyPick<ExObj, 'b'>;
	}
	{
		type MyPick<T extends object, U extends keyof T> = {
			[K in keyof T as K extends U ? K : never]: T[K];
		};
		type T = MyPick<ExObj, 'c'>;
		type TT = MyPick<number, 'c'>;
	}

	/**
	 * 2. Дженерики
	 * Задача:
	 * Создайте универсальную функцию getValue, которая принимает объект и ключ,
	 * и возвращает значение этого ключа из объекта.
	 * Добавьте проверку типов, чтобы ключ обязательно существовал в объекте.
	 **/
	{
		const getValue = <T extends object = {}>(obj: T, key: keyof T) => obj[key];

		console.log(getValue({ a: 1 }, 'a'));
	}
	{
		type GetValueFn<T extends object, K extends keyof T> = (obj: T, key: K) => T[K];
		const getValue = <T extends object, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
	}

	/**
	 * 3. Условные типы (Conditional Types)
	 * Задача:
	 * Напишите тип NonNullableProps<T>, который делает все свойства объекта T обязательными (удаляет null и undefined).
	 **/
	{
		type NonNullableProps<T extends object = object> = {
			[K in keyof T as Exclude<T[K], null | undefined> extends never ? never : K]-?: Exclude<
				T[K],
				null | undefined
			>;
		};

		type NonNullableProps2<T extends object = object> = {
			[K in keyof T as NonNullable<T[K]> extends never ? never : K]-?: NonNullable<T[K]>;
		};

		type T = NonNullableProps<ExObj>;
		type T2 = NonNullableProps2<ExObj>;
	}
	{
		type NonNullableProps<T extends object> = {
			[K in keyof T as Exclude<T[K], undefined | null> extends never ? never : K]-?: Exclude<
				T[K],
				undefined | null
			>;
		};
		type MyExclude<T, U> = T extends U ? never : T;
		type NonNullableProps2<T extends object> = {
			[K in keyof T as T[K] extends null | undefined ? never : K]-?: MyExclude<T[K], null | undefined>;
		};
		type TT = 'a' extends 'a' ? true : false;
		type TT1 = 'a' | 'b' extends 'a' ? true : false;
		type TT2 = 'a' extends 'a' | 'b' ? true : false;
		type TT3 = 'a' | undefined extends undefined ? true : false;
		type TT4 = undefined extends 'a' | undefined ? true : false;

		type T = NonNullableProps<ExObj>;
		type T2 = NonNullableProps2<ExObj>;
	}
	{
		type NonNullableProps<T extends object> = {
			[K in keyof T as Exclude<T[K], null | undefined> extends never ? never : K]-?: Exclude<
				T[K],
				null | undefined
			>;
		};
		type T = NonNullableProps<ExObj>;
	}

	/**
	 * Реализовать Exclude<'a'|'b'|'c', 'a'|'c'> = 'b'
	 */
	{
		type MyExclude<T, U> = T extends U ? never : T;
		type ExObjKeys = keyof ExObj;
		type T = MyExclude<ExObjKeys, 'a' | 'b'>;
		type T2 = MyExclude<string | null, null>;
		type T3 = MyExclude<null, string | null>;
		type T4 = MyExclude<string | null | undefined, undefined | null>;
	}
	{
		type MyExclude<T, U> = T extends U ? never : T;
		type T = Exclude<'a' | 'b' | 'c', 'a' | 'c'>;
	}

	/**
	 * 4. Удаление всех nullable полей из типа объекта
	 * OmitNullable<T>
	 **/
	{
		type OmitNullableProps<T extends object> = {
			[K in keyof T as null extends T[K] ? never : undefined extends T[K] ? never : K]: T[K];
		};
		type T = OmitNullableProps<ExObj>;
	}
	{
		type OmitNullable<T extends object> = {
			[K in keyof T as T[K] extends NonNullable<T[K]> ? K : never]: T[K];
		};
		type T = OmitNullable<ExObj>;
	}
	/*
5. Перегрузка функций (Function Overloads)
Задача:
Напишите функцию formatInput, которая:
Если на входе строка — возвращает её в верхнем регистре.
Если на входе число — возвращает его строковое представление с добавлением px (например, 10 → "10px").
*/
	{
		function formatInput(inp: string): Uppercase<string>;
		function formatInput(inp: number): `${number}px`;

		function formatInput(inp: string | number): Uppercase<string> | `${number}px` {
			return typeof inp === 'string' ? (inp.toUpperCase() as Uppercase<string>) : `${inp}px`;
		}

		formatInput('hello'); // "HELLO"
		formatInput(20); // "20px"
	}
	/*
7. Продвинутые типы: Mapped Types + keyof
Задача:
Создайте тип ReadonlyDeep<T>, который делает все свойства объекта (включая вложенные) доступными только для чтения.
*/
	{
		type ReadonlyDeep<T extends object = object> = {
			readonly [K in keyof T]: T[K] extends object ? ReadonlyDeep<T[K]> : T[K];
		};

		type TT = ReadonlyDeep<{ a: number; b: { c: string } }>;
	}

	{
		type ReadonlyDeep<T extends object> = {
			readonly [K in keyof T]: T[K] extends object ? ReadonlyDeep<T[K]> : T[K];
		};

		type T = ReadonlyDeep<ExObj & { aa: ExObj }>;
	}
}
