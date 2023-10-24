


// import { StyleSheet, Text, View, Image, TextInput,handleSearchTextChange, ScrollView, TouchableOpacity, Button, ToastAndroid, FlatList, image } from 'react-native';
// import React from 'react';
// import { useEffect, useState } from "react";
// import { useNavigation } from '@react-navigation/native';
// import { update } from 'firebase/database';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Axios from "axios";
// import { Ionicons,AntDesign, FontAwesome } from '@expo/vector-icons';
// import CalendarPicker from 'react-native-calendar-picker';
// import SelectDropdown from "react-native-select-dropdown";
// import * as ImagePicker from 'expo-image-picker';
// import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
// import {
//     regions,
//     provinces,
//     cities,
//     barangays,
//   } from "select-philippines-address";
  



// const EditProfile = () => {
//   const navigation = useNavigation();
//   const [isDisabled, setDisabled] = useState(false);
//   const [useSearch, setSearch] = useState("");

//   const [firstName, setfirstName] = useState("");
//   const [lastName, setlastName] = useState("");
//   const [middleName, setmiddleName] = useState("");
//   const [bDate, setbDate] = useState("");
//   const [gender, setGender] = useState("");
//   const [contactNum, setcontactNum] = useState("");
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");


//   const [image, setImage] = useState(null);
// const [imageFilename, setImageFilename] = useState("");
// const [imageURL, setimageURL] = useState("");
// const [buttonStatus, setbuttonStatus] = useState(true);


// // const [imagedataURL, setimagedataURL] = useState([]);

//   //ADDRESS
//   const [regionData, setRegionData] = useState([]);
//   const [provinceData, setProvince] = useState([]);
//   const [cityData, setCity] = useState([]);
//   const [barangayData, setBarangay] = useState([]);
//   const [barangaynameData, setBarangayname] = useState([]);

//   const [selectedRegion, setselectedRegion] = useState("");
//   const [selectedProvince, setselectedProvince] = useState("");
//   const [selectedCity, setselectedCity] = useState("");
//   const [selectedBrgy, setselectedBrgy] = useState("");

//   useEffect(() => {
//     provinces("07").then((result) => setProvince(result));
//   }, []);
//   const city = (e) => {
//     setselectedProvince(e.province_name);
//       cities(e.province_code).then((result) => setCity(result));
//       // setProvince(e.province_code);
//       // console.log(selectedProvince)
//   }

//   const brgy = (e) => {
//     setselectedCity(e.city_name);
//       barangays(e.city_code).then((result) => setBarangay(result));
//       // setProvince(e.city_code);
//       // console.log(selectedCity)

//   }

//   const brgyname = (e) => {
//     setselectedBrgy(e.brgy_name);
//     barangays(e.brgy_code).then((result) => setBarangayname(result));
//     // setProvince(e.city_code);
//     // console.log(selectedBrgy)

// }



//   const [selectedgender, setselectedGender] = useState("");
// const typeOfGender = (e) => {
//       setselectedGender(e.title);
// }


// useEffect(() => {
//     setTimeout(() => {
//       setGender([
//         {title: 'Female'},
//         {title: 'Male'},
//       ]);
//     }, 1000);
//   }, []);

//   var datee = new Date().getDate();
//   var month = new Date().getMonth() + 1;
//   var year = new Date().getFullYear();
//   var hr = new Date().getHours();
//   var min = new Date().getMinutes();
//   var secs = new Date().getSeconds();

//   // You can turn it in to your desired format
//   var getCurrentDate = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;


//   //for calendar bday picking
//   const [bday, setBday] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const date = new Date(bday);


//   var getday = date.toLocaleDateString("default", {day: "2-digit"});
//   var getmonth = date.toLocaleDateString("default",{month: "2-digit"});
//   var getyear = date.toLocaleDateString("default",{ year: "numeric"});
//   var dateformat = getyear + '-' + getmonth + '-' + getday;



//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     setbuttonStatus(true);
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [5, 5],
//       quality: 1,
//     });

//     // console.log(result);

//     if (!result.canceled) {
//         setbuttonStatus(false);
//       setImage(result.assets[0].uri);
//       setImageFilename(result.assets[0].uri.split("/").pop());
//     //   console.log(image);
//     }

