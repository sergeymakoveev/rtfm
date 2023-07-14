import { RefObject, useEffect } from 'react';

export const useScroll = (ref: RefObject<HTMLElement>, f: (e: Event) => void): void =>
	useEffect(() => {
		const current = ref.current;
		current?.addEventListener('scroll', f, {
			passive: true,
		});
		return () => {
			current?.removeEventListener('scroll', f);
		};
	}, [ref, f]);
