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
  } from "react-native";
  import { AntDesign, Ionicons, FontAwesome  } from '@expo/vector-icons';
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import SocialIcon from 'react-native-vector-icons/AntDesign';
  import {NETWORK_ADDPOCKET} from '@env';
  import LoadingScreen from "./LoadingScreen";


export const logoutIcon = (<AntDesign name="logout" size={40} color="black" />);
export const editIcon = (<FontAwesome name="edit" size={40} color="black" />);
export const questionIcon = (<SocialIcon name="questioncircleo" size={40} color="black" />);



  
  const Notif = () => {

const navigation = useNavigation();
const [isLoading, setIsLoading] = useState(true);
const [userid,setUserid] = useState([]);
const[notifid, setnotifid] = useState([]);
const [notifList, setNotifList] = useState([]);
const[user, setUser] = useState('');
const[userTypee, setUserType] = useState();
const[dataID, setData] = useState([]);
//for drag to refresh
const [refreshing, setRefreshing] = useState(false);




const formatDate = (date) => {
    const formattedDate = new Date(date);
	const hours = formattedDate.getHours();
    const minutes = formattedDate.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    return `${formattedDate.getMonth() + 1}-${formattedDate.getDate()}-${formattedDate.getFullYear()} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
    // Customize the format as needed
  };

  const fetchDataUser = async () => {
	try {
	  const userId = await AsyncStorage.getItem('userID');
	  const userType = await AsyncStorage.getItem('userType');
  
	  if (!userId || !userType) {
		navigation.navigate("Login");
		return;
	  }
  
	  setUser(JSON.parse(userId));
	  setUserType(JSON.parse(userType));
	} catch (error) {
	  // Handle AsyncStorage errors
	  console.error("AsyncStorage error:", error);
	}
  };
  
  useEffect(() => {
	fetchDataUser();
	// NotifStatusRead();
  }, []);
  




	useEffect(() => {
		// Fetch your initial data here
		fetchData();
	  }, []);
	  
	  const fetchData = () => {
		// Simulate fetching data
		setTimeout(() => {
		  const newData = [...notifList, { key: Date.now().toString() }];
		  setData(newData);
		  setRefreshing(false);
		}, 1000);
	  };
	  
	  const handleRefresh = () => {
		setRefreshing(true);
		fetchData();
	  };
	  

	
			setTimeout(() => {
			  setIsLoading(false); // Set isLoading to false when data is loaded
			}, 5000); // Simulate a 2-second loading time
		
		

		
		const NotifStatusRead = (notifID) => {
		Axios.post(`${NETWORK_ADDPOCKET}/NotifStatusRead`,{
		notifID:notifID,
		})
      .then((res) =>  
      // {
        ToastAndroid.show("Readed!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),
      )
      .catch((error) => console.log(error));
      
  };


  useEffect(() => {
	if (userTypee === "entrepreneur") {
	  Axios.post(`${NETWORK_ADDPOCKET}/getNotification`, {
		user_id: user,
		notif_type: "business",
	  })
		.then((res) => {
		  if (res.data.status) {
			const dataResponse = res.data.result;
			const sortedData = dataResponse.sort(
			  (a, b) =>
				new Date(b.notif_created_at) - new Date(a.notif_created_at)
			);
  
			setNotifList(sortedData);
		  }
		})
		.catch((error) => {
		  alert(error);
		});
	} else if (userTypee === "investor") {
	  Axios.post(`${NETWORK_ADDPOCKET}/getNotification`, {
		user_id: user,
		notif_type: "investment",
	  })
		.then((res) => {
		  if (res.data.status) {
			const dataResponse = res.data.result;
			const sortedData = dataResponse.sort(
			  (a, b) =>
				new Date(b.notif_created_at) - new Date(a.notif_created_at)
			);
  
			setNotifList(sortedData);
		  }
		})
		.catch((error) => {
		  alert(error);
		});
	}
  }, [user, userTypee]);
  


  
	return (
	  <SafeAreaView style={{ flex: 1, height: "100%" }}>
  {isLoading ? (

<LoadingScreen />
):(
  <View>
		{userTypee === 'entrepreneur' ? (

		<View style={{maxHeight:"96%"}}>


			<FlatList
			ListEmptyComponent={
				<View >
					<Text style={styles.emptyListStyle}>
						NO DATA FOUND
					</Text>
				</View>}
			ItemSeparatorComponent={() => {
			return <View style={styles.separator} />
			}}


			data={notifList}
			keyExtractor={(item, index) => index.toString()}
			//for drag to refresh
			refreshControl={
			<RefreshControl
			refreshing={refreshing}
			onRefresh={handleRefresh}
			/>
			}
			renderItem={({ item }) => (				
			<TouchableOpacity  
				style={[styles.container,item.notif_status === 'unread' ? { backgroundColor: 'lightblue' } : null,]}
				onPress={() => {
				setUserid(item.user_id_reciever),
				setnotifid(item.notif_id),

				// navigation.navigate("InvestorsInfo", { user_id: [item.user_id_reciever], notif_id: [item.notif_id], buss_id: [item.user_buss_id],invst_id: [item.invst_id] }),
				NotifStatusRead(item.notif_id)
				}}
				>

				 {item.notif_type === "buss_update" ? (
					<>
					<Image  
				style={styles.image}
				source={item.buss_photo ? { uri: item.buss_photo } : require("./assets/prrofilee.png")}

				/>

			<View style={styles.content}>
			<View style={styles.contentHeader}>
				<Text style={styles.name}>{item.buss_name}</Text> 
				<Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
			</View>
				<Text rkType="primary3 mediumLine">{item.notif_content}</Text>
			</View>

					</>
				): item.notif_type === "investment" ? (
			 	<>
				 <Image  
				style={styles.image}
				source={item.buss_photo ? { uri: item.buss_photo } : require("./assets/prrofilee.png")}
				/>

			<View style={styles.content}>
			<View style={styles.contentHeader}>
				<Text style={styles.name}>{item.buss_name}</Text> 
				<Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
			</View>
				<Text rkType="primary3 mediumLine">{item.notif_content}</Text>
			</View>

				</>
				): item.notif_type === "buss_invest" ? (
				 	<>
					 <Image  
				style={styles.image}
				source={item.investorProfile ? { uri: item.investorProfile } : require("./assets/prrofilee.png")}
				/>

			<View style={styles.content}>
			<View style={styles.contentHeader}>
				<Text style={styles.name}>{item.firstname} {item.lastname}</Text> 
				<Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
			</View>
				<Text rkType="primary3 mediumLine">{item.notif_content}</Text>
			</View>

					</>
				 ): item.notif_type === "user" ? (
					<>
					<Image  
				style={styles.image}
				source={item.investorProfile ? { uri: item.investorProfile } : require("./assets/prrofilee.png")}
				/>

			<View style={styles.content}>
			<View style={styles.contentHeader}>
				<Text style={styles.name}>{item.firstname} {item.lastname}</Text> 
				<Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
			</View>
				<Text rkType="primary3 mediumLine">{item.notif_content}</Text>
			</View>

					</>
				): ""}



			
			</TouchableOpacity>


			)}
			ref={(ref) => {
				listViewRef = ref;
			}}/>

		</View>
		): userTypee === 'investor' ? (
			<View style={{maxHeight:"96%"}}>
			
			<FlatList
			ListEmptyComponent={
				<View >
					<Text style={styles.emptyListStyle}>
						NO DATA FOUND
					</Text>
				</View>}
			ItemSeparatorComponent={() => {
			return <View style={styles.separator} />
			}}


			data={notifList}
			keyExtractor={(item, index) => index.toString()}
			//for drag to refresh
			refreshControl={
			<RefreshControl
			refreshing={refreshing}
			onRefresh={handleRefresh}
			/>
			}
			renderItem={({ item }) => (
				
				
				
				<TouchableOpacity  
				style={[styles.container,item.notif_status === 'unread' ? { backgroundColor: 'lightblue' } : null,]}
				onPress={() => {
				setUserid(item.user_id_reciever),
			setnotifid(item.notif_id),

			// navigation.navigate("InvestorsInfo", { user_id: [item.user_id_reciever], notif_id: [item.notif_id], buss_id: [item.user_buss_id],invst_id: [item.invst_id] }),
			NotifStatusRead(item.notif_id)

			

				}}
				>
				 {item.notif_type === "buss_update" ? (
					<>
					<Image  
				style={styles.image}
				source={item.buss_photo ? { uri: item.buss_photo } : require("./assets/prrofilee.png")}
				/>

			<View style={styles.content}>
			<View style={styles.contentHeader}>
				<Text style={styles.name}>{item.buss_name}</Text> 
				<Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
			</View>
				<Text rkType="primary3 mediumLine">{item.notif_content}</Text>
			</View>

					</>
				): item.notif_type === "investment" ? (
			 	<>
				 <Image  
				style={styles.image}
				source={item.buss_photo ? { uri: item.buss_photo } : require("./assets/prrofilee.png")}
				/>

			<View style={styles.content}>
			<View style={styles.contentHeader}>
				<Text style={styles.name}>{item.buss_name}</Text> 
				<Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
			</View>
				<Text rkType="primary3 mediumLine">{item.notif_content}</Text>
			</View>

				</>
				): item.notif_type === "buss_invest" ? (
				 	<>
					 <Image  
				style={styles.image}
				source={item.investorProfile ? { uri: item.investorProfile } : require("./assets/prrofilee.png")}
				/>

			<View style={styles.content}>
			<View style={styles.contentHeader}>
				<Text style={styles.name}>{item.firstname} {item.lastname}</Text> 
				<Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
			</View>
				<Text rkType="primary3 mediumLine">{item.notif_content}</Text>
			</View>

					</>
				 ): item.notif_type === "user" ? (
					<>
					<Image  
				style={styles.image}
				source={item.investorProfile ? { uri: item.investorProfile } : require("./assets/prrofilee.png")}
				/>

			<View style={styles.content}>
			<View style={styles.contentHeader}>
				<Text style={styles.name}>{item.firstname} {item.lastname}</Text> 
				<Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
			</View>
				<Text rkType="primary3 mediumLine">{item.notif_content}</Text>
			</View>

					</>
				): ""}

			
			</TouchableOpacity>


			)}
			ref={(ref) => {
				listViewRef = ref;
			}}/>


		</View>

		): null}

		</View>
		)}
	  </SafeAreaView>
	);
  };
  
  const styles = StyleSheet.create({
	root: {
		backgroundColor: '#ffffff',
		marginTop: 10,
	  },
	  container: {
		paddingLeft: 19,
		paddingRight: 16,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'flex-start',
	  },
	  content: {
		marginLeft: 16,
		flex: 1,
	  },
	  contentHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 6,
	  },
	  separator: {
		height: 1,
		backgroundColor: '#CCCCCC',
	  },
	  image: {
		width: 45,
		height: 45,
		borderRadius: 22,
		marginLeft: 2,
	  },
	  time: {
		fontSize: 11,
		color: '#808080',
	  },
	  name: {
		fontSize: 16,
		fontWeight: 'bold',
	  },
	});
	  
  export default Notif;
  



