
//nested navigator
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons   } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Axios from 'axios';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from './Login';
import PitchBusiness from './PitchBusiness';
import SampleModal from './SampleModal';
import Invest from './Invest';
import Wallet from './Wallet';
import UploadFile from './UploadFile';
import CreditCardInfoScreen from './CardInfo';
import ScheduleScreen from './Timeline';
import TwoFactorAuthView from './Authentication';
import VerifyID from './VerifyID';
import Investor from './Investor';
import Request from './Request';
import SendProfit from './SendProfit';
import InvestorsInfo from './InvestorsInfo';
import Feeds from './SampleFeeds';
import InvestorFeeds from './InvestorFeeds';
import ChatList from './ChatList';
import Chat from './Chat';
import Paypal from './Paypal';
import SignUpAccount from './SignUpAccount';
import UploadBusiness from './UploadBusiness';
import EntreprenuerFeeds from './EntreprenuerFeeds';
import ForgotPass from './ForgotPass';
const ProfileFeeds = React.lazy(() => import('./ProfileFeeds'));
const Notif = React.lazy(() => import('./Notif'));
const SignUp = React.lazy(() => import('./SignUp'));
const SampleFeeds = React.lazy(() => import('./SampleFeeds'));
const EditProfile = React.lazy(() => import('./EditProfile'));
const Profile = React.lazy(() => import('./Profile'));
const Settings = React.lazy(() => import('./Settings'));
const Return = React.lazy(() => import('./Return'));
const Upload = React.lazy(() => import('./Upload'));



const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();

