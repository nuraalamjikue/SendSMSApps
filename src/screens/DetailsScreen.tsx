import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MQTT from 'sp-react-native-mqtt';
import Spinner from 'react-native-loading-spinner-overlay';
let mqttClient: any;
const DetailsScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    if (!mqttClient) {
      console.warn('MQTT client not initialized.');
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      console.warn('Message is empty.');
      return;
    }

    try {
      const formattedMessage = `{"cycleCount":450,"setDisplay":true,"realTime":0,"target":296,"style":324230,"cumulate":0,"finished":0,"rework":0,"reworkRate":0,"good":0,"step":5,"horonTIme":12,stopTime:0}`;
      mqttClient.publish(
        'conveyorbelt/recived/CB-22222',
        formattedMessage,
        0,
        false,
      );
      setMessage('');
    } catch (err) {
      console.error('Failed to publish message:', err);
    }
  };

  useEffect(() => {
    //  setLoading(true);
    // Initialize MQTT client if not already initialized
    if (!mqttClient) {
      MQTT.createClient({
        uri: 'mqtt://172.16.16.4:1883',
        clientId: '123456',
      })
        .then(client => {
          mqttClient = client;
          client.on('closed', () => console.log('mqtt.event.closed'));
          client.on('error', msg => console.log('mqtt.event.error', msg));
          client.on('message', msg => {
            console.log('mqtt.event.message', msg);
            Alert.alert(msg.data);
            // Handle received message here
            setLoading(false);
          });

          client.on('connect', () => {
            console.log('connected');
            client.subscribe('/mmmm', 0);
          });

          client.connect();
        })
        .catch(err => console.log(err));

      // Cleanup function
      return () => {
        if (mqttClient) {
          mqttClient.disconnect();
          mqttClient = null;
          setLoading(false);
        }
      };
    }
  }, []); // Empty dependency array means this effect runs only once

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>

      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  spinnerText: {
    color: '#FFF',
  },
});

export default DetailsScreen;
