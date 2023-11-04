import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {NETWORK_ADD} from '@env';

export default function Login() {
  const networkAdd = NETWORK_ADD;
console.log(networkAdd)
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState();


  const handleSubmit = async (id) => {
    // const getData = { id:name};
    await AsyncStorage.setItem('userID', JSON.stringify(id));
  }
  

  const removeItem = async () => {
  await AsyncStorage.removeItem('userID' ,(error) => console.log(error))    
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



  const Login = () => {
    // Axios.post("http://192.168.8.103:19001/testLogin", {
      Axios.post(`${NETWORK_ADD}:19001/testLogin`, {
      email: email,
      pass: pass,
    })
    
    .then((res) =>  
    {
      // console.log(res.data)

      if(res.data.success)
      {

        // AsyncStorage.setItem("auth", JSON.stringify(true)) // prevent from going back to login

        // if(res.data.results[0].user_type == "Entreprenuer" ){
        //   handleSubmit(res.data.results[0].user_id),
        //   ToastAndroid.show("Welcome Entreprenuer!",
        //   ToastAndroid.SHORT,ToastAndroid.BOTTOM),
        //   navigation.navigate("Entreprenuer")
        //   handleLoginEntrep();
  

        // }
        // else if (res.data.results[0].user_type == "Investor" ){

        //   handleSubmit(res.data.results[0].user_id),
        //   ToastAndroid.show("Welcome Investor!",
        //   ToastAndroid.SHORT,ToastAndroid.BOTTOM),
        //   navigation.navigate("Home")
        //   handleLogin();

        // }


        // handleSubmit(res.data.results[0].user_id),
        // ToastAndroid.show("Welcome user!",
        // ToastAndroid.SHORT,ToastAndroid.BOTTOM),
        // navigation.navigate("Home")
        // handleLogin();
        // navigation.navigate("Profile")

        if(Platform.OS === "ios"){

          if(res.data.results[0].user_type == "Entreprenuer" ){
            handleSubmit(res.data.results[0].user_id),
             alert("Welcome Entreprenuer!"),
            navigation.navigate("Entreprenuer")
            handleLoginEntrep();
    
  
          }
          else if (res.data.results[0].user_type == "Investor" ){
  
            handleSubmit(res.data.results[0].user_id),
            alert("Welcome Investor!"),
            navigation.navigate("Home")
            handleLogin();
  
          }
  
          // alert("Welcome")
          
        }
        else if(Platform.OS === "android"){

          if(res.data.results[0].user_type == "entreprenuer" ){
            handleSubmit(res.data.results[0].user_id),
            ToastAndroid.show("Welcome Entreprenuer!",
            ToastAndroid.SHORT,ToastAndroid.BOTTOM),
            navigation.navigate("Entreprenuer")
            handleLoginEntrep();
    
  
          }
          else if (res.data.results[0].user_type == "investor" ){
  
            handleSubmit(res.data.results[0].user_id),
            ToastAndroid.show("Welcome Investor!",
            ToastAndroid.SHORT,ToastAndroid.BOTTOM),
            navigation.navigate("Home")
            handleLogin();
  
          }
  
          

        }
  
  
      }
      else 
      {

        // console.log(res.data)


    // switch(res.data.errorNum) {
    //   //to test if the email already exist
    // case 1062:
      // ToastAndroid.show(
      //   "email doesnt exist!",
      //   ToastAndroid.SHORT,ToastAndroid.BOTTOM)
      // console.log(res.data.errorNum)
      // break;
      // }
      // console.log(res.data.errorNum)

      ToastAndroid.show(
        "Invalid input!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        setEmail("");
        setPass("");

      }
    })
    .catch((error) => console.log(error));
    
};


  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };


  


  return (
    <View style={styles.container}>
       

 <Image style={styles.image} source={require("./assets/profilee.png")} /> 

      <Text style={styles.text}>Login</Text>
      <Text style={{fontSize:14,paddingRight: "59%",}}>Username</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input1}
        placeholder="Username"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"

      />

    </View>


    <Text style={{fontSize:14,paddingRight: "59%"}}>Password</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        onChangeText={text => setPass(text)}
          placeholder="Password"
          autoCapitalize="none"
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
      
      <TouchableOpacity style={styles.button}  onPress={() => Login()} >
        <Text style={{ color:'#ffffff' }}>Login</Text> 
      </TouchableOpacity> 

     

      {/* <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("Display")} >
        <Text style={{ color:'#ffffff' }}>button</Text> 
      </TouchableOpacity> 

      <TouchableOpacity style={styles.button}  onPress={() => removeItem()} >
        <Text style={{ color:'#ffffff' }}>remove</Text> 
      </TouchableOpacity>  */}
      
    <Text style={{fontSize:14, marginTop:30}}>Don't have an account?</Text>
    <Text style={{fontSize:14, color:'#534c88', fontWeight:'500'}}  onPress={() => navigation.navigate("SignUpAccount")}>Signup</Text>
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

});