// };


// const imagesUpload = async () => {

//     const storagee = storage;
//     const imageRef = ref(storagee, "images/" + imageFilename);
//     const img = await fetch(image);
//     const blob = await img.blob();

//     uploadBytes(imageRef, blob).then((snap) => {
//       getDownloadURL(imageRef).then((url) => {
//          console.log(url);
//         setimageURL(url);
//       });
//     });

//   };


//   const ImageUrl = () => {
//     Axios.post("http://192.168.8.103:19001/image", {
//       imageURL: imageURL,
//     })
//       .then((res) => console.log(res.data), ToastAndroid.show(
//         "Image added!",
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM
//       ))
//       .catch((error) => console.log(error));
      
//   };


//   // const handleSubmit = async (id) => {
//   //   // const getData = { id:name};
//   //   await AsyncStorage.setItem('userID', JSON.stringify(id));
//   // }


//   const fndUser = async () => {
//     const result = await AsyncStorage.getItem('userID');
//       console.log(result);
     
//     };
  



//   const Signup = () => {
//     Axios.post("http://192.168.8.103:19001/updateprofile", {
//       id:  fndUser(),
//       firstName: firstName,
//       lastName: lastName,
//       middleName: middleName,
//       bDate: dateformat,
//       gender: selectedgender,
//       contactNum: contactNum,
//       email: email,
//       pass: pass,
//       selectedProvince: selectedProvince,
//       selectedCity: selectedCity,
//       selectedBrgy: selectedBrgy,
//       createdAt: getCurrentDate,

//     })
//       .then((res) =>  
//       {
//          console.log(res.data)

//         if(res.data.success)
//         {
//           handleSubmit(res.data.results[0].user_id),
//           ToastAndroid.show("account succesfully EDITED!",
//           ToastAndroid.SHORT,ToastAndroid.BOTTOM)
//           // navigation.navigate("Login")

//         }
//         else 
//         {

//       switch(res.data.errorNum) {
//         //to test if the email already exist
//       case 1062:
//         ToastAndroid.show(
//           "email already exist!",
//           ToastAndroid.SHORT,ToastAndroid.BOTTOM)
//         // console.log(res.data.errorNum)
//         break;
//         }
//         // console.log(res.data.errorNum)

          
//         }
//       }
//       )
//       .catch((error) => console.log(error));
      
//   };









//   const handlePresss = () => {
//     setDisabled(true);
//     setTimeout(() => setDisabled(false), 3000);
//   };

//   const [isDisabledd, setDisabledd] = useState(false);

//   const handlePressss = () => {
//     setDisabledd(true);
//     setTimeout(() => setDisabledd(false), 3000);
//   };


//   const[user, setUser] = useState('');
//   const[dataID, setData] = useState([]);

//     useEffect(() => {
//       Axios.post("http://192.168.8.103:19001/testID",{
//         user:user
//       })
//         // .then((res) => setData(res.data.results[0]))
//         .then((res) => setData(res.data.results))

//         //  .then((data) => setData(data)
//         .catch((error) => console.log(error));
//     }, [dataID]);
  

//   const findUser = async () => {
//   const result = await AsyncStorage.getItem('userID');
//     console.log(result);
//     if(!result){
//       navigation.navigate("Login")

//     }
//   setUser(JSON.parse(result))
//   };

//   useEffect(() => {
//     findUser();
//   },[])





  
// return (

// <View style={styles.container}>
// {/* <Text>{user}</Text> */}
// <View style={{flexDirection:'row'}}>
//       <View style={styles.searchContainer}>
//       {/* <TextInput
//           style={styles.searchInput}
//           onChangeText={text => setSearch(text)}
//           placeholder="Search post.."
//           value={useSearch}
//         /> */}
//       </View>

// </View>


// <FlatList
//   data={dataID}
//   keyExtractor={item => item.user_id}
//   renderItem={({item}) => (
//     <ScrollView style={styles.container}>
//     <View style={styles.headerContainer}> 

//     <Image
//         style={styles.coverPhoto}
//         source={require("./assets/background.png")}        
//     />

//      <View style={styles.profileContainer}>
//      <TouchableOpacity  style={styles.profilePhoto} onPress={  () => pickImage()}>


