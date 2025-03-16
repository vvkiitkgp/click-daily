import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Picture } from '../../../types';
import defaultColors from '../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';
import SkeletonLoader from '../ui/Loader/CustomSkeleton';
import { Image } from 'expo-image';
import { Colors, useTheme } from '../../../hooks/useTheme';
import Streak from '../Streak';
import * as FileSystem from "expo-file-system";


interface Props {
  size: number;
  pictureData: Picture;
  onPress: (pictureData: Picture) => void;
}
export const PictureInGrid = ({ size, pictureData, onPress }: Props) => {
  const [loading, setLoading] = useState(true);
  const { colors, styles: { defaultSolidBorder } } = useTheme();
  const styles = getStyles(colors, size)

  const [imageExists, setImageExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFileExists = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(pictureData.picture);
        console.log(fileInfo, "fileInfo")
        setImageExists(fileInfo.exists);
      } catch (error) {
        console.error("Error checking file existence:", error);
        setImageExists(false);
      }
    };

    checkFileExists();
  }, []);


  return (
    <TouchableOpacity
      style={{
        ...styles.mainContainer,
        ...defaultSolidBorder
      }}
      onPress={() => onPress(pictureData)}
    >
      {loading && (
        <SkeletonLoader
          borderRadius={10}
          height={size}
          style={{}}
          width={size}
        />
      )}
      {imageExists ? <Image
        source={{ uri: pictureData.picture }}
        style={{ width: 120, height: 150, marginBottom: 5 }}
        contentFit="contain"
        cachePolicy="memory-disk"
        transition={1000}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      /> : <View><Text>image has been deleted</Text></View>}

      <View
        style={{
          width: '100%',
          height: 30,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={styles.dayCount}>{`DAY ${pictureData.day}`}</Text>

        <Streak number={pictureData.streak} />
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: Colors, size: number) => StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.containerBackground,
    display: 'flex',
    alignItems: 'center',
    height: 200,
    width: 132,
    padding: 6

  },
  imageStyle: {
    zIndex: 1,
  },
  dayCount: {
    fontSize: 12,
    color: colors.defaultText,
    marginRight: 20,
    textAlign: 'left',
  },
});

export default PictureInGrid;
