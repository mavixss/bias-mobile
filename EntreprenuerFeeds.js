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
  ScrollView,
  Dimensions,
  Animated, 
  Easing   } from "react-native";
  import { AntDesign, Ionicons   } from '@expo/vector-icons';
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";

  import { useRoute } from '@react-navigation/native';

  import React, { useEffect, useState, useRef } from "react";
  import { useNavigation } from "@react-navigation/native";
  
  import { StatusBar } from "expo-status-bar";
  import Upload from "./Upload";
import { Modal } from "react-native-paper";
import Invest from "./Invest";
import LoadingScreen from "./LoadingScreen";
const {width, height} = Dimensions.get('window');

  
  const EntreprenuerFeeds = () => {
    const route = useRoute();

const [modalVisible, setModalVisible] = useState(false);

const [visible, setVisible] = useState(false);

const [capital, setCapital] = useState();
const [receiverID, setreceiverID] = useState();
const [bussID, setbussID] = useState();

const [addrss, setAddrss] = useState();
const [date, setDate] = useState();

const navigation = useNavigation();
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");

const [imagedataURL, setimagedataURL] = useState([]);
const [newsfeedsData, setnewsfeedsData] = useState([]);


const [buttonStatus, setbuttonStatus] = useState(true);
const [useSearch, setSearch] = useState("");


// const [findBussinessUser, setfindBussinessUser] = useState(0);
// const [findBussinessID, setfindBussinessID] = useState(0);


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
Axios.get("http://192.168.8.103:19001/getBusiness")
.then((result) => setimagedataURL(result.data)) 
.catch((error) => console.log(error))
},[imagedataURL]);

