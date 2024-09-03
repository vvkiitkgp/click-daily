import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import defaultColors from '../../../../styles/colors';

interface CountProps {
  count: number;
  onCountChange: (n: number) => void;
  size: number;
}

// Count can also accept negative numbers, it's all about user's perspective
const Count = ({ count, onCountChange, size }: CountProps) => {
  return (
    <View style={{ ...styles(size).container }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onCountChange(count - 1)}
        style={{ ...styles(size).button }}
      >
        <Text style={{ ...styles(size).text }}>-</Text>
      </TouchableOpacity>
      <View style={{ ...styles(size).count }}>
        <Text
          style={{
            ...styles(size).text,
            color: defaultColors.textColorDefault,
            fontSize: size / 1.4,
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
        style={{ ...styles(size).button }}
      >
        <Text style={{ ...styles(size).text }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (size: number) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: size,
      minWidth: size * 3,
    },
    button: {
      backgroundColor: defaultColors.buttonSecondary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: size,
      borderRadius: size / 10,
      width: size,
    },
    text: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: size / 1.2,
    },
    count: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: size,
      minWidth: size,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: defaultColors.borderSecondary,
    },
  });
export default Count;
