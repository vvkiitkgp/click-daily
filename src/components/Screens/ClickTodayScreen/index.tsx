import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PoseCapture from '../CreateNewPose/PoseCapture';
import { Pose } from '../../../types';
import { PoseFilter } from './PoseFilter';
import { Fontisto } from '@expo/vector-icons';
import { saveImageToDevice } from '../CreateNewPose/utils';
import { generateNewUuid } from '../../../utils/generateNewUuid';
import { uploadPictureByPoseIdApi } from '../../../services/api';
import { useNavigation } from '@react-navigation/native';

export const ClickTodayScreen = ({ route }) => {
  const { pose } = route.params;
  const [poseCatureImage, setPoseCaptureImage] = useState<string | null>(null);
  const navigation = useNavigation();

  const getActionBar = () => {};
  return (
    <View style={styles.container}>
      {!poseCatureImage ? (
        <View
          style={{
            position: 'absolute',
            height: 30,
            width: 30,
            backgroundColor: 'grey',
            top: 70,
            left: '5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            zIndex: 999,
          }}
        >
          <Fontisto
            name="arrow-left"
            size={20}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            height: 30,
            width: '90%',
            backgroundColor: 'grey',
            top: 70,
            left: '5%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            paddingLeft: '3%',
            paddingRight: '3%',
            zIndex: 999,
          }}
        >
          <View style={{ width: '50%' }}>
            <Fontisto
              name="camera"
              size={20}
              color="white"
              onPress={() => setPoseCaptureImage(null)}
            />
          </View>
          <View
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Fontisto
              name="check"
              size={20}
              color="red"
              onPress={async () => {
                console.log('here');
                saveImageToDevice(
                  poseCatureImage,
                  setPoseCaptureImage,
                  () => {}
                );

                if (
                  pose?.createdDate &&
                  pose?.poseId &&
                  pose?.userId &&
                  poseCatureImage
                ) {
                  await uploadPictureByPoseIdApi({
                    date: new Date(),
                    day: 1,
                    picture: poseCatureImage,
                    pictureId: generateNewUuid().toString(),
                    poseId: pose.poseId,
                    streak: 1,
                    userId: pose.userId,
                  });
                }
              }}
            />
          </View>
        </View>
      )}
      <PoseCapture
        setPoseCaptureImage={(image) => {
          console.log(image, 'IMAGE');
          setPoseCaptureImage(image);
        }}
        onNextCallback={() => {}}
        image={poseCatureImage}
        enableFilter
        pose={pose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ClickTodayScreen;
