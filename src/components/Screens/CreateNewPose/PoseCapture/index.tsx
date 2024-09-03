import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Svg, Path } from 'react-native-svg';
import * as MediaLibrary from 'expo-media-library';

import defaultColors from '../../../../styles/colors';
import { posesMock } from '../../../../mocks/databaseMocks';
import { PoseFilter } from '../../../Common/PoseParentCard/PoseFilter';
import { Fontisto } from '@expo/vector-icons';
import { GuideAlert } from '../../../Common/ui/GuideAlert';

interface Props {
  setPoseCaptureImage: (image: string) => void;
  onNextCallback: () => void;
  image: string | null;
}

export const PoseCapture = ({
  setPoseCaptureImage,
  onNextCallback,
  image,
}: Props) => {
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
      setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setPoseCaptureImage(data.uri); // Store the URI instead of the whole object
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <TouchableOpacity onPress={takePicture} style={styles.camera}>
          <GuideAlert message="Tap to Capture" />
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          />
        </TouchableOpacity>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBar: {
    position: 'absolute',
    flexDirection: 'row',
    top: 50,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cameraIconButton: {
    backgroundColor: defaultColors.buttonDefault,
    height: 70,
    width: 70,
    borderRadius: 25,
    borderWidth: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PoseCapture;
