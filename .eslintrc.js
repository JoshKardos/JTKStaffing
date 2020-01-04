module.exports = {
  env: {
    browser: true,
    es6: true,
    jasmine: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  parser: 'babel-eslint',
  rules: {
    "react/jsx-one-expression-per-line": "off",
    "react/forbid-prop-types": "off",
    "max-len": "off",
    "react/jsx-props-no-spreading": "off",
    "object-curly-newline": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-shadow": "off",
    "react/jsx-wrap-multilines": "off",
    "operator-linebreak": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "no-console": "off",
    "comma-dangle": "off",
    "no-param-reassign": "off",
    "arrow-parens": "off",
    "react/prefer-stateless-function": "off",
    "semi": "off",
    "no-use-before-define": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
};
