import { useEffect, useRef } from 'react';

export function useCallOnce(callback: () => void) {
	const { current: memoizedCallback } = useRef(callback);
	useEffect(memoizedCallback, [memoizedCallback]);
}
