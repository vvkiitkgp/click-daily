import React, { useState } from 'react'
import { StyleSheet, View } from "react-native"
import { Colors, useTheme } from "../../../../../hooks/useTheme"
import { Image } from 'expo-image';


export const PhotoCard = ({ photoUrl }: { photoUrl: string | null }) => {
    const { colors } = useTheme()
    const styles = getStyles(colors)
    const [loading, setLoading] = useState(false)
    return <View style={styles.container}>
        <Image
            source={{ uri: photoUrl }}
            style={{ width: 240, height: 300 }}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={1000}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
        />
    </View>
}

const getStyles = (colors: Colors) => StyleSheet.create({
    container: {
        height: 312,
        width: 252,
        backgroundColor: colors.containerBackground,
        borderColor: colors.solidBorder,
        borderWidth: 1,
        borderBottomWidth: 5,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {}
})