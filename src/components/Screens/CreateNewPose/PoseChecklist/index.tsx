import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SortabelList from 'react-native-sortable-list';
import defaultColors from '../../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';
import { ChecklistItem, Pose } from '../../../../types';
import { PoseParentCard } from '../../../Common/PoseParentCard';
import CheckListItemCard from '../../../Common/CheckListItemCard';
import Button from '../../../Common/ui/Button';

interface PoseChecklistProp {
  createdPose: Pose;
  setCreatedPose: (p: Pose) => void;
}
export const PoseChecklist = ({
  createdPose,
  setCreatedPose,
}: PoseChecklistProp) => {
  const [isEditItemId, setIsEditItemId] = useState<string>();
  const [isSorting, setIsSorting] = useState(false);

  // TODO Check on Sorting is it
  const onChange = (nextOrder: number[]) => {
    // ASSIGN INDEXES ACCORDINGLY

    let tempCheckList = createdPose.checklist;
    tempCheckList = tempCheckList.map((item, index) => {
      item.index = nextOrder[index];
      return item;
    });
    // then sort the array with indexes

    tempCheckList.sort((a, b) => a.index - b.index);
    setCreatedPose({ ...createdPose, checklist: tempCheckList });
  };

  const onCheck = (id: string) => {
    let tempCheckList = createdPose.checklist;
    tempCheckList.forEach((item, index) => {
      if (item.id === id) {
        tempCheckList[index].isChecked = !tempCheckList[index].isChecked;
      }
    });
    setCreatedPose({ ...createdPose, checklist: tempCheckList });
  };

  const onCountChange = (id: string, count: number) => {
    let tempCheckList = createdPose.checklist;
    tempCheckList.forEach((item, index) => {
      if (item.id === id) {
        tempCheckList[index].count = count;
      }
    });
    setCreatedPose({ ...createdPose, checklist: tempCheckList });
  };

  const onAddNewCheckListItem = () => {
    let tempCheckList = createdPose.checklist;
    const randId = Math.floor(1000 + Math.random() * 9000).toString();

    setIsEditItemId(randId);
    setCreatedPose({
      ...createdPose,
      checklist: [
        ...tempCheckList,
        {
          id: randId,
          count: 0,
          index: tempCheckList.length,
          isChecked: false,
          message: '',
          type: 'checklist',
        },
      ],
    });
  };

  const onAddCountItem = () => {
    let tempCheckList = createdPose.checklist;
    const randId = Math.floor(1000 + Math.random() * 9000).toString();
    setIsEditItemId(randId);
    setCreatedPose({
      ...createdPose,
      checklist: [
        ...tempCheckList,
        {
          id: randId,
          count: 0,
          index: tempCheckList.length,
          isChecked: false,
          message: '',
          type: 'count',
        },
      ],
    });
  };

  const onSave = (item: ChecklistItem) => {
    const tempCheckList = createdPose.checklist.map((l) =>
      l.id === item.id ? item : l
    );
    setCreatedPose({
      ...createdPose,
      checklist: tempCheckList,
    });
    setIsEditItemId(undefined);
  };

  const onDelete = (item: ChecklistItem) => {
    let tempCheckList = createdPose.checklist.filter((l) => l.id !== item.id);
    tempCheckList = tempCheckList.map((l, index) => ({ ...l, index }));
    setCreatedPose({
      ...createdPose,
      checklist: tempCheckList,
    });
    setIsEditItemId(undefined);
  };

  return (
    <ScrollView scrollEnabled={!isSorting}>
      <View style={styles.container}>
        <View pointerEvents="none">
          <PoseParentCard pose={createdPose} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.heading}>Create Your Daily Checklist!</Text>
        </View>
        <View style={styles.sortableContainer}>
          <SortabelList
            key={createdPose.checklist.length}
            data={createdPose.checklist}
            onActivateRow={() => setIsSorting(true)}
            onReleaseRow={() => setIsSorting(false)}
            renderRow={({ key, index, data, disabled, active }) => (
              <CheckListItemCard
                isEdit={data.id === isEditItemId}
                setIsEdit={setIsEditItemId}
                item={data}
                onCheckCallback={onCheck}
                onCountChangeCallack={onCountChange}
                onSaveCallback={onSave}
                onDeleteCallback={onDelete}
              />
            )}
            // onChangeOrder={onChange}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            name="Check list"
            onPress={onAddNewCheckListItem}
            width={105}
            leftIcon="plus-a"
          />
          <Button
            name="Count"
            leftIcon="plus-a"
            width={100}
            onPress={onAddCountItem}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    alignItems: 'center',
  },
  nameContainer: {
    marginTop: 20,
    width: 350,
  },
  heading: {
    fontSize: 40,
    fontStyle: 'italic',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: defaultColors.primary,
  },
  sortableContainer: {
    width: '100%',
    marginTop: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
