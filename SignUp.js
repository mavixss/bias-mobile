import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, ToastAndroid, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from "react-native-select-dropdown";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

import CalendarPicker from 'react-native-calendar-picker';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';



export default function App() {

  const navigation = useNavigation();


  const [selecteduserType, setselecteduserType] = useState("");
  const [selectedgender, setselectedGender] = useState("");

  const [userType, setuserType] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [bDate, setbDate] = useState("");
  const [gender, setGender] = useState("");
  const [contactNum, setcontactNum] = useState("");
  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  // const [region, setRegion] = useState("");
  // const [provnce, setprovince] = useState("");
  // const [cty, setcity] = useState("");
  // const [brngy, setBrgy] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [name, setName] = useState("");
  const [data, setData] = useState();

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

  //for calendar bday picking
  const [bday, setBday] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const date = new Date(bday);

   // Format the date to the desired format
   const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });


  var getday = date.toLocaleDateString("default", {day: "2-digit"});
  var getmonth = date.toLocaleDateString("default",{month: "2-digit"});
  var getyear = date.toLocaleDateString("default",{ year: "numeric"});
  var dateformat = getyear + '-' + getmonth + '-' + getday;



  // const getCurrentDate=()=>{
 
    var datee = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hr = new Date().getHours();
    var min = new Date().getMinutes();
    var secs = new Date().getSeconds();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    var getCurrentDate = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;
// }


  // useEffect(() => {
  //   regions().then((result) => setRegionData(result));
  // }, []);
//   console.log(regionData);



//for asyncstoraege


const handleSubmit = async () => {
  const getData = { email:email};
  await AsyncStorage.setItem('getData', JSON.stringify(getData));

}








useEffect(() => {
  setTimeout(() => {
    setuserType([
      {title: 'Entreprenuer'},
      {title: 'Investor'},
    ]);
  }, 1000);
}, []);

useEffect(() => {
  setTimeout(() => {
    setGender([
      {title: 'Female'},
      {title: 'Male'},
    ]);
  }, 1000);
}, []);



