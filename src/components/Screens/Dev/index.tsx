import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionButton } from '../../Common/ui/ActionButton';
import { Fontisto } from '@expo/vector-icons';
import TextField from '../../Common/ui/TextField';
import TimePicker from '../../Common/ui/TimePicker';
import { useTheme } from '../../../hooks/useTheme';
import { AppContext } from '../../../contexts/AppContext';
import Dropdown from '../../Common/ui/Dropdown';
import { PhotoCard } from '../CreateNewPose/common/PhotoCard';

export const Dev = () => {
    const [time, setTime] = useState<Date>(new Date());
    const [value, setValue] = useState<string>();
    const { theme } = useContext(AppContext);
    const { setTheme, colors } = useTheme();
    return (
        <View style={{ display: 'flex', flexDirection: 'column', }}>
            <Text>This is dev</Text>
            <TimePicker time={time} setTime={setTime} />
            <Dropdown
                items={[{ label: 'hi', value: 'hi' }, { label: 'hi1', value: 'hi1' }, { label: 'hi2', value: 'hi2' }, { label: 'hi3', value: 'hi3' }]}
                value={value}
                setValue={setValue}
                placeholder='Select Duration to Take a Snap'
                label='Duration'
            />



            <TouchableOpacity
                onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{
                    height: 40,
                    width: 60,
                    backgroundColor: colors.containerBackground,
                    borderColor: colors.solidBorder,
                    borderWidth: 1,
                    position: 'relative',
                    top: 500
                }}
            >
                <Text style={{ color: colors.defaultText }}>
                    {theme === 'dark' ? 'DARK' : 'LIGHT'}
                </Text>
            </TouchableOpacity>
            <ActionButton variant='primary' label='Next' />
            <PhotoCard />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
    },
});
