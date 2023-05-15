module.exports = {
  root: true,
  extends: [
    'plugin:tailwindcss/recommended',
    '@rocketseat/eslint-config/react',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
}
