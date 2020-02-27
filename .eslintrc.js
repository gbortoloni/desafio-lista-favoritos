module.exports = {
    env: {
        es6: true,
        node: true,
        'jest/globals': true,
    },
    extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended'],
    plugins: ['prettier', 'jest'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
        'func-names': ['error', 'never'],
    },
};
