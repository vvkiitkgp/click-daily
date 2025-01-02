// AppNavigator.tsx

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../components/Screens/HomeScreen';
import PoseHomeScreen from '../components/Screens/PoseHomeScreen';
import CreateNewPose from '../components/Screens/CreateNewPose';
import ClickTodayScreen from '../components/Screens/ClickTodayScreen';
import SignInScreen from '../components/Screens/SignInScreen';
import { User, UserContext, defaultUserContext } from '../contexts/UserContext';
import SignUpScreen from '../components/Screens/SignUpScreen';
import { View } from 'react-native';
import { PosesContext, defaultPosesContext } from '../contexts/PosesContext';
import { Pose } from '../types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Dev } from '../components/Screens/Dev';
import { AppContext } from '../contexts/AppContext';
import { getColors } from '../hooks/useTheme';

const Stack = createNativeStackNavigator();

export enum NavigationScreens {
  SIGN_IN_SCREEN = 'SIGN_IN_SCREEN',
  SIGN_UP_SCREEN = 'SIGN_UP_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  POSE_HOME_SCREEN = 'POSE_HOME_SCREEN',
  CREATE_NEW_POSE_SCREEN = 'CREATE_NEW_POSE_SCREEN',
  CLICK_TODAY_SCREEN = 'CLICK_TODAY_SCREEN',
  DEV = 'DEV'
}

const AppNavigator: React.FC = () => {
  const [user, setUser] = useState<User>(defaultUserContext.user);
  const [posesList, setPosesList] = useState<Pose[]>(
    defaultPosesContext.posesList
  );
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <AppContext.Provider value={{ setTheme, theme }}>
          <PosesContext.Provider value={{ posesList, setPosesList }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: getColors(theme).containerBackground }}>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={NavigationScreens.SIGN_IN_SCREEN}
                  screenOptions={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: '',
                    headerBackTitleVisible: false,
                  }}
                >
                  <Stack.Screen
                    name={NavigationScreens.DEV}
                    component={Dev}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name={NavigationScreens.POSE_HOME_SCREEN}
                    component={PoseHomeScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name={NavigationScreens.CREATE_NEW_POSE_SCREEN}
                    component={CreateNewPose}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name={NavigationScreens.HOME_SCREEN}
                    component={HomeScreen}
                    options={{
                      headerShown: false
                      // headerTitle: () => (
                      //   <View
                      //     style={{
                      //       width: 250,
                      //       height: 44,
                      //       backgroundColor: 'red',
                      //     }}
                      //   >
                      //     <Image
                      //       source={require('../../assets/images/Logo.png')}
                      //       style={{ flex: 1, width: '100%', height: '100%' }}
                      //       contentFit="contain"
                      //       cachePolicy="memory-disk"
                      //       transition={500}
                      //     />
                      //   </View>
                      // ),
                    }}
                  />
                  <Stack.Screen
                    name={NavigationScreens.CLICK_TODAY_SCREEN}
                    component={ClickTodayScreen}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name={NavigationScreens.SIGN_IN_SCREEN}
                    component={SignInScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name={NavigationScreens.SIGN_UP_SCREEN}
                    component={SignUpScreen}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </PosesContext.Provider>
        </AppContext.Provider>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
