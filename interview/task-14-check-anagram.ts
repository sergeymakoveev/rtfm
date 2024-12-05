// https://habr.com/ru/articles/741108/
// Проверить, является ли 2 переданных строки анаграммой

const anagram = (strA, strB) => strA.split('').sort().join('') === strB.split('').sort().join('');

console.log(anagram('finder', 'Friend')); // true
console.log(anagram('hello', 'bye')); // false
