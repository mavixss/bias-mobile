import { StyleSheet, Text, View, Image, TextInput,handleSearchTextChange, ScrollView, TouchableOpacity, Button, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { update } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import Deposite from './components/deposite'
import Paypal from './Paypal';

export default function Wallet() {
  const navigation = useNavigation();
  const [showPaypal, setShowPaypal] = useState(false)

  const HandlepopUp =() =>{
    if(showPaypal){
      setShowPaypal(false);
    }
    else{
      setShowPaypal(true);

    }
  }

  const[user, setUser] = useState('');
  // console.log(test);
  

  const[dataID, setData] = useState("Processing...");
  // const item = dataID[0];

    // useEffect(() => {
    //   Axios.post("http://192.168.8.103:19001/WalletSum",{
    //     user:user
    //   })
    //     // .then((res) => setData(res.data.results[0]))
    //     .then((res) => setData(res.data.results[0].totalamount)
    //     )

    //     //  .then((data) => setData(data)
    //     .catch((error) => console.log(error));

    // }, [dataID]);
  

  const findUser = async () => {
  const result = await AsyncStorage.getItem('userID');
    console.log(result);
    if(!result){
      navigation.navigate("Login")

    }
  setUser(JSON.parse(result))


  Axios.post("http://192.168.8.103:19001/WalletSum",{
    user:user
  })
    // .then((res) => setData(res.data.results[0]))
    .then((res) => setData(res.data.results[0].totalamount)
    )

    //  .then((data) => setData(data)
    .catch((error) => console.log(error));
  };

  useEffect(() => {
    findUser();
  },[dataID])




  return (
    <View style={styles.container}>

<View style={styles.userCard}>
        <View>
          <Image source={require("./assets/prrofilee.png")} style={styles.userPhoto} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userFollowers}>Joined since 2023</Text>
        </View>

      </View>

        <View style={styles.retrnCard}>

    <View style={styles.actions}>
          <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
        <Text style={styles.actionText}>Available Balance</Text>
      </TouchableOpacity>

      </View>

      <View style={styles.actions}>
      <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
       <Text style={styles.statsTitle}>P {dataID} </Text>

      </TouchableOpacity>



      <TouchableOpacity onPress={() => {setShowPaypal(!showPaypal)}} style={styles.actionButton}>
        <Text style={styles.actionText}>Deposite</Text>
        {/* <Text style={styles.actionCount}>Money</Text> */}
      </TouchableOpacity>
      </View>


      </View>





{showPaypal ? (
  <Paypal hidePopup={HandlepopUp}  />
) : ""}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:"1%",
    height: "100%"

  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  userFollowers: {
    color: '#999',
  },
  retrnCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
    

  },

  statsTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    marginTop:"2%",
    // marginRight:30


  },


  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 15
    ,
    color: '#3b5998',
  },
  actionCount: {
    fontSize: 15,
    marginLeft: 5,
  },


 


});