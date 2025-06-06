import React from 'react';

import { default as Editor, type OnMount, type OnValidate } from '@monaco-editor/react';
import { languages } from 'monaco-editor';

import json from './src.monaco-json-editor.json';
import schema from './src.schema.json';

import './App.css';

const EDITOR_THEME = 'vs-dark' as const;
const EDITOR_INDENT_SPACES = 4 as const;
const EDITOR_HIGHLIGHT_LANGUAGE = 'json';
const text = JSON.stringify(json, null, EDITOR_INDENT_SPACES);

const MODE_CONFIGURATION: languages.json.ModeConfiguration = {
	colors: true,
	diagnostics: true,
	documentFormattingEdits: true,
	documentRangeFormattingEdits: true,
	foldingRanges: true,
};

const DIAGNOSTICS_OPTIONS: languages.json.DiagnosticsOptions = {
	validate: true,
	// schemaValidation: 'error',
	schemas: [
		{
			uri: 'page-schema', // id of the first schema
			fileMatch: ['*'], // associate with our model
			schema,
		},
		// {
		// 	uri: 'http://myserver/foo-schema.json', // id of the first schema
		// 	fileMatch: ['*'], // associate with our model
		// 	schema: {
		// 		type: 'object',
		// 		properties: {
		// 			blocks: {
		// 				type: ''
		// 				$ref: '#/definitions/bar1-schema', // reference the second schema
		// 			},
		// 			p1: {
		// 				enum: ['v1', 'v2'],
		// 			},
		// 			p2: {
		// 				$ref: 'http://myserver/bar-schema.json', // reference the second schema
		// 			},
		// 			p3: {
		// 				$ref: '#/definitions/bar1-schema',
		// 			},
		// 		},
		// 		required: ['p1'],
		// 		definitions: {
		// 			'bar1-schema': {
		// 				type: 'object',
		// 				properties: {
		// 					a: {
		// 						enum: ['a', 'aa'],
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// },
		// {
		// 	uri: 'http://myserver/bar-schema.json', // id of the first schema
		// 	schema: {
		// 		type: 'object',
		// 		properties: {
		// 			q1: {
		// 				enum: ['x1', 'x2'],
		// 			},
		// 		},
		// 	},
		// },
	],
};

export const App: React.FC = () => {
	// const [count, setCount] = React.useState(0);

	// const monaco = useMonaco();

	const handleMount: OnMount = (_editor, monaco) => {
		console.log('## handleMount', { monaco });
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions(DIAGNOSTICS_OPTIONS);
		monaco.languages.json.jsonDefaults.setModeConfiguration(MODE_CONFIGURATION);
	};

	const handleValidate: OnValidate = markers => {
		console.log('## handleValidate', { markers });
	};

	// React.useEffect(() => {
	// 	console.log('## effect', { monaco });

	// 	monaco?.languages.json.jsonDefaults.setDiagnosticsOptions(DIAGNOSTICS_OPTIONS);
	// }, [monaco]);

	return (
		<Editor
			onMount={handleMount}
			onValidate={handleValidate}
			defaultLanguage={EDITOR_HIGHLIGHT_LANGUAGE}
			theme={EDITOR_THEME}
			value={text}
			options={{
				automaticLayout: true,
				language: 'json',
			}}
		/>
	);
};
