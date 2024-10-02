/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Задачи на работу с массивами
 * https://habr.com/ru/articles/741108/
 */

/**
 * Реализовать собственные методы map, filter, reduce.
 * Необходимо сохранить все те возможности, что есть у нативных методов:
 * обращение через точку, получение всех необходимых аргументов
 **/

// @ts-ignore
Array.prototype.map1 = function (mapFn) {
	// console.log(this);
	for (let i = 0; i < this.length; i++) {
		this[i] = mapFn(this[i], i, this);
	}
	return this;
};

// @ts-ignore
Array.prototype.filter1 = function (filterFn) {
	let filteredArray = [];
	for (let i = 0; i < this.length; i++) {
		if (filterFn(this[i], i, this)) {
			// @ts-ignore
			filteredArray = [...filteredArray, this[i]];
		}
	}
	return filteredArray;
};

// @ts-ignore
Array.prototype.tap1 = function (tapFn) {
	tapFn(this);
	// console.log(this);
	return this;
};

const result = [1, 2, 8, 56]
	// @ts-ignore
	.tap1(array => console.log('tap1', { array }))
	.map1((value, index, array) => {
		console.log('map1', { value, index, array });
		return value + value;
	})
	.filter1((value, index, array) => {
		console.log('filter1', { value, index, array });
		return value > 10;
	})
	.tap1(array => console.log('res', { array }));

console.log({ result });
