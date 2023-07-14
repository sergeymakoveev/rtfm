import { RefObject, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void, shouldCapture = true): void => {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
				handler();
			}
		};
		document.addEventListener('click', handleClick, {
			capture: shouldCapture,
		});
		return () =>
			document.removeEventListener('click', handleClick, {
				capture: shouldCapture,
			});
	}, [ref, handler, shouldCapture]);
};
