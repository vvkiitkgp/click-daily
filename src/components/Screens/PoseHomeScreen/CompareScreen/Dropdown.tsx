import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Dropdown as ReactNativeDropdown } from 'react-native-element-dropdown';

interface DropdownProps {
  data: { label: string; value: string }[];
  value: string;
  setValue: (p: string) => void;
}

export const Dropdown = ({ data, value, setValue }: DropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <ReactNativeDropdown
      search
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      containerStyle={{ backgroundColor: defaultColors.backgroundDark }}
      itemContainerStyle={{ backgroundColor: defaultColors.backgroundDark }}
      itemTextStyle={{ color: defaultColors.textColorDefault }}
      value={value}
      activeColor={defaultColors.primary}
      searchPlaceholder="Search..."
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: defaultColors.borderPrimary,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '30%',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: defaultColors.backgroundDark,
    borderRadius: 5,
    color: defaultColors.textColorDefault,
    backgroundColor: defaultColors.backgroundDark,
  },
  placeholderStyle: {
    fontSize: 16,
    color: defaultColors.textColorDefault,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: defaultColors.textColorPrimary,
  },
});
