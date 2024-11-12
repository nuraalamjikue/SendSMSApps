import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Button,
  useColorScheme,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MyButton from '../Button/MyButton';
import instance from '../../Axiosinstance';
import Spinner from 'react-native-loading-spinner-overlay';
import MQTT from 'sp-react-native-mqtt';
import Toast from 'react-native-toast-message';
import {IconButton, TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
const {height, width} = Dimensions.get('window');

let mqttClient: any;

const ConveyorBeltsSetup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadcompany, setLoadCompany] = useState<any>([]);
  const [company, setCompany] = useState<any>(0);
  const [loadfloor, setLoadFloor] = useState<any>([]);
  const [floor, setFloor] = useState<any>(0);
  const [loadline, setLoadLine] = useState<any>([]);
  const [line, setLine] = useState<any>(0);
  const [conveyorIdName, setConveyorIdName] = useState<string>();

  const [loadBuyer, setLoadBuyer] = useState<any>([]);
  const [buyer, setBuyer] = useState<any>(0);

  const [loadstyle, setLoadStyle] = useState<any>([]);
  const [style, setStyle] = useState<any>(0);

  const [loadSeason, setLoadSeason] = useState<any>([]);
  const [season, setSeason] = useState<any>(0);

  const [cycletime, setCycletime] = useState<any>(0);
  const [target, setTarget] = useState<any>(0);
  const [realTime, setRealTime] = useState<any>(0);

  const [goodwork, setGoodwork] = useState<any>(0);
  const [step, setStep] = useState<any>(0);
  const [horontime, setHorontime] = useState<any>(0);
  const [stoptime, setStoptime] = useState<any>(0);
  const [finished, setFinished] = useState<any>(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const [conveyorIdAfterSendDataName, setConveyorIdAfterSendDataName] =
    useState<any>('');
  const [formattedMessage, setFormattedMessage] = useState<any>('');

  const handleToastMsg = (getType: any, getText: any) => {
    Toast.show({
      type: getType,
      text1: getText,
      visibilityTime: 2000,
    });
  };

  const handlecycletimeChange = (cycletime: any) => {
    setCycletime(cycletime);
  };

  const handletargetChange = (target: any) => {
    setTarget(target);
  };
  const handleRealTimeChange = (Cumulate: any) => {
    setRealTime(Cumulate);
  };

  const handleGoodworkChange = (text: any) => {
    setGoodwork(text);
  };

  const handleSetpChange = (text: any) => {
    setStep(text);
  };

  const handleHorontimeChange = (text: any) => {
    setHorontime(text);
  };

  const handleStoptimeChange = (text: any) => {
    setStoptime(text);
  };

  const handleFinishedChange = (text: any) => {
    setFinished(text);
  };

  // Load data Ara
  useEffect(() => {
    setLoading(true);
    const handleCompany = () => {
      instance
        .get('Conveyorbelt/getCompany')
        .then((response: any) => {
          let newArray = response.data.map((item: any) => {
            return {value: item.Id, label: item.CompanyName};
          });
          setLoadCompany(newArray);
          setLoading(false);
        })
        .catch((e: any) => {
          console.log(e);
          setLoading(false);
        });
    };

    handleCompany();
  }, []);

  const handleFloor = (company_ID: any) => {
    instance
      .get(`Conveyorbelt/getfloor/${company_ID}`)
      .then((response: any) => {
        // console.log(
        //   'getfloor response' + JSON.stringify(response.data, null, 2),
        // );

        let newArray = response.data.map((item: any) => {
          return {value: item.FloorID, label: item.FloorName};
        });
        setLoadFloor(newArray);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleLine = (F_floor_ID: any) => {
    // console.log('handleLine', floor);
    // console.log('F_company_ID', company);

    instance
      .get(`Conveyorbelt/getLine/${company}/${F_floor_ID}`)
      .then((response: any) => {
        // console.log(
        //   'getfloor response' + JSON.stringify(response.data, null, 2),
        // );

        let newArray = response.data.map((item: any) => {
          return {value: item.LineId, label: item.LineName};
        });
        setLoadLine(newArray);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };
  const hendlegetConveyorIdName = (LineId: any) => {
    console.log('getConveyorId' + LineId);

    instance
      .get(`Conveyorbelt/getConveyorIdName/${LineId}`)
      .then((response: any) => {
        console.log(
          'getfloor response' +
            JSON.stringify(response.data[0].ConveyorIDName, null, 2),
        );
        setConveyorIdName(response.data[0].ConveyorIDName);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleBuyer = () => {
    instance
      .get('Conveyorbelt/getBuyer')
      .then((response: any) => {
        let newArray = response.data.map((item: any) => {
          return {value: item.BuyerId, label: item.BuyerName};
        });
        setLoadBuyer(newArray);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };
  const handlestyle = (Buyer_ID: any) => {
    console.log(
      'Handling' + `Conveyorbelt/getStyle/${company}/${line}/${Buyer_ID}`,
    );

    instance
      .get(`Conveyorbelt/getStyle/${company}/${line}/${Buyer_ID}`)
      .then((response: any) => {
        console.log('response' + JSON.stringify(response.data));

        let newArray = response.data.map((item: any) => {
          return {value: item.StyleNo, label: item.StyleNo};
        });
        setLoadStyle(newArray);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleSeason = () => {
    instance
      .get(`Conveyorbelt/getSeason/${buyer}`)
      .then((response: any) => {
        let newArray = response.data.map((item: any) => {
          return {value: item.SeasonId, label: item.SeasonName};
        });
        setLoadSeason(newArray);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    const Data = {
      company: company,
      floor: floor,
      line: line,
      style: style,
      cycletime: cycletime,
      target: target,
      realTime: realTime,
      goodwork: goodwork,
      step: step,
      horontime: horontime,
      stoptime: stoptime,
    };
    Alert.alert('hit me' + JSON.stringify(Data, null, 2));
    console.log('hit me' + JSON.stringify(Data, null, 2));

    setCompany([]);
    setFloor(0);
    setLine(0);
    setStyle(0);
    setCycletime(0);
    setTarget(0);
    setRealTime(0);
    setGoodwork(0);
    setStep(0);
    setHorontime(0);
    setStoptime(0);
  };

  const sendMessage = () => {
    if (!mqttClient) {
      console.warn('MQTT client not initialized.');
      return;
    }

    if (!line) {
      handleToastMsg('error', `Please select a Line`);
      return;
    }
    if (!style) {
      handleToastMsg('error', `Please select a Style`);
      return;
    }

    if (!cycletime) {
      handleToastMsg('error', `Cycletime is Empty`);
      return;
    }

    if (!realTime || !target || !goodwork || !step || !horontime || !stoptime) {
      handleToastMsg('error', `Cycletime is Empty`);
      return;
    }

    try {
      const formattedMessage = `{"cycleCount":${cycletime},"setDisplay":true,"realTime":${realTime},"target":${target},"style":"${style}","cumulate":0,"finished":0,"rework":0,"reworkRate":0,"good":${goodwork},"step":${step},"horonTIme":${horontime},stopTime:${stoptime}}`;
      mqttClient.publish(conveyorIdName, formattedMessage, 0, false);

      // Set modal visibility and pass the data
      setModalVisible(true);
      setConveyorIdAfterSendDataName(conveyorIdName);
      setFormattedMessage(formattedMessage);

      // Reset form fields
      setCycletime('');
      setTarget('');
      setRealTime('');
      setGoodwork('');
      setStep('');
      setHorontime('');
      setStoptime('');
      setStyle(0);
      setBuyer(0);
      setLine(0);
      setFloor(0);
      setCompany(0);
      setConveyorIdName('');
    } catch (err) {
      console.error('Failed to publish message:', err);
    }
  };

  useEffect(() => {
    //  setLoading(true);
    // Initialize MQTT client if not already initialized

    const randomNumber = String(
      Math.floor(Math.random() * 100000000000),
    ).padStart(11, '0');

    if (!mqttClient) {
      MQTT.createClient({
        uri: 'mqtt://172.16.16.4:1883',
        clientId: randomNumber,
      })
        .then((client: any) => {
          mqttClient = client;
          client.on('closed', () => console.log('mqtt.event.closed'));
          client.on('error', (msg: any) =>
            console.log('mqtt.event.error', msg),
          );
          client.on('message', (msg: any) => {
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
        .catch((err: any) => console.log(err));

      // Cleanup function
      return () => {
        if (mqttClient) {
          mqttClient.disconnect();
          mqttClient = null;
          setLoading(false);
        }
      };
    }
  }, []);

  const scheme = useColorScheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 600,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 15,
            }}>
            <View style={styles.Company_Arae}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemContainerStyle={[
                  {
                    backgroundColor: scheme === 'dark' ? '#000' : '#f9f9f9',

                    // borderBottomColor: scheme === 'dark' ? '#555' : '#ddd',
                  },
                ]}
                iconStyle={styles.iconStyle}
                data={loadcompany}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Company Name"
                searchPlaceholder="Search..."
                value={company}
                onChange={item => {
                  setCompany(item.value);
                  handleFloor(item.value);
                }}
              />
            </View>

            <View style={styles.Company_Arae}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={loadfloor}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Floor Name"
                searchPlaceholder="Search..."
                value={floor}
                onChange={item => {
                  setFloor(item.value);
                  handleLine(item.value);
                }}
              />
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={styles.Company_Arae}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={loadline}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Line"
                searchPlaceholder="Search..."
                value={line}
                onChange={item => {
                  setLine(item.value);
                  hendlegetConveyorIdName(item.value);
                  handleBuyer();
                }}
              />
            </View>

            <View style={styles.Company_Arae}>
              <Text>{conveyorIdName}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={styles.Company_Arae}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={loadBuyer}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Buyer Name"
                searchPlaceholder="Search..."
                value={buyer}
                onChange={item => {
                  setBuyer(item.value);
                  handlestyle(item.value);
                }}
              />
            </View>
            <View style={styles.Company_Arae}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={loadstyle}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Style Name"
                searchPlaceholder="Search..."
                value={style}
                onChange={item => {
                  setStyle(item.value);
                  handleSeason();
                }}
              />
            </View>
          </View>

          <Toast />

          <View style={styles.Inputarea}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                style={styles.input}
                label="Enter Cycle Time"
                mode="outlined"
                onChangeText={handlecycletimeChange}
                value={cycletime}
                keyboardType="numeric"
                placeholder="Enter Cycle Time"
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                onChangeText={handletargetChange}
                value={target}
                keyboardType="numeric"
                label="Enter Target"
                mode="outlined"
                placeholder="Enter Target "
                placeholderTextColor="#999"
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextInput
                style={styles.input}
                onChangeText={handleRealTimeChange}
                value={realTime}
                keyboardType="numeric"
                label="Enter Real Time "
                mode="outlined"
                placeholder="Enter Real Time "
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                onChangeText={handleGoodworkChange}
                value={goodwork}
                keyboardType="numeric"
                label="Enter Good Work"
                mode="outlined"
                placeholder="Enter Good Work "
                placeholderTextColor="#999"
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextInput
                style={styles.input}
                onChangeText={handleSetpChange}
                value={step}
                keyboardType="numeric"
                label="Enter Step "
                mode="outlined"
                placeholder="Enter Step "
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleHorontimeChange}
                value={horontime}
                keyboardType="numeric"
                label="Enter Horon Time"
                mode="outlined"
                placeholder="Enter Horon Time "
                placeholderTextColor="#999"
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TextInput
                style={styles.input}
                onChangeText={handleStoptimeChange}
                value={stoptime}
                keyboardType="numeric"
                label="Enter Stop Time"
                mode="outlined"
                placeholder="Enter Stop Time "
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleFinishedChange}
                value={finished}
                keyboardType="numeric"
                label="Enter Finished Time "
                mode="outlined"
                placeholder="Enter Finished Time "
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerText}
          />

          <View style={styles.Submit_Area}>
            <MyButton
              onPress={() => sendMessage()}
              title="Submit"
              B_width="98%"
            />
          </View>
        </ScrollView>

        <Modal isVisible={isModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {conveyorIdAfterSendDataName}
              </Text>

              <Text style={styles.modalText}>{formattedMessage}</Text>
              <View style={{alignSelf: 'flex-end'}}>
                <IconButton
                  icon="close-circle"
                  iconColor={'red'}
                  size={35}
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 2,
    flex: 1,
  },
  // submit area
  Submit_Area: {justifyContent: 'center', alignItems: 'center', padding: 5},
  // input area
  Inputarea: {justifyContent: 'center', alignItems: 'center', padding: 5},
  input: {
    width: '48%',
    height: height / 18,
    borderColor: '#3498db',
    margin: 4,
    marginBottom: 10,
  },
  // dropdown list area

  Company_Arae: {
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 5,
    width: '48%',
  },

  dropdown: {
    width: '100%',
    height: height / 20,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 12,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 12,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: 'red',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'red',
  },

  spinnerText: {
    color: '#FFF',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: width / 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#B20093',
  },
  modalText: {
    fontSize: width / 25,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ConveyorBeltsSetup;
