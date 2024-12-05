import React from 'react';

/**
 * Custom hook for determining if the component is currently mounted.
 * Use checkIsComponentMounted() to check if the component is currently mounted before performing certain actions.
 * @returns {() => boolean} A function that returns a boolean value indicating whether the component is mounted.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-is-mounted)
 * @example
 * const checkIsComponentMounted = useCheckIsMounted();
 * if (checkIsComponentMounted()) {
 *  // do some here
 * }
 */

export function useCheckIsMounted(): () => boolean {
	const isMounted = React.useRef(false);

	React.useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return React.useCallback(() => isMounted.current, []);
}
