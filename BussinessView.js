import {
	SafeAreaView,
	StyleSheet,
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
	Button,
	Alert,
	Avatar,
	TextInput,
	handleSearchTextChange,
	searchText,
	ToastAndroid,
  RefreshControl,
	props,
  Pressable,
  Dimensions
  } from "react-native";
  import { AntDesign, Ionicons   } from '@expo/vector-icons';
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useRoute } from '@react-navigation/native';
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { StatusBar } from "expo-status-bar";
  import Upload from "./Upload";
  import { Modal } from "react-native-paper";
  import Invest from "./Invest";
  import LoadingScreen from "./LoadingScreen";

  
const BusinessView = () => {

const route = useRoute();
const id = route.params.id; //from feeds
const [modalVisible, setModalVisible] = useState(false);
const [visible, setVisible] = useState(false);
const [capital, setCapital] = useState();
const [receiverID, setreceiverID] = useState();
const [bussID, setbussID] = useState();
const [addrss, setAddrss] = useState();
const [date, setDate] = useState();
const navigation = useNavigation();
const [newsfeedsData, setnewsfeedsData] = useState([]);
const [viewBusiness, setViewBusiness] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);
const [useSearch, setSearch] = useState("");


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


useEffect(() => {
  Axios.get("http://192.168.8.103:19001/ViewBussiness")
    // Axios.get(`${process.env.REACT_APP_NETWORK_ADD}:19001/getFeedsDisplay`)
    .then((result) => {setnewsfeedsData(result.data)
    // console.log(result.data[0].buss_user_id);
    }) 
  .catch((error) => console.log(error))
  },[newsfeedsData]);


  



  const[user, setUser] = useState('');
  const[dataID, setData] = useState([]);
  const msg = "Requested to invest to your business";
  const notifMsg = dataID + msg;

  useEffect(() => {
  async function fecthUser(){
    const id = await AsyncStorage.getItem('userID');
    // console.log(id);
    setUser(id)

    Axios.post("http://192.168.8.103:19001/getIdFinal",{
        user:id
      })
        // .then((res) => setData(res.data.results[0]))
        .then((res) => {setData(res.data.results[0].user_fname)
        console.log(res.data.results[0].user_fname)}
        )

        //  .then((data) => setData(data)
        .catch((error) => console.log(error));
    if(!id){
      navigation.navigate("Login")

    }
   }

   fecthUser();
  },[])



  const Notfication = (findBussinessUser, findBussinessID) => {
    
    Axios.post("http://192.168.8.103:19001/notif", {
      notifMsg: notifMsg,
      user:user,
      createdAt:createdAt,
      findBussinessUser: findBussinessUser,
     findBussinessID: findBussinessID,


    })
      .then((res) =>  
        Test(),
        ToastAndroid.show("Investment sucessfully requested.",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),
      )
      .catch((error) => console.log(error));
      
  };


  const HandlepopUp =() =>{

    console.log(capital);
    console.log(receiverID);
    console.log(bussID);
    if(visible){
      setVisible(false);
      setCapital("");
      setreceiverID("");
      setbussID("")

    }
    else{
      setVisible(true);

    }
  }





//for drag to refresh
const [refreshing, setRefreshing] = useState(false);


useEffect(() => {
  // Fetch your initial data here
  fetchData();
}, []);

const fetchData = () => {
  // Simulate fetching data
  setTimeout(() => {
    const newData = [...newsfeedsData, { key: Date.now().toString() }];
    setnewsfeedsData(newData);
    setRefreshing(false);
  }, 1000);
};

const handleRefresh = () => {
  setRefreshing(true);
  fetchData();
};


  // Get the screen dimensions
  const { width, height } = Dimensions.get('window');

  // Calculate button size and text size based on screen dimensions
  const buttonWidth = width * 0.34;
  const buttonHeight = height * 0.05;
  const textSize = Math.min(width, height) * 0.036;



  useEffect(() => {
    Axios.post("http://192.168.8.103:19001/ViewBussiness",{
      bussID:id
    })
      // .then((res) => setData(res.data.results[0]))
      .then((res) => setViewBusiness(res.data.results)
      )
  
      //  .then((data) => setData(data)
      .catch((error) => console.log(error));
  
  }, [viewBusiness]);










	return (
	  <SafeAreaView style={{ flex: 1, height: "100%", marginTop:"5%" }}>

{isLoading ? (

<LoadingScreen />
):(

  <View style={{maxHeight:"86%"}}>
  {viewBusiness.map((item, index) => (

			<View  key={index} style={styles.post}>

              <View style={styles.header}>
                <Image
                  style={styles.avatar}
                  source={require("./assets/profilee.png")}
                />
                <View>
            <Text style={styles.name}> {item.user_id} {item.user_fname} {item.user_lname}
			{/* {item.name} */}
			</Text>
              <Text style={styles.date}>{formatDate(item.buss_created_at)}</Text>
              <Text style={styles.date}>{item.buss_address}</Text>

              </View>

              <View style={styles.ribbon}>
              <View style={styles.textContainer}>
               <Text style={styles.ribbonText}>5%</Text>
            </View>
           </View>

              </View>


              <Text style={styles.description}> Business Name: {item.buss_name} {item.buss_type_name}</Text>
              <Text style={styles.description}> {item.buss_summary}</Text>
              <Text style={styles.description}> {item.buss_target_audience	}</Text>

              <Image style={{ height: 320, width: '100%' }}  source={{uri: item.buss_photo}} />
            
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Business Status:</Text>
              <Text style={styles.actionCount}>{item.buss_status}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Capital:</Text>
              <Text style={styles.actionCount}>{item.buss_capital}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Amount Invested:</Text>
              <Text style={styles.actionCount}>{item.totalAmountInvts}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Remains:</Text>
              {/* {item.totalAmountInvts ? (   <Text style={styles.actionCount}>{(item.buss_capital)-(item.totalAmountInvts)}</Text>) : ""} */}
              <Text style={styles.actionCount}>{(item.buss_capital)-(item.totalAmountInvts)}</Text>            
              </TouchableOpacity>
            </View>

            <View style={styles.actions}>
            <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
            //  onPress={() => setModalVisible(true)}
            onPress={() =>
        {
          //pass data to invest file
          setCapital(item.buss_capital),
          setbussID(item.buss_id),
          setreceiverID(item.user_id),
          HandlepopUp(),
          setModalVisible(true)
        }
			  }
        >
            <Text style={[styles.textStyle, { fontSize: textSize }]}>Navigate Invest</Text>
           </TouchableOpacity>
            </Pressable>

            <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
             onPress={() => {Notfication(item.user_id, item.buss_id)}}
            >
                <Text style={[styles.textStyle, { fontSize: textSize }]}>Notification Test</Text>
           </TouchableOpacity>
            </Pressable>


            </View>



			</View>

      ))}



</View>
      
  )}


{/* //for pop up in investment */}
{ visible ? <Invest data={[capital, receiverID, bussID]} hidePopup={HandlepopUp}  />: ""}




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
        fontSize: 14,
        color: 'gray',
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
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
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

    
});
  
  export default BusinessView;
  