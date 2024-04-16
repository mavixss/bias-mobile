import {
	SafeAreaView,
	StyleSheet,
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
	ToastAndroid,
    Pressable,
    ScrollView,
    RefreshControl,
    Modal,
    Dimensions,
    TextInput
  } from "react-native";
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useRoute } from '@react-navigation/native';
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import LoadingScreen from "./LoadingScreen";
  import {NETWORK_ADDPOCKET} from '@env';
  import ProfileView from "./ProfileView";
  import { Feather } from '@expo/vector-icons';
  import { AirbnbRating } from 'react-native-ratings';
  
const ProfileViewInvestors = () => {

const route = useRoute();
const [modalVisible, setModalVisible] = useState(false);
const [visible, setVisible] = useState(false);
const [capital, setCapital] = useState();
const navigation = useNavigation();
const [bussID, setbussID] = useState();
const [newsfeedsData, setnewsfeedsData] = useState([]);
const[user, setUser] = useState('');
const[dataID, setData] = useState([]);
const[dataFeeds, setDataFeeds] = useState([]);
const [receiverID, setreceiverID] = useState();

const [investments, setInvestment] = useState([]);
const [todayDate, setTodayDate] = useState("");
const [withdrawResult, setwithdrawResult] = useState([]);
const [amountWithdraw, setAmountWithdraw] = useState(0);
const [withdrawInvstID, setwithdrawInvstID] = useState("");
const [show, setShow] = useState(false);
const [invstId, setInvstId] = useState("");
const [EntrepId, setEntrepId] = useState("");
const [EntrepName, setEntrepName] = useState("");
const [EntrepProfile, setEntrepProfile] = useState("");
const [feedbackContent, setFeedbackContent] = useState("");

const [showFeedback, setShowFeedback] = useState(false);
// const [rating, setRating] = useState(0);
const [rating, setRating] = useState(0);

const [emailPaypal, setEmailPaypal] = useState("");

const handleRating = (ratedValue) => {
  setRating(ratedValue);
  console.log(ratedValue)
  // You can perform other actions with the rating value here if needed
};



//for drag to refresh
const [refreshing, setRefreshing] = useState(false);

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



  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false when data is loaded
  }, 5000); // Simulate a 2-second loading time


      useEffect(() => {
        Axios.post(`${NETWORK_ADDPOCKET}/investmentView`,{
          user_id: user,
          })
          .then((res) => {
            if (res.data.status) {
              // console.log(res.data.result);
              setInvestment(res.data.result);
              setTodayDate(res.data.todayDate);
              setwithdrawResult(res.data.withdrawResutl);
            } else {
              return (
                <div>
                  <h1>No Data</h1>
                </div>
              );
            }
          })
          .catch((error) => console.log(error));
      }, [user]);
    
    
