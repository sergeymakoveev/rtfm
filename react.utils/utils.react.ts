import React from 'react';

const isRefObject = <T>(ref: React.Ref<T>): ref is React.RefObject<T> => {
	return ref !== null && typeof ref === 'object' && 'current' in ref;
};

export const fillRef =
	<T>(ref: React.Ref<T>) =>
	(node: T) => {
		if (typeof ref === 'function') {
			ref(node);
		} else if (isRefObject(ref)) {
			(ref as React.MutableRefObject<T | null>).current = node;
		}
	};

export const composeRef =
	<T>(...refs: Array<React.Ref<T> | null | undefined>): React.Ref<T> =>
	(node: T) => {
		refs.forEach(ref => {
			ref && fillRef(ref)(node);
		});
	};

/**
 * Type guard to check if a value is a React ref object
 * (has a mutable 'current' property)
 *
 * @param ref - The value to check
 * @returns Whether the value is a ref object
 */
const isRefObject1 = <T>(ref: any): ref is React.RefObject<T> => {
	return ref !== null && typeof ref === 'object' && 'current' in ref;
};

/**
 * Creates a function that properly fills a React ref with the provided node.
 * Handles both callback refs and object refs.
 *
 * @param ref - The React ref to fill
 * @returns A function that, when called with a node, will update the ref
 *
 * @example
 * // Using with a ref directly
 * const elementRef = useRef<HTMLDivElement>(null);
 * useEffect(() => {
 *   const node = document.querySelector('.my-element');
 *   if (node) fillRef(elementRef)(node);
 * }, []);
 */
export const fillRef1 = <T>(ref: React.Ref<T> | null | undefined): ((node: T | null) => void) => {
	return (node: T | null): void => {
		if (!ref) return;

		if (typeof ref === 'function') {
			ref(node);
		} else if (isRefObject1(ref)) {
			(ref as React.MutableRefObject<T | null>).current = node;
		}
	};
};

/**
 * Composes multiple React refs into a single ref function.
 *
 * This utility allows you to apply multiple refs to a single React element,
 * which is useful when working with components that need to combine refs from
 * different sources (e.g., forwardRef and local refs).
 *
 * @param refs - Array of React refs to compose
 * @returns A single ref callback that applies all provided refs to the node
 *
 * @example
 * // Combining a forwarded ref with a local ref
 * const MyComponent = React.forwardRef((props, forwardedRef) => {
 *   const localRef = useRef<HTMLDivElement>(null);
 *   const composedRef = composeRef(localRef, forwardedRef);
 *
 *   return <div ref={composedRef}>Content</div>;
 * });
 */

export const composeRef1 = <T>(...refs: Array<React.Ref<T> | null | undefined>): React.RefCallback<T> => {
	return (node: T | null): void => {
		refs.forEach(ref => {
			if (ref) {
				if (typeof ref === 'function') {
					ref(node);
				} else if (ref && typeof ref === 'object' && 'current' in ref) {
					// This handles MutableRefObject
					(ref as React.MutableRefObject<T | null>).current = node;
				}
			}
		});
	};
};
