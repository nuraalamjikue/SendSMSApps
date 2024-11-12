import React from 'react';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';

interface MyButtonProps {
  title: string;
  B_width: string | number;
  onPress: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({title, B_width, onPress}) => {
  const buttonStyle: ViewStyle = {
    width: B_width,
    backgroundColor: '#841584',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // elevation: 3, // for Android shadow
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyButton;
