import Axios from "axios";
import { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
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
import {NETWORK_ADDPOCKET} from '@env';
import LoadingScreen from "./LoadingScreen";
import { Feather } from '@expo/vector-icons';




export default function SignUpAccount() {

  const navigation = useNavigation();
  const [selecteduserType, setselecteduserType] = useState("");
  const [selectedgender, setselectedGender] = useState("");
  const [userType, setuserType] = useState(0);
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
  const [code, setCode] = useState("");

  const [name, setName] = useState("");
  const [data, setData] = useState();
  const [btnVerifyStatus, setBtnVerifyStatus] = useState(true);
  const [verify, setVerify] = useState(false);



  //ADDRESS
  const [generatedCode, setGeneratedCodes] = useState(0);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);
  const [barangaynameData, setBarangayname] = useState([]);
  const [selectedRegion, setselectedRegion] = useState("");
  const [selectedProvince, setselectedProvince] = useState("");
  const [selectedCity, setselectedCity] = useState("");
  const [selectedBrgy, setselectedBrgy] = useState("");
  const [showloader, setShowLoarder] = useState(false);

  const [showloaderModal, setShowLoarderModal] = useState(false);
  const [showVerificationModal, setshowVerificationModal] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false);
  const [userage, setUserAge ] = useState("")

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
  // var dateformat = getyear + '-' + getmonth + '-' + getday;
// Check if date is a valid date object

