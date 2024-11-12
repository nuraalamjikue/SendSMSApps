import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const Dashboard = ({navigation}: {navigation: any}) => {
  const handleButtonPress = (button: any) => {
    console.log(`${button} button pressed`);
    if (button === 'Button 1') {
      // Navigate to Messages screen
      navigation.navigate('Messages');
    } else if (button === 'Button 2') {
      // Navigate to ExcelWiseMessageSend screen
      navigation.navigate('ExcelWiseMessageSend');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Snowtex Message Send Center</Text>
      <Pressable
        style={styles.buttonBlue}
        onPress={() => handleButtonPress('Button 1')}>
        <Text style={styles.buttonText}>
          Send message with api and Sim Wise
        </Text>
      </Pressable>
      <Pressable
        style={styles.buttonGreen}
        onPress={() => handleButtonPress('Button 2')}>
        <Text style={styles.buttonText}>Send message With Excel data wise</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#000',
    marginBottom: 20,
  },
  buttonBlue: {
    backgroundColor: '#007BFF', // Blue color for Button 1
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonGreen: {
    backgroundColor: '#28a745', // Green color for Button 2
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
