import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image, Modal } from 'react-native';

import CycleTracking from './CycleTrackingScreen';


export default function MainScreen({ navigation, route }) {
  const { username } = route.params;
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [averageSleep, setAverageSleep] = useState(null);
  const [averageNutrition, setAverageNutrition] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  const CurrentDate = () => {
    const currentDate = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    const formatted = currentDate.toLocaleDateString('en-US', options);
    setFormattedDate(formatted); // This will set the state with the current date.
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStepsPress = () => {
    navigation.navigate('StepsScreen');
  };

  const handleCycleTrackingPress = () => {
    navigation.navigate('CycleTrackingScreen');
  };

const handleSleepPress = () => {
  navigation.navigate('SleepScreen', { averageSleep }); // Truyền giá trị averageSleep
};

  const handleNutritionPress = () => {
    navigation.navigate('NutritionScreen', { averageNutrition }); // Chuyển giá trị averageNutrition
  };


  const handleSignOut = () => {
    navigation.replace('Login');
  };

  const handleAvatarPress = () => {
    setModalVisible(true);
  };

  const calculateAverageNutrition = (history) => {
    if (!history || history.length === 0) return 0;
    const totalNutrition = history.reduce((total, record) => total + parseInt(record.nutrition, 10), 0);
    return Math.round(totalNutrition / history.length); // Tính trung bình và làm tròn
  };

  const convertTimeToMinutes = (timeString) => {
    // Regular expression để tìm "xxh" hoặc "xxp"
    const regex = /(\d+)(h|p)/g;
    let totalMinutes = 0;
    let match;

    // Lặp qua từng kết quả khớp với regex
    while ((match = regex.exec(timeString)) !== null) {
      const value = parseInt(match[1], 10); // Chuyển giá trị chuỗi sang số nguyên
      const unit = match[2]; // Lấy đơn vị (h hoặc p)

      // Kiểm tra đơn vị và cộng phút tương ứng
      if (unit === 'h') {
        totalMinutes += value * 60; // Chuyển giờ thành phút
      } else if (unit === 'p') {
        totalMinutes += value; // Nếu là phút, cộng trực tiếp
      }
    }

    return totalMinutes; // Trả về tổng số phút
  };


  const calculateAverageSteps = (history) => {
    if (!history || history.length === 0) return 0;
    const totalSteps = history.reduce((total, record) => total + parseInt(record.steps, 10), 0);
    return Math.round(totalSteps / history.length); // Lấy giá trị trung bình và làm tròn
  };


  const convertTimeToHoursMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60); // Làm tròn số phút
    return { hours, minutes };
  };


  // Fetch dữ liệu từ MockAPI
  useEffect(() => {
    setFormattedDate(CurrentDate());
    fetch('https://6739b731a3a36b5a62ef6075.mockapi.io/data')
      .then((response) => response.json())
      .then((data) => {
        const healthData = data[0];
        setHealthData(healthData);

        // Tính sleep trung bình
        if (healthData?.history) {
          const totalSleepMinutes = healthData.history.reduce((total, record) =>
            total + convertTimeToMinutes(record.sleep), 0
          );
          const averageMinutes = totalSleepMinutes / healthData.history.length;
          const { hours, minutes } = convertTimeToHoursMinutes(averageMinutes);
          setAverageSleep({ hours, minutes });
          setAverageNutrition(calculateAverageNutrition(healthData.history));


        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  // Tính tổng số bước từ healthData.history
  useEffect(() => {
    if (healthData?.history) {
      const totalSteps = healthData.history.reduce((total, record) => {
        return total + parseInt(record.steps, 10);
      }, 0);
      console.log('Total Steps:', totalSteps);
    }
  }, [healthData]);

  // Tính tổng số calories đã đốt từ healthData.history
  useEffect(() => {
    if (healthData?.history) {
      const totalBurnCalories = healthData.history.reduce((total, record) => {
        return total + (parseInt(record.burnedCalories, 10) || 0); // Xử lý trường hợp không có dữ liệu
      }, 0);
      console.log('Total Burn Calories:', totalBurnCalories);
    }
  }, [healthData]);

  useEffect(() => {
    const currentDate = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    const formatted = currentDate.toLocaleDateString('en-US', options);
    setFormattedDate(formatted); // Update the date in the state
  }, []);





  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image style={styles.icon} source={require('../assets/imgsun.png')} />
          <Text style={styles.date}>{formattedDate}</Text>
          <TouchableOpacity onPress={handleAvatarPress}>
            <Image style={styles.avatar} source={require('../assets/imgpeople.png')} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Are you sure you want to sign out?</Text>
                <TouchableOpacity style={styles.modalButton} onPress={handleSignOut}>
                  <Text style={styles.modalButtonText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <Text style={styles.title}>Overview</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AllDataScreen', { username: username })}
        >
          <Text style={styles.buttonText}>All data</Text>
          <Image style={styles.imgalldata} source={require('../assets/imgalldata.png')} />
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : healthData ? (
          <View style={styles.healthScoreContainer}>
            <Text style={styles.healthScoreTitle}>Health Score</Text>
            <Text style={styles.healthDetails}>
              Based on your overview health tracking, your{' '}
              <Text style={styles.healthScoreInline}>
                {healthData.healthScore}
              </Text>{' '}
              score is considered good...
            </Text>
            <Text style={styles.tellMore}>Tell me more ></Text>
          </View>
        ) : (
          <Text style={styles.errorText}>Failed to load Health Score. Check MockAPI or Network connection.</Text>
        )}

        <Text style={styles.subtitle}>Average</Text>
        <View style={styles.row}>

          <TouchableOpacity
    style={styles.box}
    onPress={() => {
      // Truyền dữ liệu vào màn hình StepsScreen
      navigation.navigate('StepsScreen', {
        averageSteps: healthData && healthData.history
          ? calculateAverageSteps(healthData.history)
          : 'Loading...',
      });
    }}
  >
  <Text style={styles.boxTitle}>Steps</Text>
  <Text style={styles.boxContent}>
    {healthData && healthData.history
      ? calculateAverageSteps(healthData.history)
      : 'Loading...'}
  </Text>
  <Text style={styles.updateInfo}>Update 15 min ago</Text>
  <Image style={styles.boxImage} source={require('../assets/imgsteps.png')} />
</TouchableOpacity>


            <TouchableOpacity style={[styles.box, { backgroundColor: '#ff8fb1' }]} onPress={handleCycleTrackingPress}>
              <Text style={styles.boxTitle}>Cycle tracking</Text>
              <Text style={styles.boxContent}>
                {'24 December'}
              </Text>

              <Text style={styles.updateInfo}>Update 30 min ago</Text>
              <Image style={styles.boxImage} source={require('../assets/imgcalendar.png')} />
            </TouchableOpacity>
        </View>

        <View style={styles.row}>
<TouchableOpacity style={[styles.box, { backgroundColor: '#9274e7' }]} onPress={handleSleepPress}>
  <Text style={styles.boxTitle}>Sleep</Text>
  <Text style={styles.boxContent}>
    {averageSleep ? `${averageSleep.hours}h ${averageSleep.minutes}m` : '--'}
  </Text>
  <Text style={styles.updateInfo}>Average this month</Text>
  <Image style={styles.boxImage} source={require('../assets/imgsleep.png')} />
</TouchableOpacity>


          <TouchableOpacity style={[styles.box, { backgroundColor: '#ffae42' }]} onPress={handleNutritionPress}>
            <Text style={styles.boxTitle}>Nutrition</Text>
            <Text style={styles.boxContent}>
              {averageNutrition !== null ? `${averageNutrition} kcal` : 'Loading...'}
            </Text>
            <Text style={styles.updateInfo}>Average this month</Text>
            <Image style={styles.boxImage} source={require('../assets/imgnutrition.png')} />
          </TouchableOpacity>


        </View>

        <Text style={styles.subtitle}>This month report</Text>
        <View style={styles.row}>
          <View style={styles.reportBox}>
            <Text style={styles.boxTitle}>Steps</Text>
            <Text style={styles.reportContent}>
              {healthData && healthData.history
                ? healthData.history.reduce((total, record) => total + parseInt(record.steps, 10), 0)
                : 'Loading...'}
            </Text>
            <Image style={styles.boxImage} source={require('../assets/anhdemo.png')} />
          </View>

          <View style={styles.reportBox}>
            <Text style={styles.boxTitle}>Workout</Text>
            <Text style={styles.reportContent}>
              {healthData && healthData.history
                ? (() => {
                  const totalMinutes = healthData.history.reduce((total, record) =>
                    total + convertTimeToMinutes(record.workout), 0);
                  const { hours, minutes } = convertTimeToHoursMinutes(totalMinutes);
                  return `${hours}h ${minutes}m`; // Hiển thị giờ và phút
                })()
                : 'Loading...'}
            </Text>
            <Image style={styles.boxImage} source={require('../assets/anhdemo.png')} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.reportBox}>
            <Text style={styles.boxTitle}>Calories</Text>
            <Text style={styles.reportContent}>
              {healthData && healthData.history
                ? healthData.history.reduce((total, record) => total + (parseInt(record.burnedCalories, 10) || 0), 0)
                : 'Loading...'} kcal
            </Text>
            <Image style={styles.boxImage} source={require('../assets/anhdemo.png')} />
          </View>

          <View style={styles.reportBox}>
            <Text style={styles.boxTitle}>Sleep</Text>
            <Text style={styles.reportContent}>
              {healthData && healthData.history
                ? (() => {
                  const totalMinutes = healthData.history.reduce((total, record) =>
                    total + convertTimeToMinutes(record.sleep), 0);
                  const { hours, minutes } = convertTimeToHoursMinutes(totalMinutes);
                  return `${hours}h ${minutes}m`; // Hiển thị giờ và phút
                })()
                : 'Loading...'}
            </Text>
            <Image style={styles.boxImage} source={require('../assets/anhdemo.png')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    marginBottom: 20,
    backgroundColor: '#4fb9e7',
    padding: 15,
    paddingBottom: 20,
    flex: 1,
  },

  date: {
    fontSize: 15,
    fontWeight: '100',
    color: '#000',
  },

  healthScoreContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  healthDetails: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
    textAlign: 'left',
    marginVertical: 10,
  },
  healthScoreInline: {
    fontSize: 20,
    fontWeight: '700',
    color: 'blue',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  healthScoreTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  tellMore: {
    fontSize: 11,
    fontWeight: '300',
    color: '#16559d',
    lineHeight: 13.31,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 13,
    paddingVertical: 5,
    alignItems: 'center',
    marginLeft: 220,
    marginTop: -34,
    marginBottom: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'blue',
    marginRight: 5,
    fontSize: 12,
    fontWeight: '600',
  },
  imgalldata: {
    width: 15,
    height: 15,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  box: {
    width: '48%',
    backgroundColor: '#76C7C0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#433d3d',
  },
  boxContent: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.36,
    color: '#fffefe',
    marginVertical: 5,
  },
  updateInfo: {
    fontSize: 8,
    fontWeight: '700',
    color: '#fffefe',
  },
  boxImage: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 0,
    right: 10,
  },
  reportBox: {
    width: '48%',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
  },
  reportContent: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19.36,
    color: '#fffefe',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});