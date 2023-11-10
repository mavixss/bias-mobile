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
  import { CommonActions } from '@react-navigation/native';
  import {NETWORK_ADD} from '@env';


  
const Timeline = () => {
const route = useRoute();
const BussinessID = route.params.id; //from BusinessView

const [modalVisible, setModalVisible] = useState(false);
const [visible, setVisible] = useState(false);
const [capital, setCapital] = useState();
const [receiverID, setreceiverID] = useState();
const [bussID, setbussID] = useState();
const [addrss, setAddrss] = useState();
const [date, setDate] = useState();
const navigation = useNavigation();
const [newsfeedsData, setnewsfeedsData] = useState([]);
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
  // Axios.post("http://192.168.8.103:19001/ViewBussiness",{
    Axios.post(`${NETWORK_ADD}:19001/ViewBussiness`,{
      bussID:BussinessID
  })
    // .then((res) => setData(res.data.results[0]))
    .then((res) => setnewsfeedsData(res.data.result)
    )

    //  .then((data) => setData(data)
    .catch((error) => console.log(error));

}, [newsfeedsData]);



useEffect(() => {
  // Simulate an API call or data loading process
  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false when data is loaded
  }, 2000); // Simulate a 2-second loading time
}, []);



  const [results, setResults] = useState([]);


  const handleSearch = async () => {
    try {
      const response = await Axios.get(
        // `http://192.168.8.103:19001/search?useSearch=${useSearch}`
        `${NETWORK_ADD}:19001/search?useSearch=${useSearch}`

      );
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const[user, setUser] = useState('');
  const[dataID, setData] = useState([]);
  const msg = "Requested to invest to your business";
  const notifMsg = dataID + msg;

  useEffect(() => {
  async function fecthUser(){
    const id = await AsyncStorage.getItem('userID');
    // console.log(id);
    setUser(id)

    // Axios.post("http://192.168.8.103:19001/getIdFinal",{
      Axios.post(`${NETWORK_ADD}:19001/getIdFinal`,{

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
    
    // Axios.post("http://192.168.8.103:19001/notif", {
      Axios.post(`${NETWORK_ADD}:19001/notif`, {

      notifMsg: notifMsg,
      user:user,
      createdAt:createdAt,
      findBussinessUser: findBussinessUser,
     findBussinessID: findBussinessID,


    })
      .then((res) =>  
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


  const renderUniqueInvestors = (investments = []) => {
    const uniqueInvestors = new Map();
    const uniqueInvestorProfiles = [];

    investments.forEach((investment) => {
      if (!uniqueInvestors.has(investment.investor_id)) {
        uniqueInvestors.set(investment.investor_id, true);
        uniqueInvestorProfiles.push(investment);
      }
    });

    return uniqueInvestorProfiles;
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%", marginTop:"5%" }}>

{isLoading ? (

<LoadingScreen />
):(

//height for flatlist
<View style={{maxHeight:"99%"}} >

<FlatList
contentContainerStyle={{paddingHorizontal:16}}
ListEmptyComponent={
  <View >
      <Text style={styles.emptyListStyle}>
          NO DATA FOUND
      </Text>
  </View>}

  ListHeaderComponent={
<>
    {newsfeedsData.map((item, index) => (

    <View key={index} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{item.buss_name}</Text>
        <Text style={styles.headerSubtitle}>{formatDate(item.buss_created_at)}</Text>
      </View>

      <View style={styles.body}>
        <Image 
        source={item.user_profile ? { uri: item.user_profile } : require("./assets/prrofilee.png")} 
        style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user_fname} {item.user_lname}</Text>
          <Text style={styles.userRole}>Professor</Text>
        </View>
      </View>
    </View>
))}
</>
  }

data={newsfeedsData}
keyExtractor={(item, index) => index.toString()}
//for drag to refresh
refreshControl={
<RefreshControl
refreshing={refreshing}
onRefresh={handleRefresh}
/>
}
renderItem={({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{formatDate(item.buss_created_at)}</Text>
          {/* <Text style={styles.endTime}>{item.buss_updated_at}</Text> */}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.buss_name}</Text>
          <Text style={styles.cardDate}>{item.buss_created_at}</Text>
          <FlatList
            contentContainerStyle={styles.studentListContainer}
            data={item.investments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: investor }) => (
              <Image 
              source={investor.investor_profile ? { uri: investor.investor_profile } : require("./assets/prrofilee.png")}
              style={styles.studentAvatar} />
            )}
            horizontal
          />
        </View>
      </View>
    </View>
)}
ref={(ref) => {
  listViewRef = ref;
}}/>

</View>
)}
    </SafeAreaView>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop: 60,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      marginLeft:16
    },
    card: {
      flex:1,
      backgroundColor: '#e3e3fd',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      marginBottom: 16,
      padding: 16,
    },
    header: {
      marginBottom: 8,
    },
    headerTitle: {
      color:'#010203',
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerSubtitle: {
      fontSize: 12,
      color:'#010203',
    },
    body: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 8,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#010203',
    },
    userRole: {
      fontSize: 12,
      color:'#010203',
    },
    classItem: {
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    timelineContainer: {
      width: 30,
      alignItems: 'center',
    },
    timelineDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#ff7f50',
      marginBottom: 8,
    },
    timelineLine: {
      flex: 1,
      width: 2,
      backgroundColor: '#ff7f50',
    },
    classContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8,
    },
    classHours: {
      marginRight: 8,
      alignItems: 'flex-end',
    },
    startTime: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    endTime: {
      fontSize: 16,
    },
    cardTitle: {
      fontSize: 16,
      color: '#00008B',
      marginBottom: 4,
    },
    cardDate: {
      fontSize: 12,
      color: '#00008B',
      marginBottom: 8,
    },
    studentListContainer:{
      marginRight:10,
    },
    studentAvatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginLeft: -3,
      borderWidth:1,
      borderColor:'#fff'
    },
  });
    
  export default Timeline;
  