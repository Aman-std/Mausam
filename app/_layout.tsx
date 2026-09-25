import { Slot } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.phoneFrame, webFrameStyles]}>
        <StatusBar style="light" />
        <Slot />
      </View>
    </View>
  );
}

const webFrameStyles = Platform.select({
  web: {
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    minHeight: '100vh',
    height: '100vh',
    overflow: 'hidden',
  } as any,
  default: {},
});

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#090d16',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: '100%',
    maxWidth: 430,
    flex: 1,
    backgroundColor: '#0f172a',
  },
});
