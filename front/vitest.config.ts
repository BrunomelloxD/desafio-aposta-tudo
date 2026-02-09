import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.nuxt/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'tests/**'
      ]
    },
    globals: true,
    setupFiles: ['./tests/setup.ts']
  }
})
