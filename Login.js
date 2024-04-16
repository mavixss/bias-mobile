import React, { useState,useEffect } from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { StyleSheet, Text, View, ToastAndroid, Image, Modal, TextInput, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {NETWORK_ADDPOCKET} from '@env';
import { Feather } from '@expo/vector-icons';
import LoadingScreen from "./LoadingScreen";

export default function Login() {

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocusedUser, setIsFocusedUser] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [modalVisiblee, setModalVisiblee] = useState(false);
  const [code, setCode] = useState("");
  const inputRefs = Array(4).fill(0).map((_, index) => React.createRef());
  const [generatedCodes, setGeneratedCodes] = useState("");
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");
  const [showloader, setShowLoarder] = useState(false);


  const [showVerificationModal, setshowVerificationModal] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false);

  const handleSubmit = async (id) => {
    // const getData = { id:name};
    await AsyncStorage.setItem('userID', JSON.stringify(id));
  }
  
  const handleUserType = async (type) => {
    // const getData = { id:name};
    await AsyncStorage.setItem('userType', JSON.stringify(type));
  }
  

  const handleLogin = () => {  
    // After successful login, reset the navigation stack to remove the login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleLoginEntrep = () => {  
    // After successful login, reset the navigation stack to remove the login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Entreprenuer' }],
    });
  };
  // Example usage


  const CheckUser = () => {
    Axios.post(`${NETWORK_ADDPOCKET}/CheckUserLikes`, {
      user: userID,
    })
      .then((res) => {
        if (res.data.success) {
          if (res.data.results.length > 0) {
            const foundUser = res.data.results.find(
              (result) => result.userbusslikes_user_id === userID
            );
  
            if (foundUser) {
              handleLogin();
              ToastAndroid.show("Welcome Investor!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            } else {
              navigation.navigate("BusinessLikes");
            }
          } else {
            // Handle scenario when results array is empty
            navigation.navigate("BusinessLikes");
          }
        } else {
          console.log(res.data.error);
        }
      })
      .catch((error) => console.log(error));
  };


  const handleLoginCode = () => {
    const min = 100000; // Minimum value for a 6-digit number
    const max = 999999; // Maximum value for a 6-digit number
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;    
    setGeneratedCodes(randomCode); // Update state with the generated code
    // console.log("randomCode")
    console.log(randomCode)
  
    Axios.post(`${NETWORK_ADDPOCKET}/sendCodetoEmail`, {
      email: email,
      code: randomCode, // Use the generated code directly in the POST request
    })
      .then((res) => {
        console.log(res.data.message)
        // console.log(res.data.code)
        // setVerCode(res.data.code)


      })
      .catch((error) => console.log(error));
  };
  


  const loginCheckUser = () => {
    setShowLoarder(true);

    Axios.post(
      `${NETWORK_ADDPOCKET}/loginPage`,
      {
        email: email,
        pass: pass,
      })
      .then((res) => {
        if (res.data.success) {
          setshowVerificationModal(true);

          console.log(res.data.message),
          handleSubmit(res.data.results[0].user_id),
          handleUserType(res.data.results[0].user_type),
          setUserType(res.data.results[0].user_type),
          setUserID(res.data.results[0].user_id)
          setshowVerificationModal(true);
          handleLoginCode();


        } 
        
        else {
          ToastAndroid.show(
            "Invalid input!",
            ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    
          console.log(res.data.message);
          setBtnStatus(false);
        }
        setShowLoarder(false);

      })
      .catch((error) => {
        console.log(error.message);
        setBtnStatus(false);
      });
  };







  const Login = () => {

    if (parseInt(generatedCodes) === parseInt(code)) {
      setBtnStatus(false);
      console.log(userType);

      if(Platform.OS === "ios"){
        if(userType === "entrepreneur" ){
           alert("Welcome Entreprenuer!"),
          navigation.navigate("Entreprenuer")
          handleLoginEntrep();
  

        }
        else if (userType === "investor" ){

        //   alert("Welcome Investor!"),
        //   navigation.navigate("Home")
          CheckUser();

        }
        
      }
      else if(Platform.OS === "android"){

        if(userType === "entrepreneur" ){
          ToastAndroid.show("Welcome Entreprenuer!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM),
          navigation.navigate("Entreprenuer")
          handleLoginEntrep();
  

        }
        else if (userType === "investor" ){

        //   ToastAndroid.show("Welcome Investor!",
        //   ToastAndroid.SHORT,ToastAndroid.BOTTOM),
        //   navigation.navigate("Home")
        //   handleLogin();
        CheckUser();


        }
      }
    } 
    
    // else if (enteredCode.length !== 4) {
    //   ToastAndroid.show("Please enter a 4-digit code!",
    //   ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    // }

    else{
      ToastAndroid.show("wrong code!",
      ToastAndroid.SHORT,ToastAndroid.BOTTOM)
      setCode("")
      

    }
  };



  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };


  const handleFocusUser = () => {
    setIsFocusedUser(true);
  };

  const handleBlurUser = () => {
    setIsFocusedUser(false);
  };

  const handleFocusPass = () => {
    setIsFocusedPass(true);
  };

  const handleBlurPass = () => {
    setIsFocusedPass(false);
  };


  return (
    <View style={styles.container}>
       

 <Image style={styles.image} source={require("./assets/profilee.png")} /> 

      <Text style={styles.text}>Log in</Text>
      <Text style={{fontSize:14,paddingRight: "59%",}}>Username</Text>
      <View style={[styles.inputContainer, isFocusedUser && styles.focusedInput]}>
      <TextInput
        style={styles.input1}
        placeholder="Username"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        onFocus={handleFocusUser}
        onBlur={handleBlurUser}

      />

    </View>


    <Text style={{fontSize:14,paddingRight: "59%"}}>Password</Text>
    <View style={[styles.inputContainer, isFocusedPass && styles.focusedInput]}>
      <TextInput
        style={styles.inputPass}
        secureTextEntry={secureTextEntry}
        onChangeText={text => setPass(text)}
          placeholder="Password"
          autoCapitalize="none"
          value={pass}
          onFocus={handleFocusPass}
        onBlur={handleBlurPass} 
      />

      
      <TouchableOpacity
      //  style={{marginLeft: "65%",}}
        title={secureTextEntry ? 'Show Password' : 'Hide Password'}
        onPress={togglePasswordVisibility}
      >
        <AntDesign name="eye" size={24} color="black" />
      </TouchableOpacity>

    </View>
      
    {showloader ? (
        <TouchableOpacity style={styles.button} >
      <LoadingScreen />

      </TouchableOpacity> 
        ) : (
          <TouchableOpacity style={styles.button}  onPress={() => loginCheckUser()} >
        <Text style={{ color:'#ffffff' }}>Login </Text> 
      </TouchableOpacity> 
          
          )}

     

      
    <Text style={{fontSize:14, marginTop:30}}>Don't have an account?</Text>
    <Text style={{fontSize:14, color:'#534c88', fontWeight:'500'}}  onPress={() => navigation.navigate("Sign Up")}>Signup</Text>
    <Text style={{fontSize:14, color:'#534c88', fontWeight:'500'}}  onPress={() => navigation.navigate("LoginNoVerify")}>Forgot Password</Text>

<>
{showVerificationModal ? (
    <Modal
        animationType="slide"
        transparent={true}
        visible={showVerificationModal}
        // onRequestClose={() => setModalVisiblee(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
          <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setshowVerificationModal(false)}
    >
      <Feather name="x-circle" size={24} color="black" />
    </TouchableOpacity>


       <Text style={styles.label}>Enter Verification Code</Text>
      <View style={styles.codeContainer}>

      <TextInput
        style={styles.input1}
        placeholder="Enter Code"
        onChangeText={(text) => setCode(text)}
        value={code}
        keyboardType="numeric"

      />

    </View>

      <TouchableOpacity style={styles.buttonCode} onPress={() => Login()}>
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
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#534c88",
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

  buttonn: {
    height: 40,
    width: 280,
    borderRadius: 10,
  },
  text: {
    fontSize: 32,
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
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    // flex: 1,
    height: 45,
    width:"70%",
  },
  input1: {
    // flex: 1,
    height: 45,
    width:"75%",
  },
  focusedInput: {
    borderColor: "#534c88", // Change this to the color you want on focus
  },

  modalView: {
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
  input: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    marginHorizontal: 4,
    borderRadius: 12,
  },

  
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 20,
    zIndex: 1, // Ensure it's above the modal content
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
  },

  inputPass: {
    // flex: 1,
    height: 45,
    width:"70%",
  },



});


