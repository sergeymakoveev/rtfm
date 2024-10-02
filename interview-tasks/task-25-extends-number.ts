/* eslint-disable @typescript-eslint/ban-ts-comment */

/**
 * Реализовать методы, которые в процессе выполнения строки (2).plus(3).minus(1) дали бы на выходе 4.
 */

// @ts-ignore
Number.prototype.plus = function (value) {
	return this + value;
};

// @ts-ignore
Number.prototype.minus = function (value: number) {
	return (this as number) - value;
};

// @ts-ignore
console.log((2).plus(3).minus(1));
