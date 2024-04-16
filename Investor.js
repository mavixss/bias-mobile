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
	props,
  Pressable
  } from "react-native";
  import { AntDesign, Ionicons   } from '@expo/vector-icons';
  import Axios from 'axios';

  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  

  
  const Investor = ({route}) => {
    const { bussid } = route.params;


const navigation = useNavigation();

const [data, setData] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);
const [useSearch, setSearch] = useState("");


useEffect(() => {
Axios.post("http://192.168.8.103:19001/displayInvestor",{
  bussid:bussid

})
.then((result) => setData(result.data)) 
.catch((error) => console.log(error))
},[data]);


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
	  <SafeAreaView style={{ flex: 1, height: "100%" }}>





<View style={{maxHeight:"100%"}}>
		<FlatList
		 ListEmptyComponent={
			<View >
				<Text style={styles.emptyListStyle}>
					NO DATA FOUND
				</Text>
			</View>}

  

		  data={data}
		  keyExtractor={(item, index) => index.toString()}
		  renderItem={({ item }) => (
			<TouchableOpacity style={styles.post}
            
			// 		onPress={() =>
			// 	navigation.navigate("Profile", {
			// 	  dataID: item.id,
			// 	  name: item.name,
			// 	  lname: item.lname,

			// 	  mobile: item.phone,
			// 	  email: item.email,
			// 	})

			//   }	
			  
			  >

              <View style={styles.header}>
                <Image
                  style={styles.avatar}
                  source={require("./assets/profilee.png")}
                />
                <View>
            <Text style={styles.name}> {bussid} {item.user_fname} {item.user_lname}
			{/* {item.name} */}
			</Text>
              <Text style={styles.date}>{formatDate(item.invst_created_at)}</Text>
              <Text style={styles.date}>{item.buss_address}</Text>

              </View>
              </View>

              
              <Text style={styles.description}> {item.buss_id} {item.buss_details} </Text>
              <Image style={{ height: 200, width: '100%' }}  source={{uri: item.buss_photo}} />
            
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Status:</Text>
              <Text style={styles.actionCount}>{item.invst_status}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Amount:</Text>
              <Text style={styles.actionCount}>{item.invst_amt} {item.invst_num_year} {item.invst_interest}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.actions}>
            <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen]}
            //  onPress={() => setModalVisible(true)}

        >
                <Text style={styles.textStyle}>Navigate Invest</Text>
           </TouchableOpacity>
            </Pressable>

            <Pressable onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
             style={[styles.button3, styles.buttonOpen]}
            //  onPress={() => navigation.navigate("Investor",{ bussid: [item.buss_id]})} 
            onPress={() => navigation.navigate("SendProfit", {month: [item.invst_num_year],amount: [item.invst_amt],interestRate: [item.invst_interest], busscapital: [item.buss_capital]})} 

            >
                <Text style={styles.textStyle}>Return</Text>
           </TouchableOpacity>
            </Pressable>


            </View>


			</TouchableOpacity>
		  )}
		  ref={(ref) => {
			listViewRef = ref;
		  }}/>

</View>
	  </SafeAreaView>
	);
  };
  
  const styles = StyleSheet.create({
    itemStyle: {
      padding: 30,
      fontSize: 20,
      left: 50,
    },
    emptyListStyle: {
      padding: 10,
      fontSize: 18,
      textAlign: 'center',
      },
      button: {
        width: "99%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "#534c88",
      },
      button1: {
      alignItems: "center",
      justifyContent: "center",
      left: "87%",
          marginTop:"2%",
      position: "absolute",
      
      },
    buttonn: {
      height: 40,
      width: 350,
      alignItems: "center",
      justifyContent: "center",
      left: 80,
      position: "absolute",
    },
    
      avatarContainer: {
          width: "100%",
          height: "10%",
          // borderRadius: 70,
           backgroundColor: '#e0dde9',
          alignItems: 'baseline',
          justifyContent: 'center',
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 0.16,
          marginBottom:-10
        },
  
        list: {
          paddingHorizontal: 5,
          backgroundColor: '#E6E6E6',
        },
        listContainer: {
          alignItems: 'center',
        },
        post: {
          marginHorizontal:10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          marginBottom:10,
          borderBottomWidth:0.5,
          borderBottomColor:'#808080',
          padding:10,
        },
        avatar: {
          width: 50,
          height: 50,
          borderRadius: 25,
        },
        profile: {
          width: 55,
          height: 55,
          borderRadius: 25,
  
        },
  
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        },
        name: {
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 10,
        },
        date: {
          fontSize: 14,
          color: 'gray',
          marginLeft: 10,
        },
        description: {
          marginBottom: 10,
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
  
        centeredView: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        },
        modalView: {
          height:"90%",
          width:"90%",
          margin: 10,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        },
  
  
        Modalpost: {
          marginHorizontal:10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          marginBottom:20,
          borderBottomWidth:0.5,
          borderBottomColor:'#808080',
          padding:10,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
  
  
  
        },
  
        button3: {
          borderRadius: 20,
          padding: 10,
          elevation: 2,
          height:"100%",
          width:"60%",
        },
        buttonOpen: {
          backgroundColor: '#F194FF',
        },
        buttonClose: {
          backgroundColor: '#2196F3',
        },
        textStyle: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        modalText: {
          marginBottom: 15,
          textAlign: 'center',
        },
  
  
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
          marginTop: 10,
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
  
  export default Investor;
  