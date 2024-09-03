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
import { Image, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export enum NavigationScreens {
  SIGN_IN_SCREEN = 'SIGN_IN_SCREEN',
  SIGN_UP_SCREEN = 'SIGN_UP_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  POSE_HOME_SCREEN = 'POSE_HOME_SCREEN',
  CREATE_NEW_POSE_SCREEN = 'CREATE_NEW_POSE_SCREEN',
  CLICK_TODAY_SCREEN = 'CLICK_TODAY_SCREEN',
}

const AppNavigator: React.FC = () => {
  const [user, setUser] = useState<User>(defaultUserContext.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
            name={NavigationScreens.HOME_SCREEN}
            component={HomeScreen}
            options={{
              headerTitle: () => (
                <View
                  style={{
                    width: 250,
                    height: 44,
                    backgroundColor: 'red',
                  }}
                >
                  <Image
                    source={require('../../assets/images/Logo.png')}
                    style={{ flex: 1, width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                </View>
              ),
            }}
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
            name={NavigationScreens.CLICK_TODAY_SCREEN}
            component={ClickTodayScreen}
          />

          <Stack.Screen
            name={NavigationScreens.SIGN_IN_SCREEN}
            component={SignInScreen}
          />
          <Stack.Screen
            name={NavigationScreens.SIGN_UP_SCREEN}
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default AppNavigator;
