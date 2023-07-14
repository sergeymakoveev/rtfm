import { RefObject, useCallback } from 'react';
import { useEvent } from './use-event';

export const useScrollOutside = (
	elementRef: RefObject<Node>,
	handler: () => void,
	disableScrollDetection = false,
): void => {
	const onScroll = useCallback(
		(ev: Event) => {
			if (disableScrollDetection || !elementRef.current || !(ev.target instanceof Node)) {
				return;
			}
			const elementNode = elementRef.current;
			if (!(elementNode instanceof Element)) {
				return;
			}

			// This gives false-positive on `click` events when using element-resize-detector
			const shouldClose = ev.target !== elementNode && !elementNode.contains(ev.target);
			if (shouldClose) {
				handler();
			}
		},
		[elementRef, handler, disableScrollDetection],
	);
	useEvent(window, 'scroll', onScroll);
};
