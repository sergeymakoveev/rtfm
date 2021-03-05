#!/usr/bin/env ts-node

import { sequenceT } from 'fp-ts/lib/Apply';
import { eqNumber } from 'fp-ts/lib/Eq';
import { constant, identity } from 'fp-ts/lib/function';
import { option, fromNullable, some, none, Option, map, fold, getOrElse, toNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

const bid = 10;
const ask = 7;
const delta = bid - ask;
console.log({ bid, ask, delta });

// const getNullableValue = <T>(value: T): T | null => (Math.random() > 0.5 ? value : null);

// const bidNullable = getNullableValue(bid);
// const askNullable = getNullableValue(7);
// const deltaNullable = bidNullable - askNullable;

// const deltaNullable = bidNullable !== null && askNullable !== null ? Math.abs(bidNullable - askNullable) : null;
// const sideNullable = bidNullable !== null && askNullable !== null && bidNullable - askNullable > 0 ? 'sell' : 'buy';
// console.log({ bidNullable, askNullable, deltaNullable, sideNullable });

/* divide by zero - ? */

// const getDelta = (bid: number, ask: number) => Math.abs(bidNullable - ask);
// const getSide = (bid: number, ask: number) => (bid - ask > 0 ? 'sell' : 'buy');
// const delta = bidNullable !== null && askNullable !== null ? getDelta(bidNullable, askNullable) : null;
// const side = bidNullable !== null && askNullable !== null ? getSide(bidNullable, askNullable) : null;
// console.log({ bidNullable, askNullable, deltaNullable, sideNullable });

// console.log('some(1):', JSON.stringify(some(1)));
// console.log('none:', JSON.stringify(none));

// const bidOption = fromNullable(bidNullable);
// const askOption = fromNullable(askNullable);
// const sequenceTOption = sequenceT(option);
// const quoteOption = sequenceTOption(bidOption, askOption);
// const deltaOption = quoteOption.map(([bid, ask]) => getDelta(bid, ask));
// const sideOption = quoteOption.map(([bid, ask]) => getSide(bid, ask));
// console.log({ bidOption, askOption, deltaOption, sideOption });

// console.log({
// 	bid: bidOption.toNullable(),
// 	ask: askOption.toNullable(),
// 	delta: deltaOption.toNullable(),
// 	side: sideOption.toNullable(),
// });

// const stringifyOption = <T>(value: Option<T>) => value.fold('-', value => `${value}`);

// console.log({
// 	bid: bidOption.map(delta => `${delta}`).getOrElse('-'),
// 	ask: askOption.fold('-', ask => `${ask}`),
// 	delta: stringifyOption(deltaOption),
// 	side: sideOption.getOrElse('sell'),
// });

// const arrayNumber = [1, 2]; // Array<number>
// console.log(
// 	arrayNumber.map(value => value + 1),
// 	arrayNumber.filter(value => Boolean(value % 2)),
// 	arrayNumber.some(value => value % 2),
// 	arrayNumber.every(value => value % 2),
// 	arrayNumber.reduce((acc, value) => ({ ...acc, [value]: value }), {}),
// 	arrayNumber.toString(),
// );

// const valueNumber = 1;
// const optionNumber = fromNullable(getNullableValue(valueNumber)); // Option<number>
// console.log(
// 	optionNumber.map(value => value + 1),
// 	optionNumber.filter(value => Boolean(value % 2)),
// 	optionNumber.exists(value => Boolean(value % 2)),
// 	optionNumber.isNone(),
// 	optionNumber.isSome(),
// 	optionNumber.reduce({}, (acc, value) => ({ ...acc, [value]: value })),
// 	optionNumber.toString(),
// );

// console.log(
// 	optionNumber.contains(eqNumber, valueNumber),
// 	optionNumber.fold(0, value => value),
// 	optionNumber.fold(0, identity),
// 	optionNumber.getOrElse(0),
// 	optionNumber.alt(some(2)),
// );

// const firstMonoidNumber = getFirstMonoid<number>();
// const lastMonoidNumber = getLastMonoid<number>();
// console.log(
// 	firstMonoidNumber.concat(none, some(1)),
// 	lastMonoidNumber.concat(none, some(1)),
// 	firstMonoidNumber.concat(some(1), some(2)),
// 	lastMonoidNumber.concat(some(1), some(2)),
// 	[none, some(1), some(2)].reduce(firstMonoidNumber.concat, none),
// 	[none, some(1), some(2)].reduce(lastMonoidNumber.concat, none),
// );

// const deltaOption = map(([bid, ask]) => getDelta(bid, ask))(quoteOption);
// const sideOption = map(([bid, ask]) => getSide(bid, ask))(quoteOption);
// console.log({
// 	bid: toNullable(bidOption),
// 	ask: fold(constant('-'), ask => `${ask}`)(askOption),
// 	delta: pipe(
// 		deltaOption,
// 		map(delta => `${delta}`),
// 		getOrElse(constant('sell')),
// 	),
// 	side: getOrElse(constant('sell'))(sideOption),
// });
