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
import { useGetAllPicturesForPose } from './hooks/useGetAllPicturesForPose';
import Loader from '../../Common/ui/Loader';
import { BackButton } from '../../Common/ui/IconButton/BackButton';
import IconButton, { CustomIconButton } from '../../Common/ui/IconButton';

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
  const { data, loading, error } = useGetAllPicturesForPose(pose.poseId);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: defaultColors.backgroundDark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader />
      </View>
    );
  if (error) return <Text>Error: {error.message}</Text>;

  // const screenHeight = Dimensions.get('window').height - insets.top;
  const screenHeight = Dimensions.get('window').height;
  const photoGridContainerHeight = screenHeight * 0.5;
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

  const getPicturesForWeek = (p: PictureInAWeek, isFirstWeek?: boolean) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: (photoGridContainerHeight / 3) * 7 + 100,
        }}
      >
        <View
          style={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 80,
          }}
        >
          <Text
            style={{
              marginTop: 10,
              // transform: [{ rotate: '270deg' }],
              fontSize: 20,
              color: defaultColors.textColorPrimary,
              // width: photoGridContainerHeight / 3,
              height: 30,
            }}
          >{`WEEK ${p.week}`}</Text>
          <Text
            style={{
              fontSize: 15,
              color: defaultColors.textColorDefault,
              height: 30,
            }}
          >{`3/4 Days`}</Text>
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
              setSelectedPictureData(data[data.length - 1]);
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
        return <CompareScreen pose={pose} showCompare data={data} />;
      case Features.EDIT_POSE:
        return <View></View>;
      case Features.CHECKLIST_RESULT:
        return <View></View>;
      case Features.TRANSFORMATION_VIDEO:
        return <View></View>;
      case Features.VIEW_PHOTO:
        return (
          <ViewPhotoScreen
            withPose={withPoseActive}
            pose={pose}
            pictureData={selectedPictureData}
          />
        );
    }
    return <View></View>;
  };

  return (
    <View style={styles.container}>
      <BackButton onBack={onBack} />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <View style={styles.backButtonSpace} />
          <View style={styles.poseNameContainer}>
            <Text
              style={styles.poseNameText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {pose.name}
            </Text>
          </View>
          <View style={styles.backButtonSpace}>
            <IconButton onPress={() => {}} name="dots-vertical" size={25} />
          </View>
        </View>
        {activeScreen === null ? (
          data.length ? (
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
                    {getPicturesForWeek(formatPhotosToWeekArray(data)[0], true)}
                  </View>

                  <View
                    style={{
                      height: (photoGridContainerHeight / 3) * 2, // Adjusted height to match two rows
                      overflow: 'hidden',
                    }}
                  >
                    <ScrollView>
                      {formatPhotosToWeekArray(data).map(
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
            <View>
              <Text>No data</Text>
            </View>
          )
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
    zIndex: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  safeAreaView: {
    flex: 1,
    display: 'flex',
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
    bottom: 15,
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
  backButtonSpace: {
    width: '10%',
  },
  poseNameContainer: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poseNameText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: defaultColors.primary,
  },
  optionsContainer: { width: '10%' },
});
