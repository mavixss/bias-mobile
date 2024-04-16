import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { Button, 
  FlatList, 
  StyleSheet, 
  Text, 
  View, 
  ToastAndroid, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert} from "react-native";
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
import {bussinessTypes, bussinessesName} from "./BusinessList"
import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { Loan } from 'loanjs';
import {NETWORK_ADDPOCKET} from '@env';
import 'react-native-get-random-values';
import uuid from "react-native-uuid";




export default function UploadBusiness() {

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
  const [otherBusiness, setOtherBuss] = useState("");
  const[purpose, setPurpose] = useState("");
  const[target, setTarget] = useState("");
  const[prodandServce, setProdServce] = useState("");
  const [isChecked, setIsChecked] = useState([]);


  const [businessName, setbusinessName] = useState("");
  const [businessCapital, setBussinessCapital] = useState("");
  const [businessDetails, setbusinessDetails] = useState("");
  const[place, setPlace] = useState("")
  const[summary,setSummary] = useState("")
  const[audience,setAudience] = useState("")
  const[funds,setFunds] = useState("")


  //installment
  const[installments, setInstallments] = useState([])
  const[totalReturn,  setTotalReturn] = useState([])

  
  const handleOnBlur = (e) =>{
    let listdate = [];
    if (businessCapital) {
      const loans = new Loan(businessCapital, 6, 5);
      const loansInsallment = loans.installments;

      setTotalReturn(loans.sum);
      const startDate = new Date();
      for (let i = 0; i < 6; i++) {
        const nextDate = new Date(startDate);
        nextDate.setMonth(startDate.getMonth() + i);

        listdate.push(nextDate.toDateString());
      }
      const updateReturnsWithDate = loansInsallment.map((item, index) => ({
        ...item,
        date: listdate[index] || null,
      }));

      setInstallments(updateReturnsWithDate);
      // console.log(updateReturnsWithDate);
      //console.log(loans);
    }

  }

// FOR FUNDS LIST

const [item,setItem] = useState("")
const [price,setPrice] = useState("")
const [useFunds, setUseFunds] = useState([])
const addItem = (item) => {
  setUseFunds([...useFunds, item])
}

const removeItem = (item) => {
  setUseFunds(useFunds.filter(i => i !== item))
}


const handleValidationFunds = () => {

  if (!item || !price) {
    ToastAndroid.show("Please fill in all required fields", 
    ToastAndroid.SHORT, ToastAndroid.BOTTOM);

    return; // Don't proceed with the submission if any field is empty

  }
 else{
  addItem({
      id: uuid.v4(),
      products: item,
      amount: price,
    })
    setPrice("")
    setItem("")
 }

};

useEffect (() =>{
  console.log(JSON.stringify(useFunds))

  let totalSum = 0;

  for (let i = 0; i < useFunds.length; i++) {
    totalSum += parseFloat(useFunds[i].amount);
  }
  console.log(totalSum)
  const amount = totalSum;
  
  const listStartDate = [];
  const listEndDate = [];

  if (amount) {
    const loans = new Loan(amount, 12, 5);

    const loansInsallment = loans.installments;

    setTotalReturn(loans.sum);
    const startDate = new Date();
    for (let i = 0; i < 12; i++) {
      const nextStartDate = new Date(startDate);
      nextStartDate.setMonth(startDate.getMonth() + i);
      listStartDate.push(nextStartDate);

      const nextEndDate = new Date(nextStartDate);
      nextEndDate.setMonth(nextStartDate.getMonth() + 1);
      nextEndDate.setDate(nextStartDate.getDate() - 1);
      listEndDate.push(nextEndDate);
    }
    const updateReturnsWithDate = loansInsallment.map((item, index) => ({
      ...item,
      mindate: `${listStartDate[index].toDateString()} `,
      maxdate: `${listEndDate[index].toDateString()}`,
      // status: "not paid",
      id: `${listStartDate[index].getMonth() + 1}-${listStartDate[
        index
      ].getDate()}-${listStartDate[index].getFullYear()}-${uuid.v4()}`,
    }));

    console.log(updateReturnsWithDate);

    ///Installments data
    setInstallments(updateReturnsWithDate);
    
  }
  setBussinessCapital(totalSum);

},[useFunds]) 


  //for checkbox

  const[checkYesAdd, setCheckYesAdd] = useState("")
  const[checkNoAdd, setCheckNoAdd] = useState("")

  const[checkYesExperience, setCheckYesExperience] = useState("")
  const[checkNoExperience, setCheckNoExperience] = useState("")


  const [checkboxDataAdd, setCheckboxDataAdd] = useState('Yes');
  const [checkboxExperience, setCheckboxExperience] = useState('Yes');


  const [customTextAdd, setCustomTextAdd] = useState('');
  const [customTextExp, setCustomTextExp] = useState('');




  const handleCheckboxChange = (option, value) => {
    if (option === 'Add') {
      setCheckboxDataAdd(value);
      console.log(checkboxDataAdd)
    } else if (option === 'Experience') {
      setCheckboxExperience(value);
      console.log(checkboxExperience)

    }
  };



  const[user, setUser] = useState('');



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



  //to display data
  
  

  const Pitch = () => {
    // Axios.post("http://192.168.8.103:19001/pitch", {
      Axios.post(`${NETWORK_ADDPOCKET}/pitch`, {
        user: user,
      businessName: businessName,
      businessTypeSelectd: businessTypeSelectd,
      businessCapital: businessCapital,
      businessDetails: businessDetails,
      selectedProvince: selectedProvince,
      selectedCity: selectedCity,
      selectedBrgy: selectedBrgy,
      createdAt: createdAt,
      imageURL: imageURL,


    })
      .then((res) =>  
      // {
        ToastAndroid.show("please wait for the approval",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),

        ToastAndroid.show("business succesfully posted!",
        // setbusinessName(""),
        // setbusinessTypeSelectd(""),
        // setbusinessCapital(""),
        // setbusinessDetails(""),
        // setselectedProvince(""),
        // setselectedCity(""),
        // setselectedBrgy(""),
        // setimageURL(""),

        ToastAndroid.LONG,ToastAndroid.BOTTOM),
        navigation.navigate("Entreprenuer")


          
      )
      .catch((error) => console.log(error));
      
  };


  const PitchFinal  = () => {
    // Axios.post("http://192.168.8.103:19001/pitchFinal", {
      Axios.post(`${NETWORK_ADDPOCKET}/pitchFinal`, {

      user: user,
      businessName: businessName,
      businessTypeSelectd: businessTypeSelectd,
      bussNameSelectd:JSON.stringify(selectedBusinesses),
      selectedProvince: selectedProvince,
      selectedCity: selectedCity,
      selectedBrgy: selectedBrgy,
      imageURL: imageURL,
      bussStationYN:checkboxDataAdd,
      bussLocationAdd:customTextAdd,
      bussExperienceYN:checkboxExperience,
      businesstExp:customTextExp,
      bussSummary: summary,
      bussAudience:audience,
      bussFunds:JSON.stringify(useFunds),
      buss_support_doc:docfileURL,
      businessCapital: businessCapital,
      fileURL:fileURL,
      // month   
      // interest
      loanreturn:totalReturn,
      installments:installments,
      //status
      createdAt: createdAt,


    })
      .then((res) =>  
       {
        setbusinessName('');
        setbusinessTypeSelectd('');
        setSelectedBusinesses([]);
        setselectedProvince('');
        setselectedCity('');
        setselectedBrgy('');
        setimageURL('');
        setCheckboxDataAdd('');
        setCustomTextAdd('');
        setCheckboxExperience('');
        setCustomTextExp('');
        setSummary('');
        setAudience('');
        setUseFunds('');
        setDocFileURL('');
        setBussinessCapital('');
        setFileURL('');
        setTotalReturn('');
        setInstallments('')
  
        ToastAndroid.show("please wait for the approval",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),

        ToastAndroid.show("business succesfully posted!",
        ToastAndroid.LONG,ToastAndroid.BOTTOM),
        navigation.navigate("EntrepFeeds")


      } 
      )
      .catch((error) => console.log(error));
      
  };


  const handleValidation = () =>{
    if(!businessName || !businessTypeSelectd || !selectedBusinesses || !selectedProvince || !selectedCity || !selectedBrgy || !imageURL 
    || !checkboxDataAdd ||  !checkboxExperience || !summary || !audience ||  !businessCapital || !fileURL || !totalReturn 
    || !installments )
    {
      ToastAndroid.show("Please fill in all required fields", 
      ToastAndroid.SHORT, ToastAndroid.BOTTOM);

      return; // Don't proceed with the submission if any field is empty
    }

    else{
      PitchFinal();

    }


  }


 

  useEffect(() => {
    setbusinessType(bussinessTypes())
    // console.log(bussinessTypes())

  }, []);

  const [businessType, setbusinessType] = useState([]);
  const [businessTypeSelectd, setbusinessTypeSelectd] = useState([]);
  const [businessesName, setbusinessesName] = useState([]);
  const [bussNameSelectd, setbussNameSelectd] = useState([]);


  const bussType = (e) => {
    setbusinessTypeSelectd(e.bussiness_type)
    setbusinessesName(bussinessesName(e.bussine_type_code))
    console.log(e.bussiness_type)
    // console.log(businessTypeSelectd)

}


const BussName = (e) => {
  setbussNameSelectd(e.bussiness_name);
  bussinessesName(e.bussiness_name)
  console.log(e.bussiness_name)
  // console.log(bussNameSelectd)

}



//////////////// created
 
  var datee = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hr = new Date().getHours();
  var min = new Date().getMinutes();
  var secs = new Date().getSeconds();

  // You can turn it in to your desired format
  var createdAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;
  // Alert.alert(getCurrentDate);
 

//////////////// updated
 
var datee = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var hr = new Date().getHours();
var min = new Date().getMinutes();
var secs = new Date().getSeconds();

var updatedAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;




const findUser = async () => {
  const result = await AsyncStorage.getItem('userID');
    console.log(result);
    if(!result){
      navigation.navigate("Login")

    }
  setUser(JSON.parse(result))
  };

  useEffect(() => {
    findUser();
  },[])



  const navigation = useNavigation();


  //image
const [image, setImage] = useState(null);
const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");
const [imagedataURL, setimagedataURL] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);
const [buttonStatusfile, setbuttonStatusFile] = useState(true);
const [buttonStatusDocFile, setbuttonStatusDocFile] = useState(true);




