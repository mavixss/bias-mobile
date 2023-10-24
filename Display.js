import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from "react-native-select-dropdown";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import CalendarPicker from 'react-native-calendar-picker';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';



export default function App() {
  const navigation = useNavigation();

    const[user, setUser] = useState('');
    const[dataID, setData] = useState([]);


    useEffect(() => {
      Axios.post("http://192.168.8.103:19001/testID",{
        user:user
      })
        // .then((res) => setData(res.data.results[0]))
        .then((res) => setData(res.data.results))

        //  .then((data) => setData(data)
        .catch((error) => console.log(error));
    }, []);
  

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
    <Text>{user}</Text>
    <FlatList
      data={dataID}
      keyExtractor={item => item.user_id}
      renderItem={({item}) => (
        <View> 
        <Text>
        {item.user_id} {item.user_firstname}{item.user_lastname}
        </Text>
        {/* <Image 
        style={styles.avatar}
        source={{uri: item.img_url}}/> */}

        </View> 

      )}
      />

    



    </View>
  );
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

});
