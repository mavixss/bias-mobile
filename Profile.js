
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import {NETWORK_ADDPOCKET} from '@env';

const Profile = () => {
  const navigation = useNavigation();

  const[user, setUser] = useState('');
  const[dataID, setData] = useState([]);


    useEffect(() => {
        Axios.post(`${NETWORK_ADDPOCKET}/getIdFinal`,{
        user:user
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


  
return (

<View style={styles.container}>
<View style={{flexDirection:'row'}}>
      <View style={styles.searchContainer}>
      </View>

        <TouchableOpacity style={{marginTop:"5%"}}
        onPress={() => navigation.navigate('Settings')}
        >
       <Ionicons name="ios-reorder-three-outline" size={36} color="black" />
    </TouchableOpacity>
</View>


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
        <Text style={styles.bioText}>
        Worry weighs a person down; an encouraging word cheers a person up.
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

export default Profile;

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
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
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
  searchContainer: {
    width:'85%',
    padding: "2%",
    paddingTop:"2%"

  },
  profile: {
    width: 55,
    height: 55,
    borderRadius: 25,

  },


});