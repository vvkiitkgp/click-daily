import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import { ChecklistItem, Pose } from '../../../types';
import { Fontisto, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Count from '../ui/Count';
import defaultColors from '../../../styles/colors';
import { Colors, useTheme } from '../../../hooks/useTheme';
import TextField from '../ui/TextField';
import { ActionButton } from '../ui/ActionButton';
import Divider from '../ui/Divider';

interface CheckListItemCardProps {
  item: ChecklistItem;
  onCheckCallback: (id: string) => void;
  onCountChangeCallack: (id: string, count: number) => void;
  isEdit: boolean;
  setIsEdit: (id: string) => void;
  onSaveCallback: (i: ChecklistItem) => void;
  onDeleteCallback: (i: ChecklistItem) => void;
  isDailyChecklist?: boolean;
}

const CheckListItemCard = ({
  isEdit,
  setIsEdit,
  item,
  onCheckCallback,
  onCountChangeCallack,
  onSaveCallback,
  onDeleteCallback,
  isDailyChecklist = false,
}: CheckListItemCardProps) => {
  const [editingMessage, setEditingMessage] = useState<string>(item.message);
  const { colors, styles: { textField: textFieldStyles } } = useTheme();
  const styles = getStyles(colors);

  const closeMenu = () => setIsEdit('');
  return (
    <View style={styles.container}>
      <View style={styles.leftAlign}>
        {item.type === 'checklist' ? (
          <CheckBox
            checked={item.isChecked}
            onPress={() => onCheckCallback(item.id)}
            size={25}
            containerStyle={{
              padding: 0,
              margin: 0,
              marginRight: -5,
              marginLeft: 0,
              borderWidth: 0,
            }}
            textStyle={{
              margin: 0,
              padding: 0,
            }}
          />
        ) : (
          <Count
            count={item.count}
            onCountChange={(count) => onCountChangeCallack(item.id, count)}
            size={20}
          />
        )}
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.rightAlign}>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            ...(isDailyChecklist ? { display: 'none' } : {}),
          }}
        >
          <View
            style={{
              marginLeft: 15,
              backgroundColor: '#E2F5F8',
              height: 26,
              width: 26,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 13
            }}
          >
            <FontAwesome5
              name="pen"
              size={12}
              color={colors.defaultText}
              onPress={() => {
                setIsEdit(item.id);
              }}
            />
          </View>
          <View
            style={{
              marginLeft: 15,
              backgroundColor: '#F8D3D3',
              height: 26,
              width: 26,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 13
            }}
          >
            <Fontisto
              name="trash"
              size={15}
              color={colors.defaultText}
              onPress={() => onDeleteCallback(item)}
            />
          </View>
        </View>
      </View>
      <Modal
        visible={isEdit}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu} // For Android back button handling
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => {
            setEditingMessage('');
            closeMenu()
          }}>
            <View style={styles.overlayContentContainer}>
              <Text style={styles.editOverlayHeading}>Checklist</Text>
              <Divider overrideStyles={{ marginVertical: 21 }} />
              <Text style={styles.textfieldOverlayHeading}>Enter Task</Text>
              <Input
                placeholder={"Enter task to do"}
                onChangeText={(text) => setEditingMessage(text)}
                value={editingMessage}
                multiline
                numberOfLines={3}
                inputContainerStyle={[textFieldStyles.textFieldContainer, styles.textFieldContainer]}
                inputStyle={textFieldStyles.text}
                placeholderTextColor={textFieldStyles.placeholderText.color}
                rightIcon={
                  <Fontisto
                    name="close"
                    size={18}
                    color={textFieldStyles.clearIcon.backgroundColor}
                    onPress={() => setEditingMessage('')}
                  />
                }
              />

            </View>
          </TouchableOpacity>
          <View style={styles.actionBarContainer}>
            <ActionButton variant='task' label='Add' onPress={() => {
              onSaveCallback({ ...item, message: editingMessage });
              closeMenu();
            }} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderBottomWidth: 5,
      borderColor: colors.solidBorder,
      borderRadius: 8,
      minHeight: 44,
      width: '100%',
      paddingHorizontal: 10
    },
    message: {
      color: colors.placeholderText,
      marginTop: 5,
      marginBottom: 5,
    },
    leftAlign: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '60%',
      paddingLeft: 5,
      marginTop: 2,
      marginBottom: 2,
      gap: 10
    },
    rightAlign: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '40%',
      paddingRight: 5,
      marginTop: 2,
      marginBottom: 2,
    },
    overlay: {
      flex: 0.9,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: colors.overlayBackground
    },
    overlayContentContainer: {
      backgroundColor: colors.containerBackground,
      height: 223,
      borderRadius: 16,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderColor: colors.solidBorder,
      borderWidth: 1,
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    editOverlayHeading: {
      fontSize: 18,
      fontWeight: '600',
    },
    textfieldOverlayHeading: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5
    },
    // overlay: {
    //   flex: 1,
    //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //   justifyContent: 'flex-end', // Align menu to the bottom of the screen
    // },
    textFieldContainer: {
      height: 100,
      alignItems: 'flex-start',
      width: '100%',

    },
    actionBarContainer: {
      flex: 0.1,
      borderTopColor: colors.solidBorder,
      borderTopWidth: 1,
      backgroundColor: colors.containerBackground,
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: 10
    },
  });

export default CheckListItemCard;
