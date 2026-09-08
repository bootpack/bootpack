import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'playwright-report/**', 'test-results/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: { globals: globals.node },
    rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] }
  },
  { files: ['src/js/**/*.js'], languageOptions: { globals: globals.browser, sourceType: 'module' } },
  { files: ['test/browser/**/*.js'], languageOptions: { globals: globals.browser } }
];
