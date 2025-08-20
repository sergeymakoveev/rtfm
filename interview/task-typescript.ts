/* eslint-disable @typescript-eslint/no-unused-vars */

/*
Написать собственную реализацию типа Omit
*/
{
	type MyOmit<T extends Object, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };
	type ExObj = { a: boolean; b: boolean; c: boolean };
	type ExOmit = Omit<ExObj, 'b'>;
	type ExMyOmit = MyOmit<ExObj, 'b'>;
}

/*
Написать собственную реализацию типа Pick
*/
{
	type MyPick<T extends Object, K extends keyof T> = { [P in K]: T[P] };
	type ExObj = { a: boolean; b: boolean; c: boolean };
	type ExPick = Pick<ExObj, 'b'>;
	type ExMyPick = MyPick<ExObj, 'b'>;
}

/*
2. Дженерики
Задача:
Создайте универсальную функцию getValue, которая принимает объект и ключ,
и возвращает значение этого ключа из объекта.
Добавьте проверку типов, чтобы ключ обязательно существовал в объекте.
*/
{
	const getValue = <T extends Object = {}>(obj: T, key: keyof T) => obj[key];

	console.log(getValue({ a: 1 }, 'a'));
}

/*
3. Условные типы (Conditional Types)
Задача:
Напишите тип NonNullableProps<T>, который делает все свойства объекта T обязательными (удаляет null и undefined).
*/
{
	type NonNullableProps<T extends Object = Object> = {
		[K in keyof T]-?: T[K] extends null | undefined ? never : T[K];
	};

	type NonNullableProps2<T extends Object = Object> = {
		[K in keyof T]-?: NonNullable<T[K]>;
	};

	type T = NonNullableProps<{ a?: string; b: number }>;
	type T2 = NonNullableProps2<{ a?: string; b: number }>;

	type TT = T['a'];
	type TT2 = T2['a'];
}
/*
4. Утилитарные типы
Задача:
Реализуйте свой аналог встроенного типа Pick<T, K>.
*/
{
	type Pick2<T extends Object, P extends keyof T> = {
		[K in P]: T[P];
	};

	type P = Pick<{ a: 1; b: 2 }, 'a'>;
	type P2 = Pick2<{ a: 1; b: 2 }, 'a'>;
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
