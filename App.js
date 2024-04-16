
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import Axios from 'axios';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NETWORK_ADDPOCKET} from '@env';


import UploadFile from './UploadFile';
import Investor from './Investor';
import Investment from './Investment';
import InvestmentUpdate from './InvestmentUpdate';
// import LoginFinal from './LoginFinal';
import Login from './Login';
import LoginNoVerify from './LoginNoVerify';
const ProfileViewFeeds = React.lazy(() => import('./ProfileViewFeeds'));
const ProfileViewInvestors = React.lazy(() => import('./ProfileViewInvestors'));
const ProfileView = React.lazy(() => import('./ProfileView'));

const Chat = React.lazy(() => import('./Chat'));
const Paypal = React.lazy(() => import('./Paypal'));
const SignUpAccount = React.lazy(() => import('./SignUpAccount'));
const ForgotPass = React.lazy(() => import('./ForgotPass'));
const ProfileFeeds = React.lazy(() => import('./ProfileFeeds'));
const UploadBusiness = React.lazy(() => import('./UploadBusiness'));

const Notif = React.lazy(() => import('./Notif'));
const EditProfile = React.lazy(() => import('./EditProfile'));
const Profile = React.lazy(() => import('./Profile'));
const Settings = React.lazy(() => import('./Settings'));
const EntrepFeeds = React.lazy(() => import('./EntrepFeeds'));
const UploadID = React.lazy(() => import('./UploadID'));
const InvestorsReturn = React.lazy(() => import('./InvestorsReturn'));
const InvestorsFeeds = React.lazy(() => import('./InvestorsFeeds'));
const ProfileViewEntrep = React.lazy(() => import('./ProfileViewEntrep'));

import BusinessView from './BussinessView';
import BussinessViewEntrep from './BussinessViewEntrep';
import Funds from './Funds';
import BusinessLikes from './BusinessLikes';
import EditPass from './EditPass';
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

//Bottom Tab Navigator for Investor
function Home() {

//for notification
const [notifCount, setNotifCount] = useState(0);

const findUser = async () => {
	const result = await AsyncStorage.getItem('userID');
	  if(!result){
		navigation.navigate("Login")
		return;
	  }
	Axios.post(`${NETWORK_ADDPOCKET}/getNotifCount`,{

				user:result
			})
			  .then((res) => setNotifCount(res.data.results[0].status))		
			  .catch((error) => console.log(error));
	};
  
	useEffect(() => {
	  findUser();
	},[])
  
	useEffect(() => {
		const refreshInterval = setInterval(() => {
		  findUser();
		}, 3000); // Refresh every 30 seconds
	
		// Clean up the interval when the component unmounts
		return () => {
		  clearInterval(refreshInterval);
		};
	  }, []);
		
		
  return (
<Tab.Navigator
   initialRouteName="Home"
   activeColor="#3c3670"
   inactiveColor="#3e2465"
   tabBarActiveBackgroundColor= "#534c88"
   screenOptions={{
	 tabBarHideOnKeyboard: true,
     tabBarStyle: { 
	 backgroundColor: '#ECECEB',
	 borderRadius: 16,
	 overflow: 'hidden',
	 bottom: "1%",
	 height: "6%",
	 borderTopColor: "#ECECEB",
	 width: "100%",
	 position: "absolute", 
	},
   
 }}
 >
	
	 
	 <Tab.Screen name="Feeds" 
	component={InvestorsFeeds} 
		options={{
		headerShown: false,
		 tabBarLabel: 'Feeds',
		 tabBarIcon: ({ color, size }) => (
		   <FontAwesome name="list-ul" color={color} size={size} />
		 ),
		//  tabBarBadge: 5,
	   }}
	 />

<Tab.Screen name="Chat" 
	  component={Chat}
	 options={{
		 tabBarLabel: 'Chat',
		 tabBarIcon: ({ color, size }) => (
		   <Ionicons name="chatbubble" color={color} size={size} />
		 ),
		 }} />

	 <Tab.Screen name="Notification" 
	  component={Notif} 
	   options={{
		 tabBarLabel: 'Notification',
		 tabBarIcon: ({ color, size }) => (
		   <MaterialCommunityIcons name="bell" color={color} size={size} />
		 ),
		 tabBarBadge: notifCount > 0 ? notifCount : null,
	   }}
	 />



<Tab.Screen name="Profile" 
	  component={ProfileViewInvestors} 
	 options={{
		headerShown: false,
		 tabBarLabel: 'Profile',
		 tabBarIcon: ({ color, size }) => (
			<Ionicons name="person-circle" size={35} color={color} />
		 ),
	   }} />
   </Tab.Navigator>  );
}