// console.log(todayDate);
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



        const calculateReaminingMonths = (todaydate, startDate, endDate) => {
          const monthsFromStart =
            todaydate.getMonth() -
            startDate.getMonth() +
            12 * (todaydate.getFullYear() - startDate.getFullYear());
      
          // Calculate the difference in months between the start date and end date
          const totalMonths =
            endDate.getMonth() -
            startDate.getMonth() +
            12 * (endDate.getFullYear() - startDate.getFullYear());
      
          // Calculate the remaining months
          const totaRemains = totalMonths - monthsFromStart;
      
          if (totaRemains < 0) {
            return 0;
          } else {
            return totaRemains;
          }
        };
      
      

        const handleRequestWithdraw = () => {

          if (!emailPaypal || isNaN(emailPaypal)) {
            ToastAndroid.show("Please enter a valid amount",
            ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            return; // Stop further execution if the amount is empty or not a number
          }

          Axios.post(`${NETWORK_ADDPOCKET}/requestWithdraw`,{
              amountWithdraw:amountWithdraw,
              emailPaypal:emailPaypal,
              withdrawInvstID:withdrawInvstID,
              createdAt:createdAt
            })
            .then((res) => {
              if (res.data.status) {

                ToastAndroid.show("Your request has been successfully sent",
                ToastAndroid.SHORT,ToastAndroid.BOTTOM)
                navigation.navigate("Home")
      
              } else {
                console.log("error")
                console.log(res.data.message);
              }
            })
            .catch((error) => {
              console.log(error.message);
            });
        };
      


        const handleFeedbackShow = (profile, name, id, invstId) => {
          setEntrepProfile(profile);
          setEntrepName(name);
          setEntrepId(id);
          setInvstId(invstId);
          setShowFeedback(true);
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


  const checkUserHasWithdrawRequest = (invst_id) => {
    if (withdrawResult.length > 0) {
      const status = withdrawResult.filter(
        (item) => item.withdraw_invst_id === invst_id
      );

      if (status.length > 0) {
        if (
          status[0].withdraw_status === "request" ||
          status[0].withdraw_status === "send" ||
          status[0].withdraw_status === "receive" ||
          status[0].withdraw_status === "cancel"
        ) {
          return { value: true, status: status[0].withdraw_status };
        } else {
          return { value: false };
        }
      } else {
        return { value: false };
      }
    } else {
      return { value: false };
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

  const { width, height } = Dimensions.get('window');

  // Calculate button size and text size based on screen dimensions
  const buttonWidth = width * 0.30;
  const buttonHeight = height * 0.05;
  const textSize = Math.min(width, height) * 0.036;




useEffect(() => {
  // Fetch your initial data here
  fetchData();
}, []);

const fetchData = () => {
  // Simulate fetching data
  setTimeout(() => {
    const newData = [...investments, { key: Date.now().toString() }];
    setDataFeeds(newData);
    setRefreshing(false);
  }, 1000);
};

const handleRefresh = () => {
  setRefreshing(true);
  fetchData();
};


const computeDateStart = (startDate, todayDate, endDate) => {
  if (startDate === todayDate) {
    return "Started Today";
  } else if (startDate < todayDate) {
    if (todayDate >= endDate) {
      return "Investment is ready to be claimed";
    } else {
      return "Investment has started";
    }
  } else if (startDate > todayDate) {
    return `Investment will start on ${new Date(startDate).toLocaleDateString()}`;
  } else {
    return "Nothing";
  }
};
  

const handleSubmitFeedback = () => {
  Axios.post(`${NETWORK_ADDPOCKET}/submitfeedback`,{
    feedbackContent:feedbackContent,
      rating:rating,
      EntrepId:EntrepId,
      invstId:invstId,
    })
    .then((res) => {
      if (res.data.status) {
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

	return (
        <SafeAreaView style={{ flex: 1, height: "100%", marginTop:"5%" }}>
      
      {isLoading ? (
      
      <LoadingScreen />
      ):(
      
      //height for flatlist
        <View style={{maxHeight:"94%"}}>

        {investments ? (

        <FlatList
               ListEmptyComponent={
                  <View >
                      <Text style={styles.emptyListStyle}>
                          NO INVESTMENTS FOUND
                      </Text>
                  </View>}
      
                  ListHeaderComponent={
            <ProfileView data={[user]}/>
        }

          data={investments}
        keyExtractor={(item, index) => index.toString()}
            //for drag to refresh
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
                renderItem={({ item }) => (
                  <View style={styles.post}
            //to view business
            onPress={() => {
                navigation.navigate('BusinessView', { id: item.buss_id });
              }}>
                    <View style={styles.header}>
                    <TouchableOpacity
                    //to view profile
                    onPress={() => {
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
      
                    <Text style={styles.description}>{item.buss_summary} </Text>
                    <Text style={styles.description}>{item.invst_id} </Text>

                    <Image style={{ height: 320, width: '100%' }}  source={{uri: item.buss_photo}} />

                    <View style={styles.actions}>
                    {new Date(todayDate) >=
                      new Date(item.invst_start_date) &&
                      new Date(todayDate) <= new Date(item.invst_end_date) ? (
                    <View style={styles.actionButton}>
                      <Text style={styles.actionText}>Months Remain:</Text>
                      <Text style={styles.actionCount}>
                      {calculateReaminingMonths(
                                        new Date(todayDate),
                                        new Date(item.invst_start_date),
                                        new Date(item.invst_end_date)
                                      )}

                      </Text>
                    </View>
                    ) : (
                      ""
                      )}

                    </View>



             <View style={styles.actions}>
             {item.invst_status === "complete" ? (
              ""
             ):item.invst_status === "cancel" ? (
              <Text style={styles.actionText}>Investment is cancelled</Text>
             ):(
              <>
              <View style={styles.actionButton}>
               <Text style={styles.actionText}>Start Date:</Text>
               <Text style={styles.actionCount}>
               {item.invst_start_date
                              ? new Date(
                                  item.invst_start_date
                                ).toLocaleDateString()
                              : "Waiting"}
               </Text>
             </View>

             <View style={styles.actionButton}>
               <Text style={styles.actionText}>Maturity Date:</Text>
               <Text style={styles.actionCount}>
               {item.invst_end_date ? (
                              <>
                                {new Date(
                                  item.invst_end_date
                                ).toLocaleDateString()}{" "}
                              </>
                            ) : (
                              "Waiting"
                            )}
               </Text>
             </View>

              </>
             )}

             

             </View>

                 
      
             <View style={styles.actions}>
      
             {/* {isNaN(item.buss_capital - calculateTotalInvest(item.investments)) ? (
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
             )} */}
      
      
             <View  style={styles.actionButton}>
               <Text style={styles.actionText}>Capital:</Text>
               <Text style={styles.actionCount}>{handleAbbreviatedValue(item.buss_capital)}</Text>
             </View>

             <View  style={styles.actionButton}>
               <Text style={styles.actionText}>Amount Invested:</Text>
               <Text style={styles.actionCount}>{handleAbbreviatedValue(item.invst_amt)}</Text>
             </View>

             </View>


             <View style={styles.actions}>

             <View  style={styles.actionButton}>
             <Text style={styles.actionText}>Commencement:</Text>

             {item.invst_status === "complete" ? (
              <Text style={styles.actionCount}>Claimed</Text>
             ):(
              <Text style={styles.actionCount}>
              {item.invst_start_date ? (
                                <>
                                  {computeDateStart(
                                    new Date(item.invst_start_date),
                                    new Date(todayDate),
                                    new Date(item.invst_end_date)
                                  )}
                                </>
                              ) : (
                                "In Progress"
                              )}
              </Text>
              )}
             </View>


             </View>





             <View style={styles.actions}>

            
            {item.invst_status === "request" ? (
              <Pressable onPress={() => {}} style={styles.actionButton}>
            
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
            //  onPress={() => setModalVisible(true)}
            onPress={() =>
                {
                navigation.navigate('InvestmentUpdate', {  buss_id:item.buss_id, user_id: item.user_id, amount:item.invst_amt, invst_id: item.invst_id, items: item, });//pass data to update
                }}>
            <Text style={[styles.textStyle, { fontSize: textSize }]}>Update</Text>
           </TouchableOpacity>
            </Pressable>

              ) : (
                ""
              )}

              {item.invst_status === "complete" ? (
                <Text style={styles.actionText}>Investment Completed</Text>
              ):(
                <>
                            {checkUserHasWithdrawRequest(item.invst_id)
                              .value ? (
                              <>
                              {/* <Text>    
                              {checkUserHasWithdrawRequest(item.invst_id).value.toString()}</Text> */}
                          
                                {new Date(todayDate) >=
                                  new Date(item.invst_end_date) &&
                                item.invst_status === "started" &&
                                checkUserHasWithdrawRequest(item.invst_id)
                                  .status === "send" ? (

                              <Pressable onPress={() => {}} style={styles.actionButton}>
                            
                            <TouchableOpacity
                            style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
                            onPress={() =>
                            {
                              handleFeedbackShow(
                                        item.user_profile,
                                        `${item.user_fname} ${item.user_mname} ${item.user_lname}`,
                                        item.user_id,
                                        item.invst_id
                              )}}>
                            <Text style={[styles.textStyle, { fontSize: textSize }]}>Receive</Text>
                          </TouchableOpacity>
                            </Pressable>
                                  
                                ) : new Date(todayDate) >=
                                    new Date(item.invst_end_date) &&
                                  item.invst_status === "started" &&
                                  checkUserHasWithdrawRequest(item.invst_id)
                                    .status === "receive'" ? (
                                  ""
                                ) : new Date(todayDate) >=
                                      new Date(item.invst_end_date) &&
                                    item.invst_status === "started" &&
                                    checkUserHasWithdrawRequest(item.invst_id)
                                      .status === "cancel" ? (
                                        <>
                                        <Text style={[styles.textStyle, { fontSize: textSize }]}>Request cancelled</Text>
                                        <Pressable onPress={() => {}} style={styles.actionButton}>
                                <TouchableOpacity
                                style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
                                onPress={() => {
                                  setAmountWithdraw(parseFloat(item.invst_returned_amt));
                                  setwithdrawInvstID(item.invst_id);
                                  setShow(true);
                                  }}>
                                    <Text style={[styles.textStyle, { fontSize: textSize }]}>Withdraw</Text>
                              </TouchableOpacity>
                                </Pressable>

                                        </>
                                        ):(
                                     <Text style={[styles.textStyle1, { fontSize: textSize }]}>Request was cancelled</Text>

                                        ) }
                              </>
                            ) : (
                              <>
                                {new Date(todayDate) >=
                                  new Date(item.invst_end_date) &&
                                item.invst_status === "started" ? (

                                <Pressable onPress={() => {}} style={styles.actionButton}>
                                <TouchableOpacity
                                style={[styles.button3, styles.buttonOpen,{ width: buttonWidth, height: buttonHeight }]}
                                onPress={() => {
                                  setAmountWithdraw(parseFloat(item.invst_returned_amt));
                                  setwithdrawInvstID(item.invst_id);
                                  setShow(true);
                                  }}>
                                    <Text style={[styles.textStyle, { fontSize: textSize }]}>Withdraw</Text>
                              </TouchableOpacity>
                                </Pressable>

                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </>
               
              )}





            </View>


                  </View>
                )}
                ref={(ref) => {
                  listViewRef = ref;
                }}/>
              ):""}

      </View>
            
        )}



        {show ? (
    <Modal
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView1}>
          <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setShow(false)}
    >
      <Feather name="x-circle" size={24} color="black" />
    </TouchableOpacity>


       <Text style={styles.label}>Withdrawal Submission </Text>
      <View style={styles.codeContainer}>

      <TextInput
        style={styles.input1}
        placeholder="Enter Email"
        onChangeText={(text) => setEmailPaypal(text)}
        value={emailPaypal}

      />

    </View>

        <View style={styles.codeContainer}>
      <TextInput
        style={styles.input1}
        value={amountWithdraw.toString()}
        editable={false} 

      />

    </View>

      <TouchableOpacity style={styles.buttonCode} onPress={() => handleRequestWithdraw()}>
        <Text style={{ color: '#ffffff' }}>Withdraw</Text>
      </TouchableOpacity>


          </View>
        </View>
      </Modal>
      ) : (
        ""
      )}


      {showFeedback ? (
    <Modal
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
          <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setShowFeedback(false)}
    >
      <Feather name="x-circle" size={24} color="black" />
    </TouchableOpacity>


       <Text style={styles.label}>Feedback </Text>
       <Image
        style={styles.profilePhoto}
  			source={EntrepProfile ? { uri: EntrepProfile } : require("./assets/prrofilee.png")} 
        />
       <Text style={styles.label}>{EntrepName} </Text>


       <AirbnbRating
        count={5} // Number of stars to display
        // reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']} // Optional array of review texts
        defaultRating={rating} // Initial rating
        size={20} // Size of the stars
        onFinishRating={handleRating} // Callback when user finishes rating
      />

      <View style={styles.codeContainer}>
      <TextInput
        style={styles.input1}
        placeholder="Feedback"
        onChangeText={(text) => setFeedbackContent(text)}
        value={feedbackContent}
        multiline={true}
        numberOfLines={4}
      />
      </View>


        <TouchableOpacity style={styles.buttonCode} onPress={() => handleSubmitFeedback()}>
        <Text style={{ color: '#ffffff' }}>Feedback</Text>
      </TouchableOpacity>


          </View>
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
        marginBottom: 3,
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
        height:"70%",
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
        elevation: 1,
      },

      modalView1: {
        height:"36%",
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
        elevation: 1,
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

      textStyle1: {
        color: 'black',
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
      closeButtonText: {
        fontSize: 24,
        color: 'black',
      },
    
      inputPass: {
        // flex: 1,
        height: 45,
        width:"70%",
      },

      // modalView: {
      //   margin: 20,
      //   backgroundColor: 'white',
      //   borderRadius: 20,
      //   padding: 35,
      //   alignItems: 'center',
      //   shadowColor: '#000',
      //   shadowOffset: {
      //     width: 0,
      //     height: 2,
      //   },
      //   shadowOpacity: 0.25,
      //   shadowRadius: 4,
      //   elevation: 5,
      // },
    
      codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
        backgroundColor: "white",
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 1,
    
      },

      closeButton: {
        position: 'absolute',
        top: 14,
        right: 20,
        zIndex: 1, // Ensure it's above the modal content
      },
      closeButtonText: {
        fontSize: 24,
        color: 'black',
      },

      label: {
        fontSize: 18,
        marginBottom: 10,
      },
      input1: {
        // flex: 1,
        height: 45,
        width:"75%",
      },
      buttonCode: {
        width: 200,
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "#534c88",
      },

      
    
    
    
    
    
    
    
    
});
  
  export default ProfileViewInvestors;
  