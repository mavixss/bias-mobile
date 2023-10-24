import {
	SafeAreaView,
	StyleSheet,
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
	Button,
	Alert,
	Avatar,
	TextInput,
	handleSearchTextChange,
	searchText,
	ToastAndroid,
  RefreshControl,
	props,
  Pressable,
  } from "react-native";
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useRoute } from '@react-navigation/native';
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import LoadingScreen from "./LoadingScreen";

export default function ChatList() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
//for loading screen
    useEffect(() => {
        // Simulate an API call or data loading process
        setTimeout(() => {
          setIsLoading(false); // Set isLoading to false when data is loaded
        }, 2000); // Simulate a 2-second loading time
      }, []);

//for drag to refresh
const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
  // Fetch your initial data here
        fetchData();
    }, []);
    
      const fetchData = () => {
        // Simulate fetching data
        setTimeout(() => {
          const newData = [...dataFeeds, { key: Date.now().toString() }];
          setDataFeeds(newData);
          setRefreshing(false);
        }, 1000);
      };
      
      const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
      };

      const [ dataFeeds, setDataFeeds] = useState("");
      
//fetch data

      useEffect(() => {
        Axios.get("http://192.168.8.103:19001/UserList")
        .then((result) => setDataFeeds(result.data)) 
        .catch((error) => console.log(error))
        },[dataFeeds]);
        

      

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>

    {isLoading ? (
    
    <LoadingScreen />
    ):(
    
    //height for flatlist
        <View style={{maxHeight:"94%"}}>
    
            <FlatList
             ListEmptyComponent={
                <View >
                    <Text style={styles.emptyListStyle}>
                        NO DATA FOUND
                    </Text>
                </View>}
        
              data={dataFeeds}
              keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
    
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => navigation.navigate("Chats")}
                >
        <View style={styles.row}>
          <Image  source={require("./assets/prrofilee.png")}  style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.user_id} {item.user_fname} {item.user_lname}
              </Text>
              <Text style={styles.mblTxt}>1:48 am</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>active</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
                

              )}
              ref={(ref) => {
                listViewRef = ref;
              }}/>
    
    </View>
          
      )}
    
    
</SafeAreaView>  
  )
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
      },
      pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
      },
      nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
      },
      nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
      },
      mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
      },
      msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
      },



})