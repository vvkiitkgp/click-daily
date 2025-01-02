import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import defaultColors from '../../../../styles/colors';
import { Svg, Path as SVGPath } from 'react-native-svg';
import { Slider } from '@rneui/themed';
import { GuideAlert } from '../../../Common/ui/GuideAlert';
import { Path, Pose } from '../../../../types';
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface Props {
    image: string;
    createdPose: Pose;
    setCreatedPose: (p: Pose) => void;
    penThickness: number;
    setPenThickness: (p: number) => void;
}

export const PoseDraw = ({
    image,
    createdPose,
    setCreatedPose,
    penThickness,
    setPenThickness,
}: Props) => {
    const { paths } = createdPose;
    const [currentPath, setCurrentPath] = useState<Path | undefined>({
        d: [],
        penThickness,
    });

    const onTouchEnd = () => {
        const tempPosePaths = paths;
        if (currentPath) {
            tempPosePaths.push(currentPath);
        }
        setCreatedPose({ ...createdPose, paths: tempPosePaths });
        setCurrentPath(undefined);
    };

    const onTouchMove = (event: GestureResponderEvent) => {
        const newPath = currentPath?.d ?? [];
        const locationX = event.nativeEvent.locationX;
        const locationY = event.nativeEvent.locationY;
        const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(
            0
        )},${locationY.toFixed(0)} `;
        newPath.push(newPoint);
        setCurrentPath({ d: newPath, penThickness });
    };

    const handleClearButtonClick = () => {
        setCreatedPose({ ...createdPose, paths: [] });
        setCurrentPath({ d: [], penThickness });
    };

    const onUndo = () => {
        let tempPaths = createdPose.paths;
        tempPaths.pop();
        setCreatedPose({ ...createdPose, paths: tempPaths });
    };

    return (
        <View style={styles.container}>
            <GuideAlert message="Draw your pose!" />
            <View>
                <View
                    style={styles.svgContainer}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <Svg>
                        {paths.map((p, index) => {
                            return (
                                <SVGPath
                                    key={`path-${index}`}
                                    d={currentPath?.d?.join('') ?? ''}
                                    stroke={defaultColors.primary}
                                    fill={'transparent'}
                                    strokeWidth={penThickness}
                                    strokeLinejoin={'round'}
                                    strokeLinecap="round"
                                />
                            );
                        })}
                        {paths.map((p, index) => {
                            return (
                                <SVGPath
                                    key={`path-${index}`}
                                    d={p.d?.join('') ?? ''}
                                    stroke={defaultColors.primary}
                                    fill={'transparent'}
                                    strokeWidth={p.penThickness}
                                    strokeLinejoin={'round'}
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </Svg>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
            </View>

            {/* Vertical Toolbar */}
            <View style={styles.verticalToolbar}>
                <Fontisto
                    name="undo"
                    size={15}
                    color="white"
                    style={styles.toolbarIcon}
                    onPress={onUndo}
                />
                <Fontisto
                    name="close"
                    size={15}
                    color="white"
                    style={styles.toolbarIcon}
                    onPress={handleClearButtonClick}
                />
                <Slider
                    value={penThickness}
                    onValueChange={(e) => setPenThickness(e)}
                    maximumValue={10}
                    minimumValue={1}
                    step={1}
                    orientation="vertical"
                    allowTouchTrack
                    trackStyle={styles.sliderTrackStyle}
                    thumbStyle={styles.sliderThumbStyle}
                />
                <View>
                    <FontAwesome5
                        name="pen"
                        size={15}
                        color="white"
                        style={{ ...styles.toolbarIcon, backgroundColor: 'none' }}
                    />
                    <View style={{ ...styles.penThicknessIndicator, height: penThickness + 1 }} />
                </View>



            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    svgContainer: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        zIndex: 1,
        backgroundColor: 'black',
    },
    image: {
        height: '100%',
        width: '100%',
        zIndex: 1,
    },
    verticalToolbar: {
        position: 'absolute',
        top: 5,
        right: 20,
        width: 40,
        backgroundColor: defaultColors.backgroundDarkTransparent,
        borderRadius: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.9,
        zIndex: 999
    },
    toolbarIcon: {
        marginVertical: 10,
        backgroundColor: defaultColors.buttonDefault,
        padding: 5,
        borderRadius: 15,
    },
    sliderTrackStyle: {
        width: 5,
        height: 100,
        backgroundColor: '#555',
    },
    sliderThumbStyle: {
        height: 20,
        width: 20,
        backgroundColor: defaultColors.buttonDefault,
    },
    penThicknessIndicator: {
        width: 25,
        marginTop: -5,
        backgroundColor: defaultColors.buttonDefault
    }
});

export default PoseDraw;
