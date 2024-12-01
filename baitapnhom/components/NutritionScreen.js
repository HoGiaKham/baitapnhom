import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Để xử lý việc quay lại màn hình

export default function NutritionScreen({ route }) {
  const navigation = useNavigation(); // Khởi tạo navigation
  const { averageNutrition } = route.params;
  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backArrowContainer} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>&lt;</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Nutritions</Text>

      <Text style={styles.textmain}>
        You have {"\n"} 
        consumed <Text style={styles.highlight}>{averageNutrition} kcal</Text> {"\n"} 
        avarage
      </Text>

      <View style={styles.imageContainer}>
        <Image style={styles.logoMain} source={require('../assets/imgMainNurScr.png')} />
      </View>

      <View style={styles.footer}>
        {/* Nút Fat */}
        <TouchableOpacity style={styles.button}>
          <Image style={styles.icon} source={require('../assets/imgRedNurScr.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Fat</Text>
            <Text style={styles.buttonText}>80g</Text>
            <Text style={styles.buttonText}>40%</Text>
          </View>
        </TouchableOpacity>

        {/* Nút Protein */}
        <TouchableOpacity style={styles.button}>
          <Image style={styles.icon} source={require('../assets/imgPinkNurScr.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Protein</Text>
            <Text style={styles.buttonText}>160g</Text>
            <Text style={styles.buttonText}>56%</Text>
          </View>
        </TouchableOpacity>

        {/* Nút Carbs */}
        <TouchableOpacity style={styles.button}>
          <Image style={styles.icon} source={require('../assets/imgBlueNurScr.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Carbs</Text>
            <Text style={styles.buttonText}>230g</Text>
            <Text style={styles.buttonText}>62%</Text>
          </View>
        </TouchableOpacity>

      
        <TouchableOpacity style={styles.addmealbutton}>
          <Text style={styles.addMealText}>Add Meal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4fb9e7',
    padding: 15,
    flex: 1, 
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoMain: {
    width: 170, 
    height: 170, 
    marginTop:-40,
  },
  highlight: {
    color: '#0f52ba',
    fontWeight: '700',
  },
  textmain: {
    textAlign: 'center',
    fontSize: 22, 
    marginVertical: 3, 
  },
  backArrowContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 1,
  },
  backArrow: {
    fontSize: 26, 
    fontWeight: '400',
    color: '#c08f8f',
  },
  title: {
    fontSize: 28, 
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    flex: 1,
  },
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D9',
    paddingVertical: 12,
    paddingHorizontal: 18, 
    borderRadius: 10,
    width: '100%', 
    marginBottom: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginTop:-5,
  },
  icon: {
    width: 35,
    height: 35, 
    marginRight: 8, 
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    flex: 1,
  },
  buttonText: {
    color: '#000',
    fontSize: 16, 
    fontWeight: '600',
    flex: 1,
    textAlign: 'center', 
  },
  addmealbutton: {
    backgroundColor: '#4698C4', 
    marginTop: 20, 
    width:250,
    borderRadius:25,
  },
  addMealText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFEFE', 
    textAlign: 'center',
    paddingVertical: 10,
  },
});
