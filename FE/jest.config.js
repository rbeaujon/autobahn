module.exports = {
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    ".+\\.(css|style|less|sass|scss)$": "jest-css-modules-transform"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  "collectCoverage": true,
  
};
