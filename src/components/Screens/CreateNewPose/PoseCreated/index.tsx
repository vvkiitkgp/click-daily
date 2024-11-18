import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Pose } from '../../../../types';
import { PoseParentCard } from '../../../Common/PoseParentCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../../navigation/AppNavigator';
import { PosesContext } from '../../../../contexts/PosesContext';

interface PoseCreatedProps {
  createdPose: Pose;
}
export const PoseCreated = ({ createdPose }: PoseCreatedProps) => {
  const navigation = useNavigation();
  const { posesList, setPosesList } = useContext(PosesContext);
  // TODO api call
  setTimeout(() => {
    navigation.navigate(NavigationScreens.HOME_SCREEN as never);
  }, 3000);

  useEffect(() => {
    if (createdPose) {
      setPosesList([...posesList, createdPose]);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View pointerEvents="none">
        <PoseParentCard pose={createdPose} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.heading}>Creating Your Pose...</Text>

        {/* <Video
        source={{ uri: 'https://example.com/path/to/video.mp4' }}
        resizeMode="cover"
        style={{ width: 300, height: 300 }}
        repeat
        autoplay
      /> */}
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
