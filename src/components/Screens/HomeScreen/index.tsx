import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { PoseParentCard } from '../../Common/PoseParentCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import defaultColors from '../../../styles/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { UserContext } from '../../../contexts/UserContext';
import { getAllPosesApi } from '../../../services/api';
import { Pose } from '../../../types';
import { PosesContext } from '../../../contexts/PosesContext';
import { useGetAllPoses } from './hooks/useGetAllPoses';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../Common/ui/Loader';
import { Colors, useTheme } from '../../../hooks/useTheme';
import ProfileCardMini from '../../Common/ProfileCardMini';
import { getSavedImages } from './utils';
import { Image } from 'expo-image';
import * as MediaLibrary from "expo-media-library";
import { Button } from 'react-native-elements';


type AllPosesState = {
  data: Pose[] | null;
  loading: boolean;
  error: Error | null;
};

export const HomeScreen = () => {
  const navigate = useNavigation();
  const { user } = useContext(UserContext);

  const { posesList, setPosesList } = useContext(PosesContext);
  const { data, loading, error, refetch } = useGetAllPoses();

  const { colors } = useTheme()
  const styles = getStyles(colors);
  // Refetch poses when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (data) {
      setPosesList(data);
    }
  }, [data, setPosesList]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: colors.containerBackground,
        }}
      >
        <ScrollView style={styles.scrollableContainer}>
          <View>
            <View style={styles.profileCardContainer}>
              <ProfileCardMini />
            </View>
            <Text style={styles.activityText}>Activity</Text>
            <View style={styles.posesListContainer}>
              {posesList.length ? posesList?.map((pose) => {
                return <PoseParentCard pose={pose} />;
              }) : <View style={{ marginTop: 16 }}><Text style={{ fontSize: 20 }}>Create your first pose!</Text></View>}
              <View style={{ height: 200 }} />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.createNewPoseFab}
          onPress={() => {
            navigate.navigate(
              NavigationScreens.CREATE_NEW_POSE_SCREEN as never
            );
          }}
        >
          <Text style={{ fontSize: 15 }}>Create New Pose +</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  createNewPoseFab: {
    height: 50,
    width: 170,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    right: 10,
    bottom: 50,
    backgroundColor: defaultColors.buttonDefault,
  },
  activityText: {
    fontSize: 24,
    color: colors.defaultText
  },
  posesListContainer: {

  },
  scrollableContainer: {
    marginTop: 20,
    paddingHorizontal: 15
  },
  profileCardContainer: {
    marginBottom: 10
  }
});

export default HomeScreen;
