import { sequenceT } from 'fp-ts/lib/Apply';
import { constant, identity, pipe } from 'fp-ts/lib/function';
import { fold, fromNullable, getOrElse, map, option, some, toNullable } from 'fp-ts/lib/Option';

export const getRandomBoolean = () => Math.random() > 0.5;
export const getNullableValue = <T>(value: T): T | null => (getRandomBoolean() ? value : null);

const bid = getNullableValue(10);
const ask = getNullableValue(7);
// const profit = getNullableValue(1);

// const delta = bid !== null && ask !== null ? Math.abs(bid - ask) : null;
// const side = bid !== null && ask !== null && bid - ask > 0 ? 'sell' : 'buy';
// console.log({ bid, ask, delta, side });

// const getDelta = (bid: number, ask: number) => Math.abs(bid - ask);
// const getSide = (bid: number, ask: number) => (bid - ask > 0 ? 'sell' : 'buy');
// const delta = bid !== null && ask !== null ? getDelta(bid, ask) : null;
// const side = bid !== null && ask !== null ? getSide(bid, ask) : null;
// console.log({ bid, ask, delta, side });

// const bidOption = fromNullable(bid);
// const askOption = fromNullable(ask);
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

// console.log({
// 	bid: bidOption.toNullable(),
// 	ask: askOption.fold('-', ask => `${ask}`),
// 	delta: deltaOption.map(delta => `${delta}`).getOrElse('-'),
// 	side: sideOption.getOrElse('sell'),
// });

const arrayNumber = [1, 2]; // Array<number>
console.log(
	arrayNumber.map(value => value + 1),
	arrayNumber.filter(value => Boolean(value % 2)),
	arrayNumber.some(value => value % 2),
	arrayNumber.every(value => value % 2),
	arrayNumber.reduce((acc, value) => ({ ...acc, [value]: value }), {}),
);

const optionNumber = fromNullable(getNullableValue(1)); // Option<number>
console.log(
	optionNumber.map(value => value + 1),
	optionNumber.filter(value => Boolean(value % 2)),
	optionNumber.exists(value => Boolean(value % 2)),
	optionNumber.reduce({}, (acc, value) => ({ ...acc, [value]: value })),
	optionNumber.fold(0, value => value),
	optionNumber.fold(0, identity),
	optionNumber.getOrElse(0),
	optionNumber.alt(some(2)),
);

// const bidOption = fromNullable(bid);
// const askOption = fromNullable(ask);
// const sequenceTOption = sequenceT(option);
// const quoteOption = sequenceTOption(bidOption, askOption);
// const deltaOption = map(([bid, ask]) => getDelta(bid, ask))(quoteOption);
// const sideOption = map(([bid, ask]) => getSide(bid, ask))(quoteOption);
// console.log({
// 	bid: toNullable(bidOption),
// 	ask: fold(constant('-'), ask => `${ask}`)(askOption),
// 	delta: pipe(
// 		map(delta => `${delta}`),
// 		getOrElse(constant('sell')),
// 	)(deltaOption),
// 	side: getOrElse(constant('sell'))(sideOption),
// });
