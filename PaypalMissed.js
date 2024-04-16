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
import {NETWORK_ADDPOCKET} from '@env';



const PaypalMissed = ({data, type, hidePopup}) => {

  const navigation = useNavigation();
  //data both from INVEST and INVESTIRSRETURN
  const amountInputted = data[0];
  const bussinessID = data[1];
  const installmentID = data[2];
  const installmentLength = data[3];

  
  const amountMissed = amountInputted.reduce((sum, current) => {
    return sum + parseFloat(current.installment);
  }, 0);


console.log(amountInputted)
console.log(amountMissed)

console.log(bussinessID)
console.log(installmentLength)

  const transactype = type[0] // if its invest or returnloan 

const totalReturn = data[1];//from ibvest file
const userbussID = data[2];//for invest and notif id
const senderID = data[3]; //for notif
const notifMsg = data[4]; //for notif msg
const invst_id = data[5]; //for update
const summry_total = data[6]; //for update
const summry_interest = data[7]; //for update
const summry_return = data[8]; //for update



const interestSum = totalReturn-amountInputted;



  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState("#000");

      
  const HandleHidepopUp =() =>{
    hidePopup()
  }

  var datee = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hr = new Date().getHours();
  var min = new Date().getMinutes();
  var secs = new Date().getSeconds();

  // You can turn it in to your desired format
  var formattedDate = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;


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

  const ReturnLoan  = (transac_id, instllmentLENGTH) => {
      Axios.post(`${NETWORK_ADDPOCKET}/ReturnLoan`, {
        installmentID:installmentID, //returnLoan_id
        installment: amountInputted, //returnLoan_amt	
        createdAt:formattedDate, //returnLoan_created_at 
        transac_id:transac_id, //returnLoan_transac_id
        buss_id: bussinessID, //returnLoan_buss_id
        instllmentLENGTH:instllmentLENGTH
    })
      .then((res) =>  
      {
        if(res.data.success){
          ToastAndroid.show("Return Loan",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
          // ToastAndroid.show("please wait for the approval",
          // ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        }
  
        else 
        {
          ToastAndroid.show("Error!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        }
      }
      )
      .catch((error) => console.log(error));
      
  };
  
  const InvestFinal  = (transac_id) => {

      Axios.post(`${NETWORK_ADDPOCKET}/investmentFinal`, {
      totalReturn: totalReturn,
      amountToInvest:amountInputted,
      invst_interest_sum:parseFloat(interestSum).toFixed(2),
      createdAt: formattedDate,
      user:user,
      transac_id:transac_id,
      findBussinessID: userbussID,
  
  
    })
      .then((res) =>  
      {
        if(res.data.success){
          ToastAndroid.show("please wait for the approval",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM),
          ToastAndroid.show("Investment succesfully requested!",
          ToastAndroid.LONG,ToastAndroid.BOTTOM) 
          NotiFinal(res.data.results.insertId)   
        }
  
        else 
        {
          ToastAndroid.show("Error!",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        }
      }
      )
      .catch((error) => console.log(error));
      
  };
  
//newest database 11/08/2023
const NotiFinal = (InvstmentID) => {

    Axios.post(`${NETWORK_ADDPOCKET}/notificationFinal`, {
    findBussinessUser: senderID, //user_id_reciever
    createdAt:formattedDate, //notif_created_at
  })
    .then((res) =>  
    {
      if(res.data.success)
      {
        ToastAndroid.show("Notifications.",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM),
        NotifBusinessInvest(res.data.results.insertId,InvstmentID) //Notif ID
      }
      else 
      {
        ToastAndroid.show("Error!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)

      }
    }

    )
    .catch((error) => console.log(error));
    
};

    

//11/08/2023
const NotifBusinessInvest  = (notifID,InvstmentID) => {
  Axios.post(`${NETWORK_ADDPOCKET}/NotifBusinessInvest`, {
  notifID:notifID, //notif_business_invest_id
  notifMsg: notifMsg, //notif_content
  findBussinessID: userbussID, //notif_business_table_id
  invstID: InvstmentID, //notif_business_investment_id
})
  .then((res) =>  
    ToastAndroid.show("Notif_Business_Invest",
    ToastAndroid.SHORT,ToastAndroid.BOTTOM), 
  )
  .catch((error) => console.log(error));
  
};



function onMessage(e) {
  let data = e.nativeEvent.data;
  console.log(data)

  // Parse the JSON string into a JavaScript object
  try {
    const parsedData = JSON.parse(data);
    // Access purchase_units
    const purchaseUnit = parsedData?.purchase_units?.[0] ?? {};
    // console.log("Purchase Unit Reference ID: " + (purchaseUnit.reference_id ?? 'N/A'));
    const amount = purchaseUnit.amount?.value ?? 0; 
    
    console.log(amountMissed);
    if (amountMissed <= 0) {
      // Display an alert or handle the case where the amount is zero or negative
      ToastAndroid.show("Invalid amount. Please enter a valid amount.!",
      ToastAndroid.SHORT, ToastAndroid.BOTTOM);

      return; // Don't proceed with the Axios request
    }

    // Access payer information
    const payer = parsedData?.payer ?? {};
    const name = ((payer.name?.given_name ?? 'N/A') + " " + (payer.name?.surname ?? 'N/A'));
    const email = ((payer.email_address ?? 'N/A'));
    // const type = "invest"
    // console.log(user);
//for transaction
//for investment (investor)
if(transactype === "invest")
{
  // Check if the amount is not empty
  if (amount) {
      Axios.post(`${NETWORK_ADDPOCKET}/TransactionInvest`,{
      user:user,
      amount: amount,
      type:transactype,
      name: name,
      email:email,
      formattedDate:formattedDate,
      paypal_datalog: data

    })
  
    .then((res) => {
      if (transactype === "invest") {
        InvestFinal(res.data.results.insertId); // pass the TRANSACTION ID to the returnloan
      }
      ToastAndroid.show("Paypal Successfully invested!",
        ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      navigation.navigate("Home");
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("Error investing with PayPal!",
        ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    });  
  } else {
    // Handle the case where the amount is empty
    ToastAndroid.show("Amount is required for the transaction.", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  }


  } 

  //for returnloan (entreprenuer)
else if(transactype === "returnloan")
{
    // Check if the amount is not empty
    if (amountMissed) {
      Axios.post(`${NETWORK_ADDPOCKET}/payreturnmissedloan`,{
      user_id:user,
      installment: amountInputted,
      type:transactype,
      name: name,
      email:email,
      buss_id:bussinessID,
      formattedDate:formattedDate,
      installmentLength:installmentLength,
      paypalDatalog: data

    })
  
    .then((res) => {
    //   if (transactype === "returnloan") {
    //     ReturnLoan(res.data.results.insertId,installmentLength); // pass the TRANSACTION ID to the returnloan
    //   }

      ToastAndroid.show("Paypal Successfully Paid!",
      ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      navigation.navigate("Entreprenuer");
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("Error investing with PayPal!",
        ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }); 
  }
    else {
      // Handle the case where the amount is empty
      ToastAndroid.show("Amount is required for the transaction.", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

  }


  else if(transactype === "invest_update")
{
    // Check if the amount is not empty
    if (amount) {
      Axios.post(`${NETWORK_ADDPOCKET}/updateInvestment`,{
        type:transactype,
        amount: amountInputted,
        email:email,
        paypalLog: data,
        updateType: "change_details",
        invst_id: invst_id,
        user_id:user,
        summaryTotalAmount:summry_total,
        summaryInterest:summry_interest,
        summaryReturn:summry_return,
        name: name,
        formattedDate:formattedDate,
    })
  
    .then((res) => {
      if (res.data.status) {
        // console.log(res.data.message);
        ToastAndroid.show("Paypal Successfully invested!",
        ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        navigation.navigate("Home");
  
      } else {
        console.log(res.data.message);
      }

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("Error investing with PayPal!",
        ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }); 
  }
    else {
      // Handle the case where the amount is empty
      ToastAndroid.show("Amount is required for the transaction.", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

  }

  
  




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
              // source={{ uri: `https://timely-tiramisu-0a768c.netlify.app/?amount=${amountInputted}` }}
              // source={{ uri: `http://192.168.254.127:3000/?amount=${amountInputted}` }}
              source={{ uri: `https://charming-tarsier-f7288a.netlify.app/?amount=${amountMissed}` }}

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
              onError={(error) =>{
                console.log(error)
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
export default PaypalMissed;