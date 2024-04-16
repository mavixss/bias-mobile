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
	TextInput,
	ToastAndroid,
  RefreshControl,
  Dimensions,
  Modal
  } from "react-native";
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useRoute } from '@react-navigation/native';
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import LoadingScreen from "./LoadingScreen";
  import {NETWORK_ADDPOCKET} from '@env';
  import { Feather } from '@expo/vector-icons';
import { ScrollView } from "react-native";

import { Checkbox } from 'react-native-paper';

  
const InvestorsFeeds = () => {
const route = useRoute();
// console.log(NETWORK_ADDPOCKET)
const [visible, setVisible] = useState(false);
const [capital, setCapital] = useState();
const [receiverID, setreceiverID] = useState();
const [bussID, setbussID] = useState();
const navigation = useNavigation();
const [newsfeedsData, setnewsfeedsData] = useState([]);
const [useSearch, setSearch] = useState("");
const [results, setResults] = useState([]);
const [showloader, setShowLoarder] = useState(true);

const[checked,setchecked] = useState(false)
const [btnVerifyStatus, setBtnVerifyStatus] = useState(true);


const[user, setUser] = useState('');
const[dataID, setData] = useState([]);
const msg = "has made an investment to your business";
const notifMsg = dataID + msg;


const [investorRecomededBusinessList, setinvestorRecomededBusinessList] =
useState([]);
const [sortedBusinessCategory, setsortedBusinessCategory] = useState([]);

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
  Axios.post(`${NETWORK_ADDPOCKET}/BussInvestorList`,{
    user_id:user
})
  .then((res) => {
    if (res.data.success) 
    {
      const initialResult = res.data.filterData;
      const userHasLikes = res.data.hasLikes;
      const withInvestors = res.data.withInvestors;
      const resultData = res.data.result;
      setnewsfeedsData(res.data.result)

      const newBusiness = initialResult.filter((item) => {
        if (item.isNew) {
          return item;
        }
      });

      const allResults = resultData.filter((item) => {
          return item;
      });

      const notNew = initialResult.filter((item) => {
        if (!item.isNew) {
          return item;
        }
      });
          //using spread to join to arrays
      const data = [...newBusiness, ...notNew];
          //Set Business that is based on the likes of investor

          setinvestorRecomededBusinessList(data);
          //Set Business that is based on the likes of investor
          // setNewBusinessList(newBusiness);
          const matchingBusiness = data.filter((item) =>{
            return item;
          }
          );

          setsortedBusinessCategory(initialResult);

      }


      else 
      {
        console.log(res.data.error);
      }
    
  })
  .catch((error) => console.log(error));

}, [investorRecomededBusinessList]);


