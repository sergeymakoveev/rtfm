import { useRef, useLayoutEffect, useCallback, useState, SetStateAction, Dispatch } from 'react';

/**
 * Same as React's useCallback, but returns a stable reference.
 * This library is a user-land implementation of the useEvent hook, proposed in this [RFC](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md).
 **/

export function useEvent<T extends (...args: any[]) => any>(handler: T) {
	const handlerRef = useRef<T | null>(handler);

	useLayoutEffect(() => {
		handlerRef.current = handler;
	});

	return useCallback((...args: Parameters<T>) => {
		const fn = handlerRef.current;
		return fn?.(...args);
	}, []);
}

/**
 * A simple useState hook that updates a boolean with togglers and dispatcher.
 * @returns {Array<boolean, SetStateAction>} array of:  [isFlag, setIsFlagTrue, setIsFlagFalse, toggleIsFlag, setIsFlag]
 */

export function useFlag(
	defaultValue = false,
): [boolean, VoidFunction, VoidFunction, VoidFunction, Dispatch<SetStateAction<boolean>>] {
	const [isFlag, setIsFlag] = useState(defaultValue);
	const setIsFlagTrue = useCallback(() => setIsFlag(true), []);

	const setIsFlagFalse = useCallback(() => setIsFlag(false), []);
	const toggleIsFlag = useCallback(() => setIsFlag(value => !value), []);

	return [isFlag, setIsFlagTrue, setIsFlagFalse, toggleIsFlag, setIsFlag];
}
