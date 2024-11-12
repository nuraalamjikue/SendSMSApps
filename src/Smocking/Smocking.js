


import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Pressable, Text } from 'react-native';
import MQTT from 'sp-react-native-mqtt';
import Spinner from 'react-native-loading-spinner-overlay';
const { height, width } = Dimensions.get('window');
import Toast from 'react-native-toast-message';
let mqttClient;

const Smocking = () => {
    const [loading, setLoading] = useState(false);
    const [clickedButtonIndex, setClickedButtonIndex] = useState([]);
    const [counters, setCounters] = useState([0, 0, 0, 0]);
    //const [price, setPrice] = useState([18.50, 10.20, 30.20, 20]);
    const [deliverystatus, setDeliveryStatus] = useState([]);

    const handleToastMsg = (getType, getText) => {
        Toast.show({
            type: getType,
            text1: getText,
            visibilityTime: 2000,
        });
    };



    const handleButtonClick = (index) => {
        setClickedButtonIndex(prevIndices => {
            if (prevIndices === null) return [index]; // Handle case where prevIndices is null
            const newIndices = [...prevIndices];
            if (!newIndices.includes(index)) {
                newIndices.push(index);
            }
            return newIndices;
        });
    };




    const resetButtons = () => {
        setClickedButtonIndex([]);
        setCounters([0, 0, 0, 0]); // Reset all counters
    };

    // const incrementCounter = (index) => {
    //     setCounters(prevCounters => {
    //         const newCounters = [...prevCounters];
    //         newCounters[index] += 1;
    //         return newCounters;
    //     });
    // };

    // const incrementCounter = (index) => {
    //     setCounters(prevCounters => {
    //         const newCounters = [...prevCounters];
    //         if (newCounters[index] < 3) {
    //             newCounters[index] += 1;
    //         }
    //         return newCounters;
    //     });
    // };

    const incrementCounter = (index) => {
        setCounters(prevCounters => {

            const newCounters = [...prevCounters];
            if (newCounters[index] < 3) {
                if (newCounters[index] < 1) {
                    handleButtonClick(index);
                }
                newCounters[index] += 1;
            }
            return newCounters;
        });
    };


    // const decrementCounter = (index) => {
    //     setCounters(prevCounters => {
    //         const newCounters = [...prevCounters];
    //         newCounters[index] = Math.max(newCounters[index] - 1, 0); // Prevent negative counts
    //         return newCounters;
    //     });
    // };

    const decrementCounter = (index) => {
        setCounters(prevCounters => {
            const newCounters = [...prevCounters];
            newCounters[index] = Math.max(newCounters[index] - 1, 0);
            if (newCounters[index] < 1) {
                console.log('decrementCounter ' + newCounters);
                resetButtons();
            }
            return newCounters;
        });
    };
    const handelEmpty = () => {
        console.log('test handel empty');

        handleToastMsg('error', `Please select Brand `);
        return;
    };


    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // const sendMessage = async () => {
    //     if (!mqttClient) {
    //         console.warn('MQTT client not initialized.');
    //         return;
    //     }

    //     const delayTime = 1000; // Delay in milliseconds (e.g., 1000ms = 1 second)
    //     let totalPrice = 0;
    //     let totalQuantity = 0;

    //     try {
    //         for (const index of clickedButtonIndex) {
    //             console.log(`Preparing to send message for index: ${index}`);

    //             // Calculate total price and total quantity
    //             totalPrice += price[index] * counters[index];
    //             totalQuantity += counters[index];

    //             const formattedMessage = `{"drive": ${index + 1},"count": ${counters[index]}}`;

    //             // Publish the message
    //             mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
    //             console.log(`Message published for index: ${index}`);

    //             // Wait for the specified delay
    //             await delay(delayTime);
    //         }

    //         // Log or handle the total price and total quantity
    //         console.log(`Total Price: ${totalPrice.toFixed(2)}, Total Quantity: ${totalQuantity}`);

    //         // Optionally, you can show a toast message with the totals
    //         handleToastMsg('success', `Total Price: $${totalPrice.toFixed(2)}, Total Quantity: ${totalQuantity}`);

    //         resetButtons();
    //     } catch (err) {
    //         console.error('Failed to publish message:', err);
    //     }
    // };


    const sendMessage = async () => {
        if (!mqttClient) {
            console.warn('MQTT client not initialized.');
            return;
        }

        const indices = [0, 1];
        const delayTime = 1000; // Delay in milliseconds (e.g., 1000ms = 1 second)

        try {
            for (const index of clickedButtonIndex) {
                console.log(`Preparing to send message for index: ${index}`);

                const formattedMessage = `{"drive": ${index + 1},"count": ${counters[index]}}`;

                // Publish the message
                mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
                console.log(`Message published for index: ${index}`);

                // Wait for the specified delay
                await delay(delayTime);

                resetButtons();
            }
        } catch (err) {
            console.error('Failed to publish message:', err);
        }
    };



    // useEffect(() => {
    //     if (!mqttClient) {
    //         MQTT.createClient({
    //             uri: 'mqtt://172.16.16.4:1883',
    //             clientId: '12345678910',
    //         })
    //             .then((client) => {
    //                 mqttClient = client;
    //                 client.on('closed', () => console.log('mqtt.event.closed'));
    //                 client.on('error', (msg) => console.log('mqtt.event.error', msg));
    //                 client.on('message', (msg) => {

    //                     console.log('Received message:', JSON.parse(msg.data));

    //                     const DeliveryStatusJson = JSON.parse(msg.data);
    //                     setDeliveryStatus(DeliveryStatusJson);
    //                     setLoading(false);
    //                 });

    //                 client.on('connect', () => {
    //                     console.log('Connected to MQTT broker');
    //                     client.subscribe('cigarate/received/device123', 0);
    //                 });

    //                 client.connect();
    //             })
    //             .catch((err) => console.log(err));

    //         return () => {
    //             if (mqttClient) {
    //                 mqttClient.disconnect();
    //                 mqttClient = null;
    //                 setLoading(false);
    //             }
    //         };
    //     }
    // }, []);


    // const sendMessage = () => {
    //     if (!mqttClient) {
    //         console.warn('MQTT client not initialized.');
    //         return;
    //     }
    //     try {

    //         if (clickedButtonIndex === 0) {


    //             const formattedMessage = `{"drive": ${clickedButtonIndex + 1},"count": ${counters[0]}}`;
    //             mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
    //             resetButtons();

    //         } else if (clickedButtonIndex === 1) {
    //             const formattedMessage = `{"drive": ${clickedButtonIndex + 1},"count": ${counters[1]}}`;
    //             mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
    //             resetButtons();

    //         } else if (clickedButtonIndex === 2) {
    //             const formattedMessage = `{"drive": ${clickedButtonIndex + 1},"count": ${counters[2]}}`;
    //             mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
    //             resetButtons();

    //         } else if (clickedButtonIndex === 3) {
    //             const formattedMessage = `{"drive": ${clickedButtonIndex + 1},"count": ${counters[3]}}`;
    //             mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
    //             resetButtons();

    //         }





    //     } catch (err) {
    //         console.error('Failed to publish message:', err);
    //     }
    // };

    // const sendMessage = () => {
    //     if (!mqttClient) {
    //         console.warn('MQTT client not initialized.');
    //         return;
    //     }
    //     try {
    //         if (clickedButtonIndex !== null) {
    //             const formattedMessage = `{"drive": ${clickedButtonIndex + 1},"count": ${counters[clickedButtonIndex]}}`;
    //             mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
    //             // resetButtons();
    //         }
    //     } catch (err) {
    //         console.error('Failed to publish message:', err);
    //     }
    // };





    useEffect(() => {
        //  setLoading(true);
        // Initialize MQTT client if not already initialized
        if (!mqttClient) {
            MQTT.createClient({
                uri: 'mqtt://172.16.16.4:1883',
                clientId: '12345678910',
            })
                .then((client) => {
                    mqttClient = client;
                    client.on('closed', () => console.log('mqtt.event.closed'));
                    client.on('error', (msg) =>
                        console.log('mqtt.event.error', msg),
                    );
                    client.on('message', (msg) => {
                        console.log('mqtt.event.message', msg);
                        const DeliveryStatusJson = JSON.parse(msg.data);
                        // console.log('cigaratePassCount:', DeliveryStatusJson);
                        setDeliveryStatus(DeliveryStatusJson)
                        //Alert.alert(msg.data);
                        // Handle received message here
                        setLoading(false);
                    });

                    client.on('connect', () => {
                        console.log('connected');
                        client.subscribe('cigarate/confirmation/device123', 0);



                    });

                    client.connect();
                })
                .catch((err) => console.log(err));

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

    // console.log('deliverystatus received' + deliverystatus);


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[
                    styles.button,
                    clickedButtonIndex === 0 && styles.clickedButton
                ]}>
                    <View>
                        <Text style={styles.text}>Brand 1</Text>
                    </View>

                    {counters[0] === 0 && (
                        <View style={styles.centeredView}>
                            <Pressable
                                // style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
                                onPress={() => { handleButtonClick(0); incrementCounter(0) }}
                            // disabled={clickedButtonIndex !== null && clickedButtonIndex !== 0}
                            >
                                <Text style={styles.Addtext}>ADD</Text>
                            </Pressable>
                        </View>
                    )}

                    {counters[0] > 0 && (
                        <View style={styles.counterContainer}>
                            <Pressable
                                style={styles.DecrementButton}
                                onPress={() => decrementCounter(0)}
                            >
                                <Text style={styles.decrementtext}>-</Text>
                            </Pressable>
                            <Text style={styles.counterText}>{counters[0]}</Text>
                            <Pressable
                                style={styles.incrementButton}
                                onPress={() => incrementCounter(0)}
                            >
                                <Text style={styles.incrementtext}>+</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                <View style={[
                    styles.button,
                    clickedButtonIndex === 1 && styles.clickedButton
                ]}>
                    <View>
                        <Text style={styles.text}>Brand 2</Text>
                    </View>
                    {counters[1] === 0 && (
                        <View style={styles.centeredView}>
                            <Pressable
                                onPress={() => { handleButtonClick(1); incrementCounter(1) }}
                            //disabled={clickedButtonIndex !== null && clickedButtonIndex !== 1}
                            >
                                <Text style={styles.Addtext}>ADD</Text>
                            </Pressable>
                        </View>
                    )}

                    {counters[1] > 0 && (
                        <View style={styles.counterContainer}>
                            <Pressable
                                style={styles.DecrementButton}
                                onPress={() => decrementCounter(1)}
                            >
                                <Text style={styles.decrementtext}>-</Text>
                            </Pressable>
                            <Text style={styles.counterText}>{counters[1]}</Text>
                            <Pressable
                                style={styles.incrementButton}
                                onPress={() => incrementCounter(1)}
                            >
                                <Text style={styles.incrementtext}>+</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
            <Toast />
            {/* ------------------------------------secount step 2-------------------------------- */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[
                    styles.button,
                    clickedButtonIndex === 2 && styles.clickedButton
                ]}>
                    <View>
                        <Text style={styles.text}>Brand 3</Text>
                    </View>
                    {counters[2] === 0 && (
                        <View style={styles.centeredView}>
                            <Pressable
                                onPress={() => { handleButtonClick(2); incrementCounter(2) }}
                            // disabled={clickedButtonIndex !== null && clickedButtonIndex !== 2}
                            >
                                <Text style={styles.Addtext}>ADD</Text>
                            </Pressable>
                        </View>
                    )}

                    {counters[2] > 0 && (
                        <View style={styles.counterContainer}>
                            <Pressable
                                style={styles.DecrementButton}
                                onPress={() => decrementCounter(2)}
                            >
                                <Text style={styles.decrementtext}>-</Text>
                            </Pressable>
                            <Text style={styles.counterText}>{counters[2]}</Text>
                            <Pressable
                                style={styles.incrementButton}
                                onPress={() => incrementCounter(2)}
                            >
                                <Text style={styles.incrementtext}>+</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                <View style={[
                    styles.button,
                    clickedButtonIndex === 3 && styles.clickedButton
                ]}>
                    <View>
                        <Text style={styles.text}>Brand 4</Text>
                    </View>
                    {counters[3] === 0 && (
                        <View style={styles.centeredView}>
                            <Pressable
                                onPress={() => { handleButtonClick(3); incrementCounter(3) }}
                            //disabled={clickedButtonIndex !== null && clickedButtonIndex !== 3}
                            >
                                <Text style={styles.Addtext}>ADD</Text>
                            </Pressable>
                        </View>
                    )}

                    {counters[3] > 0 && (
                        <View style={styles.counterContainer}>
                            <Pressable
                                style={styles.DecrementButton}
                                onPress={() => decrementCounter(3)}
                            >
                                <Text style={styles.decrementtext}>-</Text>
                            </Pressable>
                            <Text style={styles.counterText}>{counters[3]}</Text>
                            <Pressable
                                style={styles.incrementButton}
                                onPress={() => incrementCounter(3)}
                            >
                                <Text style={styles.incrementtext}>+</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
            <View style={styles.DeliverystatusArea}>
                <Text style={styles.DeliverystatusText}>{deliverystatus.cigaratePassCount}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: height / 12 }}>

                <View style={styles.SubmitButton_area}>
                    <Pressable
                        style={styles.SubmitButton}
                        onPress={
                            () => {
                                clickedButtonIndex === null ? handelEmpty() : sendMessage();


                            }
                        }
                    >
                        <Text style={styles.text}>Submit</Text>
                    </Pressable>
                </View>
                <View style={styles.Reset_area}>

                    <Pressable
                        style={styles.ResetButton}
                        onPress={resetButtons}
                    >
                        <Text style={styles.text}>Reset</Text>
                    </Pressable>
                </View>


            </View>

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
        paddingHorizontal: width / 40,
        //backgroundColor: 'green',
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        alignItems: 'center',
        // justifyContent: 'center',
        margin: 3,
        height: height / 5,
        width: '48%',
    },
    clickedButton: {
        backgroundColor: '#FF5722',
    },
    resetButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: '10%',
        width: '48%',
    },
    text: {
        color: '#FFFFFF',
        fontSize: width / 35,
        fontWeight: 'bold',
    },
    Addtext: {
        color: '#FFFFFF',
        fontSize: width / 25,
        fontWeight: 'bold',
    },
    incrementtext: {
        fontSize: width / 15,
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    decrementtext: {
        fontSize: width / 15,
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DecrementButton: {
        backgroundColor: '#B20093',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        height: height / 22,
        width: width / 10,
    },
    incrementButton: {
        backgroundColor: '#612697',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        height: height / 22,
        width: width / 10,
    },
    incrementDecrementButton: {
        backgroundColor: '#E43C30',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        height: height / 22,
        width: width / 10,
    },
    counterContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height / 45,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: height / 45,
    },
    counterText: {
        fontSize: width / 15,
        marginHorizontal: 10,
        fontFamily: 'bold',
        color: '#FFFFFF',
    },

    SubmitButton_area: {
        width: width / 2.2,
        height: height / 15,
        marginRight: 6,

    },
    SubmitButton: {
        backgroundColor: '#026E75',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    Reset_area: {
        width: width / 2.2,
        height: height / 15

    },
    ResetButton: {
        backgroundColor: '#FC4136',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    DeliverystatusArea: {},
    DeliverystatusText: {},

});

export default Smocking;




// import React, { useEffect, useState } from 'react';
// import { View, Dimensions, StyleSheet, Pressable, Text } from 'react-native';
// import MQTT from 'sp-react-native-mqtt';
// import Spinner from 'react-native-loading-spinner-overlay';
// const { height, width } = Dimensions.get('window');
// import Toast from 'react-native-toast-message';
// let mqttClient;

// const Smocking = () => {
//     const [loading, setLoading] = useState(false);
//     const [clickedButtonIndex, setClickedButtonIndex] = useState([]);
//     const [counters, setCounters] = useState([0, 0, 0, 0]);
//     const [deliverystatus, setDeliveryStatus] = useState([]);

//     const handleToastMsg = (getType, getText) => {
//         Toast.show({
//             type: getType,
//             text1: getText,
//             visibilityTime: 2000,
//         });
//     };



//     const handleButtonClick = (index) => {
//         setClickedButtonIndex(prevIndices => {
//             const newIndices = [...prevIndices];
//             if (!newIndices.includes(index)) {
//                 newIndices.push(index);
//             }
//             return newIndices;
//         });
//     };

//     const resetButtons = () => {
//         setClickedButtonIndex(null);
//         setCounters([0, 0, 0, 0]); // Reset all counters
//     };

//     const incrementCounter = (index) => {
//         setCounters(prevCounters => {
//             const newCounters = [...prevCounters];
//             if (newCounters[index] < 3) {
//                 if (newCounters[index] < 1) {
//                     handleButtonClick(index);
//                 }
//                 newCounters[index] += 1;
//             }
//             return newCounters;
//         });
//     };

//     const decrementCounter = (index) => {
//         setCounters(prevCounters => {
//             const newCounters = [...prevCounters];
//             newCounters[index] = Math.max(newCounters[index] - 1, 0);
//             if (newCounters[index] < 1) {
//                 resetButtons();
//             }
//             return newCounters;
//         });
//     };

//     const handelEmpty = () => {
//         handleToastMsg('error', `Please select Brand`);
//         return;
//     };

//     // const sendMessage = () => {
//     //     if (!mqttClient) {
//     //         console.warn('MQTT client not initialized.');
//     //         return;
//     //     }

//     //     const indices = [0, 1];

//     //     try {
//     //         indices.forEach(index => {
//     //             console.log(`Preparing to send message for index: ${index}`);

//     //             const formattedMessage = `{"drive": ${index},"count": 2}`;
//     //             mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
//     //             console.log(`Message published for index: ${index}`);
//     //         });
//     //     } catch (err) {
//     //         console.error('Failed to publish message:', err);
//     //     }
//     // };


//     const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//     const sendMessage = async () => {
//         if (!mqttClient) {
//             console.warn('MQTT client not initialized.');
//             return;
//         }

//         const indices = [0, 1];
//         const delayTime = 1000; // Delay in milliseconds (e.g., 1000ms = 1 second)

//         try {
//             for (const index of clickedButtonIndex) {
//                 console.log(`Preparing to send message for index: ${index}`);

//                 const formattedMessage = `{"drive": ${index + 1},"count": ${counters[index]}}`;

//                 // Publish the message
//                 mqttClient.publish('cigarate/received/device123', formattedMessage, 0, false);
//                 console.log(`Message published for index: ${index}`);

//                 // Wait for the specified delay
//                 await delay(delayTime);
//             }
//         } catch (err) {
//             console.error('Failed to publish message:', err);
//         }
//     };



//     useEffect(() => {
//         if (!mqttClient) {
//             MQTT.createClient({
//                 uri: 'mqtt://172.16.16.4:1883',
//                 clientId: '12345678910',
//             })
//                 .then((client) => {
//                     mqttClient = client;
//                     client.on('closed', () => console.log('mqtt.event.closed'));
//                     client.on('error', (msg) => console.log('mqtt.event.error', msg));
//                     client.on('message', (msg) => {
//                         const DeliveryStatusJson = JSON.parse(msg.data);
//                         setDeliveryStatus(DeliveryStatusJson);
//                         setLoading(false);
//                     });

//                     client.on('connect', () => {
//                         console.log('Connected to MQTT broker');
//                         client.subscribe('cigarate/received/device123', 0);
//                     });

//                     client.connect();
//                 })
//                 .catch((err) => console.log(err));

//             return () => {
//                 if (mqttClient) {
//                     mqttClient.disconnect();
//                     mqttClient = null;
//                     setLoading(false);
//                 }
//             };
//         }
//     }, []);


//     return (
//         <View style={styles.container}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                 <View style={[
//                     styles.button,
//                     clickedButtonIndex === 0 && styles.clickedButton
//                 ]}>
//                     <View>
//                         <Text style={styles.text}>Brand 1</Text>
//                     </View>
//                     {counters[0] === 0 && (
//                         <View style={styles.centeredView}>
//                             <Pressable
//                                 onPress={() => { handleButtonClick(0); incrementCounter(0) }}
//                             >
//                                 <Text style={styles.Addtext}>ADD</Text>
//                             </Pressable>
//                         </View>
//                     )}
//                     {counters[0] > 0 && (
//                         <View style={styles.counterContainer}>
//                             <Pressable
//                                 style={styles.DecrementButton}
//                                 onPress={() => decrementCounter(0)}
//                             >
//                                 <Text style={styles.decrementtext}>-</Text>
//                             </Pressable>
//                             <Text style={styles.counterText}>{counters[0]}</Text>
//                             <Pressable
//                                 style={styles.incrementButton}
//                                 onPress={() => incrementCounter(0)}
//                             >
//                                 <Text style={styles.incrementtext}>+</Text>
//                             </Pressable>
//                         </View>
//                     )}
//                 </View>

//                 <View style={[
//                     styles.button,
//                     clickedButtonIndex === 1 && styles.clickedButton
//                 ]}>
//                     <View>
//                         <Text style={styles.text}>Brand 2</Text>
//                     </View>
//                     {counters[1] === 0 && (
//                         <View style={styles.centeredView}>
//                             <Pressable
//                                 onPress={() => { handleButtonClick(1); incrementCounter(1) }}
//                             >
//                                 <Text style={styles.Addtext}>ADD</Text>
//                             </Pressable>
//                         </View>
//                     )}
//                     {counters[1] > 0 && (
//                         <View style={styles.counterContainer}>
//                             <Pressable
//                                 style={styles.DecrementButton}
//                                 onPress={() => decrementCounter(1)}
//                             >
//                                 <Text style={styles.decrementtext}>-</Text>
//                             </Pressable>
//                             <Text style={styles.counterText}>{counters[1]}</Text>
//                             <Pressable
//                                 style={styles.incrementButton}
//                                 onPress={() => incrementCounter(1)}
//                             >
//                                 <Text style={styles.incrementtext}>+</Text>
//                             </Pressable>
//                         </View>
//                     )}
//                 </View>
//             </View>
//             <Toast />
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                 <View style={[
//                     styles.button,
//                     clickedButtonIndex === 2 && styles.clickedButton
//                 ]}>
//                     <View>
//                         <Text style={styles.text}>Brand 3</Text>
//                     </View>
//                     {counters[2] === 0 && (
//                         <View style={styles.centeredView}>
//                             <Pressable
//                                 onPress={() => { handleButtonClick(2); incrementCounter(2) }}
//                             >
//                                 <Text style={styles.Addtext}>ADD</Text>
//                             </Pressable>
//                         </View>
//                     )}
//                     {counters[2] > 0 && (
//                         <View style={styles.counterContainer}>
//                             <Pressable
//                                 style={styles.DecrementButton}
//                                 onPress={() => decrementCounter(2)}
//                             >
//                                 <Text style={styles.decrementtext}>-</Text>
//                             </Pressable>
//                             <Text style={styles.counterText}>{counters[2]}</Text>
//                             <Pressable
//                                 style={styles.incrementButton}
//                                 onPress={() => incrementCounter(2)}
//                             >
//                                 <Text style={styles.incrementtext}>+</Text>
//                             </Pressable>
//                         </View>
//                     )}
//                 </View>

//                 <View style={[
//                     styles.button,
//                     clickedButtonIndex === 3 && styles.clickedButton
//                 ]}>
//                     <View>
//                         <Text style={styles.text}>Brand 4</Text>
//                     </View>
//                     {counters[3] === 0 && (
//                         <View style={styles.centeredView}>
//                             <Pressable
//                                 onPress={() => { handleButtonClick(3); incrementCounter(3) }}
//                             >
//                                 <Text style={styles.Addtext}>ADD</Text>
//                             </Pressable>
//                         </View>
//                     )}
//                     {counters[3] > 0 && (
//                         <View style={styles.counterContainer}>
//                             <Pressable
//                                 style={styles.DecrementButton}
//                                 onPress={() => decrementCounter(3)}
//                             >
//                                 <Text style={styles.decrementtext}>-</Text>
//                             </Pressable>
//                             <Text style={styles.counterText}>{counters[3]}</Text>
//                             <Pressable
//                                 style={styles.incrementButton}
//                                 onPress={() => incrementCounter(3)}
//                             >
//                                 <Text style={styles.incrementtext}>+</Text>
//                             </Pressable>
//                         </View>
//                     )}
//                 </View>
//             </View>
//             <Pressable
//                 style={styles.sendButton}
//                 onPress={() => {
//                     const hasCount = counters.some(count => count > 0);
//                     if (hasCount) {
//                         sendMessage();
//                         setLoading(true);
//                     } else {
//                         handelEmpty();
//                     }
//                 }}
//             >
//                 <Text style={styles.sendButtonText}>Send Message</Text>
//             </Pressable>
//             <Spinner
//                 visible={loading}
//                 textContent={'Loading...'}
//                 textStyle={styles.spinnerTextStyle}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 10,
//         backgroundColor: '#fff',
//     },
//     button: {
//         width: (width - 30) / 2,
//         height: height * 0.12,
//         backgroundColor: 'gray',
//         borderRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     clickedButton: {
//         borderColor: 'blue',
//         borderWidth: 2,
//     },
//     text: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     centeredView: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     Addtext: {
//         color: '#000',
//         fontSize: 14,
//         fontWeight: 'bold',
//         backgroundColor: 'yellow',
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//         borderRadius: 5,
//     },
//     counterContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     DecrementButton: {
//         backgroundColor: 'red',
//         borderRadius: 5,
//         marginRight: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//     },
//     decrementtext: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     counterText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginHorizontal: 5,
//     },
//     incrementButton: {
//         backgroundColor: 'green',
//         borderRadius: 5,
//         marginLeft: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//     },
//     incrementtext: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     sendButton: {
//         backgroundColor: 'blue',
//         borderRadius: 5,
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     sendButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     spinnerTextStyle: {
//         color: '#FFF',
//     },
// });

// export default Smocking;
