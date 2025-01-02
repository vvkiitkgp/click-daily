import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors, useTheme } from '../../../../hooks/useTheme';
import { ActionButton } from '../../../Common/ui/ActionButton';
import { ChecklistItem, Pose, SubActions } from '../../../../types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Divider from '../../../Common/ui/Divider';
import CheckListItemCard from '../../../Common/CheckListItemCard';
import { Fontisto } from '@expo/vector-icons';

interface ActionOverlayProps {
    open: boolean;
    setOpen: (o: boolean) => void;
    selectedSubAction: SubActions;
    setSelectedSubAction: (s: SubActions) => void;
    pose: Pose;
}

export const ActionsOverlay = ({ open, setOpen, selectedSubAction, setSelectedSubAction, pose }: ActionOverlayProps) => {
    const [modifiedChecklist, setModifiedChecklist] = useState<ChecklistItem[]>(pose.checklist);
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const [isEditItemId, setIsEditItemId] = useState<string>()
    const checklistScrollViewRef = useRef<ScrollView>(null);


    const handleScrollToEnd = () => {
        setTimeout(() => {
            checklistScrollViewRef.current?.scrollTo({
                y: 9999, // A large value to ensure it scrolls to the very end
                animated: true,
            });
        }, 100); // Ensure content has rendered
    };

    const onCheck = (id: string) => {
        const updatedCheckList = modifiedChecklist.map((item) =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setModifiedChecklist(updatedCheckList);
    };

    const onCountChange = (id: string, count: number) => {
        const updatedCheckList = modifiedChecklist.map((item) =>
            item.id === id ? { ...item, count } : item
        );
        setModifiedChecklist(updatedCheckList);
    };

    const onAddNewCheckListItem = () => {
        const randId = Math.floor(1000 + Math.random() * 9000).toString();
        const newChecklistItem: ChecklistItem = {
            id: randId,
            count: 0,
            index: modifiedChecklist.length,
            isChecked: false,
            message: '',
            type: 'checklist',
        };
        setModifiedChecklist([...modifiedChecklist, newChecklistItem]);
        setIsEditItemId(randId);
        handleScrollToEnd();
    };

    const onAddCountItem = () => {
        const randId = Math.floor(1000 + Math.random() * 9000).toString();
        const newCountItem: ChecklistItem = {
            id: randId,
            count: 0,
            index: modifiedChecklist.length,
            isChecked: false,
            message: '',
            type: 'count',
        };
        setModifiedChecklist([...modifiedChecklist, newCountItem]);
        setIsEditItemId(randId);
        handleScrollToEnd();
    };

    const onSave = (item: ChecklistItem) => {
        const updatedCheckList = modifiedChecklist.map((l) =>
            l.id === item.id ? item : l
        );
        setModifiedChecklist(updatedCheckList);
        setIsEditItemId(undefined);
    };

    const onDelete = (item: ChecklistItem) => {
        const updatedCheckList = modifiedChecklist
            .filter((l) => l.id !== item.id)
            .map((l, index) => ({ ...l, index })); // Re-index items after deletion
        setModifiedChecklist(updatedCheckList);
        setIsEditItemId(undefined);
    };



    const getSubMenu = () => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <View style={styles.subMenuContainer}>

                    {[{ name: 'Compare', onPress: () => setSelectedSubAction('compare'), key: 'compare' },
                    { name: 'Checklist', onPress: () => setSelectedSubAction('checklist'), key: 'checklist' },
                    { name: 'Transformation', onPress: () => setSelectedSubAction('transformation'), key: 'transformation' },
                    { name: 'Details', onPress: () => setSelectedSubAction('details'), key: 'details' },
                    ].map((item) => (<ActionButton label={item.name} onPress={item.onPress} variant={selectedSubAction === item.key ? 'selected' : 'options'} />))}

                </View>
            </ScrollView>
        )

    }

    const getSelectedContent = () => {
        switch (selectedSubAction) {
            case 'checklist':
                return (
                    <ScrollView ref={checklistScrollViewRef} style={{ height: '100%' }}>
                        <View style={styles.addChecklistButtonContainer}>
                            <ActionButton variant='default' label='Checklist' onPress={onAddNewCheckListItem} leftIcon={<Fontisto name='plus-a' color={colors.containerBackground} />} />
                            <ActionButton variant='default' label='Count' onPress={onAddCountItem} leftIcon={<Fontisto name='plus-a' color={colors.containerBackground} />} />
                        </View>
                        <View style={styles.sortableContainer}>
                            {modifiedChecklist.map((data, index) => <CheckListItemCard
                                key={index}
                                isEdit={data.id === isEditItemId}
                                setIsEdit={setIsEditItemId}
                                item={data}
                                onCheckCallback={onCheck}
                                onCountChangeCallack={onCountChange}
                                onSaveCallback={onSave}
                                onDeleteCallback={onDelete}
                            />)}
                        </View>
                    </ScrollView>
                )
            default:
                return (<View><Text>In DEV</Text></View>)
        }

    }

    return (<Modal visible={open} transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.overlay} onPress={() => setOpen(false)} activeOpacity={1}>
                <View style={styles.modalContainer}>
                    <View style={styles.overlayContentContainer}>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <Text style={styles.heading}>Actions</Text>
                            <View>
                                {getSubMenu()}
                            </View>
                            <Divider overrideStyles={{ marginVertical: 10 }} />
                            <View>

                                {getSelectedContent()}

                            </View>
                        </GestureHandlerRootView>
                    </View>
                    <View style={styles.overlayActionBarContainer}></View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    </Modal>)
}

const getStyles = (colors: Colors) => StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        zIndex: 20
    },
    modalContainer: {
        zIndex: 21,
        height: 602,
        width: '100%',
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: colors.containerBackground,
    },
    overlayContentContainer: {
        flex: 0.9,
        padding: 15,
        gap: 10
    },
    overlayActionBarContainer: {
        flex: 0.1,
        borderTopWidth: 1,
        borderColor: colors.solidBorder
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    subMenuContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12
    },
    sortableContainer: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        display: 'flex',
        gap: 10
    },
    addChecklistButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        alignSelf: 'center'
    },
})