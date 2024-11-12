// import 'react-native-gesture-handler';
// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import HomeScreen from './src/screens/HomeScreen';
// import DetailsScreen from './src/screens/DetailsScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import MCDetails from './src/screens/MC/MCDetails';
// import {Alert, Button} from 'react-native';
// import ConveyorBeltsSetup from './src/screens/ConveyorBelts/ConveyorBeltsSetup';
// import Smocking from './src/Smocking/Smocking';

// type RootStackNavigatorParamsList = {
//   Home: undefined;
//   Details: undefined;
//   Profile: undefined;
//   MCDetails: undefined;
//   ConveyorBeltsSetup: undefined;
//   SmockingPage: undefined;
// };

// const RootStack = createStackNavigator<RootStackNavigatorParamsList>();

// const App: React.FC = () => {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator initialRouteName="Home">
//         <RootStack.Screen name="Home" component={HomeScreen} />
//         <RootStack.Screen name="Details" component={DetailsScreen} />
//         <RootStack.Screen name="SmockingPage" component={Smocking} />
//         <RootStack.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             title: 'User Profile',
//             headerTitleStyle: {color: 'red'},
//             headerTintColor: 'red',
//             headerStyle: {backgroundColor: 'lightblue'},
//             headerLeft: () => (
//               <Button
//                 onPress={() => Alert.alert('Go back')}
//                 title="Back"
//                 color="red"
//               />
//             ),
//           }}
//         />
//         <RootStack.Screen
//           name="MCDetails"
//           component={MCDetails}
//           options={{
//             title: 'MC Details',
//             headerTitleStyle: {color: 'purple'},
//           }}
//         />

//         <RootStack.Screen
//           name="Smocking"
//           component={Smocking}
//           options={{
//             title: 'Smocking Settings',
//             headerTitleStyle: {color: 'purple'},
//           }}
//         />

//         <RootStack.Screen
//           name="ConveyorBeltsSetup"
//           component={ConveyorBeltsSetup}
//           options={{
//             title: 'Conveyor Belts Setup',
//             headerTitleStyle: {color: 'purple'},
//           }}
//         />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import 'react-native-gesture-handler';
// import {NavigationContainer, useNavigation} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons';
// import HomeScreen from './src/screens/HomeScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import ConveyorBeltsSetup from './src/screens/ConveyorBelts/ConveyorBeltsSetup';
// import LoginScreen from './src/screens/LoginScreen';
// import {Provider, useDispatch, useSelector} from 'react-redux';
// import store, {persistor} from './src/store';
// import {PersistGate} from 'redux-persist/integration/react';
// import Modal from 'react-native-modal';
// import {
//   setCreateByID,
//   setCurrentPassword,
//   setEmployeeCodetoolkit,
//   setRoleID,
//   setToken,
// } from './src/store/reducers/userInfoSlice';
// const {height, width} = Dimensions.get('window');

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// interface RootState {
//   userInfo: {
//     getEmployeeCode: string;
//     getPassword: string;
//     CreateByID: string;
//   };
// }

// const MainTabs: React.FC = () => {
//   const {getEmployeeCode, getPassword, CreateByID} = useSelector(
//     (state: RootState) => state.userInfo,
//   );

//   console.log('navigation navigation' + getEmployeeCode);

//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color, size}) => {
//           let iconName: string;
//           switch (route.name) {
//             case 'Home':
//               iconName = 'home-outline';
//               break;
//             case 'LineSetup':
//               iconName = 'person-outline';
//               break;
//             case 'MCDetails':
//             case 'Details':
//               iconName = 'information-circle-outline';
//               break;
//             case 'ConveyorBeltsSetup':
//               iconName = 'settings-outline';
//               break;
//             default:
//               iconName = 'circle';
//               break;
//           }
//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'tomato',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//           ...styles.tabContainer,
//           borderTopColor: 'transparent',
//           elevation: 0,
//           backgroundColor: '#612697',
//         },
//       })}>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: 'Dashboard',
//           headerTitleStyle: {color: '#fff'},
//           tabBarLabel: 'Setup',
//           headerTintColor: 'purple',
//           headerStyle: {backgroundColor: '#612697'},
//           headerRight: () => <HeaderMenu />,
//         }}
//       />

//       {getEmployeeCode === '09010016353' ? (
//         <Tab.Screen
//           name="LineSetup"
//           component={ProfileScreen}
//           options={{
//             headerRight: () => <HeaderMenu />,
//           }}
//         />
//       ) : null}

