


import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from "expo-document-picker";
// import DocumentPicker, { types } from 'expo-document-picker';
import { useEffect, useState } from "react";

  import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import Axios from 'axios';

const UploadFile = () => {
const navigation = useNavigation();
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");

const [imagedataURL, setimagedataURL] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);

const [filee, setFile] = useState(null);
const [filename, setFilename] = useState("");
const [fileURL, setFileURL] = useState("");
const [filedataURL, setFileDataURL] = useState([]);
const [PDFFileName, setPDFilename] = useState("")

useEffect(() => {
Axios.get("http://192.168.8.103:19001/getImage")
.then((result) => setimagedataURL(result.data)) 
.catch((error) => console.log(error))
},[]);


useEffect(() => {
    Axios.get("http://192.168.8.103:19001/getFile")
    .then((result) => setFileURL(result.data)) 
    .catch((error) => console.log(error))
    },[]);
    

const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    setbuttonStatus(true);
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

   console.log(result.name);
  //  console.log(result.uri.split("/").pop());
   

    if (!result.canceled) {
      setbuttonStatus(false);
      setFile(result.uri);
      setFilename(result.uri.split("/").pop());
      setPDFilename(result.name)
    }


    

};


const FilessUpload = async () => {

    const storagee = storage;
    const fileRef = ref(storagee, "images/" + filename);
    const pdf = await fetch(filee);
    const blob = await pdf.blob();

    uploadBytes(fileRef, blob).then((snap) => {
      getDownloadURL(fileRef).then((url) => {
         console.log(url);
         setFileURL(url);
      });
    });

  };


  const FileUrl = () => {
    Axios.post("http://192.168.8.103:19001/fileUpload", {
      fileURL: fileURL,
    })
      .then((res) => console.log(res.data), ToastAndroid.show(
        "File sucessfully added!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      ))
      .catch((error) => console.log(error));
      
  };






return (

<View style={styles.container}>
     
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Button title="Pick file" onPress={  () => pickFile()} />
      {filee && <Text numberOfLines={1} ellipsizeMode={'middle'}  >{ PDFFileName }</Text>}
      <Button disabled={buttonStatus} title="Save" onPress={ () => FilessUpload()} />
      <Button title='Save to DB' onPress={() => FileUrl() }/>
    </View>


    <View>
    
      <FlatList
      data={filedataURL}
      keyExtractor={item => item.file_id}
      renderItem={({item}) => (
        <View> 
        <Text>
          {item.img_id}
        </Text>
        <Text>
          {item.file_url}
        </Text>

        </View> 

      )}
      />



    </View>

    </View>
);
};

export default UploadFile;

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