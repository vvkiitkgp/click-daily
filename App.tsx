import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
import React, { useState } from 'react';
import WelcomeScreen from './src/components/Screens/WelcomeScreen';
enableScreens();


export default function App() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  const handleAnimationComplete = () => {
    setIsWelcomeVisible(false);
  };

  if (isWelcomeVisible) {
    return <WelcomeScreen onAnimationComplete={handleAnimationComplete} />;
  }
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
