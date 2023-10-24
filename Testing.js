// import React, {useState} from 'react';
// import {Calendar, LocaleConfig} from 'react-native-calendars';

// const App = () => {
//   const [selected, setSelected] = useState('');

//   return (
// <Calendar
//   // Customize the appearance of the calendar
//   style={{
//     borderWidth: 1,
//     borderColor: 'gray',
//     height: 350
//   }}
//   // Specify the current date
//   current={'2012-03-01'}
//   // Callback that gets called when the user selects a day
//   onDayPress={day => {
//     console.log('selected day', day);
//   }}
//   // Mark specific dates as marked
//   markedDates={{
//     '2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},
//     '2012-03-02': {marked: true},
//     '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
//   }}
// />  );
// };

// export default App;




// import moment from 'moment/moment';
// import { months } from 'moment/moment';
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';
// import { useEffect, useState } from "react";
// import { TextInput } from 'react-native-paper';


// export default class App extends Component {


//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedStartDate: null,
//     };
//     this.onDateChange = this.onDateChange.bind(this);
//   }

//   onDateChange(date) {
//     this.setState({
//       selectedStartDate: date,
//     });
//   }
//   render() {
//     const { selectedStartDate } = this.state;
//     const startDate = selectedStartDate ? selectedStartDate.toString() : '';
//     const minDate = new Date(); // Today 

  
//     // const [pass, setPass] = useState("");
    
//     const getCurrentDate=()=>{
 
//       var date = new Date().getDate();
//       var month = new Date().getMonth() + 1;
//       var year = new Date().getFullYear();
//       var time = new Date().getHours();
//       var min = new Date().getMinutes();
//       //Alert.alert(date + '-' + month + '-' + year);
//       // You can turn it in to your desired format
//       return month + '/' + date + '/' + year + ' ' + time + ':' + min;//format: d-m-y;
// }

//     return (
//       <View style={styles.container}>
//         <CalendarPicker
//           onDateChange={this.onDateChange}
//         />

//         <View>
//           <Text>SELECTED DATE:{ startDate }</Text>
//           <Text>TODAY'S DATE:{  getCurrentDate() }</Text>


//           {/* <TextInput
//         style={styles.inputView}
//         placeholder="Password"
//         onChangeText={(text) => setPass(text)}
//         secureTextEntry={true}

//         value={pass}
//       /> */}



//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     marginTop: 100,
//   },
//   inputView: {
//     backgroundColor: "#e0dde9",
//     borderRadius: 10,
//     width: "70%",
//     height: 45,
//     marginBottom: 15,
//     alignItems: "center",
//   },

// });




// import moment from 'moment/moment';
// import { months } from 'moment/moment';
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TouchableOpacity
// } from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';
// import { useEffect, useState } from "react";
// import { TextInput } from 'react-native-paper';
// import { AntDesign } from '@expo/vector-icons';

// const Example = () => {
//   const [bday, setBday] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const date = new Date(bday);


//    // Format the date to the desired format
//    const formattedDate = date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   });

//   const newDate1 = moment(formattedDate).format('YYYY-MM-DD')

 
//     var getday = date.toLocaleDateString("default", {day: "2-digit"});
//     var getmonth = date.toLocaleDateString("default",{month: "2-digit"});
//     var getyear = date.toLocaleDateString("default",{ year: "numeric"});
//     var dateformat = getyear + '-' + getmonth + '-' + getday;

//     // var time = date.getHours();
//     // var min = date.getMinutes();
//     //Alert.alert(date + '-' + month + '-' + year);
//     // You can turn it in to your desired format
//     // return month + '-' + date + '-' + year;//format: d-m-y;

//   return (
//     <View style={styles.container}>
//     {/* <Button 
//         style={styles.button}
//         title="Show Calendar"
//         onPress={() => setShowCalendar(!showCalendar)}
//       /> */}

//     {showCalendar ? (
//         <CalendarPicker onDateChange={(res) => setBday(res)} />
//       ) : (
//         ""
//       )}

//       <Text>SELECTED DATE:{ formattedDate }</Text>
// <View>
//       <TextInput
//         style={styles.inputView}
//         editable= {false}
//         // placeholder="Email"
//         // onChangeText={(text) => setEmail(text)}
//         value={dateformat}
//       />
//           <AntDesign style={styles.calendarView} name="calendar" size={24} color="black" 
//         onPress={() => setShowCalendar(!showCalendar)}


//     />
//     </View>
// <View style={styles.buttonView}>
//     <TouchableOpacity style={styles.button}  onPress={() => Signup()} >
//         <Text style={{ color:'#ffffff' }}>SIGN UP</Text> 
//       </TouchableOpacity> 
//       <AntDesign style={styles.calendarView} name="calendar" size={24} color="black" 
//         onPress={() => setShowCalendar(!showCalendar)}


//     />

// </View>
//     {/* <CalendarPicker
//       onDateChange={(res) => console.log(res)}
//     /> */}

//     {/* <View>
//       <Text>SELECTED DATE:{ startDate }</Text>
//       <Text>TODAY'S DATE:{  getCurrentDate() }</Text>





//     </View> */}
//   </View>
// );
// };

// export default Example;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     marginTop: 100,
//   },
//   button: {
//     width: "80%",
//     borderRadius: 10,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#534c88",
//   },

//   buttonView: {
//     marginLeft:30
//   },


//   inputView: {
//     backgroundColor: "#e0dde9",
//     borderRadius: 10,
//     width: "70%",
//     height: 45,
//     marginBottom: 15,
//     alignItems: "center",
//   },

// });







/* eslint-disable no-undef */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Button, Image, ToastAndroid} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';
import { TextInput } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';

import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import Axios from 'axios';
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";



