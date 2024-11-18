import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import defaultColors from '../../../styles/colors';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { Divider } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons';
import Button from '../../Common/ui/Button';

// API Client
import axios from 'axios';

export const SignInScreen = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();
  const navigate = useNavigation();

  const handleAlertMessage = (message: string, type = 'error') => {
    setAlertMessage(message);
    setMessageType(type);
  };

  const resetForm = () => {
    setUserName('');
    setPassword('');
  };

  const onSignUp = () => {
    resetForm();
    navigate.navigate(NavigationScreens.SIGN_UP_SCREEN as never);
  };

  const onSignIn = () => {
    // disabling sign in with hard code .. remove this in future
    navigate.navigate(NavigationScreens.HOME_SCREEN as never);

    const url = 'http://localhost:3000/user/signin';
    axios
      .post(url, { email: userName, password })
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        if (status === 'SUCCESS') {
          resetForm();
          navigate.navigate(NavigationScreens.HOME_SCREEN as never);
          setAlertMessage(message);
        }
      })
      .catch((err) => {
        console.log(err.JSON());
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.SignInBox}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Sign In</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            autoCapitalize="none"
            label={'Username'}
            style={styles.input}
            onChangeText={setUserName}
            value={userName}
            placeholder="Enter text here"
          />
          <TextInput
            autoCapitalize="none"
            label={'Password'}
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter text here"
          />
          <View style={styles.buttonContainer}>
            <Button primary onPress={onSignIn} name="Sign In" />
            <Button
              secondary
              onPress={onSignIn}
              leftIcon="google"
              name="Sign In with Google"
            />
            <TouchableOpacity style={styles.signUputton} onPress={onSignUp}>
              <Text>Create New Account?</Text>
            </TouchableOpacity>
          </View>
          {alertMessage && <Text>{alertMessage}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignInBox: {
    width: 300,
    backgroundColor: defaultColors.backgroundWhite,
    display: 'flex',
    borderRadius: 30,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: defaultColors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heading: {
    fontSize: 30,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 20,
  },
  buttonContainer: {
    width: 300,
    bottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    minHeight: 50,
    width: 200,
    backgroundColor: defaultColors.secondary,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  signUputton: {
    height: 30,
    width: 200,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
