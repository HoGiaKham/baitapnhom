import React from 'react';
import { SafeAreaView, ScrollView, Text, Image } from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

const Test1 = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 96 }}>If you like</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 96 }}>Scrolling down</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 96 }}>What's the best</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 96 }}>Framework around?</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 80 }}>React Native</Text>
    </ScrollView>
  </SafeAreaView>
);

export default Test1;
