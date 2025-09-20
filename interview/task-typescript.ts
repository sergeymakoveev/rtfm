/* eslint-disable @typescript-eslint/no-unused-vars */
{
	type ExObj = {
		a: boolean;
		b: boolean;
		c: null;
		d?: number;
		e: string | null;
		f: undefined;
		g?: undefined;
	};

	/* Написать собственную реализацию типа Omit */
	{
		type MyOmit<T extends Object, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
		type ExObj = { a: boolean; b: boolean; c: boolean };
		type ExOmit = Omit<ExObj, 'b'>;
		type ExMyOmit = MyOmit<ExObj, 'b'>;
	}
	{
		type MyOmit1<T extends Object, K extends keyof T> = { [F in Exclude<keyof T, K>]: T[F] };
		type MyOmit2<T extends Object, K extends keyof T> = {
			[F in keyof T as F extends K ? never : F]: F extends K ? never : T[F];
		};
		type MyOmit1Res = MyOmit1<ExObj, 'a'>;
		type MyOmit2Res = MyOmit2<ExObj, 'a'>;
	}
	/* Написать собственную реализацию типа Pick */
	{
		type MyPick<T extends Object, K extends keyof T> = { [P in K]: T[P] };
		type ExObj = { a: boolean; b: boolean; c: boolean };
		type ExPick = Pick<ExObj, 'b'>;
		type ExMyPick = MyPick<ExObj, 'b'>;
	}
	{
		type MyPick<T extends Object, K extends keyof T> = { [F in K]: T[F] };
		type MyPickRes = MyPick<ExObj, 'b'>;
	}

	/**
	 * 2. Дженерики
	 * Задача:
	 * Создайте универсальную функцию getValue, которая принимает объект и ключ,
	 * и возвращает значение этого ключа из объекта.
	 * Добавьте проверку типов, чтобы ключ обязательно существовал в объекте.
	 **/
	{
		const getValue = <T extends Object = {}>(obj: T, key: keyof T) => obj[key];

		console.log(getValue({ a: 1 }, 'a'));
	}
	{
		type GetValueFn<T extends Object, K extends keyof T> = (obj: T, key: K) => T[K];
		const getValue = <T extends Object, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
	}

	/**
	 * 3. Условные типы (Conditional Types)
	 * Задача:
	 * Напишите тип NonNullableProps<T>, который делает все свойства объекта T обязательными (удаляет null и undefined).
	 **/
	{
		type NonNullableProps<T extends Object = Object> = {
			[K in keyof T]-?: Exclude<T[K], null | undefined>;
		};

		type NonNullableProps2<T extends Object = Object> = {
			[K in keyof T]-?: NonNullable<T[K]>;
		};

		type T = NonNullableProps<ExObj>;
		type T2 = NonNullableProps2<ExObj>;
	}
	{
		type NonNullableProps<T extends Object> = { [K in keyof T]-?: Exclude<T[K], undefined | null> };
		type NonNullableProps2<T extends Object> = {
			[K in keyof T]-?: null extends T[K] ? never : undefined extends T[K] ? never : T[K];
		};
		type T = NonNullableProps<ExObj>;
		type T2 = NonNullableProps2<ExObj>;
	}

	/**
	 * OmitNullable<T>
	 */

	{
		type OmitNullableProps<T extends Object> = {
			[K in keyof T as null extends T[K] ? never : undefined extends T[K] ? never : K]: T[K];
		};
		type T = OmitNullableProps<ExObj>;
	}

	/*
5. Перегрузка функций (Function Overloads)
Задача:
Напишите функцию formatInput, которая:
Если на входе строка — возвращает её в верхнем регистре.
Если на входе число — возвращает его строковое представление с добавлением px (например, 10 → "10px").
*/
	{
		const formatInput = <T extends string | number>(inp: T): T extends string ? Uppercase<T> : `${T}px` =>
			typeof inp === 'string' ? inp.toUpperCase() : `${inp}px`;

		formatInput('hello'); // "HELLO"
		formatInput(20); // "20px"
	}
	/*
7. Продвинутые типы: Mapped Types + keyof
Задача:
Создайте тип ReadonlyDeep<T>, который делает все свойства объекта (включая вложенные) доступными только для чтения.
*/
	{
		type ReadonlyDeep<T extends Object = Object> = {
			readonly [K in keyof T]: T[K] extends Object ? ReadonlyDeep<T[K]> : T[K];
		};

		type TT = ReadonlyDeep<{ a: number; b: { c: string } }>;
	}
}