if (!isNaN(date.getTime())) {
  var dateformat = getyear + '-' + getmonth + '-' + getday;
} else {
  var dateformat = "Birthday"; // Set to an empty string or any default value
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
  }





  

  const Signup = () => {
    setShowLoarder(true);
      Axios.post(`${NETWORK_ADDPOCKET}/signupFinal`, {
      userType: selecteduserType.toLowerCase(),
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      bDate: bday,
      gender: selectedgender,
      userage:userage,
      contactNum: contactNum,
      email: email,
      pass: pass,
      selectedProvince: selectedProvince,
      selectedCity: selectedCity,
      selectedBrgy: selectedBrgy,
      createdAt: getCurrentDate,
      verify:verify

    })
      .then((res) =>  
      {
        // console.log(res.data)

        if(res.data.success)
        {
          handleSubmit(),
          ToastAndroid.show("account succesfully created!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM),
          navigation.navigate("Login")


        }
        else 
        {

            switch(res.data.errorNum) {
              //to test if the email already exist
            case 1062:
              ToastAndroid.show(
                "email already exist!",
                ToastAndroid.SHORT,ToastAndroid.BOTTOM)
                console.log(res.data.failed)
              break;
              }          
        }
        setShowLoarder(false);
        setShowLoarderModal(false)

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

    const handleValidation = () => {

      if (!firstName || !lastName || !middleName || !bday || !selectedgender || !contactNum || !email || !pass || !selectedProvince || !selectedCity || !selectedBrgy) {
        ToastAndroid.show("Please fill in all required fields", 
        ToastAndroid.SHORT, ToastAndroid.BOTTOM);

        return; // Don't proceed with the submission if any field is empty

      }
     else{

          if (pass === confirmPassword) {
          // Passwords match, you can proceed with your logic here.
          setPasswordsMatch(true);
          setShowLoarderModal(true)

          // Signup();

        }
        else {
          // Passwords do not match, display an error message or take appropriate action.
          setPasswordsMatch(false);
          ToastAndroid.show("password doesnt match!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
  
        }

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
    console.log(calculateAge(birthdate))
  };


  // const handleSendPhoneVerfication = () => {

  //   const min = 100000; // Minimum value for a 6-digit number
  //   const max = 999999; // Maximum value for a 6-digit number
  //   const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;    
  //   setGeneratedCodes(randomCode); // Update state with the generated code
  // console.log(generatedCode)
  
  //   if (contactNum) {
  //     Axios.post(`${NETWORK_ADDPOCKET}/sendCodeSms`, {
  //       phonenum: contactNum,
  //       generatedCode:generatedCode,
  //     })
  //       .then((res) => {
  //         if (res.data.status) {
  //           console.log(res.data.message);
  //           ToastAndroid.show("code succesfully sent!",
  //           ToastAndroid.SHORT,ToastAndroid.BOTTOM)
  //           showVerificationModal(true);

  //           // handleShow();
  //         } else {
  //           ToastAndroid.show("error!",
  //           ToastAndroid.SHORT,ToastAndroid.BOTTOM),
  
  //           console.log(res.data.message);
  //           showVerificationModal(true);
  //         }
  //       })
  //       .catch((error) => {
  //         ToastAndroid.show("error!",
  //         ToastAndroid.SHORT,ToastAndroid.BOTTOM),
  
  //         console.log(error.message);
  //         showVerificationModal(true);
  //       });
  //   } else {
  //     console.log("Wrong number");
  //     showVerificationModal(true);
  //   }
  // };

  const handleSendPhoneVerfication = () => {
    const min = 100000; // Minimum value for a 6-digit number
    const max = 999999; // Maximum value for a 6-digit number
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    setGeneratedCodes(randomCode); // Update state with the generated code
    console.log(randomCode);
  
    if (contactNum) {
      Axios.post(`${NETWORK_ADDPOCKET}/sendCodeSms`, {
        phonenum: contactNum,
        generatedCode: randomCode,
      })
        .then((res) => {
          if (res.data.status) {
            console.log(res.data.message);
            ToastAndroid.show("Code successfully sent!", ToastAndroid.SHORT);
            setshowVerificationModal(true);

           // showVerificationModal(true);
          } else {
            ToastAndroid.show("Error!", ToastAndroid.SHORT);
            console.log(res.data.message);
            setshowVerificationModal(true);
          }
        })
        .catch((error) => {
          ToastAndroid.show("Error!", ToastAndroid.SHORT);
          console.log(error.message);
         setshowVerificationModal(true);
        });
    } else {
      console.log("Wrong number");
      setshowVerificationModal(true);
    }
  };
  

  const CheckCode = () => {

    if (parseInt(generatedCode) === parseInt(code)) {
      setBtnVerifyStatus(false);
      setshowVerificationModal(false)
      setVerify(true)

    } 
    
    else{
      ToastAndroid.show("wrong code!",
      ToastAndroid.SHORT,ToastAndroid.BOTTOM)
      setCode("")
    }
  };


  const formatPhoneNumber = (input) => {
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, '');

    // const phoneNumberPattern = /^(09|\+639)\d{9}$|^(02|\(02\)|\+632|\(032\)|\+6332)\d{7}$/;
    // const phoneNumberPattern = /^\+639\d{9}$/;


    // if (phoneNumberPattern.test(cleaned)) {
    //   setIsValidNum(true);

      
    // } else {
    //   setIsValidNum(false);
    // }


    // Check if the number doesn't exceed 12 characters
    if (cleaned.length <= 12) {
      // Add the country code if the number doesn't already start with it
      if (!cleaned.startsWith('639') && !cleaned.startsWith('+639')) {
        setcontactNum('+639' + cleaned);
        // setIsValidNum(true);

      } else {
        setcontactNum('+' + cleaned);
        // setIsValidNum(false);
      }
    }
  };


  const loginCheckNum = () => {
    // setShowLoarder(true);
  
    Axios.post(
      `${NETWORK_ADDPOCKET}/contactConfirm`,
      {
        phonenum: contactNum,
      })
      .then((res) => {
        if (res.data.success) {
         
          console.log("hello")
          handleSendPhoneVerfication();
        } 
        
        else {
          ToastAndroid.show(
            "contact number already in use!",
            ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        }
  
      })
      .catch((error) => {
        console.log(error.message);
        // setBtnStatus(false);
      });
  };
  

  return (

    <View style={styles.container}>
       

       <ScrollView 
      style={styles.View}
      contentContainerStyle={{flexGrow : 1, justifyContent : 'center',padding: "7%"}}>
   
   <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Personal Information</Text>
         <Text style={{fontSize:14,paddingRight: "59%",}}>
         {!firstName  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

         Firstname</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="First Name"
           onChangeText={(text) => setfirstName(text)}
           value={firstName}
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!lastName  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Lastname</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Last Name"
        onChangeText={(text) => setlastName(text)}
        value={lastName}
         />
   
       </View>
       
       <View style={{flexDirection:'row'}}>

       <Text style={{fontSize:14,paddingRight: "30%",}}>
       {!middleName  && (
        <Text style={{color: 'red'}}>*</Text>
      )}
       Middlename
       </Text>
       <Text style={{fontSize:14,paddingRight: "30%",}}>
       {!selectedgender  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Gender</Text>
       </View>
       <View style={{flexDirection:'row'}}>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.inputrow}
           placeholder="Middle Name"
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
              defaultButtonText={'Gender'}
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
       
       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!bday  && (
        <Text style={{color: 'red'}}>*</Text>
      )}
      Birthday</Text>
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
        onPress={() => {setShowCalendar(!showCalendar)
        
        }}


      />

       </View>

       <View style={{flexDirection:'row'}}>
        {showCalendar ? (
        <CalendarPicker width={320} height={320} onDateChange={(res) => {setBday(res), handleSetAge(res)}} />
      ) : (
        ""
      )}
</View>


<Text style={{fontSize:14,paddingRight: "59%",}}>

       Age</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Age"
           onChangeText={(text) => setUserAge(text)}
           value={userage.toString()}


           editable= {false}
           
         />
   
       </View>



       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!contactNum  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Contact Number</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={[styles.inputNum, !isValid && styles.inputError]}
           placeholder="Contact Number"
        // onChangeText={(text) => formatPhoneNumber(text)}
        keyboardType="numeric"
        onChangeText={validatePhoneNumber}
        value={contactNum}
         />
   
       </View>

       {!isValidNum && (
        <Text style={{color: 'red'}}>Invalid contact number</Text>
      )}

      {/* {btnVerifyStatus ?(
        <TouchableOpacity style={styles.confirm}  onPress={() => loginCheckNum()} >
        <Text style={{ color:'#ffffff' }}>Verify</Text> 
      </TouchableOpacity> 

      ):(
        <Text style={{color: 'blue'}}>verified</Text>
      )} */}





       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!selectedProvince  && (
        <Text style={{color: 'red'}}>*</Text>
      )}
       Province</Text>
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
   



       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!selectedCity  && (
        <Text style={{color: 'red'}}>*</Text>
      )}
      Address</Text>
       <View style={{flexDirection:'row'}}>
         <SelectDropdown
        data={cityData}
        defaultButtonText={'Select city'}
        onSelect={(selectedItem, index) => {
            brgy(selectedItem);

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

       <Text style={{fontSize:20, paddingBottom:"2%",fontWeight:"500"}}>Account Information</Text>
       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!selecteduserType  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       User Type</Text>
         {/* <View style={styles.inputContainer}> */}
         <SelectDropdown
              data={userType}
              onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index);
              typeOfUser(selectedItem, index);
              }}
              defaultButtonText={'User Type'}
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
              rowTextStyle={{fontSize:14, }}
            />

       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!email  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Username</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Email"
           onChangeText={(text) => setEmail(text)}
           value={email}
           keyboardType="email-address"
           autoCapitalize="none"
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%"}}>
       {!pass  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Password</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.inputbday}
           secureTextEntry={secureTextEntry}
          onChangeText={validatePassword}
             placeholder="Password"
             value={pass}
         />
         <TouchableOpacity
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

       <Text style={{fontSize:14,paddingRight: "59%"}}>
       {!confirmPassword  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Confirm Password</Text>
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

   
      {showloader ? (
        <TouchableOpacity style={styles.button} >
      <LoadingScreen />

      </TouchableOpacity> 
        ) : (


          <TouchableOpacity style={styles.button} 
          // disabled={btnVerifyStatus}  
          onPress={() => handleValidation()} >
        <Text style={{ color:'#ffffff' }}>Create </Text> 
      </TouchableOpacity> 
      
      
          
          )}

         </ScrollView>



         {showloaderModal ? (
        <Modal
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalView1}>
            <ScrollView>
    
    
        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>
        AGREEMENT TO TERMS
        </Text>           
        
        <Text style={styles.name}>
        These Terms and Conditions Constitute a legally binding agreement
            made between you, whether personally or on behalf of an entity
            (“you”) and BiaS (“we”, “us”, “our”), concerning your access to and
            use BiaS website as well as any other media form, media channel,
            mobile website or mobile application related, linked, or otherwise
            connected there to (collectively, the “BiaS”). You agree that by
            accessing the app and site, you have read, understood and agree to
            be bound by all of these terms and condition, if you do not agree
            with all these terms and condition, then you are expressly
            prohibited from using the app or Site and you must discontinue use
            immediately.         </Text>

         <Text style={styles.name}>
         Terms and Conditions for BiaS        
         </Text>
         <Text style={styles.name}>
         Please read these terms and conditions carefully before using BiaS
            operated by BiaS.        </Text>
         <Text style={styles.name}>
         1. Acceptance of Terms By accessing or using BiaS, you agree to
            comply with and be bound by these terms and conditions. If you do
            not agree to these terms, please do not use the app.{" "}         </Text>
         <Text style={styles.name}>
         2. Changes to Terms BiaS reserves the right to update or modify
            these terms at any time without prior notice. Your continued use of
            the app after any changes constitutes acceptance of the new terms

          </Text>
          <Text style={styles.name}>
          3. Use of the App:{" "}
          </Text>
          <Text style={styles.name}>
          a. BiaS is provided for your personal and non-commercial use only.         </Text>
          <Text style={styles.name}>
          b. You may not use the app for any illegal or unauthorized
              purpose. You agree to comply with all laws and regulations
              applicable to your use of the app.
            </Text>
            <Text style={styles.name}>
            c. You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account.           </Text>
            <Text style={styles.name}>
            4. Privacy Policy Your use of BiaS is also governed by our Privacy
            Policy, which can be found at . Please review the Privacy Policy to
            understand how we collect, use, and disclose information.           </Text>
            <Text style={styles.name}>
            5. Intellectual Property:{" "}              </Text>
              <Text style={styles.name}>
              a. All content and materials available on [Your Business] are the
              property of BiaS and are protected by intellectual property laws.
              </Text>
              <Text style={styles.name}>
              b. You may not reproduce, distribute, modify, or create derivative
              works from any content without express written consent from BiaS.             </Text>

              <Text style={styles.name}>
              6. User-Generated Content:
              </Text>

              <Text style={styles.name}>
              a. Users may submit content to BiaS. By submitting content, you
                grant a non-exclusive, worldwide, royalty-free license to use,
                reproduce, modify, and distribute the content.{" "}              </Text>

              <Text style={styles.name}>
              b. BiaS reserves the right to remove any content that violates
                these terms or is otherwise objectionable.{" "}             </Text>
              <Text style={styles.name}>
              8. Limitation of Liability: To the extent permitted by law, BiaS
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly.{" "}           </Text>

              <Text style={styles.name}>
              9. Governing Law These terms are governed by and construed in
              accordance with the laws of [Your Jurisdiction], without regard to
              its conflict of law principles.{" "}          </Text>

              <Text style={styles.name}>
              Contact Information If you have any questions about these terms,
              please contact us at biascapstone@gmail.com. By using BiaS,
              you agree to these terms and conditions.          </Text>


        <TouchableOpacity style={styles.button}  onPress={() => 
        Signup() 
        // setShowLoarderModal(false)
        } >
        <Text style={{ color:'#ffffff' }}>Agree </Text> 
      </TouchableOpacity> 

</ScrollView>



    
              
            </View>
          </Modal>
          ) : (
            ""
          )}

          <>
{showVerificationModal ? (
    <Modal
        animationType="slide"
        transparent={true}
        visible={showVerificationModal}
        // onRequestClose={() => setModalVisiblee(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalViewVer}>
          <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setshowVerificationModal(false)}
    >
      <Feather name="x-circle" size={24} color="black" />
    </TouchableOpacity>


       <Text style={styles.label}>Enter Verification Code</Text>
      <View style={styles.codeContainer}>

      <TextInput
        style={styles.inputVer}
        placeholder="Enter Code"
        onChangeText={(text) => setCode(text)}
        value={code}
        keyboardType="numeric"

      />

    </View>

      <TouchableOpacity style={styles.buttonCode} onPress={() => CheckCode()}>
        <Text style={{ color: '#ffffff' }}>Send Code</Text>
      </TouchableOpacity>


          </View>
        </View>
      </Modal>
      ) : (
        ""
      )}

</>




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
  button: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#534c88",
  },

  confirm: {
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

  inputNum: {
    // flex: 1,
    height: 45,
    width:"50%",
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

  modalView1: {
    height:"90%",
    width:"95%",
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalViewVer: {
    margin: 20,
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
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 20,
    zIndex: 1, // Ensure it's above the modal content
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
  },

  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,

  },
  inputVer: {
    // flex: 1,
    height: 45,
    width:"75%",
  },
  focusedInput: {
    borderColor: "#534c88", // Change this to the color you want on focus
  },

  buttonCode: {
    width: 200,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#534c88",
  },


});
