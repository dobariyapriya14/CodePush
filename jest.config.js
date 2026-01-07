module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@revopush/react-native-code-push)/)',
  ],
  setupFiles: ['./jest.setup.js'], // if you have one
};