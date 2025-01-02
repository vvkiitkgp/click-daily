import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import Button from "../ui/Button"
import defaultColors from '../../../styles/colors';
import { Colors, useTheme } from '../../../hooks/useTheme';
import { ActionButton } from '../ui/ActionButton';



interface ActionBarProps {
    onPrimaryClick: () => void;
    onSecondaryClick?: () => void;
    primaryText: string;
    secondaryText?: string

}
export const ActionBar = (props: ActionBarProps) => {
    const { onPrimaryClick,
        onSecondaryClick,
        primaryText,
        secondaryText } = props;
    const { colors } = useTheme();
    const styles = getStyles(colors)


    return <View style={styles.actionBarContainer}>
        {secondaryText && onSecondaryClick &&
            <ActionButton variant='secondary' label={secondaryText} onPress={onSecondaryClick} />
        }
        <ActionButton variant='primary' label={primaryText} onPress={onPrimaryClick} />
    </View>

}

const getStyles = (colors: Colors) => StyleSheet.create({
    actionBarContainer: {
        flex: 1,
        backgroundColor: colors.containerBackground,
        height: 100,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15
    }
})