import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PreviousScreen from './components/PreviousScreen';
import LoginComponent from './components/SignInScreen';
import MainScreen from './components/MainScreen';
import AllDataScreen from './components/AllDataScreen';
import StepsScreen from './components/StepsSCreen';
import CycleTrackingScreen from './components/CycleTrackingScreen';
import SleepScreen from './components/SleepScreen';
import NutritionScreen from './components/NutritionScreen';
import SignUp from './components/SignUp';
import Test1 from './components/Test1';
import SharingScreen from './components/SharingScreen';
import SettingScreen from './components/SettingScreen';
import ExploreScreen from './components/ExploreScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PreviousScreen">
          <Stack.Screen
            name="Test1"
            component={Test1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PreviousScreen"
            component={PreviousScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllDataScreen"
            component={AllDataScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StepsScreen"
            component={StepsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CycleTrackingScreen"
            component={CycleTrackingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SleepScreen"
            component={SleepScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NutritionScreen"
            component={NutritionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExploreScreen"
            component={ExploreScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SharingScreen"
            component={SharingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
