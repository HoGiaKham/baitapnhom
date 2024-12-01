import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

export default function SignUpComponent({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    setErrorMessage('');

    // Kiểm tra thông tin nhập vào
    if (!username || !password || !email) {
      setErrorMessage('Vui lòng nhập tất cả thông tin');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    try {
      const user = { username, password, email };

      // Gửi yêu cầu đăng ký tới MockAPI
      const response = await fetch(
        'https://6739b731a3a36b5a62ef6075.mockapi.io/dangnhap',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );

      // Kiểm tra phản hồi từ MockAPI
      if (!response.ok) {
        throw new Error('Có vấn đề khi đăng ký. Vui lòng thử lại sau.');
      }

      const responseData = await response.json();

      // Hiển thị thông báo đăng ký thành công
      Alert.alert('Đăng ký thành công', 'Tài khoản của bạn đã được tạo.', [
        {
          text: 'OK',
          onPress: () => {
            // Quay lại màn hình đăng nhập
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      console.error('Lỗi khi đăng ký: ', error);
      setErrorMessage('Có vấn đề khi đăng ký. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header chứa nút < và tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrowContainer}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backArrow}>&lt;</Text>
        </TouchableOpacity>

        <Text style={styles.welcome}>Tạo tài khoản mới</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          placeholderTextColor="#B0B0B0"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Tên đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên đăng nhập"
          placeholderTextColor="#B0B0B0"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={[styles.label, styles.passwordLabel]}>Mật khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#B0B0B0"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#B0B0B0"
            />
          </TouchableOpacity>
        </View>

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        ) : (
          <View style={styles.errorPlaceholder} />
        )}

        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
          <Text style={styles.btnText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4fb9e7',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -150,
  },
  backArrowContainer: {
    marginRight: 10,
  },
  backArrow: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#c08f8f',
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  passwordLabel: {
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputWithIcon: {
    flex: 1,
    height: 45,
    color: '#000',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  btn: {
    backgroundColor: '#A2C9FF',
    width: '100%',
    paddingVertical: 12,
    marginTop: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
  },
  errorPlaceholder: {
    height: 40,
    marginTop: 15,
  },
});
