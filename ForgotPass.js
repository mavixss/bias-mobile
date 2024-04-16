import React, { useState,useEffect } from 'react';
import axios from "axios";
import { Button, FlatList, StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {NETWORK_ADDPOCKET} from '@env';
import { AntDesign } from '@expo/vector-icons';

const ForgotPasswordCodeInput = () => {
  const navigation = useNavigation();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [email, setEmail] = useState("")
  const [showChangePass, setshowChangePass] = useState(false)
  const [showCodeForm, setShowCodeForm] = useState(false)
  // const [generatedCode, setGeneratedCode] = useState('')
  const inputRefs = Array(4).fill(0).map((_, index) => React.createRef());

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isFocusedConfrmPass, setIsFocusedConfrmPass] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState("");


  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };

  const handleBlurEmail = () => {
    setIsFocusedEmail(false);
  };

  const handleFocusPass = () => {
    setIsFocusedPass(true);
  };

  const handleBlurPass = () => {
    setIsFocusedPass(false);
  };

  const handleFocusCnfrmPass = () => {
    setIsFocusedConfrmPass(true);
  };

  const handleBlurCnfrmPass = () => {
    setIsFocusedConfrmPass(false);
  };




  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [secureConfrmTextEntry, setsecureConfrmTextEntry] = useState(true);
  const toggleConfirmPasswordVisibility = () => {
    setsecureConfrmTextEntry(!secureConfrmTextEntry);
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




  const handleSubmit = () => {
    // const enteredCode = code.join('');

    if (code.length !== 6) {
      setError('Please enter a 4-digit code.');
    } 
    else {
      setError('');
      if (parseInt(code) === parseInt(generatedCodes)) {
        ToastAndroid.show("Code Match!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        console.log('Code submitted:', code);
        setshowChangePass(true)
    }
    else {
        alert("Wrong code")
    }

    }
  };


const handleUpdateUserPass = () => {
  if (pass === confirmPassword) { // Check if pass matches confirmPassword
      axios.post(`${NETWORK_ADDPOCKET}/UpdateUserPass`, {
      password: pass,
      email: email
    })
    .then((res) => {
      // console.log(res.data)
      ToastAndroid.show("Password Changed!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      navigation.navigate("Login")

    })
    .catch((error) => console.log(error));
  } else {
    // Handle the case where the passwords do not match
    ToastAndroid.show("Password do not match!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    // You can also display an error message or take other actions as needed.
  }
    
};


const handleLoginCode = () => {
  const min = 100000; // Minimum value for a 6-digit number
  const max = 999999; // Maximum value for a 6-digit number
  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;    
  setGeneratedCodes(randomCode); // Update state with the generated code
  // console.log("randomCode")
  console.log(randomCode)



  axios.post(`${NETWORK_ADDPOCKET}/sendCodetoEmail`, {
    email: email,
    code: randomCode, // Use the generated code directly in the POST request
  })
    .then((res) => {
      console.log(res.data.message)
    })
    .catch((error) => console.log(error));
};        



const handleSendCode = () => {
    axios.post(`${NETWORK_ADDPOCKET}/handleSendCode`, {
      email: email,
  })
  
  .then((res) =>  
  {
    if(res.data.success)
    {
      ToastAndroid.show("Email Verify!",
      ToastAndroid.SHORT,ToastAndroid.BOTTOM)
      // console.log(res.data.code)
      handleLoginCode();
      setShowCodeForm(true)
    }
    else 
    {
    ToastAndroid.show(
      "Invalid email!",
      ToastAndroid.SHORT,ToastAndroid.BOTTOM)
      setEmail("");
      setPass("");

    }
  })
  .catch((error) => console.log(error));
  
};





  return (
    <View>
    {showChangePass ? (
    <View style={styles.container}>
<Text style={{fontSize:14,paddingRight: "80%"}}>Password</Text>
         <View style={[styles.inputContainer, isFocusedPass && styles.focusedInput]}>
         <TextInput
           style={styles.inputbday}
           secureTextEntry={secureTextEntry}
          //  onChangeText={text => setPass(text)}
          onChangeText={validatePassword}
             placeholder="Password"
             value={pass}
             autoCapitalize="none"
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

       {!isValid && (
        <Text style={{ fontSize:14,color: 'red' }}>
          Password must be 8-20 characters, contain letters and numbers only, and no spaces, special characters, or emojis.
        </Text>
      )}

       <Text style={{fontSize:14,paddingRight: "66%"}}>Confirm Password</Text>
       <View style={[styles.inputContainer, isFocusedConfrmPass && styles.focusedInput]}>
         <TextInput
           style={styles.inputbday}
           placeholder="Confirm Password"
           onChangeText={(text) => setConfirmPassword(text)}
           secureTextEntry={secureConfrmTextEntry}
           value={confirmPassword}
           autoCapitalize="none"
           onFocus={handleFocusCnfrmPass}
           onBlur={handleBlurCnfrmPass}
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

      <TouchableOpacity style={styles.button}  onPress={() => handleUpdateUserPass()}>
        <Text style={{ color: '#ffffff' }}>Submit</Text>
      </TouchableOpacity>
      </View>
 ) : (
  <View>
{showCodeForm ? (
<View style={styles.container}>
       <Text style={styles.label}>Enter Verification Code:</Text>
      <View style={styles.codeContainer}>

        <TextInput
        style={styles.input1}
        placeholder="Enter Code"
        onChangeText={(text) => setCode(text)}
        value={code}
        keyboardType="numeric"

      />

      </View>
      <Text style={styles.errorText}>{error}</Text>

      <TouchableOpacity style={styles.button}  onPress={() => handleSubmit()}>
        <Text style={{ color: '#ffffff' }}>Send Code</Text>
      </TouchableOpacity>
</View>

) : (

<View style={styles.container}>

   <Text style={{fontSize:14,paddingRight: "80%"}}>Email</Text>
   <View style={[styles.inputContainer, isFocusedEmail && styles.focusedInput]}>
         <TextInput
           style={styles.inputbday}
           placeholder="Enter Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        onFocus={handleFocusEmail}
        onBlur={handleBlurEmail}
         />
       </View>

       <TouchableOpacity style={styles.button} onPress={() => handleSendCode()}>
        <Text style={{ color: '#ffffff' }}>Submit</Text>
      </TouchableOpacity>
      </View>
      )}
</View>
 )}
</View>


  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: 'row',
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
  button: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: '#534c88',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
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
  inputbday: {
    // flex: 1,
    height: 45,
    width:"92%",
  },
  focusedInput: {
    borderColor: "#534c88", // Change this to the color you want on focus
  },


});

export default ForgotPasswordCodeInput;



