import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
// import Constants from 'expo-constants';

export default function App() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://mavenow.com:8001/pageContent?StudentDashboard&token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NDIxMzE2Nn0.ASnHQya29LrSAqN6ff2DCam56LZRA_71X2oM6JUyJM8"' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
   
  },
});
