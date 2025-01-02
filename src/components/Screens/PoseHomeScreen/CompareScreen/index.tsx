import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import defaultColors from '../../../../styles/colors';
import Dropdown from './Dropdown';
import { Picture } from '../../../../types';
import { getDropdownItems } from '../utils';
import { Image } from 'expo-image';

interface CompareScreenProps {
  data: Picture[];
}
export const CompareScreen = ({ data }: CompareScreenProps) => {
  const [value, setValue] = useState(0);
  const [firstPicture, setFirstPicture] = useState<Picture | undefined>(
    data[0]
  );
  const [secondPicture, setSecondPicture] = useState<Picture | undefined>(
    data[data.length - 1]
  );

  const dropdownItems = getDropdownItems(data);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.dropdownContainer}>
        <Dropdown
          data={dropdownItems}
          value={firstPicture?.pictureId ?? ''}
          setValue={(v) => setFirstPicture(data.find((d) => d.pictureId === v))}
        />
        <Dropdown
          data={dropdownItems}
          value={secondPicture?.pictureId ?? ''}
          setValue={(v) =>
            setSecondPicture(data.find((d) => d.pictureId === v))
          }
        />
      </View>
      <View style={{ backgroundColor: 'white', height: '50%' }}>
        <View
          style={{
            ...styles.imageContainer,
            left: value,
          }}
        >
          <Image
            source={{
              uri: firstPicture?.picture,
            }}
            style={styles.image}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={500}
          />
        </View>
        <View
          style={{
            ...styles.imageContainer,
            right: value,
          }}
        >
          <Image
            source={{
              uri: secondPicture?.picture,
            }}
            style={{ ...styles.image, opacity: 0.6 }}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={500}
          />
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={150}
          step={10}
          value={value}
          onValueChange={(val) => setValue(val)}
          minimumTrackTintColor={defaultColors.primary}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor={defaultColors.primary}
        />
      </View>
    </View>
  );
};

export default CompareScreen;

const styles = StyleSheet.create({
  dropdownContainer: {
    height: '20%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  sliderContainer: { height: '10%', justifyContent: 'center' },
  slider: {
    width: '100%',
    height: 40,
  },
  imageContainer: {
    height: '100%',
    width: '50%',
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
