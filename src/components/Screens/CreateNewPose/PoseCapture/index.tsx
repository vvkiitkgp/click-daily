import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import {
  CameraView,
  Camera,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import defaultColors from '../../../../styles/colors';
import { GuideAlert } from '../../../Common/ui/GuideAlert';
import { Button } from 'react-native-elements';
import { PoseFilter } from '../../ClickTodayScreen/PoseFilter';
import { Pose } from '../../../../types';

interface Props {
  setPoseCaptureImage: (image: string) => void;
  onNextCallback: () => void;
  image: string | null;
  pose?: Pose;
  enableFilter: boolean;
}

export const PoseCapture = ({
  setPoseCaptureImage,
  onNextCallback,
  image,
  pose,
  enableFilter,
}: Props) => {
  // const [hasCameraPermission, setHasCameraPermission] =
  //   useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>(false);

  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const permissionCheck = async () => {
      const { status: currentStatus } =
        await MediaLibrary.getPermissionsAsync();
      setHasMediaLibraryPermission(currentStatus === 'granted');
    };
    permissionCheck();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <Text>No access to camera</Text>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!hasMediaLibraryPermission) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your Media Permission</Text>
        <Button
          onPress={async () => {
            const { status: mediaLibraryStatus } =
              await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
          }}
          title="grant permission"
        />
      </View>
    );
  }

  // useEffect(() => {
  //   (async () => {
  //     // const { status: cameraStatus } =
  //     //   await Camera.requestCameraPermissionsAsync();
  //     const { status: mediaLibraryStatus } =
  //       await MediaLibrary.requestPermissionsAsync();
  //     // setHasCameraPermission(cameraStatus === 'granted');
  //     setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
  //   })();
  // }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      console.log('takingg pic');
      try {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const data = await cameraRef.current.takePictureAsync(options);

        console.log(data, 'Captured Image Data');
        if (data) {
          setPoseCaptureImage(data.uri);
        }
      } catch (e) {
        console.log('Error taking picture:', e);
      }
    }
  };

  function toggleCameraFacing() {
    console.log('flipping cam', facing);
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <View style={styles.cameraWrapper}>
          <CameraView
            style={styles.camera}
            facing={facing}
            flash={flash}
            ref={cameraRef}
          />
          {/* <CameraView style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView> */}
          {enableFilter && pose && (
            <View style={styles.poseFilterContainer}>
              <PoseFilter paths={pose.paths} />
            </View>
          )}

          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <GuideAlert message="Tap to Capture" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {enableFilter && pose && (
            <View style={styles.poseFilterContainer}>
              <PoseFilter paths={pose.paths} />
            </View>
          )}
          <Image source={{ uri: image }} style={styles.camera} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  captureButton: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: defaultColors.buttonDefault,
    padding: 15,
    borderRadius: 50,
    zIndex: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  poseFilterContainer: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
});

export default PoseCapture;
