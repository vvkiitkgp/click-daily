import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Svg, Path as SVGPath } from 'react-native-svg';
import { Picture, Pose } from '../../../../types';
import defaultColors from '../../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';

import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;
interface Props {
  pose: Pose;
  pictureData: Picture;
  withPose: boolean;
}

export const ViewPhotoScreen = ({ pose, pictureData, withPose }: Props) => {
  return (
    <View style={styles.container}>
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        captureEvent={true}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          marginTop: 30,
        }}
      >
        <View style={{ width: screenWidth, height: '100%' }}>
          <Image
            source={require('../../../../../assets/images/mirrorSelfieMock.jpeg')}
            style={styles.image}
            resizeMode="contain"
          />
          {withPose && (
            <Svg style={styles.overlay} width="100%" height="100%">
              {pose.paths.map((path, index) => (
                <SVGPath
                  key={`path-${index}`}
                  d={path.d?.join('') ?? ''}
                  fill={'transparent'}
                  stroke={defaultColors.primary}
                  strokeWidth={path.penThickness}
                  strokeLinejoin={'round'}
                  strokeLinecap="round"
                />
              ))}
            </Svg>
          )}
        </View>
      </ReactNativeZoomableView>
      <View style={styles.overlayContainer}>
        <Text style={styles.overlayText}>{` DAY ${pictureData.day}`}</Text>
        <View style={styles.overlayStreakBox}>
          <Text style={styles.overlayText}> {pictureData.streak}</Text>
          <Fontisto name="fire" size={25} color={'white'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 5,
  },
  overlayStreakBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ViewPhotoScreen;
