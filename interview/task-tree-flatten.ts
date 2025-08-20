// https://habr.com/ru/articles/741108/

/*
Задача: Напишите функцию flattenObject(obj), которая принимает в качестве
аргумента вложенный объект obj и возвращает новый объект,
в котором все свойства объекта obj "разглажены"
(преобразованы в одноуровневую структуру), с использованием точечной нотации
для представления иерархии свойств.
*/
if (false) {
	const obj = {
		a: {
			b: {
				c: 1,
				d: 2,
			},
			e: 3,
		},
		f: 4,
	};

	type Value = number | { [key: string]: number | Value };

	type ObjectSrc = { [key: string]: Value };

	const flattenObject = (obj: ObjectSrc, keyParent = '') =>
		Object.entries(obj).reduce((flatObject, [key, value]) => {
			const nextObj =
				typeof value === 'number'
					? { [`${keyParent}${keyParent ? '.' : ''}${key}`]: value }
					: flattenObject(value, `${keyParent}${keyParent ? '.' : ''}${key}`);
			return { ...flatObject, ...nextObj };
		}, {} as ObjectSrc);

	console.log(flattenObject(obj));

	// Ожидаемый результат:
	// { 'a.b.c': 1, 'a.b.d': 2, 'a.e': 3, 'f': 4 }
	// или
	// { "f": 4, "a.e": 3, "a.b.c": 1, "a.b.d": 2 }
}

if (false) {
	type Obj = { [key: string]: number | Obj };
	const obj: Obj = {
		a: {
			b: {
				c: 1,
				d: 2,
			},
			e: 3,
		},
		f: 4,
	};

	const flattenObj = (object: Obj, keys: string[] = []) =>
		Object.entries(object).reduce(
			(acc, [nextKey, nextValue]) =>
				nextValue instanceof Object
					? { ...acc, ...flattenObj(nextValue, [...keys, nextKey]) }
					: { ...acc, [[...keys, nextKey].join('.')]: nextValue },
			{},
		);

	console.log('## flattenObj', flattenObj(obj));
}

if (true) {
	type Obj = { [k: string]: number | Obj };
	const obj: Obj = {
		a: {
			b: {
				c: 1,
				d: 2,
			},
			e: 3,
		},
		f: 4,
	};

	const flattenObject = (obj: Obj, prefix?: string) =>
		Object.entries(obj).reduce(
			(acc, [key, value]) => ({
				...acc,
				...(typeof value === 'number'
					? { [`${prefix ? `${prefix}.` : ''}${key}`]: value }
					: flattenObject(value, `${prefix ? `${prefix}.` : ''}${key}`)),
			}),
			{},
		);

	console.log(flattenObject(obj));
}
