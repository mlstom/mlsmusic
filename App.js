import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StateContext } from './context/StateContext';
import Navigation from './StackNavigator';

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Navigation />
    </StateContext>
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