function Entreprenuer() {

	//for notification
	const [notifCount, setNotifCount] = useState(0);
	const findUser = async () => {
		const result = await AsyncStorage.getItem('userID');
		  if(!result){
			navigation.navigate("Login")
			return;
		  }
		Axios.post(`${NETWORK_ADDPOCKET}/getNotifCount`,{

					user:result
				})
				  .then((res) => setNotifCount(res.data.results[0].status))		
				  .catch((error) => console.log(error));
		};
	  
		useEffect(() => {
		  findUser();
		},[])
	  
		useEffect(() => {
			const refreshInterval = setInterval(() => {
			  findUser();
			}, 3000); // Refresh every 30 seconds
		
			// Clean up the interval when the component unmounts
			return () => {
			  clearInterval(refreshInterval);
			};
		  }, []);
			
			
	  return (
	<Tab.Navigator
	   
	   initialRouteName="Entreprenuer"
	   activeColor="#3c3670"
	   inactiveColor="#3e2465"
	   tabBarActiveBackgroundColor= "#534c88"
	   
	   screenOptions={{
	   tabBarHideOnKeyboard: true,
	   tabBarStyle: { 
		 backgroundColor: '#ECECEB',
		 borderRadius: 16,
		 overflow: 'hidden',
		 bottom: "1%",
		 height: "6%",
		 borderTopColor: "#ECECEB",
		 width: "100%",
		 position: "absolute",
		},
	 }}>
		
		 
		 <Tab.Screen name="Feeds" 
		  component={EntrepFeeds} 
			options={{
			headerShown: false,
			 tabBarLabel: 'Feeds',
			 tabBarIcon: ({ color, size }) => (
			   <FontAwesome name="list-ul" color={color} size={size} />
			 ),
			//  tabBarBadge: 5,
		   }}
		 />
	
	<Tab.Screen name="Chat" 
		  component={Chat}
		 options={{
			 tabBarLabel: 'Chat',
			 tabBarIcon: ({ color, size }) => (
			   <Ionicons name="chatbubble" color={color} size={size} />
			 ),
			 }} />


	
		 <Tab.Screen name="Notification" 
		  component={Notif} 
		   options={{
			 tabBarLabel: 'Notification',
			 tabBarIcon: ({ color, size }) => (
			   <MaterialCommunityIcons name="bell" color={color} size={size} />
			 ),
			 tabBarBadge: notifCount > 0 ? notifCount : null,
		   }}
		 />
	
	
	
	<Tab.Screen name="Profile" 
		  component={ProfileFeeds} 
		 options={{
			headerShown: false,
			 tabBarLabel: 'Profile',
			 tabBarIcon: ({ color, size }) => (
				<Ionicons name="person-circle" size={35} color={color} />
			 ),
		   }} />
	   </Tab.Navigator>  
	   );
	}
	

//stack navigator


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
		screenOptions={{
		headerStyle: {
		backgroundColor: '#534c88',
		headerBackVisible: false,
		},
		headerTintColor: '#fff',
		}}
		initialRouteName="Login"
		>
	  <Stack.Screen name="Login" component={Login} />

        <Stack.Screen
          name="Home" component={Home} options={{ headerShown: false }}/>
		 <Stack.Screen name="Profile" component={Profile} />
		 <Stack.Screen name="Settings" component={Settings} />
		 <Stack.Screen name="EditProfile" component={EditProfile} />
		 <Stack.Screen name="Investor" component={Investor} />
		 <Stack.Screen name="Chats" component={Chat} />
		 <Stack.Screen name="Paypal" component={Paypal} />
		 <Stack.Screen name="Sign Up" component={SignUpAccount} />
		 <Stack.Screen name="UploadBusiness" component={UploadBusiness} options={{title: 'Pitch'}} />
		 <Stack.Screen name="InvestorsFeeds" component={InvestorsFeeds} />
		 <Stack.Screen name="EntrepFeeds" component={EntrepFeeds} />
		 <Stack.Screen name="Business" component={BusinessView} />
		 <Stack.Screen name="ProfileView" component={ProfileView} />
		 <Stack.Screen name="ProfileViewFeeds" component={ProfileViewFeeds} options={{title: 'Profile'}} />
		 <Stack.Screen name="Forgot Password" component={ForgotPass} />
		 <Stack.Screen name="InvestorsReturn" component={InvestorsReturn} options={{title: 'Return'}}  />
		 <Stack.Screen name="BusinessViewEntrep" component={BussinessViewEntrep} />
		 <Stack.Screen name="Funds" component={Funds} />
		 <Stack.Screen name="UploadID" component={UploadID} options={{title: 'Verify'}} />
		 <Stack.Screen name="BusinessLikes" component={BusinessLikes} />
		 <Stack.Screen name="UploadFile" component={UploadFile} />
		 <Stack.Screen name="Investment" component={Investment} />
		 <Stack.Screen name="ProfileViewEntrep" component={ProfileViewEntrep} />
		 <Stack.Screen name="EditPass" component={EditPass} options={{title: 'Edit'}} />
		 <Stack.Screen name="LoginNoVerify" component={LoginNoVerify} />

		 <Stack.Screen name="InvestmentUpdate" component={InvestmentUpdate} 
		 options={{title: 'Update'}} />
		 {/* <Stack.Screen name="LoginFinal" component={LoginFinal}  
		 options={{title: 'Login'}} /> */}

		 <Stack.Screen name="Entreprenuer" 
		 options={{ headerShown: false }}
		 component={Entreprenuer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



