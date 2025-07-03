#!/usr/bin/env tsx

import Ajv from 'ajv';

import data from '../json/src.json';

import schema from './src.schema.json';

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

// const data = {
// 	foo: 1,
// 	bar: 'abc',
// };

// const schema = {
// 	type: 'object',
// 	properties: {
// 		foo: { type: 'integer' },
// 		bar: { type: 'string' },
// 	},
// 	required: ['foo'],
// 	additionalProperties: false,
// };

const validate = ajv.compile(schema);

const valid = validate(data);
if (!valid) {
	console.log(validate.errors);
}
