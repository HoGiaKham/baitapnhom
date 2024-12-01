import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, ScrollView, Modal, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ExploreScreen() {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBlogs, setModalBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Đảm bảo filteredBlogs là mảng trống ban đầu
  const navigation = useNavigation();

  const blogs = [
    { title: 'Magnesium and sleep – does it help?', image: require('../assets/blog1_nutrition.png'), category: 'Nutrition', url: 'https://www.lecnutrition.co.uk/magnesium-and-sleep-does-it-help/' },
    { title: 'SportsBlog newsletter 11/20: Vivaaaa Las Vegas!', image: require('../assets/blog1_sport.png'), category: 'Sports', url: 'https://www.sportsblog.com/sbnewsdesk/sportsblog-newsletter-1120-vivaaaa-las-vegas/'  },
    { title: 'Top 3 Apps For Perfecting Your Running Technique', image: require('../assets/blog1_running.png'), category: 'Running', url: 'https://www.runningshoesguru.com/2016/08/top-3-apps-for-perfecting-your-running-technique/' },
    { title: 'Stress – Ten top tips using diet and lifestyle to help', image: require('../assets/blog2_nutrition.png'), category: 'Nutrition', url: 'https://www.lecnutrition.co.uk/stress-ten-top-tips-using-diet-and-lifestyle-to-help/' },
    { title: 'The Benefits of Running on Varied Surfaces', image: require('../assets/blog2_running.png'), category: 'Running' , url: 'https://www.runningshoesguru.com/2014/06/the-benefits-of-running-on-varied-surfaces/' },
    { title: 'Browns set to sign veteran QB Joe Flacco to practice squad', image: require('../assets/blog2_sport.png'), category: 'Sports', url: 'https://www.sportsblog.com/brightnlight/browns-set-to-sign-veteran-qb-joe-flacco-to-practice-squad/'  },
    { title: 'Dan Campbell: "Get Your Diapers Ready"', image: require('../assets/blog3_sport.png'), category: 'Sports', url: 'https://www.sportsblog.com/whenthesmokeclears/dan-campbell-get-your-diapers-ready/'  },
    { title: 'Myths and facts about weight gain in menopause', image: require('../assets/blog3_nutrition.png'), category: 'Nutrition', url: 'https://www.lecnutrition.co.uk/myths-and-facts-about-weight-gain-in-menopause/' },
    { title: 'Running Shin Pain: Tibialis Posterior Stretching & Strengthening', image: require('../assets/blog3_running.png'), category: 'Running' , url: 'https://www.runningshoesguru.com/2014/05/running-shin-pain-tibialis-posterior-stretching-strengthening/' },
    { title: 'Is Noom really worth it? A dietitian’s perspective', image: require('../assets/blog4_nutrition.png'), category: 'Nutrition', url: 'https://www.lecnutrition.co.uk/the-therapy-you-never-knew-you-needed/' },
    { title: 'Patriots Stock Report: 3 up, 3 down', image: require('../assets/blog4_sport.png'), category: 'Sports', url: 'https://www.sportsblog.com/patsbuzz/patriots-stock-report-3-up-3-down/'  },
    { title: 'Willie Mays Career Home Runs By Park', image: require('../assets/blog5_sport.png'), category: 'Sports', url: 'https://www.sportsblog.com/bass/willie-mays-career-home-runs-by-park/'  },
    { title: 'How to Improve Your Sleep Quality', image: require('../assets/blog5_nutrition.png'), category: 'Nutrition', url: 'https://www.lecnutrition.co.uk/magnesium-and-sleep-does-it-help/' },
    { title: 'Two Simple Running Technique Cues for Your Next Workout', image: require('../assets/blog4_running.png'), category: 'Running', url: 'https://www.runningshoesguru.com/2014/04/two-simple-running-technique-cues-for-your-next-workout/' },
    { title: 'Eating for Endurance: A Runner’s Guide', image: require('../assets/blog6_sport.png'), category: 'Sports', url: 'https://www.sportsblog.com/sbnewsdesk/trevon-diggs-makes-it-clear-that-his-brother-stefon-should-leave-buffalo/'  },
    { title: 'Trevon Diggs makes it clear that his brother, Stefon, should leave Buffalo!', image: require('../assets/blog6_nutrition.png'), category: 'Nutrition' , url: 'https://www.lecnutrition.co.uk/are-you-a-seasonal-dieter-and-how-to-break-free-from-the-cycle/'},
  ];

  // Hàm tìm kiếm
  const handleSearch = (text) => {
    setText(text);
    
    // Nếu có từ khóa tìm kiếm, lọc các blog theo tiêu đề hoặc danh mục
    if (text) {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(text.toLowerCase()) || 
        blog.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBlogs(filtered); // Cập nhật danh sách blog đã lọc
    } else {
      setFilteredBlogs(blogs); // Nếu không có từ khóa, hiển thị tất cả blog
    }
  };

  const openModal = (category) => {
    const filteredBlogs = blogs.filter(blog => blog.category === category);
    setModalBlogs(filteredBlogs);
    setModalVisible(true);
  };

  const openLink = (url) => {
    Linking.openURL(url); 
  };

  const viewMoreBlogs = () => {
    setModalBlogs(blogs);  // Hiển thị tất cả các blog khi nhấn View More
    setModalVisible(true);
  };

  useEffect(() => {
    setFilteredBlogs(blogs);  // Đảm bảo filteredBlogs có giá trị ban đầu
  }, []);

return (
  <View style={styles.container}>
    {/* Back Button và TextInput trong cùng một hàng */}
    <View style={styles.searchRowContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>&lt;</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        {/* Kính lúp nằm bên trong TextInput */}
        <Image source={require('../assets/imgKinhLup.png')} style={styles.iconInInput} />
        <TextInput
          style={styles.input}
          placeholder="  Search topic . . . . "
          value={text}
          onChangeText={handleSearch} // Gọi hàm tìm kiếm khi thay đổi text
          placeholderTextColor="#9e9e9e"
        />
        <Image style={styles.avatar} source={require('../assets/imgpeople.png')} />
      </View>
    </View>

    {/* Chữ "For you" */}
    <Text style={styles.text}>For you</Text>

    {/* Các nút bấm với background nằm trong hàng ngang */}
    <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.card} onPress={() => openModal('Nutrition')}>
        <Image style={styles.cardIcon} source={require('../assets/imgHamber.png')} />
        <Text style={styles.cardText}>Nutrition</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => openModal('Sports')}>
        <Image style={styles.cardIcon} source={require('../assets/imgfooter.png')} />
        <Text style={styles.cardText}>Sports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => openModal('Running')}>
        <Image style={styles.cardIcon} source={require('../assets/imgShoes.png')} />
        <Text style={styles.cardText}>Running</Text>
      </TouchableOpacity>
    </View>

    {/* Chữ "Newest Blogs" */}
    <Text style={styles.text}>Newest Blogs</Text>
    <TouchableOpacity onPress={viewMoreBlogs}>
      <Text style={styles.text1}>view more -></Text>
    </TouchableOpacity>

    {/* Danh sách các blog */}
    <ScrollView>
      {filteredBlogs.length > 0 && filteredBlogs.slice(0, 5).map((blog, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.blogCard}
          onPress={() => blog.url ? openLink(blog.url) : null}
        >
          <Image style={styles.blogImage} source={blog.image} />
          <Text style={styles.blogTitle}>{blog.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Modal */}
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Blogs</Text>
          <ScrollView>
            {modalBlogs.length > 0 ? modalBlogs.map((blog, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.blogCard}
                onPress={() => blog.url ? openLink(blog.url) : null}
              >
                <Image style={styles.blogImage} source={blog.image} />
                <Text style={styles.blogTitle}>{blog.title}</Text>
              </TouchableOpacity>
            )) : (
              <Text style={styles.modalTitle}>No blogs found</Text>
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55BDEA',
    padding: 10,
  },
  backButton: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  backArrow: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginTop:-15,
    marginLeft:-15,
  },
  searchRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
   
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,  // Đảm bảo chiếm hết không gian
    position: 'relative',
  },
  iconInInput: {
    position: 'absolute',
    left: 10,
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 30,  // Đảm bảo có đủ khoảng trống cho kính lúp
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    width: '30%',
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
  text1: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'center',
    marginVertical: 10,
    marginTop:-33,
    marginLeft:250,
  },
  blogCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
  blogImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  blogTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
