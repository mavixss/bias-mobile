import {
	SafeAreaView,
	StyleSheet,
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
	Button,
    Pressable,
	Alert,
	Avatar,
	TextInput,
	handleSearchTextChange,
	searchText,
	ToastAndroid,
	props,
  } from "react-native";
  import { AntDesign, Ionicons, FontAwesome  } from '@expo/vector-icons';
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  
  import { StatusBar } from "expo-status-bar";
  import Upload from "./Upload";
  import { format } from 'date-fns';
  import SocialIcon from 'react-native-vector-icons/AntDesign';


export const logoutIcon = (<AntDesign name="logout" size={40} color="black" />);
export const editIcon = (<FontAwesome name="edit" size={40} color="black" />);
export const questionIcon = (<SocialIcon name="questioncircleo" size={40} color="black" />);



  
  const Request = () => {


const navigation = useNavigation();

const [notifData, setNotifData] = useState([]);


const [buttonStatus, setbuttonStatus] = useState(true);

const [useSearch, setSearch] = useState("");


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

  const[user, setUser] = useState('');
  const[dataID, setData] = useState([]);


  useEffect(() => {
	Axios.post("http://192.168.8.103:19001/getNotifDisplay",{
	  user:user
	})
	  // .then((res) => setData(res.data.results[0]))
	  .then((res) => setData(res.data)
	  )

	  //  .then((data) => setData(data)
	  .catch((error) => console.log(error));

  }, [dataID]);

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
  

useEffect(() => {
Axios.get("http://192.168.8.103:19001/getNotifDisplay")
.then((result) => setNotifData(result.data)) 
.catch((error) => console.log(error))
},[notifData]);


const sendNotification = () => {
	Axios.post('http://192.168.8.103:19001/sendNotification', {
	  // Include data needed to identify the recipient and the notification message
	})
	.then((response) => {
	  console.log('Notification sent successfully');
	})
	.catch((error) => {
	  console.error('Error sending notification: ' + error);
	});
  };


  const statusDecline = "Declined";
  const statusAccepted = "Accepted";


  const StatusDecline = (userID) => {
    Axios.post("http://192.168.8.103:19001/InvsmntStatusDecline", {
      statusDecline: statusDecline,
      userID:userID,

    })
      .then((res) =>  
      // {
        ToastAndroid.show("Declined.",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),
      )
      .catch((error) => console.log(error));
      
  };

  const StatusAccepted = (userID) => {
    Axios.post("http://192.168.8.103:19001/InvsmntStatusAccepted", {
      statusAccepted: statusAccepted,
      userID:userID,

    })
      .then((res) =>  
      // {
        ToastAndroid.show("Accepted!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),
      )
      .catch((error) => console.log(error));
      
  };




  
	return (
	  <SafeAreaView style={{ flex: 1, height: "100%" }}>

<View style={{maxHeight:"92%"}}>

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


		   data={dataID}
		  keyExtractor={(item, index) => index.toString()}
		  renderItem={({ item }) => (

			<TouchableOpacity  style={styles.container}>
		    <Image  
		  style={styles.image}
		//   rounded source={item.photo}
		 rounded source={require("./assets/prrofilee.png")}>
		  </Image> 


		  <View style={styles.content}>
		  <View style={styles.contentHeader}>
            <Text style={styles.name}>{item.user_fname.toUpperCase()}{item.user_lname.toUpperCase()}</Text>
            <Text style={styles.time}> {formatDate(item.notif_created_at)}</Text>
		  </View>
		  <Text rkType="primary3 mediumLine">{item.notif_content}</Text>

          <View style={styles.actions}>

          <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen]}
             onPress={() => {StatusAccepted(item.user_id)}}
            >
                <Text style={styles.textStyle}>Accept</Text>
           </TouchableOpacity>
            </Pressable>

            <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen]}
             onPress={() => {StatusDecline(item.user_id)}}
            >
                <Text style={styles.textStyle}>Decline</Text>
           </TouchableOpacity>
            </Pressable>


            </View>
		  </View>
		
		  
		</TouchableOpacity>


		  )}
		  ref={(ref) => {
			listViewRef = ref;
		  }}/>

</View>
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
      actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
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

      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },



	});
	  
  export default Request;
  