const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  setbuttonStatus(true);
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [5, 5],
    quality: 1,
  });

  //  console.log(result);

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



//for file upload


const [filee, setFile] = useState(null);
const [filename, setFilename] = useState("");
const [fileURL, setFileURL] = useState("");
const [filedataURL, setFileDataURL] = useState([]);
const [PDFFileName, setPDFilename] = useState("")

const [fileSupDoc, setFileSupDoc] = useState(null);
const [docfilename, setDocFilename] = useState("");
const [docfileURL, setDocFileURL] = useState("");
const [PDFdocFileName, setPDFdocFilename] = useState("")


// useEffect(() => {
// Axios.get("http://192.168.8.103:19001/getImage")
// .then((result) => setimagedataURL(result.data)) 
// .catch((error) => console.log(error))
// },[]);


// useEffect(() => {
//     Axios.get("http://192.168.8.103:19001/getFile")
//     .then((result) => setFileURL(result.data)) 
//     .catch((error) => console.log(error))
//     },[]);
    

const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    setbuttonStatusFile(true);
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

   console.log(result.name);
  //  console.log(result.uri.split("/").pop());
   

    if (!result.canceled) {
      setbuttonStatusFile(false);
      setFile(result.uri);
      setFilename(result.uri.split("/").pop());
      setPDFilename(result.name)
    }


    

};


