import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { storage, getDownloadURL, ref, uploadBytes } from "./Firebase";
import Axios from 'axios';
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const VerifyID = () => {


const [image, setImage] = useState(null);
const [frontID, setfrontID] = useState(null);
const [backID, setbackID] = useState(null);

const [imageFilename, setImageFilename] = useState("");
const [imageURL, setimageURL] = useState("");
const [imagedataURL, setimagedataURL] = useState([]);
const [buttonStatus, setbuttonStatus] = useState(true);
const [gender, setGender] = useState("");
const [selectedgender, setselectedGender] = useState("");


const pickImage = async (type) => {
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
        if( type == "userphoto" ){
          setImage(result.assets[0].uri);
        }

        else if (type == "frontId"){
          setfrontID(result.assets[0].uri);
        }

        else if(type == "backId"){

          setbackID(result.assets[0].uri);
        }
      // setImageFilename(result.assets[0].uri.split("/").pop());
    //   console.log(image);


    }

};


const imagesUpload = async () => {

  // const userphoto = image.split("/").pop();
  // const frontIDfilename = frontID.split("/").pop();
  // const backIDfilename = backID.split("/").pop();

  // console.log(userphoto);
  // console.log(frontIDfilename);
  // console.log(backIDfilename);
  let Listimages = [{type: "userphoto" ,images: image} , {type: "frontId" ,images: frontID}, {type: "backId" , images: backID}]
// console.log(Listimages);

let downloadUrl = []

for(let i=0 ; i < Listimages.length ; i++ ){

  const filename = Listimages[i].images.split("/").pop();
  const filetype = Listimages[i].type;
  // console.log(filename)
  // console.log(filetype)


    const storagee = storage;
    const imageRef = ref(storagee, "images/" + filename);
    const img = await fetch(Listimages[i].images);
    const blob = await img.blob();

    // uploadBytes(imageRef, blob).then((snap) => {
    //   getDownloadURL(imageRef).then((url) => {
    //     //  console.log(url);
    //      downloadUrl.push({type:filetype, link:url});
    //   });
    // });
try
    {
      const snapshot = await uploadBytes (imageRef, blob);
    const url = await getDownloadURL (snapshot.ref);
    downloadUrl.push({type:filetype, link:url});
  }
  catch(error){
    console.log(error);
    
  }
}

ImageUrl(downloadUrl);



    // const storagee = storage;
    // const imageRef = ref(storagee, "images/" + imageFilename);
    // const img = await fetch(image);
    // const blob = await img.blob();

    // uploadBytes(imageRef, blob).then((snap) => {
    //   getDownloadURL(imageRef).then((url) => {
    //      console.log(url);
    //     setimageURL(url);
    //   });
    // });

  };


  const ImageUrl = (url) => {
    Axios.post("http://192.168.8.103:19001/IDimage", {
      imageURL: JSON.stringify(url),
    })
      .then((res) => console.log(res.data), ToastAndroid.show(
        "Image added!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      ))
      .catch((error) => console.log(error));
      
  };

  useEffect(() => {
    setTimeout(() => {
      setGender([
        {title: 'National ID'},
        {title: 'Drivers License'},
        {title: 'UMID ID'},
        {title: 'PRC ID'},
        {title: 'Passport'},
      ]);
    }, 1000);
  }, []);

  const typeOfGender = (e) => {
    setselectedGender(e.title);

  
}


  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      {/* <Text style={styles.name}>Information</Text> */}

        <Image
          source={require("./assets/verifylogo.png")}
          style={styles.avatar}
        />
      </View>


      <Text style={styles.labelname}>Upload Photo</Text>
      <TouchableOpacity style={styles.itemContainer}  onPress={ () => pickImage("userphoto")} >
      {/* <Image
          source={require("./assets/uploadp.png")}
          style={styles.image1}
        /> */}
     <View style={styles.profileborder}>

    {image && <Image source={{ uri: image }} style={{ width: '100%', height: 130,  borderRadius: 100 }} />}
    </View>
      </TouchableOpacity>
      <Text style={styles.labelname}>Type of ID</Text>
      <SelectDropdown
              data={gender}
              onSelect={(selectedItem, index) => {
              // console.log(selectedItem, index);
              typeOfGender(selectedItem, index);
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



      <Text style={styles.labelname}>Front Side</Text>
      <TouchableOpacity style={styles.itemContainer}   onPress={ () => pickImage("frontId")}>
        <Image
          source={require("./assets/front.png")}
          style={styles.image}
        />
         <View style={styles.photoborder}>
        {frontID && <Image source={{ uri: frontID }} style={styles.image2} />}
        </View>

      </TouchableOpacity>

      <Text style={styles.labelname}>Back Side</Text>
      <TouchableOpacity style={styles.itemContainer}  onPress={ () => pickImage("backId")}>
        <Image
          source={require("./assets/back.png")}
          style={styles.image}
        />
    <View style={styles.photoborder}>

     {backID && <Image source={{ uri: backID }} style={styles.image2} />}
</View>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button}  
    //   onPress={() => Signup()} 
      >
        <Text style={{ color:'#ffffff' }}>SUBMIT</Text> 
      </TouchableOpacity>  */}





      {/* <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>jane.doe@example.com</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoValue}>San Francisco, CA</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <Text style={styles.infoValue}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</Text>
      </View> */}

      <Button disabled={buttonStatus} title="Save" onPress={ () => imagesUpload()} />
      <Button title='Save to DB' onPress={() => ImageUrl() }/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 22,
    height: "100%"
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
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
    height: 100,
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
  height:"6%",
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



});

export default VerifyID;