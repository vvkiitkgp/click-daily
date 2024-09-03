import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import PictureInGrid from '../../Common/PictureInGrid';
import { content } from './content';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import defaultColors from '../../../styles/colors';
import { formatPhotosToWeekArray } from './utils';
import { Picture, PictureInAWeek, Pose } from '../../../types';
import { picturesMock } from '../../../mocks/databaseMocks';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import CompareScreen from './CompareScreen';

export enum Features {
  COMPARE = 'COMPARE',
  VIEW_PHOTO = 'VIEW_PHOTO',
  CHECKLIST_RESULT = 'CHECKLIST_RESULT',
  EDIT_POSE = 'EDIT_POSE',
  TRANSFORMATION_VIDEO = 'TRANSFORMATION_VIDEO',
}

import { RouteProp } from '@react-navigation/native';
import ViewPhotoScreen from './ViewPhotoScreen';

type RootStackParamList = {
  // Define your screen names here
  PoseHomeScreen: { pose: Pose };
  // Other screens...
};

type PoseHomeScreenRouteProp = RouteProp<RootStackParamList, 'PoseHomeScreen'>;

interface Props {
  route: PoseHomeScreenRouteProp;
}

export const PoseHomeScreen = ({ route }: Props) => {
  const { pose } = route.params;
  const navigation = useNavigation();

  const [withPoseActive, setWithPoseActive] = useState<boolean>(false);
  const [activeScreen, setActiveScreen] = useState<Features | null>(null);
  const [selectedPictureData, setSelectedPictureData] =
    useState<Picture | null>(null);
  const insets = useSafeAreaInsets();

  // const screenHeight = Dimensions.get('window').height - insets.top;
  const screenHeight = Dimensions.get('window').height;
  const photoGridContainerHeight = screenHeight * 0.65;
  const actionButtonsContainerHeight = screenHeight * 0.35;

  const onBack = () => {
    setSelectedPictureData(null);
    setWithPoseActive(false);
    if (activeScreen === null) {
      navigation.goBack();
    } else {
      setActiveScreen(null);
    }
  };
  const getPictureInGridItems = (item: Picture) => {
    return (
      <View
        style={{
          height: photoGridContainerHeight / 3,
          width: photoGridContainerHeight / 3,
          backgroundColor: defaultColors.backgroundDark,
        }}
      >
        <PictureInGrid
          size={photoGridContainerHeight / 3}
          pictureData={item}
          onPress={(p) => {
            setActiveScreen(Features.VIEW_PHOTO);
            setSelectedPictureData(p);
          }}
        />
      </View>
    );
  };

  const getPicturesForWeek = (p: PictureInAWeek) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: (photoGridContainerHeight / 3) * 7,
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 80,
          }}
        >
          <View>
            <Text
              style={{
                transform: [{ rotate: '270deg' }],
                fontSize: 20,
                color: defaultColors.textColorPrimary,
                width: photoGridContainerHeight / 3,
                height: 30,
              }}
            >{`WEEK ${p.week}`}</Text>
          </View>
        </View>

        {p.photos.map((p) => {
          return getPictureInGridItems(p);
        })}
      </View>
    );
  };

  const getIcon = (name, iconName, onPress, width, feature) => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width,
        }}
      >
        <View
          style={{
            ...styles.iconContainer,
            display:
              activeScreen === null || activeScreen === feature
                ? 'flex'
                : 'none',
          }}
        >
          <MaterialIcons
            name={iconName}
            size={25}
            color={defaultColors.iconColorPrimary}
            onPress={onPress}
          />
        </View>
        <View
          style={{
            marginTop: 5,
            display:
              activeScreen === null || activeScreen === feature
                ? 'flex'
                : 'none',
          }}
        >
          <Text style={{ color: defaultColors.textColorDefault, fontSize: 10 }}>
            {name}
          </Text>
        </View>
      </View>
    );
  };

  const getActionButtons = () => {
    return (
      <View
        style={{
          ...styles.actionButtonContainer,
        }}
      >
        <View
          style={{
            width: '100%',
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            height: 60,
          }}
        >
          {getIcon(
            'Compare',
            'compare',
            () => setActiveScreen(Features.COMPARE),
            '33.3%',
            Features.COMPARE
          )}
          {getIcon(
            withPoseActive ? 'Without Pose' : 'With Pose',
            'man',
            () => {
              setActiveScreen(Features.VIEW_PHOTO);
              setWithPoseActive(!withPoseActive);
              setSelectedPictureData(picturesMock[picturesMock.length - 1]);
            },
            '33.3%',
            Features.VIEW_PHOTO
          )}
          {getIcon(
            'Check List %',
            'checklist-rtl',
            () => setActiveScreen(Features.CHECKLIST_RESULT),
            '33.3%',
            Features.CHECKLIST_RESULT
          )}
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            marginTop: 10,
            flexDirection: 'row',
            paddingLeft: 50,
            paddingRight: 50,
            height: 60,
          }}
        >
          {getIcon(
            'Edit Pose',
            'edit',
            () => setActiveScreen(Features.EDIT_POSE),
            '50%',
            Features.EDIT_POSE
          )}
          {getIcon(
            'Transformation',
            'ondemand-video',
            () => setActiveScreen(Features.TRANSFORMATION_VIDEO),
            '50%',
            Features.TRANSFORMATION_VIDEO
          )}
        </View>
      </View>
    );
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case Features.COMPARE:
        return <CompareScreen pose={pose} showCompare />;
      case Features.EDIT_POSE:
        return <View></View>;
      case Features.CHECKLIST_RESULT:
        return <View></View>;
      case Features.TRANSFORMATION_VIDEO:
        return <View></View>;
      case Features.VIEW_PHOTO:
        return (
          <ViewPhotoScreen
            pose={pose}
            pictureData={selectedPictureData}
            withPose={withPoseActive}
          />
        );
    }
    return <View></View>;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <MaterialIcons
            name="arrow-back-ios-new"
            color={defaultColors.iconColorDefault}
            size={20}
            onPress={onBack}
          />
        </View>
        {activeScreen === null ? (
          <View
            style={{
              ...styles.photoGridContainer,
              height: photoGridContainerHeight,
            }}
          >
            <ScrollView horizontal>
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: (photoGridContainerHeight / 3) * 7,
                  }}
                >
                  {getPicturesForWeek(formatPhotosToWeekArray(picturesMock)[0])}
                </View>

                <View
                  style={{
                    height: (photoGridContainerHeight / 3) * 2, // Adjusted height to match two rows
                    overflow: 'hidden',
                  }}
                >
                  <ScrollView>
                    {formatPhotosToWeekArray(picturesMock).map(
                      (weekPhotos, index) => {
                        if (weekPhotos.week !== 1) {
                          return getPicturesForWeek(weekPhotos);
                        }
                      }
                    )}
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          renderActiveScreen()
        )}

        {getActionButtons()}
      </SafeAreaView>
    </View>
  );
};

export default PoseHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: defaultColors.backgroundDark,
  },
  headerContainer: {
    display: 'flex',
    height: 50,
    backgroundColor: 'red',
    zIndex: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    display: 'flex',
    marginTop: 5,
    flexDirection: 'column',
  },
  weekDayContainer: {
    width: 20,
    borderRightWidth: 1,
    borderRightColor: 'black',
    marginRight: 10,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
  },
  columnWrapper: {
    flexDirection: 'row', // Items will wrap to the top
    justifyContent: 'space-between', // Adjust the alignment as needed
  },
  photoGridContainer: {},
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 50,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: defaultColors.borderPrimary,
    borderRadius: '50%',
  },
});
