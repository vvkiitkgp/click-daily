import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { TextStyle, ViewStyle } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';


export interface Colors {
    defaultText: string;
    secondaryText: string;
    placeholderText: string;
    primaryAction: string;
    secondaryAction: string;
    selectedAction: string;
    defaultAction: string;
    primaryActionShadow: string;
    secondaryActionShadow: string;
    selectedActionShadow: string;
    defaultActionShadow: string;
    containerBackground: string;
    defaultBorder: string;
    solidBorder: string;
    pendingBackground: string;
    successBackground: string;
    errorBackground: string;
    streakBackground: string;
    divider: string;
    overlayBackground: string;
}

export const getColors = (theme?: 'light' | 'dark'): Colors => {
    const lightTheme: Colors = {
        defaultText: '#000000',
        secondaryText: '#FFFFFF',
        placeholderText: '#8391A1',
        primaryAction: '#FFDC02',
        secondaryAction: '#FFFFFF',
        selectedAction: '#70CDDE',
        defaultAction: '#000000',
        primaryActionShadow: '#000000',
        secondaryActionShadow: '#000000',
        selectedActionShadow: '#000000',
        defaultActionShadow: '#70CDDE',
        containerBackground: '#FFFFFF',
        defaultBorder: '#000000',
        solidBorder: '#000000',
        pendingBackground: '#FFF199',
        successBackground: '#7CEEBE',
        errorBackground: 'red',
        streakBackground: '#EAF8FA',
        divider: '#8391A1',
        overlayBackground: 'rgba(0, 0, 0, 0.5)'
    }
    const darkTheme: Colors = {
        defaultText: '#FFFFFF',
        secondaryText: '#000000',
        placeholderText: '#8391A1',
        primaryAction: '#FFDC02',
        secondaryAction: '#FFFFFF',
        selectedAction: '#70CDDE',
        defaultAction: '#FFFFFF',
        primaryActionShadow: '#FFFFFF',
        secondaryActionShadow: '#545454',
        selectedActionShadow: '#FFFFFF',
        defaultActionShadow: '#70CDDE',
        containerBackground: '#000000',
        defaultBorder: '#545454',
        solidBorder: '#FFFFFF',
        pendingBackground: '#FFF199',
        successBackground: '#7CEEBE',
        errorBackground: 'red',
        streakBackground: '#EAF8FA',
        divider: '#D9D9D9',
        overlayBackground: 'rgba(255, 255, 255, 0.5)' // TODO: make it white
    }
    return theme === 'dark' ? darkTheme : lightTheme
}

interface StyleTypes {
    actionButton: {
        container: ViewStyle;
        text: TextStyle;
    };
    textField: {
        container: ViewStyle;
        text: TextStyle;
        placeholderText: TextStyle;
        headingText: TextStyle;
        headingContainer: ViewStyle;
        textFieldContainer: ViewStyle;
        clearIcon: ViewStyle;
    },
    timePickerStyles: {
        container: ViewStyle;
        headingContainer: ViewStyle;
        headingText: TextStyle;
        timePickerContainer: ViewStyle;
        contentText: TextStyle;
    },
    dropdownStyles: {
        container: ViewStyle;
        headingContainer: ViewStyle;
        headingText: TextStyle;
        dropdownContainer: ViewStyle;
        inputSearchStyle: TextStyle;
        placeholderStyle: TextStyle;
        selectedTextStyle: TextStyle;
    }
    backButtonStyles: {
        container: ViewStyle;
    },
    defaultSolidBorder: ViewStyle;
};

const getStyles = (colors: Colors, fonts: { regular: string; medium: string } | null): StyleTypes => {

    const displayCenter: ViewStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const defaultBorder: ViewStyle = {
        borderColor: colors.solidBorder,
        borderWidth: 1,
        borderBottomWidth: 5,
    }

    return ({
        actionButton: {
            container: {
                height: 37,
                paddingHorizontal: 20,
                // alignSelf: 'flex-start',
                ...displayCenter,
                flexDirection: 'row',
                gap: 5,
                backgroundColor: colors.defaultAction,
                borderRadius: 100,
                ...defaultBorder,
            },
            text: {
                fontSize: 16,
                color: colors.defaultText,
                fontFamily: fonts?.medium

            }
        },
        textField: {
            container: {
                height: 66,
                display: 'flex',
                gap: 4,
            },
            headingContainer: {
                width: '100%',
                paddingHorizontal: 10,
                height: 21,
            },
            textFieldContainer: {
                height: 41,
                backgroundColor: colors.containerBackground,
                ...defaultBorder,
                borderRadius: 8,
                ...displayCenter,
                paddingHorizontal: 10,

            },
            text: {
                fontSize: 16,
                color: colors.defaultText
            },
            placeholderText: {
                color: colors.placeholderText
            },
            headingText: {
                width: 'auto',
                height: 21,
                color: colors.defaultText,
                fontSize: 16, // TODO: add font family
            },
            clearIcon: {
                backgroundColor: colors.defaultText
            }
        },
        timePickerStyles: {
            container: {
                width: '100%',
                height: 132,
                display: 'flex',
                gap: 4,
                paddingHorizontal: 10,
            },
            headingContainer: {
                width: '100%',
                height: 21,
            },
            headingText: {
                width: 'auto',
                height: 21,
                color: colors.defaultText,
                fontSize: 16, // TODO: add font family
            },
            contentText: {
                color: colors.defaultText
            },
            timePickerContainer: {
                flex: 1,
                height: 107,
                width: '100%',
                backgroundColor: colors.containerBackground,
                ...defaultBorder,
                borderRadius: 8,
                ...displayCenter,
                overflow: 'hidden',

            },
        },
        dropdownStyles: {
            container: {
                height: 66,
                display: 'flex',
                gap: 4,
                paddingHorizontal: 10,
            },
            headingContainer: {
                width: '100%',
                height: 21,
            },
            headingText: {
                width: 'auto',
                height: 21,
                color: colors.defaultText,
                fontSize: 16, // TODO: add font family
            },
            dropdownContainer: {
                height: 40,
                ...defaultBorder,
                borderRadius: 8,
                backgroundColor: colors.containerBackground,
                paddingHorizontal: 8,
                width: '100%',
            },
            inputSearchStyle: {
                height: 40,
                fontSize: 16,
                borderColor: colors.solidBorder,
                borderRadius: 5,
                color: colors.defaultText,
                backgroundColor: colors.containerBackground,
            },
            placeholderStyle: {
                fontSize: 16,
                color: colors.placeholderText,
            },
            selectedTextStyle: {
                fontSize: 16,
                color: colors.defaultText,
            },
        },
        backButtonStyles: {
            container: {
                ...defaultBorder,
                height: 40,
                width: 40,
                position: 'absolute',
                top: 0,
                left: 10,
                zIndex: 9999,
                ...displayCenter,
                borderRadius: 8,
                backgroundColor: colors.containerBackground
            }
        },
        defaultSolidBorder: {
            ...defaultBorder,
            borderRadius: 8
        }
    })

}
export const useTheme = (): { styles: StyleTypes, setTheme: (t: 'light' | 'dark') => void, colors: Colors } => {
    const { theme, setTheme } = useContext(AppContext);
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
    });
    const colors = getColors(theme);
    if (!fontsLoaded) {
        return { styles: getStyles(colors, null), setTheme, colors }
    }

    const fonts = {
        regular: 'Roboto_400Regular',
        medium: 'Roboto_500Medium',
    };

    const styles = getStyles(colors, fonts)

    return { styles, setTheme, colors }
}