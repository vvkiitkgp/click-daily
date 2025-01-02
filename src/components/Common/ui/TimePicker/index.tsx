import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTheme } from '../../../../hooks/useTheme';

interface TimePickerProps {
    time: Date;
    setTime: (d: Date) => void;
}
const TimePicker = ({ time, setTime }: TimePickerProps) => {
    const [showPicker, setShowPicker] = useState(false);

    const {
        styles: { timePickerStyles },
    } = useTheme();

    const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (event.type === 'set' && selectedTime) {
            setTime(selectedTime);
        }
        setShowPicker(false);
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };


    return (
        <View style={timePickerStyles.container}>
            <View style={timePickerStyles.headingContainer}>
                <Text style={timePickerStyles.headingText}>Set Reminder</Text>
            </View>
            <View style={timePickerStyles.timePickerContainer}>
                {Platform.OS === 'android' ? (
                    <>
                        <Text style={[timePickerStyles.contentText, { fontSize: 30 }]} onPress={() => setShowPicker(true)}>
                            {formatTime(time)}
                        </Text>
                        {showPicker && <DateTimePicker
                            value={time}
                            mode="time"
                            display="inline"
                            // is24Hour={false}
                            onChange={handleTimeChange}
                            textColor={timePickerStyles.contentText.color as string}
                        />}

                    </>

                ) : (<DateTimePicker
                    value={time}
                    mode="time"
                    display="spinner"
                    // is24Hour={false}
                    onChange={handleTimeChange}
                    textColor={timePickerStyles.contentText.color as string}
                />)}
            </View>
        </View>
    );
};

export default TimePicker;