//      {image && <Image  style={styles.profilePhoto} source={{ uri: image }} />}
//         </TouchableOpacity>
//      <Text style={styles.nameText}>{item.user_fname}{item.user_lname}
//     </Text>

//      </View>
//     </View> 

//     <View style={styles.bioContainer}>
//         <Text style={styles.bioText}>
//         Worry weighs a person down; an encouraging word cheers a person up.
//         </Text>
//       </View>

//       <View style={styles.statsContainer}>
//         {/* <View style={styles.statContainer}>
//           <Text style={styles.statCount}>1234</Text>
//           <Text style={styles.statLabel}>Posts</Text>
//         </View>
//         <View style={styles.statContainer}>
//           <Text style={styles.statCount}>5678</Text>
//           <Text style={styles.statLabel}>Followers</Text>
//         </View> */}
//         {/* <View style={styles.statContainer}>
//           <Text style={styles.statCount}>9101</Text>
//           <Text style={styles.statLabel}>Following</Text>
//         </View> */}


//         <View style={styles.inputView}>
//       <TextInput
//         style={styles.inputView}
//         placeholder="First Name"
//         onChangeText={(text) => setfirstName(text)}
//         value={firstName}
//       />
//       </View>

//       <View style={styles.inputView}>
//       <TextInput
//         style={styles.inputView}
//         placeholder="Last Name"
//         onChangeText={(text) => setlastName(text)}
//         value={lastName}
//       />
//       </View>

//       <View style={styles.inputView}>
//       <TextInput
//         style={styles.inputView}
//         placeholder="Middle Name"
//         onChangeText={(text) => setmiddleName(text)}
//         value={middleName}
//       />
//       </View>

// <View style={{flexDirection:'row'}}>
//       <View style={styles.bdayView}>

//       <TextInput
//         style={styles.bdayView}
//         editable= {false}
//         value={dateformat}
//       />

//       </View>

//       <AntDesign 
//       style={{marginTop:"2%"}}
//       name="calendar" size={25} color="black" 
//         onPress={() => setShowCalendar(!showCalendar)}
//       />

// </View>

// <View style={{flexDirection:'row'}}>
//         {showCalendar ? (
//         <CalendarPicker width={320} height={320} onDateChange={(res) => setBday(res)} />
//       ) : (
//         ""
//       )}
// </View>

//       <SelectDropdown
//               data={gender}
//               onSelect={(selectedItem, index) => {
//               // console.log(selectedItem, index);
//               typeOfGender(selectedItem, index);
//               }}
//               defaultButtonText={'Gender'}
//               buttonTextAfterSelection={(selectedItem, index) => {
//                 return selectedItem.title;
                
//               }}
//               rowTextForSelection={(item, index) => {
//                 return item.title;
//               }}
//               buttonStyle={styles.dropdown1BtnStyle}
//               buttonTextStyle={styles.dropdown1BtnTxtStyle}
//               renderDropdownIcon={isOpened => {
//                 return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown1DropdownStyle}
//               rowStyle={styles.dropdown1RowStyle}
//               rowTextStyle={styles.dropdown1RowTxtStyle}
//             />

//       <View style={styles.inputView}>
//       <TextInput
//         style={styles.inputView}
//         placeholder="Contact Number"
//         onChangeText={(text) => setcontactNum(text)}
//         value={contactNum}
//       />
//       </View>

//       <View style={styles.inputView}>
//       <TextInput
//         style={styles.inputView}
//         placeholder="Email"
//         onChangeText={(text) => setEmail(text)}
//         value={email}
//       />
//       </View>

//       <View style={styles.inputView}>

//       <TextInput
//         style={styles.inputView}
//         placeholder="Password"
//         onChangeText={(text) => setPass(text)}
//         secureTextEntry={true}

//         value={pass}
//       />
//       </View>

      
          
//         {/* <View style={styles.dropdownsRow}> */}


       


//         <SelectDropdown
//         data={provinceData}
//         defaultButtonText={'Select province'}

//         onSelect={(selectedItem, index) => {
//         //   console.log(selectedItem, index);
//         city(selectedItem);

