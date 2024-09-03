import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import defaultColors from '../../../styles/colors';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
export const SignUpScreen = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigation();

  const resetForm = () => {
    setUserName('');
    setPassword('');
    setConfirmPassword('');
  };

  const onSignUp = () => {
    resetForm();
    navigate.navigate(NavigationScreens.HOME_SCREEN as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.SignUpBox}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Create New Account</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            label={'Username'}
            style={styles.input}
            onChangeText={setUserName}
            value={userName}
            placeholder="Enter text here"
          />
          <TextInput
            label={'Password'}
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter text here"
          />
          <TextInput
            label={'Confirm Password'}
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Enter text here"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
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
  SignUpBox: {
    height: 500,
    width: 300,
    backgroundColor: defaultColors.backgroundWhite,
    display: 'flex',
  },
  formContainer: {
    display: 'flex',
    marginTop: 50,
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: defaultColors.secondary,
  },
  heading: {
    fontSize: 20,
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
    position: 'absolute',
    bottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: defaultColors.secondary,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
