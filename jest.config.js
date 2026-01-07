module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@revopush/react-native-code-push|react-native|@react-native)/)',
  ],
};
