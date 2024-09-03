import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';
import { Pose } from '../../../../types';
import { PoseParentCard } from '../../../Common/PoseParentCard';
import DateTimePicker from '@react-native-community/datetimepicker';

interface PoseReminderProp {
  createdPose: Pose;
  setCreatedPose: (p: Pose) => void;
}
export const PoseReminder = ({
  createdPose,
  setCreatedPose,
}: PoseReminderProp) => {
  const onChange = ({ type }, selectedTime) => {
    if (type === 'set') {
      const currentTime = selectedTime;
      setCreatedPose({ ...createdPose, reminder: currentTime });
    }
  };

  return (
    <View style={styles.container}>
      <View pointerEvents="none">
        <PoseParentCard pose={createdPose} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.heading}>Set Reminder</Text>
        <DateTimePicker
          mode="time"
          display="spinner"
          value={
            createdPose.reminder ? new Date(createdPose.reminder) : new Date()
          }
          textColor={defaultColors.textColorPrimary}
          onChange={onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    alignItems: 'center',
  },
  nameContainer: {
    marginTop: 20,
    height: 500,
    width: 350,
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
