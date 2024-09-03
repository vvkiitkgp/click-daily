import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Picture } from '../../../types';
import defaultColors from '../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';

interface Props {
  size: number;
  pictureData: Picture;
  onPress: (pictureData: Picture) => void;
}
export const PictureInGrid = ({ size, pictureData, onPress }: Props) => {
  const getSkin = () => {
    return (
      <View style={{ ...styles.contentSkin, height: size, width: size }}>
        <View
          style={{
            width: size,
            backgroundColor: defaultColors.backgroundDark,
            height: 30,
            opacity: 0.6,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={styles.dayCount}>{`DAY ${pictureData.day}`}</Text>
          <View style={{ ...styles.streakContainer, width: size / 2 }}>
            <Text style={styles.streakCount}> {pictureData.streak}</Text>
            <Fontisto name="fire" size={17} color={'white'} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.mainContainer,
        height: size,
        width: size,
        borderWidth: 1,
      }}
      onPress={() => onPress(pictureData)}
    >
      <Image
        source={require('../../../../assets/images/mirrorSelfieMock.jpeg')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      {getSkin()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: defaultColors.backgroundDark,
    display: 'flex',
  },
  imageStyle: {
    zIndex: 1,
  },
  contentSkin: {
    zIndex: 2,
    position: 'absolute',
  },
  dayCount: {
    fontSize: 15,
    color: defaultColors.textColorDefault,
    marginRight: 20,
    textAlign: 'left',
  },
  streakContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 5,
  },
  streakCount: {
    fontSize: 15,
    color: defaultColors.textColorDefault,
    marginRight: 5,
  },
});

export default PictureInGrid;
