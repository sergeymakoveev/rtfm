import path from 'path';
import { fileURLToPath } from 'url';

import ts from 'typescript'; // get the name of the directory

import { TYPES } from './type-printer.config';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
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

	return aliasNames
		.map(aliasName => {
			// Get the declaration node you're looking for by it's type name.
			// This condition can be adjusted to your needs
			const statement: ts.Statement | undefined = sourceFile.statements.find(
				s => ts.isTypeAliasDeclaration(s) && s.name.text === aliasName,
			);
			if (!statement) {
				throw new Error(`Type: '${aliasName}' not found in file: '${filename}'`);
			}
			const type: ts.Type = typeChecker.getTypeAtLocation(statement);
			console.log('## ', type.getProperties());

			const props = type.getProperties();
			const fields: string[] = [];
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
			return `type ${aliasName} = {\n  ${fields.join('\n  ')}\n}`;
		})
		.join('\n\n');
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
