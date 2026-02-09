import { vi } from 'vitest'

// Mock global functions
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn()
}
