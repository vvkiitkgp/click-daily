import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  name: string;
  primary?: boolean;
  secondary?: boolean;
  leftIcon?: string;
  width?: number;
}

export const Button = ({
  style = {},
  onPress,
  name,
  primary,
  secondary,
  leftIcon,
  width = 200,
}: ButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 2,
          minHeight: 50,
          width,
          borderRadius: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
          borderWidth: 2,
          borderColor: primary
            ? defaultColors.buttonBorderPrimary
            : secondary
            ? defaultColors.buttonBorderSecondary
            : 'black',
          backgroundColor: primary
            ? defaultColors.buttonPrimary
            : secondary
            ? defaultColors.buttonSecondary
            : 'grey',
          ...(typeof style === 'object' && style !== null ? style : {}),
        }}
        onPress={onPress}
      >
        {leftIcon && (
          <View style={{ marginRight: 5 }}>
            <Fontisto name={leftIcon ?? 'google'} size={15} />
          </View>
        )}
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Button;
