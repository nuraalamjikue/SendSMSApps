// src/screens/LoginScreen.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import instance from '../Axiosinstance';
import Spinner from 'react-native-loading-spinner-overlay';
import MyButton from './Button/MyButton';
interface RootState {
  userInfo: {
    getEmployeeCode: string;
    getPassword: string;
    getToken: string; // Added getToken flag
  };
}

import {
  setCurrentPassword,
  setEmployeeCodetoolkit,
  setRoleID,
  setCreateByID,
  setToken,
} from '../store/reducers/userInfoSlice';
import {useDispatch, useSelector} from 'react-redux';

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const dispatch = useDispatch();

  const {getEmployeeCode, getPassword} = useSelector(
    (state: RootState) => state.userInfo,
  );
  const {getToken} = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    setLoading(true);
    // Check if the token is already set
    if (getToken === 'Login Successfully.') {
      navigation.replace('Dashboard');
      setLoading(false);
    }
  }, [getToken, navigation]);

  const handlesetUserNameChange = (usename: any) => {
    setUserName(usename);
  };
  const handlesetPasswordChange = (password: any) => {
    setPassword(password);
  };

  const handleLogin = () => {
    setLoading(true); // Start loading

    var data = {
      id: 0,
      userName: userName,
      password: password,
      isActive: true,
      roleId: 0,
      employeeId: 'string',
      mobile: 'string',
      userType: 'string',
      name: 'string',
      designation: 'string',
      department: 'string',
    };

    var data2 = {
      company: 'string',
      id: 0,
      employeeCode: userName,
      punchCardNo: 'string',
      employeeName: 'string',
      designation: 'string',
      department: 'string',
      floor: 'string',
      line: 'string',
      section: 'string',
      mobileNo: 'string',
      doj: 'string',
      names: 'string',
      photo: 'string',
    };

    instance
      .post(`/Login`, data) // Use POST method and pass data
      .then((response: any) => {
        if (response.data === 'Login Successfully.') {
          dispatch(setToken(response.data));
          instance
            .post(`/Login/search`, data2) // Use POST method and pass data
            .then((response: any) => {
              dispatch(setEmployeeCodetoolkit(userName));
              dispatch(setCurrentPassword(userName));
              dispatch(setRoleID(response.data.UserType));
              dispatch(setCreateByID(response.data.UserId));
              setLoading(false);
            });
        } else {
          // Handle login failure
          Alert.alert('Login failed');
        }
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
        Alert.alert('An error occurred');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={handlesetUserNameChange}
        value={userName}
        placeholder="Enter User Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        onChangeText={handlesetPasswordChange}
        value={password}
        placeholder="Enter Password"
        placeholderTextColor="#999"
      />
      <View style={styles.Submit_Area}>
        <MyButton onPress={() => handleLogin()} title="Login" B_width="98%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 4,
    fontSize: 12,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Submit_Area: {justifyContent: 'center', alignItems: 'center', width: '92%'},
});

export default LoginScreen;
