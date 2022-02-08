module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    '@typescript-eslint/no-explicit-any': 'off',
    "brace-style": ["error", "1tbs"],
    "curly": ["error", "all"],
    "indent": "off",
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "ignoredNodes": [
          "TemplateLiteral > *",
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
        ],
      },
    ],
    'no-tabs': 2,
    'space-before-blocks': ['error'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-inferrable-types': 'off',
    'quotes': ['error', 'single'],
    "semi": "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": ["error"],
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error", "always"],
    "no-trailing-spaces": ["error"],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    '@typescript-eslint/camelcase': 'off',
    "no-multi-spaces": ["error"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "import/order": ["error", { "groups": ["builtin", "external", "internal", "parent", "sibling", "index"] }],
    "key-spacing": ["error"],
    "keyword-spacing": ["error"],
    "require-await": ["error"],
    "no-return-await": ["error"],
    "@typescript-eslint/ban-types": ["error",
      {
        "types": {
          "Function": false,
        },
        "extendDefaults": true
      }
    ]
  },
  "overrides": [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": ["warn"],
        "@typescript-eslint/explicit-module-boundary-types": ["warn"]
      }
    }
  ],
  settings: {
    "import/resolver": {
      typescript: {}
    },
  }
};
