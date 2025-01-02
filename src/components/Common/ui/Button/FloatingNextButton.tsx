import React from 'react';
import { IconButton } from 'react-native-paper';
import defaultColors from '../../../../styles/colors';
import { StyleSheet, Text, View } from 'react-native';

interface BackButtonProps {
    onNext: () => void;
}
export const FloatingNextButton = ({ onNext }: BackButtonProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Next</Text>
            <IconButton
                icon="arrow-right"
                size={24}
                onPress={onNext}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        right: 20,
        zIndex: 999,
    },
    text: {
        fontSize: 16,
        marginRight: 4, // Space between text and the icon
    },
});
