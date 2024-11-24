import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Dropdown as ReactNativeDropdown } from 'react-native-element-dropdown';

interface DropdownProps {
  items: { label: string; value: string }[];
  value: string;
  setValue: (p: string) => void;
  dropdownStyle?: any;
  placeholder: string;
}

export const Dropdown = ({
  items,
  value,
  setValue,
  dropdownStyle,
  placeholder,
}: DropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <ReactNativeDropdown
      search
      data={items}
      maxHeight={300}
      labelField="label"
      valueField="value"
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      style={[
        { ...styles.dropdown, ...dropdownStyle },
        isFocus && { borderColor: 'white' },
      ]}
      placeholder={placeholder}
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
    width: '100%',
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
