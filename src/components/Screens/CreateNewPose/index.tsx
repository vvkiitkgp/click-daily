import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import defaultColors from '../../../styles/colors';
import PoseCapture from './PoseCapture';
import PoseDraw from './PoseDraw';
import { Fontisto } from '@expo/vector-icons';
import { saveImageToDevice } from './utils';
import { Slider } from 'react-native-elements';
import {
  useCreateNewPoseHook,
  CreateNewPoseSteps,
} from './useCreateNewPoseHook';
import { CreatePoseName } from './CreatePoseName';
import { PoseReminder } from './PoseReminder';
import { PoseCreated } from './PoseCreated';
import { PoseChecklist } from './PoseChecklist';
import { uploadPictureByPoseIdApi } from '../../../services/api';
import { generateNewUuid } from '../../../utils/generateNewUuid';

export const CreateNewPose = () => {
  const {
    step,
    setStep,
    stepsOrder,
    setFirstImage,
    firstImage,
    createdPose,
    setCreatedPose,
    penThickness,
    setPenThickness,
  } = useCreateNewPoseHook();
  const navigation = useNavigation();

  const onPrimaryCtaPress = () => {
    const currentIndex = stepsOrder.indexOf(step);
    const nextIndex = (currentIndex + 1) % stepsOrder.length;
    setStep(stepsOrder[nextIndex]);
  };

  const onSecondaryCtaPress = () => {
    const currentIndex = stepsOrder.indexOf(step);
    const nextIndex = (currentIndex - 1) % stepsOrder.length;
    setStep(stepsOrder[nextIndex]);
  };

  const getActionBar = () => {
    if (step === CreateNewPoseSteps.POSE_CAPTURE) {
      if (!firstImage) {
        return (
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
        );
      } else {
        return (
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
                onPress={() => setFirstImage(null)}
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
                color="white"
                onPress={async () => {
                  console.log('YOO YOO HERE');
                  saveImageToDevice(firstImage, setFirstImage, () =>
                    setStep(CreateNewPoseSteps.POSE_DRAW)
                  );
                  if (
                    createdPose?.createdDate &&
                    createdPose?.poseId &&
                    createdPose?.userId
                  ) {
                    await uploadPictureByPoseIdApi({
                      date: createdPose.createdDate,
                      day: 1,
                      picture: firstImage,
                      pictureId: generateNewUuid().toString(),
                      poseId: createdPose.poseId,
                      streak: 1,
                      userId: createdPose.userId,
                    });
                  }
                }}
              />
            </View>
          </View>
        );
      }
    } else if (step === CreateNewPoseSteps.POSE_CREATED) {
      return <View></View>;
    } else {
      return (
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
              name="arrow-left"
              size={20}
              color="white"
              onPress={onSecondaryCtaPress}
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
              color="white"
              onPress={onPrimaryCtaPress}
            />
          </View>
        </View>
      );
    }

    return <View></View>;
  };

  const getStepContent = () => {
    switch (step) {
      case CreateNewPoseSteps.POSE_CAPTURE:
        return (
          <PoseCapture
            setPoseCaptureImage={setFirstImage}
            onNextCallback={onPrimaryCtaPress}
            image={firstImage}
          />
        );
      case CreateNewPoseSteps.POSE_DRAW:
        return firstImage ? (
          <PoseDraw
            image={firstImage}
            createdPose={createdPose}
            setCreatedPose={setCreatedPose}
            penThickness={penThickness}
            setPenThickness={setPenThickness}
          />
        ) : (
          <View>
            <Text>Error while clicking image</Text>
          </View>
        );
      case CreateNewPoseSteps.POSE_NAME:
        return (
          <CreatePoseName
            createdPose={createdPose}
            setCreatedPose={setCreatedPose}
          />
        );
      case CreateNewPoseSteps.POSE_REMINDER:
        return (
          <PoseReminder
            createdPose={createdPose}
            setCreatedPose={setCreatedPose}
          />
        );
      case CreateNewPoseSteps.POSE_CHECKLIST:
        return (
          <PoseChecklist
            createdPose={createdPose}
            setCreatedPose={setCreatedPose}
          />
        );
      case CreateNewPoseSteps.POSE_CREATED:
        return <PoseCreated createdPose={createdPose} />;
    }
  };

  return (
    <View style={styles.container}>
      {getActionBar()}
      {getStepContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.backgroundDark,
  },
  sliderTrackStyle: {
    width: 0,
    height: 0,
    borderWidth: 5,
    borderColor: 'grey',
    borderLeftWidth: 0,
    borderRightWidth: 200,
    borderRightColor: defaultColors.primary,
  },
  sliderThumbStyle: {
    height: 20,
    width: 20,
    backgroundColor: 'blue',
  },
});

export default CreateNewPose;
