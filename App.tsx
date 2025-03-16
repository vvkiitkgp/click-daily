import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
import React, { useState } from 'react';
import WelcomeScreen from './src/components/Screens/WelcomeScreen';
enableScreens();

import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications was denied!');
      }
    };

    requestPermissions();
  }, []);

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
