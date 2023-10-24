import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
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


export default function SignUpAccount() {

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

  

  const Signup = () => {
    Axios.post("http://192.168.8.103:19001/signup", {
      userType: selecteduserType,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
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



  return (

    <View style={styles.container}>
       

       <ScrollView 
      style={styles.View}
      contentContainerStyle={{flexGrow : 1, justifyContent : 'center',padding: "7%"}}>
   
   <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Personal Information</Text>
         <Text style={{fontSize:14,paddingRight: "59%",}}>Firstname</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="First Name"
           onChangeText={(text) => setfirstName(text)}
           value={firstName}
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%",}}>Lastname</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Last Name"
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
           placeholder="Contact Number"
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







       <Text style={{fontSize:20, paddingBottom:"2%",fontWeight:"500"}}>Account Information</Text>


       <Text style={{fontSize:14,paddingRight: "59%",}}>User Type</Text>
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
            //   dropdownStyle={styles.dropdown1DropdownStyle}
            //   rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={{fontSize:14, }}
            />

   
       {/* </View> */}


       <Text style={{fontSize:14,paddingRight: "59%",}}>Username</Text>
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





       













   
   
         
      <TouchableOpacity style={styles.button}  onPress={() => handleConfirmPassword()} >
        <Text style={{ color:'#ffffff' }}>Create </Text> 
      </TouchableOpacity> 
        
   
         
       
   
       
         </ScrollView>
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

});
