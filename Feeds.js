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
  } from "react-native";
  import { AntDesign, Ionicons   } from '@expo/vector-icons';
  import Axios from 'axios';

  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  
  import { StatusBar } from "expo-status-bar";
  import Upload from "./Upload";

  
  const Feeds = () => {


const navigation = useNavigation();
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");

const [imagedataURL, setimagedataURL] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);
const [useSearch, setSearch] = useState("");


useEffect(() => {
Axios.get("http://192.168.8.103:19001/getImage")
.then((result) => setimagedataURL(result.data)) 
.catch((error) => console.log(error))
},[]);

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setbuttonStatus(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
        setbuttonStatus(false);
      setImage(result.assets[0].uri);
      setImageFilename(result.assets[0].uri.split("/").pop());
    //   console.log(image);
    }

};


const imagesUpload = async () => {

    const storagee = storage;
    const imageRef = ref(storagee, "images/" + imageFilename);
    const img = await fetch(image);
    const blob = await img.blob();

    uploadBytes(imageRef, blob).then((snap) => {
      getDownloadURL(imageRef).then((url) => {
         console.log(url);
        setimageURL(url);
      });
    });

  };


  const ImageUrl = () => {
    Axios.post("http://192.168.8.103:19001/image", {
      imageURL: imageURL,
    })
      .then((res) => console.log(res.data), ToastAndroid.show(
        "Image added!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      ))
      .catch((error) => console.log(error));
      
  };

  
	return (
	  <SafeAreaView style={{ flex: 1, height: "100%" }}>

        {/* <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.button}  
       onPress={() => navigation.navigate('Upload')}
        >
        <Text style={{ color:'#ffffff' }}>Pitch Business</Text> 
      </TouchableOpacity> 
      
        </View> */}



  <View style={{flexDirection:'row'}}>
      <View style={styles.searchContainer}>
      <TextInput
          style={styles.searchInput}
          onChangeText={text => setSearch(text)}
          placeholder="Search post.."
          value={useSearch}
        />
      </View>

        <TouchableOpacity style={{marginTop:"3%"}}
        onPress={() => navigation.navigate('Profile')}
        >
      <Image
          style={styles.profile}
          source={require("./assets/profilee.png")}              
          />
    </TouchableOpacity>
</View>




		<FlatList
		 ListEmptyComponent={
			<View >
				<Text style={styles.emptyListStyle}>
					NO DATA FOUND
				</Text>
			</View>}

      ListHeaderComponent={
  <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.button}  
       onPress={() => navigation.navigate('Upload')}
        >
        <Text style={{ color:'#ffffff' }}>Pitch Business</Text> 
      </TouchableOpacity> 
      
        </View> 

      }

		  data={imagedataURL}
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
            <Text style={styles.name}> Firstname Lastname
			{/* {item.name} */}
			</Text>
              <Text style={styles.date}>June 6 2023</Text>
              </View>
              </View>
              
              <Text style={styles.description}>A warm welcome and lots of good wishes on becoming part of our growing team.</Text>
              <Image style={{ height: 200, width: '100%' }}  source={{uri: item.img_url}} />
            
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Business Status:</Text>
              <Text style={styles.actionCount}>{item.img_id}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Capital:</Text>
              <Text style={styles.actionCount}>{item.img_id}</Text>
            </TouchableOpacity>
            </View>
			</TouchableOpacity>
		  )}
		  ref={(ref) => {
			listViewRef = ref;
		  }}/>
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
        marginBottom:20,
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
});
  
  export default Feeds;
  