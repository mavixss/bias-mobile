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




export default function EditPass() {
    const navigation = useNavigation();

const [oldpass, setOldPass] = useState("");
const [user, setUser] = useState("");
const [data, setData] = useState("");

const [showCodeForm, setShowCodeForm] = useState(false)

  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showloaderModal, setShowLoarderModal] = useState(false);

  



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
  const [secureOldTextEntry, setSecureOldTextEntry] = useState(true);


  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleOldPasswordVisibility = () => {
    setSecureOldTextEntry(!secureOldTextEntry);
  };


  const [secureConfrmTextEntry, setsecureConfrmTextEntry] = useState(true);

  const toggleConfirmPasswordVisibility = () => {
    setsecureConfrmTextEntry(!secureConfrmTextEntry);
  };

  useEffect(() => {
    async function fecthUser(){
      const id = await AsyncStorage.getItem('userID');
      setUser(id)
        Axios.post(`${NETWORK_ADDPOCKET}/getIdFinal`,{
          user:id
        })
          .then((res) => {setData(res.data.results[0].user_password)
          console.log(res.data.results[0].user_password)
        }
          )
          .catch((error) => console.log(error));
     }
  
     fecthUser();
    },[])


    const handleUpdateUserPass = () => {
        if (pass === confirmPassword) { // Check if pass matches confirmPassword
            Axios.post(`${NETWORK_ADDPOCKET}/UpdateChangePass`, {
            password: pass,
            user: user
          })
          .then((res) => {
            // console.log(res.data)
            ToastAndroid.show("Password Changed!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            navigation.navigate("Home")
      
          })
          .catch((error) => console.log(error));
        } else {
          // Handle the case where the passwords do not match
          ToastAndroid.show("Password do not match!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          // You can also display an error message or take other actions as needed.
        }
          
      };

  

    const handlePass = () => {
        Axios.post(`${NETWORK_ADDPOCKET}/handlePass`, {
          oldpass: oldpass,
          user: user
      })
      
      .then((res) =>  
      {
        if(res.data.success)
        {
          ToastAndroid.show("Password Match!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
          // console.log(res.data.code)
          setShowCodeForm(true)
        }
        else 
        {
        ToastAndroid.show(
          "Password didnt match!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
          setOldPass("");
    
        }
      })
      .catch((error) => console.log(error));
      
    };



  return (

    <View style={styles.container}>
       

       <ScrollView 
      style={styles.View}
      contentContainerStyle={{flexGrow : 1, justifyContent : 'center',padding: "7%"}}>
   
   {showCodeForm ? (
  <>
    <Text style={{ fontSize: 14, paddingRight: "59%" }}>
      {!pass && <Text style={{ color: 'red' }}>*</Text>}
      Password
    </Text>
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
      <Text style={{ fontSize: 14, color: 'red' }}>
        Password must be 8-20 characters, contain letters and numbers only, and no spaces, special characters, or emojis.
      </Text>
    )}
    <Text style={{ fontSize: 14, paddingRight: "59%" }}>
      {!confirmPassword && <Text style={{ color: 'red' }}>*</Text>}
      Confirm Password
    </Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputbday}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={secureConfrmTextEntry}
        value={confirmPassword}
      />
      <TouchableOpacity
        title={secureConfrmTextEntry ? 'Show Password' : 'Hide Password'}
        onPress={toggleConfirmPasswordVisibility}
      >
        <AntDesign name="eye" size={24} color="black" />
      </TouchableOpacity>
    </View>
    {!passwordsMatch && (
      <Text style={{ color: 'red', paddingRight: "40%" }}>Passwords do not match</Text>
    )}
    <TouchableOpacity style={styles.button} onPress={handleUpdateUserPass}>
      <Text style={{ color: '#ffffff' }}>Submit</Text>
    </TouchableOpacity>
  </>
) : (
  <>
    <Text style={{ fontSize: 14, paddingRight: "59%" }}>
      {!pass && <Text style={{ color: 'red' }}>*</Text>}
      Old Password
    </Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputbday}
        secureTextEntry={secureOldTextEntry}
        placeholder="Password"
        onChangeText={(text) => setOldPass(text)}
        value={oldpass}
      />
      <TouchableOpacity
        title={secureOldTextEntry ? 'Show Password' : 'Hide Password'}
        onPress={toggleOldPasswordVisibility}
      >
        <AntDesign name="eye" size={24} color="black" />
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.button} onPress={handlePass}>
      <Text style={{ color: '#ffffff' }}>Submit</Text>
    </TouchableOpacity>
  </>
)}





       {/* <Text style={{fontSize:14,paddingRight: "59%"}}>
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

   
          <TouchableOpacity style={styles.button}  onPress={() => handleUpdateUserPass()} >
        <Text style={{ color:'#ffffff' }}>Submit </Text> 
      </TouchableOpacity> 
          





          <Text style={{fontSize:14,paddingRight: "59%"}}>
       {!pass  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Old Password</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.inputbday}
           secureTextEntry={secureOldTextEntry}
             placeholder="Password"
           onChangeText={(text) => setOldPass(text)}
             value={oldpass}
         />

         <TouchableOpacity
           title={secureOldTextEntry ? 'Show Password' : 'Hide Password'}
           onPress={toggleOldPasswordVisibility}
         >
           <AntDesign name="eye" size={24} color="black" />
         </TouchableOpacity>
   
       </View>

       <TouchableOpacity style={styles.button}  onPress={() => handlePass()} >
        <Text style={{ color:'#ffffff' }}>Submit </Text> 
      </TouchableOpacity> 
 */}



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
