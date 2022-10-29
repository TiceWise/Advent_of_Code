module.exports = {
    root: true,
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            env: { es2020: true, node: true },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
            plugins: ['@typescript-eslint'],
        },
    ],
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['*.js'],
}
