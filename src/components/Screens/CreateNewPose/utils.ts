import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const saveImageToDevice = async (
//   image,
//   setPoseCaptureImage,
//   onNextCallback
// ) => {
//   if (image) {
//     try {
//       const asset = await MediaLibrary.createAssetAsync(image);
//       const album = await MediaLibrary.getAlbumAsync('now-and-then');
//       if (album === null) {
//         await MediaLibrary.createAlbumAsync('now-and-then', asset, false);
//       } else {
//         await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
//       }
//       setPoseCaptureImage(image);
//       onNextCallback();
//       Alert.alert('Picture saved!', `Saved to ${asset.uri}`);
//     } catch (e) {
//       console.error(e);
//       Alert.alert('Error', 'Failed to save the picture.');
//     }
//   } else {
//     Alert.alert(
//       'Permissions not granted',
//       'Cannot save picture without permissions.'
//     );
//   }
// };

export const saveImageToDevice = async (
  image,
  setPoseCaptureImage,
  onNextCallback
) => {
  if (!image) {
    Alert.alert('Error', 'No image found to save.');
    return null; // Ensure function returns null if no image
  }

  try {
    // Request media library permissions
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissions Denied', 'Cannot save image without permissions.');
      return null;
    }

    // Save image to device
    const asset = await MediaLibrary.createAssetAsync(image);
    let album = await MediaLibrary.getAlbumAsync('click-daily');

    if (!album) {
      album = await MediaLibrary.createAlbumAsync('click-daily', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
    }

    // Store saved image URI in state
    setPoseCaptureImage(asset.uri);

    // Proceed to next step
    onNextCallback();

    // Alert success
    Alert.alert('Picture Saved!', `Saved to ${asset.uri}`);

    return asset.uri; // Ensure function properly returns the saved URI
  } catch (error) {
    console.error('Error saving image:', error);
    Alert.alert('Error', 'Failed to save the picture.');
    return null;
  }
};


export const saveImageUriToStorage = async (imageUri: string) => {
  try {
    let storedImages = await AsyncStorage.getItem('savedImages');
    storedImages = storedImages ? JSON.parse(storedImages) : [];

    storedImages?.push(imageUri);
    await AsyncStorage.setItem('savedImages', JSON.stringify(storedImages));
  } catch (error) {
    console.error('Error storing image URI:', error);
  }
};


export const getCurrentTime = ()=>{
  const now = new Date();

const hours = now.getHours();
const minutes = now.getMinutes();


const currentDateWithTime = new Date();
currentDateWithTime.setHours(hours, minutes, 0, 0); 
return currentDateWithTime;
}