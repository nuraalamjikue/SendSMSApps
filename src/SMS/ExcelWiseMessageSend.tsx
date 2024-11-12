import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
} from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import DocumentPicker from 'react-native-document-picker';

interface ExcelData {
  D: string;
  E: string;
  F: number;
}

const ExcelWiseMessageSend: React.FC = () => {
  const [excelData, setExcelData] = useState<ExcelData[]>([]);

  // Function to handle importing an Excel file
  // const importExcelFile = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     const fileContent = await RNFS.readFile(res[0].uri, 'ascii');
  //     const workbook = XLSX.read(fileContent, {type: 'binary'});
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];

  //     // Parse the sheet data using sheet_to_json
  //     const data = XLSX.utils.sheet_to_json(sheet, {header: 1});

  //     // Skip the first row (headers) and map data to the correct structure
  //     const rows = data.slice(1); // Get the remaining rows

  //     // Map the rows into objects using the correct structure
  //     const formattedData = rows.map((row: any) => ({
  //       D: row[0], // Name
  //       E: row[1], // Mobile Number
  //       F: row[2], // Code
  //     }));

  //     setExcelData(formattedData);
  //     Alert.alert('Success', 'Excel file imported successfully');
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       Alert.alert('Canceled', 'File selection was canceled');
  //     } else {
  //       console.error('Error importing file:', err);
  //       Alert.alert('Error', 'Failed to import the Excel file');
  //     }
  //   }
  // };

  const importExcelFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const fileContent = await RNFS.readFile(res[0].uri, 'ascii');
      const workbook = XLSX.read(fileContent, {type: 'binary'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Parse the sheet data using sheet_to_json
      const data = XLSX.utils.sheet_to_json(sheet, {header: 1});

      console.log('Raw Parsed Excel Data:', data); // Check the raw parsed data

      const rows = data.slice(1); // Get the remaining rows

      // Map the rows into objects using the correct structure
      const formattedData = rows.map((row: any) => ({
        D: row[0], // Name
        E: row[1], // Mobile Number
        F: row[2], // Code
      }));

      console.log('Formatted Excel Data:', formattedData); // Check the formatted data

      setExcelData(formattedData);
      Alert.alert('Success', 'Excel file imported successfully');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled', 'File selection was canceled');
      } else {
        console.error('Error importing file:', err);
        Alert.alert('Error', 'Failed to import the Excel file');
      }
    }
  };

  // Function to send SMS
  const sendSmsDatawithAPI = async () => {
    try {
      // Iterate over each item in the excelData array
      for (let i = 0; i < excelData.length; i++) {
        // const { E, D } = excelData[i]; // E = Mobile Number, D = Name

        const {E} = excelData[i];
        const {D} = excelData[0];

        // Create the SMS message
        // const bodySMS = `${D}, n/ আপনার আবেদন নং : ${excelData[i].F}`;
        const bodySMS = `${D}, \nআপনার আবেদন নং : ${excelData[i].F}`;

        console.log('Sending SMS ' + bodySMS);
        console.log('Sending SMS Number ' + E);

        // Build the URL for the API request
        const url = `https://api.greenweb.com.bd/api.php?token=109961539011714988341103396fe6f1b0a8060560cb748eb2d36&to=${E}&message=${encodeURIComponent(
          bodySMS,
        )}`;

        // Send the SMS via the API
        const response = await fetch(url);

        // Check if the response is successful
        if (response.ok) {
          console.log(`SMS sent to ${E}`);
        } else {
          console.error(`Failed to send SMS to ${E}`);
        }
      }

      Alert.alert('Success', 'All SMS messages sent');
    } catch (err) {
      console.error('Error sending SMS:', err);
      Alert.alert('Error', 'Failed to send SMS messages');
    }
  };

  const renderItem = ({item}: {item: ExcelData}) => (
    <View
      style={[
        styles.item,
        {backgroundColor: item.E.length === 11 ? '#f8f9fa' : 'red'},
      ]}>
      <Text style={styles.text}>{item.D ?? 'N/A'}</Text>
      <Text style={styles.text}>Mobile Number: {item.E}</Text>
      <Text style={styles.text}>Code: {item.F}</Text>
    </View>
  );

  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={importExcelFile} style={styles.button}>
        <Text style={styles.buttonText}>Import Excel</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={sendSmsDatawithAPI} style={styles.button}>
        <Text style={styles.buttonText}>Send SMS</Text>
      </TouchableOpacity>

      <FlatList
        data={excelData}
        keyExtractor={(item, index) => `${item.F}-${index}`} // Convert number to string for key
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#155638',
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#ffff',
    borderWidth: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
  },

  item: {
    // Light background color
    borderRadius: 10, // Rounded corners
    padding: 15, // Padding for spacing inside the item
    marginVertical: 10, // Vertical spacing between items
    marginHorizontal: 15, // Horizontal spacing from edges
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 5, // Shadow blur radius for iOS
    elevation: 3, // Shadow for Android
  },

  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default ExcelWiseMessageSend;
