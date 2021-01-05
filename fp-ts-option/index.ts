// import { sequenceT } from 'fp-ts/lib/Apply';
// import { fromNullable, option } from 'fp-ts/lib/Option';
import { getNullableValue } from '../helpers';

const bid = getNullableValue(10);
const ask = getNullableValue(7);
// const profit = getNullableValue(1);

const delta = bid !== null && ask !== null ? Math.abs(bid - ask) : null;
const side = bid !== null && ask !== null && bid - ask > 0 ? 'sell' : 'buy';
console.log({ bid, ask, delta, side });

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
