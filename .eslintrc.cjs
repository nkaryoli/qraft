module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'react-hooks', 'import', 'jsx-a11y'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier', // Siempre al final
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
        settings: {
        react: {
            version: 'detect',
        },
    },
        rules: {
        'react/react-in-jsx-scope': 'off', // No necesario con React 17+
        'import/order': ['warn', { 'newlines-between': 'always' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
};