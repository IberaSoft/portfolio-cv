import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import path from 'path';

const projectRoot = process.cwd();

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      // Next.js build output
      path.join(projectRoot, '.next/**/*'),
      path.join(projectRoot, 'out/**/*'),
      
      // Dependencies
      path.join(projectRoot, 'node_modules/**/*'),
      
      // Build artifacts
      path.join(projectRoot, 'dist/**/*'),
      path.join(projectRoot, 'build/**/*'),
      path.join(projectRoot, 'coverage/**/*'),
      
      // Minified files
      path.join(projectRoot, '**/*.min.js'),
      path.join(projectRoot, '**/*.bundle.js')
    ],
    languageOptions: {
      globals: {
        // Browser globals
        ...globals.browser,
        self: true,
        window: true,
        document: true,
        localStorage: true,
        sessionStorage: true,
        
        // Node.js globals
        ...globals.node,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true,
        
        // Next.js specific globals
        _N_E: true,
        
        // Common web APIs
        URL: true,
        URLSearchParams: true,
        FormData: true,
        FileReader: true,
        Blob: true,
        TextEncoder: true,
        TextDecoder: true,
        fetch: true,
        XMLHttpRequest: true,
        
        // Timing functions
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        requestAnimationFrame: true,
        cancelAnimationFrame: true,
        
        // Console and debugging
        console: true,
        
        // Webpack specific
        __webpack_exports__: true,
        __webpack_require__: true,
        __unused_webpack_module: true,
        
        // Runtime environments
        Bun: true,
        Deno: true,
        
        // Common variables
        module: true,
        exports: true,
        require: true,
        
        // TypeScript helpers
        t: true,
        e: true
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Disable rules that TypeScript handles
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-redeclare': 'off',
      
      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['warn', {
        varsIgnorePattern: '^_|^(module|__webpack_.*|t|e)$',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        caughtErrors: 'none'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      
      // Disable problematic rules for Next.js
      'no-prototype-builtins': 'off',
      'no-fallthrough': 'warn',
      'no-empty': 'off',
      'no-sparse-arrays': 'warn',
      'no-cond-assign': ['error', 'except-parens'],
      'no-control-regex': 'off',
      'no-self-assign': 'off'
    },
  }
);
