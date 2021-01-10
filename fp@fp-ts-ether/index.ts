import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import Either = E.Either;

const args = process.argv.slice(2);

const prepareJson = (args: Array<string>): string => args.join(' ');

const parseJson = (input: string): Either<Error, unknown> => {
	try {
		const numbers = JSON.parse(input);
		return E.right(numbers);
	} catch (error) {
		return E.left(error);
	}
};

const checkArray = (value: unknown): Either<Error, Array<unknown>> =>
	Array.isArray(value) ? E.right(value) : E.left(new Error('Enter array of number only, e.g. [1,2,3].'));

const getAverage = (arr: Array<number>): number => {
	const total = arr.length;
	const sum = arr.reduce((sum, val) => +val + sum, 0);
	return sum / total;
};

const checkNumber = (value: number): Either<Error, number> =>
	isNaN(value)
		? E.left(new Error('Enter numbers only.'))
		: value === Infinity
		? E.left(new Error('Enter some numbers.'))
		: E.right(value);

pipe(
	args,
	prepareJson,
	parseJson,
	E.chain(checkArray),
	E.map(getAverage),
	E.chain(checkNumber),
	E.fold(
		error => console.error(error.message),
		value => console.log(value),
	),
);
