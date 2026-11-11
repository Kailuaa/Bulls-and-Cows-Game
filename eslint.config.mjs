import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';

export default defineConfig([
	{
		ignores: ['dist/**'],
	},
	{
		files: ['**/*.{js,mjs,ts}'],
		extends: [
			js.configs.recommended, 
			tseslint.configs.recommended, 
		],
	},
	{
		files: ['src/**/*.ts'],
		languageOptions: { 
			globals: globals.browser,
		},
	},
	{
        files: ['**/*.test.ts', '**/*.spec.ts'],
        rules: {
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
	eslintConfigPrettier,
]);
