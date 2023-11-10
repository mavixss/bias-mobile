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
  import {NETWORK_ADD} from '@env';

export default function InvestorsList() {
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
const[user, setUser] = useState('');

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
      Axios.post(`${NETWORK_ADD}:19001/ViewInvestors`,{
        user:user
    })
      .then((res) => setDataFeeds(res.data.result))
      .catch((error) => console.log(error));
  }, [dataFeeds]);
        

  const formatDate = (date) => {
    const formattedDate = new Date(date);
	const hours = formattedDate.getHours();
    const minutes = formattedDate.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    return `${formattedDate.getMonth() + 1}-${formattedDate.getDate()}-${formattedDate.getFullYear()} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
    // Customize the format as needed
  };


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
        
        data={dataFeeds || []}
              keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
    
              renderItem={({ item }) => (


<>
{(item.investments || []).map((investment, index) => (
<View key={index}>
        <TouchableOpacity
        
        onPress={() => {
          navigation.navigate('InvestorsReturn', { amount: investment.invest_returned_amount, 
          firstname: investment.investor_fname, lastname: investment.investor_lname, });
        }}
                
        >

        <View   style={styles.row}>
          <Image  
        source={investment.investor_profile ? { uri: investment.investor_profile } : require("./assets/prrofilee.png")} 
          style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
              {investment.investor_id} {investment.investor_fname} {investment.investor_lname}
              </Text>
              <Text style={styles.mblTxt}>{formatDate(investment.invst_created_at)}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.buss_name}</Text>
            </View>
            <View style={styles.msgContainer}>
            <Text style={styles.msgTxt}>{investment.invest_amount}</Text>
            </View>

          </View>
        </View>


      </TouchableOpacity>
      </View>
      ))}
              
      </>

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