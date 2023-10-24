import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign, Ionicons   } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import Main from './Main';
// import LoginScreen from './LoginScreen';
// import HomeScreen from './HomeScreen';
// import Testing from './Testing';
// import Chat from './Chat';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import Upload from './Upload';
import Testing from './Testing';
import Profile from './Profile';
import Feeds from './Feeds';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

 function HomeBottomNav() {
  return (

    
    <NavigationContainer independent={true}>
    <Tab.Navigator
   
    initialRouteName="Home"
    activeColor="#3c3670"
    inactiveColor="#3e2465"
    // style={{backgroundColor: '#534c88',}}
    tabBarActiveBackgroundColor= "#534c88"
    
    screenOptions={{
      headerShown: false,
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
     
      <Tab.Screen name="Chat" 
       component={Upload}
      options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
          tabBarBadge: 2,
          }} />
      <Tab.Screen name="Friends" 
       component={Testing} 
      options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }} />
      
      <Tab.Screen name="Feeds" 
       component={Feeds} 
         options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-ul" color={color} size={size} />
          ),
          tabBarBadge: 5,
        }}
      />

      <Tab.Screen name="Notification" 
       component={Profile} 
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 10,
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}


 function HomeStack() {
  return (

    
    <NavigationContainer independent={true}>
    	<Stack.Navigator>
      <Stack.Screen name="HomeBottomNav" component={HomeBottomNav} />
      <Stack.Screen name="Upload" component={Upload} />

  </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeBottomNav;

//[ps. dont delete this for guide]