import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import { WebView } from "react-native-webview";
import Feather from "react-native-vector-icons/Feather";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';




const Paypal = ({hidePopup}) => {
  const navigation = useNavigation();

  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState("#000");

      
  const HandleHidepopUp =() =>{
    hidePopup()
  }



  // function onMessage(e) {
  //   let data = e.nativeEvent.data;
  //   setShowGateway(false);
  //   console.log(data);
  // }

//   function onMessage(e) {
//   let data = e.nativeEvent.data;

//   // Parse the JSON string into a JavaScript object
//   try {
//     const parsedData = JSON.parse(data);
    
//     // Access and log specific properties
//     console.log("ID: " + parsedData.id);
//     console.log("Intent: " + parsedData.intent);
//     console.log("Status: " + parsedData.status);

//     // Access purchase_units
//     if (parsedData.purchase_units && parsedData.purchase_units.length > 0) {
//       const purchaseUnit = parsedData.purchase_units[0]; // Assuming there's only one purchase unit
//       console.log("Purchase Unit Reference ID: " + purchaseUnit.reference_id);
//       console.log("Purchase Unit Amount: " + purchaseUnit.amount.value + " " + purchaseUnit.amount.currency_code);
//       // You can access other properties of the purchase unit here
//     }

//     // Access payer information
//     if (parsedData.payer) {
//       console.log("Payer Name: " + parsedData.payer.name.given_name + " " + parsedData.payer.name.surname);
//       console.log("Payer Email: " + parsedData.payer.email_address);
//       // You can access other properties of the payer here
//     }

//     // Access links
//     if (parsedData.links && parsedData.links.length > 0) {
//       const link = parsedData.links[0]; // Assuming there's only one link
//       console.log("Link Href: " + link.href);
//       console.log("Link Rel: " + link.rel);
//       console.log("Link Method: " + link.method);
//       // You can access other properties of the link here
//     }

//   } catch (error) {
//     console.error("Error parsing JSON data: " + error);
//   }
// }




// function onMessage(e) {
//   let data = e.nativeEvent.data;

//   // Parse the JSON string into a JavaScript object
//   try {
//     const parsedData = JSON.parse(data);
    
//     // Access and log specific properties
//     // console.log("ID: " + (parsedData?.id ?? 'N/A'));
//     // console.log("Intent: " + (parsedData?.intent ?? 'N/A'));
//     // console.log("Status: " + (parsedData?.status ?? 'N/A'));

//     // Access purchase_units
//     const purchaseUnit = parsedData?.purchase_units?.[0] ?? {};
//     // console.log("Purchase Unit Reference ID: " + (purchaseUnit.reference_id ?? 'N/A'));
//    const amount =("Purchase Unit Amount: " + (purchaseUnit.amount?.value ?? 'N/A') + " " + (purchaseUnit.amount?.currency_code ?? 'N/A'));

//     // Access payer information
//     const payer = parsedData?.payer ?? {};
//     const name = ("Payer Name: " + (payer.name?.given_name ?? 'N/A') + " " + (payer.name?.surname ?? 'N/A'));
//     const email = ("Payer Email: " + (payer.email_address ?? 'N/A'));

//     // Access links
//     // const link = parsedData?.links?.[0] ?? {};
//     // console.log("Link Href: " + (link.href ?? 'N/A'));
//     // console.log("Link Rel: " + (link.rel ?? 'N/A'));
//     // console.log("Link Method: " + (link.method ?? 'N/A'));

//     console.log(amount)
//     console.log(name)
//     console.log(email)


//   } catch (error) {
//     console.error("Error parsing JSON data: " + error);
//   }
// }

const[user, setUser] = useState('');

  const findUser = async () => {
  const result = await AsyncStorage.getItem('userID');
    // console.log(result);
    if(!result){
      navigation.navigate("Login")

    }
  setUser(JSON.parse(result))
  };

  useEffect(() => {
    findUser();
  },[])



  useEffect(() => {
    Axios.get("http://192.168.8.103:19001/getWallet")
    .then((result) => console.log(result.data[0].wlt_id)) 
    .catch((error) => console.log(error))
    },[]);

   

    


  var datee = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hr = new Date().getHours();
  var min = new Date().getMinutes();
  var secs = new Date().getSeconds();

  // You can turn it in to your desired format
  var formattedDate = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;


function onMessage(e) {
  let data = e.nativeEvent.data;

  // Parse the JSON string into a JavaScript object
  try {
    const parsedData = JSON.parse(data);
    
    // Access purchase_units
    const purchaseUnit = parsedData?.purchase_units?.[0] ?? {};
    // console.log("Purchase Unit Reference ID: " + (purchaseUnit.reference_id ?? 'N/A'));
    const amount =((purchaseUnit.amount?.value ?? 'N/A'));
    console.log(amount);

    // Access payer information
    const payer = parsedData?.payer ?? {};
    const name = ((payer.name?.given_name ?? 'N/A') + " " + (payer.name?.surname ?? 'N/A'));
    const email = ((payer.email_address ?? 'N/A'));
    const type = "deposite"
    console.log(user);


//for wallet
    Axios.post("http://192.168.8.103:19001/wallet", {
      user:user,
      amount: amount,
      type:type,
      name: name,
      email:email,
      formattedDate:formattedDate,

    })
  
      .then((res) =>  
      {
  
        if(res.data.success)
        {
          ToastAndroid.show("Sucessfully deposite!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM),
          navigation.navigate("Home")
        }
        else 
        {
          ToastAndroid.show("Error!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
  
        }
      })
      .catch((error) => console.log(error));
  
  

  } catch (error) {
    console.error("Error parsing JSON data: " + error);
  }
}




  return (
    <SafeAreaView style={{ flex: 1 }}>
    
    <Modal
          visible={true}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={"fade"}
          transparent
        >
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{ padding: 13 }}
                onPress={() => HandleHidepopUp(false)}
              >
                <Feather name={"x"} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#00457C",
                }}
              >
                PayPal GateWay
              </Text>
              <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{ uri: "https://timely-tiramisu-0a768c.netlify.app/" }}
              style={{ flex: 1 }}
              onLoadStart={() => {
                setProg(true);
                setProgClr("#000");
              }}
              onMessage={onMessage}
              onLoadProgress={() => {
                setProg(true);
                setProgClr("#00457C");
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
            />
          </View>
        </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  btnCon: {
    height: 45,
    width: "70%",
    elevation: 1,
    backgroundColor: "#00457C",
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: "#fff",
    fontSize: 18,
  },
  webViewCon: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    zIndex: 25,
    elevation: 2,
  },
});
export default Paypal;