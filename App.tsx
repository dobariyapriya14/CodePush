/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CodePush from '@revopush/react-native-code-push';
import RNRestart from 'react-native-restart';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#fff',
  };

  React.useEffect(() => {
    CodePush.allowRestart();
  }, []);

  const checkUpdate = async () => {
    try {
      const update = await CodePush.checkForUpdate();
      if (update) {
        Alert.alert('Update available', `New version: ${update.appVersion}\n${update.description || ''}`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Install Now', onPress: () => CodePush.sync({ installMode: CodePush.InstallMode.IMMEDIATE }) }
        ]);
      } else {
        Alert.alert('No update', 'The app is up to date.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check for updates.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
        style={backgroundStyle}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: isDarkMode ? 'white' : 'black' }]}>
            Welcome to CodePush!!!
          </Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? 'white' : 'black' }]}>
            Your app is running successfully.
          </Text>
          <TouchableOpacity onPress={checkUpdate} style={styles.button}>
            <Text style={styles.buttonText}>Check for New Updates</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={onRestart} style={[styles.button, { marginTop: 20, backgroundColor: 'green' }]}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);
