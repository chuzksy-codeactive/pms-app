module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!server/dist/**',
    '!server/index.js',
    '!server/src/validators/**',
    '!server/src/routes/**',
    '!server/src/index.js',
    '!server/models/**',
    '!coverage/**',
    '!jest.config.js'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
};