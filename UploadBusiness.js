import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { Button, FlatList, StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
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
import {bussinessTypes, bussinessesName} from "./BusinessList"
import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from '@expo/vector-icons';


export default function UploadBusiness() {

  //ADDRESS
  const [regionData, setRegionData] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);
  const [barangaynameData, setBarangayname] = useState([]);
  const [selectedRegion, setselectedRegion] = useState("");
  const [selectedProvince, setselectedProvince] = useState("");
  const [selectedCity, setselectedCity] = useState("");
  const [selectedBrgy, setselectedBrgy] = useState("");


  const [businessName, setbusinessName] = useState("");
  const [businessCapital, setbusinessCapital] = useState("");
  const [businessDetails, setbusinessDetails] = useState("");

  const[user, setUser] = useState('');



useEffect(() => {
  provinces("07").then((result) => setProvince(result));
}, []);


    const city = (e) => {
      setselectedProvince(e.province_name);
        cities(e.province_code).then((result) => setCity(result));
        // setProvince(e.province_code);
        // console.log(selectedProvince)
    }

    const brgy = (e) => {
      setselectedCity(e.city_name);
        barangays(e.city_code).then((result) => setBarangay(result));
        // setProvince(e.city_code);
        // console.log(selectedCity)

    }

    const brgyname = (e) => {
      setselectedBrgy(e.brgy_name);
      barangays(e.brgy_code).then((result) => setBarangayname(result));
      // setProvince(e.city_code);
      // console.log(selectedBrgy)

  }



  //to display data
  
  

  const Pitch = () => {
    Axios.post("http://192.168.8.103:19001/pitch", {
      user: user,
      businessName: businessName,
      businessTypeSelectd: businessTypeSelectd,
      businessCapital: businessCapital,
      businessDetails: businessDetails,
      selectedProvince: selectedProvince,
      selectedCity: selectedCity,
      selectedBrgy: selectedBrgy,
      createdAt: createdAt,
      imageURL: imageURL,


    })
      .then((res) =>  
      // {
        ToastAndroid.show("please wait for the approval",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),

        ToastAndroid.show("business succesfully posted!",
        // setbusinessName(""),
        // setbusinessTypeSelectd(""),
        // setbusinessCapital(""),
        // setbusinessDetails(""),
        // setselectedProvince(""),
        // setselectedCity(""),
        // setselectedBrgy(""),
        // setimageURL(""),

        ToastAndroid.LONG,ToastAndroid.BOTTOM),
        navigation.navigate("Entreprenuer")


          
      )
      .catch((error) => console.log(error));
      
  };


 

  useEffect(() => {
    setbusinessType(bussinessTypes())
    // console.log(bussinessTypes())

  }, []);

  const [businessType, setbusinessType] = useState([]);
  const [businessTypeSelectd, setbusinessTypeSelectd] = useState([]);
  const [businessesName, setbusinessesName] = useState([]);
  const [bussNameSelectd, setbussNameSelectd] = useState([]);


  const bussType = (e) => {
    setbusinessTypeSelectd(e.bussiness_type)
    setbusinessesName(bussinessesName(e.bussine_type_code))
    console.log(e.bussiness_type)
    // console.log(businessTypeSelectd)

}


const BussName = (e) => {
  setbussNameSelectd(e.bussiness_name);
  bussinessesName(e.bussiness_name)
  console.log(e.bussiness_name)
  // console.log(bussNameSelectd)

}



//////////////// created
 
  var datee = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hr = new Date().getHours();
  var min = new Date().getMinutes();
  var secs = new Date().getSeconds();

  // You can turn it in to your desired format
  var createdAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;
  // Alert.alert(getCurrentDate);
 

//////////////// updated
 
var datee = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var hr = new Date().getHours();
var min = new Date().getMinutes();
var secs = new Date().getSeconds();

var updatedAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;




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



  const navigation = useNavigation();


  //image
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");
const [imagedataURL, setimagedataURL] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);
const [buttonStatusfile, setbuttonStatusFile] = useState(true);



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



//for file upload


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
    setbuttonStatusFile(true);
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

   console.log(result.name);
  //  console.log(result.uri.split("/").pop());
   

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
       
       {/* <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Pitch Business</Text> */}

       <ScrollView style={styles.View}
      contentContainerStyle={{flexGrow : 1, justifyContent : 'center',padding: "7%"}}>

{/* //for photo */}
    <TouchableOpacity style={styles.itemContainer}  onPress={  () => pickImage()}>
    <View style={styles.photoborder}>

     {image && <Image source={{ uri: image }} style={styles.image2} />}
</View>

<Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} />

      </TouchableOpacity>

      <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Details</Text>
      <Text style={{fontSize:14,paddingRight: "59%",}}>Business Name</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Business Name"
        onChangeText={(text) => setbusinessName(text)}
        value={businessName}
         />
   
       </View>

         <Text style={{fontSize:14,paddingRight: "59%",}}>Capital</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Business Capital"
           onChangeText={(numeric) => setbusinessCapital(numeric)}
           value={businessCapital}
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%",}}>Details</Text>
         <View style={styles.inputContainer}>
         <TextInput
            multiline={true}
        style={styles.input1}
        placeholder="Business Details"
        onChangeText={(text) => setbusinessDetails(text)}
        value={businessDetails}
         />
   
       </View>



       <Text style={{fontSize:14,paddingRight: "59%",}}>Business Name</Text>

 <SelectDropdown
              data={businessType}
              onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index);
              bussType(selectedItem);
              }}
              defaultButtonText={'Business Name'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.bussiness_type;
                
              }}
              rowTextForSelection={(item, index) => {
                return item.bussiness_type;
              }}
              buttonStyle={styles.inputContainerDropdown}
              buttonTextStyle={{fontSize:14, marginRight:"60%", }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={{fontSize:14,}}
            />

<Text style={{fontSize:14,paddingRight: "59%",}}>Business Type</Text>

          <SelectDropdown
              data={businessesName}
              onSelect={(selectedItem, index) => {
              //  console.log(selectedItem, index);
               BussName(selectedItem);
              }}
              defaultButtonText={'Business Type'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.bussiness_name;
                
              }}
              rowTextForSelection={(item, index) => {
                return item.bussiness_name;
              }}
              buttonStyle={styles.inputContainerDropdown}
              buttonTextStyle={{fontSize:14, marginRight:"60%", }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={{fontSize:14,}}
            />
            



            <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Address</Text>
       <Text style={{fontSize:14,paddingRight: "59%",}}>Province</Text>
         <SelectDropdown
        data={provinceData}
        defaultButtonText={'Select province'}

        onSelect={(selectedItem, index) => {
        //   console.log(selectedItem, index);
        city(selectedItem);

        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.province_name;
        }}
        rowTextForSelection={(item, index) => {
          return item.province_name;
        }}

        buttonStyle={styles.inputContainerDropdown}
              buttonTextStyle={{fontSize:14, marginRight:"60%", }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={{fontSize:14,}}

      />
   


       <Text style={{fontSize:14,paddingRight: "59%",}}>Address</Text>
       <View style={{flexDirection:'row'}}>
         <SelectDropdown
        data={cityData}
        defaultButtonText={'Select city'}
        onSelect={(selectedItem, index) => {
            brgy(selectedItem);

        //   console.log(selectedItem, index);

        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.city_name;
        }}
        rowTextForSelection={(item, index) => {
          return item.city_name;
        }}

        buttonStyle={styles.inputContainerDropdownRow}
              buttonTextStyle={{fontSize:14,}}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={{fontSize:14, }}

      />
   
       <SelectDropdown
        defaultButtonText={'Select barangay'}

        data={barangayData}
        onSelect={(selectedItem, index) => {
          brgyname(selectedItem);

        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.brgy_name;
        }}
        rowTextForSelection={(item, index) => {
          return item.brgy_name;
        }}
        buttonStyle={styles.inputContainerDropdownRow}
              buttonTextStyle={{fontSize:14,}}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={15} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={{fontSize:14, }}

      />
       </View>

       <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Upload Credentials</Text>

       {filee && <Text numberOfLines={1} ellipsizeMode={'middle'}  style={{fontSize:14}} >{ PDFFileName }</Text>}

       <TouchableOpacity style={styles.itemContainer1}  onPress={  () => pickFile()}>
    <View style={styles.fileborder}>
              <Text style={{alignSelf:"center",paddingBottom:"2%"}}>Click to Upload File</Text>
              <MaterialIcons style={{alignSelf:"center"}} name="upload-file" size={50} color="grey" />
</View>

<Button disabled={buttonStatusfile} title="Save" onPress={ () => FilessUpload()} />
      <Button title='Save to DB' onPress={() => FileUrl() }/>

      </TouchableOpacity>





<TouchableOpacity style={styles.button}  onPress={() => Pitch()} >
        <Text style={{ color:'#ffffff' }}>Pitch</Text> 
      </TouchableOpacity> 
      </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
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
    buttonn: {
      height: 40,
      width: 280,
      borderRadius: 10,
    },
    text: {
      fontSize: 30,
      fontWeight: "600",
      marginBottom: 30,
    },
    image: {
      width: 150,
      height: 150,
       borderRadius: 170,
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
  
  
  
    inputContainer: {
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
  
    inputContainerDropdownRow: {
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
      width:"50%",
  
    },
  
  
    icon: {
      marginRight: 10,
    },
    input: {
      // flex: 1,
      height: 45,
      width:"80%",
      
  
    },
  
    input1: {
      // flex: 1,
      height: 45,
      width:"80%",
    },
  
    inputbday: {
      // flex: 1,
      height: 45,
      width:"92%",
    },
  
  
    inputdropddown: {
      // flex: 1,
      height: 45,
      width:"80%",
      backgroundColor:"white"
    },
  
  
    inputrow: {
      // flex: 1,
      height: 45,
      width:"50%",
    },
  
  
   View: {
       flex: 1,
       width:"100%",
      //  marginLeft:"20%"
    },
  
    inputError: {
      borderColor: 'red',
    },


    //for photo border

    itemContainer: {
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

      image: {
        width: '50%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
      },
    
      image2: {
        width: '100%',
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 8,
      },
      file: {
        width: '100%',
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 8,
      },


      photoborder: {
        borderColor: '#808080', 
        borderWidth: 0.5 , 
        width: '100%',
        height: 300,  
        borderRadius: 8,
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
  