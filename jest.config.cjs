const { defaults } = require('jest-config');

module.exports = {
  clearMocks: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  verbose: true,
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node'
};