import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function SleepScreen({route }) {
  const navigation = useNavigation(); 
const { averageSleep } = route.params; 
  // State để lưu trữ giờ ngủ và giờ thức
  const [bedTime, setBedTime] = useState('22:00 pm');
  const [wakeUpTime, setWakeUpTime] = useState('07:30 am');
  const [isEditing, setIsEditing] = useState(false); // Kiểm tra chế độ chỉnh sửa

  // Lấy dữ liệu đã lưu từ AsyncStorage khi màn hình load
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedBedTime = await AsyncStorage.getItem('bedTime');
        const savedWakeUpTime = await AsyncStorage.getItem('wakeUpTime');
        
        if (savedBedTime) setBedTime(savedBedTime);
        if (savedWakeUpTime) setWakeUpTime(savedWakeUpTime);
      } catch (error) {
        console.log('Failed to load data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  // Hàm lưu lại giờ khi người dùng nhấn lưu
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('bedTime', bedTime); // Lưu giờ ngủ vào AsyncStorage
      await AsyncStorage.setItem('wakeUpTime', wakeUpTime); // Lưu giờ thức vào AsyncStorage
      setIsEditing(false); // Dừng chế độ chỉnh sửa sau khi lưu
    } catch (error) {
      console.log('Failed to save data to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.backArrow} onPress={() => navigation.goBack()}>&lt;</Text>
      <Text style={styles.title}>Sleep</Text>

      <Text style={styles.description}>
        Your average time of sleep a day is <Text style={styles.highlight}>{averageSleep.hours} hours {averageSleep.minutes} minutes</Text>
      </Text>

      <View style={styles.tabContainer}>
        <Text style={styles.tab}>Today</Text>
        <Text style={[styles.tab, styles.activeTab]}>Weekly</Text>
        <Text style={styles.tab}>Monthly</Text>
      </View>

      <Image style={styles.chart} source={require('../assets/imgMainSleepScr.png')} />

      <View style={styles.statContainer}>
        <View style={styles.stat}>
          <Image style={styles.icon} source={require('../assets/imgStarSleepScr.png')} />
          <Text style={styles.statText}>Sleep rate</Text>
          <Text style={styles.statValue}>82%</Text>
        </View>
        <View style={styles.stat}>
          <Image style={styles.icon} source={require('../assets/imgZZZSleepScr.png')} />
          <Text style={styles.statText}>Deepsleep</Text>
          <Text style={styles.statValue}>1h 3min</Text>
        </View>
      </View>

      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleTitle}>
          Set your schedule <Text style={styles.edit} onPress={() => setIsEditing(true)}>Edit</Text>
        </Text>
        <View style={styles.scheduleRow}>
          <View style={styles.scheduleBox}>
            <View style={styles.scheduleContent}>
              <Image style={styles.scheduleIcon} source={require('../assets/imgBedTimeSleepScr.png')} />
              <Text style={styles.scheduleText}>Bedtime</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.scheduleTimeInput}
                value={bedTime}
                onChangeText={setBedTime}
                keyboardType="default"
              />
            ) : (
              <Text style={styles.scheduleTime}>{bedTime}</Text>
            )}
          </View>
          <View style={styles.scheduleBox1}>
            <View style={styles.scheduleContent}>
              <Image style={styles.scheduleIcon} source={require('../assets/imgWakeUpSleepScr.png')} />
              <Text style={styles.scheduleText}>Wake up</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.scheduleTimeInput}
                value={wakeUpTime}
                onChangeText={setWakeUpTime}
                keyboardType="default"
              />
            ) : (
              <Text style={styles.scheduleTime}>{wakeUpTime}</Text>
            )}
          </View>
        </View>
        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4fb9e7',
    alignItems: 'center',
    padding: 20,
  },
  backArrow: {
    fontSize: 30,
    color: '#c08f8f',
    position: 'absolute',
    marginTop:-5,
    left: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
    marginTop:-5,
    marginBottom: 10,
  },
  description: {
    fontSize: 26,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    lineHeight: 31.47,
    marginHorizontal: 10,
  },
  highlight: {
    color: '#0f52ba',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    width: '80%',
    marginVertical: 20,
  },
  tab: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 5, 
    flex: 1, 
  },
  activeTab: {
    color: '#1907e1',
    backgroundColor: '#617ADE', 
    paddingHorizontal: 10,
    paddingVertical: 5, 
    borderRadius: 95,
  },
  chart: {
    width: 285,
    height: 183,
    marginBottom: 20,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    width:130,
  },
  icon: {
    width: 17,
    height: 17,
  },
  statText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginTop: 3,
  },
  scheduleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginLeft:0,
    marginBottom: 10,
  },
  edit: {
    fontSize: 16,
    color: '#4b1dd5',
    marginLeft:80,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  scheduleBox: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor:'#A81919',
    width:140,
    justifyContent: 'center',
    marginRight: 10,
  },
  scheduleBox1:{
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor:'#F58D16',
    width:140,
    justifyContent: 'center',
  },
  scheduleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  scheduleText: {
    fontSize: 20,
    color: '#fff',
  },
  scheduleTime: {
    fontSize: 20,
    color: '#fffefa',
    marginTop: 5,
  },
  scheduleTimeInput: {
    fontSize: 20,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
    backgroundColor: '#D9D9D9',
    width: '70%',
    borderRadius: 5,
    paddingVertical: 5,
  },
  saveButton: {
    backgroundColor: '#1907e1',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
