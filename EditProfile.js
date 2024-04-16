

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
import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import * as ImagePicker from 'expo-image-picker';
import LoadingScreen from "./LoadingScreen";
import {NETWORK_ADDPOCKET} from '@env';


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

  const [showLoader, setShowLoader] = useState(false);


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
      {title: 'Entrepreneur'},
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
    }

    const brgy = (e) => {
      setselectedCity(e.city_name);
        barangays(e.city_code).then((result) => setBarangay(result));

    }

    const brgyname = (e) => {
      setselectedBrgy(e.brgy_name);
      barangays(e.brgy_code).then((result) => setBarangayname(result));
      // setProvince(e.city_code);
      // console.log(selectedBrgy)

  }




  const [userage, setUserAge ] = useState("")
  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };
  const handleSetAge = (birthdate) => {
    setUserAge(calculateAge(birthdate));
  };



    // Function to handle password confirmation
    const [userTypee,setUserType] = useState()

    const findUserType = async () => {
      const result = await AsyncStorage.getItem('userType');
        console.log(result);
        if(!result){
        navigation.navigate("Login")
      
        }
        setUserType(JSON.parse(result))
      };
      
      useEffect(() => {
        findUserType();
      },[])
    
  
  
    
    const Update = async (imageUrl) => {
      try {
        // Your Update function code here, using the 'imageUrl'
        // Example: 
        await Axios.post(`${NETWORK_ADDPOCKET}/updateProfileFinal`, {
          user: useer,
          userType: selecteduserType,
          firstName: firstName,
          lastName: lastName,
          middleName: middleName,
          bDate: bday,
          gender: selectedgender,
          userage: userage,
          contactNum: contactNum,
          email: email,
          pass: pass,
          selectedProvince: selectedProvince,
          selectedCity: selectedCity,
          selectedBrgy: selectedBrgy,
          imageURL: imageUrl,
          createdAt: getCurrentDate,
        })
        .then((res) =>  
        {
          // console.log(res.data)
    
          if(res.data.success)
          {
            handleSubmit(),
            ToastAndroid.show("account succesfully updated!",
            ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            if (userTypee === "entrepreneur") {
              navigation.navigate("Entreprenuer")
            }
            else if (userTypee === "investor") {
              navigation.navigate("Home")
            }
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
    
            
          }
          // setShowLoader(false);
        })
        .catch((error) => console.log(error));
    
        
        // Rest of your Update function logic
      } catch (error) {
        console.error("Update failed:", error);
        // Handle errors here
        throw error; // Throw error to be caught in the calling function
      }
    };
    
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
      Axios.post(`${NETWORK_ADDPOCKET}/getIdFinal`,{
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


// const imagesUpload = async () => {

//   const storagee = storage;
//   const imageRef = ref(storagee, "images/" + imageFilename);
//   const img = await fetch(image);
//   const blob = await img.blob();

//   uploadBytes(imageRef, blob).then((snap) => {
//     getDownloadURL(imageRef).then((url) => {
//        console.log(url);
//       setimageURL(url);
//     });
//   });

// };



const imagesUpload = async () => {
  try {
    const storagee = storage;
    const imageRef = ref(storagee, "images/" + imageFilename);
    const img = await fetch(image);
    const blob = await img.blob();

    const snap = await uploadBytes(imageRef, blob);
    const url = await getDownloadURL(imageRef);

    console.log(url);
    setimageURL(url);

    return url; // Return the URL after image upload
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Throw error to be caught in the calling function
  }
};



const handleLogin = async () => {
  try {
    // Call imagesUpload and wait for image upload to complete
    const imageUrl = await imagesUpload();

    // Now that the image has been uploaded, proceed with Update function
    await Update(imageUrl);

    // Rest of your login logic after the update
  } catch (error) {
    console.error("Updating failed:", error);
    // Handle errors here
  }
};

  
  return (
    <View style={styles.container}>
{profileDisplay.map((item, index) => (

       <ScrollView key={index} style={styles.View}
      contentContainerStyle={{flexGrow : 1, justifyContent : 'center',padding: "7%"}}>

{/* //for photo */}
    <TouchableOpacity style={styles.itemContainer}  onPress={  () => pickImage()}>
    <View style={styles.photoborder}>

     {image && <Image source={{ uri: image }} style={styles.image2} />}
</View>
  <Text style={{fontSize:20, paddingBottom:"1%", fontWeight:"500"}}>{item.user_fname + ' ' + item.user_lname}</Text>
  <Text style={{fontSize:16, paddingBottom:"2%", fontWeight:"500"}}>{item.user_status}</Text>

{/* <Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} /> */}

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
        value={bday ? new Date(bday).toLocaleDateString() : "Birthdate"}

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


       {(item.user_status === "verified") ? (
          null 
        ) : (
    
<TouchableOpacity style={styles.button}  onPress={() => handleLogin()} >
        <Text style={{ color:'#ffffff' }}>Update</Text> 
      </TouchableOpacity> 
      
    
        )
      }



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
  