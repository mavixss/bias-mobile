import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, TextInput, ToastAndroid} from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper';
import {useState,useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from '@react-native-community/slider';
import { Loan } from 'loanjs';


export default function Invest({data, hidePopup}) {
    const route = useRoute();
    const[percent, setPercent] = useState("");
    const[percentReturn, setPercentReturn] = useState(0);
    const[amountInvest, setAmountInvest] = useState("");
    const [interest, setInterest] = useState(0);
    const [interestRate, setinterestRate] = useState(0);

    const [month, setMonth] = useState("");
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [capitalDisply, setCapitalDisply] = useState(null);

  const userbussID = data[2];
  const senderID = data[1];
  const capital = data[0];

  
 const msg = " Requested to invest to your business"

  // const [senderID,setsenderID] = useState(route.params.userID) 
  // const [userbussID,setuserbussID] = useState(route.params.bussID) 

  const[user, setUser] = useState('');
  const[dataID, setData] = useState([]);
  const notifMsg = dataID + msg;

  useEffect(() => {
    async function fecthUser(){
      const id = await AsyncStorage.getItem('userID');
      console.log(id);
      setUser(id)
  
      Axios.post("http://192.168.8.103:19001/testID",{
          user:id
        })
          // .then((res) => setData(res.data.results[0]))
          .then((res) => {setData(res.data.results[0].user_fname)
          console.log(res.data.results[0].user_fname)}
          )
  
          //  .then((data) => setData(data)
          .catch((error) => console.log(error));
      if(!id){
        navigation.navigate("Login")
  
      }
  
      
     }
  
  
     fecthUser();
    },[])
  
    

    const [modalVisible, setModalVisible] = useState(true);



const hndlePercent = (e) => {
  console.log(e);
  setPercent(e)
  const capital = data[0];
  const selectpersent = parseInt(e)/100;
  const interestRate = selectpersent *10;

  const amount = selectpersent*capital;
  // const percentRetrn = selectpersent * 10;
  // const percentt = percentRetrn/100;
  // const interst = capital * percentt * month;
// setInterest(interst);
setAmountInvest(amount);
// setPercentReturn(percentRetrn);
setCapitalDisply(capital)



setinterestRate(parseFloat(interestRate.toFixed(2))

)
};


// const getDate = (yr) => {
//   const currentDate = new Date();
//   setYear(yr)
//   const targetDate = new Date(
//     currentDate.getFullYear() + parseInt(yr),
//     currentDate.getMonth(),
//     currentDate.getDate()
//   );

//   setEndDate(targetDate);
//   setStartDate(currentDate);

// };

const getDate = (mnth) => {
 setMonth(mnth)

};


    
    const HandleHidepopUp =() =>{
      hidePopup()
    }



    //////////////// created
 
  var datee = new Date().getDate();
  var monthh = new Date().getMonth() + 1;
  var yr = new Date().getFullYear();
  var hr = new Date().getHours();
  var min = new Date().getMinutes();
  var secs = new Date().getSeconds();

  // You can turn it in to your desired format
  var createdAt = yr + '-' + monthh + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y; 
  //////////////// updated
// var updatedAt = yr + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;

const [invstId , setInvstId] = useState("")

const Invest = () => {
  Axios.post("http://192.168.8.103:19001/investment", {
    // percent:percent,
    year: month,
    // startDate: startDate,
    // endDate: endDate,
    // percentReturn: percentReturn,
    interest: interestRate,
    amountToInvest:amountInvest,
    createdAt: createdAt,
    user:user,
    findBussinessID: userbussID,
    findBussinessUser: senderID,

 


  })
    // .then((res) =>  
    // // {
    //   console.log(res.data.results[0]),
    //   ToastAndroid.show("Sucessfully requested!",
    //   ToastAndroid.SHORT,ToastAndroid.BOTTOM),
    //   Notfication()

        
    // )
    // .catch((error) => console.log(error));


    .then((res) =>  
    {

      if(res.data.success)
      {

        // setInvstId(res.data.results.insertId)
        // console.log(invstId);
        ToastAndroid.show("Sucessfully requested!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        Notfication(res.data.results.insertId)


  
  
      }
      else 
      {
        ToastAndroid.show("Error!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)

      }
    })
    .catch((error) => console.log(error));
    
};

const Wallet = () => {
  Axios.post("http://192.168.8.103:19001/investmentwallet", {
    amountToInvest:amountInvest,
    createdAt: createdAt,
    user:user,

  })

    .then((res) =>  
    {

      if(res.data.success)
      {
        ToastAndroid.show("Wallet!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)
      }
      else 
      {
        ToastAndroid.show("Error!",
        ToastAndroid.SHORT,ToastAndroid.BOTTOM)

      }
    })
    .catch((error) => console.log(error));
    
};



const Notfication = (invstID) => {
    
  Axios.post("http://192.168.8.103:19001/notif", {
    notifMsg: notifMsg,
    user:user,
    createdAt:createdAt,
    findBussinessUser: senderID,
   findBussinessID: userbussID,
   invstID:invstID,


  })
    .then((res) =>  
    // {

      // Test(),
      // console.log(invstID),
      ToastAndroid.show("Investment sucessfully requested.",
      ToastAndroid.SHORT,ToastAndroid.BOTTOM),
      Wallet()
    )
    .catch((error) => console.log(error));
    
};

const handleInstallment = () => {

  const loan = new Loan(
    amountInvest, // amount
    month,   // installments number
    interestRate,    // interest rate
    'annuity'  // loanType: 'annuity' | 'annuityDue' | 'diminishing' | GetNextInstalmentPartFunction
  );

  console.log(loan.sum)
  
}







  return (
    <View style={styles.centeredView}>


{/* <Modal 
         animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}></Modal> */}
        <View style={styles.post} > 
        
        <View style={styles.Modalpost}>
              <View style={styles.header}>
                <Image
                  style={styles.avatar}
                  source={require("./assets/profilee.png")}
                />
                <View>
            <Text style={styles.name}> Firstname Lastname
			    </Text>
              <Text style={styles.date}>August 22 2023</Text>
              <Text style={styles.date}>Cebu City</Text>

              </View>
              </View>
              
              <Text style={styles.description}>Investment Description</Text>
            
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Capital:</Text>
              <Text style={styles.actionCount}>{capitalDisply}</Text>

            </TouchableOpacity>


            </View>

            {/* <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Percent:</Text>
              <Text style={styles.actionCount}>{selectpersent}</Text>

            </TouchableOpacity>
            </View> */}

            {/* <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Percentt:</Text>
              <Text style={styles.actionCount}>{percentt}</Text>

            </TouchableOpacity>
            </View> */}

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Amount:</Text>
              <Text style={styles.actionCount}>{amountInvest}</Text>

            </TouchableOpacity>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Interest:</Text>
              <Text style={styles.actionCount}>{interestRate}%</Text>

            </TouchableOpacity>
            </View>

            {/* <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Percent Return:</Text>
              <Text style={styles.actionCount}>{parseFloat(percentReturn).toFixed(1)}%</Text>

            </TouchableOpacity>
            </View> */}

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
            <TextInput
                style={styles.inputView}
                placeholder="Months"
                onChangeText={(e) => {
                  getDate(e);
                  }}


                value={month}
                keyboardType="numeric"
            />

            </TouchableOpacity>
            </View>

            {/* <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Start Date:</Text>
              <Text style={styles.actionCount}>{startDate && startDate.toDateString()}</Text>

            </TouchableOpacity>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>End Date:</Text>
              <Text style={styles.actionCount}>{endDate && endDate.toDateString()}</Text>

            </TouchableOpacity>
            </View> */}




            {/* <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
            <TextInput style={styles.inputView}
                placeholder="Percent"
                onChangeText={(onChangeNumber) => hndlePercent(onChangeNumber)}
                value={percent}
                keyboardType="numeric"
            />



            </TouchableOpacity>


            </View> */}

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionCount}>{parseFloat(percent).toFixed(2)}%</Text>

<Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(onChangeNumber) => hndlePercent(onChangeNumber)}
        value={percent}
        minimumTrackTintColor="#FFFFFF"
       maximumTrackTintColor="#000000"
/>



            </TouchableOpacity>


            </View>





            <View style={styles.actions}>
            
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
              style={[styles.button3, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible), 
              Invest()
              // Notfication()
              }}>
              <Text style={styles.textStyle}>Request</Text>
            </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
            <TouchableOpacity
              style={[styles.button3, styles.buttonClose]}
              onPress={() => handleInstallment()}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            </TouchableOpacity>




            </View>

</View>
</View>


    </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      position:"absolute",
      // zIndex:1,
      // top:"50%",
      // height:"50%",
      // bottom:"50%"

    },
    post: {
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom:20,
        // borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:8,
        width: "85%",
        alignItems: 'center',
        marginRight:"10%"

        // position:"absolute",
        // zIndex:1,
        // bottom:-50
      },
      Modalpost: {
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom:20,
        borderBottomWidth:0.5,
        borderBottomColor:'#808080',
        padding:10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
      },

      date: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10,
      },
      description: {
        marginBottom: 10,
      },
      actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },
      actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      actionText: {
        fontSize: 15
        ,
        color: '#3b5998',
      },
      actionCount: {
        fontSize: 15,
        marginLeft: 5,
      },
    buttonClose: {
        backgroundColor: '#2196F3',
      },
      button3: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        height:"100%",
        width:"60%",
      },

      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },




      inputView: {
        backgroundColor: "#e0dde9",
        borderRadius: 10,
        width: "70%",
        height: 45,
        marginBottom: 15,
        alignItems: "center",
      },
    




  });
  