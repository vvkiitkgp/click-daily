import React from 'react';
import { IconButton } from 'react-native-paper';
import defaultColors from '../../../../styles/colors';
import { StyleSheet, View } from 'react-native';

interface BackButtonProps {
  onBack: () => void;
}
export const BackButton = ({ onBack }: BackButtonProps) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        iconColor={defaultColors.buttonPrimary}
        size={20}
        onPress={onBack}
        mode="contained"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 999,
  },
});
