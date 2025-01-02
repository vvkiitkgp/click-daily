import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import defaultColors from '../../../styles/colors';
import { Image } from 'expo-image';

const WelcomeScreen = ({
  onAnimationComplete,
}: {
  onAnimationComplete: () => void;
}) => {
  const fadeAnim = new Animated.Value(0); // Initial opacity value

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to full opacity
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
          width: 300,
          height: 60,
          backgroundColor: 'none',
        }}
      >
        <Image
          source={require('../../../../assets/images/Logo.png')}
          style={{ flex: 1, width: '100%', height: '100%' }}
          contentFit="contain"
          cachePolicy="memory-disk"
          transition={500}
        />
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
