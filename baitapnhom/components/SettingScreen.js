import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ navigation }) {
  
  // State cho chế độ tối/sáng
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  // Hàm chuyển chế độ tối/sáng
  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Thông tin người dùng */}
      <View style={styles.settingItem}>
        <Text style={styles.settingTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={() => alert('Go to profile edit screen')}>
          <Text style={styles.linkText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Cài đặt thông báo */}
      <View style={styles.settingItem}>
        <Text style={styles.settingTitle}>Notifications</Text>
        <Switch
          value={true}
          onValueChange={(value) => console.log('Notification setting changed:', value)}
        />
      </View>

      {/* Chế độ tối sáng */}
      <View style={styles.settingItem}>
        <Text style={styles.settingTitle}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Chính sách bảo mật */}
      <View style={styles.settingItem}>
        <Text style={styles.settingTitle}>Privacy Policy</Text>
        <TouchableOpacity onPress={() => alert('Privacy policy details')}>
          <Text style={styles.linkText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Đăng xuất */}
      <View style={styles.settingItem}>
        <TouchableOpacity onPress={() => alert('Logged out')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FF0000',
  },
});
