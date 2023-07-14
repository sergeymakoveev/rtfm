import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
	preset: 'ts-jest',
	moduleNameMapper: {
		'\\.(css)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/scripts/setupTests.ts'],
};
export default config;
