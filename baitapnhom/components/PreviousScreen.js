import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

// Định nghĩa PreviousScreen
export default function PreviousScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEALTHY CHECK</Text>
      
   <Image style={styles.logo1} source={require('../assets/previousimg.png')} />
    <Image style={styles.logo2} source={require('../assets/previousimg2.png')} />


    <Text style={styles.text}>
  Let’s start your{'\n'}
  health journey today{'\n'}
  with us!
    </Text>

    <TouchableOpacity
     style={styles.button}
     onPress={() => navigation.navigate('Login')} 
    >
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
 
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4FB9E7',
  },
  logo1:{
    width:'100%',
    height:200,
    marginTop:10,
  },
  logo2:{
    marginTop:20,
    width:80,
    height:80,
    marginLeft:15,
  },
  title: {
    marginTop:20,
    
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  text:{
    marginLeft:30,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: 'semibold',
    marginTop:10,
  },
button: {
  backgroundColor: '#D9D9D9',
  paddingVertical: 12,
  borderRadius: 50,
  width: 250,
  height: 60,
  justifyContent: 'center', // Căn chữ giữa theo chiều dọc
  alignItems: 'center', // Căn chữ giữa theo chiều ngang
  alignSelf: 'center',
  marginTop: 15,
},
buttonText: {
  color: '#677770',
  fontSize: 18,
  fontWeight: '500',
},

});
