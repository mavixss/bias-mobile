import {
	SafeAreaView,
	StyleSheet,
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
	Button,
	Alert,
	Avatar,
	TextInput,
	handleSearchTextChange,
	searchText,
	ToastAndroid,
  ScrollView,
  props,
  Pressable,
  Dimensions,
  Animated, 
  Easing 
  } from "react-native";
  const {width, height} = Dimensions.get('window');
  import { AntDesign, Ionicons   } from '@expo/vector-icons';
  import Axios from 'axios';
  import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Invest from "./Invest";
import LoadingScreen from "./LoadingScreen";

const CreditCardInfoScreen = () => {

  const[cards, setCards]  = useState([
    { id: 1, number: '**** **** **** 1234', holder:'John Doe', expiration:'12/24', logo: 'https://img.icons8.com/color/70/000000/visa.png' },
    { id: 2, number: '**** **** **** 5678', holder:'John Doe', expiration:'12/24',logo: 'https://img.icons8.com/color/70/000000/mastercard.png' },
    { id: 3, number: 'Apple Pay', holder:'John Doe', expiration:'', logo:'https://img.icons8.com/color/70/000000/apple-pay.png' },
  ]);
  const [newsfeedsData, setnewsfeedsData] = useState([]);


  useEffect(() => {
    Axios.get("http://192.168.8.103:19001/getFeedsDisplay")
      // Axios.get(`${process.env.REACT_APP_NETWORK_ADD}:19001/getFeedsDisplay`)
      .then((result) => {setnewsfeedsData(result.data)
      // console.log(result.data[0].buss_user_id);
      }) 
    .catch((error) => console.log(error))
    },[newsfeedsData]);
  
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef(null);
  
    const scrollX = new Animated.Value(0);
  
    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false }
    );
  
    const handleItemPress = (index) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: index * Dimensions.get('window').width });
      }
    };
  
    useEffect(() => {
      const autoSwipeInterval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % newsfeedsData.length;
        handleItemPress(nextIndex);
        setActiveIndex(nextIndex);
      }, 3000); // Change the interval duration as needed
  
      return () => {
        clearInterval(autoSwipeInterval);
      };
    }, [activeIndex]);
    
    return (
    // <View style={styles.container}>
    //   {/* <Text style={styles.title}>Card Info</Text> */}
    //   <ScrollView
    //     horizontal={true}
    //     pagingEnabled={true}
    //     showsHorizontalScrollIndicator={false}
    //     onScroll={(event) => {
    //       const x = event.nativeEvent.contentOffset.x;
    //       const index = Math.floor(x / (width - 60));
    //       if (index !== activeIndex) {
    //         setActiveIndex(index);
    //       }
    //     }}
    //     scrollEventThrottle={16}
    //   >
      
    //     {newsfeedsData.map((item) => (
    //       <View key={item.buss_id} style={styles.cardContainer}>
    //         <Image source={{ uri: item.buss_photo }} style={styles.logo} />
    //         <Text style={styles.cardNumber}>{item.buss_name}</Text>
    //         <View style={styles.cardInfoContainer}>
    //           <View style={styles.cardInfoItem}>
    //             <Text style={styles.cardInfoLabel}>Entreprenuer</Text>
    //             <Text style={styles.cardInfoValue}>{item.user_fname} {item.user_lname}</Text>
    //           </View>
    //           <View style={styles.cardInfoItem}>
    //             <Text style={styles.cardInfoLabel}>Capital Need</Text>
    //             <Text style={styles.cardInfoValue}>{item.buss_capital}</Text>
    //           </View>
    //         </View>
    //       </View>
    //     ))}
    //   </ScrollView>

    //   <View style={styles.dotContainer}>
    //     {newsfeedsData.map((_, index) => (
    //       <TouchableOpacity key={index} onPress={() => setActiveIndex(index)}>
    //         <View
    //           style={[
    //             styles.dot,
    //             { backgroundColor: index === activeIndex ? 'white' : 'gray' },
    //           ]}
    //         />
    //       </TouchableOpacity>
    //     ))}
    //   </View>
    //   <TouchableOpacity style={styles.paymentButton}>
    //     <Text style={styles.buttonText}>Make a Payment</Text>
    //   </TouchableOpacity>
    // </View>




    <View style={styles.carouselContainer}>
    <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const index = Math.round(xOffset / Dimensions.get('window').width);
          setActiveIndex(index);
        }}
        {...onScroll}
      >
       {newsfeedsData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={{uri: item.buss_photo}} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.buss_name}</Text>
              <Text style={styles.content}>{item.user_fname} {item.user_lname}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
    <View style={styles.dotContainer}>
      {newsfeedsData.map((_, index) => (
        <TouchableOpacity key={index} onPress={() => handleItemPress(index)}>
          <View
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? 'white' : 'black' },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>




  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop:60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#00008B',
  },
  cardContainer: {
    marginHorizontal:10,
    width: "20%",
    height: "50%",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 6,
    borderBottomColor: '#ccc',
  },
  cardNumber: {
    fontSize: 18,
    letterSpacing: 4,
    marginBottom: 10,
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoItem: {
    flex: 1,
  },
  cardInfoLabel: {
    fontSize: 12,
    color: 'gray',
  },
  cardInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // carouselContainer: {
  //   // marginVertical: 40,
  //   // alignItems: 'center',
  //   // marginBottom:"-80%"
  // },
  logo: {
    width: "100%",
    height: "50%",
  },
  paymentButton: {
    backgroundColor: '#00008B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height:400,
    marginTop:-40,
    marginBottom:-30
  },
  itemContainer: {
    width: width - 180,
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 90,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
  },
  dotContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    margin: 5,
    borderWidth:1
  },});

export default CreditCardInfoScreen;