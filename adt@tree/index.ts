#!/usr/bin/env ts-node

import { eqString } from 'fp-ts/lib/Eq';
import { make, drawTree, elem } from 'fp-ts/lib/Tree';

const fa = make('a', [make('b'), make('c'), make('d', [make('e'), make('f')])]);

const el = elem(eqString)('a', fa);

console.log(drawTree(fa));
console.log(el);
