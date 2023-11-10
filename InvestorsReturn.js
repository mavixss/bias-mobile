import { StyleSheet, Text, View, Image, TextInput,handleSearchTextChange, ScrollView, TouchableOpacity, Button, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigation, useRoute} from '@react-navigation/native';
import { update } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import Deposite from './components/deposite'
import Paypal from './Paypal';

export default function InvestorsReturn() {
  const route = useRoute();
const amount = route.params.amount; //from investorsList
const firstname = route.params.firstname; //from investorsList
const lastname = route.params.lastname; //from investorsList

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


 



  return (
    <View style={styles.container}>

<View style={styles.userCard}>
        <View>
          <Image source={require("./assets/prrofilee.png")} style={styles.userPhoto} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{firstname + ' ' + lastname}</Text>
          <Text style={styles.userFollowers}>Joined since 2023</Text>
        </View>

      </View>

        <View style={styles.retrnCard}>

    <View style={styles.actions}>
          <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
        <Text style={styles.actionText}>Return</Text>
      </TouchableOpacity>

      </View>

      <View style={styles.actions}>
      <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
       <Text style={styles.statsTitle}>P {amount} </Text>

      </TouchableOpacity>



      <TouchableOpacity onPress={() => {setShowPaypal(!showPaypal)}} style={styles.actionButton}>
        <Text style={styles.actionText}>Deposite</Text>
        {/* <Text style={styles.actionCount}>Money</Text> */}
      </TouchableOpacity>
      </View>


      </View>

      <View style={styles.tableContainer}>
<ScrollView horizontal={true} style={{ marginTop: 10 }}>
 <View style={styles.table}>
   <View style={styles.tableRow}>
     <Text style={styles.tableHeader}>Amount</Text>
     <Text style={styles.tableHeader}>Due Date</Text>
     <Text style={styles.tableHeader}>Status</Text>
     <Text style={styles.tableHeader}></Text>


   </View>
     <View style={styles.tableRow}>
       <Text style={styles.tableCell}>hello</Text>
       <Text style={styles.tableCell}>hello</Text>
       <Text style={styles.tableCell}>hello</Text>
       <View style={styles.tableCell}>
       <TouchableOpacity style={styles.button}  onPress={() => Return()} >
        <Text style={{ color:'#ffffff' }}>Pay</Text> 
      </TouchableOpacity> 

       </View>

     </View>
 </View>
</ScrollView>

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

  tableContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  table: {
    width: '100%',
    borderWidth: .5,
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  tableHeader: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 8,
  },

 
  button: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#534c88",
  },


});