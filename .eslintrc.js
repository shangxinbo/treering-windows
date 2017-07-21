module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'no-implied-eval': 1,
    'no-loop-func': 1,
    'indent': ["warn", 4, { "SwitchCase": 1 }],
    'no-mixed-spaces-and-tabs': 1,
    'semi': ["error", "never"],
    'no-useless-escape':0,
    'no-console': 0,
    'no-unused-vars': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
