#!/usr/bin/env ts-node

import { Observable, interval, of, tap, map, take } from 'rxjs';
import { fromArrayLike } from 'rxjs/internal/observable/from';

const stream$ = interval(1000);
fromArrayLike([1, 2, 3, 4, 5]).pipe(
	take(2),
	tap(value => console.log('## tap', { value })),
);

// const subscription = stream$.subscribe(
// 	value => console.log('## value', { value }),
// 	error => console.log('## error', { error }),
// 	() => console.log('## complete'),
// );

// const promise = stream$.toPromise().then(value => {
// 	console.log('## then', { value });
// 	return value;
// });

// console.log('## promise', { promise });

// stream$.
