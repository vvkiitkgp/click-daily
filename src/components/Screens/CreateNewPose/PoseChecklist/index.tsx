import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SortabelList from 'react-native-sortable-list';
import defaultColors from '../../../../styles/colors';
import { Fontisto } from '@expo/vector-icons';
import { ChecklistItem, Pose } from '../../../../types';
import { PoseParentCard } from '../../../Common/PoseParentCard';
import CheckListItemCard from '../../../Common/CheckListItemCard';
import Button from '../../../Common/ui/Button';
import { PhotoCard } from '../common/PhotoCard';
import { Colors, useTheme } from '../../../../hooks/useTheme';
import { ActionButton } from '../../../Common/ui/ActionButton';
import Divider from '../../../Common/ui/Divider';

interface PoseChecklistProp {
  createdPose: Pose;
  setCreatedPose: (p: Pose) => void;
  image: string | null
}
export const PoseChecklist = ({
  createdPose,
  setCreatedPose,
  image
}: PoseChecklistProp) => {
  const [isEditItemId, setIsEditItemId] = useState<string>();
  const [isSorting, setIsSorting] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const { colors } = useTheme();
  const styles = getStyles(colors)

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

  // const handleScrollToEnd = () => {
  //   scrollViewRef.current?.scrollToEnd({ animated: true });
  // };

  const handleScrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: 9999, // A large value to ensure it scrolls to the very end
        animated: true,
      });
    }, 100); // Ensure content has rendered
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
    handleScrollToEnd()
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
    handleScrollToEnd()
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
    <ScrollView ref={scrollViewRef} scrollEnabled={!isSorting} >
      <View style={styles.container}>
        <PhotoCard photoUrl={image} />
        <Divider overrideStyles={{ width: '90%', marginVertical: 21 }} />
        <Text style={styles.heading}>Create Checklist</Text>
        <View style={styles.buttonContainer}>
          <ActionButton variant='default' label='Checklist' onPress={onAddNewCheckListItem} leftIcon={<Fontisto name='plus-a' color={colors.containerBackground} />} />
          <ActionButton variant='default' label='Count' onPress={onAddCountItem} leftIcon={<Fontisto name='plus-a' color={colors.containerBackground} />} />
        </View>
        <View style={styles.sortableContainer}>
          {createdPose.checklist.map((data, index) => <CheckListItemCard
            key={index}
            isEdit={data.id === isEditItemId}
            setIsEdit={setIsEditItemId}
            item={data}
            onCheckCallback={onCheck}
            onCountChangeCallack={onCountChange}
            onSaveCallback={onSave}
            onDeleteCallback={onDelete}
          />)}
          {/* <SortabelList
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
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (colors: Colors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  sortableContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    display: 'flex',
    gap: 10
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4
  },
  heading: {
    color: colors.defaultText,
    fontSize: 16,
    marginBottom: 12,
    alignSelf: 'flex-start',
    paddingLeft: '5%',
    fontWeight: '600'
  }
});