//Bottom Tab Navigator for Investor
function Home() {

//for notification
const [notifCount, setNotifCount] = useState(0);

const findUser = async () => {
	const result = await AsyncStorage.getItem('userID');
	//   console.log(result);
	  if(!result){
		navigation.navigate("Login")
		return;
	  }
	// setUser(JSON.parse(result))
	Axios.post("http://192.168.8.103:19001/getNotifCount",{
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
		}, 4000); // Refresh every 30 seconds
	
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
   // style={{backgroundColor: '#534c88',}}
   tabBarActiveBackgroundColor= "#534c88"
   
   screenOptions={{
	//  headerShown: false,
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
	  component={SampleFeeds} 
		options={{
		headerShown: false,
		 tabBarLabel: 'Feeds',
		 tabBarIcon: ({ color, size }) => (
		   <FontAwesome name="list-ul" color={color} size={size} />
		 ),
		 tabBarBadge: 5,
	   }}
	 />

<Tab.Screen name="Chat" 
	  component={ChatList}
	 options={{
		 tabBarLabel: 'Chat',
		 tabBarIcon: ({ color, size }) => (
		   <Ionicons name="chatbubble" color={color} size={size} />
		 ),
		 tabBarBadge: 2,
		 }} />

	 <Tab.Screen name="Notification" 
	  component={TopTab} 
	   options={{
		 tabBarLabel: 'Notification',
		 tabBarIcon: ({ color, size }) => (
		   <MaterialCommunityIcons name="bell" color={color} size={size} />
		 ),
		 tabBarBadge: notifCount > 0 ? notifCount : null,
	   }}
	 />

<Tab.Screen name="Return" 
	  component={Wallet} 
	   options={{
		// headerStyle: {
        //     height: 100, // Adjust the height as needed
        //     // Other header styles can be added here
        //   },
		// headerShown: false,
		 tabBarLabel: 'Wallet',
		 tabBarIcon: ({ color, size }) => (
			<Ionicons name="ios-wallet" color={color} size={size}/>
		 ),
		 tabBarBadge: 5,
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
		//  tabBarBadge: 3,
	   }} />
   </Tab.Navigator>  );
}




function Entreprenuer() {

	//for notification
	const [notifCount, setNotifCount] = useState(0);
	
	const findUser = async () => {
		const result = await AsyncStorage.getItem('userID');
		//   console.log(result);
		  if(!result){
			navigation.navigate("Login")
			return;
		  }
		// setUser(JSON.parse(result))
		Axios.post("http://192.168.8.103:19001/getNotifCount",{
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
			}, 4000); // Refresh every 30 seconds
		
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
	   // style={{backgroundColor: '#534c88',}}
	   tabBarActiveBackgroundColor= "#534c88"
	   
	   screenOptions={{
		//  headerShown: false,
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
		  component={EntreprenuerFeeds} 
			options={{
			headerShown: false,
			 tabBarLabel: 'Feeds',
			 tabBarIcon: ({ color, size }) => (
			   <FontAwesome name="list-ul" color={color} size={size} />
			 ),
			 tabBarBadge: 5,
		   }}
		 />
	
	<Tab.Screen name="Chat" 
		  component={ChatList}
		 options={{
			 tabBarLabel: 'Chat',
			 tabBarIcon: ({ color, size }) => (
			   <Ionicons name="chatbubble" color={color} size={size} />
			 ),
			 tabBarBadge: 2,
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
	
	<Tab.Screen name="Return" 
		  component={Wallet} 
		   options={{
			// headerStyle: {
			//     height: 100, // Adjust the height as needed
			//     // Other header styles can be added here
			//   },
			// headerShown: false,
			 tabBarLabel: 'Wallet',
			 tabBarIcon: ({ color, size }) => (
				<Ionicons name="ios-wallet" color={color} size={size}/>
			 ),
			 tabBarBadge: 5,
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
			//  tabBarBadge: 3,
		   }} />
	   </Tab.Navigator>  );
	}
	


function MyTabs() {
	return (
	  <Top.Navigator
	  
	  screenOptions={{
	 headerShown: false,
 }}>
		<Top.Screen name="Returns" component={Return} 
		options={{
		headerShown: false,
		 tabBarLabel: 'Return',
	   }}
		/>
		<Top.Screen name="Wallet" component={Wallet} />
	  </Top.Navigator>
	);
  }  


  function TopTab() {
	return (
	  <Top.Navigator
	  
	  screenOptions={{
	 headerShown: false,
 }}>
		<Top.Screen name="Notf" component={Notif} 
		options={{
		headerShown: false,
		 tabBarLabel: 'Notification',
	   }}
		/>
		<Top.Screen name="Request" component={Request} />
	  </Top.Navigator>
	);
  }  


  function TopReturn() {
	return (
	  <Top.Navigator
	  
	  screenOptions={{
	 headerShown: false,
 }}>
		<Top.Screen name="Profit" component={SendProfit} 
		options={{
		headerShown: false,
		 tabBarLabel: 'Profit',
	   }}
		/>
		<Top.Screen name="Timeline" component={SendProfit} />
	  </Top.Navigator>
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
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
		name="Upload" 
		component={Upload}
		options={{ headerShown: false }}
		 />
		 <Stack.Screen name="Signup" component={SignUp} />
		 <Stack.Screen name="Profile" component={Profile} />
		 <Stack.Screen name="Settings" component={Settings} />
		 <Stack.Screen name="Notification" component={SampleModal} />
		 <Stack.Screen name="Return" component={Return} />
		 <Stack.Screen name="EditProfile" component={EditProfile} />
		 <Stack.Screen name="Invest" component={Invest} />
		 <Stack.Screen name="Verify ID" component={VerifyID} />
		 <Stack.Screen name="Investor" component={Investor} />
		 <Stack.Screen name="InvestorsInfo" component={InvestorsInfo} />
		 <Stack.Screen name="Chats" component={Chat} />
		 <Stack.Screen name="SendProfit" component={SendProfit} />
		 <Stack.Screen name="PitchBusiness" component={PitchBusiness} />
		 <Stack.Screen name="Paypal" component={Paypal} />
		 <Stack.Screen name="SignUpAccount" component={SignUpAccount} />
		 <Stack.Screen name="UploadBusiness" component={UploadBusiness} />
		 <Stack.Screen name="InvestorFeeds" component={InvestorFeeds} />
		 <Stack.Screen name="CreditCardInfoScreen" component={CreditCardInfoScreen} />
		 <Stack.Screen name="WalletScreen" component={Wallet} />
		 <Stack.Screen name="Forgot Password" component={ForgotPass} />
		 <Stack.Screen name="Entreprenuer" 
		 options={{ headerShown: false }}
		 component={Entreprenuer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