export default Testing = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  
  const citiesDropdownRef = useRef();
  const [businessName, setbusinessName] = useState("");
  const [businessCapital, setbusinessCapital] = useState("");
  const [businessDetails, setbusinessDetails] = useState("");



    //ADDRESS
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);
    const [barangaynameData, setBarangayname] = useState([]);
  
  
    const [selectedRegion, setselectedRegion] = useState("");
    const [selectedProvince, setselectedProvince] = useState("");
    const [selectedCity, setselectedCity] = useState("");
    const [selectedBrgy, setselectedBrgy] = useState("");

    useEffect(() => {
      provinces("07").then((result) => setProvince(result));
    }, []);
    
    
        const city = (e) => {
          setselectedProvince(e.province_name);
            cities(e.province_code).then((result) => setCity(result));
            // setProvince(e.province_code);
            // console.log(selectedProvince)
        }
    
        const brgy = (e) => {
          setselectedCity(e.city_name);
            barangays(e.city_code).then((result) => setBarangay(result));
            // setProvince(e.city_code);
            // console.log(selectedCity)
    
        }
    
        const brgyname = (e) => {
          setselectedBrgy(e.brgy_name);
          barangays(e.brgy_code).then((result) => setBarangayname(result));
          // setProvince(e.city_code);
          // console.log(selectedBrgy)
    
      }
    




  

  useEffect(() => {
    setTimeout(() => {
      setCountries([
        {title: 'TypeBusiness1', cities: [{title: 'Business1.1'}, {title: 'Business1.2'}]},
        {title: 'TypeBusiness2', cities: [{title: 'Business2.1'}, {title: 'Business2.2'}]},
      ]);
    }, 1000);
  }, []);

  const renderHeader = () => {
    return (
      <View style={[styles.header, styles.shadow]}>
        <Text style={styles.headerTitle}>{'Pitch Business'}</Text>
      </View>
    );
  };




  //for image
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");

const [imagedataURL, setimagedataURL] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);

useEffect(() => {
Axios.get("http://192.168.8.103:19001/getImage")
.then((result) => setimagedataURL(result.data)) 
.catch((error) => console.log(error))
},[]);

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setbuttonStatus(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
        setbuttonStatus(false);
      setImage(result.assets[0].uri);
      setImageFilename(result.assets[0].uri.split("/").pop());
    //   console.log(image);
    }

};


const imagesUpload = async () => {

    const storagee = storage;
    const imageRef = ref(storagee, "images/" + imageFilename);
    const img = await fetch(image);
    const blob = await img.blob();

    uploadBytes(imageRef, blob).then((snap) => {
      getDownloadURL(imageRef).then((url) => {
         console.log(url);
        setimageURL(url);
      });
    });

  };


  const ImageUrl = () => {
    Axios.post("http://192.168.8.103:19001/image", {
      imageURL: imageURL,
    })
      .then((res) => console.log(res.data), ToastAndroid.show(
        "Image added!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      ))
      .catch((error) => console.log(error));
      
  };


  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <View style={styles.viewContainer}>
        {renderHeader()}

        <View>
      <TextInput
        style={styles.inputBusinessView}
        placeholder="Business Name"
        onChangeText={(text) => setbusinessName(text)}
        value={businessName}
      />
      </View>

      <View>
      <TextInput
        style={styles.inputBusinessView}
        placeholder="Business Capital"
        onChangeText={(numeric) => setbusinessCapital(numeric)}
        value={businessCapital}
      />
      </View>
      


      <View>
      <TextInput
        multiline={true}
        style={styles.inputView}
        placeholder="Business Details"
        onChangeText={(text) => setbusinessDetails(text)}
        value={businessDetails}
      />
      </View>


        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.dropdownsRow}>
            <SelectDropdown
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                citiesDropdownRef.current.reset();
                setCities([]);
                setCities(selectedItem.cities);
              }}
              defaultButtonText={'Select business'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            <View style={styles.divider} />
            <SelectDropdown
              ref={citiesDropdownRef}
              data={cities}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={'Select business type'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}
            />



<SelectDropdown
        data={provinceData}
        defaultButtonText={'Select province'}

        onSelect={(selectedItem, index) => {
        //   console.log(selectedItem, index);
        city(selectedItem);

        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.province_name;
        }}
        rowTextForSelection={(item, index) => {
          return item.province_name;
        }}

        buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}

      />

        <SelectDropdown
        data={cityData}
        defaultButtonText={'Select city'}
        onSelect={(selectedItem, index) => {
            brgy(selectedItem);

        //   console.log(selectedItem, index);

        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.city_name;
        }}
        rowTextForSelection={(item, index) => {
          return item.city_name;
        }}

        buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}

      />
      
      <SelectDropdown
        defaultButtonText={'Select barangay'}

        data={barangayData}
        onSelect={(selectedItem, index) => {
          brgyname(selectedItem);

        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.brgy_name;
        }}
        rowTextForSelection={(item, index) => {
          return item.brgy_name;
        }}
        buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={15} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}

      />




          </View>
        </ScrollView>




      </View>

      {/* <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', marginTop:-15 }}>

      <Button title="Pick an image from camera roll" onPress={  () => pickImage()} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} />
      <Button title='Save to DB' onPress={() => ImageUrl() }/>
    </View> */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  dropdownsRow: {flexDirection: 'column', width: '100%', paddingHorizontal: '5%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},

  inputBusinessView: {
    backgroundColor: "#e0dde9",
    borderRadius: 10,
    width: "99%",
    height: 60,
    marginBottom: 15,
    // alignItems: "center",
  },

  inputView: {
    // borderWidth: 1,
    // borderColor: 'black',
    margin: 4,
    marginTop: 2,
    fontSize: 16,
  },

});