module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage'
};
