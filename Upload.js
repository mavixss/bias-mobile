


import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import Axios from 'axios';

const Upload = () => {
const navigation = useNavigation();
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");

const [imagedataURL, setimagedataURL] = useState([]);


const [buttonStatus, setbuttonStatus] = useState(true);

// useEffect(() => {
// Axios.get("http://192.168.8.103:19001/getImage")
// .then((result) => setimagedataURL(result.data)) 
// .catch((error) => console.log(error))
// },[]);

useEffect(() => {
  Axios.get("http://192.168.8.103:19001/getIDimage")
  .then((result) => {setimagedataURL(JSON.parse(result.data[0].img_url))}) 
  .catch((error) => console.log(error))
  },[]);
  
console.log(imagedataURL)
const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setbuttonStatus(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    //  console.log(result);

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

<View style={styles.container}>

     
{/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Button title="Pick an image from camera roll" onPress={  () => pickImage()} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} />
      <Button title='Save to DB' onPress={() => ImageUrl() }/>
    </View> */}

    


    <View>
      {/* <FlatList
      data={imagedataURL}
      keyExtractor={item => item}
      renderItem={({item, index}) => (
        <View> 
        <Text>
          {item}
        </Text>
        <Image 
        style={styles.avatar}
        source={{uri: item.link}}/>

        </View> 

      )}
      />
 */}

 {/* {
  imagedataURL.map((item, index) => (

    <View styles={{height:100, width:200}} key={index}> 
        <Text   >
          {item.type}
        </Text>
        <Image 
        style={styles.avatar}
        source={{uri: item.link}}/>

        </View> 

  ))
 } */}




 <FlatList
      data={imagedataURL}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View key={index}>
          <Text>{item.type}</Text>
          <Image style={styles.avatar} source={{ uri: item.link }} />
        </View>
      )}
    />


    </View>

    </View>
);
};

export default Upload;

const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  body: {
    marginTop:"10%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: "80%",
    height: "50%",
    // borderRadius: 70,
    // backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#534c88",
  },
  loginBtnn: {
    width: "80%",
    borderRadius: 10,
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#e0dde9",
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 35,
    fontWeight: '800',
    color: '#8d3934',
    alignItems: 'center',

   color:'#3c3670',
    marginRight: 8,
  },
});