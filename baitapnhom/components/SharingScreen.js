import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Switch, Modal, Pressable } from 'react-native';
import * as Sharing from 'expo-sharing';  // Import thư viện chia sẻ từ Expo

export default function SharingScreen({ navigation }) {
  // State cho chế độ tối/sáng và thông báo
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);  // State quản lý Modal

  // Hàm để hiển thị thông báo chia sẻ thành công
  const handleStartSharing = async () => {
    try {
      const shareOptions = {
        title: 'Health Share',
        message: 'Check out my health data!',
        url: 'https://www.facebook.com/giakham.1705/', // URL của bạn (có thể là liên kết đến trang web của bạn hoặc nội dung chia sẻ)
      };

      // Kiểm tra xem có thể chia sẻ không
      if (await Sharing.isAvailableAsync()) {
        // Chia sẻ
        await Sharing.shareAsync(shareOptions.url, { 
          dialogTitle: shareOptions.title,
          message: shareOptions.message 
        });

        Alert.alert("Chia sẻ thành công", "Bạn đã chia sẻ thông tin thành công!", [
          { text: "OK", onPress: () => console.log("Thông báo đã được đóng") }
        ]);
      } else {
        Alert.alert("Không hỗ trợ chia sẻ", "Thiết bị của bạn không hỗ trợ chia sẻ.");
      }
    } catch (error) {
      console.log("Lỗi chia sẻ:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi chia sẻ. Vui lòng thử lại.");
    }
  };

  // Hàm thay đổi chế độ tối/sáng
  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };

  // Hàm thay đổi cài đặt thông báo
  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Sharing</Text>
      </View>

      <View style={styles.card}>
        <Image style={styles.icon} source={require('../assets/img1.png')} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Keep your health in check</Text>
          <Text style={styles.cardText}>
            Keep loved ones informed about your condition.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Image style={styles.icon} source={require('../assets/img2.png')} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Protect your privacy</Text>
          <Text style={styles.cardText}>
            Share key conclusions. Stop anytime.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Image style={styles.icon} source={require('../assets/img3.png')} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <Text style={styles.cardText}>
            Get notified of updates to shared dashboards.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartSharing}>
        <Text style={styles.buttonText}>→ Start sharing</Text>
      </TouchableOpacity>

      {/* Cài đặt */}
      <TouchableOpacity style={styles.settings} onPress={() => setModalVisible(true)}>
        <Image style={styles.settingsIcon} source={require('../assets/imgSetting.png')} />
        <Text style={styles.settingsText}>Setting</Text>
      </TouchableOpacity>

      {/* Modal cài đặt */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}  // Đóng modal khi bấm phím quay lại trên Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>

            <View style={styles.settingItem}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
              />
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Switch
                value={isNotificationsEnabled}
                onValueChange={toggleNotifications}
              />
            </View>

            <Pressable style={styles.okButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.okButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: '#333', // Màu nền tối
    flex:1,
  },
  lightContainer: {
    backgroundColor: '#55bdea', // Màu nền sáng
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 10,
    marginTop: -10,
  },
  backArrow: {
    fontSize: 30,
    fontWeight: '200',
    color: '#c08f8f',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9daf7',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: '100%',
  },
  icon: {
    width: 55,
    height: 55,
    marginRight: 20,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
  },
  button: {
    backgroundColor: '#467dde',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginVertical: 25,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#c7ffe0',
  },
  settings: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 6,
    justifyContent: 'center',
    marginVertical: 20,
  },
  settingsIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  settingsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Nền tối mờ
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 15,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  okButton: {
    backgroundColor: '#467dde',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  okButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
});
