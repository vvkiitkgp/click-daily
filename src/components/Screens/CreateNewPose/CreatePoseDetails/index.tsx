import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Pose } from '../../../../types';
import TextField from '../../../Common/ui/TextField';
import { PhotoCard } from '../common/PhotoCard';
import TimePicker from '../../../Common/ui/TimePicker';
import { useTheme } from '../../../../hooks/useTheme';
import Dropdown from '../../../Common/ui/Dropdown';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Divider from '../../../Common/ui/Divider';


interface CreatePoseName {
  createdPose: Pose;
  setCreatedPose: (p: Pose) => void;
  image: string | null
}
export const CreatePoseDetails = ({
  createdPose,
  setCreatedPose,
  image
}: CreatePoseName) => {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <PhotoCard photoUrl={image} />
          <Divider overrideStyles={{ width: '90%', marginVertical: 21 }} />

          <View style={styles.fieldsContainer}>
            <TextField value={createdPose.name} placeholder="Enter Pose Name" label='Pose Name'
              onChange={(text) =>
                setCreatedPose({ ...createdPose, name: text })
              } />
            <TimePicker time={createdPose.reminder} setTime={(time) => setCreatedPose({ ...createdPose, reminder: time })} />
            {/** TODO: Add a duration variable in Pose */}
            <Dropdown value={'15'} label='Duration' items={[{ label: '15 min', value: '15' }, { label: '30 min', value: '30' }, { label: '1 hr', value: '60' }, { label: '2 hrs', value: '120' },]} setValue={() => null} placeholder='Select Duration to Take a Snap' />
          </View>

        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 20,
  },
  nameContainer: {
    marginTop: 20,
  },
  scrollView: { paddingBottom: 20 },
  fieldsContainer: {
    display: 'flex',
    gap: 12,
    width: '100%',
  },
  heading: {
    fontSize: 50,
    fontStyle: 'italic',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: defaultColors.primary,
  },
  input: {
    height: 50, // Adjust this value as needed
    fontSize: 30,
    color: defaultColors.textColorPrimary,
  },
  posePicture: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 125,
    width: '25%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: defaultColors.primary,
    alignSelf: 'flex-start',
  },
});
