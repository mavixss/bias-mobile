


import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

  import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import Axios from 'axios';

const UploadFile = () => {

const [filee, setFile] = useState(null);
const [filename, setFilename] = useState("");
const [fileURL, setFileURL] = useState("");
const [filedataURL, setFileDataURL] = useState([]);
const [PDFFileName, setPDFilename] = useState("")
const [buttonStatusfile, setbuttonStatusFile] = useState(true);

const [fileeProfRes, setFileProfRes] = useState(null);
const [filenameProfRes, setFilenameProfRes] = useState("");
const [ProfResfileURL, setProfResFileURL] = useState("");
const [ProfResfiledataURL, setFileProfResDataURL] = useState([]);
const [PDFFileProfRes, setPDFileProfRes] = useState("")
const [buttonStatusProfRes, setbuttonStatusProfRes] = useState(true);

const [fileeCred, setFileCred] = useState(null);
const [filenameCred, setFilenameCred] = useState("");
const [CredfileURL, setCredsFileURL] = useState("");
const [CredfiledataURL, setCredDataURL] = useState([]);
const [PDFFileCred, setPDFileCred] = useState("")
const [buttonStatusCred, setbuttonStatusCred] = useState(true);

  const pickFile = async () => {
    setbuttonStatusFile(true);
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });
   console.log(result.name);
    if (!result.canceled) {
      setbuttonStatusFile(false);
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

  const urlsArray = []; // Array to store URLs

  uploadBytes(fileRef, blob).then((snap) => {
    getDownloadURL(fileRef).then((url) => {
      urlsArray.push(url); // Push the URL into the array
      setFileURL(urlsArray);
      console.log(urlsArray);
    });
  });

  return urlsArray;
};


const pickFileProfRes = async () => {
  setbuttonStatusProfRes(true);
  let result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf',
  });
 console.log(result.name);
  if (!result.canceled) {
    setbuttonStatusProfRes(false);
    setFileProfRes(result.uri);
    setFilenameProfRes(result.uri.split("/").pop());
    setPDFileProfRes(result.name)
  }

};


const ProfResUpload = async () => {
const storagee = storage;
const fileRef = ref(storagee, "images/" + filenameProfRes);
const pdf = await fetch(fileeProfRes);
const blob = await pdf.blob();

const urlsArray = []; // Array to store URLs

uploadBytes(fileRef, blob).then((snap) => {
  getDownloadURL(fileRef).then((url) => {
    urlsArray.push(url); // Push the URL into the array
    setProfResFileURL(urlsArray);
    console.log(urlsArray);
  });
});

return urlsArray;
};


const pickFileCred = async () => {
  setbuttonStatusCred(true);
  let result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf',
  });
 console.log(result.name);
  if (!result.canceled) {
    setbuttonStatusCred(false);
    setFileCred(result.uri);
    setFilenameCred(result.uri.split("/").pop());
    setPDFileCred(result.name)
  }

};


const CredUpload = async () => {
const storagee = storage;
const fileRef = ref(storagee, "images/" + filenameCred);
const pdf = await fetch(fileeCred);
const blob = await pdf.blob();

const urlsArray = []; // Array to store URLs

uploadBytes(fileRef, blob).then((snap) => {
  getDownloadURL(fileRef).then((url) => {
    urlsArray.push(url); // Push the URL into the array
    setCredsFileURL(urlsArray);
    console.log(urlsArray);
  });
});

return urlsArray;
};


return (

<View style={styles.container}>
     
<Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>
       {!fileURL  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Business Registration, Permits and License Files</Text>

       {filee && <Text numberOfLines={1} ellipsizeMode={'middle'}  style={{fontSize:14}} >File Attached: { PDFFileName }</Text>}

       <TouchableOpacity style={styles.itemContainer1}  onPress={  () => pickFile()}>
    <View style={styles.fileborder}>
              <Text style={{alignSelf:"center",paddingBottom:"2%"}}>Click to Upload File</Text>
              <MaterialIcons style={{alignSelf:"center"}} name="upload-file" size={50} color="grey" />
</View>

<Button disabled={buttonStatusfile} title="Save" onPress={ () => FilessUpload()} />

      </TouchableOpacity>


      <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>
           {!ProfResfileURL  && (
            <Text style={{color: 'red'}}>*</Text>
          )}
    
           Business Registration, Permits and License Files</Text>
    
           {fileeProfRes && <Text numberOfLines={1} ellipsizeMode={'middle'}  style={{fontSize:14}} >File Attached: { PDFFileProfRes }</Text>}
    
           <TouchableOpacity style={styles.itemContainer1}  onPress={  () => pickFileProfRes()}>
        <View style={styles.fileborder}>
                  <Text style={{alignSelf:"center",paddingBottom:"2%"}}>Click to Upload File</Text>
                  <MaterialIcons style={{alignSelf:"center"}} name="upload-file" size={50} color="grey" />
    </View>
    
    <Button disabled={buttonStatusProfRes} title="Save" onPress={ () => ProfResUpload()} />
    
          </TouchableOpacity>

          <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>
           {!CredfileURL  && (
            <Text style={{color: 'red'}}>*</Text>
          )}
    
           Business Registration, Permits and License Files</Text>
    
           {fileeCred && <Text numberOfLines={1} ellipsizeMode={'middle'}  style={{fontSize:14}} >File Attached: { PDFFileCred }</Text>}
    
           <TouchableOpacity style={styles.itemContainer1}  onPress={  () => pickFileCred()}>
        <View style={styles.fileborder}>
                  <Text style={{alignSelf:"center",paddingBottom:"2%"}}>Click to Upload File</Text>
                  <MaterialIcons style={{alignSelf:"center"}} name="upload-file" size={50} color="grey" />
    </View>
    
    <Button disabled={buttonStatusCred} title="Save" onPress={ () => CredUpload()} />
    
          </TouchableOpacity>


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

  itemContainer1: {
    // flex: 1,
    padding: 5,
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection:  'column',

    marginHorizontal:10,
    marginVertical:10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom:10,
    borderBottomWidth:0.5,
    borderBottomColor:'#808080',
    padding:10,
    

  },

  fileborder: {
    borderColor: '#808080', 
    borderWidth: 0.5 , 
    width: '100%',
    height: 90,  
    borderRadius: 8 ,
    borderStyle: 'dashed',
    
},


});