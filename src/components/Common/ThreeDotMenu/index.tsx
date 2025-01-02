import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import CustomIconButton from '../ui/IconButton';
import { deletePoseByIdApi } from '../../../services/api';
import { NavigationScreens } from '../../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

const ThreeDotsMenu = ({ poseId }: { poseId: string }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const openMenu = () => setModalVisible(true);
  const closeMenu = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Three Dots Icon */}
      <CustomIconButton onPress={openMenu} name="dots-vertical" size={25} />

      {/* Modal for the Menu */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu} // For Android back button handling
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeMenu} // Close menu when tapping outside
        >
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={async () => {
                console.log('Option 1 selected');
                closeMenu();
                await deletePoseByIdApi(poseId);
                navigation.navigate(NavigationScreens.HOME_SCREEN as never);
              }}
            >
              <Text style={styles.menuText}>Delete Complete Pose</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                console.log('Option 2 selected');
                closeMenu();
              }}
            >
              <Text style={styles.menuText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                console.log('Option 3 selected');
                closeMenu();
              }}
            >
              <Text style={styles.menuText}>Option 3</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ThreeDotsMenu;
