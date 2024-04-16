

import {
	SafeAreaView,
	StyleSheet,
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
  RefreshControl,
  Modal,
  ScrollView,
  Dimensions } from "react-native";
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useRoute } from '@react-navigation/native';
  import React, { useEffect, useState, useRef } from "react";
  import { useNavigation } from "@react-navigation/native";
  import LoadingScreen from "./LoadingScreen";
  const {width, height} = Dimensions.get('window');
  import {NETWORK_ADDPOCKET} from '@env';

  
const EntrepFeeds = () => {

const navigation = useNavigation();
const route = useRoute();
const [newsfeedsData, setnewsfeedsData] = useState([]);
const [useSearch, setSearch] = useState("");
const [showloader, setShowLoarder] = useState(true);

//for loading screen
const [isLoading, setIsLoading] = useState(true);

//for drag to refresh
const [refreshing, setRefreshing] = useState(false);

// const[dataID, setData] = useState([]);
// const msg = "Requested to invest to your business";
// const notifMsg = dataID + msg;

const[profID,setProfID] = useState([]);




//////////////// created

// const handleSubmit = async (id) => {
//   // const getData = { id:name};
//   await AsyncStorage.setItem('bussID', JSON.stringify(id));
// }
 
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
  }, 5000); // Simulate loading time
}, []);


useEffect(() => {
    Axios.post(`${NETWORK_ADDPOCKET}/EntrepViewFeeds`,{
    user:profID
  })
    // .then((res) => setData(res.data.results[0]))
    .then((res) => setnewsfeedsData(res.data.result)
    )
    //  .then((data) => setData(data)
    .catch((error) => console.log(error));

}, [newsfeedsData]);




  const [results, setResults] = useState([]);


  const handleSearch = async () => {
    try {
      const response = await Axios.get(
        `${NETWORK_ADDPOCKET}/search?useSearch=${useSearch}`

      );
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() =>{
    {isLoading ? (

      <LoadingScreen />
      ):(
      
    handleSearch()
      )}
  })






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


// const [activeIndex, setActiveIndex] = useState(0);
// const scrollViewRef = useRef(null);

// const scrollX = new Animated.Value(0);

// const onScroll = Animated.event(
//   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//   { useNativeDriver: false }
// );

// const handleItemPress = (index) => {
//   if (scrollViewRef.current) {
//     scrollViewRef.current.scrollTo({ x: index * Dimensions.get('window').width });
//   }
// };




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


  const { width, height } = Dimensions.get('window');

  // Calculate button size and text size based on screen dimensions
  // const buttonWidth = width * 0.30;
  // const buttonHeight = height * 0.05;
  // const textSize = Math.min(width, height) * 0.036;

  //computing sum

  const calculateTotalInvest = (investment) => {
    if (Array.isArray(investment)) {
      const investDetails = investment.map((item) => item.invest_amount);
  
      let totalSum = 0;
  
      for (let i = 0; i < investDetails.length; i++) {
        totalSum += parseFloat(investDetails[i]);
      }
  
      return totalSum;
    } else {
      return 0;
    }
  };

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

  <View style={{flexDirection:'row'}}>

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


      data={results.length > 0 ? results : newsfeedsData}
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
      //to view business
      onPress={() => {
          navigation.navigate('BusinessViewEntrep', { id: item.buss_id });
        }}>
              <View style={styles.header}>
                <Image
                  style={styles.avatar}
                  source={item.user_profile ? { uri: item.user_profile } : require("./assets/prrofilee.png")} 
                />
                <View>
            <Text style={styles.name}>{item.user_fname} {item.user_lname}
			</Text>
              <Text style={styles.date}>{item.buss_type} {item.buss_name}</Text>
              <Text style={styles.date}>{formatDate(item.buss_created_at)}</Text>
              <Text style={styles.date}>{item.buss_address}</Text>

              </View>

              <View style={styles.ribbon}>
              <View style={styles.textContainer}>
               <Text style={styles.ribbonText}>5%</Text>
            </View>
           </View>
              </View>

              <Text style={styles.description}>{item.buss_summary} </Text>

              <Image style={{ height: 320, width: '100%' }}  source={{uri: item.buss_photo}} />
              <View style={styles.actions}>
        
        <View style={styles.attendeesContainer}>
           {renderUniqueInvestors(item.investments).map((investment, index) => (
             index < 3 ? (
           <View key={index}>
            <Image
             source={investment.investor_profile ? { uri: investment.investor_profile } : require("./assets/prrofilee.png")}
             style={styles.attendeeImage}
            />
          </View>
           ) : null
       ))}
          {renderUniqueInvestors(item.investments).length > 3 && (
            <View style={styles.plusContainer}>
              <Text style={styles.plusText}>+{renderUniqueInvestors(item.investments).length - 3}</Text>
            </View>
    )}
        </View>

            </View>
           

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Status:</Text>
              <Text style={styles.actionCount}>{item.buss_status}</Text>
            </TouchableOpacity>


            <View style={styles.actionButton}>
              <Text style={styles.actionText}>Capital:</Text>
              <Text style={styles.actionCount}>{handleAbbreviatedValue(item.buss_capital)}</Text>
            </View>
            {isNaN(item.buss_capital - calculateTotalInvest(item.investments)) ? (
              null
              ):(
            <View  style={styles.actionButton}>
            <Text style={styles.actionText}>Remaining:</Text>
              <Text style={styles.actionCount}>
              {handleAbbreviatedValue(
                            parseFloat(
                              item.buss_capital -
                                calculateTotalInvest(item.investments)
                            )
                          )}              
              </Text>
              </View>
              )}

            </View>


			</TouchableOpacity>
		  )}
		  ref={(ref) => {
			listViewRef = ref;
		  }}/>