useEffect(() => {
  // Simulate an API call or data loading process
  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false when data is loaded
  }, 2000); // Simulate a 2-second loading time
}, []);


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
      
    handleSearch()
  })



  useEffect(() => {
  async function fecthUser(){
    const id = await AsyncStorage.getItem('userID');
    setUser(id)
      Axios.post(`${NETWORK_ADDPOCKET}/getIdFinal`,{
        user:id
      })
        .then((res) => {setData(res.data.results[0].user_fname)
        console.log(res.data.results[0].user_fname)
      }
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
  

  const toggleChecked =() =>{
   if(checked === true){
    console.log("true")


    setchecked(!checked);
    ToastAndroid.show(
      "Please agree to terms and conditions",
      ToastAndroid.SHORT,ToastAndroid.BOTTOM)
      
      // setShowLoarder(true)

    
   }
   else if(checked === false){
    console.log("false")
    // setShowLoarder(false)

    setchecked(!checked);

   }

     

  }

  const toggleAgree =() =>{

    if(checked === true){
      // console.log("true")
  
      console.log("clicked")
      setShowLoarder(false)

      setBtnVerifyStatus(false);

     }
     else if(checked === false){
  
      ToastAndroid.show(
        "Please agree to terms and conditions",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        setShowLoarder(true)
        setBtnVerifyStatus(true);


     }
  
      
 
   }
 
 


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



//for drag to refresh
const [refreshing, setRefreshing] = useState(false);


useEffect(() => {
  // Fetch your initial data here
  fetchData();
}, []);

const fetchData = () => {
  // Simulate fetching data
  setTimeout(() => {
    const newData = [...investorRecomededBusinessList, { key: Date.now().toString() }];
    setinvestorRecomededBusinessList(newData);
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

  const [expandedMap, setExpandedMap] = useState({});

  const toggleText = (itemId) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [itemId]: !prevExpandedMap[itemId],
    }));
  };
  
  const renderSummary = (text, itemId) => {
    const maxLength = 100; // Set the maximum length for summary display
  
    if (text.length <= maxLength || expandedMap[itemId]) {
      return text; // Display the full text if it's shorter than maxLength or if expanded
    }
  
    return `${text.slice(0, maxLength)}...`; // Show truncated text with "See more"
  };
  
  return (
	  <SafeAreaView style={{ flex: 1, height: "100%", marginTop:"5%" }}>



  <View style={{flexDirection:'row'}}>

      <View style={styles.searchContainer}>
      <TextInput
          style={styles.searchInput}
          onChangeText={text => setSearch(text)}
          placeholder="Search Business.."
          value={useSearch}
          onSubmitEditing={handleSearch}

        />
      </View>


</View>


{isLoading ? (

<LoadingScreen />
):(

//height for flatlist
  <View style={{maxHeight:"84%"}}>
  <FlatList
		 ListEmptyComponent={
			<View >
				<Text style={styles.emptyListStyle}>
					NO DATA FOUND
				</Text>
			</View>}


    data={results.length > 0 ? results : investorRecomededBusinessList}
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
          navigation.navigate('Business', { id: item.buss_id });
        }}

      >

              <View style={styles.header}>
              <TouchableOpacity
              //to view profile
              onPress={() => {
                  // navigation.navigate('ProfileView', { id: item.user_id });
                  navigation.navigate('ProfileViewFeeds', { id: item.user_id });
                }}
              >
                <Image
                  style={styles.avatar}
                  source={item.user_profile ? { uri: item.user_profile } : require("./assets/prrofilee.png")} 
                />
                </TouchableOpacity>
                <View>
            <Text style={styles.name}>{item.user_fname} {item.user_lname}
          </Text>
              <Text style={styles.date}>{item.buss_type} {item.buss_name}</Text>
              <Text style={styles.date}>{formatDate(item.buss_created_at)}</Text>
              <Text style={styles.date}>{item.buss_address}</Text>

              </View>

              <View style={styles.ribbon}>
              <View style={styles.textContainer}>
               <Text style={styles.ribbonText}>3%</Text>
            </View>
           </View>
              </View>

              <Text style={styles.description}>{item.buss_id} {item.buss_summary} </Text>

            <View style={{ position: 'relative' }}>
                <Image style={{ height: 320, width: '100%' }} source={{ uri: item.buss_photo }} />
                {item.isNew ? (
                <View style={styles.iconContainer}>
                  <Image source={require("./assets/new.png")} style={styles.icon} />
                </View>
                ) : ("")}
              </View>


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

       {isNaN(item.buss_capital - calculateTotalInvest(item.investments)) ? (
         <Text>No Investors Yet</Text>
         ):(
           <View onPress={() => {}} style={styles.actionButton}>
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


       <View onPress={() => {}} style={styles.actionButton}>
         <Text style={styles.actionText}>Capital:</Text>
         <Text style={styles.actionCount}>{handleAbbreviatedValue(item.buss_capital)}</Text>
       </View>
       </View>

			</TouchableOpacity>
		  )}
		  ref={(ref) => {
			listViewRef = ref;
		  }}/>



{showloader ? (
        <Modal
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalView1}>
            <ScrollView>
    
    
        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>
        Investor Terms and Conditions
        </Text>           
        
        <Text style={styles.name}>
        Please carefully read the following terms and conditions before
          becoming an investor in BiaS. By investing in BiaS, you agree to be
          bound by the terms outlined below.
         </Text>

         <Text style={styles.name}>
         1. Investment Eligibility:         
         </Text>
         <Text style={styles.name}>
         a. Only individuals who meet the eligibility criteria as specified
            in the relevant offering documents and applicable laws may invest in
            BiaS.         </Text>
         <Text style={styles.name}>
         b. BiaS reserves the right to reject any investment at its sole
            discretion.{" "}         </Text>
         <Text style={styles.name}>
         2. Investment Process:

          </Text>
          <Text style={styles.name}>
          a. Investors must follow the investment process as outlined on
              BiaS and in the offering documents.
          </Text>
          <Text style={styles.name}>
          b. Investments may be subject to minimum and maximum limits as
              specified in the offering documents.          </Text>
          <Text style={styles.name}>
          3. Risk Acknowledgment Investing in BiaS involves risks, including
              but not limited to the risk of loss of the entire investment.
              Investors acknowledge that they have carefully considered the
              risks associated with the investment and are investing at their
              own risk.
            </Text>
            <Text style={styles.name}>
            4. Information Accuracy:            </Text>
            <Text style={styles.name}>
            a. Investors are responsible for providing accurate and complete
              information during the investment process.            </Text>
            <Text style={styles.name}>
            b. BiaS is not responsible for any losses or damages incurred due
              to inaccurate or incomplete information provided by the investor.              </Text>
              <Text style={styles.name}>
              5. Transferability of Investments made through BiaS may not be
              transferred, sold, or assigned without the express written consent
              of BiaS.
              </Text>
              <Text style={styles.name}>
              6. Dividends and Returns              </Text>

              <Text style={styles.name}>
              a. Dividends or returns on investments, if any, will be
              distributed in accordance with the terms specified in the offering
              documents.
              </Text>

              <Text style={styles.name}>
              b. BiaS reserves the right to modify the dividend or return
              distribution policies at its discretion.              </Text>

              <Text style={styles.name}>
              7. Confidentiality Investors agree to keep confidential all
              non-public information received from BiaS regarding the investment
              and the business operations.{" "}              </Text>
              <Text style={styles.name}>
              8. Exit and Liquidity Investors acknowledge that there may not be
              a readily available market for the sale of their investment and
              that liquidity events are subject to business conditions and
              market factors.{" "}            </Text>

              <Text style={styles.name}>
              biascapstone@gmail.com. By becoming an investor on BiaS,
              you agree to these terms and conditions.           </Text>
              <View style={styles.checkboxContainer}>
            
            <Checkbox.Item
          label="Agree to terms and condition"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => toggleChecked()}
          
          style={styles.checkbox}
        />

</View>

        {/* <TouchableOpacity style={styles.button}  onPress={() =>  setShowLoarder(false)} > */}
        

        <TouchableOpacity style={styles.button}   onPress={() =>  toggleAgree()} >

        <Text style={{ color:'#ffffff' }}>Agree </Text> 
      </TouchableOpacity> 


</ScrollView>



    
              
            </View>
          </Modal>
          ) : (
            ""
          )}
    

</View>
      
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

  label: {
    fontSize: 14,
   
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

      iconContainer: {
        position: 'absolute',
        bottom: 5, // Adjust as needed for vertical position
        left: 4, // Adjust as needed for horizontal position
      },
      
      // Style for the icon
      icon: {
        width: 70, // Adjust icon size as needed
        height: 70, // Adjust icon size as needed
        resizeMode: 'contain',
      },

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
      checkbox: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
      },
    
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
    
});
  
  export default InvestorsFeeds;
  

