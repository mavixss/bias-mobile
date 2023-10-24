// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import Lightbox from 'react-native-lightbox';
// import Carousel from 'react-native-looped-carousel';

// const WINDOW_WIDTH = Dimensions.get('window').width;
// const BASE_PADDING = 10;

// const renderCarousel = () => (
//   <Carousel style={{ width: "100%", height: "100%" }}>
//     <Image
//       style={{ flex: 1 }}
//       resizeMode="contain"
//       source={{ uri: 'http://cdn.lolwot.com/wp-content/uploads/2015/07/20-pictures-of-animals-in-hats-to-brighten-up-your-day-1.jpg' }}
//     />
//     <View style={{ backgroundColor: '#6C7A89', flex: 1 }}/>
//     <View style={{ backgroundColor: '#019875', flex: 1 }}/>
//     <View style={{ backgroundColor: '#E67E22', flex: 1 }}/>
//   </Carousel>
// )

// export default () => (
//   <ScrollView style={styles.container}>
//     <View style={styles.text}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text></View>
//     <Lightbox underlayColor="white">
//       <Image
//         style={styles.contain}
//         resizeMode="contain"
//         source={{ uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg' }}
//       />
//     </Lightbox>
    
//     <View style={styles.text}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text></View>
//     <Lightbox springConfig={{tension: 15, friction: 7}} swipeToDismiss={false} renderContent={renderCarousel}>
//       <Image
//         style={styles.carousel}
//         resizeMode="contain"
//         source={{ uri: 'http://cdn.lolwot.com/wp-content/uploads/2015/07/20-pictures-of-animals-in-hats-to-brighten-up-your-day-1.jpg' }}
//       />
//     </Lightbox>
//     <View style={styles.text}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text></View>
//     <Lightbox
//       renderHeader={close => (
//         <TouchableOpacity onPress={close}>
//           <Text style={styles.closeButton}>Close</Text>
//         </TouchableOpacity>
//       )}>
//       <View style={styles.customHeaderBox}>
//         <Text>I have a custom header</Text>
//       </View>
//     </Lightbox>
//     <View style={styles.text}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text></View>
//     <View style={styles.row}>
//       <Lightbox style={styles.col}>
//         <View style={[styles.square, styles.squareFirst]}><Text style={styles.squareText}>I'm a square</Text></View>
//       </Lightbox>
//       <Lightbox style={styles.col}>
//         <View style={[styles.square, styles.squareSecond]}><Text style={styles.squareText}>I'm a square</Text></View>
//       </Lightbox>
//     </View>
//     <View style={styles.text}><Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text></View>
//   </ScrollView>
// )

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: BASE_PADDING,
//   },
//   closeButton: {
//     color: 'white',
//     borderWidth: 1,
//     borderColor: 'white',
//     padding: 8,
//     borderRadius: 3,
//     textAlign: 'center',
//     margin: 10,
//     alignSelf: 'flex-end',
//   },
//   customHeaderBox: {
//     height: 150,
//     backgroundColor: '#6C7A89',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     marginLeft: -BASE_PADDING,
//     marginRight: -BASE_PADDING,
//   },
//   col: {
//     flex: 1,
//   },
//   square: {
//     width: WINDOW_WIDTH / 2,
//     height: WINDOW_WIDTH / 2,
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   squareFirst: {
//     backgroundColor: '#C0392B',
//   },
//   squareSecond: {
//     backgroundColor: '#019875',
//   },
//   squareText: {
//     textAlign: 'center',
//     color: 'white',
//   },
//   carousel: {
//     height: WINDOW_WIDTH - BASE_PADDING * 2,
//     width: WINDOW_WIDTH - BASE_PADDING * 2,
//     backgroundColor: 'white',
//   },
//   contain: {
//     flex: 1,
//     height: 150,
//   },
//   text: {
//     marginVertical: BASE_PADDING * 2,
//   },
// });


import React from 'react';
import { Button, FlatList, StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity } from "react-native";
import Lightbox1 from './Lightbox1';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


<View style={styles.inputView}>

<Lightbox1

label="Type something"
style={styles.inputView}
  placeholder="Username"      
    
  />
</View>


    </View>
  );
};

export default App;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    inputView: {
      backgroundColor: "#e0dde9",
      borderRadius: 10,
      width: "70%",
      height: 45,
      marginBottom: 15,
      alignItems: "center",
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
  });
  