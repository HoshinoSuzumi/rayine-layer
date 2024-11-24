// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: ['./playground', './docs'],
  },
}).overrideRules({
  '@typescript-eslint/no-unused-expressions': [
    'error',
    { allowShortCircuit: true },
  ],
  'vue/multi-word-component-names': 'off',
  'vue/max-attributes-per-line': ['error', { singleline: 5 }],
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/no-unsafe-function-type': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  'regexp/no-super-linear-backtracking': 'off',
})
