import React from 'react';
import { IconButton } from 'react-native-paper';
import defaultColors from '../../../../styles/colors';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../../hooks/useTheme';

interface BackButtonProps {
  onPress: () => void;
  name: string;
  mode?: 'contained' | 'contained-tonal' | 'outlined';
  size: number;
  style?: any;
}
export const CustomIconButton = ({
  onPress,
  name = 'arrow-left',
  size = 20,
  mode,
  style,
}: BackButtonProps) => {
  const { colors } = useTheme()
  return (
    <View style={style}>
      <IconButton
        icon={name}
        style={mode ? {} : { backgroundColor: 'none' }}
        iconColor={
          colors.defaultText
        }
        size={size}
        onPress={onPress}
        mode={mode}
      />
    </View>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  container: {},
});
