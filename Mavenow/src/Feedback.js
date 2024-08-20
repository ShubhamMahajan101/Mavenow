import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet ,Text} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    
    <WebView
      style={styles.container}
      source={{ uri: 'https://tawk.to/chat/602650c2918aa261273e3d65/1euaqmub1'}}
    />
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