const FilessUpload = async () => {
  const storagee = storage;
  const fileRef = ref(storagee, "images/" + filename);
  const pdf = await fetch(filee);
  const blob = await pdf.blob();

  const urlsArray = []; // Array to store URLs

  uploadBytes(fileRef, blob).then((snap) => {
    getDownloadURL(fileRef).then((url) => {
      // console.log(url);

      urlsArray.push(url); // Push the URL into the array
      setFileURL(urlsArray);
      console.log(urlsArray);
      // console.log(fileURL); // Log the array with the URL


    });
  });

  // If you need to use the array elsewhere, you can return it
  return urlsArray;
};


  const FileUrl = () => {
    // Axios.post("http://192.168.8.103:19001/fileUpload", {
      Axios.post(`${NETWORK_ADDPOCKET}/fileUpload`, {
        fileURL: fileURL,
    })
      .then((res) => console.log(res.data), ToastAndroid.show(
        "File sucessfully added!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      ))
      .catch((error) => console.log(error));
      
  };


  const pickDocFile = async () => {
    // No permissions request is necessary for launching the image library
    setbuttonStatusDocFile(true);
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

   console.log(result.name);
  //  console.log(result.uri.split("/").pop());
   

    if (!result.canceled) {
      setbuttonStatusDocFile(false);
      setFileSupDoc(result.uri);
      setDocFilename(result.uri.split("/").pop());
      setPDFdocFilename(result.name)
    }


    

};


const DocFilesUpload = async () => {
  const storagee = storage;
  const fileRef = ref(storagee, "images/" + filename);
  const pdf = await fetch(filee);
  const blob = await pdf.blob();

  const urlsArray = []; // Array to store URLs

  uploadBytes(fileRef, blob).then((snap) => {
    getDownloadURL(fileRef).then((url) => {
      // console.log(url);

      urlsArray.push(url); // Push the URL into the array
      setDocFileURL(urlsArray);
      console.log(urlsArray);
      // console.log(fileURL); // Log the array with the URL


    });
  });

  // If you need to use the array elsewhere, you can return it
  return urlsArray;
};


  const DocFileUrl = () => {
    // Axios.post("http://192.168.8.103:19001/fileUpload", {
      Axios.post(`${NETWORK_ADDPOCKET}/fileUpload`, {

      fileURL: docfileURL,
    })
      .then((res) => console.log(res.data), ToastAndroid.show(
        "File sucessfully added!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      ))
      .catch((error) => console.log(error));
      
  };

  const isTableVisible = businessCapital !== '';

  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const handleCheckboxChangee = (businessName) => {
    let updatedSelectedBusinesses = [...selectedBusinesses];
    const index = updatedSelectedBusinesses.indexOf(businessName);

    if (index !== -1) {
      updatedSelectedBusinesses.splice(index, 1); // Remove the item if already selected
    } else {
      updatedSelectedBusinesses = [...updatedSelectedBusinesses, businessName]; // Add the item if not selected
    }

    setSelectedBusinesses(updatedSelectedBusinesses);
    // Perform any necessary actions with the selected businesses here
    console.log(updatedSelectedBusinesses);
  };
  
  return (
    <View style={styles.container} >
       <ScrollView style={styles.View}
      contentContainerStyle={{flexGrow : 1, justifyContent : 'center',padding: "7%"}}>

{/* //for photo */}
    <TouchableOpacity style={styles.itemContainer}  onPress={  () => pickImage()}>
    {!imageURL  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

    <View style={styles.photoborder}>

     {image && <Image source={{ uri: image }} style={styles.image2} />}
</View>

<Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} />

      </TouchableOpacity>

      <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Overview</Text>
      <Text style={{fontSize:14,paddingRight: "59%",}}>
      {!businessName  && (
        <Text style={{color: 'red'}}>*</Text>
      )}
      Business Name</Text>
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Business Name"
        onChangeText={(text) => setbusinessName(text)}
        value={businessName}
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!businessTypeSelectd  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Type of Business </Text>

        <SelectDropdown
             data={businessType}
             onSelect={(selectedItem, index) => {
             // console.log(selectedItem, index);
             bussType(selectedItem);
             }}
             defaultButtonText={'Business Name'}
             buttonTextAfterSelection={(selectedItem, index) => {
               return selectedItem.bussiness_type;
               
             }}
             rowTextForSelection={(item, index) => {
               return item.bussiness_type;
             }}
             buttonStyle={styles.inputContainerDropdown}
             buttonTextStyle={{fontSize:14, marginRight:"60%", }}
             renderDropdownIcon={isOpened => {
               return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
             }}
             dropdownIconPosition={'right'}
             dropdownStyle={styles.dropdown1DropdownStyle}
             rowStyle={styles.dropdown1RowStyle}
             rowTextStyle={{fontSize:14,}}
           />


         {/* <SelectDropdown
             data={businessesName}
             onSelect={(selectedItem, index) => {
             //  console.log(selectedItem, index);
              BussName(selectedItem);
             }}
             defaultButtonText={'Business Type'}
             buttonTextAfterSelection={(selectedItem, index) => {
               return selectedItem.bussiness_name;
               
             }}
             rowTextForSelection={(item, index) => {
               return item.bussiness_name;
             }}
             buttonStyle={styles.inputContainerDropdown}
             buttonTextStyle={{fontSize:14, marginRight:"60%", }}
             renderDropdownIcon={isOpened => {
               return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
             }}
             dropdownIconPosition={'right'}
             dropdownStyle={styles.dropdown1DropdownStyle}
             rowStyle={styles.dropdown1RowStyle}
             rowTextStyle={{fontSize:14,}}
           /> */}

          {businessesName.map((business, index) => (

          <View key={index} style={styles.checkboxContainer}>
          <Checkbox.Item
          label={business.bussiness_name}
          status={selectedBusinesses.includes(business.bussiness_name) ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChangee(business.bussiness_name)}
          style={styles.checkbox}
          />

          </View>


          ))}



<Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Address</Text>
       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!selectedProvince  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Province</Text>
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

        buttonStyle={styles.inputContainerDropdown}
              buttonTextStyle={{fontSize:14, marginRight:"60%", }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={{fontSize:14,}}

      />
   


       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!selectedCity || !selectedBrgy && (
        <Text style={{color: 'red'}}>*</Text>
      )}
       Address</Text>
       <View style={{flexDirection:'row'}}>
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

        buttonStyle={styles.inputContainerDropdownRow}
              buttonTextStyle={{fontSize:14,}}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={{fontSize:14, }}

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
        buttonStyle={styles.inputContainerDropdownRow}
              buttonTextStyle={{fontSize:14,}}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={{fontSize:14, }}

      />
       </View>

       <Text style={{fontSize:14,paddingRight: "1%",}}>
       {!checkboxDataAdd  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Does your business is near at school, department store or crowded places? yes or no</Text>

       <View style={styles.checkboxContainer}>

       {/* <Checkbox.Item
          label="Yes"
          status={checkboxDataAdd.yes ? 'checked' : 'unchecked'}
          onPress={handleYesPressAdd}
          style={styles.checkbox}
        />

        <Checkbox.Item
          label="No"
          status={checkboxDataAdd.no ? 'checked' : 'unchecked'}
          onPress={handleNoPressAdd}
          style={styles.checkbox}
        /> */}

        <Checkbox.Item
          label="Yes"
          status={checkboxDataAdd === 'Yes' ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Add', 'Yes')}
          style={styles.checkbox}
        />
        <Checkbox.Item
          label="No"
          status={checkboxDataAdd === 'No' ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Add', 'No')}
          style={styles.checkbox}
        />

        </View>

       {checkboxDataAdd === 'Yes' && (
        <View>
        <Text style={{fontSize:14,paddingRight: "1%",}}>Provide the name of the place near your business</Text>

         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Enter Location"
        onChangeText={(text) => setCustomTextAdd(text)}
        value={customTextAdd}
         />
   
       </View>
       </View>

       )}

       <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Experience</Text>

       <Text style={{fontSize:14,paddingRight: "1%",}}>
       {!checkboxExperience  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Do you have any business experience in the past or currently have a business? yes or no</Text>
       <View style={styles.checkboxContainer}>

       {/* <Checkbox.Item
          label="Yes"
          status={checkboxExperience.yes ? 'checked' : 'unchecked'}
          onPress={handleYesPressExperience}
          style={styles.checkbox}
        />

        <Checkbox.Item
          label="No"
          status={checkboxExperience.no ? 'checked' : 'unchecked'}
          onPress={handleNoPressExperience}
          style={styles.checkbox}
        /> */}

        <Checkbox.Item
          label="Yes"
          status={checkboxExperience === 'Yes' ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Experience', 'Yes')}
          style={styles.checkbox}
        />
        <Checkbox.Item
          label="No"
          status={checkboxExperience === 'No' ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxChange('Experience', 'No')}
          style={styles.checkbox}
        />


        </View>

         {checkboxExperience === 'Yes' && (
        <View>
        <Text style={{fontSize:14,paddingRight: "1%",}}>Provide the last business you operate</Text>

         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Business Name"
        onChangeText={(text) => setCustomTextExp(text)}
        value={customTextExp}
         />
   
       </View>
       </View>

       )}



      <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Details</Text>



      <Text style={{fontSize:14,paddingRight: "59%",}}>
      {!summary  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

      Business Summary</Text>
         <View style={styles.inputContainer}>
         <TextInput
            multiline={true}
        style={styles.inputdetails}
        numberOfLines={4} // You can adjust the number of lines as needed
        placeholder="Business Summary"
        onChangeText={(text) => setSummary(text)}
        value={summary}
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {!audience  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Target Audience</Text>
         <View style={styles.inputContainer}>
         <TextInput
            multiline={true}
        style={styles.inputdetails}
        numberOfLines={4} // You can adjust the number of lines as needed
        placeholder="Target Audience"
        onChangeText={(text) => setAudience(text)}
        value={audience}
         />
   
       </View>

       <Text style={{fontSize:14,paddingRight: "59%",}}>
       {/* {!item && !price  && ( */}
        {/* <Text style={{color: 'red'}}>*</Text> */}
      {/* )} */}

       Use of Funds</Text>
       <Text style={{fontSize:14,paddingRight: "1%",color: 'red' }}>Please specify a list of your capital funds</Text>

       <View style={{flexDirection:'row'}}>
         <View style={styles.inputContainer}>
         <TextInput
        style={styles.inputrow}
        placeholder="Item"
        onChangeText={(text) => setItem(text)}
        value={item}
        autoCapitalize="none"
        onSubmitEditing={handleValidationFunds}

         />
   
       </View>

       <View style={styles.inputContainer}>
         <TextInput
        style={styles.inputrow}
        placeholder="Price"
        onChangeText={(text) => setPrice(text)}
        value={price}
        keyboardType="numeric"
        onSubmitEditing={handleValidationFunds}


         />
   
       </View>

       {/* <TouchableOpacity
        onPress={() =>
            handleValidationFunds()
        }>
      <MaterialIcons name="add-task" size={36} color="black" />
      </TouchableOpacity> */}
       </View>

       {useFunds.map((item, index) => (
        <View key={index} style={styles.fundsContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>Product {index+1}: {item.product}</Text>
            <Text style={styles.price}>Price: P{Number(item.amount).toLocaleString()}</Text>
          </View>
          <TouchableOpacity  onPress={() => removeItem(item)} style={styles.removeButton}>
          <MaterialIcons name="delete-forever" size={24} color="black" />

          </TouchableOpacity>
        </View>
      ))}



       <Text style={{fontSize:14,paddingRight: "1%",}}>Attach supporting documents</Text>
       {fileSupDoc && <Text numberOfLines={1} ellipsizeMode={'middle'}  style={{fontSize:14}} >File Attached: { PDFdocFileName }</Text>}

       <TouchableOpacity style={styles.itemContainer1}  onPress={  () => pickDocFile()}>
    <View style={styles.fileborder}>
              <Text style={{alignSelf:"center",paddingBottom:"2%"}}>Click to Upload File</Text>
              <MaterialIcons style={{alignSelf:"center"}} name="upload-file" size={50} color="grey" />
</View>

<Button disabled={buttonStatusDocFile} title="Save" onPress={ () => DocFilesUpload()} />
      {/* <Button title='Save to DB' onPress={() => DocFileUrl() }/> */}

      </TouchableOpacity>


       <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Funding Details</Text>

         <Text style={{fontSize:14,paddingRight: "10%",}}>
         {!businessCapital  && (
        <Text style={{color: 'red'}}>*</Text>
      )} How much capital do you need?</Text>
         
         <View style={styles.inputContainer}>
         <TextInput
           style={styles.input1}
           placeholder="Business Capital"
          //  onChangeText={(numeric) => setbusinessCapital(numeric)}
           value={Number(businessCapital).toLocaleString()}
          //  keyboardType="numeric"
          //  onSubmitEditing={handleOnBlur}
           editable={false}
         />
   
       </View>
       { businessCapital > 0 && (
       <View style={styles.tableContainer}>

       <ScrollView horizontal={true} style={{ marginTop: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Capital</Text>
            <Text style={styles.tableHeader}>Interest</Text>
            <Text style={styles.tableHeader}>Months</Text>
            <Text style={styles.tableHeader}>Sum</Text>


          </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{businessCapital.toLocaleString()}</Text>
              <Text style={styles.tableCell}>5%</Text>
              <Text style={styles.tableCell}>12</Text>
              <Text style={styles.tableCell}>{totalReturn.toLocaleString()}</Text>

            </View>
        </View>
      </ScrollView>

      { businessCapital > 0 && installments.length > 0 ? (
  <ScrollView horizontal={true} style={{ marginTop: 10 }}>
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Amount</Text>
        <Text style={styles.tableHeader}>Due Date</Text>
      </View>
      {installments.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.installment.toLocaleString()}</Text>
          <Text style={styles.tableCell}>{item.maxdate}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
) : null}

      </View>
      )}



       <Text style={{fontSize:14,paddingRight: "1%",}}>Note: You will return the amount with 5% interest within 6 months. Once you have submitted your funding request
       , our team will review it and generate a expected partial payment date for you.</Text>






            





       <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>
       {!fileURL  && (
        <Text style={{color: 'red'}}>*</Text>
      )}

       Business Registration, Permits and License Files</Text>

       {filee && <Text numberOfLines={1} ellipsizeMode={'middle'}  style={{fontSize:14}} >File Attached: { PDFFileName }</Text>}

       <TouchableOpacity style={styles.itemContainer1}  onPress={  () => pickFile()}>
    <View style={styles.fileborder}>
              <Text style={{alignSelf:"center",paddingBottom:"2%"}}>Click to Upload File</Text>
              <MaterialIcons style={{alignSelf:"center"}} name="upload-file" size={50} color="grey" />
</View>

<Button disabled={buttonStatusfile} title="Save" onPress={ () => FilessUpload()} />
      {/* <Button title='Save to DB' onPress={() => FileUrl() }/> */}

      </TouchableOpacity>





<TouchableOpacity style={styles.button}  onPress={() => handleValidation()} >
        <Text style={{ color:'#ffffff' }}>Pitch</Text> 
      </TouchableOpacity> 
      </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      maxHeight:"94%"
    },
    button: {
      width: "100%",
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
      marginBottom: 8,
      backgroundColor: "white",
      borderRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      borderWidth: 1,
  
  
  
  
    },
    inputContainerDropdown: {
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
      width:"100%",
  
    },
  
    inputContainerDropdownRow: {
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
      width:"50%",
  
    },
  
  
    icon: {
      marginRight: 10,
    },
    input: {
      // flex: 1,
      height: 45,
      width:"80%",
      
  
    },
  
    input1: {
      // flex: 1,
      height: 45,
      width:"80%",
    },
    inputdetails: {
      // flex: 1,
      height: 80,
      width:"80%",
    },

  
    inputbday: {
      // flex: 1,
      height: 45,
      width:"92%",
    },
  
  
    inputdropddown: {
      // flex: 1,
      height: 45,
      width:"80%",
      backgroundColor:"white"
    },
  
  
    inputrow: {
      // flex: 1,
      height: 45,
      width:"48%",
    },
  
  
   View: {
       flex: 1,
       width:"100%",
      //  marginLeft:"20%"
    },
  
    inputError: {
      borderColor: 'red',
    },


    //for photo border

    itemContainer: {
        // flex: 1,
        padding: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection:  'column',
    
        marginHorizontal:10,
        marginVertical:10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:10,
    
      },

      itemContainer1: {
        // flex: 1,
        padding: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection:  'column',
    
        marginHorizontal:10,
        marginVertical:10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:10,
        
    
      },

      image: {
        width: '50%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
      },
    
      image2: {
        width: '100%',
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 8,
      },
      file: {
        width: '100%',
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 8,
      },


      photoborder: {
        borderColor: '#808080', 
        borderWidth: 0.5 , 
        width: '100%',
        height: 260,  
        borderRadius: 8,
    },
    fileborder: {
      borderColor: '#808080', 
      borderWidth: 0.5 , 
      width: '100%',
      height: 90,  
      borderRadius: 8 ,
      borderStyle: 'dashed',
      
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },

  tableContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  table: {
    width: '100%',
    borderWidth: .5,
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  tableHeader: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 8,
  },


  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  removeButton: {
    alignItems: 'center',
  },
  fundsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
  },

    
  
  });
  



// import Axios from "axios";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState, useRef } from "react";
// import { Button, 
//   FlatList, 
//   StyleSheet, 
//   Text, 
//   View, 
//   ToastAndroid, 
//   Image, 
//   TextInput, 
//   TouchableOpacity, 
//   ScrollView, 
//   Alert} from "react-native";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import SelectDropdown from "react-native-select-dropdown";
// import {
//   regions,
//   provinces,
//   cities,
//   barangays,
// } from "select-philippines-address";

// import CalendarPicker from 'react-native-calendar-picker';
// import { AntDesign } from '@expo/vector-icons';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from '@react-navigation/native';
// import {bussinessTypes, bussinessesName} from "./BusinessList"
// import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from "expo-document-picker";
// import { MaterialIcons } from '@expo/vector-icons';



// export default function UploadBusiness() {

//   //ADDRESS
//   const [regionData, setRegionData] = useState([]);
//   const [provinceData, setProvince] = useState([]);
//   const [cityData, setCity] = useState([]);
//   const [barangayData, setBarangay] = useState([]);
//   const [barangaynameData, setBarangayname] = useState([]);
//   const [selectedRegion, setselectedRegion] = useState("");
//   const [selectedProvince, setselectedProvince] = useState("");
//   const [selectedCity, setselectedCity] = useState("");
//   const [selectedBrgy, setselectedBrgy] = useState("");
//   const [otherBusiness, setOtherBuss] = useState("");
//   const[purpose, setPurpose] = useState("");
//   const[target, setTarget] = useState("");
//   const[prodandServce, setProdServce] = useState("");
//   const [isChecked, setIsChecked] = useState([]);


//   const [businessName, setbusinessName] = useState("");
//   const [businessCapital, setbusinessCapital] = useState("");
//   const [businessDetails, setbusinessDetails] = useState("");

//   const[user, setUser] = useState('');


//   //
//   const [mission, setMission] = useState("");
//   const [vission, setVission] = useState("");
//   const [targetMarket, setargetMarket] = useState("");
//   const [trends, setTrends] = useState("");
//   const [competitive, setCompetitive] = useState("");
//   const [setsYouApart, setsetsYouApart] = useState("");
//   const [proposition, setProposition] = useState("");
//   const [revenue, setRevenue] = useState("");
//   const [pricing, setPricing] = useState("");
//   const [marketPlan, setMarketPlan] = useState("");
//   const [salesChannels, setSalesChannels] = useState("");
//   const [revenueForecast, setRevenueForecast] = useState("");
//   const [profileProj, setProfileProj] = useState("");
//   const [expenseProj, setExpenseProj] = useState("");
//   const [identifyRisk, setIdentifyRisk] = useState("");
//   const [mitigation, setMitigation] = useState("");
//   const [conNumber, setConNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [timeline, setTimeline] = useState("");
//   const [allocation, setAllocation] = useState("");








// useEffect(() => {
//   provinces("07").then((result) => setProvince(result));
// }, []);


//     const city = (e) => {
//       setselectedProvince(e.province_name);
//         cities(e.province_code).then((result) => setCity(result));
//         // setProvince(e.province_code);
//         // console.log(selectedProvince)
//     }

//     const brgy = (e) => {
//       setselectedCity(e.city_name);
//         barangays(e.city_code).then((result) => setBarangay(result));
//         // setProvince(e.city_code);
//         // console.log(selectedCity)

//     }

//     const brgyname = (e) => {
//       setselectedBrgy(e.brgy_name);
//       barangays(e.brgy_code).then((result) => setBarangayname(result));
//       // setProvince(e.city_code);
//       // console.log(selectedBrgy)

//   }



//   //to display data
  
  

//   const Pitch = () => {
//     Axios.post("http://192.168.8.103:19001/pitch", {
//       user: user,
//       businessName: businessName,
//       businessTypeSelectd: businessTypeSelectd,
//       businessCapital: businessCapital,
//       businessDetails: businessDetails,
//       selectedProvince: selectedProvince,
//       selectedCity: selectedCity,
//       selectedBrgy: selectedBrgy,
//       createdAt: createdAt,
//       imageURL: imageURL,


//     })
//       .then((res) =>  
//       // {
//         ToastAndroid.show("please wait for the approval",
//         ToastAndroid.SHORT,ToastAndroid.BOTTOM),

//         ToastAndroid.show("business succesfully posted!",
//         // setbusinessName(""),
//         // setbusinessTypeSelectd(""),
//         // setbusinessCapital(""),
//         // setbusinessDetails(""),
//         // setselectedProvince(""),
//         // setselectedCity(""),
//         // setselectedBrgy(""),
//         // setimageURL(""),

//         ToastAndroid.LONG,ToastAndroid.BOTTOM),
//         navigation.navigate("Entreprenuer")


          
//       )
//       .catch((error) => console.log(error));
      
//   };


 

//   useEffect(() => {
//     setbusinessType(bussinessTypes())
//     // console.log(bussinessTypes())

//   }, []);

//   const [businessType, setbusinessType] = useState([]);
//   const [businessTypeSelectd, setbusinessTypeSelectd] = useState([]);
//   const [businessesName, setbusinessesName] = useState([]);
//   const [bussNameSelectd, setbussNameSelectd] = useState([]);


//   const bussType = (e) => {
//     setbusinessTypeSelectd(e.bussiness_type)
//     setbusinessesName(bussinessesName(e.bussine_type_code))
//     console.log(e.bussiness_type)
//     // console.log(businessTypeSelectd)

// }


// const BussName = (e) => {
//   setbussNameSelectd(e.bussiness_name);
//   bussinessesName(e.bussiness_name)
//   console.log(e.bussiness_name)
//   // console.log(bussNameSelectd)

// }



// //////////////// created
 
//   var datee = new Date().getDate();
//   var month = new Date().getMonth() + 1;
//   var year = new Date().getFullYear();
//   var hr = new Date().getHours();
//   var min = new Date().getMinutes();
//   var secs = new Date().getSeconds();

//   // You can turn it in to your desired format
//   var createdAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;
//   // Alert.alert(getCurrentDate);
 

// //////////////// updated
 
// var datee = new Date().getDate();
// var month = new Date().getMonth() + 1;
// var year = new Date().getFullYear();
// var hr = new Date().getHours();
// var min = new Date().getMinutes();
// var secs = new Date().getSeconds();

// var updatedAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;




// const findUser = async () => {
//   const result = await AsyncStorage.getItem('userID');
//     console.log(result);
//     if(!result){
//       navigation.navigate("Login")

//     }
//   setUser(JSON.parse(result))
//   };

//   useEffect(() => {
//     findUser();
//   },[])



//   const navigation = useNavigation();


//   //image
// const [image, setImage] = useState(null);
// const [imageFilename, setImageFilename] = useState("");
// const [imageURL, setimageURL] = useState("");
// const [imagedataURL, setimagedataURL] = useState([]);
// const [buttonStatus, setbuttonStatus] = useState(true);
// const [buttonStatusfile, setbuttonStatusFile] = useState(true);



// const pickImage = async () => {
//   // No permissions request is necessary for launching the image library
//   setbuttonStatus(true);
//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [5, 5],
//     quality: 1,
//   });

//   //  console.log(result);

//   if (!result.canceled) {
//       setbuttonStatus(false);
//     setImage(result.assets[0].uri);
//     setImageFilename(result.assets[0].uri.split("/").pop());
//   //   console.log(image);
//   }

// };


// const imagesUpload = async () => {

//   const storagee = storage;
//   const imageRef = ref(storagee, "images/" + imageFilename);
//   const img = await fetch(image);
//   const blob = await img.blob();

//   uploadBytes(imageRef, blob).then((snap) => {
//     getDownloadURL(imageRef).then((url) => {
//        console.log(url);
//       setimageURL(url);
//     });
//   });

// };



// //for file upload


// const [filee, setFile] = useState(null);
// const [filename, setFilename] = useState("");
// const [fileURL, setFileURL] = useState("");
// const [filedataURL, setFileDataURL] = useState([]);
// const [PDFFileName, setPDFilename] = useState("")

// useEffect(() => {
// Axios.get("http://192.168.8.103:19001/getImage")
// .then((result) => setimagedataURL(result.data)) 
// .catch((error) => console.log(error))
// },[]);


// useEffect(() => {
//     Axios.get("http://192.168.8.103:19001/getFile")
//     .then((result) => setFileURL(result.data)) 
//     .catch((error) => console.log(error))
//     },[]);
    

// const pickFile = async () => {
//     // No permissions request is necessary for launching the image library
//     setbuttonStatusFile(true);
//     let result = await DocumentPicker.getDocumentAsync({
//       type: 'application/pdf',
//     });

//    console.log(result.name);
//   //  console.log(result.uri.split("/").pop());
   

//     if (!result.canceled) {
//       setbuttonStatusFile(false);
//       setFile(result.uri);
//       setFilename(result.uri.split("/").pop());
//       setPDFilename(result.name)
//     }


    

// };


// const FilessUpload = async () => {

//     const storagee = storage;
//     const fileRef = ref(storagee, "images/" + filename);
//     const pdf = await fetch(filee);
//     const blob = await pdf.blob();

//     uploadBytes(fileRef, blob).then((snap) => {
//       getDownloadURL(fileRef).then((url) => {
//          console.log(url);
//          setFileURL(url);
//       });
//     });

//   };


//   const FileUrl = () => {
//     Axios.post("http://192.168.8.103:19001/fileUpload", {
//       fileURL: fileURL,
//     })
//       .then((res) => console.log(res.data), ToastAndroid.show(
//         "File sucessfully added!",
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM
//       ))
//       .catch((error) => console.log(error));
      
//   };




  
//   return (
//     <View style={styles.container}>
       
//        {/* <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Pitch Business</Text> */}

//        <ScrollView style={styles.View}
//       contentContainerStyle={{flexGrow : 1, justifyContent : 'center',padding: "7%"}}>

// {/* //for photo */}
//     <TouchableOpacity style={styles.itemContainer}  onPress={  () => pickImage()}>
//     <View style={styles.photoborder}>

//      {image && <Image source={{ uri: image }} style={styles.image2} />}
// </View>

// <Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} />

//       </TouchableOpacity>

//       <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Overview</Text>
//       <Text style={{fontSize:14,paddingRight: "59%",}}>Business Name</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Business Name"
//         onChangeText={(text) => setbusinessName(text)}
//         value={businessName}
//          />
   
//        </View>

//        <Text style={{fontSize:14,paddingRight: "59%",}}>Type of Business </Text>

// <SelectDropdown
//              data={businessType}
//              onSelect={(selectedItem, index) => {
//              // console.log(selectedItem, index);
//              bussType(selectedItem);
//              }}
//              defaultButtonText={'Business Name'}
//              buttonTextAfterSelection={(selectedItem, index) => {
//                return selectedItem.bussiness_type;
               
//              }}
//              rowTextForSelection={(item, index) => {
//                return item.bussiness_type;
//              }}
//              buttonStyle={styles.inputContainerDropdown}
//              buttonTextStyle={{fontSize:14, marginRight:"60%", }}
//              renderDropdownIcon={isOpened => {
//                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
//              }}
//              dropdownIconPosition={'right'}
//              dropdownStyle={styles.dropdown1DropdownStyle}
//              rowStyle={styles.dropdown1RowStyle}
//              rowTextStyle={{fontSize:14,}}
//            />


//          <SelectDropdown
//              data={businessesName}
//              onSelect={(selectedItem, index) => {
//              //  console.log(selectedItem, index);
//               BussName(selectedItem);
//              }}
//              defaultButtonText={'Business Type'}
//              buttonTextAfterSelection={(selectedItem, index) => {
//                return selectedItem.bussiness_name;
               
//              }}
//              rowTextForSelection={(item, index) => {
//                return item.bussiness_name;
//              }}
//              buttonStyle={styles.inputContainerDropdown}
//              buttonTextStyle={{fontSize:14, marginRight:"60%", }}
//              renderDropdownIcon={isOpened => {
//                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
//              }}
//              dropdownIconPosition={'right'}
//              dropdownStyle={styles.dropdown1DropdownStyle}
//              rowStyle={styles.dropdown1RowStyle}
//              rowTextStyle={{fontSize:14,}}
//            />

//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Mission & Vision</Text>
//     <Text style={{fontSize:14,paddingRight: "59%",}}>Mission</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//             multiline={true}
//         style={styles.input1Desc}
//         numberOfLines={4} // You can adjust the number of lines as needed
//         placeholder="Enter Business Description"
//         onChangeText={(text) => setMission(text)}
//         value={mission}
//          />
//        </View>
//        <Text style={{fontSize:14,paddingRight: "59%",}}>Vission</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//             multiline={true}
//         style={styles.input1Desc}
//         numberOfLines={4} // You can adjust the number of lines as needed
//         placeholder="Enter Business Description"
//         onChangeText={(text) => setVission(text)}
//         value={vission}
//          />
//        </View>


//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Market Analysis</Text>
//     <Text style={{fontSize:14,paddingRight: "59%",}}>Target Market</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Target Market"
//         onChangeText={(text) => setargetMarket(text)}
//         value={targetMarket}
//          />
   
//        </View>

//        <Text style={{fontSize:14,paddingRight: "59%",}}>Industry Trends</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Industry Trends"
//         onChangeText={(text) => setTrends(text)}
//         value={trends}
//          />
   
//        </View>

//        <Text style={{fontSize:14,paddingRight: "59%",}}>Competitive Analysis</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="competitive Analysis"
//         onChangeText={(text) => setCompetitive(text)}
//         value={competitive}
//          />
   
//        </View>





//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Unique Selling Proposition</Text>
//     <Text style={{fontSize:14,paddingRight: "59%",}}>What Sets you Apart</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Type Here"
//         onChangeText={(text) => setsetsYouApart(text)}
//         value={setsYouApart}
//          />
   
//        </View>

//        <Text style={{fontSize:14,paddingRight: "59%",}}>Value Proposition</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Type Here"
//         onChangeText={(text) => setProposition(text)}
//         value={proposition}
//          />
   
//        </View>



//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Revenue Model</Text>

//     <Text style={{fontSize:14,paddingRight: "59%",}}>Revenue Sources</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Revenue Sources"
//         onChangeText={(text) => setRevenue(text)}
//         value={revenue}
//          />
   
//        </View>

//        <Text style={{fontSize:14,paddingRight: "59%",}}>Pricing Strategy</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Pricing Strategy"
//         onChangeText={(text) => setPricing(text)}
//         value={pricing}
//          />
   
//        </View>



//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Marketing and Sals Strategy</Text>

//     <Text style={{fontSize:14,paddingRight: "59%",}}>Marketing Plan</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Pricing Strategy"
//         onChangeText={(text) => setMarketPlan(text)}
//         value={marketPlan}
//          />
   
//        </View>

//        <Text style={{fontSize:14,paddingRight: "59%",}}>Sales Channels</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Pricing Strategy"
//         onChangeText={(text) => setSalesChannels(text)}
//         value={salesChannels}
//          />
   
//        </View>



//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Financial Projections</Text>
//     <Text style={{fontSize:14,paddingRight: "59%",}}>Revenue Forecast</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Revenue Forecast"
//         onChangeText={(text) => setRevenueForecast(text)}
//         value={revenueForecast}
//          />
   
//        </View>
//        <Text style={{fontSize:14,paddingRight: "59%",}}>Profile Projections</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Pricing Strategy"
//         onChangeText={(text) => setProfileProj(text)}
//         value={profileProj}
//          />
   
//        </View>
//        <Text style={{fontSize:14,paddingRight: "59%",}}>Expense Projections</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Pricing Strategy"
//         onChangeText={(text) => setExpenseProj(text)}
//         value={expenseProj}
//          />
   
//        </View>




//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Risks and Challenges</Text>
//     <Text style={{fontSize:14,paddingRight: "59%",}}>Identify Risk</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Identify Risk"
//         onChangeText={(text) => setIdentifyRisk(text)}
//         value={identifyRisk}
//          />
   
//        </View>
//        <Text style={{fontSize:14,paddingRight: "59%",}}>Mitigation Strategies</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Mitigation Strategies"
//         onChangeText={(text) => setMitigation(text)}
//         value={mitigation}
//          />
   
//        </View>




    
//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Contact Information</Text>
//     <Text style={{fontSize:14,paddingRight: "59%",}}>Contact Number</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Contact Number"
//         onChangeText={(text) => setIdentifyRisk(text)}
//         value={identifyRisk}
//          />
   
//        </View>
//        <Text style={{fontSize:14,paddingRight: "59%",}}>Email Address</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Email Address"
//         onChangeText={(text) => setEmail(text)}
//         value={email}
//          />
   
//        </View>



//     <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Use of Funds</Text>

//     <Text style={{fontSize:14,paddingRight: "59%",}}>Allocation</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Allocation"
//         onChangeText={(text) => setAllocation(text)}
//         value={allocation}
//          />
   
//        </View>
//        <Text style={{fontSize:14,paddingRight: "59%",}}>Timeline</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Timeline"
//         onChangeText={(text) => setTimeline(text)}
//         value={timeline}
//          />
   
//        </View>


//       <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Details</Text>
//       {/* <Text style={{fontSize:14,paddingRight: "59%",}}>Business Name</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Business Name"
//         onChangeText={(text) => setbusinessName(text)}
//         value={businessName}
//          />
   
//        </View> */}

//          <Text style={{fontSize:14,paddingRight: "59%",}}>Capital</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Business Capital"
//            onChangeText={(numeric) => setbusinessCapital(numeric)}
//            value={businessCapital}
//          />
   
//        </View>

//        <Text style={{fontSize:14,paddingRight: "59%",}}>Description</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//             multiline={true}
//         style={styles.input1Desc}
//         numberOfLines={4} // You can adjust the number of lines as needed
//         placeholder="Enter Business Description"
//         onChangeText={(text) => setbusinessDetails(text)}
//         value={businessDetails}
//          />
   
//        </View>

//        <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Purpose</Text>
//       <Text style={{fontSize:14,paddingRight: "59%",}}>Purpose</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Business Name"
//         onChangeText={(text) => setPurpose(text)}
//         value={purpose}
//          />

   
//        </View>

//        <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Target</Text>
//       <Text style={{fontSize:14,paddingRight: "59%",}}>Target</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Business Target"
//         onChangeText={(text) => setTarget(text)}
//         value={target}
//          />
//        </View>



//        <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Product and Service</Text>
//       <Text style={{fontSize:14,paddingRight: "59%",}}>Product and Service</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Business Product and Service"
//         onChangeText={(text) => setProdServce(text)}
//         value={prodandServce}
//          />
//        </View>






//       <Text style={{fontSize:14,paddingRight: "59%",}}>Others</Text>
//          <View style={styles.inputContainer}>
//          <TextInput
//            style={styles.input1}
//            placeholder="Others"
//         onChangeText={(text) => setOtherBuss(text)}
//         value={otherBusiness}
//          />
   
//        </View>
            



//         <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Business Address</Text>
//        <Text style={{fontSize:14,paddingRight: "59%",}}>Province</Text>
//          <SelectDropdown
//         data={provinceData}
//         defaultButtonText={'Select province'}

//         onSelect={(selectedItem, index) => {
//         //   console.log(selectedItem, index);
//         city(selectedItem);

//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem.province_name;
//         }}
//         rowTextForSelection={(item, index) => {
//           return item.province_name;
//         }}

//         buttonStyle={styles.inputContainerDropdown}
//               buttonTextStyle={{fontSize:14, marginRight:"60%", }}
//               renderDropdownIcon={isOpened => {
//                 return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown2DropdownStyle}
//               rowStyle={styles.dropdown2RowStyle}
//               rowTextStyle={{fontSize:14,}}

//       />
   


//        <Text style={{fontSize:14,paddingRight: "59%",}}>Address</Text>
//        <View style={{flexDirection:'row'}}>
//          <SelectDropdown
//         data={cityData}
//         defaultButtonText={'Select city'}
//         onSelect={(selectedItem, index) => {
//             brgy(selectedItem);

//         //   console.log(selectedItem, index);

//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem.city_name;
//         }}
//         rowTextForSelection={(item, index) => {
//           return item.city_name;
//         }}

//         buttonStyle={styles.inputContainerDropdownRow}
//               buttonTextStyle={{fontSize:14,}}
//               renderDropdownIcon={isOpened => {
//                 return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown2DropdownStyle}
//               rowStyle={styles.dropdown2RowStyle}
//               rowTextStyle={{fontSize:14, }}

//       />
   
//        <SelectDropdown
//         defaultButtonText={'Select barangay'}

//         data={barangayData}
//         onSelect={(selectedItem, index) => {
//           brgyname(selectedItem);

//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem.brgy_name;
//         }}
//         rowTextForSelection={(item, index) => {
//           return item.brgy_name;
//         }}
//         buttonStyle={styles.inputContainerDropdownRow}
//               buttonTextStyle={{fontSize:14,}}
//               renderDropdownIcon={isOpened => {
//                 return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={15} />;
//               }}
//               dropdownIconPosition={'right'}
//               dropdownStyle={styles.dropdown2DropdownStyle}
//               rowStyle={styles.dropdown2RowStyle}
//               rowTextStyle={{fontSize:14, }}

//       />
//        </View>

//        <Text style={{fontSize:20, paddingBottom:"2%", fontWeight:"500"}}>Upload Credentials</Text>

//        {filee && <Text numberOfLines={1} ellipsizeMode={'middle'}  style={{fontSize:14}} >{ PDFFileName }</Text>}

//        <TouchableOpacity style={styles.itemContainer1}  onPress={  () => pickFile()}>
//     <View style={styles.fileborder}>
//               <Text style={{alignSelf:"center",paddingBottom:"2%"}}>Click to Upload File</Text>
//               <MaterialIcons style={{alignSelf:"center"}} name="upload-file" size={50} color="grey" />
// </View>

// <Button disabled={buttonStatusfile} title="Save" onPress={ () => FilessUpload()} />
//       <Button title='Save to DB' onPress={() => FileUrl() }/>

//       </TouchableOpacity>





// <TouchableOpacity style={styles.button}  onPress={() => Pitch()} >
//         <Text style={{ color:'#ffffff' }}>Pitch</Text> 
//       </TouchableOpacity> 
//       </ScrollView>


//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#fff",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     button: {
//       width: "100%",
//       borderRadius: 10,
//       height: 50,
//       alignItems: "center",
//       justifyContent: "center",
//       marginTop: 15,
//       backgroundColor: "#534c88",
//     },
//     buttonn: {
//       height: 40,
//       width: 280,
//       borderRadius: 10,
//     },
//     text: {
//       fontSize: 30,
//       fontWeight: "600",
//       marginBottom: 30,
//     },
//     image: {
//       width: 150,
//       height: 150,
//        borderRadius: 170,
//       // backgroundColor: '#FFFFFF',
//       alignItems: 'center',
//       justifyContent: 'center',
//       shadowColor: '#000000',
//       shadowOffset: {
//         width: 0,
//         height: 3,
//       },
//       shadowRadius: 6,
//       shadowOpacity: 0.16,
//     },
  
  
  
//     inputContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       borderColor: '#ccc',
//       borderWidth: 1,
//       borderRadius: 5,
//       paddingLeft: 10,
//       marginBottom: 8,
//       backgroundColor: "white",
//       borderRadius: 10,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.8,
//       shadowRadius: 2,
//       elevation: 1,
//       borderWidth: 1,
  
  
  
  
//     },
//     inputContainerDropdown: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       borderColor: '#ccc',
//       borderWidth: 1,
//       borderRadius: 5,
//       paddingLeft: 10,
//       marginBottom: 8,
//       backgroundColor: "white",
//       borderRadius: 10,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.8,
//       shadowRadius: 2,
//       elevation: 1,
//       borderWidth: 1,
//       width:"100%",
  
//     },
  
//     inputContainerDropdownRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       borderColor: '#ccc',
//       borderWidth: 1,
//       borderRadius: 5,
//       paddingLeft: 10,
//       marginBottom: 8,
//       backgroundColor: "white",
//       borderRadius: 10,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.8,
//       shadowRadius: 2,
//       elevation: 1,
//       borderWidth: 1,
//       width:"50%",
  
//     },
  
  
//     icon: {
//       marginRight: 10,
//     },
//     input: {
//       // flex: 1,
//       height: 45,
//       width:"80%",
      
  
//     },
  
//     input1: {
//       // flex: 1,
//       height: 45,
//       width:"80%",
//     },
      
//     input1Desc: {
//       // flex: 1,
//       height: 90,
//       width:"80%",
//     },

  
//     inputbday: {
//       // flex: 1,
//       height: 45,
//       width:"92%",
//     },
  
  
//     inputdropddown: {
//       // flex: 1,
//       height: 45,
//       width:"80%",
//       backgroundColor:"white"
//     },
  
  
//     inputrow: {
//       // flex: 1,
//       height: 45,
//       width:"50%",
//     },
  
  
//    View: {
//        flex: 1,
//        width:"100%",
//       //  marginLeft:"20%"
//     },
  
//     inputError: {
//       borderColor: 'red',
//     },


//     //for photo border

//     itemContainer: {
//         // flex: 1,
//         padding: 5,
//         // alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection:  'column',
    
//         marginHorizontal:10,
//         marginVertical:10,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         marginBottom:10,
//         borderBottomWidth:0.5,
//         borderBottomColor:'#808080',
//         padding:10,
    
//       },

//       itemContainer1: {
//         // flex: 1,
//         padding: 5,
//         // alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection:  'column',
    
//         marginHorizontal:10,
//         marginVertical:10,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         marginBottom:10,
//         borderBottomWidth:0.5,
//         borderBottomColor:'#808080',
//         padding:10,
        
    
//       },

//       image: {
//         width: '50%',
//         height: 100,
//         resizeMode: 'cover',
//         borderRadius: 8,
//       },
    
//       image2: {
//         width: '100%',
//         height: "100%",
//         resizeMode: 'cover',
//         borderRadius: 8,
//       },
//       file: {
//         width: '100%',
//         height: "100%",
//         resizeMode: 'cover',
//         borderRadius: 8,
//       },


//       photoborder: {
//         borderColor: '#808080', 
//         borderWidth: 0.5 , 
//         width: '100%',
//         height: 240,  
//         borderRadius: 8,
//     },
//     fileborder: {
//       borderColor: '#808080', 
//       borderWidth: 0.5 , 
//       width: '100%',
//       height: 90,  
//       borderRadius: 8 ,
//       borderStyle: 'dashed',
      
//   },

    
    
  
//   });
  