import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const saveImageToDevice = async (
  image,
  setPoseCaptureImage,
  onNextCallback
) => {
  if (image) {
    try {
      const asset = await MediaLibrary.createAssetAsync(image);
      const album = await MediaLibrary.getAlbumAsync('now-and-then');
      if (album === null) {
        await MediaLibrary.createAlbumAsync('now-and-then', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
      }
      setPoseCaptureImage(image);
      onNextCallback();
      Alert.alert('Picture saved!', `Saved to ${asset.uri}`);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to save the picture.');
    }
  } else {
    Alert.alert(
      'Permissions not granted',
      'Cannot save picture without permissions.'
    );
  }
};
