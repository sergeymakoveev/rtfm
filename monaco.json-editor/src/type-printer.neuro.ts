#!/usr/bin/env tsx

import path from 'path';
import { fileURLToPath } from 'url';

import ts from 'typescript';

import { TYPES } from './type-printer.config';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename);

function extractTypeSignature(filename: string, aliasNames: string[]): string {
	console.log('## ', { filename, aliasNames });

	const program: ts.Program = ts.createProgram([filename], {
		emitDeclarationOnly: true,
	});
	const sourceFile: ts.SourceFile | undefined = program.getSourceFile(filename);
	if (!sourceFile) {
		throw new Error(`Source file: '${filename}' not found`);
	}
	const typeChecker: ts.TypeChecker = program.getTypeChecker();

	const typeSignatures: string[] = [];

	function getTypeSignature(type: ts.Type, aliasName: string): string {
		const props = type.getProperties();
		const fields: string[] = [];

		for (const prop of props) {
			const name: string = prop.getName();
			const propType: ts.Type = typeChecker.getTypeOfSymbolAtLocation(prop, sourceFile);
			const propTypeName: string = typeChecker.typeToString(propType, undefined, ts.TypeFormatFlags.NoTruncation);

			if (propType.isUnion()) {
				const unionTypes = propType.types.map(t => getTypeSignature(t, aliasName));
				fields.push(`${name}: ${unionTypes.join(' | ')};`);
			} else if (propType.isIntersection()) {
				const intersectionTypes = propType.types.map(t => getTypeSignature(t, aliasName));
				fields.push(`${name}: ${intersectionTypes.join(' & ')};`);
			} else {
				fields.push(`${name}: ${propTypeName};`);
			}
		}

		return `type ${aliasName} = {\n  ${fields.join('\n  ')}\n}`;
	}

	aliasNames.forEach(aliasName => {
		const statement: ts.Statement | undefined = sourceFile.statements.find(
			s => ts.isTypeAliasDeclaration(s) && s.name.text === aliasName,
		);
		if (!statement) {
			throw new Error(`Type: '${aliasName}' not found in file: '${filename}'`);
		}
		const type: ts.Type = typeChecker.getTypeAtLocation(statement);
		typeSignatures.push(getTypeSignature(type, aliasName));
	});

	return typeSignatures.join('\n\n');
}

const typeSignature = extractTypeSignature(`${__dirname}/type-printer.config.ts`, TYPES);

// write to file or console log
// console.log(typeSignature);

import('fs')
	.then(fs => {
		fs.writeFileSync(`${__dirname}/type-printer.results.ts`, typeSignature, {});
		return fs;
	})
	.catch(() => {});