</View>
      
  )}


  {showloader ? (
        <Modal
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalView1}>
            <ScrollView>
    
    
        <Text style={{ fontSize: 20,  textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>
          Entrepreneur Terms and Conditions
        </Text>           
        
        <Text style={styles.name}>
        Before using BiaS as an entrepreneur, please carefully review the
          following terms and conditions.

         </Text>

         <Text style={styles.name}>
         By accessing or using our platform, you agree to comply with and be
          bound by the terms outlined below.
         </Text>
         <Text style={styles.name}>
         1. Eligibility: 
         </Text>

         <Text style={styles.uboldname}>
         a. To use BiaS as an entrepreneur, you must be a legal entity or an
            individual who is at least 18 years old and capable of forming a
            legally binding contract.{" "}
         </Text>
         <Text style={styles.name}>
         2. Account Registration: 
         </Text>

         <Text style={styles.uboldname}>
         a. Entrepreneurs are required to create an account on BiaS to
              access certain features.{" "}
         </Text>
         <Text style={styles.name}>
         3. Listing a Business:
         </Text>

         <Text style={styles.uboldname}>
         a. By listing your business on [BiaS], you represent and warrant
              that all information provided is accurate, complete, and not
              misleading.{" "}

          </Text>
          <Text style={styles.name}>
         4. Fees and Payments:
         </Text>

          <Text style={styles.uboldname}>
          a. BiaS may charge fees for certain services, and entrepreneurs
              agree to pay all fees associated with the use of these services.{" "}

          </Text>
          <Text style={styles.uboldname}>
          b. Fee details will be provided in the pricing section of [BiaS],
              and entrepreneurs are responsible for reviewing and understanding
              the fee structure.
          </Text>
          <Text style={styles.name}>
          5. Intellectual Property:
         </Text>

          <Text style={styles.uboldname}>
          a. Entrepreneurs retain ownership of the intellectual property
              associated with their business listings.{" "}

            </Text>
            <Text style={styles.uboldname}>
            b. By listing a business on [BiaS], you grant BiaS a
              non-exclusive, worldwide, royalty-free license to use, reproduce,
              modify, and display the content for the purpose of promoting your
              business on the platform.{" "}

            </Text>
            <Text style={styles.name}>
          6. Communication and Marketing:
         </Text>

            <Text style={styles.uboldname}>
            a. By using [BiaS], entrepreneurs consent to receive
                communications, including promotional messages, from [BiaS].{" "}
            </Text>
            <Text style={styles.uboldname}>
            b. Entrepreneurs can opt out of promotional communications at
                any time through the app settings.
              </Text>
              <Text style={styles.name}>
            7. Ratings and Reviews:
         </Text>


              
              <Text style={styles.uboldname}>
              a. Users may provide ratings and reviews of listed businesses.
                BiaS is not responsible for the content of these reviews but
                reserves the right to moderate and remove reviews that violate
                these terms.{" "}

              </Text>
              <Text style={styles.name}>
              8. Termination BiaS may terminate or suspend access to [BiaS] for
              entrepreneurs immediately, without prior notice or liability, for
              any reason whatsoever, including without limitation if you breach
              these terms.{" "}
              </Text>

              <Text style={styles.name}>
              9. Governing Law These terms are governed by and construed in
              accordance with the laws of [Your Jurisdiction], without regard to
              its conflict of law principles. Contact Information If you have
              any questions about these terms and conditions. Please contact us
              at biascapstone@gmail.com. By using BiaS as an
              entrepreneur, you agree to these terms and conditions.

              </Text>


              
              
  

        <TouchableOpacity style={styles.button}  onPress={() =>  setShowLoarder(false)} >
        <Text style={{ color:'#ffffff' }}>Agree </Text> 
      </TouchableOpacity> 

</ScrollView>



    
              
            </View>
          </Modal>
          ) : (
            ""
          )}
    



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

        uboldname: {
          fontSize: 16,
          fontWeight:'normal',
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
          width:'99%',
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
        modalView1: {
          height:"90%",
          width:"95%",
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
  
      
  });  
  
  export default EntrepFeeds;
  