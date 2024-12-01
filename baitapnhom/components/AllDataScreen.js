import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, ActivityIndicator, Platform, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AllDataScreen({ route }) {
  const { username } = route.params; // Nhận username từ route.params
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Khởi tạo fadeAnim
  const navigation = useNavigation();

  useEffect(() => {
    // Lấy dữ liệu từ MockAPI
    const fetchData = async () => {
      try {
        const response = await fetch('https://6739b731a3a36b5a62ef6075.mockapi.io/data');
        const data = await response.json();
        const user = data.find(item => item.username === username); // Lấy dữ liệu người dùng theo username
        setUserData(user);
        setLoading(false);

        // Bắt đầu hiệu ứng mờ dần khi dữ liệu đã tải xong
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500, // Thời gian hiệu ứng (ms)
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [username, fadeAnim]);

  // Lấy danh sách các ngày từ history
  const getAvailableDates = () => {
    if (userData?.history) {
      return userData.history.map(item => item.date);
    }
    return [];
  };

  // Xử lý khi người dùng chọn ngày
  const onDateSelect = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);

    // Lọc dữ liệu theo ngày được chọn
    if (userData?.history) {
      const filteredData = userData.history.find(item => item.date === date);
      if (filteredData) {
        setUserData({ ...userData, ...filteredData });
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy dữ liệu của người dùng {username}.</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.header}>All Health Data</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Image style={styles.datePickerButton} source={require('../assets/imgcalendar.png')} />
          </TouchableOpacity>
        </View>

        {/* Modal hiển thị danh sách ngày */}
        {showDatePicker && (
          <Modal
            visible={showDatePicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <FlatList
                  data={getAvailableDates()}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dateItem}
                      onPress={() => onDateSelect(item)}
                    >
                      <Text style={styles.dateText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* Hiển thị các item dữ liệu sức khỏe của người dùng */}
        <View style={styles.item}>
          <Image style={styles.icon} source={require('../assets/imgDoubleSupportTime.png')} />
          <Text style={styles.title}>Double Support Time</Text>
          <Text style={styles.value}>{userData.doubleSupportTime}</Text>
        </View>

        <View style={styles.item}>
          <Image style={styles.icon} source={require('../assets/imgStespS3.png')} />
          <Text style={styles.title}>Steps</Text>
          <Text style={styles.value}>
            {userData.steps} <Text style={styles.subValue}>steps</Text>
          </Text>
        </View>

        <View style={styles.item}>
          <Image style={styles.icon} source={require('../assets/imgcalendar.png')} />
          <Text style={styles.title}>Cycle Tracking</Text>
          <Text style={styles.value}>{userData.cycleTracking}</Text>
        </View>

        <View style={styles.item}>
          <Image style={styles.icon} source={require('../assets/imgSleepS3.png')} />
          <Text style={styles.title}>Sleep</Text>
          <Text style={styles.value}>{userData.sleep}</Text>
        </View>

        <View style={styles.item}>
          <Image style={styles.icon} source={require('../assets/imgHeartS3.png')} />
          <Text style={styles.title}>Heart</Text>
          <Text style={styles.value}>{userData.heart}</Text>
        </View>

        <View style={styles.item}>
          <Image style={styles.icon} source={require('../assets/imgBurnS3.png')} />
          <Text style={styles.title}>Burned Calories</Text>
          <Text style={styles.value}>{userData.burnedCalories}</Text>
        </View>

        <View style={styles.item}>
          <Image style={styles.icon} source={require('../assets/imgBMIS3.png')} />
          <Text style={styles.title}>Body mass index</Text>
          <Text style={styles.value}>{userData.bmi}</Text>
        </View>

        {/* Thêm Workout */}
        <View style={styles.item}>
          <Image style={styles.icon} source={require('../assets/imgStespS3.png')} />
          <Text style={styles.title}>Workout</Text>
          <Text style={styles.value}>{userData.workout}</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('OverviewScreen')}>
          <Image style={styles.footerIcon} source={require('../assets/imgOverView.png')} />
          <Text style={styles.footerText}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('ExploreScreen')}>
          <Image style={styles.footerIcon} source={require('../assets/imgExplore.png')} />
          <Text style={styles.footerText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('SharingScreen')}>
          <Image style={styles.footerIcon} source={require('../assets/imgSharing.png')} />
          <Text style={styles.footerText}>Sharing</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4fb9e7',
  },
  scrollContainer: {
    paddingBottom: 50, // Giảm khoảng trống cho footer để tránh tràn màn hình
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  header: {
    fontSize: 26,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  backArrow: {
    fontSize: 30,
    fontWeight: '100',
    color: '#c08f8f',
  },
  datePickerButton: {
    fontSize: 14,
    color: '#0000ff',
    marginRight: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#587EFC',
    marginVertical: 10,
    borderRadius: 5,
    padding: 8,
    marginBottom: 5,
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
    flex: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  subValue: {
    fontSize: 14,
    fontWeight: '200',
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#4fb9e7',
    paddingVertical: 10,
    marginTop: -50,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    maxHeight: 400,
  },
  dateItem: {
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
