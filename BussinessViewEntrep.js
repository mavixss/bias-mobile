import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
  Pressable,
  Dimensions,
  ScrollView
  } from "react-native";
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useRoute } from '@react-navigation/native';
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import LoadingScreen from "./LoadingScreen";
  import {NETWORK_ADDPOCKET} from '@env';



  
const BussinessViewEntrep = () => {

const route = useRoute();
const id = route.params.id; //from feeds
const [visible, setVisible] = useState(false);
const [capital, setCapital] = useState();
const [receiverID, setreceiverID] = useState();
const [bussID, setbussID] = useState();
const navigation = useNavigation();
const [newsfeedsData, setnewsfeedsData] = useState([]);


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



  // Simulate an API call or data loading process
  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false when data is loaded
  }, 5000); // Simulate a 2-second loading time



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
  





  // Get the screen dimensions
  const { width, height } = Dimensions.get('window');

  // Calculate button size and text size based on screen dimensions
  const buttonWidth = width * 0.34;
  const buttonHeight = height * 0.05;
  const textSize = Math.min(width, height) * 0.036;


  useEffect(() => {
      Axios.post(`${NETWORK_ADDPOCKET}/ViewBussinessEntrep`,{
        bussID:id
    })
      // .then((res) => setData(res.data.results[0]))
      .then((res) => setnewsfeedsData(res.data.result)
      )
  
      //  .then((data) => setData(data)
      .catch((error) => console.log(error));
  
  }, [newsfeedsData]);

//for duplication
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
	  <SafeAreaView style={{ flex: 1, height: "100%", marginTop:"2%" }}>

{isLoading ? (

<LoadingScreen />
):(
  <ScrollView>

  <View style={{maxHeight:"86%"}}>
  {newsfeedsData.map((item, index) => (

			<View  key={index} style={styles.post}>

              <View style={styles.header}>
                <Image
                  style={styles.avatar}
                  source={item.user_profile ? { uri: item.user_profile } : require("./assets/prrofilee.png")}
                />
                <View>
            <Text style={styles.name}>{item.user_fname} {item.user_lname}
			{/* {item.name} */}
			</Text>
              <Text style={styles.date}>{formatDate(item.buss_created_at)}</Text>
              <Text style={styles.date}>{item.buss_name}</Text>

              <Text style={styles.date}>{item.buss_address}</Text>

              </View>

              <View style={styles.ribbon}>
              <View style={styles.textContainer}>
               <Text style={styles.ribbonText}>5%</Text>
            </View>
           </View>

              </View>
              <Text style={styles.description}>{item.buss_summary}</Text>

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

            <View style={styles.header}>
           <View>
              <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Overview</Text>

              <Text style={styles.name}>Business Name: {item.buss_name} </Text>
              <Text style={styles.date}>Type: {item.buss_type}</Text>
              <Text style={styles.date}>Address: {item.buss_address}</Text>


              <Text style={styles.date}>Business Experience: {item.buss_prev_name ? item.buss_prev_name: 'None'}</Text>
              <Text style={styles.date}>Business Target Audience: {item.buss_target_audience}</Text>
              <Text style={styles.date}>List of Funds</Text>

              {JSON.parse(item.buss_useof_funds).map((funds, index) => (
                <View style={styles.actionFunds} key={index}>
                <Text style={styles.date}>Product {index+1}</Text>
              <Text style={styles.date}>{funds.product}</Text>
              <Text style={styles.date}>{funds.amount}</Text>

              </View>
              ))}

              <Text style={styles.date}>Funds Total: {item.buss_capital} </Text>
           </View>
          </View>
            
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Status:</Text>
              <Text style={styles.actionCount}>{item.buss_status}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Capital:</Text>
              <Text style={styles.actionCount}>{item.buss_capital}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.actions}>
            
            {isNaN(item.buss_capital - calculateTotalInvest(item.investments)) ? (
            null
            ):(
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Remains:</Text>
              <Text style={styles.actionCount}>
              {handleAbbreviatedValue(
                            parseFloat(
                              item.buss_capital -
                                calculateTotalInvest(item.investments)
                            )
                          )}              
              </Text>
              </TouchableOpacity>
              )}
            </View>


                {/* timeline */}
            {/* <View style={styles.actions}>
            <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
             onPress={() => {
          navigation.navigate('Timeline', { id: item.buss_id });//pass data to timeline
        }}
            >
                <Text style={[styles.textStyle, { fontSize: textSize }]}>View Timeline</Text>
           </TouchableOpacity>
            </Pressable>

            </View> */}


            <View style={styles.actions}>



            {/* <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
             onPress={() => {
          navigation.navigate('InvestorsReturn', {id: item.buss_id  });//pass data to timeline
        }}
            >
                <Text style={[styles.textStyle, { fontSize: textSize }]}>Return</Text>
           </TouchableOpacity>
            </Pressable> */}

            {item.buss_status === "start" ? (
  <>
  <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
             onPress={() => {
          navigation.navigate('InvestorsReturn', {id: item.buss_id  });//pass data to timeline
        }}
            >
                <Text style={[styles.textStyle, { fontSize: textSize }]}>Return</Text>
           </TouchableOpacity>
            </Pressable>

  </>
):(item.buss_status === "complete" ? (
  <Text style={styles.actionText}>Business succesfully completed!</Text>
):(  <Text style={styles.actionText}>Waiting for approval</Text>
)
  
)}


{/* <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
             onPress={() => {
          navigation.navigate('Funds', {id: item.buss_id  });//pass data to timeline
        }}
            >
                <Text style={[styles.textStyle, { fontSize: textSize }]}>Funds</Text>
           </TouchableOpacity>
            </Pressable> */}



            {/* <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
             onPress={() => {
          navigation.navigate('InvestorsReturn', {id: item.buss_id  });//pass data to timeline
        }}
            >
                <Text style={[styles.textStyle, { fontSize: textSize }]}>Return</Text>
           </TouchableOpacity>
            </Pressable> */}



            


            </View>




			</View>

      ))}


</View>
      </ScrollView>

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
        marginTop: 5,
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
        backgroundColor: "#534c88",
      },
      buttonClose: {
        backgroundColor: "#534c88",
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


    
});
  
  export default BussinessViewEntrep;
  