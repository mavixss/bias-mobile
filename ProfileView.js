


import { StyleSheet, Text, View, Image, TextInput,handleSearchTextChange, ScrollView, TouchableOpacity, Button, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { update } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


const ProfileView = ({data}) => {
  const navigation = useNavigation();
  const route = useRoute();
//   const id = route.params.id; //from feeds
const id = data[0];


  const [isDisabled, setDisabled] = useState(false);
  const [useSearch, setSearch] = useState("");



  const[user, setUser] = useState('');
  const[test, setTest] = useState('');
  // console.log(test);
  

  const[dataID, setData] = useState([]);

    useEffect(() => {
      Axios.post("http://192.168.8.103:19001/testID",{
        user:id
      })
        // .then((res) => setData(res.data.results[0]))
        .then((res) => setData(res.data.results)
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


  const dataTest = (e) => {
    setTest(e);
  };
  
return (

<View style={styles.container}>
{/* <Text>{user}</Text> */}
<View style={{flexDirection:'row'}}>

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
     {/* { setTest(item.user_fname)} */}
    </Text>

    <Text style={styles.statusText}>{item.user_status}
     {/* { setTest(item.user_fname)} */}
    </Text>


     </View>
    </View> 

    <View style={styles.bioContainer}>
        <Text style={styles.bioText}>
        Worry weighs a person down; an encouraging word cheers a person up.
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>1234</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>5678</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>9101</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>


</View>

  )}
  />






</View>


);
};

export default ProfileView;

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


});