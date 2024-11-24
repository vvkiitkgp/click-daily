import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import defaultColors from '../../../../styles/colors';

export const Loader = () => {
  return <ActivityIndicator size="large" color={defaultColors.primary} />;
};

export default Loader;
