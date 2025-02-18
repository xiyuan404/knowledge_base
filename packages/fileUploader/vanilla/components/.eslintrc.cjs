module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    "eslint: recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explict-any': 'error',
    '@typescript-eslint/consistent-type-imports': 'error'
  }
}