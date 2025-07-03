import React from 'react';

import { default as Editor, type OnMount, type OnValidate } from '@monaco-editor/react';
import { languages } from 'monaco-editor';

import types from '../type-printer/type-printer.results.ts?raw';
import json from '../json/src.json';
import schema from '../json-schema/src.schema.json';

import './App.css';

const EDITOR_THEME = 'vs-dark' as const;
const EDITOR_INDENT_SPACES = 4 as const;
const jsonText = JSON.stringify(json, null, EDITOR_INDENT_SPACES);

// const MODE_CONFIGURATION: languages.json.ModeConfiguration = {
// 	colors: true,
// 	diagnostics: true,
// 	documentFormattingEdits: true,
// 	documentRangeFormattingEdits: true,
// 	foldingRanges: true,
// };

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

const getHandleValidate =
	(name: string): OnValidate =>
	markers => {
		console.log(`## (${name}) handleValidate: `, { markers });
	};

const handleJsonValidate = getHandleValidate('json');
const handleTsValidate = getHandleValidate('ts');

/*
const TS_COMPILER_OPTIONS: languages.typescript.CompilerOptions = {
	target: languages.typescript.ScriptTarget.ES2020,
	allowNonTsExtensions: true,
	// moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
	// module: languages.typescript.ModuleKind.ESNext,
	// noEmit: true,
	// typeRoots: ['node_modules/@types'],
	// types: ['my-lib'] // <=== NOTE THIS
};
*/

export const App: React.FC = () => {
	// const monaco = useMonaco();

	const handleJsonEditorMount: OnMount = (_editor, monaco) => {
		console.log('## handleMount', { monaco });
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions(DIAGNOSTICS_OPTIONS);
	};

	console.log('## ', { types });

	const handleTsEditorMount: OnMount = (_editor, monaco) => {
		monaco.languages.typescript.typescriptDefaults.addExtraLib(types);
		// monaco.languages.typescript.typescriptDefaults.setCompilerOptions(TS_COMPILER_OPTIONS);
		// const compilerOptions = monaco.languages.typescript.typescriptDefaults.getCompilerOptions();
		// console.log('## handleMount', { monaco, compilerOptions });
	};

	// React.useEffect(() => {
	// 	console.log('## effect', { monaco });

	// 	monaco?.languages.json.jsonDefaults.setDiagnosticsOptions(DIAGNOSTICS_OPTIONS);
	// }, [monaco]);

	const typescriptText = `(${jsonText} satisfies Page );`;

	return (
		<div style={{ display: 'flex', height: '100%', width: '100%' }}>
			<Editor
				onMount={handleJsonEditorMount}
				onValidate={handleJsonValidate}
				defaultLanguage="json"
				theme={EDITOR_THEME}
				value={jsonText}
				options={{
					automaticLayout: true,
					language: 'json',
				}}
			/>
			<Editor
				onMount={handleTsEditorMount}
				onValidate={handleTsValidate}
				defaultLanguage="typescript"
				theme={EDITOR_THEME}
				value={typescriptText}
				options={{
					automaticLayout: true,
					language: 'typescript',
				}}
			/>
		</div>
	);
};