useEffect(() => {
  provinces("07").then((result) => setProvince(result));
}, []);

    // use to refer dropdown to another dropdown
    // const province = (e) => {
    //     provinces(e.region_code).then((result) => setProvince(result));
    //     // setProvince(e.region_code); use to get the region code so that the province will appear accordingly
    //     //{"brgy_code": "072217053", "brgy_name": "Pardo (Pob.)", "province_code": "0722", "region_code": "07"} 47
    // }

    //     const typeOfUser = (e) => {
    //       setselecteduserType(e.type);

        
    // }

        const user = (e) => {
        provinces(e.region_code).then((result) => setProvince(result));
        // setProvince(e.region_code); use to get the region code so that the province will appear accordingly
        //{"brgy_code": "072217053", "brgy_name": "Pardo (Pob.)", "province_code": "0722", "region_code": "07"} 47
    }

        const typeOfUser = (e) => {
          setselecteduserType(e.title);

        
    }

    const typeOfGender = (e) => {
      setselectedGender(e.title);

    
}





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



  //to display data
  useEffect(() => {
    fetch("http://192.168.8.171:19001/userss")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  

  const Signup = () => {
    Axios.post("http://192.168.8.103:19001/signup", {
      userType: selecteduserType,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      bDate: dateformat,
      gender: selectedgender,
      contactNum: contactNum,
      email: email,
      pass: pass,
      selectedProvince: selectedProvince,
      selectedCity: selectedCity,
      selectedBrgy: selectedBrgy,
      createdAt: getCurrentDate,

    })
      .then((res) =>  
      {
        // console.log(res.data)

        if(res.data.success)
        {
          handleSubmit(),
          ToastAndroid.show("account succesfully created!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM),
          navigation.navigate("Login")

        }
        else 
        {

      switch(res.data.errorNum) {
        //to test if the email already exist
      case 1062:
        ToastAndroid.show(
          "email already exist!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        // console.log(res.data.errorNum)
        break;
        }
        // console.log(res.data.errorNum)

          
        }
      }
      )
      .catch((error) => console.log(error));
      
  };


    // Function to handle password confirmation
    const handleConfirmPassword = () => {
      if (pass === confirmPassword) {
        // Passwords match, you can proceed with your logic here.
        setPasswordsMatch(true);
        Signup();
      } else {
        // Passwords do not match, display an error message or take appropriate action.
        setPasswordsMatch(false);
        ToastAndroid.show("password doesnt match!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)

      }
    };
  


  const Testing = () => {
    // console.log(userType,firstName, lastName,middleName,bDate,gender,contactNum,email,pass,selectedProvince, selectedCity, selectedBrgy);
    console.log(selecteduserType, selectedgender);

      
  };





  const Duplication = () => {
    Axios.post("http://192.168.8.171:19001/duplication", {
      email: email,
      name: name,
      pass: pass,
    })
      .then((res) => console.log(res.data), ToastAndroid.show(
        "email already exist!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      ))
      .catch((error) => console.log(error));
      
  };


  


  return (
    <View style={styles.container}>
       

 <Image style={styles.image} source={require("./assets/profilee.png")} /> 

      <Text style={styles.text}>Create Account</Text>

      <ScrollView 
      style={styles.View}
      contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}
      >
      
      {/* <View style={styles.inputView}>
      <TextInput
        style={styles.inputView}
        placeholder="User Type"
        onChangeText={(text) => setuserType(text)}
        value={userType}
      />
      </View> */}
{/* <View style={styles.scrollView}> */}

      <View style={styles.inputView}>
      <TextInput
        style={styles.inputView}
        placeholder="First Name"
        onChangeText={(text) => setfirstName(text)}
        value={firstName}
      />
      </View>

      <View style={styles.inputView}>
      <TextInput
        style={styles.inputView}
        placeholder="Last Name"
        onChangeText={(text) => setlastName(text)}
        value={lastName}
      />
      </View>

      <View style={styles.inputView}>
      <TextInput
        style={styles.inputView}
        placeholder="Middle Name"
        onChangeText={(text) => setmiddleName(text)}
        value={middleName}
      />
      </View>

<View style={{flexDirection:'row'}}>
      <View style={styles.bdayView}>
      {/* <TextInput
        style={styles.inputView}
        placeholder="Birthday"
        onChangeText={(text) => setbDate(text)}
        value={bDate}
      /> */}


      <TextInput
        style={styles.bdayView}
        editable= {false}
        value={dateformat}
      />

      </View>

      <AntDesign 
      style={{marginTop:"2%"}}
      name="calendar" size={25} color="black" 
        onPress={() => setShowCalendar(!showCalendar)}
      />

</View>

<View style={{flexDirection:'row'}}>
        {showCalendar ? (
        <CalendarPicker width={320} height={320} onDateChange={(res) => setBday(res)} />
      ) : (
        ""
      )}
</View>

      <SelectDropdown
              data={gender}
              onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index);
              typeOfGender(selectedItem, index);
              }}
              defaultButtonText={'Gender'}
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

      <View style={styles.inputView}>
      <TextInput
        style={styles.inputView}
        placeholder="Contact Number"
        onChangeText={(text) => setcontactNum(text)}
        value={contactNum}
      />
      </View>

      <View style={styles.inputView}>
      <TextInput
        style={styles.inputView}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      </View>

      <View style={styles.inputView}>

      <TextInput
        style={styles.inputView}
        placeholder="Password"
        onChangeText={(text) => setPass(text)}
        secureTextEntry={true}

        value={pass}
      />
      </View>
      <View style={styles.inputView}>

      <TextInput
        style={styles.inputView}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
        value={confirmPassword}
      />
      {!passwordsMatch && (
        <Text style={{ color: 'red' }}>Passwords do not match</Text>
      )}
      </View>

      
      


    {/* ADDRESS DROPDOWN*/}
      {/* <View style={styles.inputView}>

      <TextInput
        style={styles.inputView}
        placeholder="Region"
        onChangeText={(text) => setRegion(text)}
        secureTextEntry={true}

        value={region}
      />
      </View>

      <View style={styles.inputView}>

      <TextInput
        style={styles.inputView}
        placeholder="Province"
        onChangeText={(text) => setprovince(text)}
        secureTextEntry={true}

        value={provnce}
      />
      </View>

      <View style={styles.inputView}>

      <TextInput
        style={styles.inputView}
        placeholder="City"
        onChangeText={(text) => setcity(text)}
        secureTextEntry={true}

        value={cty}
      />
      </View>

      <View style={styles.inputView}>

      <TextInput
        style={styles.inputView}
        placeholder="Baranggay"
        onChangeText={(text) => setBrgy(text)}
        secureTextEntry={true}

        value={brngy}
      />
      </View> */}

      {/* DROPDOWN ADDRESS */}

      {/* <SelectDropdown
        data={regionData}
        onSelect={(selectedItem, index) => {
            province(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.region_name;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.region_name;
        }}
      /> */}
      <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>
        {/* <View style={styles.dropdownsRow}> */}


        <SelectDropdown
              data={userType}
              onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index);
              typeOfUser(selectedItem, index);
              }}
              defaultButtonText={'User Type'}
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



        {/* </View> */}
        
      </ScrollView>




      <TouchableOpacity style={styles.button}  onPress={() => handleConfirmPassword()} >
        <Text style={{ color:'#ffffff' }}>SIGN UP</Text> 
      </TouchableOpacity> 
      {/* </View> */}
      </ScrollView>

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
  inputView: {
    backgroundColor: "#e0dde9",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 15,
    alignItems: "center",
  },

  bdayView: {
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
    width: 140,
    height: 140,
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
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: "5%",
     width:"90%"
  },

  View: {
     flex: 1,
     width:"100%",
     marginLeft:"20%"
  },


  dropdownsRow: {flexDirection: 'column', width: '100%', paddingHorizontal: '5%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    width:"70%",
    backgroundColor: '#e0dde9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0dde9',
    marginBottom: 15,

  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    width:"70%",
    backgroundColor: '#e0dde9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0dde9',
    marginBottom: 15,

  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},

});
