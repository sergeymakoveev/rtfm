import { useRef, useLayoutEffect, useCallback } from 'react';

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
