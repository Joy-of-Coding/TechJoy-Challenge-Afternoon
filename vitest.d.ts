/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/matchers';

// Extend Vitest's expect type
declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T> {}
  interface AsymmetricMatchersContaining extends jest.AsymmetricMatchers {}
}
