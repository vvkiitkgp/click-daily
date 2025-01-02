import React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors, useTheme } from '../../../../hooks/useTheme';

type Variant = 'primary' | 'secondary' | 'selected' | 'options' | 'default' | 'task';
interface ActionButtonProps {
    variant: Variant;
    onPress: () => void;
    label: string;
    leftIcon?: React.ReactNode;
}
export const ActionButton = ({ variant, onPress, label, leftIcon }: ActionButtonProps) => {
    const {
        styles: { actionButton: actionButtonStyles },
        colors,
    } = useTheme();


    return (
        <TouchableOpacity style={[actionButtonStyles.container, getStyles(colors, variant).container]} onPress={onPress}>
            {leftIcon ? leftIcon : null}
            <Text style={[actionButtonStyles.text, getStyles(colors, variant).text]}>{label}</Text>
        </TouchableOpacity>
    );
};

const getStyles = (colors: Colors, variant: Variant): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
        case 'primary':
            return {
                container: {
                    backgroundColor: colors.primaryAction,
                    borderBottomColor: colors.primaryActionShadow,
                },
                text: {
                    color: colors.defaultText,
                },
            };
        case 'task':
            return {
                container: {
                    backgroundColor: colors.selectedAction,
                    borderBottomColor: colors.primaryActionShadow,
                },
                text: {
                    color: colors.defaultText,
                },
            };
        case 'secondary':
            return {
                container: {
                    backgroundColor: colors.secondaryAction,
                    borderBottomColor: colors.secondaryActionShadow,
                },
                text: {
                    color: colors.defaultText,
                },
            };
        case 'selected':
            return {
                container: {
                    backgroundColor: colors.selectedAction,
                    borderBottomColor: colors.selectedActionShadow,
                    height: 28,
                    borderRadius: 8,
                },
                text: {
                    color: colors.secondaryText,
                },
            };
        case 'options':
            return {
                container: {
                    backgroundColor: colors.secondaryAction,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.secondaryActionShadow,
                    height: 28,
                    borderRadius: 8,
                },
                text: {
                    color: colors.defaultText,
                },
            };
        default:
            return {
                container: {
                    backgroundColor: colors.defaultAction,
                    borderBottomColor: colors.defaultActionShadow,
                    height: 28,
                    borderRadius: 6,
                },
                text: {
                    color: colors.secondaryText,
                    fontSize: 12
                },
            };
    }
};