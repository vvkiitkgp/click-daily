import React from 'react';
import { View, ViewStyle, Text } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Fontisto } from '@expo/vector-icons';


export const Streak = ({ overrideStyles, number }: { number: number, overrideStyles?: ViewStyle, }) => {

    const { colors } = useTheme();
    return <View
        style={{
            display: 'flex',
            width: 31,
            height: 24,
            backgroundColor: colors.streakBackground,
            borderRadius: 100,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            ...overrideStyles
        }}
    >
        <Text
            style={{
                color: colors.defaultText,
                fontSize: 12,
                marginRight: 2,
            }}
        >
            {number}
        </Text>
        <Fontisto name="fire" size={12} color={'#FB7D00'} />
    </View>
}


export default Streak;



