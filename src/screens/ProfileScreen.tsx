// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   FlatList,
//   ActivityIndicator,
//   Text,
//   Pressable,
//   TextInput,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   SafeAreaView,
//   Dimensions,
// } from 'react-native';

// import MyButton from './Button/MyButton';
// import {Dropdown} from 'react-native-element-dropdown';
// import Spinner from 'react-native-loading-spinner-overlay';
// import instance from '../Axiosinstance';
// import {useSelector} from 'react-redux';
// import Toast from 'react-native-toast-message';
// const {height, width} = Dimensions.get('window');
// // Define the type for your data
// type DataItem = {
//   Id: number;
//   Conveyor_Name: string;
//   Line: string;
// };

// interface RootState {
//   userInfo: {
//     getEmployeeCode: string;
//     getPassword: string;
//     CreateByID: string;
//   };
// }

// const ProfileScreen = () => {
//   const [data, setData] = useState<DataItem[]>([]);
//   const [filteredData, setFilteredData] = useState<DataItem[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [conveyorIDName, setConveyorIDName] = useState<string>('');
//   const [loadLine, setLoadLine] = useState<any>([]);
//   const [line, setLine] = useState<any>(0);

//   const {getEmployeeCode, getPassword, CreateByID} = useSelector(
//     (state: RootState) => state.userInfo,
//   );

//   const handleToastMsg = (getType: any, getText: any) => {
//     Toast.show({
//       type: getType,
//       text1: getText,
//       visibilityTime: 2000,
//     });
//   };

//   const handleLineNameChange = (text: any) => {
//     setConveyorIDName(text);
//   };

//   useEffect(() => {
//     fetchData();
//     handleCompany();
//   }, [0]);

//   useEffect(() => {
//     filterData();
//   }, [searchQuery, data]);

//   const fetchData = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       const response = await instance.get(
//         `ConveyorLineSetup/getAllDataForConveyorLine`,
//       );
//       const result = response.data;
//       // console.log('Fetched data:', result.length); // Debug log
//       setData(result);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterData = () => {
//     if (searchQuery.trim() === '') {
//       setFilteredData(data);
//     } else {
//       const lowercasedQuery = searchQuery.toLowerCase();
//       const filtered = data.filter(
//         item =>
//           item.Conveyor_Name.toLowerCase().includes(lowercasedQuery) ||
//           item.Line.toLowerCase().includes(lowercasedQuery),
//       );
//       setFilteredData(filtered);
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);

//     // Ensure line is selected before proceeding
//     if (!line) {
//       handleToastMsg('error', `Please select a Line`);
//       setLoading(false);
//       return;
//     }

//     if (!conveyorIDName) {
//       handleToastMsg('error', `Enter Conveyor Name`);
//       setLoading(false);
//       return;
//     }

//     const data = {
//       id: 0,
//       lineId: line,
//       conveyorIDName: `conveyorbelt/recived/CB-${conveyorIDName}`,
//       create_By: CreateByID,
//       create_Date: '2024-07-27T04:02:04.779Z',
//       inActive: 0,
//     };

//     try {
//       const response = await instance.post(
//         `ConveyorLineSetup/Conveyor_Line_Setup`,
//         data,
//       );
//       console.log('ConveyorLine' + response.data);
//       if (response.data === 'Save Successfully.') {
//         handleToastMsg('success', `Save Successfully.`);
//         handleCompany();
//         fetchData();
//       } else {
//         handleToastMsg('success', `Save Successfully.`);
//         handleCompany();
//         fetchData();
//         setConveyorIDName('');
//         setLine(0);
//       }
//     } catch (e) {
//       console.log(e);
//       handleToastMsg('error', `An error occurred`);
//       handleCompany();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompany = () => {
//     instance
//       .get('ConveyorLineSetup/getLineForLineSetup')
//       .then((response: any) => {
//         let newArray = response.data.map((item: any) => {
//           return {value: item.LineID, label: item.LineName};
//         });
//         setLoadLine(newArray);
//         setLoading(false);
//       })
//       .catch((e: any) => {
//         console.log(e);
//         setLoading(false);
//       });
//   };

