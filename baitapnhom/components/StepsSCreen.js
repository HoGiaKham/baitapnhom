import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function StepsScreen({ route, navigation }) {

  const goalSteps = 18000; // Mục tiêu bước
  const { averageSteps } = route.params || { averageSteps: 0 }; // Lấy averageSteps từ route.params

  // Tính toán phần trăm hoàn thành mục tiêu
  const percentAchieved = (averageSteps / goalSteps) * 100;

  // Tính toán khoảng cách (km)
  const stepLength = 0.762; // Chiều dài bước trung bình (mét)
  const distanceInMeters = averageSteps * stepLength; // Khoảng cách tính bằng mét
  const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Chuyển sang km

  // Tính toán thời gian đi bộ (phút)
  const timePer100Steps = 1; // Giả sử mỗi 100 bước tiêu tốn 1 phút
  const walkingTimeInMinutes = (averageSteps / 100).toFixed(0); // Thời gian tính bằng phút

  // Hàm tính calo (ví dụ đơn giản là 0.04 calo cho mỗi bước)
  const calculateCalories = (steps) => {
    const caloriesPerStep = 0.04; // Giả sử mỗi bước tiêu tốn 0.04 calo
    return steps * caloriesPerStep;
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backArrowContainer} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>&lt;</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Steps</Text>

      <Text style={styles.description}>
        You have achieved <Text style={styles.highlight}>{percentAchieved.toFixed(0)}%</Text> of your average monthly goal
      </Text>

      <Text style={styles.steps}>{averageSteps}</Text>
      <Text style={styles.stepsOutOf}>Steps out of 18k</Text>

      <View style={styles.statContainer}>
        {/* Hiển thị tính toán calo */}
        <View style={styles.stat}>
          <Image style={styles.icon} source={require('../assets/img1StepsScr.png')} />
          <Text style={styles.statText}>
            {averageSteps ? `${calculateCalories(averageSteps).toFixed(0)} kcal` : 'Loading...'}
          </Text>
        </View>

        {/* Hiển thị khoảng cách */}
        <View style={styles.stat}>
          <Image style={styles.icon} source={require('../assets/img2StepsScr.png')} />
          <Text style={styles.statText}>{distanceInKm} km</Text>
        </View>

        {/* Hiển thị thời gian */}
        <View style={styles.stat}>
          <Image style={styles.icon} source={require('../assets/imgStespS3.png')} />
          <Text style={styles.statText}>{walkingTimeInMinutes} min</Text>
        </View>
      </View>

      <Image style={styles.chart} source={require('../assets/img4StepsScr.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4fb9e7',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  backArrowContainer: {
    position: 'absolute',
    marginTop: -15,
    left: 20,
  },
  backArrow: {
    fontSize: 28,
    fontWeight: '400',
    color: '#c08f8f',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: -15,
  },
  description: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    lineHeight: 30,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  highlight: {
    color: '#0f52ba',
    fontWeight: '700',
  },
  steps: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000',
    marginVertical: 10,
    marginTop: -15,
  },
  stepsOutOf: {
    fontSize: 20,
    fontWeight: '400',
    color: '#a59393',
    marginBottom: 30,
    marginTop: -10,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  stat: {
    alignItems: 'center',
    width: '30%',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  statText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
  },
  chart: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
