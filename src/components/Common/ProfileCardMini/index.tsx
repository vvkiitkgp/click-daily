import React from 'react';
import { StyleSheet, Text, View } from "react-native"
import { Colors, useTheme } from "../../../hooks/useTheme"
import { Image } from 'expo-image';

export const ProfileCardMini = () => {
    const { colors } = useTheme()
    const styles = getStyles(colors);
    return <View style={styles.container}>
        <View style={styles.pictureContainer}>
            <Image source={require('../../../../assets/images/ProfilePictureDoodleIcon.png')} style={{ width: 60, height: 60 }} />

        </View>
        <View style={styles.contentContainer}>
            <Text style={styles.nameStyles}>Johnny Bravo</Text>
            <Text style={styles.messageStyles}>Enjoying! one day at a time</Text>
        </View>
    </View>
}

const getStyles = (colors: Colors) => StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    pictureContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    contentContainer: {
        height: '100%',
        padding: 10,
        paddingVertical: 5,
        gap: 5
    },
    nameStyles: {
        fontSize: 20,
        fontWeight: '600',
    },
    messageStyles: {
        fontSize: 14
    }
})

export default ProfileCardMini