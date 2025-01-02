import React from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';
import { Pose } from '../../../../types';
import { PoseParentCard } from '../../../Common/PoseParentCard';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import TimePicker from '../../../Common/ui/TimePicker';

interface PoseReminderProp {
  createdPose: Pose;
  setCreatedPose: (p: Pose) => void;
}
export const PoseReminder = ({
  createdPose,
  setCreatedPose,
}: PoseReminderProp) => {

  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setCreatedPose({ ...createdPose, reminder: selectedTime });
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
        <TimePicker time={createdPose.reminder ? new Date(createdPose.reminder) : new Date()} setTime={(selectedTime) => setCreatedPose({ ...createdPose, reminder: selectedTime })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
