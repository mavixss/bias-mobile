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

export default function PitchBusiness() {

  const navigation = useNavigation();


  //image
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");
const [imagedataURL, setimagedataURL] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);


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


  return (
    <View style={styles.container}>
       


      <Text style={styles.text}>Pitch Business</Text>
      <View style={styles.card}>
      <View style={{flexDirection:'row'}}>

      <TextInput
        style={styles.input1}
        placeholder="Business Name"
        onChangeText={(text) => setbusinessName(text)}
        value={businessName}
      />

    <TextInput
        style={styles.input2}
        placeholder="Business Capital"
        onChangeText={(numeric) => setbusinessCapital(numeric)}
        value={businessCapital}
      />
      
</View>

    <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Business Details"
        onChangeText={(text) => setbusinessDetails(text)}
        value={businessDetails}
      />

    <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>

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
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />

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
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />


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

        buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}

      />

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

        buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}

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
        buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={15} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}

      />

<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

<Button title="Upload Photo" onPress={  () => pickImage()} />
{image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
<Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} />
{/* <Button title='Save to DB' onPress={() => Pitch() }/> */}
</View>

<TouchableOpacity style={styles.button}  onPress={() => Pitch()} >
        <Text style={{ color:'#ffffff' }}>Pitch</Text> 
      </TouchableOpacity> 

          </ScrollView>

          
      
      </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    marginTop: 5,
    width: '90%',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 6,
    width: '100%',
  },
  input1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 6,
    width: '50%',
    marginRight:5
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 6,
    width: '50%',
    fontWeight: "600",

  },
  
  inputView: {
    backgroundColor: "#e0dde9",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 15,
    alignItems: "center",
  },

  bdayView: {
    backgroundColor: "#e0dde9",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 15,
    alignItems: "center",
  },

  button: {
    width: "80%",
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
    marginBottom: 5,
  },
  image: {
    width: 140,
    height: 140,
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
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: "5%",
     width:"90%"
  },

  View: {
     flex: 1,
     width:"100%",
     marginLeft:"20%"
  },


  dropdownsRow: {flexDirection: 'column', width: '100%', paddingHorizontal: '5%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    width:"40%",
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0dde9',
    marginBottom: 8,

  },
  dropdown1BtnTxtStyle: {color: '#444', fontSize:14,  textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', fontSize:14, textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    width:"70%",
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0dde9',
    marginBottom: 8,

  },
  dropdown2BtnTxtStyle: {color: '#444', fontSize:14, textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444',fontSize:14, textAlign: 'left'},

  inputBusinessView: {
    backgroundColor: "#e0dde9",
    borderRadius: 10,
    width: "99%",
    height: 60,
    marginBottom: 15,
    // alignItems: "center",
  },

  inputView: {
    // borderWidth: 1,
    // borderColor: 'black',
    margin: 4,
    marginTop: 2,
    fontSize: 16,
  },


});
