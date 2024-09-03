import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { PoseFilter } from './PoseFilter';
import { posesMock } from '../../../mocks/databaseMocks';
import { Pose } from '../../../types';
import defaultColors from '../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';

export const PoseParentCard = ({ pose }: { pose: Pose }) => {
  const navigation = useNavigation();

  const getStatusIcon = () => {
    if (pose.isMissedToday) {
      return <Fontisto name="close-a" size={20} color={'red'} />;
    }
    if (pose.isPoseClickedToday) {
      return <Fontisto name="check" size={20} color={defaultColors.primary} />;
    } else {
      return <Fontisto name="camera" size={20} color={defaultColors.primary} />;
    }
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NavigationScreens.POSE_HOME_SCREEN,{pose})
      }
      style={styles.mainContainer}
    >
      <View style={styles.posePicture}>
        <PoseFilter paths={pose.paths} />
      </View>

      <View style={styles.contentContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            marginLeft: '10%',
            marginTop: 10,
          }}
        >
          {pose.name.length ? pose.name : 'Pose Name'}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          <Text
            style={{
              color: 'white',
              width: '45%',
              fontSize: 15,
              marginLeft: '10%',
              marginTop: 10,
            }}
          >
            {pose.reminder &&
              new Date(pose.reminder).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
          </Text>
          <View
            style={{
              display: 'flex',
              width: '45%',
              marginTop: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                marginRight: 2,
              }}
            >
              {pose.streak}
            </Text>
            <Fontisto name="fire" size={17} color={'white'} />
          </View>
          <Text
            style={{
              color: 'white',
              width: '45%',
              fontSize: 15,
              marginLeft: '10%',
              marginTop: 10,
            }}
          >
            {`${pose.photoCount}/${pose.totalDayCount} days`}
          </Text>
        </View>
      </View>
      <View style={styles.iconsStatusContainer}>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            navigation.navigate(NavigationScreens.CLICK_TODAY_SCREEN, {
              pose,
            });
          }}
        >
          <View
            style={{
              ...styles.captureIcon,
              borderColor: pose.isMissedToday ? 'red' : defaultColors.primary,
            }}
          >
            {getStatusIcon()}
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 125,
    borderBottomWidth: 0.2,
    borderColor: 'white',
    borderRadius: 20,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  contentContainer: {
    height: 125,
    width: '50%',
  },
  iconsStatusContainer: {
    height: 125,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  captureIcon: {
    height: 50,
    width: 50,
    borderRadius: '50%',
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
