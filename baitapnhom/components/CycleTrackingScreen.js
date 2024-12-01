import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { differenceInCalendarDays } from 'date-fns'; // Library for calculating days

// Get screen dimensions
const { height } = Dimensions.get('window');

export default function CycleTrackingScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('2024-12-24'); // Mặc định ngày 24/12
  const [daysUntilPeriod, setDaysUntilPeriod] = useState(null); // Days until period
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // Calendar visibility

  // Hàm tính số ngày còn lại
  const calculateDaysUntilPeriod = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    return differenceInCalendarDays(target, today);
  };

  useEffect(() => {
    // Tính toán số ngày còn lại khi component được mount
    const daysLeft = calculateDaysUntilPeriod('2024-12-24');
    setDaysUntilPeriod(daysLeft); // Cập nhật số ngày còn lại
  }, []);

  // Generate days based on selected date
  const generateDays = (selectedDate) => {
    if (!selectedDate) return [];

    const selectedDay = new Date(selectedDate);
    const firstDay = selectedDay.getDay(); // Get day of the week (0 for Sunday)
    const days = [];

    // Loop through all 7 days in the week
    for (let i = 0; i < 7; i++) {
      const day = new Date(selectedDay);
      day.setDate(selectedDay.getDate() - firstDay + i); // Adjust day based on first day
      days.push(day.getDate().toString().padStart(2, '0'));
    }

    return days;
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString); // Save selected date

    // Calculate days from today to selected date
    const today = new Date();
    const selected = new Date(day.dateString);
    const daysLeft = calculateDaysUntilPeriod(selected); // Calculate day difference

    setDaysUntilPeriod(daysLeft); // Update days remaining
    setIsCalendarVisible(false); // Hide calendar after selection
    Alert.alert('Ngày đã chọn', `Bạn đã chọn ngày: ${day.dateString}`);
  };

  // Get formatted selected date (if available)
  const formattedSelectedDate = selectedDate ? selectedDate.slice(0, 10) : null;

  const daysToDisplay = generateDays(selectedDate);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#55bdea',
        paddingTop: 40,
        paddingHorizontal: 10,
      }}
      showsVerticalScrollIndicator={true}
      bounces={false}
    >
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>&lt;</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Cycle tracking</Text>

      <View style={styles.header}>
        {/* Days of the week */}
        <View style={styles.daysRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={index} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>

        {/* Day numbers aligned with days */}
        <View style={styles.numbersRow}>
          {daysToDisplay.map((day, index) => {
            const dayString = day.length === 1 ? `0${day}` : day; // Add leading zero if needed
            return (
              <Text
                key={index}
                style={[
                  styles.dayNumber,
                  formattedSelectedDate === dayString && styles.selectedDayNumber, // Update day comparison for accuracy
                ]}
              >
                {day}
              </Text>
            );
          })}
        </View>
      </View>

      {/* Period Info */}
      <View style={styles.periodContainer}>
        <Text style={styles.periodText}>Period in</Text>
        {/* Display days until period */}
        <Text style={styles.periodDays}>{daysUntilPeriod !== null ? `${daysUntilPeriod} days` : '12 days'}</Text>
        <Text style={styles.lowChance}>Low chance of getting pregnant</Text>
        {/* Edit period dates button */}
        <TouchableOpacity style={styles.editButton} onPress={() => setIsCalendarVisible(true)}>
          <Text>Edit period dates</Text>
        </TouchableOpacity>
      </View>

      {/* Mood/Feelings Section */}
      <Text style={styles.subTitle}>How are you feeling today?</Text>
      <View style={styles.feelingsContainer}>
        <View style={styles.feelingBox}>
          <Image
            style={styles.feelingIcon}
            source={require('../assets/imgSharingCycleTracking.png')}
          />
          <Text style={styles.feelingText}>Sharing your symptoms with us</Text>
        </View>
        <View style={styles.feelingBox}>
          <Image
            style={styles.feelingIcon}
            source={require('../assets/imgDailyCycleTracking.png')}
          />
          <Text style={styles.feelingText}>Here’s your daily insights</Text>
        </View>
      </View>

      {/* Menstrual Health Section */}
      <Text style={styles.subTitle}>
        Menstrual health <Text style={styles.viewMore}>View more ></Text>
      </Text>
      <View style={styles.healthContainer}>
        <View style={styles.healthBox}>
          <Image
            style={styles.healthImage}
            source={require('../assets/imgFooter1CycleTracking.png')}
          />
          <Text style={styles.healthText}>
            Craving sweets on your period? Here’s why & what to do about it
          </Text>
        </View>
        <View style={styles.healthBox}>
          <Image
            style={styles.healthImage}
            source={require('../assets/imgFooter2CycleTracking.png')}
          />
          <Text style={styles.healthText}>
            Is birth control related to food and health & what to do
          </Text>
        </View>
      </View>

      {/* Modal Calendar */}
      <Modal
        transparent={true}
        visible={isCalendarVisible}
        animationType="slide"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Calendar
              markedDates={{
                [formattedSelectedDate]: { // Use formattedSelectedDate for accurate comparison
                  selected: true,
                  selectedColor: '#8cd9fc',
                  selectedTextColor: 'white',
                },
              }}
              onDayPress={handleDateSelect}
              monthFormat={'yyyy MM'}
              style={styles.calendar}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCalendarVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    fontSize: 30,
    color: '#c08f8f',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: -20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: '100',
    color: '#000',
    textAlign: 'center',
    width: '14%',
  },
  numbersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: '100',
    color: '#000',
    textAlign: 'center',
    width: '14%',
  },
  selectedDayNumber: {
    backgroundColor: '#D9D9D9',
    color: '#D9D9D9',
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 30,
  },
  periodContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 100,
    padding: 10,
  },
  periodText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginBottom: 5,
    marginTop: 25,
  },
  periodDays: {
    fontSize: 30,
    fontWeight: '400',
    color: '#000',
    marginBottom: 5,
  },
  lowChance: {
    fontSize: 10,
    weight: '400',
    color: '#000',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#f0a30c',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  viewMore: {
    fontSize: 11,
    weight: '300',
    color: '#16559d',
  },
  feelingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  feelingBox: {
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#fce6b5',
    borderRadius: 10,
    padding: 10,
  },
  feelingIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  feelingText: {
    fontSize: 12,
    fontWeight: '200',
    color: '#000',
    textAlign: 'center',
  },
  healthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  healthBox: {
    width: '48%',
    backgroundColor: '#f0c8f0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  healthImage: {
    width: '100%',
    height: 66,
    marginBottom: 10,
  },
  healthText: {
    fontSize: 12,
    fontWeight: '300',
    color: '#faf7f7',
    textAlign: 'center',
  },
});
