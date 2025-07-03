#!/usr/bin/env tsx

import path from 'path';
import { fileURLToPath } from 'url';

import ts from 'typescript'; // get the name of the directory

import { TYPES } from './type-printer.config';

type TypeWithSuggest<T extends string | number | symbol, Suggest extends T> = Suggest | Omit<T, Suggest>;

const skippedAliases = ['JSONArray', 'JSONObject'] as const;

type SkippedAliasName = typeof skippedAliases[number];

type AliasName = TypeWithSuggest<string, SkippedAliasName>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename);

function extractTypeSignature(filename: string, aliasNames: AliasName[]): string {
	const program: ts.Program = ts.createProgram([filename], {
		emitDeclarationOnly: true,
	});
	const sourceFile: ts.SourceFile | undefined = program.getSourceFile(filename);

	if (!sourceFile) {
		throw new Error(`Source file: '${filename}' not found`);
	}

	const typeChecker: ts.TypeChecker = program.getTypeChecker();

	return aliasNames
		.map(aliasName => {
			// Get the declaration node you're looking for by it's type name.
			// This condition can be adjusted to your needs

			console.log('## Processed', { aliasName });

			const isSkipped = skippedAliases.includes(aliasName as SkippedAliasName);

			const statement: ts.Statement | undefined = sourceFile.statements.find(
				s => ts.isTypeAliasDeclaration(s) && s.name.text === aliasName,
			);

			if (!statement) {
				throw new Error(`Type: '${aliasName}' not found in file: '${filename}'`);
			}

			const type: ts.Type = typeChecker.getTypeAtLocation(statement);
			let stringifiedType: string;

			const getTypeSignature = (type: ts.Type) => {
				const fields: string[] = [];
				const props = type.getProperties();

				// Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
				for (const prop of props) {
					const name: string = prop.getName();
					const propType: ts.Type = typeChecker.getTypeOfSymbolAtLocation(prop, statement);
					const propTypeName: string = typeChecker.typeToString(
						propType,
						undefined,
						ts.TypeFormatFlags.NoTruncation,
					);

					fields.push(`${name}: ${propTypeName};`);
				}

				return `{\n  ${fields.join('\n  ')}\n}`;
			};

			// const stringIndexType = type.getStringIndexType();

			if (isSkipped) {
				console.log('## Skipped, and set to "any"', { aliasName, flags: type.getFlags() });

				// if (aliasName === 'Block') {
				//     debugger;
				// }

				stringifiedType = 'any';
			} else if (type.isUnion()) {
				stringifiedType = type.types
					.map(
						/*
                    // eslint-disable-next-line no-nested-ternary
                    t => t.isStringLiteral()
                        ? `'${t.value}'`
                        : t.isLiteral()
                            ? t.value
                            : getTypeSignature(t)
                    */
						typeInUnion => {
							const propTypeName: string = typeChecker.typeToString(
								typeInUnion,
								undefined,
								ts.TypeFormatFlags.NoTruncation,
							);

							return propTypeName;
						},
					)
					.join(' | ');
				// } else if (type.getFlags() === TypeFlags.Object && stringIndexType) {
				//     console.log('## ', { aliasName });
				//     // type.aliasSymbol;
				//     stringifiedType = 'any';
			} else {
				stringifiedType = getTypeSignature(type);
			}

			return `type ${aliasName} = ${stringifiedType};`;
		})
		.join('\n\n');
}

const typeSignature = extractTypeSignature(`${__dirname}/type-printer.config.ts`, TYPES as AliasName[]);

const code = [
	'/* eslint-disable max-len */',
	'/* eslint-disable quotes */',
	'/* eslint-disable @typescript-eslint/no-explicit-any */',
	'/* eslint-disable @typescript-eslint/no-unused-vars */',
	// '// eslint-disable-next-line @typescript-eslint/ban-ts-comment',
	// '// @ts-nocheck',
	'',
	typeSignature,
	'',
].join('\n');

import('fs')
	.then(fs => {
		fs.writeFileSync(`${__dirname}/type-printer.results.ts`, code, {});

		return fs;
	})
	.catch(() => {
		console.error('Error by write result');
	});
