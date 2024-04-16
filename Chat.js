import React, { useState,useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get('window')
import {NETWORK_ADDPOCKET} from '@env';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import LoadingScreen from "./LoadingScreen";

export default Chat = () => {
  const[user, setUser] = useState('');
  const [message, setMessage] = useState("");
  const [listmessages, setListMessages] = useState([]);
  const chatContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);


  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false when data is loaded
  }, 5000); // Simulate a 5-second loading time

  const findUser = async () => {
    const result = await AsyncStorage.getItem('userID');
      //console.log(result);
      if(!result){
        navigation.navigate("Login")
      }
   return (result)
    };
   

  
    const fetchMessage = async() => {
      Axios.post(`${NETWORK_ADDPOCKET}/getchtmsg`,{
        adminId: 10,
        user_id:await findUser(),
        })
        .then((res) => {
          setListMessages(res.data.result);
        });
    };
    
    useEffect(() => {
      fetchMessage();
      const invtervalsend = setInterval(fetchMessage, 2000);
      return () => clearInterval(invtervalsend);
    }, []);


    const handleSendMessage = async() => {
   console.log("click")
      Axios.post(`${NETWORK_ADDPOCKET}/chatRoom`,{
          adminId: 10,
          user:await findUser(),
          content: message,
          senderId: await findUser(),
        })
        .then((res) => {
          if (res.data.status) {
            setMessage("");
            console.log("Send")
          } else {
            console.log(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
      
  


  return (
    <>
    {isLoading ? (
    
    <LoadingScreen />
    ):(

    <View  style={{ height: "92%",}}>

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        ref={chatContainer}>

        {listmessages ? (
          listmessages.map((item) => (
            <View
              style={[
                styles.messageContainer,
                {
                  justifyContent:
                    item.chtmsg_sender_id !== 10
                      ? 'flex-end'
                      : 'flex-start',
                },
              ]}
              key={item.chtmsg_id}>
              
              <Text
                style={[
                  styles.messageText,
                  {
                    backgroundColor:
                      item.chtmsg_sender_id !== 10
                        ? '#007bff'
                        : '#d8d8d8',
                    color:
                      item.chtmsg_sender_id !==10
                        ? '#ffffff'
                        : '#000000',
                  },
                ]}
              >
                {item.chtmsg_content}
              </Text>
            </View>
          ))
        ) : (
          <Text></Text>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          onChangeText={(text) => setMessage(text)}
          value={message}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity  onPress={handleSendMessage}>
        <MaterialCommunityIcons name="send" size={30} color="black" />
        </TouchableOpacity>
        {/* <Button title="Send" onPress={handleSendMessage} /> */}
      </View>


    </View>
    )}
    </>
  )
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    margin: 10,
    marginBottom:70,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor: '#696969',
    borderWidth: 1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 25,
    backgroundColor: '#73c2f3',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%', // Adjust the width as needed
  },

  container: {
    padding: 8,
    marginTop: 20,
    paddingTop: 10,
    height: 544, // Convert "34rem" to equivalent height in React Native
  },
  label: {
    fontWeight: 'bold',
    backgroundColor: '#534c88',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatContainer: {
    borderRadius: 8,
    height: 400.4, // Convert "26.4rem" to equivalent height in React Native
  },
  chatContent: {
    padding: 12,
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  messageText: {
    padding: 8,
    borderRadius: 8,
    maxWidth: '30%', // Adjust the width as required
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 12,
    // paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#6c757d',
    borderRadius: 8,
    padding: 8,
  },
})