import React from 'react';

const isRefObject = <T>(ref: React.Ref<T>): ref is React.RefObject<T> => {
	return ref !== null && typeof ref === 'object' && 'current' in ref;
};

export const fillRef = <T>(ref: React.Ref<T>) => (node: T) => {
	if (typeof ref === 'function') {
		ref(node);
	} else if (isRefObject(ref)) {
		(ref as React.MutableRefObject<T | null>).current = node;
	}
};

export const composeRef = <T>(...refs: Array<React.Ref<T> | null | undefined>): React.Ref<T> => (node: T) => {
	refs.forEach(ref => {
		ref && fillRef(ref)(node);
	});
};
