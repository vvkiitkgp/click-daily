import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import defaultColors from '../../../styles/colors';
import { Image } from 'expo-image';
import { FullLogo } from '../../../logos/FullLogo';

const WelcomeScreen = ({
  onAnimationComplete,
}: {
  onAnimationComplete: () => void;
}) => {
  const fadeAnim = new Animated.Value(1); // Initial opacity value
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade to full opacity
      duration: 3000, // Duration in ms
      useNativeDriver: true,
    }).start(() => {
      // Call callback after animation finishes
      onAnimationComplete();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FullLogo color={defaultColors.primary} style={{
          width: '100%',
          aspectRatio: 1,
          height: undefined,
        }} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultColors.backgroundDark,
  },
  text: {
    fontSize: 32,
    color: defaultColors.primary,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
