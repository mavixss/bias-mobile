import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ToastAndroid, ScrollView } from 'react-native';
import {bussinessTypes, bussinessesName,businessLikes} from "./BusinessList"
import { Checkbox } from 'react-native-paper';
import {NETWORK_ADDPOCKET} from '@env';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { EvilIcons } from '@expo/vector-icons';


const BusinessLikes = () => {
    const navigation = useNavigation();
    const [businessType, setbusinessType] = useState([]);
    const [businessTypeSelectd, setbusinessTypeSelectd] = useState([]);
    const [businessesName, setbusinessesName] = useState([]);
    const[user, setUser] = useState('');
    const [selectedBusinesses, setSelectedBusinesses] = useState([]);

    const handleLogin = () => {  
      // After successful login, reset the navigation stack to remove the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    };
  

    var datee = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hr = new Date().getHours();
    var min = new Date().getMinutes();
    var secs = new Date().getSeconds();
  
    // You can turn it in to your desired format
    var createdAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;
  

    
    const Likes  = () => {
          Axios.post(`${NETWORK_ADDPOCKET}/BussLikes`, {
          user:user,
          bussNameSelectd:JSON.stringify(selectedBusinesses),
          createdAt:createdAt
    
        })
          .then((res) =>  
           {
            setbusinessTypeSelectd('');
            setSelectedBusinesses([]);
      
            ToastAndroid.show("Welcome",
            ToastAndroid.SHORT,ToastAndroid.BOTTOM),
    
            handleLogin()
    
    
          } 
          )
          .catch((error) => console.log(error));
          
      };

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
      
    

  useEffect(() => {
    setbusinessType(bussinessTypes())

  }, []);
  const bussType = (e) => {
    setbusinessTypeSelectd(e.bussiness_type)
    setbusinessesName(bussinessesName(e.bussine_type_code))
    console.log(e.bussiness_type)
}



const handleCheckboxChangee = (businessName) => {
  const isSelected = selectedBusinesses.some(
    (business) => business.name === businessName
  );

  let updatedSelectedBusinesses = [...selectedBusinesses];

  if (isSelected) {
    updatedSelectedBusinesses = updatedSelectedBusinesses.filter(
      (business) => business.name !== businessName
    );
  } else {
    updatedSelectedBusinesses.push({
      name: businessName,
      activeClass: true,
    });
  }

  setSelectedBusinesses(updatedSelectedBusinesses);
  // Perform any necessary actions with the selected businesses here
  console.log(updatedSelectedBusinesses);
  
};

  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.statsCard}>
        <Text style={styles.statsTitle}>Please select your preferred businesses.</Text>

          {businessLikes.map((business, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <Checkbox.Item
                label={business}
                status={selectedBusinesses.some(b => b.name === business) ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChangee(business)}
                style={styles.checkbox}
              />
            </View>
          ))}

      </ScrollView>
      <TouchableOpacity onPress={() =>{ 
        Likes()
        }} style={styles.addButton}>
        <EvilIcons name="arrow-right" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:1,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  editButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#008B8B',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  statsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    justifyContent: 'center',

  },
  statItem: {
    marginTop:20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsCategory: {
    color: '#999',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },

  inputContainerDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    width:"100%",

  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },


});

export default BusinessLikes