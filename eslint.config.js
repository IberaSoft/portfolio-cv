import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// Ignore configuration
const ignoreConfig = {
  ignores: [
    // Build outputs and dependencies
    '.next',
    '.next/**/*',
    'lib',
    'lib/**/*',
    'out',
    'out/**/*',
    'dist',
    'dist/**/*',
    'build',
    'build/**/*',
    'node_modules',
    'node_modules/**/*',
    'coverage',
    'coverage/**/*',

    // Tool and config directories
    '.husky',
    '.husky/**/*',
    '.vercel',
    '.vercel/**/*',
    '.demo',
    '.demo/**/*',
    '.renderer',
    '.renderer/**/*',

    // Generated and minified files
    '**/*.min.js',
    '**/*.bundle.js',
    '**/*.generated.*',
    '**/*.d.ts'
  ]
}

// Files to lint
const filesConfig = {
  files: ['**/*.{js,jsx,ts,tsx}']
}

export default tseslint.config(
  ignoreConfig,
  filesConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
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
          jsx: true
        }
      }
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_|^(module|__webpack_.*|t|e)$',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          caughtErrors: 'none'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      // Disable rules that TypeScript handles
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-redeclare': 'off',

      // Next.js and React specific rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',

      // General rules
      'no-prototype-builtins': 'off',
      'no-fallthrough': 'warn',
      'no-empty': 'warn',
      'no-sparse-arrays': 'warn',
      'no-cond-assign': ['error', 'except-parens'],
      'no-control-regex': 'off',
      'no-self-assign': 'off',
      'prefer-const': 'warn',
      'no-var': 'warn',
      eqeqeq: ['warn', 'smart'],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
)
