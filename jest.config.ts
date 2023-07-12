import type { Config } from '@jest/types';
import { defaults as tsjPreset } from 'ts-jest/presets';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  ...defaults,
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  globalSetup: '<rootDir>/src/lib/tests/globalSetup.ts',
  globalTeardown: '<rootDir>/src/lib/tests/globalTeardown.ts',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testTimeout: 15000,
  transform: {
    ...(tsjPreset.transform as any),
  },
  modulePaths: ['<rootDir>/node_modules/', '<rootDir>/src/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};

export default config;
