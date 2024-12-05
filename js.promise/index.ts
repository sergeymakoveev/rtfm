#!/usr/bin/env ts-node

let isTimeTravelStarted = false;
let {
	promise: cancelTimeTravelFinishPromise,
	resolve: cancelTimeTravelFinishPromiseResolve,
	reject: cancelTimeTravelFinishPromiseReject,
} = Promise.withResolvers<boolean>();
const trackedTimeTravelFinishPromises: Set<Promise<boolean>> = new Set();

export const checkIsTimeTravelStarted = () => isTimeTravelStarted;
export const setIsTimeTravelStarted = (state: boolean) => (isTimeTravelStarted = state);
const setIsTimeTravelStartedFalse = () => (isTimeTravelStarted = false);
export const trackIsTimeTravelFinish = () => {
	cancelTimeTravelFinishPromiseReject();
	trackedTimeTravelFinishPromises.delete(cancelTimeTravelFinishPromise);
	const {
		promise: newCancelTimeTravelFinishPromise,
		resolve: newCancelTimeTravelFinishPromiseResolve,
		reject: newCancelTimeTravelFinishPromiseReject,
	} = Promise.withResolvers<boolean>();
	cancelTimeTravelFinishPromise = newCancelTimeTravelFinishPromise;
	cancelTimeTravelFinishPromiseResolve = newCancelTimeTravelFinishPromiseResolve;
	cancelTimeTravelFinishPromiseReject = newCancelTimeTravelFinishPromiseReject;
	const {
		promise: timeTravelFinishPromise,
		resolve: timeTravelFinishPromiseResolve,
		reject: timeTravelFinishPromiseReject,
	} = Promise.withResolvers<boolean>();
	timeTravelFinishPromise.then(() => {
		const isAllResolved = Array.from(trackedTimeTravelFinishPromises).filter(([promise]) => promise);
	});
	trackedTimeTravelFinishPromises.add(timeTravelFinishPromise);
	trackedTimeTravelFinishPromises.add(cancelTimeTravelFinishPromise);
	Promise.all(trackedTimeTravelFinishPromises).then(setIsTimeTravelStartedFalse);
	return {
		timeTravelFinishPromise,
		timeTravelFinishPromiseResolve,
		timeTravelFinishPromiseReject,
	};
};
