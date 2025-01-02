import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Colors, useTheme } from '../../../../hooks/useTheme';
import { Fontisto } from '@expo/vector-icons';

interface CountProps {
  count: number;
  onCountChange: (n: number) => void;
  size: number;
}

// Count can also accept negative numbers, it's all about user's perspective
const Count = ({ count, onCountChange, size }: CountProps) => {
  const { colors } = useTheme();
  const styles = getStyles(size, colors)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onCountChange(count - 1)}
        style={styles.button}
      >
        {/* <Text style={styles.text}>-</Text> */}
        <Fontisto name='minus-a' size={16} color={colors.containerBackground} />
      </TouchableOpacity>
      <View style={styles.count}>
        <Text
          style={{
            ...styles.text,
            color: colors.defaultText,
            fontSize: size / 1.2,
            marginRight: 2,
            marginLeft: 2,
          }}
        >
          {count}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onCountChange(count + 1)}
        style={styles.button}
      >
        {/* <Text style={styles.text}>+</Text> */}
        <Fontisto name='plus-a' size={16} color={colors.containerBackground} />

      </TouchableOpacity>
    </View>
  );
};

const getStyles = (size: number, colors: Colors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: size,
      minWidth: size * 3,
    },
    button: {
      backgroundColor: colors.defaultAction,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: size,
      borderRadius: size / 5,
      width: size,
    },
    text: {
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      fontSize: size / 0.8,
      color: colors.secondaryText
    },
    count: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: size,
      minWidth: size,
    },
  });
export default Count;
