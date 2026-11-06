import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,ts}'],
		extends: [
			js.configs.recommended, 
			tseslint.configs.recommended, 
		],
	},
	eslintConfigPrettier,
]);
