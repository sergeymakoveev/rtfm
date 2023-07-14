import { useEffect, useMemo } from 'react';

export const useEventListener = (
	target: EventTarget,
	eventName: string,
	handler: EventListener,
	capture = true,
	passive = true,
): void => {
	const options = useMemo(() => ({ capture, passive }), [capture, passive]);
	useMemo(() => {
		target.addEventListener(eventName, handler, options);
	}, [target, eventName, handler, options]);

	useEffect((): (() => void) => {
		return () => {
			target.removeEventListener(eventName, handler, options);
		};
	}, [target, eventName, handler, options]);
};