useEffect(() => {
  Axios.get("http://192.168.8.103:19001/getFeedsDisplay")
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
    // console.log(dataID);


  useEffect(() => {
  async function fecthUser(){
    const id = await AsyncStorage.getItem('userID');
    // console.log(id);
    setUser(id)

    Axios.post("http://192.168.8.103:19001/testID",{
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
      // {

        Test(),
        ToastAndroid.show("Investment sucessfully requested.",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),
      )
      .catch((error) => console.log(error));
      
  };


  // const HandlepopUp =(capital) =>{

  //   console.log(capital);
  //   if(visible){
  //     setVisible(false);
  //     setCapital("");

  //   }
  //   else{
  //     setVisible(true);
  //     setCapital(capital);

  //   }
  // }









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


  const Test = () => {
    Axios.post("http://192.168.8.103:19001/testbussID", {
      // Axios.post(`${process.env.REACT_APP_NETWORK_ADD}:19001/testLogin`, {
      //  user: user,
    })
    
    .then((res) =>  
    {
      // console.log(findBussinessUser),

      //  console.log(res.data.results[0].buss_address)

      if(res.data.success)
      {
        handleSubmit(res.data.results[0].buss_id)
        // ToastAndroid.show("Welcome user!",
        // ToastAndroid.SHORT,ToastAndroid.BOTTOM),
        // navigation.navigate("Home")
        // // navigation.navigate("Profile")
  
  
      }
    })
    .catch((error) => console.log(error));
    
};



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


const [activeIndex, setActiveIndex] = useState(0);
const scrollViewRef = useRef(null);

const scrollX = new Animated.Value(0);

const onScroll = Animated.event(
  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
  { useNativeDriver: false }
);

const handleItemPress = (index) => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ x: index * Dimensions.get('window').width });
  }
};

useEffect(() => {
  const autoSwipeInterval = setInterval(() => {
    const nextIndex = (activeIndex + 1) % newsfeedsData.length;
    handleItemPress(nextIndex);
    setActiveIndex(nextIndex);
  }, 3000); // Change the interval duration as needed

  return () => {
    clearInterval(autoSwipeInterval);
  };
}, [activeIndex]);


const[profileDisplay, setProfileDisplay] = useState([]);
const[profID,setProfID] = useState([]);


useEffect(() => {
  Axios.post("http://192.168.8.103:19001/testID",{
    user:profID
  })
    // .then((res) => setData(res.data.results[0]))
    .then((res) => setProfileDisplay(res.data.results)
    )

    //  .then((data) => setData(data)
    .catch((error) => console.log(error));

}, [profileDisplay]);


const findUser = async () => {
  const result = await AsyncStorage.getItem('userID');
    console.log(result);
    if(!result){
      navigation.navigate("Login")

    }
    setProfID(JSON.parse(result))
  };

  useEffect(() => {
    findUser();
  },[])


	return (
	  <SafeAreaView style={{ flex: 1, height: "100%", marginTop:"5%" }}>

        {/* <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.button}  
       onPress={() => navigation.navigate('Upload')}
        >
        <Text style={{ color:'#ffffff' }}>Pitch Business</Text> 
      </TouchableOpacity> 
      
        </View> */}


  <View style={{flexDirection:'row'}}>

  <TouchableOpacity style={{marginTop:"3%"}}
        onPress={() => navigation.navigate('Profile')}
        >
      <Image
          style={styles.profile}
          source={require("./assets/profilee.png")}              
          />
    </TouchableOpacity>

      <View style={styles.searchContainer}>
      <TextInput
          style={styles.searchInput}
          onChangeText={text => setSearch(text)}
          placeholder="Search post.."
          value={useSearch}
        />
      </View>

</View>


{isLoading ? (

<LoadingScreen />
):(

//height for flatlist
  <View style={{maxHeight:"86%"}}>

		<FlatList
		 ListEmptyComponent={
			<View >
				<Text style={styles.emptyListStyle}>
					NO DATA FOUND
				</Text>
			</View>}

      ListHeaderComponent={
  <View style={styles.topContainer}>

        {/* <TouchableOpacity style={styles.button}  
       onPress={() => navigation.navigate('UploadBusiness')}
        >
        <Text style={{ color:'#ffffff' }}>Pitch Business</Text> 
      </TouchableOpacity>  */}

      {profileDisplay.map((item, index) => (
      <TouchableOpacity key={index} style={styles.pitch}>

      <View style={styles.headerpitch}>
      <Image
       style={styles.avatar}
       source={require("./assets/profilee.png")}
      />
    <View style={{marginRight:"14%"}}>
      <Text style={styles.name}> {item.user_fname}{item.user_lname}</Text>
      
    </View>
    <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
            onPress={() => navigation.navigate('UploadBusiness')}
             style={[styles.button3, styles.buttonOpen]}>
                <Text style={styles.textStyle}>Pitch</Text>
           </TouchableOpacity>
            </Pressable>

    </View>

      </TouchableOpacity>
      ))}







      <View style={styles.carouselContainer}>
    <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const index = Math.round(xOffset / Dimensions.get('window').width);
          setActiveIndex(index);
        }}
        {...onScroll}
      >
       {newsfeedsData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={{uri: item.buss_photo}} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.buss_name}</Text>
              <Text style={styles.content}>{item.user_fname} {item.user_lname}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  </View>


      
        </View> 

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
			<TouchableOpacity style={styles.post}
            
				// 	onPress={() =>
				// navigation.navigate("SampleFeeds", {
				//   capitalData: item.buss_capital,
				// })
			  // }	
			  
			  >

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








			</TouchableOpacity>
		  )}
		  ref={(ref) => {
			listViewRef = ref;
		  }}/>

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
        marginTop:-80,

        
      },

      pitch: {
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom:15,
        borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:12,
        backgroundColor: 'white',
        marginTop: 5,

        
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
      headerpitch: {
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
        paddingTop:"2%",
        
        // marginBottom:"-100%"


      },

      topContainer: {
        width:'100%',
        padding: "2%",
        paddingTop:"2%",
        
        // marginBottom:"-100%"


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
        borderRadius: 8,
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



      ///carousell

      cardContainer: {
        marginHorizontal:10,
        width: "20%",
        height: "32%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 6,
        borderBottomColor: '#ccc',
      },
      cardNumber: {
        fontSize: 18,
        letterSpacing: 4,
        marginBottom: 10,
      },
      cardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cardInfoItem: {
        flex: 1,
      },
      cardInfoLabel: {
        fontSize: 12,
        color: 'gray',
      },
      cardInfoValue: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      // carouselContainer: {
      //   // marginVertical: 40,
      //   // alignItems: 'center',
      //   //  marginBottom:"-100%"
        

      // },
      logo: {
        width: "100%",
        height: "40%",
      },
    

      //

      carouselContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height:400,
        backgroundColor: 'white',

      },
      itemContainer: {
        marginTop:"-3%",
        // marginBottom:"-20%",
        width: width - 80,
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 31,
          },
      image: {
        width: '100%',
        height: '60%',
        resizeMode: 'cover',
        borderRadius: 10,
      },
      textContainer: {
        width: '90%',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 10,
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
      },
      content: {
        fontSize: 14,
        textAlign: 'center',
      },
      dotContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        // bottom: -3,
      },
      dot: {
        width: 7,
        height: 7,
        borderRadius: 10,
        margin: 5,
        borderWidth:1
      },
    
});
  
  export default EntreprenuerFeeds;
  