import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';


export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  {
    rules: {
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      'semi': ['error', 'always']
    }
  }
]);