//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem.province_name;
//         }}
//         rowTextForSelection={(item, index) => {
//           return item.province_name;
//         }}

//         buttonStyle={styles.dropdown2BtnStyle}
//               buttonTextStyle={styles.dropdown2BtnTxtStyle}
//               renderDropdownIcon={isOpened => {
//                 return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown2DropdownStyle}
//               rowStyle={styles.dropdown2RowStyle}
//               rowTextStyle={styles.dropdown2RowTxtStyle}

//       />

//         <SelectDropdown
//         data={cityData}
//         defaultButtonText={'Select city'}
//         onSelect={(selectedItem, index) => {
//             brgy(selectedItem);

//         //   console.log(selectedItem, index);

//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem.city_name;
//         }}
//         rowTextForSelection={(item, index) => {
//           return item.city_name;
//         }}

//         buttonStyle={styles.dropdown2BtnStyle}
//               buttonTextStyle={styles.dropdown2BtnTxtStyle}
//               renderDropdownIcon={isOpened => {
//                 return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown2DropdownStyle}
//               rowStyle={styles.dropdown2RowStyle}
//               rowTextStyle={styles.dropdown2RowTxtStyle}

//       />
      
//       <SelectDropdown
//         defaultButtonText={'Select barangay'}

//         data={barangayData}
//         onSelect={(selectedItem, index) => {
//           brgyname(selectedItem);

//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem.brgy_name;
//         }}
//         rowTextForSelection={(item, index) => {
//           return item.brgy_name;
//         }}
//         buttonStyle={styles.dropdown2BtnStyle}
//               buttonTextStyle={styles.dropdown2BtnTxtStyle}
//               renderDropdownIcon={isOpened => {
//                 return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={15} />;
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown2DropdownStyle}
//               rowStyle={styles.dropdown2RowStyle}
//               rowTextStyle={styles.dropdown2RowTxtStyle}

//       />



        








//       </View>

//       <TouchableOpacity
//     //   onPress={ () => imagesUpload()}
//     onPress={() => Signup()}
//       style={[ styles.button,
//         isDisabled && styles.appButtonDisabled
//       ]}
//       disabled={isDisabled}
//     >
//       <Text style={styles.buttonText}>Update</Text>
//     </TouchableOpacity>
//     <TouchableOpacity
//       onPress={() => ImageUrl() }		
//       style={[ styles.buttonn,
//         isDisabledd && styles.appButtonDisabled
//       ]}
//       disabled={isDisabledd}
//     >
//       <Text style={styles.buttonText}>Save DB</Text>
//     </TouchableOpacity>


// </ScrollView>

//   )}
//   />





// </View>


// );
// };

// export default EditProfile;

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     alignItems: 'center',
//   },
//   coverPhoto: {
//     width: '100%',
//     height: 200,
//     // backgroundColor: "#534c88",
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginTop: -50,
    
//   },
//   profilePhoto: {
//     width: 110,
//     height: 110,
//     borderRadius: 50,
//     backgroundColor: '#a39cbd',

//   },
//   nameText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   bioContainer: {
//     padding: 15,
//   },
//   bioText: {
//     fontSize: 16,
//   },
//   statsContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',