//   const handleInActive = (item: DataItem) => {
//     instance
//       .get(`ConveyorLineSetup/GetpreviousLineInActive/${CreateByID}/${item.Id}`)
//       .then((response: any) => {
//         setLoading(false);
//         fetchData();
//       })
//       .catch((e: any) => {
//         console.log(e);
//         setLoading(false);
//       });
//     // Handle press action here
//     console.log('Item pressed:', item.Id);
//   };

//   const handleDuplicateLine = (LineID: any) => {
//     instance
//       .get(`ConveyorLineSetup/getDuplicateLine/${LineID}`)
//       .then((response: any) => {
//         const lineData = response.data;

//         // console.log('Conveyor Line   ' + lineData.length);
//         if (lineData.length > 0) {
//           handleToastMsg('error', `This Line Inactive Frist`);
//           setData(lineData);
//         } else {
//           fetchData();
//         }

//         setLoading(false);
//       })
//       .catch((e: any) => {
//         console.log(e);
//         setLoading(false);
//       });
//   };

//   const renderItem = ({item}: {item: DataItem}) => (
//     <SafeAreaView style={styles.containerdata}>
//       <ScrollView style={styles.scrollView}>
//         <Pressable
//           onPress={() => {}}
//           style={({pressed}) => [styles.row, pressed && styles.pressed]}>
//           <View style={styles.cellLine}>
//             <Text style={styles.calltitel}>{item.Line}</Text>
//           </View>
//           <View style={styles.cellConveyor}>
//             <Text style={styles.calltitel}>{item.Conveyor_Name}</Text>
//           </View>

//           <View>
//             <Pressable
//               onPress={() => handleInActive(item)}
//               style={styles.InActiveButton}>
//               <Text style={styles.buttonText}>InActive</Text>
//             </Pressable>
//           </View>
//         </Pressable>
//       </ScrollView>
//     </SafeAreaView>
//   );

//   return (
//     <View style={[styles.container, {flexDirection: 'column'}]}>
//       <View style={{flex: 3}}>
//         <View style={styles.inputContainer}>
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={loadLine}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder="Select Line Name"
//             searchPlaceholder="Search..."
//             value={line}
//             onChange={item => {
//               setLine(item.value);
//               handleDuplicateLine(item.value);
//             }}
//           />
//           <TextInput
//             style={styles.input}
//             onChangeText={handleLineNameChange}
//             value={conveyorIDName}
//             keyboardType="numeric"
//             placeholder="Conveyor Name"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <MyButton onPress={handleSubmit} title="Submit" B_width="100%" />

//         <View style={{width: '100%', paddingTop: 10, height: '77%'}}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />

//           <FlatList
//             data={filteredData}
//             keyExtractor={item => item.Id + Math.random().toString(7)}
//             renderItem={renderItem}
//           />
//           <Toast />
//         </View>

//         <Spinner
//           visible={loading}
//           textContent={'Loading...'}
//           textStyle={styles.spinnerText}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   containerdata: {
//     flex: 1,
//     paddingTop: 2,
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     width: '98%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   scrollView: {
//     backgroundColor: 'pink',
//     width: '100%',
//     alignSelf: 'center',
//   },

//   dropdown: {
//     width: '50%',
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     margin: '1%',
//   },
//   icon: {
//     marginRight: 5,
//   },
//   placeholderStyle: {
//     fontSize: 12,
//   },
//   selectedTextStyle: {
//     fontSize: 12,
//     color: 'black',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//     color: 'red',
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//     color: 'red',
//   },
//   spinnerText: {
//     color: '#FFF',
//   },
//   placeholder: {
//     fontSize: 12, // Set the font size for the placeholder text
//     color: 'red', // Placeholder text color
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomColor: '#3498db',
//     padding: 5,
//   },

