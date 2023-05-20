module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.png$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
};
