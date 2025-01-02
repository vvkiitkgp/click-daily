import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../../../hooks/useTheme';


export const Divider = ({ overrideStyles }: { overrideStyles?: ViewStyle }) => {

    const { colors } = useTheme();
    return <View style={{ height: 1, width: '100%', backgroundColor: colors.divider, ...overrideStyles }} />
}


export default Divider;



