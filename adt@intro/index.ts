#!/usr/bin/env ts-node

const array = [1, 2, 3, 4];
console.log({ array });
const arrayChanged = array.map(value => value + 1);
console.log({ arrayChanged });

// const promise = Promise.resolve(1);
// console.log({ promise });
// const promiseChanged = promise.then(value => value + 1);
// console.log({ promiseChanged });
