


import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const LandingPage = () => {
const navigation = useNavigation();
return (

<View style={styles.container}>
      <View style={styles.body}>

        <Image style ={styles.avatarContainer}
  		source = {require('./assets/Bias.jpg')}>
  	   </Image>
		
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Dicover What</Text>
          
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>You Can Invest</Text>
          
        </View>
        <View style={styles.infoContainer}>
          <Text >Discover what you can do with your money</Text>
          
        </View>

        <TouchableOpacity style={styles.loginBtn}  onPress={() => navigation.navigate("Login")} >
        <Text style={{ color:'#ffffff' }}>LOGIN</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtnn} onPress={() => navigation.navigate("HomeNav")}  >
        <Text style={styles.loginText}>REGISTER</Text> 
      </TouchableOpacity> 
       
      </View>
    </View>
);
};

export default LandingPage;

const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    marginTop:"10%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: "80%",
    height: "50%",
    // borderRadius: 70,
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

  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#534c88",
  },
  loginBtnn: {
    width: "80%",
    borderRadius: 10,
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#e0dde9",
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 35,
    fontWeight: '800',
    color: '#8d3934',
    alignItems: 'center',

   color:'#3c3670',
    marginRight: 8,
  },
});