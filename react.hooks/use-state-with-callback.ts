import React from 'react';

type Callback<T> = (state: T, previousState: T) => void;

export const useStateWithCallback = <T>(initialState: T) => {
	const [state, setState] = React.useState(initialState);
	const previousState = React.useRef(initialState);
	const callbacksRef = React.useRef<Callback<T>[]>([]);

	const setStateWithCallback = (state: T, callback?: Callback<T>) => {
		setState(state);
		if (callback) {
			callbacksRef.current.push(callback);
		}
	};

	React.useEffect(() => {
		callbacksRef.current.forEach(callback => callback(state, previousState.current));
		callbacksRef.current = [];
		previousState.current = state;
	}, [state]);

	return [state, setStateWithCallback] as const;
};

/*
const [state, setState] = useStateWithCallback<State>({ ... })

setState(
  { ... },
  (newState, prevState) => {
    newState - state after setState
    prevState - state before setState
  }
)

*/
