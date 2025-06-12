import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import StackNavigation from './Src/router/StackNavigation';

export default function App() {
  return (
  <PaperProvider styles={styles.container}>
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
