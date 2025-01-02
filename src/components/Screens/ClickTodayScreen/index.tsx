import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PoseCapture from '../CreateNewPose/PoseCapture';
import { ChecklistItem, Pose } from '../../../types';
import { PoseFilter } from './PoseFilter';
import { Fontisto } from '@expo/vector-icons';
import { saveImageToDevice } from '../CreateNewPose/utils';
import { generateNewUuid } from '../../../utils/generateNewUuid';
import { addDailyChecklist, uploadPictureByPoseIdApi } from '../../../services/api';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../Common/ui/IconButton/BackButton';
import { ActionBar } from '../../Common/ActionBar';
import defaultColors from '../../../styles/colors';
import { useGetPoseDetails } from '../../../hooks/useGetPoseDetails';
import CheckListItemCard from '../../Common/CheckListItemCard';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { useClickToday } from './hooks/useClickToday';
import Loader from '../../Common/ui/Loader';

export const ClickTodayScreen = ({ route }) => {
  const { pose } = route.params;
  const [poseCatureImage, setPoseCaptureImage] = useState<string | null>(null);
  const navigation = useNavigation();
  const factId = generateNewUuid();
  const [step, setStep] = useState<'capture' | 'checklist'>('capture')
  const [newChecklistData, setNewChecklistData] = useState<ChecklistItem[]>([])

  const { data, loading, error } = useClickToday(pose.poseId);
  useEffect(() => {
    console.log(data?.poseData?.checklist, "CHECKKLIST")
    if (data?.poseData?.checklist.length) {
      setNewChecklistData(data.poseData?.checklist)
    }
  }, [data?.poseData?.checklist])

  const onCheckCallback = (id: string) => {
    setNewChecklistData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const onCountChangeCallack = (id: string, count: number) => {
    setNewChecklistData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count } : item
      )
    );
  };

  const onDone = async () => {
    await data?.handleDone(poseCatureImage, setPoseCaptureImage, pose, factId, newChecklistData,)
    navigation.navigate(
      NavigationScreens.HOME_SCREEN as never
    );
  }

  return loading ? <View style={styles.loadingContainer}><Loader /></View> : error ? <View style={styles.loadingContainer}><Text>Something went wrong!</Text></View> : (
    <View style={styles.container}>
      {step === 'capture' ? !poseCatureImage ? (
        <BackButton onBack={() => navigation.goBack()} />
      ) : (
        <BackButton name="camera" onBack={() => setPoseCaptureImage(null)} />
      ) : <BackButton onBack={() => setStep('capture')} />}
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.9 }}>
          {step === 'capture' ? <PoseCapture
            setPoseCaptureImage={(image) => {
              console.log(image, 'IMAGE');
              setPoseCaptureImage(image);
            }}
            onNextCallback={() => { }}
            image={poseCatureImage}
            enableFilter
            pose={pose}
          /> : <View>

            <View>
              {newChecklistData.map((item) => <CheckListItemCard
                isEdit={false}
                setIsEdit={id => null}
                item={item}
                onCheckCallback={onCheckCallback}
                onCountChangeCallack={onCountChangeCallack}
                onSaveCallback={() => null}
                onDeleteCallback={() => null}
                isDailyChecklist
              />)}
            </View>

          </View>}

        </View>
        <View style={{ flex: 0.1 }}>
          {step === 'capture' ? poseCatureImage ? <ActionBar primaryText='Next' onPrimaryClick={() => setStep('checklist')} /> : null : step === 'checklist' ? <ActionBar primaryText='Done' onPrimaryClick={onDone} /> : null}
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: defaultColors.backgroundDark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: defaultColors.backgroundDark,
  },
});

export default ClickTodayScreen;
