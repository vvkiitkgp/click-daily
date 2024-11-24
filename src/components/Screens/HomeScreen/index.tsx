import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { PoseParentCard } from '../../Common/PoseParentCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import defaultColors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { UserContext } from '../../../contexts/UserContext';
import { getAllPosesApi } from '../../../services/api';
import { Pose } from '../../../types';
import { PosesContext } from '../../../contexts/PosesContext';
import { useGetAllPoses } from './hooks/useGetAllPoses';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../Common/ui/Loader';

type AllPosesState = {
  data: Pose[] | null;
  loading: boolean;
  error: Error | null;
};

export const HomeScreen = () => {
  const navigate = useNavigation();
  const { user } = useContext(UserContext);

  const { posesList, setPosesList } = useContext(PosesContext);
  const { data, loading, error } = useGetAllPoses();

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
          backgroundColor: 'black',
        }}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loader />
          </View>
        ) : (
          <ScrollView style={{ marginTop: 20 }}>
            {posesList?.map((pose) => {
              return <PoseParentCard pose={pose} />;
            })}
          </ScrollView>
        )}

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
    bottom: 50,
    backgroundColor: defaultColors.buttonDefault,
  },
});

export default HomeScreen;
