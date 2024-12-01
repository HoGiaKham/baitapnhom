import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginComponent({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false); 
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Hàm đăng nhập
    const handleSignIn = async () => {
        setErrorMessage('');

        // Kiểm tra nếu chưa nhập username hoặc password
        if (!username || !password) {
            setErrorMessage('Vui lòng nhập tên đăng nhập và mật khẩu');
            return;
        }

        try {
            // Lấy dữ liệu từ API
            const response = await fetch('https://6739b731a3a36b5a62ef6075.mockapi.io/user');
            const data = await response.json();

            // Kiểm tra xem có user nào khớp với username và password không
            const user = data.find(user => user.username === username && user.password === password);

            if (user) {
                // Điều hướng đến màn hình chính với ID người dùng
                 navigation.navigate('Main', { username: user.username });
            } else {
                setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu: ', error);
            setErrorMessage('Có vấn đề khi đăng nhập. Vui lòng thử lại sau.');
        }
    };

    // Hàm kích hoạt chế độ quên mật khẩu
    const handleForgotPassword = () => {
        setIsForgotPassword(true);
        setUsername('');
        setPassword('');
        setNewPassword('');
        setErrorMessage('');
    };

    // Hàm đặt lại mật khẩu
    const handlePasswordReset = async () => {
        if (!username) {
            setErrorMessage('Vui lòng nhập tên đăng nhập');
            return;
        }

        if (!newPassword || newPassword.length < 6) {
            setErrorMessage('Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }

        try {
            const response = await fetch('https://6739b731a3a36b5a62ef6075.mockapi.io/user');
            const data = await response.json();
            const user = data.find(user => user.username === username);

            if (user) {
                // Gửi yêu cầu đặt lại mật khẩu
                await fetch(`https://6739b731a3a36b5a62ef6075.mockapi.io/user/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: newPassword }),
                });
                Alert.alert('Đặt lại mật khẩu thành công', 'Mật khẩu của bạn đã được đặt lại.');
                setIsForgotPassword(false);
                setUsername('');
                setNewPassword('');
            } else {
                setErrorMessage('Tên đăng nhập không tồn tại');
            }
        } catch (error) {
            console.error('Lỗi khi đặt lại mật khẩu: ', error);
            setErrorMessage('Có vấn đề khi đặt lại mật khẩu. Vui lòng thử lại sau.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>WELCOME BACK! <Text style={styles.emoji}>👋</Text></Text>
            <Image style={styles.logo} source={require('../assets/previousimg2.png')} />

            {!isForgotPassword ? (
                <>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        placeholderTextColor="#B0B0B0"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputWithIcon}
                            placeholder="Enter password"
                            placeholderTextColor="#B0B0B0"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
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
                    ) : null}

                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
                        <Text style={styles.btnText}>Sign in</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.label}>Enter your username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter username"
                        placeholderTextColor="#B0B0B0"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new password"
                        placeholderTextColor="#B0B0B0"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />

                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        </View>
                    ) : null}

                    <TouchableOpacity style={styles.btn} onPress={handlePasswordReset}>
                        <Text style={styles.btnText}>Reset Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backButton} onPress={() => setIsForgotPassword(false)}>
                        <Text style={styles.backButtonText}>Back to Sign In</Text>
                    </TouchableOpacity>
                </>
            )}

            <Text style={styles.divider}>or login with</Text>
            <View style={styles.socialIcons}>
                <Image style={styles.socialIcon} source={require('../assets/imggoogle.png')} />
                <Image style={styles.socialIcon} source={require('../assets/imgfacebook.png')} />
                <Image style={styles.socialIcon} source={require('../assets/imgapple.png')} />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <View style={styles.signupContainer}>
                    <Text>Don’t have an account? <Text style={styles.signup}>Sign up</Text></Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4fb9e7',
        padding: 20,
        justifyContent: 'flex-start',
    },
    logo: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginTop:10,
    },
    welcome: {
      marginTop:15,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    emoji: {
        fontSize: 26,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'flex-start',
        marginTop:10,
    },
    passwordLabel: {
        marginTop: 20,
    },
    input: {
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    inputWithIcon: {
        flex: 1,
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
    },
    errorContainer: {
        marginVertical: 10,
    },
    errorMessage: {
        color: '#e74c3c',
    },
    forgotPassword: {
        color: '#007bff',
        textAlign: 'flex-end',
        marginTop: 10,
        marginLeft:180,
    },
    btn: {
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    divider: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: '#000',
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    socialIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
    signupContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signup: {
        color: '#4caf50',
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#007bff',
    },
});
