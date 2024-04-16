import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { useState } from "react";
import { StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {NETWORK_ADDPOCKET} from '@env';
import LoadingScreen from "./LoadingScreen";


export default function LoginNoVerify() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocusedUser, setIsFocusedUser] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [showloader, setShowLoarder] = useState(false);

  const handleSubmit = async (id) => {
    await AsyncStorage.setItem('userID', JSON.stringify(id));
  }
  const handleUserType = async (type) => {
    await AsyncStorage.setItem('userType', JSON.stringify(type));
  }
  

  const handleLogin = () => {  
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleLoginEntrep = () => {  
    navigation.reset({
      index: 0,
      routes: [{ name: 'Entreprenuer' }],
    });
  };


  const CheckUser = (user) => {
    Axios.post(`${NETWORK_ADDPOCKET}/CheckUserLikes`, {
      user: user,
    })
      .then((res) => {
        if (res.data.success) {
          if (res.data.results.length > 0) {
            const foundUser = res.data.results.find(
              (result) => result.userbusslikes_user_id === user
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
  

// console.log(NETWORK_ADDPOCKET)

  const Login = () => {
    setShowLoarder(true);
      Axios.post(`${NETWORK_ADDPOCKET}/loginPage`, {
      email: email,
      pass: pass,
    })
    
    .then((res) =>  
    {
      if(res.data.success)
      {
        
        if(Platform.OS === "android"){

          if(res.data.results[0].user_type == "entrepreneur" ){
            handleSubmit(res.data.results[0].user_id),
            handleUserType(res.data.results[0].user_type),
            ToastAndroid.show("Welcome Entreprenuer!",
            ToastAndroid.SHORT,ToastAndroid.BOTTOM),
            console.log(res.data.results[0].user_type)

            handleLoginEntrep();
    
  
          }
          else if (res.data.results[0].user_type == "investor" ){
  
            handleSubmit(res.data.results[0].user_id),
            handleUserType(res.data.results[0].user_type),
            console.log(res.data.results[0].user_type)
            CheckUser(res.data.results[0].user_id)

  
          }
        }
      }
      else 
      {

      ToastAndroid.show(
        "Invalid input!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        setEmail("");
        setPass("");

      }
      setShowLoarder(false);
    })
    .catch((error) => console.log(error));
    
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
        style={styles.input}
        secureTextEntry={secureTextEntry}
        onChangeText={text => setPass(text)}
          placeholder="Password"
          autoCapitalize="none"
          value={pass}
          onFocus={handleFocusPass}
        onBlur={handleBlurPass}

          
      />
      <TouchableOpacity
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
          <TouchableOpacity style={styles.button}  onPress={() => Login()} >
        <Text style={{ color:'#ffffff' }}>Login </Text> 
      </TouchableOpacity> 
          
          )}

          
    <Text style={{fontSize:14, marginTop:30}}>Don't have an account?</Text>
    <Text style={{fontSize:14, color:'#534c88', fontWeight:'500'}}  onPress={() => navigation.navigate("Sign Up")}>Signup</Text>
    <Text style={{fontSize:14, color:'#534c88', fontWeight:'500'}}  onPress={() => navigation.navigate("Forgot Password")}>Forgot Password</Text>

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

});


