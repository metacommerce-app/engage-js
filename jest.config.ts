import type { Config } from '@jest/types';
import { defaults as tsjPreset } from 'ts-jest/presets';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  ...defaults,
  name: 'metacommerce-data',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/configs/tsconfig.test.json',
    },
  },
  roots: ['<rootDir>/src'],
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testTimeout: 15000,
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};

export default config;
