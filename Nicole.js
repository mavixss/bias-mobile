import axios from 'axios';
import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Nicole() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //functions to create account 
  const createAccount = () => {
    Axios.post("http://192.168.8.103:19001/create", {
      email: email,
      password: password,
    })
      .then((result) => {
        // console.log(result)
        if (result.data.success) {
          Alert.alert("Account Created", "Please Login")
        }
        else {
          Alert.alert("Invalid Account", "Username already used");
        }
      }
      )
      .catch((error) => console.log(error));

  }
  const login = () => {
    Axios.post("http://192.168.8.103:19001/log", {
      email: email,
      password: password
    })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.response[0]);
          Alert.alert("Login Successfully", "Welcome User")

        }
        else {
          console.log(res.data.error)
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      <Text>Input User</Text>
      <TextInput placeholder='Email' onChangeText={(e) => setEmail(e)} />
      <TextInput placeholder='Password' onChangeText={(e) => setPassword(e)} />
      <Button title='Create'  onPress={() => createAccount()} />
      <Button title='Login' onPress={() => login()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
