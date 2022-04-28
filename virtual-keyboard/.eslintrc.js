module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': [
      'error',
      'WithStatement',
      "BinaryExpression[operator='in']",
    ],
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    // 'import/extensions': ['never'],
  },
};
