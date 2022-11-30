module.exports = {
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
}
