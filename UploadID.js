import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, ToastAndroid, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import Axios from 'axios';
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NETWORK_ADDPOCKET} from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";




const UploadID = () => {
    const [buttonStatusImage, setbuttonStatusImage] = useState(true);
    const [buttonStatusFront, setbuttonStatusFront] = useState(true);
    const [buttonStatusBack, setbuttonStatusBack] = useState(true);
    const navigation = useNavigation();

    const [imageURL, setimageURL] = useState("");
    const [image, setImage] = useState(null);
    const [imageFilename, setImageFilename] = useState(null);

    
    const [imageBackURL, setimageBackURL] = useState("");
    const [imageBack, setImageBack] = useState(null);
    
    
    const [imageFrontURL, setimageFrontURL] = useState("");
    const [imageFront, setImageFront] = useState(null);

    const [imageP, setimageP] = useState("");
    const [imageFrontID, setimageFrontID] = useState("");
    const [imageBackID, setimageBackID] = useState("");
    const[user, setUser] = useState('');
    const[userType, setUserType] = useState('');

    const [idType, setIDType] = useState("");
    const [selectedID, setselectedID] = useState("");


    const pickAndUploadImage = async (setImageFunc, setImageFilenameFunc, setButtonStatusFunc, setImgURLFunc, type) => {
      setButtonStatusFunc(true);

      let aspectRatio = [1, 1]; // Default aspect ratio
      let qualityValue = 0.8; // Default quality value
    
      // Define aspect ratio and quality based on the image type
      switch (type) {
        case "image":
          aspectRatio = [5, 5]; // Adjust aspect ratio for image type
          qualityValue = 0.7; // Adjust quality for image type
          break;
        case "imageFront":
          aspectRatio = [16, 9]; // Adjust aspect ratio for imageFront type
          qualityValue = 0.7; // Adjust quality for imageFront type
          break;
        case "imageBack":
          aspectRatio = [16, 9]; // Adjust aspect ratio for imageBack type
          qualityValue = 0.7; // Adjust quality for imageBack type
          break;
        default:
          break;
      }
    
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: aspectRatio,
        quality: qualityValue,
      });

      if (!result.canceled) {
        setButtonStatusFunc(false);
        setImageFunc(result.assets[0].uri);
        setImageFilenameFunc(result.assets[0].uri.split("/").pop());
    
        const storageRef = ref(storage, "images/" + result.assets[0].uri.split("/").pop());
        const fetchedImg = await fetch(result.assets[0].uri);
        const imgBlob = await fetchedImg.blob();
    
        uploadBytes(storageRef, imgBlob).then((snap) => {
          getDownloadURL(storageRef).then((url) => {
            // console.log("Uploaded URL:", url);
    
            // Determine which state and URL to set based on the type parameter
            switch (type) {
              case "image":
                console.log("image")
                setimageP(url);
                console.log(imageP)

                break;
              case "imageFront":
                console.log("imageFront")
                setimageFrontID(url);
                console.log(imageFrontID)

                break;
              case "imageBack":
                console.log("imageBack")
                setimageBackID(url);
                console.log(imageBackID)

                break;
              default:
                break;
            }
          });
        });
      }
    };
      
      const pickImage = async () => {
        await pickAndUploadImage(setImage, setImageFilename, setbuttonStatusImage, setimageURL, "image");
        
      };
      
      const pickImageFront = async () => {
        await pickAndUploadImage(setImageFront, setImageFilename, setbuttonStatusFront, setimageFrontURL,"imageFront");
      };
      
      const pickImageBack = async () => {
        await pickAndUploadImage(setImageBack, setImageFilename, setbuttonStatusBack, setimageBackURL,"imageBack");
      };
      

      const findUser = async () => {
        const result = await AsyncStorage.getItem('userID');
        const usertpe = await AsyncStorage.getItem('userType');


          console.log(result);
          if(!result){
            navigation.navigate("Login")
      
          }
        setUser(JSON.parse(result))
        setUserType(JSON.parse(usertpe))
        };
      
        useEffect(() => {
          findUser();
        },[])
    
        useEffect(() => {
          setTimeout(() => {
            setIDType([
              {title: 'National ID'},
              {title: 'Drivers License'},
              {title: 'UMID ID'},
              {title: 'PRC ID'},
              {title: 'Passport'},
            ]);
          }, 1000);
        }, []);
      
        const typeOfID = (e) => {
          setselectedID(e.title);
        
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

  const handleValidation = () =>{
    if(!imageP || !imageFrontID || !imageFrontID || !selectedID || !imageBackID )
    {
      ToastAndroid.show("Please fill in all required fields", 
      ToastAndroid.SHORT, ToastAndroid.BOTTOM);

      return; // Don't proceed with the submission if any field is empty
    }

    else{
      ImageDB();

    }


  }

      

  const ImageDB = () => {
      Axios.post(`${NETWORK_ADDPOCKET}/IDimage`, {
        selectedID:selectedID,
        user:user,
        imageP: imageP,
        imageFrontID:imageFrontID,
        imageBackID:imageBackID,
        createdAt:createdAt

    })
      .then((res) => 
    {     
        console.log(res.data) 
      
       if(userType === "investor"){
        navigation.navigate("Home")
        ToastAndroid.show(
          "ID succesfully submitted!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM)
       }
       else if(userType === "entrepreneur"){
        navigation.navigate("Entreprenuer")
        ToastAndroid.show(
          "ID succesfully submitted!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM)
       }

        })
      .catch((error) => console.log(error));


  };




  return (
      <ScrollView>
      <View style={styles.container}>

        <TouchableOpacity style={styles.itemContainer} onPress={() => pickImage()}>
        <Text style={styles.labelnameProf}>Attach Profile</Text>

          {!imageURL && <Text style={{ color: 'red' }}>*</Text>}

          <View style={styles.photo2x2border}>
            {image && <Image source={{ uri: image }} style={styles.image2} />}
          </View>

        </TouchableOpacity>

        <Text style={styles.labelname}>Type of ID</Text>
      <SelectDropdown
              data={idType}
              onSelect={(selectedItem, index) => {
              typeOfID(selectedItem, index);
              }}
              defaultButtonText={'Choose Type'}
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


      <View style={styles.itemContainer} >
      <Text style={styles.labelname}>Attach Front ID</Text>

          <View style={styles.photoborder}>
          <Image source={require("./assets/front.jpg")}  style={styles.image2} />

          </View>

        </View>




        <TouchableOpacity style={styles.itemContainer} onPress={() => pickImageFront()}>

          {!imageFrontURL && <Text style={{ color: 'red' }}>*</Text>}

          <View style={styles.photoborder}>
          {imageFront && <Image source={{ uri: imageFront }} style={styles.image2} />}
          </View>

        </TouchableOpacity>


        <View style={styles.itemContainer} >
        <Text style={styles.labelname}>Attach Back ID</Text>

          <View style={styles.photoborder}>
          <Image source={require("./assets/backID.png")}  style={styles.image2} />

          </View>

        </View>



        <TouchableOpacity style={styles.itemContainer} onPress={() => pickImageBack()}>
          {!imageBackURL && <Text style={{ color: 'red' }}>*</Text>}

          <View style={styles.photoborder}>
            {imageBack && <Image source={{ uri: imageBack }} style={styles.image2} />}
          </View>
        </TouchableOpacity>
        
      <Button disabled={buttonStatusImage || buttonStatusBack || buttonStatusFront}  onPress={() => handleValidation()} title='Save' />
       </View>  



      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    marginBottom:30,
    height: "100%"
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 150,
    height: 100,
    borderRadius: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  labelname: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom:15,
    color:'#808080'
  },

  labelnameProf: {
    fontSize: 17,
    fontWeight: 'bold',
    // marginTop: 3,
    color:'#808080'
  },



  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },

  post: {
    marginHorizontal:10,
    shadowColor: 'red',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom:10,
    borderBottomWidth:0.5,
    borderBottomColor:'#808080',
    padding:10,
    height:20,
    width:30
  },

  itemContainer: {
    // flex: 1,
    padding: 5,
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection:  'row',

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

  image1: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },

 photoborder: {
    borderColor: '#808080', 
    borderWidth: 0.5 , 
    width: '50%',
    height: 100,  
    borderRadius: 8 
},

profileborder: {
    borderColor: '#808080', 
    borderWidth: 0.5 , 
    width: '40%',
    height: 130,  
    borderRadius: 100
},


dropdownsRow: {flexDirection: 'column', width: '100%', paddingHorizontal: '5%'},

dropdown1BtnStyle: {
//   flex: 1,
  height:"4%",
  width:"100%",
//   backgroundColor: '#e0dde9',
  borderRadius: 8,
  borderWidth: 0.5,
  borderColor: '#808080',
  marginBottom: 5,
  marginTop: 5,


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

button: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#534c88",
  },

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
  
  photoborder: {
    borderColor: '#808080', 
    borderWidth: 0.5 , 
    width: '100%',
    height: 200,  
    borderRadius: 8,
  },

  photo2x2border: {
    borderColor: '#808080', 
    borderWidth: 0.5 , 
    width: '100%',
    height: 300,  
    borderRadius: 8,
  },

  
  imagePROFILE: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  

});

export default UploadID;