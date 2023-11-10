

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



  
const Settings = () => {


const navigation = useNavigation();

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
  
  
  export default Settings;
  