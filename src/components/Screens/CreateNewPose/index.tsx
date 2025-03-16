import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import defaultColors from '../../../styles/colors';
import PoseCapture from './PoseCapture';
import PoseDraw from './PoseDraw';
import { saveImageToDevice, saveImageUriToStorage } from './utils';
import {
  useCreateNewPoseHook,
  CreateNewPoseSteps,
} from './useCreateNewPoseHook';
import { CreatePoseDetails } from './CreatePoseDetails';
import { PoseReminder } from './PoseReminder';
import { PoseCreated } from './PoseCreated';
import { PoseChecklist } from './PoseChecklist';
import { addDailyChecklist, uploadPictureByPoseIdApi } from '../../../services/api';
import { generateNewUuid } from '../../../utils/generateNewUuid';
import { BackButton } from '../../Common/ui/IconButton/BackButton';
import { ActionBar } from '../../Common/ActionBar';
import { Colors, useTheme } from '../../../hooks/useTheme';

const { width: screenWidth } = Dimensions.get('window');

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
    uploadPoseDetails,
  } = useCreateNewPoseHook();
  const navigation = useNavigation();
  const [factId, setFactId] = useState<string>()
  const { colors } = useTheme()
  const styles = getStyles(colors)

  const onPrimaryCtaPress = async () => {
    const currentIndex = stepsOrder.indexOf(step);
    const nextIndex = (currentIndex + 1) % stepsOrder.length;
    if (step === CreateNewPoseSteps.POSE_CHECKLIST) { // TODO Look  at this logic
      console.log("here", createdPose?.checklist, factId)
      if (createdPose?.checklist && factId) {
        await addDailyChecklist(createdPose?.checklist, factId, createdPose?.poseId).then(() => {
          setStep(stepsOrder[nextIndex]);
        }).catch(e => console.error(e))
      }
    } else {
      setStep(stepsOrder[nextIndex]);
    }
  };

  const onSecondaryCtaPress = () => {
    const currentIndex = stepsOrder.indexOf(step);
    const nextIndex = (currentIndex - 1) % stepsOrder.length;
    setStep(stepsOrder[nextIndex]);
  };


  const onBack = () => {
    if (step === CreateNewPoseSteps.POSE_CAPTURE) {
      if (!firstImage) {
        navigation.goBack()
      } else {
        setFirstImage(null)
      }
    } else {
      onSecondaryCtaPress()
    }
  }

  const onUploadPicture = async () => {
    if (firstImage) {
      const savedUri = await saveImageToDevice(firstImage, setFirstImage, () =>
        setStep(CreateNewPoseSteps.POSE_DRAW)
      );
      if (
        createdPose?.createdDate &&
        createdPose?.poseId &&
        createdPose?.userId &&
        savedUri
      ) {
        const idforFact = generateNewUuid();
        setFactId(idforFact.toString());
        console.log("uploadPictureByPoseIdApi called", firstImage)
        // await saveImageUriToStorage(savedUri);
        await uploadPictureByPoseIdApi({
          date: createdPose.createdDate,
          day: 1,
          picture: firstImage,
          pictureId: generateNewUuid().toString(),
          poseId: createdPose.poseId,
          streak: 1,
          userId: createdPose.userId,
        }, idforFact.toString());
      }
    }
  }

  // const onUploadPicture = async () => {
  //   if (firstImage) {
  //     // Await saveImageToDevice to get the saved image URI
  //     const savedUri = await saveImageToDevice(firstImage, setFirstImage, () =>
  //       setStep(CreateNewPoseSteps.POSE_DRAW)
  //     );

  //     if (savedUri) {
  //       await saveImageUriToStorage(savedUri); // Save to local storage
  //       setFirstImage(savedUri);
  //       setStep(CreateNewPoseSteps.POSE_DRAW);
  //     }
  //   }
  // };

  const getActionBar = () => {
    if (step === CreateNewPoseSteps.POSE_CAPTURE) {
      if (!firstImage) {
        return (<></>)
      } else {
        return (
          <ActionBar primaryText="Next"
            onPrimaryClick={onUploadPicture} />
        );
      }
    } else if (step === CreateNewPoseSteps.POSE_CREATED) {
      return (<></>)
    } else {
      return (
        <ActionBar primaryText="Next"
          onPrimaryClick={onPrimaryCtaPress} />
      );
    }
    return <View></View>;
  };

  const getStepContent = () => {
    switch (step) {
      case CreateNewPoseSteps.POSE_CAPTURE:
        return <PoseCapture
          setPoseCaptureImage={setFirstImage}
          onNextCallback={onPrimaryCtaPress}
          image={firstImage}
          enableFilter={false}
        />
      case CreateNewPoseSteps.POSE_DRAW:
        return firstImage && createdPose ? (
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
      case CreateNewPoseSteps.POSE_DETAILS:
        return createdPose ? (
          <CreatePoseDetails
            createdPose={createdPose}
            setCreatedPose={setCreatedPose}
            image={firstImage}
          />
        ) : null;
      case CreateNewPoseSteps.POSE_CHECKLIST:
        return createdPose ? (
          <PoseChecklist
            createdPose={createdPose}
            setCreatedPose={setCreatedPose}
            image={firstImage}
          />
        ) : null;
      case CreateNewPoseSteps.POSE_CREATED:
        return createdPose ? (
          <PoseCreated
            createdPose={createdPose}
            uploadPoseDetails={uploadPoseDetails}
          />
        ) : null;
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <View style={styles.childContainer}>
        <View style={{ height: screenWidth * (5 / 3), width: screenWidth, backgroundColor: 'white' }}>
          {getStepContent()}
        </View>
      </View>
      {firstImage && <View style={styles.actionBarContainer}>
        {getActionBar()}
      </View>}

    </View>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground,
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
  childContainer: {
    flex: 0.9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBarContainer: {
    flex: 0.1,
    borderTopColor: colors.solidBorder,
    borderTopWidth: 1
  }
});

export default CreateNewPose;
