// import {
// 	SafeAreaView,
// 	StyleSheet,
// 	View,
// 	FlatList,
// 	Text,
// 	TouchableOpacity,
// 	Image,
// 	Button,
// 	Alert,
// 	Avatar,
// 	TextInput,
// 	handleSearchTextChange,
// 	searchText,
// 	ToastAndroid,
// 	props,
//   } from "react-native";
//   import { AntDesign, Ionicons, FontAwesome  } from '@expo/vector-icons';
//   import Axios from 'axios';

//   import React, { useEffect, useState } from "react";
//   import { useNavigation } from "@react-navigation/native";
  
//   import { StatusBar } from "expo-status-bar";
//   import Upload from "./Upload";

//   import SocialIcon from 'react-native-vector-icons/AntDesign';


// export const logoutIcon = (<AntDesign name="logout" size={40} color="black" />);
// export const editIcon = (<FontAwesome name="edit" size={40} color="black" />);
// export const questionIcon = (<SocialIcon name="questioncircleo" size={40} color="black" />);



  
//   const Settings = () => {


// const navigation = useNavigation();
// const [image, setImage] = useState(null);
// const [imageFilename, setImageFilename] = useState("");
// const [imageURL, setimageURL] = useState("");

// const [imagedataURL, setimagedataURL] = useState([]);


// const [buttonStatus, setbuttonStatus] = useState(true);

// const [useSearch, setSearch] = useState("");




// useEffect(() => {
// Axios.get("http://192.168.8.103:19001/getData")
// .then((result) => setimagedataURL(result.data)) 
// .catch((error) => console.log(error))
// },[]);

// const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     setbuttonStatus(true);
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [5, 5],
//       quality: 1,
//     });

//     // console.log(result);

//     if (!result.canceled) {
//         setbuttonStatus(false);
//       setImage(result.assets[0].uri);
//       setImageFilename(result.assets[0].uri.split("/").pop());
//     //   console.log(image);
//     }

// };


// const imagesUpload = async () => {

//     const storagee = storage;
//     const imageRef = ref(storagee, "images/" + imageFilename);
//     const img = await fetch(image);
//     const blob = await img.blob();

//     uploadBytes(imageRef, blob).then((snap) => {
//       getDownloadURL(imageRef).then((url) => {
//          console.log(url);
//         setimageURL(url);
//       });
//     });

//   };


//   const ImageUrl = () => {
//     Axios.post("http://192.168.8.103:19001/image", {
//       imageURL: imageURL,
//     })
//       .then((res) => console.log(res.data), ToastAndroid.show(
//         "Image added!",
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM
//       ))
//       .catch((error) => console.log(error));
      
//   };

  
// 	return (
// 	  <SafeAreaView style={{ flex: 1, height: "100%" }}>

//   {/* <View style={{flexDirection:'row'}}>
//       <View style={styles.searchContainer}>
//       <TextInput
//           style={styles.searchInput}
//           onChangeText={text => setSearch(text)}
//           placeholder="Search post.."
//           value={useSearch}
//         />
//       </View>

//         <TouchableOpacity style={{marginTop:"3%"}}
//         onPress={() => navigation.navigate('Profile')}
//         >
//       <Image
//           style={styles.profile}
//           source={require("./assets/profilee.png")}              
//           />
//     </TouchableOpacity>
// </View> */}




// 		<FlatList
// 		 ListEmptyComponent={
// 			<View >
// 				<Text style={styles.emptyListStyle}>
// 					NO DATA FOUND
// 				</Text>
// 			</View>}

// 			data={[
// 				{key: 'Edit Profile', page:'Edit Profile', icon: editIcon},

//                 {key: 'FAQ', page:'Faq', icon: questionIcon},
// 				{key: 'Book a free appointment', page:'Logout', icon: logoutIcon},

//               ]}


// 		//   data={imagedataURL}
// 		  keyExtractor={(item, index) => index.toString()}
// 		  renderItem={({ item }) => (

// 			<TouchableOpacity  style={styles.container}>
// 		{/* <Image  
// 		  style={styles.avatar}
// 		  rounded source={item.photo}>
// 		  </Image> */}

// 		  <Text  style={styles.avatar}>
// 		  {item.icon}
// 		  </Text>

// 		  <View style={styles.content}>
// 		  <View style={styles.mainContent}>
// 		  <View style={styles.text}>
//             <Text style={styles.name}> {item.page.toUpperCase()}</Text>
// 		  </View>
		 
// 		  {/* <Text style={styles.timeAgo}>2 hours ago</Text> */}

// 		  </View>
// 		  {/* <Image style={styles.attachment} source={ item.attachment } /> */}

// 		  </View>
		
		  
// 		</TouchableOpacity>


// 		  )}
// 		  ref={(ref) => {
// 			listViewRef = ref;
// 		  }}/>
// 	  </SafeAreaView>
// 	);
//   };
  
