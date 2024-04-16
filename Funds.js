import {
	SafeAreaView,
	StyleSheet,
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
	ToastAndroid,
  RefreshControl,
	props,
    Modal,
  Pressable,
  Dimensions
  } from "react-native";
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useRoute } from '@react-navigation/native';
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import LoadingScreen from "./LoadingScreen";
  import {NETWORK_ADDPOCKET} from '@env';
  import * as ImagePicker from 'expo-image-picker';
  import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
  import { EvilIcons } from '@expo/vector-icons';
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  import { Feather } from '@expo/vector-icons';

  
const Funds = () => {

const route = useRoute();
const id = route.params.id; //from bussiness view entrep
const [imageURL, setimageURL] = useState("");
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [receiptID, setreceiptID] = useState()
const [showloader, setShowLoarder] = useState(false);


const navigation = useNavigation();
const [newsfeedsData, setnewsfeedsData] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);
const [modalVisiblee, setModalVisiblee] = useState(false);

//for loading screen
const [isLoading, setIsLoading] = useState(true);

//////////////// created


 
var datee = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var hr = new Date().getHours();
var min = new Date().getMinutes();
var secs = new Date().getSeconds();

// You can turn it in to your desired format
var createdAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;

//to format specific date
const formatDate = (date) => {
  const formattedDate = new Date(date);
  const hours = formattedDate.getHours();
  const minutes = formattedDate.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const monthName = monthNames[formattedDate.getMonth()];

  return `${monthName} ${formattedDate.getDate()} ${formattedDate.getFullYear()} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
  // Customize the format as needed
};



useEffect(() => {
  // Simulate an API call or data loading process
  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false when data is loaded
  }, 2000); // Simulate a 2-second loading time
}, []);



  const[user, setUser] = useState('');
  const[dataID, setData] = useState([]);
  const msg = "Requested to invest to your business";
  const notifMsg = dataID + msg;

  useEffect(() => {
  async function fecthUser(){
    const id = await AsyncStorage.getItem('userID');
    setUser(id)

      Axios.post(`${NETWORK_ADDPOCKET}/getIdFinal`,{

        user:id
      })
        // .then((res) => setData(res.data.results[0]))
        .then((res) => {setData(res.data.results[0].user_fname)
        console.log(res.data.results[0].user_fname)}
        )

        .catch((error) => console.log(error));
      if(!id){
        navigation.navigate("Login")

    } 
   }

   fecthUser();
  },[])





  const handleAbbreviatedValue = (value) => {

    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + "B";
    }
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value;
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setbuttonStatus(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [8, 10],
      quality: 1,
    });
  
    //  console.log(result);
  
    if (!result.canceled) {
        setbuttonStatus(false);
      setImage(result.assets[0].uri);
      setImageFilename(result.assets[0].uri.split("/").pop());
    //   console.log(image);
    }
  
  };
  // const imagesUpload = async () => {
  
  //   const storagee = storage;
  //   const imageRef = ref(storagee, "images/" + imageFilename);
  //   const img = await fetch(image);
  //   const blob = await img.blob();
  
  //   uploadBytes(imageRef, blob).then((snap) => {
  //     getDownloadURL(imageRef).then((url) => {
  //        console.log(url);
  //       setimageURL(url);
  //     });
  //   });
  
  // };
  


  const imagesUpload = async () => {
    try {
      const storageRef = storage;
      const imageRef = ref(storageRef, "images/" + imageFilename);
      const img = await fetch(image);
      const blob = await img.blob();
  
      const snap = await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(imageRef);
  
      setimageURL(url); // Set the URL in state or wherever necessary
  
      return url; // Return the URL for use in the Receipt function
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error to the calling function if needed
    }
  };


  const Receipt = async (receipt) => {
    try {
      setShowLoarder(true);
      // Upload the image first
      const imageURL = await imagesUpload();
  
      // Once the image is uploaded, proceed to save the receipt
      await Axios.post(`${NETWORK_ADDPOCKET}/BussReciept`, {
        bussReciept: imageURL,
        recieptID: receipt,
      });
  
      // If everything is successful
      ToastAndroid.show("Receipt successfully uploaded.", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      setImage(null);
      setModalVisiblee(false);
      setShowLoarder(false);

    } catch (error) {
      console.log(error);
    }
  };


  // Get the screen dimensions
  const { width, height } = Dimensions.get('window');

  // Calculate button size and text size based on screen dimensions
  const buttonWidth = width * 0.22;
  const buttonHeight = height * 0.05;
  const textSize = Math.min(width, height) * 0.036;

// Adjust the React useEffect to handle the fetched data
useEffect(() => {
  Axios.post(`${NETWORK_ADDPOCKET}/ViewBusinessAndFunds`, {
    bussID: id
  })
    .then((res) => {
      // Process the fetched data here if needed
      const formattedData = res.data; // Adjust formatting if needed
      setnewsfeedsData(formattedData);
    })
    .catch((error) => console.log(error));
}, [id]);

const AmountRecieved = (fundsID) => {
    
  Axios.post(`${NETWORK_ADDPOCKET}/BussFundsAmountRecieve`, {
    fundsID: fundsID,
})
  .then((res) =>  
    ToastAndroid.show("Mark as Recieved",
    ToastAndroid.SHORT,ToastAndroid.BOTTOM),
    setImage(null),
    setModalVisiblee(false),

  )
  .catch((error) => console.log(error));
  
};


const AmountDecline = (fundsID) => {
    
  Axios.post(`${NETWORK_ADDPOCKET}/BussFundsAmountDecline`, {
    fundsID: fundsID,
})
  .then((res) =>  
    ToastAndroid.show("Decline",
    ToastAndroid.SHORT,ToastAndroid.BOTTOM),
    setImage(null),
    setModalVisiblee(false),

  )
  .catch((error) => console.log(error));
  
};

const filterBusinessUseFundsStatus = (useFunds, businesSendFunds) => {
  // console.log(businesSendFunds);
  const InitialsendBusinessFundsData = businesSendFunds;
  const dataSendBusinessFunds = InitialsendBusinessFundsData.map(
    (item) => item
  );
  const filterUseFunds = useFunds.map((item) => {
    const matchFund = dataSendBusinessFunds.find(
      (match) => match.bussFunds_id === item.id
    );

    if (matchFund) {
      return {
        ...item,
        status: "send",
        bussFunds_amount_recieve_status:
          matchFund.bussFunds_amount_recieve_status,
        bussFunds_reciept: matchFund.bussFunds_reciept,
        bussFunds_reciept_status: matchFund.bussFunds_reciept_status,
      };
    } else {
      return { ...item, status: "not send" };
    }
  });

  return filterUseFunds;
};





	return (
	  <SafeAreaView style={{ flex: 1, height: "100%", marginTop:"2%" }}>

{isLoading ? (

<LoadingScreen />
):(

  <View style={{maxHeight:"86%"}}>
  {newsfeedsData.map((item, index) => (
    <View key={index}>

    {filterBusinessUseFundsStatus(
                              JSON.parse(item.buss_useof_funds),
                              item.businessFunds
                            ).map((item, index) => (

    <View key={index} style={styles.container}>
            {/* <Image  source={{uri: item.buss_photo}} style={styles.avatar} /> */}
            <View  style={styles.content}>
              <View style={styles.mainContent}>

                <View style={styles.text}>
                  <Text style={styles.name}>{item.products}</Text>
                </View>
                <Text  style={styles.text}>{Number(item.amount).toLocaleString()}</Text>

                {/* <Text style={styles.timeAgo}>2 hours ago</Text> */}

              </View>

              
              <View style={styles.attachment}>

              {item.status === "send" && item.bussFunds_amount_recieve_status === "pending"
              && !item.bussFunds_reciept ? (

              <View>
            <Pressable style={styles.actionButton}>
          <TouchableOpacity
            style={[styles.button3, styles.buttonOpen, { width: buttonWidth, height: buttonHeight }]}
            onPress={() => {  AmountRecieved(item.id) }}>

            <Text style={[styles.textStyle, { fontSize: textSize }]}>Recieved</Text>

          </TouchableOpacity>
        </Pressable>



        </View>

        

        



              ): item.status === "not send" ? (
                <EvilIcons name="question" size={24} color="black" />
                
              ) : item.bussFunds_amount_recieve_status ===
                                      "recieve" &&
                                    item.status === "send" &&
                                    !item.bussFunds_reciept &&
                                    item.bussFunds_reciept_status ===
                                      "pending" ? (
                                        <>
                                        
                                <View style={styles.buttonContainer}>
                                  <Pressable style={styles.actionButton}>
                                    <TouchableOpacity
                                      style={[styles.button3, styles.buttonOpen, { width: buttonWidth, height: buttonHeight }]}
                                      onPress={() => { setModalVisiblee(true), setreceiptID(item.id) }}
                                    >
                                      <Text style={[styles.textStyle, { fontSize: textSize }]}>Upload</Text>
                                    </TouchableOpacity>
                                  </Pressable>
                                </View>
                                        </>
                                        



              ): item.bussFunds_amount_recieve_status ===
                                      "recieve" &&
                                    item.status === "send" &&
                                    item.bussFunds_reciept &&
                                    item.bussFunds_reciept_status ===
                                      "approved" ? (
                                        <>
                                        <EvilIcons name="check" size={24} color="black" />
                                        </>
                                      ): item.bussFunds_amount_recieve_status ===
                                      "recieve" &&
                                    item.status === "send" &&
                                    item.bussFunds_reciept &&
                                    item.bussFunds_reciept_status ===
                                      "declined" ? (
                                        <>
                                        {/* <Text>Re-upload Receipt</Text> */}
                                        <EvilIcons name="question" size={24} color="black" />
                                        
                                        <View style={styles.buttonContainer}>
                                  <Pressable style={styles.actionButton}>
                                    <TouchableOpacity
                                      style={[styles.button3, styles.buttonOpen, { width: buttonWidth, height: buttonHeight }]}
                                      onPress={() => { setModalVisiblee(true), setreceiptID(item.id) }}
                                    >
                                      <Text style={[styles.textStyle, { fontSize: textSize }]}>Re-Upload</Text>
                                    </TouchableOpacity>
                                  </Pressable>
                                </View>

                                        </>
                                      ) : item.bussFunds_amount_recieve_status ===
                                      "recieve" &&
                                    item.status === "send" &&
                                    item.bussFunds_reciept &&
                                    item.bussFunds_reciept_status ===
                                      "pending" ? (
                                        <>
                                        {/* <Text>Waiting to be approved</Text>   */}
                                        <Feather name="loader" size={24} color="black" />
                                        </>
                                  
                                  ) : 
                                  ("")}

              </View>
              
            </View>

           

            
          </View>

          ))}



          </View>
      ))}



</View>
      
  )}




<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblee}
        onRequestClose={() => setModalVisiblee(false)}>
          <View style={styles.modalView}>
          <TouchableOpacity
      style={styles.closeButton}
      onPress={() => 
      {
        setModalVisiblee(false)
        setImage(null);
        }}>
      <Feather name="x-circle" size={24} color="black" />
    </TouchableOpacity>

            <Text>Please upload your reciept to confirm</Text>
            <View style={styles.photoborder}>
            {image && <Image source={{ uri: image }} style={styles.image2} />}
            </View>

            <Pressable style={styles.actionButton1}>
          <TouchableOpacity
            style={[styles.button3, styles.buttonOpen, { width: buttonWidth, height: buttonHeight }]}
            onPress={() => {  pickImage() }}>

            <Text style={[styles.textStyle, { fontSize: textSize }]}>Upload</Text>

          </TouchableOpacity>
        </Pressable>

            {showloader ? (
        <Pressable style={styles.actionButton1}>
        <TouchableOpacity
          style={[styles.button3, styles.buttonOpen, { width: buttonWidth, height: buttonHeight }]}>
            <LoadingScreen />
        </TouchableOpacity>
      </Pressable>
      ) : (
            <Pressable style={styles.actionButton1}>
          <TouchableOpacity
            style={[styles.button3, styles.buttonOpen, { width: buttonWidth, height: buttonHeight }]}
            onPress={() => {   Receipt(receiptID) }}>

            <Text style={[styles.textStyle, { fontSize: textSize }]}>Save</Text>

          </TouchableOpacity>
        </Pressable>
          
          )}


          </View>
        {/* </View> */}
      </Modal>

</SafeAreaView>
	);
  };
  
  const styles = StyleSheet.create({
	itemStyle: {
	  padding: 30,
	  fontSize: 20,
	  left: 50,
	},
	emptyListStyle: {
		padding: 10,
		fontSize: 18,
		textAlign: 'center',
	  },
    button: {
      width: "99%",
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      backgroundColor: "#534c88",
    },
    button1: {
		alignItems: "center",
		justifyContent: "center",
		left: "87%",
        marginTop:"2%",
		position: "absolute",
		
	  },
	buttonn: {
	  height: 40,
	  width: 350,
	  alignItems: "center",
	  justifyContent: "center",
	  left: 80,
	  position: "absolute",
	},
	
    avatarContainer: {
        width: "100%",
        height: "10%",
        // borderRadius: 70,
         backgroundColor: '#e0dde9',
        alignItems: 'baseline',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 0.16,
        marginBottom:-10
      },

      list: {
        paddingHorizontal: 5,
        backgroundColor: '#E6E6E6',
      },
      listContainer: {
        alignItems: 'center',
      },
      post: {
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:12,
        backgroundColor: 'white',

        
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      profile: {
        width: 55,
        height: 55,
        borderRadius: 25,

      },

      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      date: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 10,
      },
      funds: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10,
      },

      description: {
        marginBottom: 4,
      },
      actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },
      actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      actionButton1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:5
      },

      actionText: {
        fontSize: 15
        ,
        color: '#3b5998',
      },
      actionCount: {
        fontSize: 15,
        marginLeft: 5,
      },

      searchContainer: {
        width:'85%',
        padding: "2%",
        paddingTop:"2%"

      },
      searchInput: {
        height:50,
        marginTop:"2%",
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        padding: 8,
		borderColor:"#685f93",
        shadowColor: '#cccccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      },

      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        height:"90%",
        width:"90%",
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },


      Modalpost: {
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom:20,
        borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,



      },

      button3: {
        borderRadius: 14,
        padding: 10,
        elevation: 2,
        height:"100%",
        // width:"60%",
      },
      buttonOpen: {
        backgroundColor: '#534c88',
      },
      buttonClose: {
        backgroundColor: '#534c88',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },

      ribbon: {
        position: 'absolute',
        top: -10,
        right: 10,
        backgroundColor: 'transparent',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderLeftWidth: 25,
        borderRightWidth: 25,
        borderStyle: 'solid',
        borderBottomWidth: 50,
        borderColor: 'purple',
      },
      textContainer: {
        position: 'absolute',
        top: 20,
        right: -8,
      },
      ribbonText: {
        color: 'white',
        fontSize: 16,
      },  
      
      attendeesContainer: {
        flexWrap:'wrap',
        flexDirection: 'row',
        paddingHorizontal: 10,
      },
    
      attendeeImage: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginLeft: -10,
        borderWidth:0.5,
        marginTop:3,
      },
      actionFunds: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      photoborder: {
        borderColor: '#808080', 
        borderWidth: 0.5 , 
        width: '100%',
        height: 400,  
        borderRadius: 8,
    },
    image2: {
        width: '100%',
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 8,
      },

      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      root: {
        backgroundColor: '#FFFFFF',
      },
      container: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#FFFFFF',
        alignItems: 'flex-start',
      },
      text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0,
      },
      mainContent: {
        marginRight: 60,
      },
      img: {
        height: 50,
        width: 50,
        margin: 0,
      },
      attachment: {
        position: 'absolute',
        right: 50,
        height: 50,
        width: 50,
      },
      separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
      },
      timeAgo: {
        fontSize: 12,
        color: '#696969',
      },
      name: {
        fontSize: 16,
        color: '#1E90FF',
      },

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      closeButton: {
        position: 'absolute',
        top: 14,
        right: 20,
        zIndex: 1, // Ensure it's above the modal content
      },
    


    
});
  
  export default Funds;
  











