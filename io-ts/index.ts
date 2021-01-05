// import { some } from 'fp-ts/Option';

const getNumberFromRange = (min = 0, max = 100) => Math.round(min + Math.random() * (max - min));
const getRandomBoolean = () => Math.random() > 0.5;
const getNullableValue = <T>(value: T): T | null => (getRandomBoolean() ? value : null);

const user = {
	age: getNullableValue(getNumberFromRange()),
	name: {
		first: getNullableValue('Haskell'),
		middle: getNullableValue('Brooks'),
		last: getNullableValue('Curry'),
	},
};

const userValid = user.age && user.name.first && user.name.last ? user : null;
const userValid = user.age !== null && user.name.first !== null && user.name.last !== null ? user : null;

// type User = typeof user;
// const validateUser = ({ age, name }: User) => age !== null && name.first !== null && name.last !== null;
// if (validateUser(user)) {
// 	console.log(user);
// }

console.log(userValid);
