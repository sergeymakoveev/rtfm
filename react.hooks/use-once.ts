import { useEffect, useRef } from 'react';

export function useOnce(cb: () => void) {
	const { current: savedCb } = useRef(cb);

	useEffect(savedCb, [savedCb]);
}