//   calltitel: {
//     fontSize: 9,
//     color: '#333',
//     flex: 0.5,
//   },

//   cellConveyor: {
//     width: '60%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignContent: 'center',
//   },

//   cellLine: {
//     width: '10%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignContent: 'center',
//   },
//   pressed: {
//     backgroundColor: '#ddd',
//   },
//   searchInput: {
//     width: '100%',
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#3498db',
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     fontSize: 18,
//     color: '#333',
//     backgroundColor: '#fff',
//     margin: '1%',
//   },
//   input: {
//     width: '48%',
//     height: height / 18,
//     borderColor: '#3498db',
//     margin: 4,
//     marginBottom: 10,
//   },
//   InActiveButton: {
//     width: '100%',
//     backgroundColor: '#841584',
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },

//   input: {
//     width: '50%',
//     height: 50,
//     borderWidth: 2,
//     borderColor: '#3498db',
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     fontSize: 12,
//     color: '#333',
//     backgroundColor: '#fff',
//     margin: '1%',
//   },

//   text: {
//     fontSize: 42,
//   },
// });

// export default ProfileScreen;

// import * as React from 'react';
// import {DataTable} from 'react-native-paper';

// const ProfileScreen = () => {
//   const [page, setPage] = React.useState<number>(0);
//   const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
//   const [itemsPerPage, onItemsPerPageChange] = React.useState(
//     numberOfItemsPerPageList[0],
//   );

//   const [items] = React.useState([
//     {
//       key: 1,
//       name: 'Cupcake',
//       calories: 356,
//       fat: 16,
//     },
//     {
//       key: 2,
//       name: 'Eclair',
//       calories: 262,
//       fat: 16,
//     },
//     {
//       key: 3,
//       name: 'Frozen yogurt',
//       calories: 159,
//       fat: 6,
//     },
//     {
//       key: 4,
//       name: 'Gingerbread',
//       calories: 305,
//       fat: 3.7,
//     },
//   ]);

//   const from = page * itemsPerPage;
//   const to = Math.min((page + 1) * itemsPerPage, items.length);

//   React.useEffect(() => {
//     setPage(0);
//   }, [itemsPerPage]);

//   return (
//     <DataTable>
//       <DataTable.Header>
//         <DataTable.Title>Dessert</DataTable.Title>
//         <DataTable.Title numeric>Calories</DataTable.Title>
//         <DataTable.Title numeric>Fat</DataTable.Title>
//       </DataTable.Header>

//       {items.slice(from, to).map(item => (
//         <DataTable.Row key={item.key}>
//           <DataTable.Cell>{item.name}</DataTable.Cell>
//           <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
//           <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
//         </DataTable.Row>
//       ))}

//       <DataTable.Pagination
//         page={page}
//         numberOfPages={Math.ceil(items.length / itemsPerPage)}
//         onPageChange={page => setPage(page)}
//         label={`${from + 1}-${to} of ${items.length}`}
//         numberOfItemsPerPageList={numberOfItemsPerPageList}
//         numberOfItemsPerPage={itemsPerPage}
//         onItemsPerPageChange={onItemsPerPageChange}
//         showFastPaginationControls
//         selectPageDropdownLabel={'Rows per page'}
//       />
//     </DataTable>
//   );
// };

// export default ProfileScreen;

import * as React from 'react';
import {Button, DataTable} from 'react-native-paper';
import instance from '../Axiosinstance';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
const {height, width} = Dimensions.get('window');
import MyButton from './Button/MyButton';
import {Dropdown} from 'react-native-element-dropdown';

interface RootState {
  userInfo: {
    getEmployeeCode: string;
    getPassword: string;
    CreateByID: string;
  };
}