//   const styles = StyleSheet.create({
// 	root: {
// 		backgroundColor: '#FFFFFF',
// 	  },
// 	  container: {
// 		padding: 16,
// 		flexDirection: 'row',
// 		borderBottomWidth: 1,
// 		borderColor: '#FFFFFF',
// 		alignItems: 'flex-start',
// 	  },
// 	  avatar: {
// 		width: 50,
// 		height: 50,
// 		borderRadius: 25,
// 	  },
// 	  text: {
// 		marginBottom: 5,
// 		flexDirection: 'row',
// 		flexWrap: 'wrap',
// 	  },
// 	  content: {
// 		flex: 1,
// 		marginLeft: 16,
// 		marginRight: 0,
// 	  },
// 	  mainContent: {
// 		marginRight: 60,
// 	  },
// 	  img: {
// 		height: 50,
// 		width: 50,
// 		margin: 0,
// 	  },
// 	  attachment: {
// 		position: 'absolute',
// 		right: 0,
// 		height: 50,
// 		width: 50,
// 	  },
// 	  separator: {
// 		height: 1,
// 		backgroundColor: '#CCCCCC',
// 	  },
// 	  timeAgo: {
// 		fontSize: 12,
// 		color: '#696969',
// 	  },
// 	  name: {
// 		fontSize: 16,
// 		color: '#4e5180',
//         fontWeight:"500"
// 	  },
//   });
  
  
//   export default Settings;
  

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
  } from "react-native";
  import { AntDesign, Ionicons, FontAwesome  } from '@expo/vector-icons';
  import Axios from 'axios';

  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  
  import { StatusBar } from "expo-status-bar";
  import Upload from "./Upload";

  import SocialIcon from 'react-native-vector-icons/AntDesign';


export const logoutIcon = (<AntDesign name="logout" size={40} color="black" />);
export const editIcon = (<FontAwesome name="edit" size={40} color="black" />);
export const questionIcon = (<SocialIcon name="questioncircleo" size={40} color="black" />);
import AsyncStorage from "@react-native-async-storage/async-storage";



  
  const Feeds = () => {


const navigation = useNavigation();
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");

const [imagedataURL, setimagedataURL] = useState([]);


const [buttonStatus, setbuttonStatus] = useState(true);

const [useSearch, setSearch] = useState("");




useEffect(() => {
Axios.get("http://192.168.8.103:19001/getData")
.then((result) => setimagedataURL(result.data)) 
.catch((error) => console.log(error))
},[]);

const handleLogout = () => {  
    // After successful login, reset the navigation stack to remove the login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };



const removeItem = async () => {
await AsyncStorage.removeItem('userID' ,(error) => console.log(error))
.then(
	ToastAndroid.show("Logout",
	ToastAndroid.SHORT,ToastAndroid.BOTTOM),
	navigation.navigate("Login"),
	handleLogout()

 )
}




  
	return (
	  <SafeAreaView style={{ flex: 1, height: "100%" }}>

		<TouchableOpacity  style={styles.container}
		        onPress={() => navigation.navigate('EditProfile')}>
		

		  <Text  style={styles.avatar}>
		  {editIcon}
		  </Text>

		  <View style={styles.content}>
		  <View style={styles.mainContent}>
		  <View style={styles.text}>
            <Text style={styles.name}> Edit Profile</Text>
		  </View>
		  </View>
		  </View>
		
		  
		</TouchableOpacity>

		<TouchableOpacity  style={styles.container}>
		

		<Text  style={styles.avatar}>
		{questionIcon}
		</Text>

		<View style={styles.content}>
		<View style={styles.mainContent}>
		<View style={styles.text}>
		  <Text style={styles.name}> About Us</Text>
		</View>
		</View>
		</View>
	  
		
	  </TouchableOpacity>

	  <TouchableOpacity  style={styles.container} onPress={() => removeItem()}>
		

		<Text  style={styles.avatar}>
		{logoutIcon}
		</Text>

		<View style={styles.content}>
		<View style={styles.mainContent}>
		<View style={styles.text}>
		  <Text style={styles.name}> Logout</Text>
		</View>
		</View>
		</View>
	  
		
	  </TouchableOpacity>




		
	  </SafeAreaView>
	);
  };
  
  const styles = StyleSheet.create({
	root: {
		backgroundColor: '#FFFFFF',
	  },
	  container: {
		padding: 16,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#FFFFFF',
		alignItems: 'flex-start',
	  },
	  avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
	  },
	  text: {
		marginBottom: 5,
		flexDirection: 'row',
		flexWrap: 'wrap',
	  },
	  content: {
		flex: 1,
		marginLeft: 16,
		marginRight: 0,
	  },
	  mainContent: {
		marginRight: 60,
	  },
	  img: {
		height: 50,
		width: 50,
		margin: 0,
	  },
	  attachment: {
		position: 'absolute',
		right: 0,
		height: 50,
		width: 50,
	  },
	  separator: {
		height: 1,
		backgroundColor: '#CCCCCC',
	  },
	  timeAgo: {
		fontSize: 12,
		color: '#696969',
	  },
	  name: {
		fontSize: 16,
		color: '#4e5180',
        fontWeight:"500"
	  },
  });
  
  
  export default Feeds;
  