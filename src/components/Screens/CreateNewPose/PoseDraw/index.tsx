import React, { useState } from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Svg, Path as SVGPath } from 'react-native-svg';
import { Slider } from '@rneui/themed';
import { GuideAlert } from '../../../Common/ui/GuideAlert';
import { Path, Pose } from '../../../../types';
import { Fontisto } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface Props {
  image: string;
  createdPose: Pose;
  setCreatedPose: (p: Pose) => void;
  penThickness: number;
  setPenThickness: (p: number) => void;
}
export const PoseDraw = ({
  image,
  createdPose,
  setCreatedPose,
  penThickness,
  setPenThickness,
}: Props) => {
  const { paths } = createdPose;
  const [currentPath, setCurrentPath] = useState<Path | undefined>({
    d: [],
    penThickness,
  });

  const onTouchEnd = () => {
    const tempPosePaths = paths;
    if (currentPath) {
      tempPosePaths.push(currentPath);
    }
    setCreatedPose({ ...createdPose, paths: tempPosePaths });
    setCurrentPath(undefined);
  };

  const onTouchMove = (event) => {
    const newPath = currentPath?.d ?? [];
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    // "Mx,y " format
    const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(
      0
    )},${locationY.toFixed(0)} `;
    newPath.push(newPoint);
    setCurrentPath({ d: newPath, penThickness });
  };

  const handleClearButtonClick = () => {
    setCreatedPose({ ...createdPose, paths: [] });
    setCurrentPath({ d: [], penThickness });
  };

  const onUndo = () => {
    let tempPaths = createdPose.paths;
    tempPaths.pop();
    setCreatedPose({ ...createdPose, paths: tempPaths });
  };

  return (
    <View style={styles.container}>
      <GuideAlert message="Draw your pose!" />
      <View>
        <View
          style={styles.svgContainer}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Svg>
            {paths.map((p, index) => {
              return (
                <SVGPath
                  key={`path-${index}`}
                  d={currentPath?.d?.join('') ?? ''}
                  stroke={defaultColors.primary}
                  fill={'transparent'}
                  strokeWidth={penThickness}
                  strokeLinejoin={'round'}
                  strokeLinecap="round"
                />
              );
            })}
            {paths.map((p, index) => {
              return (
                <SVGPath
                  key={`path-${index}`}
                  d={p.d?.join('') ?? ''}
                  stroke={defaultColors.primary}
                  fill={'transparent'}
                  strokeWidth={p.penThickness}
                  strokeLinejoin={'round'}
                  strokeLinecap="round"
                />
              );
            })}
          </Svg>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </View>
      <View style={styles.drawActionBar}>
        <View
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
          }}
        >
          <Fontisto
            name="close"
            size={20}
            color="white"
            onPress={handleClearButtonClick}
          />
          <Slider
            value={penThickness}
            onValueChange={(e) => setPenThickness(e)}
            maximumValue={10}
            minimumValue={0}
            step={1}
            allowTouchTrack
            trackStyle={styles.sliderTrackStyle}
            thumbStyle={styles.sliderThumbStyle}
            thumbProps={{
              children: (
                <View
                  style={{
                    // ...styles.sliderHandle,
                    width: 20,
                    height: 20,
                  }}
                />
              ),
            }}
          />
        </View>
        <View
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Fontisto name="undo" size={20} color="white" onPress={onUndo} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    zIndex: 1,
    backgroundColor: 'black',
  },
  image: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  actionBar: {
    height: 150,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 30,
  },
  cameraIconButton: {
    backgroundColor: defaultColors.buttonDefault,
    height: 70,
    width: 70,
    borderRadius: 25,
    borderWidth: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIconButton: {
    backgroundColor: defaultColors.buttonDefault,
    height: 70,
    width: 70,
    borderRadius: 25,
    borderWidth: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderHandle: {
    backgroundColor: 'black',
    borderRadius: 10,
  },
  penThicknessSlider: {
    width: 200,
    height: 10,
  },
  sliderTrackStyle: {
    width: 0,
    height: 0,
    borderWidth: 5,
    borderColor: 'white',
    borderLeftWidth: 0,
    borderRightWidth: 200,
    borderRightColor: defaultColors.primary,
  },
  sliderThumbStyle: {
    height: 20,
    width: 20,
    backgroundColor: 'blue',
  },
  drawActionBar: {
    position: 'absolute',
    height: 30,
    width: '90%',
    backgroundColor: 'grey',
    bottom: 50,
    left: '5%',
    opacity: 0.95,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingLeft: '3%',
    paddingRight: '3%',
    zIndex: 4,
  },
});

export default PoseDraw;
