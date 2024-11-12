// src/screens/HomeScreen.tsx

import React from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  LineSetup: undefined;
  MCDetails: undefined; // Add other screen params here
  ConveyorBeltsSetup: undefined; // Add other screen params here
  SmockingPage: undefined; // Add other screen params here
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />

      <Button
        title="Go to MC Details"
        onPress={() => navigation.navigate('MCDetails')}
      />
      <Pressable onPress={() => navigation.navigate('ConveyorBeltsSetup')}>
        <Text>I'm pressable!</Text>
      </Pressable> */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('ConveyorBeltsSetup')}>
          <Text style={styles.text}>Conveyor Belts Setup</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('LineSetup')}>
          <Text style={styles.text}>Line Setup</Text>
        </Pressable>
      </View>
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('SmockingPage')}>
          <Text style={styles.text}>Smocking</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('LineSetup')}>
          <Text style={styles.text}>Line Setup</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    height: '60%',
    width: '48%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
