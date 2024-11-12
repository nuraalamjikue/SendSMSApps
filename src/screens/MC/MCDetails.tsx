import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MyButton from '../Button/MyButton';
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const MCDetails = () => {
  const [company, setCompany] = useState<any>(0);
  const [floor, setFloor] = useState<any>(0);
  const [style, setStyle] = useState<any>(0);
  const [line, setLine] = useState<any>(0);

  const [cycletime, setCycletime] = useState<any>(0);
  const [target, setTarget] = useState<any>(0);
  const [cumulate, setCumulate] = useState<any>(0);
  const [finishwork, setFinishwork] = useState<any>(0);
  const [rework, setRework] = useState<any>(0);
  const [reworkRate, setReworkRate] = useState<any>(0);
  const [goodwork, setGoodwork] = useState<any>(0);
  const [step, setStep] = useState<any>(0);
  const [horontime, setHorontime] = useState<any>(0);
  const [stoptime, setStoptime] = useState<any>(0);

  const handlecycletimeChange = (cycletime: any) => {
    setCycletime(parseInt(cycletime));
  };

  const handletargetChange = (cycletime: any) => {
    setTarget(parseInt(cycletime));
  };
  const handleCumulateChange = (Cumulate: any) => {
    setCumulate(Cumulate);
  };
  const handleFinishChange = (finishwork: any) => {
    setFinishwork(finishwork);
  };
  const handleReworkChange = (rework: any) => {
    setRework(rework);
  };

  const handleReworkRateChange = (text: any) => {
    setReworkRate(text);
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

  const handleSubmit = () => {
    Alert.alert('hit me');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.Company_Arae}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Company Name"
            searchPlaceholder="Search..."
            value={company}
            onChange={item => {
              setCompany(item.value);
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
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Floor Name"
            searchPlaceholder="Search..."
            value={floor}
            onChange={item => {
              setFloor(item.value);
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
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Style Name"
            searchPlaceholder="Search..."
            value={style}
            onChange={item => {
              setStyle(item.value);
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
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Line"
            searchPlaceholder="Search..."
            value={line}
            onChange={item => {
              setLine(item.value);
            }}
          />
        </View>
        <View style={styles.Inputarea}>
          <TextInput
            style={styles.input}
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
            placeholder="Enter Target "
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            onChangeText={handleCumulateChange}
            value={cumulate}
            keyboardType="numeric"
            placeholder="Enter Cumulate "
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleFinishChange}
            value={finishwork}
            keyboardType="numeric"
            placeholder="Enter Finishwork "
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleReworkChange}
            value={rework}
            keyboardType="numeric"
            placeholder="Enter Rework "
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleReworkRateChange}
            value={reworkRate}
            keyboardType="numeric"
            placeholder="Enter Rework Rate "
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            onChangeText={handleGoodworkChange}
            value={goodwork}
            keyboardType="numeric"
            placeholder="Enter Good Work "
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleSetpChange}
            value={step}
            keyboardType="numeric"
            placeholder="Enter Step "
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleHorontimeChange}
            value={horontime}
            keyboardType="numeric"
            placeholder="Enter Horon Time "
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            onChangeText={handleStoptimeChange}
            value={stoptime}
            keyboardType="numeric"
            placeholder="Enter Stop Time "
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.Submit_Area}>
          <MyButton onPress={() => handleSubmit()} title="Submit" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 2,
  },
  // submit area
  Submit_Area: {justifyContent: 'center', alignItems: 'center', padding: 5},
  // input area
  Inputarea: {justifyContent: 'center', alignItems: 'center', padding: 5},
  input: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  // dropdown list area

  Company_Arae: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  dropdown: {
    width: '80%',
    height: 50,
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
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default MCDetails;
