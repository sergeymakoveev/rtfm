/**
 * https://purpleschool.ru/blog/pyat-zadach-dlya-javascript-razrabotchikov
 * Задача 1: Поиск уникального элемента в массиве
 * Напишите функцию, которая находит уникальный элемент в массиве чисел, где все числа повторяются дважды, за исключением одного.
 */

const findUniqueElement = arr =>
	arr.sort().reduce((prev, next) => (prev === null ? next : prev === next ? null : prev), null);

const arrayExample = [1, 2, 3, 4, 1, 2, 3];
console.log(findUniqueElement(arrayExample)); // Выведет 4
const arrayExample2 = [1, 2, 3, 4, 1, 2, 3, 4];
console.log(findUniqueElement(arrayExample2)); // Выведет null
