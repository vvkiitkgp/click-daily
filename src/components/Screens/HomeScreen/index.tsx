import React, { useContext } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { PoseParentCard } from '../../Common/PoseParentCard';
import { FAB } from 'react-native-elements';
import defaultColors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { UserContext } from '../../../contexts/UserContext';
import { posesMock } from '../../../mocks/databaseMocks';
export const HomeScreen = () => {
  const navigate = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'black',
      }}
    >
      <View style={{ marginTop: 20 }}>
        {posesMock.map((pose) => {
          return <PoseParentCard pose={pose} />;
        })}
      </View>
      <TouchableOpacity
        style={styles.createNewPoseFab}
        onPress={() =>
          navigate.navigate(NavigationScreens.CREATE_NEW_POSE_SCREEN as never)
        }
      >
        <Text style={{ fontSize: 15 }}>Create New Pose +</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createNewPoseFab: {
    height: 50,
    width: 170,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    right: 10,
    bottom: 80,
    backgroundColor: defaultColors.buttonDefault,
  },
});

export default HomeScreen;
