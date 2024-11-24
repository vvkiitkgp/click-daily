import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface SkeletonLoaderProps {
  width: number | string;
  height: number | string;
  borderRadius: number | string;
  style: any;
}

const SkeletonLoader = ({
  width,
  height,
  borderRadius,
  style,
}: SkeletonLoaderProps) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmer]);

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, opacity: shimmerOpacity },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0', // Default background for skeleton
  },
});

export default SkeletonLoader;
