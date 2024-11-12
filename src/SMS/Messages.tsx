import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import {SendDirectSms} from 'react-native-send-direct-sms';
const {height, width} = Dimensions.get('window');
import {Dropdown} from 'react-native-element-dropdown';
import instance from '../Axiosinstance';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import MyButton from '../screens/Button/MyButton';
import {Checkbox, DataTable} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Messages = () => {
  const [mobileNumbers, setMobileNumbers] = React.useState<string>('');
  const [bodySMS, setBodySMS] = React.useState<string>('');
  const [selectedbodySMS, setSelectedBodySMS] = React.useState<string>('');
  const [messageLength, setMessageLength] = React.useState<number>(0);
  const [selectedmessageLength, setSelectedMessageLength] =
    React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [loadcompany, setLoadCompany] = React.useState<any>([]);
  const [company, setCompany] = React.useState<any>(0);
  const [loaddepartment, setLoadDepartment] = React.useState<any>([]);
  const [department, setDepartment] = React.useState<any>(0);
  const [loadsection, setLoadSection] = React.useState<any>([]);
  const [section, setSection] = React.useState<any>(0);

  const [loadFloor, setLoadFloor] = React.useState<any>([]);
  const [floor, setFloor] = React.useState<any>(0);

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [allEmployeeData, setAllEmployeeData] = React.useState<any>([]);
  const handleToastMsg = (getType: any, getText: any) => {
    Toast.show({
      type: getType,
      text1: getText,
      visibilityTime: 2000,
    });
  };

  const handleMSGBody = (SMG: string) => {
    setBodySMS(SMG);
  };
  const handleSelectedMSGBody = (SMG: string) => {
    setSelectedBodySMS(SMG);
  };

  React.useEffect(() => {
    if (selectedData.length > 0) {
      if (bodySMS) {
        setSelectedMessageLength(selectedbodySMS.length);
      } else {
        setSelectedMessageLength(0);
      }
    } else {
      if (bodySMS) {
        setMessageLength(bodySMS.length);
      } else {
        setMessageLength(0);
      }
    }
  }, [bodySMS]);

  const calculateResult = (value: number) => {
    const result = value === 0 ? 0 : value / 160;
    return Math.max(0, Math.ceil(result));
  };

  const [checked, setChecked] = React.useState(false);

  // Load data Ara
  React.useEffect(() => {
    setLoading(true);
    const handleCompany = () => {
      instance
        .get('Conveyorbelt/getCompany')
        .then((response: any) => {
          // let newArray = response.data.map((item: any) => {
          //   return {value: item.CompanyName, label: item.CompanyName};
          // });

          const CompanyData = response.data.map((item: any) => ({
            value: item.CompanyName,
            label: item.CompanyName,
          }));

          setLoadCompany(CompanyData);
          setLoading(false);
        })
        .catch((e: any) => {
          console.log(e);
          setLoading(false);
        });
    };

    handleCompany();
  }, []);

  const handleDepartment = (companyName: string) => {
    console.log('handleDepartment', companyName);

    instance
      .get(`SendMessage/getDepartment/${companyName}`)
      .then((response: any) => {
        // let newArray = response.data.map((item: any) => {
        //   return {value: item.Department, label: item.Department};
        // });
        const departmentsData = response.data.map((item: any) => ({
          value: item.Department,
          label: item.Department,
        }));

        setLoadDepartment(departmentsData);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleSection = (companyName: string, DepartmentName: string) => {
    const originalString = DepartmentName;
    const convert_DepartmentName = encodeURIComponent(originalString);

    instance
      .get(`SendMessage/getSection/${companyName}/${convert_DepartmentName}`)
      .then((response: any) => {
        // let newArray = response.data.map((item: any) => {
        //   return {value: item.Section, label: item.Section};
        // });
        const SectionData = response.data.map((item: any) => ({
          value: item.Section,
          label: item.Section,
        }));
        setLoadSection(SectionData);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleGetFloor = (companyName: string) => {
    instance
      .get(`SendMessage/getFloor/${companyName}`)
      .then((response: any) => {
        const Floor = response.data.map((item: any) => ({
          value: item.Floor,
          label: item.Floor,
        }));
        setLoadFloor(Floor);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const Special_Category = () => {
    instance
      .get(`/SendMessage/getSpecial_Category`)
      .then((response: any) => {
        setAllEmployeeData(response.data);
        // console.log(
        //   'Sent all employee data ' + JSON.stringify(response.data, null, 2),
        // );

        setLoading(false);
        showModal();
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleAllEmployeeData = (
    companyName: string,
    department: string,
    SectionName: string,
    floor: string,
  ) => {
    const originalString = SectionName;
    const convert_SectionName = encodeURIComponent(originalString);

    instance
      .get(
        `SendMessage/getCompanyAndSectionAllEmployee/${companyName}/${department}/${convert_SectionName}/${floor}`,
      )
      .then((response: any) => {
        setAllEmployeeData(response.data);
        // console.log(
        //   'Sent all employee data ' + JSON.stringify(response.data, null, 2),
        // );

        setLoading(false);
        showModal();
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  // const handleChange = (name: string, checked: boolean) => {
  //   if (name === 'allSelect') {
  //     let tempUsers = allEmployeeData.map((user: any) => ({
  //       ...user,
  //       isChecked: checked,
  //     }));
  //     setAllEmployeeData(tempUsers);
  //   } else {
  //     let tempUsers = allEmployeeData.map((user: any) =>
  //       user.EmployeeCode === name ? {...user, isChecked: checked} : user,
  //     );
  //     setAllEmployeeData(tempUsers);
  //     // console.log('Please select --- ' + JSON.stringify(tempUsers, null, 2));
  //   }
  // };

  // const handleSelectAll = (name: string, checked: boolean) => {
  //   let tempUsers = allEmployeeData.map((user:any) =>
  //     user?.EmployeeCode === name ? { ...user, isChecked: checked } : user,
  //   );
  //   setAllEmployeeData(tempUsers);
  // };

  const handleChange = (name: string, checked: boolean) => {
    let tempUsers = allEmployeeData.map((user: any) =>
      user.EmployeeCode === name ? {...user, isChecked: checked} : user,
    );
    setAllEmployeeData(tempUsers);
    // console.log('Please select --- ' + JSON.stringify(tempUsers, null, 2));
  };

  const handleSelectAll = (checked: boolean) => {
    let tempUsers = allEmployeeData.map((user: any) => ({
      ...user,
      isChecked: checked,
    }));
    setAllEmployeeData(tempUsers);
  };

  // const sendSmsData = (numbers: string, bodySMS: string) => {
  //   const numberList = numbers.split(',').map(num => num.trim()); // Split by comma and trim whitespace

  //   numberList.forEach(mobileNumber => {
  //     if (mobileNumber) {
  //       SendDirectSms(mobileNumber, bodySMS)
  //         .then((res: any) => console.log(`Sent to ${mobileNumber}:`, res))
  //         .catch((err: any) =>
  //           console.log(`Failed to send to ${mobileNumber}:`, err),
  //         );
  //     }
  //   });
  // };

  // const sendSmsData = (numbers: string, bodySMS: string) => {
  //   const numberList = numbers.split(',').map(num => num.trim()); // Split by comma and trim whitespace

  //   numberList.forEach(mobileNumber => {
  //     if (mobileNumber) {
  //       sendMultipartTextMessage(mobileNumber, bodySMS)
  //         .then((res: any) => console.log(`Sent to ${mobileNumber}:`, res))
  //         .catch((err: any) =>
  //           console.log(`Failed to send to ${mobileNumber}:`, err),
  //         );
  //     }
  //   });
  // };

  // // Example implementation of sendMultipartTextMessage
  // const sendMultipartTextMessage = (mobileNumber: string, bodySMS: string) => {
  //   const maxSmsLength = 180;
  //   const messages: string[] = [];

  //   for (let i = 0; i < bodySMS.length; i += maxSmsLength) {
  //     messages.push(bodySMS.substring(i, i + maxSmsLength));
  //   }
  //   const sendMessages = messages.map(part =>
  //     SendDirectSms(mobileNumber, part),
  //   );
  //   return Promise.all(sendMessages);
  // };

  // Extract the selected employee data
  const selectedData = allEmployeeData.filter(
    (item: any) => item.isChecked === true,
  );
  const onlyMobileNumbers = selectedData.map((item: any) => item.MobileNo);

  // // Join the mobile numbers into a comma-separated string if needed
  // const mobileNumbersString = onlyMobileNumbers.join(',');

  // console.log('Mobile Numbers:', JSON.stringify(onlyMobileNumbers, null, 2));

  // // Function to send SMS

  const sendSmsData = (numbers: string | string[], bodySMS: string) => {
    let numberList: string[];

    if (Array.isArray(numbers)) {
      numberList = numbers.map(num => num.trim());
    } else {
      numberList = numbers.split(',').map(num => num.trim());
    }
    handleToastMsg('success', `Failed to send SMS chunk`);

    const chunkSize = 60; // Adjust based on SMS segment limits
    const bodyChunks: string[] = [];
    for (let i = 0; i < bodySMS.length; i += chunkSize) {
      bodyChunks.push(bodySMS.slice(i, i + chunkSize));
    }

    // console.log('Number of SMS Chunks:', bodyChunks.length);

    numberList.forEach(mobileNumber => {
      if (mobileNumber) {
        //console.log('Sending SMS to:', mobileNumber);

        bodyChunks.forEach((chunk, index) => {
          SendDirectSms(mobileNumber, chunk)
            .then((res: any) => {
              //  console.log(`Sent chunk ${index + 1} to ${mobileNumber}:`, res);
              handleToastMsg(
                'success',
                `SMS chunk ${index + 1} sent to ${mobileNumber}`,
              );
            })
            .catch((err: any) => {
              console.log(
                `Failed to send chunk ${index + 1} to ${mobileNumber}:`,
                err,
              );
              handleToastMsg(
                'error',
                `Failed to send SMS chunk ${index + 1} to ${mobileNumber}`,
              );
            });
        });
      }
    });
  };

  const sendSmsDatawithAPI = async (
    numbers: string | string[],
    bodySMS: string,
  ) => {
    let numberList: string[];

    // Prepare the list of numbers, trim any spaces
    if (Array.isArray(numbers)) {
      numberList = numbers.map(num => num.trim());
    } else {
      numberList = numbers.split(',').map(num => num.trim());
    }

    // Loop through each number with index and send the SMS
    numberList.forEach(async (mobileNumber, index) => {
      if (mobileNumber) {
        console.log(`Sending SMS to: ${mobileNumber} (Chunk ${index + 1})`);

        const url = `https://api.greenweb.com.bd/api.php?token=109961539011714988341103396fe6f1b0a8060560cb748eb2d36&to=${mobileNumber}&message=${encodeURIComponent(
          bodySMS,
        )}`;

        try {
          const response = await fetch(url);
          const result = await response.text(); // API response is in plain text
          console.log('SMS API Response:', result);

          // Call handleToastMsg with index information
          handleToastMsg(
            'success',
            `SMS chunk ${index + 1} sent to ${mobileNumber}`,
          );
        } catch (error) {
          console.error('Error sending SMS:', error);
          handleToastMsg(
            'error',
            `Error sending SMS chunk ${index + 1} to ${mobileNumber}`,
          );
        }
      }
    });
  };

  // const sendSmsDatawithAPI = async (
  //   numbers: string | string[],
  //   bodySMS: string,
  // ) => {
  //   let numberList: string[];

  //   // Prepare the list of numbers, trim any spaces
  //   if (Array.isArray(numbers)) {
  //     numberList = numbers.map(num => num.trim());
  //   } else {
  //     numberList = numbers.split(',').map(num => num.trim());
  //   }

  //   // Loop through each number and send the SMS
  //   for (const mobileNumber of numberList) {
  //     if (mobileNumber) {
  //       console.log('Sending SMS to:', mobileNumber);

  //       const url = `https://api.greenweb.com.bd/api.php?token=109961539011714988341103396fe6f1b0a8060560cb748eb2d36&to=${mobileNumber}&message=${encodeURIComponent(
  //         bodySMS,
  //       )}`;

  //       try {
  //         const response = await fetch(url);
  //         const result = await response.text(); // API response is in plain text
  //         // console.log('SMS API Response:', result);
  //         handleToastMsg(
  //           'success',
  //           `SMS chunk ${index + 1} sent to ${mobileNumber}`,
  //         );
  //       } catch (error) {
  //         console.error('Error sending SMS:', error);
  //       }
  //     }
  //   }
  // };

  // const sendSmsData = (numbers: string | string[], bodySMS: string) => {
  //   console.log('Number List:', numbers);
  //   console.log('Body:', bodySMS);

  //   // Determine if numbers is already an array or a comma-separated string
  //   let numberList: string[];

  //   if (selectedData.length > 0) {
  //     // If selectedData has items, assume numbers is an array
  //     numberList = (numbers as string[]).map(num => num.trim());
  //   } else {
  //     // Otherwise, assume numbers is a comma-separated string
  //     numberList = (numbers as string).split(',').map(num => num.trim());
  //   }

  //   numberList.forEach(mobileNumber => {
  //     if (mobileNumber) {
  //       console.log('Sending SMS to:', mobileNumber);

  //       // Call your SMS sending function
  //       SendDirectSms(mobileNumber, bodySMS)
  //         .then((res: any) => {
  //           console.log(`Sent to ${mobileNumber}:`, res);
  //           handleToastMsg('success', `SMS sent to ${mobileNumber}`);
  //         })
  //         .catch((err: any) => {
  //           console.log(`Failed to send to ${mobileNumber}:`, err);
  //           handleToastMsg('error', `Failed to send SMS to ${mobileNumber}`);
  //         });
  //     }
  //   });
  // };

  // const sendSmsData = (numbers: string[], bodySMS: string) => {
  //   // Split by comma and trim whitespace
  //   // const numberList = numbers.split(',').map(num => num.trim());

  //   console.log('Number List:', numbers);
  //   console.log('Body:', bodySMS);

  //   if ( selectedData.length > 0) { const numberList = numbers.map(num => num.trim())} else {
  //     const numberList = numbers.split(',').map(num => num.trim())
  //   }

  //   numberList.forEach(mobileNumber => {
  //     if (mobileNumber) {
  //       console.log('Sending SMS to:', mobileNumber);

  //       // Call your SMS sending function
  //       SendDirectSms(mobileNumber, bodySMS)
  //         .then((res: any) => {
  //           console.log(`Sent to ${mobileNumber}:`, res);
  //           handleToastMsg('success', `SMS sent to ${mobileNumber}`);
  //         })
  //         .catch((err: any) => {
  //           console.log(`Failed to send to ${mobileNumber}:`, err);
  //           handleToastMsg('error', `Failed to send SMS to ${mobileNumber}`);
  //         });
  //     }
  //   });
  // };

  // const sendSmsData = async (numbers: string, bodySMS: string) => {
  //   const numberList = numbers.split(',').map(num => num.trim());

  //   console.log('sendSmsData', JSON.stringify(onlymobileNumbers, null, 2));

  //   for (const mobileNumber of numberList) {
  //     if (mobileNumber) {
  //       try {
  //         const res = await SendDirectSms(mobileNumber, bodySMS);
  //         console.log(`Sent to ${mobileNumber}:`, res);
  //       } catch (err) {
  //         console.log(`Failed to send to ${mobileNumber}:`, err);
  //       }
  //     }
  //   }
  // };

  // const sendSmsData = async (numbers: string, bodySMS: string) => {
  //   const numberList = numbers.split(',').map(num => num.trim()); // Split by comma and trim whitespace
  //   console.log('sendSmsData', JSON.stringify(onlymobileNumbers, null, 2));

  //   for (const mobileNumber of numberList) {
  //     if (mobileNumber) {
  //       try {
  //         const res = await SendDirectSms(mobileNumber, bodySMS);
  //         console.log(`Sent to ${onlymobileNumbers}:`, res);
  //       } catch (err) {
  //         console.log(`Failed to send to ${onlymobileNumbers}:`, err);
  //       }
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.squareDropdown}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
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
              setCompany(item.label);
              handleDepartment(item.label);
              //handleDuplicateLine(item.value);
            }}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={loaddepartment}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Department Name"
            searchPlaceholder="Search..."
            value={department}
            onChange={item => {
              setDepartment(item.label);
              handleSection(company, item.label);
            }}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={loadsection}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Section Name"
            searchPlaceholder="Search..."
            value={section}
            onChange={item => {
              setSection(item.value);
              handleGetFloor(company);

              // showModal();
              // handleAllEmployeeData(company, item.label);
              //handleDuplicateLine(item.value);
            }}
          />
          <Toast />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={loadFloor}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Floor Name"
            searchPlaceholder="Search..."
            value={floor}
            onChange={item => {
              setFloor(item.value);

              //handleDuplicateLine(item.value);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '80%',
            alignSelf: 'center',
            marginVertical: 30,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            style={styles.ViewEmployee_Button}
            onPress={() => {
              if (company === 0) {
                handleToastMsg('error', `Plz select Company`);
              }
              if (department === 0) {
                handleToastMsg('error', `Plz select Department`);
              }
              floor === 0
                ? handleAllEmployeeData(company, department, section, '0')
                : handleAllEmployeeData(company, department, section, floor);
            }}>
            <Text style={styles.sendButtonLabel}>View Employee</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Special_Button}
            onPress={() => {
              Special_Category();
            }}>
            <Text style={styles.sendButtonLabel}>Special SMS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.squareMSG}>
          <View>
            {selectedData.length > 0 ? (
              <>
                <View
                  style={{
                    //flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      // handleAllEmployeeData(company, section);
                      showModal();
                    }}>
                    <Text style={styles.titleSelectedText}>
                      Selected Employee(s) to Send SMS ({selectedData.length})
                    </Text>
                  </Pressable>

                  <TextInput
                    value={selectedbodySMS}
                    onChangeText={handleSelectedMSGBody}
                    placeholder="Enter Your Message"
                    style={[styles.textInput, styles.multilineTextInput]}
                    multiline={true}
                    numberOfLines={4}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.titleTextsmall}>
                  Enter Recipients Numbers (comma-separated)
                </Text>

                <TextInput
                  value={mobileNumbers}
                  onChangeText={setMobileNumbers}
                  placeholder="Enter Mobile Numbers"
                  keyboardType="numeric"
                  style={styles.textInput}
                />

                {/* Multiline TextInput */}
                <TextInput
                  value={bodySMS}
                  onChangeText={handleMSGBody}
                  placeholder="Enter Your Message"
                  style={[styles.textInput, styles.multilineTextInput]}
                  multiline={true}
                  numberOfLines={4}
                  underlineColorAndroid="transparent"
                />
              </View>
            )}

            <Text style={styles.MessageLength}>
              Message Length Is ({messageLength} /{' '}
              {calculateResult(messageLength)})
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() =>
                  sendSmsData(
                    selectedData.length > 0 ? onlyMobileNumbers : mobileNumbers,
                    selectedData.length > 0 ? selectedbodySMS : bodySMS,
                  )
                }>
                <Text style={styles.sendButtonLabel}>Send SMS by SIM</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sendSMSByAPIButton}
                onPress={() =>
                  sendSmsDatawithAPI(
                    selectedData.length > 0 ? onlyMobileNumbers : mobileNumbers,
                    selectedData.length > 0 ? selectedbodySMS : bodySMS,
                  )
                }>
                <Text style={styles.sendButtonLabel}>Send SMS By API</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.squareInfo} />
        <View style={styles.mainModelcontainer}>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <DataTable>
                  <View style={styles.header}>
                    <DataTable.Header>
                      <DataTable.Title style={{flex: 1}}>
                        <Checkbox
                          status={
                            allEmployeeData.every((item: any) => item.isChecked)
                              ? 'checked'
                              : 'unchecked'
                          }
                          color={'#217346'}
                          uncheckedColor={'#217346'}
                          // style={{
                          //   borderColor: '#217346',
                          //   borderWidth: 2,
                          // }}
                          onPress={() =>
                            handleSelectAll(
                              !allEmployeeData.every(
                                (item: any) => item.isChecked,
                              ),
                            )
                          }
                        />
                      </DataTable.Title>
                      <DataTable.Title style={{flex: 1.5}}>
                        <Text style={styles.titleText}>Employee Name</Text>
                      </DataTable.Title>
                      <DataTable.Title style={{flex: 1.5}}>
                        <Text style={styles.titleText}>Mobile</Text>
                      </DataTable.Title>
                    </DataTable.Header>
                  </View>

                  {allEmployeeData &&
                    allEmployeeData.map((employee: any, index: number) => (
                      <DataTable.Row key={index}>
                        <DataTable.Cell style={{flex: 1}}>
                          <Checkbox
                            status={
                              employee?.isChecked ? 'checked' : 'unchecked'
                            }
                            onPress={() =>
                              handleChange(
                                employee?.EmployeeCode,
                                !employee.isChecked,
                              )
                            }
                            color={'#217346'}
                            uncheckedColor={'#217346'}
                          />
                        </DataTable.Cell>
                        <DataTable.Cell style={{flex: 1.5}}>
                          <Text style={styles.cellText}>{employee.Names}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{flex: 1.5}}>
                          <Text style={styles.cellText}>
                            {employee.MobileNo}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                </DataTable>
              </ScrollView>
              <View style={styles.modalCloseButton}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {/* <MyButton
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    title="Done"
                    B_width="48%"
                  /> */}
                  <TouchableOpacity
                    style={styles.DoneButton}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text style={styles.sendButtonLabel}>Done</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.CloseButton}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text style={styles.sendButtonLabel}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    height: height,
  },
  squareDropdown: {
    width: width / 1.1,
    height: height / 3.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareMSG: {
    //backgroundColor: '#7cb48f',
    marginTop: height / 16,
    width: width / 1.1,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareInfo: {
    backgroundColor: '#7cb48f',
    width: width / 1.1,
    // height: 100,
    margin: 4,
  },
  sendButtonLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    flexDirection: 'row',
  },
  sendButton: {
    width: '45%',
    backgroundColor: '#21A4F1',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
    height: height / 15,
  },
  sendSMSByAPIButton: {
    width: '45%',
    backgroundColor: '#7360F2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
    height: height / 15,
  },

  titleTextsmall: {
    marginBottom: 8,
    marginTop: 16,
    fontSize: 10,
    textAlign: 'center',
    color: '#000000',
  },
  textInput: {
    paddingLeft: 16,
    fontSize: width / 30,
    borderWidth: 1,
    borderColor: '#3F44511F',
    borderRadius: 4,
    height: height / 15,
    color: '#000000',
    width: width / 1.2,
  },

  multilineTextInput: {
    marginTop: 10,
    height: 100,
    textAlignVertical: 'top', // Align text to the top for multiline input
  },
  // Dropdown  Area

  dropdown: {
    width: width / 1.2,
    height: height / 15,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: height / 60,
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

  DropDown_Area: {
    backgroundColor: 'red',
  },

  // ------------------- Model---------------
  mainModelcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: width / 40,
    marginBottom: 10,
  },

  modalCloseButton: {},
  titleText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 9,
    textAlign: 'center',
  },

  titleSelectedText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: width / 22,
    textAlign: 'center',
    paddingVertical: height / 60,
  },
  cellText: {
    // fontWeight: 'bold',
    color: '#000',
    fontSize: 9,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#fff',
  },
  MessageLength: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: width / 40,
    textAlign: 'center',
    paddingVertical: 5,
  },
  CloseButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DoneButton: {
    backgroundColor: '#4983A9',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewEmployee_Button: {
    backgroundColor: '#400061',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: width / 12,
    paddingVertical: height / 70,
    // marginHorizontal: width / 100,
  },
  Special_Button: {
    backgroundColor: '#152C81',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: width / 10,
    paddingVertical: height / 70,
    marginHorizontal: width / 15,
  },
});

export default Messages;

// import React, {useState} from 'react';
// import {View, Button, Text, Alert, Platform} from 'react-native';
// import * as FileSystem from 'react-native-fs';
// import XLSX from 'xlsx';
// import DocumentPicker, {
//   DocumentPickerResponse,
// } from 'react-native-document-picker';
// import {PermissionsAndroid} from 'react-native';

// interface ExcelData {
//   [key: string]: any;
// }

// const ExcelImport: React.FC = () => {
//   const [excelData, setExcelData] = useState<ExcelData[] | null>(null);

//   // Function to request storage permissions on Android
//   const requestStoragePermission = async (): Promise<boolean> => {
//     if (Platform.OS === 'android') {
//       try {
//         const readPermission = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission',
//             message: 'App needs access to your storage to read Excel files',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );

//         const writePermission = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission',
//             message: 'App needs access to your storage to save files',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );

//         return (
//           readPermission === PermissionsAndroid.RESULTS.GRANTED &&
//           writePermission === PermissionsAndroid.RESULTS.GRANTED
//         );
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleImport = async (): Promise<void> => {
//     try {
//       // Request permission if needed
//       const hasPermission = await requestStoragePermission();
//       if (!hasPermission) {
//         Alert.alert(
//           'Permission Denied',
//           'Cannot read files without storage permission.',
//         );
//         return;
//       }

//       // Pick the Excel file
//       const res: DocumentPickerResponse = await DocumentPicker.pick({
//         type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
//       });

//       console.log('Document picked:', res); // Log to inspect the response

//       const filePath = res.uri;
//       if (!filePath) {
//         throw new Error('File path is undefined');
//       }

//       // Read the file from the path
//       const fileData = await FileSystem.readFile(filePath, 'base64');

//       if (!fileData) {
//         throw new Error('File data is empty');
//       }

//       // Parse the Excel file using the xlsx library
//       const wb = XLSX.read(fileData, {type: 'base64'});
//       const sheetName = wb.SheetNames[0]; // Get the first sheet
//       const sheet = wb.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);

//       // Set the parsed data
//       setExcelData(jsonData);
//     } catch (err) {
//       console.error('Error reading file:', err);
//       Alert.alert('Error', err.message); // Show error to the user
//     }
//   };

//   return (
//     <View>
//       <Button title="Import Excel" onPress={handleImport} />
//       {excelData && (
//         <View>
//           <Text>Excel Data:</Text>
//           <Text>{JSON.stringify(excelData, null, 2)}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default ExcelImport;

// import React, {useEffect, useState} from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
// import RNFS from 'react-native-fs';
// import * as XLSX from 'xlsx';

// const App = () => {
//   const [excelData, setExcelData] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const readExcelFile = async () => {
//     try {
//       // Adjust the path according to where the Excel file is located.
//       const path = RNFS.DocumentDirectoryPath + '/example.xlsx'; // For Android
//       // On iOS, you can use RNFS.MainBundlePath to access the file in the app bundle

//       // Check if the file exists first
//       const fileExists = await RNFS.exists(path);
//       if (!fileExists) {
//         setError('File not found!');
//         return;
//       }

//       // Read the file from the file system
//       const fileData = await RNFS.readFile(path, 'base64'); // Read the file in base64 format

//       // Parse the Excel file data
//       const workbook = XLSX.read(fileData, {type: 'base64'});
//       const sheetName = workbook.SheetNames[0]; // Get the first sheet
//       const sheet = workbook.Sheets[sheetName]; // Get the sheet data
//       const data = XLSX.utils.sheet_to_json(sheet, {header: 1}); // Convert to JSON (array of arrays)

//       // Update state with the parsed data
//       setExcelData(data);
//     } catch (err: any) {
//       setError('Error reading or parsing the Excel file.');
//       console.error('Error:', err.message);
//     }
//   };

//   useEffect(() => {
//     readExcelFile(); // Automatically read the Excel file on mount (optional)
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Excel File Data:</Text>

//       {error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : excelData.length > 0 ? (
//         <View>
//           {excelData.map((row, index) => (
//             <Text key={index} style={styles.contentText}>
//               {JSON.stringify(row)}
//             </Text>
//           ))}
//         </View>
//       ) : (
//         <Text>Loading...</Text>
//       )}

//       <Button title="Read Excel File" onPress={readExcelFile} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   contentText: {
//     fontSize: 16,
//     marginTop: 10,
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 10,
//   },
// });

// export default App;

// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Alert,
//   FlatList,
// } from 'react-native';
// import RNFS from 'react-native-fs';
// import XLSX from 'xlsx';
// import DocumentPicker from 'react-native-document-picker';

// interface ExcelData {
//   D: string;
//   E: string;
//   F: number;
// }

// const App: React.FC = () => {
//   const [excelData, setExcelData] = useState<ExcelData[]>([]);

//   const sendSmsDatawithAPI = async (
//     numbers: string | string[],
//     bodySMS: string,
//   ) => {
//     let numberList: string[];

//     // Prepare the list of numbers, trim any spaces
//     if (Array.isArray(numbers)) {
//       numberList = numbers.map(num => num.trim());
//     } else {
//       numberList = numbers.split(',').map(num => num.trim());
//     }

//     // Loop through each number and send the SMS
//     for (const mobileNumber of numberList) {
//       if (mobileNumber) {
//         console.log('Sending SMS to:', mobileNumber);

//         const url = `https://api.greenweb.com.bd/api.php?token=109961539011714988341103396fe6f1b0a8060560cb748eb2d36&to=${mobileNumber}&message=${encodeURIComponent(
//           bodySMS,
//         )}`;

//         try {
//           const response = await fetch(url);
//           const result = await response.text(); // API response is in plain text
//           console.log('SMS API Response:', result);
//         } catch (error) {
//           console.error('Error sending SMS:', error);
//         }
//       }
//     }
//   };

//   // Function to handle importing an Excel file
//   const importExcelFile = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });

//       const fileContent = await RNFS.readFile(res[0].uri, 'ascii');
//       const workbook = XLSX.read(fileContent, {type: 'binary'});
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];

//       // Parse the sheet data, using the first row as headers
//       const data = XLSX.utils.sheet_to_json<ExcelData>(sheet, {header: 'A'});

//       // Log the data to check its structure
//       console.log('Parsed Excel Data:', data);

//       // Filter out rows where Code is undefined
//       const filteredData = data.filter(item => item.F !== undefined);

//       setExcelData(filteredData as ExcelData[]);
//       Alert.alert('Success', 'Excel file imported successfully');
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         Alert.alert('Canceled', 'File selection was canceled');
//       } else {
//         console.error('Error importing file:', err);
//         Alert.alert('Error', 'Failed to import the Excel file');
//       }
//     }
//   };

//   const renderItem = (item: any) => (
//     <View style={styles.item}>
//       <Text style={styles.text}>Name: {item.D}</Text>
//       <Text style={styles.text}>Mobile Number: {item.E}</Text>
//       <Text style={styles.text}>Code: {item.F}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.mainView}>
//       <TouchableOpacity onPress={importExcelFile} style={styles.button}>
//         <Text style={styles.buttonText}>Import Excel</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={excelData}
//         keyExtractor={item => (item.F ? item.F.toString() : 'undefined')} // Safely handle undefined
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainView: {
//     flex: 1,
//     padding: 20,
//   },
//   button: {
//     width: '100%',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#155638',
//     marginVertical: 20,
//     borderRadius: 5,
//     borderColor: '#ffff',
//     borderWidth: 3,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#ffff',
//     fontWeight: 'bold',
//   },
//   item: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default App;

// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Alert,
//   FlatList,
// } from 'react-native';
// import RNFS from 'react-native-fs';
// import XLSX from 'xlsx';
// import DocumentPicker from 'react-native-document-picker';

// interface ExcelData {
//   D: string;
//   E: string;
//   F: number;
// }

// const App: React.FC = () => {
//   const [excelData, setExcelData] = useState<ExcelData[]>([]);

//   // Function to handle importing an Excel file
//   const importExcelFile = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });

//       const fileContent = await RNFS.readFile(res[0].uri, 'ascii');
//       const workbook = XLSX.read(fileContent, {type: 'binary'});
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];

//       // Parse the sheet data, using the first row as headers
//       const data = XLSX.utils.sheet_to_json<ExcelData>(sheet, {header: 1});

//       // Log the data to check its structure
//       console.log('Parsed Excel Data:', data);

//       // Filter out rows where Code (F) is undefined
//       const filteredData = data.filter((item: any) => item.F !== undefined);

//       setExcelData(filteredData as ExcelData[]);
//       Alert.alert('Success', 'Excel file imported successfully');
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         Alert.alert('Canceled', 'File selection was canceled');
//       } else {
//         console.error('Error importing file:', err);
//         Alert.alert('Error', 'Failed to import the Excel file');
//       }
//     }
//   };

//   const renderItem = ({item}: {item: ExcelData}) => (
//     <View style={styles.item}>
//       <Text style={styles.text}>Name: {item.D}</Text>
//       <Text style={styles.text}>Mobile Number: {item.E}</Text>
//       <Text style={styles.text}>Code: {item.F}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.mainView}>
//       <TouchableOpacity onPress={importExcelFile} style={styles.button}>
//         <Text style={styles.buttonText}>Import Excel</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={excelData}
//         keyExtractor={item => item.F.toString()} // Convert number to string for key
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainView: {
//     flex: 1,
//     padding: 20,
//   },
//   button: {
//     width: '100%',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#155638',
//     marginVertical: 20,
//     borderRadius: 5,
//     borderColor: '#ffff',
//     borderWidth: 3,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#ffff',
//     fontWeight: 'bold',
//   },
//   item: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default App;
