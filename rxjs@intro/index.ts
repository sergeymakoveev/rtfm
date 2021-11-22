#!/usr/bin/env ts-node

import { Observable, interval, of, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const getNumberFromRange = (min = 0, max = 100) => Math.round(min + Math.random() * (max - min));
const getRandomBoolean = () => Math.random() > 0.5;
const getNullableValue = <T>(value: T): T | null => (getRandomBoolean() ? value : null);

const getNullableStream = <T>(value: T): Observable<T | null> => of(getNullableValue(value));

const age$ = interval(1000).pipe(switchMap(() => getNullableStream(getNumberFromRange())));
const nameFirst$ = interval(1000).pipe(switchMap(() => getNullableStream('Haskell')));
const nameMiddle$ = interval(2000).pipe(switchMap(() => getNullableStream('Brooks')));
const nameLast$ = interval(3000).pipe(switchMap(() => getNullableStream('Curry')));

combineLatest([age$, nameFirst$, nameMiddle$, nameLast$]).subscribe(console.log);