const ProfileScreen = () => {
  const [page, setPage] = React.useState<number>(1);
  const [numberOfItemsPerPageList] = React.useState([9]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const [items, setItems] = React.useState<any[]>([]);
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [conveyorIDName, setConveyorIDName] = React.useState<string>('');
  const [loadLine, setLoadLine] = React.useState<any>([]);
  const [line, setLine] = React.useState<any>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);

  const {getEmployeeCode, getPassword, CreateByID} = useSelector(
    (state: RootState) => state.userInfo,
  );

  const handleToastMsg = (getType: any, getText: any) => {
    Toast.show({
      type: getType,
      text1: getText,
      visibilityTime: 2000,
    });
  };

  const handleLineNameChange = (text: any) => {
    setConveyorIDName(text);
  };

  React.useEffect(() => {
    fetchData(page, itemsPerPage);
    handleCompany();
  }, [page, itemsPerPage]);

  const fetchData = async (page: number, itemsPerPage: number) => {
    setLoading(true);
    try {
      const response = await instance.get(
        `ConveyorLineSetup/getAllDataForConveyorLineTest/${page}/${itemsPerPage}`,
      );

      // console.log(
      //   'ConveyorLineSetup/getAllDataForConveyorLineTest ' +
      //     JSON.stringify(response.data[0].TotalRows, null, 2),
      // );

      setItems(response.data);
      setFilteredData(response.data);
      setTotalItems(response.data[0].TotalRows);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    filterData();
  }, [searchQuery, items]);

  const filterData = () => {
    if (searchQuery.trim() === '') {
      setFilteredData(items);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = items.filter(
        item =>
          item.Conveyor_Name.toLowerCase().includes(lowercasedQuery) ||
          item.Line.toLowerCase().includes(lowercasedQuery),
      );
      setFilteredData(filtered);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!line) {
      handleToastMsg('error', `Please select a Line`);
      setLoading(false);
      return;
    }

    if (!conveyorIDName) {
      handleToastMsg('error', `Enter Conveyor Name`);
      setLoading(false);
      return;
    }

    const data = {
      id: 0,
      lineId: line,
      conveyorIDName: `conveyorbelt/recived/CB-${conveyorIDName}`,
      create_By: CreateByID,
      create_Date: '2024-07-27T04:02:04.779Z',
      inActive: 0,
    };

    try {
      const response = await instance.post(
        `ConveyorLineSetup/Conveyor_Line_Setup`,
        data,
      );
      if (response.data === 'Save Successfully.') {
        handleToastMsg('success', `Save Successfully.`);
        handleCompany();
        fetchData(1, itemsPerPage);
      } else {
        handleToastMsg('success', `Save Successfully.`);
        handleCompany();
        fetchData(1, itemsPerPage);
        setConveyorIDName('');
        setLine(0);
      }
    } catch (e) {
      console.log(e);
      handleToastMsg('error', `An error occurred`);
      handleCompany();
    } finally {
      setLoading(false);
    }
  };

  const handleCompany = () => {
    instance
      .get('ConveyorLineSetup/getLineForLineSetup')
      .then((response: any) => {
        let newArray = response.data.map((item: any) => {
          return {value: item.LineID, label: item.LineName};
        });
        setLoadLine(newArray);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleInActive = (item: any) => {
    instance
      .get(`ConveyorLineSetup/GetpreviousLineInActive/${CreateByID}/${item}`)
      .then((response: any) => {
        setLoading(false);
        fetchData(page, itemsPerPage);
        handleToastMsg('success', `InActive Successfully`);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleDuplicateLine = (LineID: any) => {
    instance
      .get(`ConveyorLineSetup/getDuplicateLine/${LineID}`)
      .then((response: any) => {
        const lineData = response.data;
        if (lineData.length > 0) {
          handleToastMsg('error', `This Line Inactive Frist`);
          setItems(lineData);
        } else {
          fetchData(page, itemsPerPage);
        }
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const from = (page - 1) * itemsPerPage;

  // console.log('page: ' + page);
  // console.log('itemsPerPage: ' + itemsPerPage);
  // console.log('from: ' + from);

  const to = Math.min(from + itemsPerPage, totalItems);

  // console.log(
  //   `Page: ${page}, From: ${from}, To: ${to}, FilteredData Length: ${totalItems}`,
  // );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage !== page) {
      setPage(newPage);
      fetchData(newPage, itemsPerPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    onItemsPerPageChange(newItemsPerPage);
    fetchData(1, newItemsPerPage);
  };

  // console.log('filteredData' + JSON.stringify(filteredData, null, 2));

  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <View style={{flex: 3}}>
        <View style={styles.inputContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={loadLine}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Line Name"
            searchPlaceholder="Search..."
            value={line}
            onChange={item => {
              setLine(item.value);
              handleDuplicateLine(item.value);
            }}
          />
          <TextInput
            style={styles.input}
            onChangeText={handleLineNameChange}
            value={conveyorIDName}
            keyboardType="numeric"
            placeholder="Conveyor Name"
            placeholderTextColor="#999"
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <MyButton
            onPress={handleSubmit}
            title="Submit"
            B_width={width / 1.1}
          />
        </View>
        <Toast />

        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* --------------------------------------------------------------------------------------------------- */}
          <DataTable>
            <View style={styles.header}>
              <DataTable.Header>
                <DataTable.Title style={{flex: 1}}>
                  <Text style={styles.titleText}>Sl No</Text>
                </DataTable.Title>
                <DataTable.Title style={{flex: 1.5}}>
                  <Text style={styles.titleText}>Line</Text>
                </DataTable.Title>
                <DataTable.Title style={{flex: 1.5}}>
                  <Text style={styles.titleText}>Conveyor</Text>
                </DataTable.Title>
                <DataTable.Title style={{flex: 1}}>
                  <Text style={styles.titleText}>Action</Text>
                </DataTable.Title>
              </DataTable.Header>
            </View>

            {filteredData.slice(0, to).map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{flex: 1}}>
                  <Text style={styles.cellText}> {from + index + 1}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1.5}}>
                  <Text style={styles.cellText}>{item.Line}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1.5}}>
                  <Text style={styles.cellText}>{item.Conveyor}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}}>
                  <Pressable
                    onPress={() => handleInActive(item.Id)}
                    style={styles.InActiveButton}>
                    <Text style={styles.buttonText}>InActive</Text>
                  </Pressable>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
              label={`${from + 1}-${Math.min(
                to,
                filteredData.length,
              )} of ${totalItems}`}
              numberOfItemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />

            {/* <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(totalItems / itemsPerPage)} // Total number of pages based on server response
              label={`${from + 1}-${to} of ${totalItems}`} // Update label based on server response
              // numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            /> */}
          </DataTable>
        </ScrollView>
      </View>
      <View style={{flex: 0.4, backgroundColor: 'black'}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 30,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleCell: {
    fontWeight: 'bold',
    color: 'red',
  },
  cellSL: {
    width: '10%',
  },
  cellLine: {
    width: '30%',
  },
  cellConveyor: {
    width: '60%',
  },
  cell: {
    padding: 8,
  },
  actionButton: {
    minWidth: 80,
  },

  InActiveButton: {
    width: width / 7,
    backgroundColor: '#841584',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  dropdown: {
    width: width / 2.3,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: '1%',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
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

  input: {
    width: width / 2.2,
    height: height / 18,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 12,
    color: '#333',
    backgroundColor: '#fff',
    margin: '1%',
  },

  inputContainer: {
    flexDirection: 'row',
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    width: width / 1.1,
    height: 45,
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#333',
    backgroundColor: '#fff',
    marginVertical: '2%',
  },
  titleText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 9,
    textAlign: 'center',
  },
  cellText: {
    // fontWeight: 'bold',
    color: '#000',
    fontSize: 9,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#217346',
  },
});

export default ProfileScreen;