//     marginTop: 20,
//     marginBottom: 20,
//   },
//   statContainer: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   statCount: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   statLabel: {
//     fontSize: 16,
//     color: '#999',
//   },
//   button: {
//     backgroundColor: '#685f93',
//     borderRadius: 5,
//     padding: 10,
//     marginHorizontal: 20,
//     marginBottom:"3%"
//   },
//   buttonn: {
//     backgroundColor: '#a39cbd',
//     borderRadius: 5,
//     padding: 10,
//     marginHorizontal: 20,
//     marginBottom:"3%"
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   appButtonDisabled: {
//     backgroundColor: "#000"
//   },
//   searchContainer: {
//     width:'85%',
//     padding: "2%",
//     paddingTop:"2%"

//   },
//   searchInput: {
//     height:50,
//     marginTop:"2%",
//     backgroundColor: 'white',
//     borderColor: '#ddd',
//     borderRadius: 8,
//     borderWidth: 1,
//     fontSize: 16,
//     padding: 8,
// borderColor:"#685f93",
//     shadowColor: '#cccccc',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   profile: {
//     width: 55,
//     height: 55,
//     borderRadius: 25,

//   },
//   inputView: {
//     backgroundColor: "#e0dde9",
//     borderRadius: 10,
//     width: "70%",
//     height: 45,
//     marginBottom: 15,
//     alignItems: "center",
//   },
//   bdayView: {
//     backgroundColor: "#e0dde9",
//     borderRadius: 10,
//     width: "65%",
//     height: 45,
//     marginBottom: 15,
//     alignItems: "center",
//   },

//   dropdownsRow: {flexDirection: 'column', width: '100%', paddingHorizontal: '5%'},

//   dropdown1BtnStyle: {
//     flex: 1,
//     height: 50,
//     width:"70%",
//     backgroundColor: '#e0dde9',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e0dde9',
//     marginBottom: 15,

//   },
//   dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
//   dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
//   dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
//   dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
//   divider: {width: 12},
//   dropdown2BtnStyle: {
//     flex: 1,
//     height: 50,
//     width:"70%",
//     backgroundColor: '#e0dde9',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e0dde9',
//     marginBottom: 15,

//   },
//   dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
//   dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
//   dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
//   dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},


//   scrollView: {
//     backgroundColor: 'white',
//     marginHorizontal: "5%",
//      width:"90%"
//   },

//   View: {
//      flex: 1,
//      width:"100%",
//      marginLeft:"20%"
//   },



// });

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


export default function EditProfile() {

  const[useer, setUser] = useState('');
  const navigation = useNavigation();

  const [selecteduserType, setselecteduserType] = useState("");
  const [selectedgender, setselectedGender] = useState("");

  const [userType, setuserType] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [bDate, setbDate] = useState("");
  const [gender, setGender] = useState("");
  const [contactNum, setcontactNum] = useState("");
  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [name, setName] = useState("");
  const [data, setData] = useState();

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

  //for calendar bday picking
  const [bday, setBday] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const date = new Date(bday);

   // Format the date to the desired format
   const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });


  var getday = date.toLocaleDateString("default", {day: "2-digit"});
  var getmonth = date.toLocaleDateString("default",{month: "2-digit"});
  var getyear = date.toLocaleDateString("default",{ year: "numeric"});

// Check if date is a valid date object
if (!isNaN(date.getTime())) {
  var dateformat = getyear + '-' + getmonth + '-' + getday;
} else {
  var dateformat = ""; // Set to an empty string or any default value
}

  // const getCurrentDate=()=>{
 
    var datee = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hr = new Date().getHours();
    var min = new Date().getMinutes();
    var secs = new Date().getSeconds();

    // You can turn it in to your desired format
    var getCurrentDate = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;



//for asyncstoraege

const handleSubmit = async () => {
  const getData = { email:email};
  await AsyncStorage.setItem('getData', JSON.stringify(getData));

}



useEffect(() => {
  setTimeout(() => {
    setuserType([
      {title: 'Entreprenuer'},
      {title: 'Investor'},
    ]);
  }, 1000);
}, []);

useEffect(() => {
  setTimeout(() => {
    setGender([
      {title: 'Female'},
      {title: 'Male'},
    ]);
  }, 1000);
}, []);



