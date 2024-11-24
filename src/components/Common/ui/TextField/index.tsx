import { Fontisto } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import defaultColors from '../../../../styles/colors';

interface TextFieldProps {
  value: string;
  onChange: (p: string) => void;
  placeholder: string;
  textFieldStyles?: any;
}

export const TextField = ({
  value,
  onChange,
  placeholder,
  textFieldStyles,
  ...props
}: TextFieldProps) => {
  return (
    <Input
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      inputStyle={{ ...styles.input, ...textFieldStyles }}
      rightIcon={
        <Fontisto
          name="close"
          size={18}
          color={'white'}
          onPress={() => onChange('')}
        />
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50, // Adjust this value as needed
    fontSize: 25,
    color: defaultColors.textColorPrimary,
  },
});

export default TextField;
