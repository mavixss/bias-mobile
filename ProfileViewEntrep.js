

import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { update } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { useRoute } from '@react-navigation/native';
import {NETWORK_ADDPOCKET} from '@env';
import { Ionicons } from '@expo/vector-icons';



const ProfileViewEntrep = ({data}) => {
  const navigation = useNavigation();
  const route = useRoute();
//   const id = route.params.id; //from feeds
  const id = data[0];


  const[user, setUser] = useState('');
  

  const[dataID, setData] = useState([]);

    useEffect(() => {
      Axios.post(`${NETWORK_ADDPOCKET}/getIdFinal`,{
        user:id
      })
        .then((res) => setData(res.data.results)
        )
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

  
return (

<View style={styles.container}>
{/* <View style={{flexDirection:'row'}}>
<View style={styles.searchContainer}>
      </View>
<TouchableOpacity 
        onPress={() => navigation.navigate('Settings')}>
       <Ionicons name="ios-reorder-three-outline" size={36} color="black" />
    </TouchableOpacity>

</View> */}


<FlatList
  data={dataID}
  keyExtractor={item => item.user_id}
  renderItem={({item}) => (
    <View style={styles.container}>
    <View style={styles.headerContainer}> 
    
    <Image
        style={styles.coverPhoto}
        source={require("./assets/background.png")}        
    />
     <View style={styles.profileContainer}>
     <TouchableOpacity>
     <Image
        style={styles.profilePhoto}
  			source={item.user_profile ? { uri: item.user_profile } : require("./assets/prrofilee.png")} 
        />
        
        </TouchableOpacity>
     <Text style={styles.nameText}>{item.user_fname + ' ' + item.user_lname}
    </Text>

    <Text style={styles.statusText}>{item.user_status} 
    </Text>


     </View>
    </View> 

    <View style={styles.bioContainer}>
    <Text style={styles.sectionTitle}>Information</Text>
    <Text style={styles.bioText}>
    Joined since {formatDate(item.user_created_at)}
  </Text>
    <Text style={styles.bioText}>{item.user_email}</Text>
    <Text style={styles.bioText}>
    Contact Number: {item.user_contact_num }
  </Text>
  <Text style={styles.bioText}>
    Address: {item.user_province } {item.user_city} {item.user_barangay}
  </Text>

      </View>
      {(item.user_identity_status === "pending" || item.user_identity_status === "approved") ? (
          null 
        ) : (
    
    <TouchableOpacity
          onPress={() => navigation.navigate("UploadID")}
          style={[styles.buttonn]}
        >
          <Text style={styles.buttonText}>Verify Now!</Text>
        </TouchableOpacity>
      
    
        )
      }


</View>

  )}
  />

</View>


);
};

export default ProfileViewEntrep;

const styles = StyleSheet.create({

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
    marginTop: 8,
  },
  statusText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 1,
    color: "blue"
  },

  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 14,
  },
  bioTextSeeMore: {
    fontSize: 16,
    color: "blue"

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },



});