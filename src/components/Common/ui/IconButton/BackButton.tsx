import React from 'react';
import { IconButton } from 'react-native-paper';
import defaultColors from '../../../../styles/colors';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { useTheme } from '../../../../hooks/useTheme';
import { Fontisto } from '@expo/vector-icons';

interface BackButtonProps {
  onBack: () => void;
  name?: IconSource;
}
export const BackButton = ({ onBack, name }: BackButtonProps) => {
  const { styles: { backButtonStyles }, colors } = useTheme()
  return (
    <TouchableOpacity style={backButtonStyles.container} onPress={onBack}>
      <Fontisto name='angle-left' size={20} style={{ shadowColor: 'red' }} />
    </TouchableOpacity>
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
