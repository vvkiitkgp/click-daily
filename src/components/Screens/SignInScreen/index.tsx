import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import defaultColors from '../../../styles/colors';
import { IconButton, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { Divider } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons';
import Button from '../../Common/ui/Button';
import { OtpInput } from 'react-native-otp-entry';
// import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";

// API Client
import axios from 'axios';
import Dropdown from '../../Common/ui/Dropdown';
import TextField from '../../Common/ui/TextField';
import Loader from '../../Common/ui/Loader';
import { BackButton } from '../../Common/ui/IconButton/BackButton';
import { Colors, useTheme } from '../../../hooks/useTheme';
// import IconButton from '../../Common/ui/IconButton';

export const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otpValue, setOtpValue] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();
  const navigate = useNavigation();
  const [isOtpScreen, seIsOtpScreen] = useState(false);
  // const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult>()

  const { colors } = useTheme()
  const otpInputRef = useRef(null);

  const handleAlertMessage = (message: string, type = 'error') => {
    setAlertMessage(message);
    setMessageType(type);
  };

  const onSignUp = () => {
    navigate.navigate(NavigationScreens.SIGN_UP_SCREEN as never);
  };

  const onSignIn = () => {
    // disabling sign in with hard code .. remove this in future
    confirmCode()
    // navigate.navigate(NavigationScreens.HOME_SCREEN as never);
  };

  const onSendOtp = () => {
    navigate.navigate(NavigationScreens.HOME_SCREEN as never);
    // signInWithPhoneNumber();
  };

  const onBack = () => {
    otpInputRef?.current?.clear();
    seIsOtpScreen(false);
  };

  const styles = getStyles(colors)


  const signInWithPhoneNumber = async () => {
    // try {
    //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //   // setConfirm(confirmation);
    //   // seIsOtpScreen(true);
    //   console.log(confirmation, "CONFIRMATION")
    // } catch (error) {
    //   console.log("Error senig code:", error)
    // }
  }

  const confirmCode = async () => {
    // try {

    //   const userCredential = await confirm?.confirm(otpValue);
    //   const user = userCredential?.user;
    //   if (user) {
    //     // const userDocument = await firestore().collection("users").doc(user.uid).get();

    //     // if (userDocument.exists) {
    //     //   // Already existing user
    //     //   // Navigate to home screen
    //     //   navigate.navigate(NavigationScreens.HOME_SCREEN as never);
    //     // } else {
    //     //   // New user, navigate to sign up screen
    //     // }
    //     console.log("Valid user", user)
    //   } else {
    //     console.log("Invalid user:")
    //   }
    // } catch (error) {
    //   console.log("Invalid code:", error)
    // }
  }
  return (
    <View style={styles.container}>
      {isOtpScreen && <BackButton onBack={onBack} />}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {isOtpScreen ? 'Enter OTP!' : 'Enter Your Mobile Number!'}
        </Text>
      </View>
      {isOtpScreen ? (
        <View style={styles.otpContainer}>
          <OtpInput
            ref={otpInputRef}
            numberOfDigits={6}
            onTextChange={(text) => setOtpValue(text)}
            focusColor={defaultColors.textColorPrimary}
            focusStickBlinkingDuration={500}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              pinCodeContainerStyle: {
                borderColor: defaultColors.borderPrimary,
              },
              pinCodeTextStyle: { color: defaultColors.textColorDefault },
              // containerStyle: styles.container,
              // focusStickStyle: styles.focusStick,
              // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
        </View>
      ) : (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={styles.dropdownContainer}>
            <Dropdown
              items={[
                { label: 'India (+91)', value: '+91' },
                { label: 'India (+91)', value: '+91' },
                { label: 'India (+91)', value: '+91' },
                { label: 'India (+91)', value: '+91' },
                { label: 'India (+91)', value: '+91' },
                { label: 'India (+91)', value: '+91' },
                { label: 'India (+91)', value: '+91' },
              ]}
              value=""
              setValue={() => { }}
              placeholder="Choose Country"
              label='Country'
              search
            />
          </View>
          <View style={styles.textFieldContainer}>
            <TextField
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter Phone number"
              keyboardType="numeric"
            />
          </View>
        </View>
      )}

      {isOtpScreen ? (
        <Button name="Sign In" onPress={onSignIn} primary />
      ) : (
        <Button name="Send OTP" onPress={onSendOtp} primary />
      )}
    </View>
  );
};


const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    // justifyContent: 'center',
    backgroundColor: colors.containerBackground,
    alignItems: 'center',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 20,
  },
  headingContainer: {
    marginTop: 150,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 40,
    fontStyle: 'italic',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: defaultColors.primary,
  },
  dropdownContainer: {
    marginTop: 100,
    width: '70%',
    marginBottom: 30,
  },
  textFieldContainer: {
    width: '70%',
    marginVertical: 20,
  },
  otpContainer: {
    width: '80%',
    marginVertical: 100,
  },
});


export default SignInScreen;
