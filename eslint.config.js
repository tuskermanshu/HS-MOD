import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'n/prefer-global/process': ['error', 'always'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
  },
})
