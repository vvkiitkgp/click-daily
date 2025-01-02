import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { PoseFilter } from './PoseFilter';
import { Pose } from '../../../types';
import defaultColors from '../../../styles/colors';
import { Fontisto, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Colors, useTheme } from '../../../hooks/useTheme';
import Streak from '../Streak';

export const PoseParentCard = ({ pose }: { pose: Pose }) => {
  const navigation = useNavigation();
  const { colors } = useTheme()
  const styles = getStyles(colors)

  const getStatusIcon = () => {
    if (pose.isMissedToday) {
      return <Fontisto name="close-a" size={15} color='black' />;
    }
    if (pose.isPoseClickedToday) {
      return <FontAwesome5 name="check-double" size={20} color='black' />;
    } else {
      return <Ionicons name="camera-outline" size={32} color='black' />;
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NavigationScreens.POSE_HOME_SCREEN, { pose })
      }
      style={styles.mainContainer}
    >
      <View style={styles.posePicture}>
        <PoseFilter paths={pose.paths} />
      </View>

      <View style={styles.contentContainer}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: colors.defaultText,
              fontSize: 18,
              marginLeft: '10%',
              // marginTop: 10,
              fontWeight: '600'
            }}
          >
            {pose.name?.length ? pose.name : 'Pose Name'}
          </Text>
          <Streak number={pose.streak} />
        </View>
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
              color: colors.defaultText,
              width: '45%',
              fontSize: 14,
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

          <Text
            style={{
              color: colors.defaultText,
              width: '45%',
              fontSize: 14,
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
            navigation.navigate(NavigationScreens.CLICK_TODAY_SCREEN, { pose });
          }}
        >
          <View
            style={{
              ...styles.captureIcon,
              backgroundColor: pose.isMissedToday ? colors.errorBackground : pose.isPoseClickedToday ? colors.successBackground : colors.pendingBackground
            }}
          >
            {getStatusIcon()}
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  mainContainer: {
    height: 106,
    borderColor: colors.solidBorder,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 5,
    marginVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.containerBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  contentContainer: {
    width: '50%',
  },
  iconsStatusContainer: {
    height: 125,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posePicture: {
    backgroundColor: colors.containerBackground,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: '25%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.solidBorder,
    overflow: 'hidden'
  },
  captureIcon: {
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.solidBorder,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 5
  },
});
