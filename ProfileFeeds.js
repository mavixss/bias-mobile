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
	props,
  Pressable,
  ScrollView,
  RefreshControl,
  handlePresss,
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
  import Profile from "./Profile";
  import {NETWORK_ADD} from '@env';


  
  const ProfileFeeds = () => {
const route = useRoute();
const [modalVisible, setModalVisible] = useState(false);
const [visible, setVisible] = useState(false);

const [capital, setCapital] = useState();
const [addrss, setAddrss] = useState();
const [date, setDate] = useState();

const navigation = useNavigation();
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");

const [newsfeedsData, setnewsfeedsData] = useState([]);


const [buttonStatus, setbuttonStatus] = useState(true);
const [useSearch, setSearch] = useState("");



//for loading screen
const [isLoading, setIsLoading] = useState(true);

//////////////// created

const handleSubmit = async (id) => {
  // const getData = { id:name};
  await AsyncStorage.setItem('bussID', JSON.stringify(id));
}
 
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
  // Axios.get("http://192.168.8.103:19001/getFeedsDisplay")
    Axios.get(`${NETWORK_ADD}:19001/getFeedsDisplay`)
    .then((result) => {setnewsfeedsData(result.data)
    // console.log(result.data[0].buss_user_id);
    }) 
  .catch((error) => console.log(error))
  },[newsfeedsData]);
  



  const[user, setUser] = useState('');
  const[dataID, setData] = useState([]);
  const[dataFeeds, setDataFeeds] = useState([]);

  const msg = "Requested to invest to your business";
  const status = "Cancel";
const notifMsg = dataID + msg;
    // console.log(dataID);

    useEffect(() => {
      // Axios.post("http://192.168.8.103:19001/testID",{
        Axios.post(`${NETWORK_ADD}:19001/testID`,{
        user:user
      })
        // .then((res) => setData(res.data.results[0]))
        .then((res) => setData(res.data.results)
        )

        //  .then((data) => setData(data)
        .catch((error) => console.log(error));

    }, [dataID]);


    useEffect(() => {
        // Axios.post("http://192.168.8.103:19001/ProfileFeeds",{
          Axios.post(`${NETWORK_ADD}:19001/ProfileFeeds`,{
          user:user
        })
          // .then((res) => setData(res.data.results[0]))
          .then((res) => setDataFeeds(res.data.results)
          )
  
          //  .then((data) => setData(data)
          .catch((error) => console.log(error));
  
      }, [dataFeeds]);
  
    
  

  const findUser = async () => {
  const result = await AsyncStorage.getItem('userID');
    console.log(result);
    if(!result){
      navigation.navigate("Login")

    }
  setUser(JSON.parse(result))
  };

  useEffect(() => {
    findUser();
  },[])



  const Notfication = (findBussinessUser, findBussinessID) => {
    // Axios.post("http://192.168.8.103:19001/notif", {
      Axios.post(`${NETWORK_ADD}:19001/notif`, {

      notifMsg: notifMsg,
      user:user,
      createdAt:createdAt,
      findBussinessUser: findBussinessUser,
     findBussinessID: findBussinessID,


    })
      .then((res) =>  
      // {

        Test(),
        ToastAndroid.show("Investment sucessfully requested.",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),
      )
      .catch((error) => console.log(error));
      
  };


  const Status = (findBussinessID) => {
    // Axios.post("http://192.168.8.103:19001/BussStatus", {
      Axios.post(`${NETWORK_ADD}:19001/BussStatus`, {
      status: status,
      bussID:findBussinessID,

    })
      .then((res) =>  
      // {

        Test(),
        ToastAndroid.show("Business succesfully cancelled.",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),
      )
      .catch((error) => console.log(error));
      
  };





  const HandlepopUp =() =>{

    console.log(capital);
    if(visible){
      setVisible(false);
      setCapital("");

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
    const newData = [...dataFeeds, { key: Date.now().toString() }];
    setDataFeeds(newData);
    setRefreshing(false);
  }, 1000);
};

const handleRefresh = () => {
  setRefreshing(true);
  fetchData();
};




  
	return (
	  <SafeAreaView style={{ flex: 1, height: "100%" }}>

{isLoading ? (

<LoadingScreen />
):(

//height for flatlist
    <View style={{maxHeight:"94%"}}>

		<FlatList
		 ListEmptyComponent={
			<View >
				<Text style={styles.emptyListStyle}>
					NO DATA FOUND
				</Text>
			</View>}

      ListHeaderComponent={

        <Profile /> }

		  data={dataFeeds}
		  keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }

		  renderItem={({ item }) => (
			<TouchableOpacity style={styles.post}>

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
              </View>
              
              <Text style={styles.description}> {item.buss_id} {item.buss_details}</Text>
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

            <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen]}
             onPress={() => {Status(item.buss_id)}}

            //  onPress={() => setModalVisible(true)}
          //   onPress={() =>
          //  {
          // //pass data to invest file
          // setCapital(item.buss_capital),
          // HandlepopUp()
          //  }}
           
           >
            <Text style={styles.textStyle}>Cancel</Text>
           </TouchableOpacity>
            </Pressable>

            <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen]}
             onPress={() => navigation.navigate("Investor",{ bussid: [item.buss_id]})} 
                           
            >
                <Text style={styles.textStyle}>View Investors</Text>
           </TouchableOpacity>
            </Pressable>


            </View>



			</TouchableOpacity>
		  )}
		  ref={(ref) => {
			listViewRef = ref;
		  }}/>

</View>
      
  )}


{/* //for pop up in investment */}
{ visible ? <Invest data={[capital]} hidePopup={HandlepopUp}  />: ""}




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
        shadowRadius: 5,
        marginBottom:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:10,
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
        marginBottom: 10,
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
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        height:"100%",
        width:"60%",
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


      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      headerContainer: {
        alignItems: 'center',
      },
      coverPhoto: {
        width: '100%',
        height: 200,
        // backgroundColor: "#534c88",
      },
      profileContainer: {
        alignItems: 'center',
        marginTop: -50,
      },
      profilePhoto: {
        width: 110,
        height: 110,
        borderRadius: 50,
      },
      nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
      },
      bioContainer: {
        padding: 15,
      },
      bioText: {
        fontSize: 16,
      },
      statsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
      },
      statContainer: {
        alignItems: 'center',
        flex: 1,
      },
      statCount: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      statLabel: {
        fontSize: 16,
        color: '#999',
      },
      button: {
        backgroundColor: '#685f93',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 20,
        marginBottom:"3%"
      },
      buttonn: {
        backgroundColor: '#a39cbd',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 20,
        marginBottom:"3%"
      },
      buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
      },
      appButtonDisabled: {
        backgroundColor: "#000"
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
      profile: {
        width: 55,
        height: 55,
        borderRadius: 25,
    
      },
    
    
    
});
  
  export default ProfileFeeds;
  