import { Fontisto } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import defaultColors from '../../../../styles/colors';
import { useTheme } from '../../../../hooks/useTheme';
import { color } from 'react-native-elements/dist/helpers';

interface TextFieldProps {
  value: string;
  onChange: (p: string) => void;
  placeholder: string;
  label: string;
}

export const TextField = ({
  value,
  onChange,
  placeholder,
  label,
  ...props
}: TextFieldProps) => {
  const { styles: { textField: textFieldStyles } } = useTheme()
  return (
    <View style={textFieldStyles.container}>
      <View style={textFieldStyles.headingContainer}>
        <Text style={textFieldStyles.headingText}>{label}</Text>
      </View>
      <View>
        <Input
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          inputContainerStyle={textFieldStyles.textFieldContainer}
          inputStyle={textFieldStyles.text}
          placeholderTextColor={textFieldStyles.placeholderText.color}
          rightIcon={
            <Fontisto
              name="close"
              size={18}
              color={textFieldStyles.clearIcon.backgroundColor}
              onPress={() => onChange('')}
            />
          }
          {...props}
        />
      </View>
    </View >
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