useEffect(() => {
  provinces("07").then((result) => setProvince(result));
}, []);


        const user = (e) => {
        provinces(e.region_code).then((result) => setProvince(result));
        // setProvince(e.region_code); use to get the region code so that the province will appear accordingly
        //{"brgy_code": "072217053", "brgy_name": "Pardo (Pob.)", "province_code": "0722", "region_code": "07"} 47
    }

        const typeOfUser = (e) => {
          setselecteduserType(e.title);

        
    }

    const typeOfGender = (e) => {
      setselectedGender(e.title);

    
}





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
  useEffect(() => {
    fetch("http://192.168.8.171:19001/userss")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  

  const Update = () => {
    Axios.post("http://192.168.8.103:19001/updateProfilee", {
      user:useer,
      userType: selecteduserType,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      imageURL:imageURL,
      bDate: dateformat,
      gender: selectedgender,
      contactNum: contactNum,
      email: email,
      pass: pass,
      selectedProvince: selectedProvince,
      selectedCity: selectedCity,
      selectedBrgy: selectedBrgy,
      createdAt: getCurrentDate,

    })
      .then((res) =>  
      {
        // console.log(res.data)

        if(res.data.success)
        {
          handleSubmit(),
          ToastAndroid.show("account succesfully updated!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM),
          navigation.navigate("Home")

        }
        else 
        {

      switch(res.data.errorNum) {
        //to test if the email already exist
      case 1062:
        ToastAndroid.show(
          "email already exist!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        // console.log(res.data.errorNum)
        break;
        }
        // console.log(res.data.errorNum)

          
        }
      }
      )
      .catch((error) => console.log(error));
      
  };


    // Function to handle password confirmation
    const handleConfirmPassword = () => {
      if (pass === confirmPassword) {
        // Passwords match, you can proceed with your logic here.
        setPasswordsMatch(true);
        Signup();
      } else {
        // Passwords do not match, display an error message or take appropriate action.
        setPasswordsMatch(false);
        ToastAndroid.show("password doesnt match!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)

      }
    };

    const [isValid, setIsValid] = useState(true);

    const validatePassword = (text) => {
      // Define a regular expression to check the password
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
  
      if (passwordPattern.test(text)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
  
      setPass(text);
    };
  


  
  
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [secureConfrmTextEntry, setsecureConfrmTextEntry] = useState(true);

  const toggleConfirmPasswordVisibility = () => {
    setsecureConfrmTextEntry(!secureConfrmTextEntry);
  };



  const [isValidNum, setIsValidNum] = useState(true);

  const validatePhoneNumber = (text) => {
    // Remove spaces and special characters
    const sanitizedNumber = text.replace(/[^\d]/g, '');

    // Define a regular expression for a valid Philippine phone number
    const phoneNumberPattern = /^(09|\+639)\d{9}$|^(02|\(02\)|\+632|\(032\)|\+6332)\d{7}$/;

    if (phoneNumberPattern.test(sanitizedNumber)) {
      setIsValidNum(true);
    } else {
      setIsValidNum(false);
    }

    setcontactNum(sanitizedNumber);
  };


  const[profileDisplay, setProfileDisplay] = useState([]);

  useEffect(() => {
    Axios.post("http://192.168.8.103:19001/testID",{
      user:useer
    })
      // .then((res) => setData(res.data.results[0]))
      .then((res) => setProfileDisplay(res.data.results)
      )
  
      //  .then((data) => setData(data)
      .catch((error) => console.log(error));
  
  }, [profileDisplay]);
  


//user id pass
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






  
  return (
    <View style={styles.container}>
       
       {/* <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Pitch Business</Text> */}
{profileDisplay.map((item, index) => (

       <ScrollView key={index} style={styles.View}
      contentContainerStyle={{flexGrow : 1, justifyContent : 'center',padding: "7%"}}>

{/* //for photo */}
    <TouchableOpacity style={styles.itemContainer}  onPress={  () => pickImage()}>
    <View style={styles.photoborder}>

     {image && <Image source={{ uri: image }} style={styles.image2} />}
</View>
  <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>{item.user_fname}{item.user_lname}</Text>


<Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} />

  </TouchableOpacity>


  <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Personal Information</Text>
         <Text style={{fontSize:14,paddingRight: "59%",}}>Firstname</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder={item.user_fname}
           onChangeText={(text) => setfirstName(text)}
           value={firstName}
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%",}}>Lastname</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder={item.user_lname}
        onChangeText={(text) => setlastName(text)}
        value={lastName}
         />
   
       </View>
       
       <View style={{flexDirection:'row'}}>

       <Text style={{fontSize:14,paddingRight: "30%",}}>Middlename</Text>
       <Text style={{fontSize:14,paddingRight: "30%",}}>Gender</Text>
       </View>
       <View style={{flexDirection:'row'}}>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.inputrow}
           placeholder={item.user_mname}
        onChangeText={(text) => setmiddleName(text)}
        value={middleName}
         />
   
       </View>

         <SelectDropdown
              data={gender}
              onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index);
              typeOfGender(selectedItem, index);
              }}
              defaultButtonText={item.user_gender}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
                
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.inputContainerDropdownRow}
              buttonTextStyle={{fontSize:14,}}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={{fontSize:14}}
            />
   

       </View>
       
       <Text style={{fontSize:14,paddingRight: "59%",}}>Birthday</Text>
       <View style={{flexDirection:'row'}}>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.inputbday}
           editable= {false}
        value={dateformat}

         />
   
       </View>

       <AntDesign 
      style={{marginTop:"2%"}}
      name="calendar" size={25} color="black" 
        onPress={() => setShowCalendar(!showCalendar)}
      />

       </View>

       <View style={{flexDirection:'row'}}>
        {showCalendar ? (
        <CalendarPicker width={320} height={320} onDateChange={(res) => setBday(res)} />
      ) : (
        ""
      )}
</View>


       <Text style={{fontSize:14,paddingRight: "59%",}}>Contact Number</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={[styles.input1, !isValid && styles.inputError]}
           placeholder={item.user_contact_num}
        // onChangeText={(text) => setcontactNum(text)}
        keyboardType="numeric"
        onChangeText={validatePhoneNumber}
        value={contactNum}
         />
   
       </View>

       {!isValidNum && (
        <Text style={{color: 'red'}}>Invalid contact number</Text>
      )}



       <Text style={{fontSize:14,paddingRight: "59%",}}>Province</Text>
         <SelectDropdown
        data={provinceData}
        defaultButtonText={item.user_province}

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
        defaultButtonText={item.user_city}
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
        defaultButtonText={item.user_barangay}

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







       <Text style={{fontSize:20, paddingBottom:"2%",fontWeight:"500"}}>Account Information</Text>


       <Text style={{fontSize:14,paddingRight: "59%",}}>User Type</Text>
         {/* <View style={styles.inputContainer}> */}
         <SelectDropdown
              data={userType}
              onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index);
              typeOfUser(selectedItem, index);
              }}
              defaultButtonText={item.user_type}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
                
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.inputContainerDropdown}
              buttonTextStyle={{fontSize:14, marginRight:"60%", }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
              }}
              dropdownIconPosition={'right'}
            //   dropdownStyle={styles.dropdown1DropdownStyle}
            //   rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={{fontSize:14, }}
            />

   
       {/* </View> */}


       <Text style={{fontSize:14,paddingRight: "59%",}}>Username</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder={item.user_email}
           onChangeText={(text) => setEmail(text)}
           value={email}
           keyboardType="email-address"
           autoCapitalize="none"
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%"}}>Password</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.inputbday}
           secureTextEntry={secureTextEntry}
          //  onChangeText={text => setPass(text)}
          onChangeText={validatePassword}
             placeholder="Password"
             value={pass}
         />
         <TouchableOpacity
         //  style={{marginLeft: "65%",}}
           title={secureTextEntry ? 'Show Password' : 'Hide Password'}
           onPress={togglePasswordVisibility}
         >
           <AntDesign name="eye" size={24} color="black" />
         </TouchableOpacity>
   
       </View>

       {!isValid && (
        <Text style={{ fontSize:14,color: 'red' }}>
          Password must be 8-20 characters, contain letters and numbers only, and no spaces, special characters, or emojis.
        </Text>
      )}

       <Text style={{fontSize:14,paddingRight: "59%"}}>Confirm Password</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.inputbday}
           placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={secureConfrmTextEntry}
        value={confirmPassword}
         />
         <TouchableOpacity
         //  style={{marginLeft: "65%",}}
           title={secureConfrmTextEntry ? 'Show Password' : 'Hide Password'}
           onPress={toggleConfirmPasswordVisibility}
         >
           <AntDesign name="eye" size={24} color="black" />
         </TouchableOpacity>
   
       </View>

       {!passwordsMatch && (
        <Text style={{ color: 'red',paddingRight: "40%" }}>Passwords do not match</Text>
      )}







<TouchableOpacity style={styles.button}  onPress={() => Update()} >
        <Text style={{ color:'#ffffff' }}>Update</Text> 
      </TouchableOpacity> 
      </ScrollView>

      ))}
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
        alignItems: 'center',
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
        borderRadius: 150,
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
        width: '62%',
        height: 185,  
        borderRadius: 150,
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
  