//       <Tab.Screen
//         name="ConveyorBeltsSetup"
//         component={ConveyorBeltsSetup}
//         options={{
//           title: 'Conveyor Belts Setup',
//           headerTitleStyle: {color: '#fff'},
//           tabBarLabel: 'Setup',
//           headerTintColor: 'purple',
//           headerStyle: {backgroundColor: '#612697'},
//           headerRight: () => <HeaderMenu />,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const HeaderMenu: React.FC = () => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   type RootStackParamList = {
//     Login: undefined;
//     Dashboard: undefined;
//     // Other routes...
//   };

//   const navigation = useNavigation<RootStackParamList>();

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     // Perform logout logic

//     toggleModal();
//     dispatch(setEmployeeCodetoolkit(''));
//     dispatch(setCurrentPassword(''));
//     dispatch(setRoleID(''));
//     dispatch(setCreateByID(''));
//     dispatch(setToken(''));
//     navigation.replace('Login');
//   };

//   return (
//     <>
//       <TouchableOpacity onPress={toggleModal} style={{marginRight: 20}}>
//         <Icon name="person-outline" size={24} color="#fff" />
//       </TouchableOpacity>
//       <Modal
//         isVisible={isModalVisible}
//         onBackdropPress={toggleModal}
//         style={styles.modal}>
//         <View style={styles.modalContent}>
//           <TouchableOpacity
//             onPress={() => handleLogout()}
//             style={styles.menuItem}>
//             <Text style={styles.menuItemText}>Log Out</Text>
//           </TouchableOpacity>
//           <Text style={styles.menuItem}>Menu Item 1</Text>
//           <Text style={styles.menuItem}>Menu Item 2</Text>
//           <Text style={styles.menuItem}>Menu Item 3</Text>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <NavigationContainer>
//           <Stack.Navigator>
//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{headerShown: false}}
//             />
//             <Stack.Screen
//               name="Dashboard"
//               component={MainTabs}
//               options={{headerShown: false}}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </PersistGate>
//     </Provider>
//   );
// };

// const styles = StyleSheet.create({
//   tabContainer: {
//     position: 'absolute',
//     bottom: 3,
//     left: 8,
//     right: 8,
//     elevation: 5,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     height: height / 15,
//     justifyContent: 'center',
//     alignContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 10},
//     shadowOpacity: 0.9,
//   },
//   modal: {
//     justifyContent: 'flex-start', // Align content to the top
//     alignItems: 'flex-end',
//     margin: 50, // Remove default margin
//     padding: 0, // Remove default padding
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     //width: '50%', // Full width
//     maxHeight: '50%', // Optional: adjust height as needed
//     marginLeft: 20,
//   },

//   menuItem: {
//     fontSize: 18,
//     marginBottom: 10,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   menuItemText: {
//     color: '#000', // Adjust text color if needed
//   },
// });

// export default App;

// import React from 'react';
// import {View, Text} from 'react-native';
// import Messages from './src/SMS/Messages';

// const App = () => {
//   return (
//     <View style={{marginTop: '2%', alignSelf: 'center'}}>
//       <Messages />
//     </View>
//   );
// };

// export default App;

// import React from 'react';
// import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

// import Dashboard from './src/Dashboard/Dashboard';

// const App = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.centeredView}>
//           <Dashboard />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: '10%',
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centeredView: {
//     marginTop: '2%',
//   },
// });

// export default App;
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './src/Dashboard/Dashboard';
import Messages from './src/SMS/Messages';
import ExcelWiseMessageSend from './src/SMS/ExcelWiseMessageSend';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard', // Set header title
            headerStyle: {
              backgroundColor: '#007BFF', // Customize header background color
            },
            headerTintColor: '#fff', // Set header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set font weight for the header title
            },
          }}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{
            title: 'Messages', // Set header title
            headerStyle: {
              backgroundColor: '#400061', // Customize header background color
            },
            headerTintColor: '#fff', // Set header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set font weight for the header title
            },
          }}
        />
        <Stack.Screen
          name="ExcelWiseMessageSend"
          component={ExcelWiseMessageSend}
          options={{
            title: 'Excel Wise Message Send', // Set header title
            headerStyle: {
              backgroundColor: '#155638', // Customize header background color
            },
            headerTintColor: '#fff', // Set header text color
            headerTitleStyle: {
              fontWeight: 'bold', // Set font weight for the header title
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import React from 'react';
// import {View, Text} from 'react-native';
// import Smocking from './src/Smocking/Smocking';

// const App = () => {
//   return (
//     <View style={{marginTop: '2%', alignSelf: 'center'}}>
//       <Smocking />
//     </View>
//   );
// };

// export default App;
