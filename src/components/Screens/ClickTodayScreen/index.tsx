import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PoseCapture from '../CreateNewPose/PoseCapture';
import { Pose } from '../../../types';
import { PoseFilter } from './PoseFilter';

export const ClickTodayScreen = ({ route }) => {
  const { pose } = route.params;
  const [poseCatureImage, setPoseCaptureImage] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <View style={styles.poseFilterContainer}>
        <PoseFilter paths={pose.paths} />
      </View>
      <PoseCapture
        setPoseCaptureImage={setPoseCaptureImage}
        onNextCallback={() => {}}
        image={poseCatureImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  poseFilterContainer: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    height: '100%',
  },
});

export default ClickTodayScreen;
