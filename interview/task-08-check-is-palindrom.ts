/**
 * https://purpleschool.ru/blog/pyat-zadach-dlya-javascript-razrabotchikov
 * Задача 3: Палиндром
 * Напишите функцию, которая определяет, является ли переданная строка палиндромом.
 * Палиндромом считается строка, которая читается одинаково как слева направо, так и справа налево.
 */

const isPalindrome = (word: string) => word === word.split('').reverse().join('');

// Примеры использования:
console.log(isPalindrome('level'));
console.log(isPalindrome('racecar'));
console.log(isPalindrome('hello'));
