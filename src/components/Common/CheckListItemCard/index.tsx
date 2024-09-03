import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import { ChecklistItem, Pose } from '../../../types';
import { Fontisto, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Count from '../ui/Count';
import defaultColors from '../../../styles/colors';

interface CheckListItemCardProps {
  item: ChecklistItem;
  onCheckCallback: (id: string) => void;
  onCountChangeCallack: (id: string, count: number) => void;
  isEdit: boolean;
  setIsEdit: (id: string) => void;
  onSaveCallback: (i: ChecklistItem) => void;
  onDeleteCallback: (i: ChecklistItem) => void;
}

const CheckListItemCard = ({
  isEdit,
  setIsEdit,
  item,
  onCheckCallback,
  onCountChangeCallack,
  onSaveCallback,
  onDeleteCallback,
}: CheckListItemCardProps) => {
  const [editingMessage, setEditingMessage] = useState<string>(item.message);
  return (
    <View style={styles.container}>
      <View style={styles.leftAlign}>
        <View style={{ marginRight: 5 }}>
          {isEdit ? (
            <Fontisto
              name="close"
              size={15}
              color={'red'}
              onPress={() => onDeleteCallback(item)}
            />
          ) : (
            <MaterialIcons
              name="drag-indicator"
              size={25}
              color={defaultColors.iconColorDefault}
            />
          )}
        </View>
        {isEdit ? (
          <Input
            placeholder="Type here..."
            onChangeText={(text) => setEditingMessage(text)}
            value={editingMessage}
            inputStyle={{
              color: defaultColors.textColorDefault,
            }}
            rightIcon={
              <Fontisto
                name="close"
                size={15}
                color={'white'}
                onPress={() => setEditingMessage('')}
              />
            }
          />
        ) : (
          <Text style={styles.message}>{item.message}</Text>
        )}
      </View>
      <View style={styles.rightAlign}>
        {isEdit ? (
          <Fontisto
            name="check"
            size={15}
            color={'white'}
            onPress={() => onSaveCallback({ ...item, message: editingMessage })}
          />
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {item.type === 'checklist' ? (
              <CheckBox
                checked={item.isChecked}
                onPress={() => onCheckCallback(item.id)}
              />
            ) : (
              <Count
                count={item.count}
                onCountChange={(count) => onCountChangeCallack(item.id, count)}
                size={20}
              />
            )}
            <View style={{ marginLeft: 15 }}>
              <FontAwesome5
                name="pen"
                size={15}
                color={'white'}
                onPress={() => setIsEdit(item.id)}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
    width: '100%',
    minHeight: 50,
    marginBottom: 20,
  },
  message: {
    color: defaultColors.textColorDefault,
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
});

export default CheckListItemCard;
