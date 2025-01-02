import React, { useState } from 'react';
import { Text, View } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Dropdown as ReactNativeDropdown } from 'react-native-element-dropdown';
import { useTheme } from '../../../../hooks/useTheme';

interface DropdownProps {
  items: { label: string; value: string }[];
  value?: string;
  setValue: (p: string) => void;
  placeholder: string;
  search?: boolean;
  label: string;
}

export const Dropdown = ({
  items,
  value,
  setValue,
  placeholder,
  search = false,
  label,
}: DropdownProps) => {
  const [containerHeight, setContainerHeight] = useState(150); // Default height for the container

  // Update container height when dropdown is opened
  const handleFocus = () => {
    // Assume each item has a height of 40
    const itemHeight = 40;
    const calculatedHeight = Math.min(items.length * itemHeight, 300); // Maximum height of 300
    setContainerHeight(66 + calculatedHeight); // Add extra space for the header

  };

  const handleBlur = () => {
    setContainerHeight(66); // Reset to default height when dropdown closes
  };
  // const [isFocus, setIsFocus] = useState(false);
  const { styles: { dropdownStyles }, colors } = useTheme()
  return (
    <View style={[dropdownStyles.container, { height: containerHeight }]}>
      <View style={dropdownStyles.headingContainer}>
        <Text style={dropdownStyles.headingText} >{label}</Text>
      </View>
      <ReactNativeDropdown
        search={search}
        data={items}
        maxHeight={300}
        labelField="label"
        valueField="value"
        mode='modal'
        onChange={(item) => {
          setValue(item.value);
          // setIsFocus(false);
        }}

        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          { ...dropdownStyles.dropdownContainer },
          // isFocus && { borderColor: 'white' },
        ]}
        placeholder={placeholder}
        placeholderStyle={dropdownStyles.placeholderStyle}
        selectedTextStyle={dropdownStyles.selectedTextStyle}
        inputSearchStyle={dropdownStyles.inputSearchStyle}
        containerStyle={{ backgroundColor: colors.containerBackground, borderColor: colors.solidBorder, borderWidth: 1, borderBottomWidth: 5, borderRadius: 8, borderBottomColor: colors.defaultActionShadow, overflow: 'hidden', padding: 5 }}
        itemContainerStyle={{ backgroundColor: colors.containerBackground, borderRadius: 8 }}
        itemTextStyle={{ color: colors.defaultText }}
        value={value}
        activeColor={defaultColors.primary}
        searchPlaceholder="Search..."
      />
    </View>
  );
};

export default Dropdown;


