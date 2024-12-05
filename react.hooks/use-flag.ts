import { useCallback, useState, SetStateAction, Dispatch } from 'react';

/**
 * A simple useState hook that updates a boolean with togglers and dispatcher.
 * @returns {Array<boolean, SetStateAction>} array of:  [isFlag, setIsFlagTrue, setIsFlagFalse, toggleIsFlag, setIsFlag]
 */

export function useFlag(
	defaultValue = false,
): [
	isFlag: boolean,
	setIsFlagTrue: VoidFunction,
	setIsFlagFalse: VoidFunction,
	toggleIsFlag: VoidFunction,
	setIsFlag: Dispatch<SetStateAction<boolean>>,
] {
	const [isFlag, setIsFlag] = useState(defaultValue);
	const setIsFlagTrue = useCallback(() => setIsFlag(true), []);

	const setIsFlagFalse = useCallback(() => setIsFlag(false), []);
	const toggleIsFlag = useCallback(() => setIsFlag(value => !value), []);

	return [isFlag, setIsFlagTrue, setIsFlagFalse, toggleIsFlag, setIsFlag];
}
