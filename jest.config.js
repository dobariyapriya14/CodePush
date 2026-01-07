module.exports = {
  preset: 'react-native',

  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@revopush/react-native-code-push' +
      ')/)',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
