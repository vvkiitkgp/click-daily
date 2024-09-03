import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import defaultColors from '../../../../styles/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pose } from '../../../../types';

interface CompareScreenProps {
  pose: Pose;
  showCompare: boolean;
}

export const CompareScreen = ({ pose, showCompare }: CompareScreenProps) => {
  const { createdDate } = pose;
  const onChange = ({ type }, selectedTime) => {
    if (type === 'set') {
      const currentTime = selectedTime;
    }
  };

  const renderChoosingDates = () => {
    return (
      <View>
        <Text style={styles.heading}>Choose Dates to Compare!</Text>
        <View>
          <Text style={{ color: defaultColors.textColorDefault }}>
            First Picture Date:
          </Text>
          <DateTimePicker
            display="spinner"
            value={new Date()}
            textColor={defaultColors.textColorPrimary}
            onChange={onChange}
            minimumDate={new Date(pose.createdDate * 1000)}
            maximumDate={new Date(new Date().setDate(new Date().getDate() - 1))}
          />
        </View>
        <View>
          <Text style={{ color: defaultColors.textColorDefault }}>
            Second Picture Date:
          </Text>
          <DateTimePicker
            display="spinner"
            value={new Date()}
            textColor={defaultColors.textColorPrimary}
            onChange={onChange}
            minimumDate={
              new Date(
                new Date().setDate(
                  new Date(pose.createdDate * 1000).getDate() + 1
                )
              )
            }
            maximumDate={new Date()}
          />
        </View>
      </View>
    );
  };

  const renderCompare = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        >
          <Image
            source={require('../../../../../assets/images/mirrorSelfieMock.jpeg')}
            style={[styles.image, styles.blueOverlayImage1]}
            resizeMode="contain"
          />
          <View style={styles.blueOverlay} />
        </View>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Image
            source={require('../../../../../assets/images/Logo.png')}
            style={[styles.image, styles.redOverlayImage2]}
            resizeMode="contain"
          />
          <View style={styles.redOverlay} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {showCompare ? renderCompare() : renderChoosingDates()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: defaultColors.backgroundDark,
  },
  heading: {
    fontSize: 50,
    fontStyle: 'italic',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: defaultColors.primary,
    marginTop: 30,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute', // Position the images absolutely to overlay each other
  },
  blueOverlayImage1: {
    opacity: 0.8, // Set the opacity for the images
  },
  redOverlayImage2: {
    opacity: 0.8, // Set the opacity for the images
  },
  redOverlay: {
    ...StyleSheet.absoluteFillObject, // Overlay the entire parent view
    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Red color with 60% opacity
  },
  blueOverlay: {
    ...StyleSheet.absoluteFillObject, // Overlay the entire parent view
    backgroundColor: 'rgba(0, 0, 255, 0.2)', // Blue color with 60% opacity
  },
});
export default CompareScreen;
