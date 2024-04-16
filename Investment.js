import { View, Text, TouchableOpacity, 
    Alert, StyleSheet, Image, TextInput, 
    ToastAndroid, ScrollView} from 'react-native'
  import React from 'react'
  import {useState,useEffect} from 'react';
  import { useRoute } from '@react-navigation/native';
  import Axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Loan } from 'loanjs';
  import Paypal from './Paypal';
  import {NETWORK_ADDPOCKET} from '@env';
  import LoadingScreen from "./LoadingScreen";
import { LoanCalculate } from './LoanCalculate';

  
  
  
  
  export default function Investment() {
    
      const route = useRoute();
      const capitalAmount = route.params.capital; //from capital
      const buss_id = route.params.buss_id; //from buss id
      const sender_id = route.params.user_id; //from user id

    //   const capital = data[0];
    //   const userbussID = data[2];
    //   const senderID = data[1];
    const [isLoading, setIsLoading] = useState(true);

        setTimeout(() => {
          setIsLoading(false); // Set isLoading to false when data is loaded
        }, 5000); // Simulate a 2-second loading time
      

      const[amountInvest, setAmountInvest] = useState("");
      const [newsfeedsData, setnewsfeedsData] = useState([])
    const [remainingAmounts, setRemainingAmounts] = useState("")
    const suggestedAmounts = ["100", "200", "500", "1000"];
  
  
  
    
   const msg = "had made an investment to your business"
  
    // const [senderID,setsenderID] = useState(route.params.userID) 
    // const [userbussID,setuserbussID] = useState(route.params.bussID) 
  
    const[user, setUser] = useState('');
    const[dataID, setData] = useState([]);
    const notifMsg = dataID + ' ' + msg;
    // const type = 'investment'
    const transactionType = "invest";
  
  
  
    useEffect(() => {
      async function fecthUser(){
        const id = await AsyncStorage.getItem('userID');
        console.log(id);
        setUser(id)
    
          Axios.post(`${NETWORK_ADDPOCKET}/getIdFinal`,{
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
  
  
  const handleValidation = () => {
    const numberValue = parseFloat(amountInvest); // Parse the input as a float
  
    if (!amountInvest || isNaN(numberValue) || numberValue < 0 || numberValue === 0 ) {
      ToastAndroid.show("Please fill in a valid amount", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      return; // Don't proceed with the submission if the input is empty, NaN, or negative
    }
    if(numberValue > remainingAmounts){
      ToastAndroid.show("the amount you inputted excedeed", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      return;
    }
   
    // If the input is valid (not empty, not NaN, and non-negative), proceed with the logic
    setShowPaypal(!showPaypal);
    // InvestFinal()
  };
  
  
 
  
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const hours = formattedDate.getHours();
    const minutes = formattedDate.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours from 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;
  
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    const monthName = monthNames[formattedDate.getMonth()];
  
    return `${monthName} ${formattedDate.getDate()} ${formattedDate.getFullYear()} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
    // Customize the format as needed
  };
  
    //installment
    const[installments, setInstallments] = useState([])
    const[totalReturn,  setTotalReturn] = useState(0)
  
    const handleOnBlur = () => {
      const numberValue = parseFloat(amountInvest);
    
      if (isNaN(numberValue) || numberValue < 0 || numberValue === 0) {
        ToastAndroid.show("Please fill in a valid positive amount", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        return;
      }
  
      if(numberValue > remainingAmounts){
        ToastAndroid.show("the amount you inputted excedeed", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        return;
      }
    
    
      let listdate = [];
      if (amountInvest) {
        const loanCal = LoanCalculate(numberValue, 12, 3)
        

        setTotalReturn(loanCal.totalAmountReturn)
        
        // const loans = new Loan(numberValue, 12, 3);
        // const loansInsallment = loans.installments;
    
        // setTotalReturn(loans.sum);
        // const startDate = new Date();
        // for (let i = 0; i < 12; i++) {
        //   const nextDate = new Date(startDate);
        //   nextDate.setMonth(startDate.getMonth() + i);
    
        //   listdate.push(nextDate.toDateString());
        // }
        // const updateReturnsWithDate = loansInsallment.map((item, index) => ({
        //   ...item,
        //   date: listdate[index] || null,
        // }));
    
        // setInstallments(updateReturnsWithDate);
        // // console.log(updateReturnsWithDate);
        // // console.log(loans);
      }
    };
    
  
  const [showPaypal, setShowPaypal] = useState(false)
  
  const HandlepopUp =() =>{
    if(showPaypal){
      setShowPaypal(false);
    }
    else{
      setShowPaypal(true);
  
    }
  }
  
  const HandleInvestment = () =>{
    handleOnBlur()
    Axios.post(`${NETWORK_ADDPOCKET}/getInvestHasInvestments`, {
        buss_id: buss_id,
        user_id: user,
      }
    )
    .then((res) => {
      if (res.data.status) {
        if (res.data.hasInvesment) {
          ToastAndroid.show("Opps! You've already made and investment.",
          ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        } 
        else {
            handleValidation()              
        }
      } else {
       console.log(res.data.message);
       ToastAndroid.show("Error",
       ToastAndroid.SHORT,ToastAndroid.BOTTOM)
  
      }
    });
  
  }
  
  
  useEffect(() => {
      Axios.post(`${NETWORK_ADDPOCKET}/ViewInvest`,{
        bussID:buss_id
    })
      // .then((res) => setData(res.data.results[0]))
      .then((res) => {
        const { success, results } = res.data;
        setnewsfeedsData(res.data.results)
        if (success && results.length > 0) {
          // Assuming 'remainingAmount' is a property in each result object
          const remainingAmounts = results.map((item) => item.remainingAmount);
          // Perform actions with remainingAmounts, such as setting state
          setRemainingAmounts(remainingAmounts);
          // Other logic with the received data
        }
      
      }
      
      )
  
      //  .then((data) => setData(data)
      .catch((error) => console.log(error));
  
  }, [newsfeedsData]);
  
  
  
  
  
   
  return (
    <>
{isLoading ? (

<LoadingScreen />
):(

    <View style={styles.container}>
    { newsfeedsData.map((item, index) => (

    <ScrollView key={index}>

<View style={styles.userCard}>
        <View style={styles.userInfo}>
        <View style={styles.actions}>   
        <Text style={styles.userTotalPayment}>
          Capital
          </Text>

        <Text style={styles.userTotalPayment}>
        P{Number(item.buss_capital).toLocaleString()}
        
          </Text>

        </View>
          
          <View style={styles.actions}>    
          <Text style={styles.userTotalPayment}>
          Remaining
          </Text>

          {remainingAmounts == 0 ? (
                <Text style={styles.userRemainPayment}>Completed</Text>
              ) : (
                <Text style={styles.userRemainPayment}>{Number(remainingAmounts).toLocaleString()}</Text>
              )}
          </View>

          <View style={styles.actions}>   
          <Text style={styles.userTotalPayment}>
         Total Return
          </Text>


          <Text style={styles.userMissedPayment}>
          {Number(totalReturn).toLocaleString()}
          </Text>

          </View>

          <View style={[styles.inputContainer]}>
      <TextInput
        style={styles.input1}
        onChangeText={(text) => {setAmountInvest(text)}}
        placeholder="Enter Amount"
          value={amountInvest}
          keyboardType="numeric"
          onSubmitEditing={handleOnBlur}
      />

    </View>

    <View style={styles.suggestedAmountsContainer}>
        {suggestedAmounts.map((amount, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestedAmountButton}
            onPress={() => setAmountInvest(amount)}
          >
            <Text>{amount}</Text>
          </TouchableOpacity>
        ))}
      </View>



    <TouchableOpacity style={styles.button}
    onPress={() => {
        HandleInvestment()              
    }} >
        <Text style={{ color:'#ffffff' }}>Pay</Text> 
      </TouchableOpacity> 



          


        </View>

      </View>



{showPaypal ? (
  <Paypal data={[amountInvest,totalReturn, buss_id, sender_id, notifMsg]}  type={[transactionType]} hidePopup={HandlepopUp}  />
) : ""}

</ScrollView>
  ))}
    </View>
    
    )}

    </>

  )
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:"1%",
        height: "100%"
    
      },
      userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      userInfo: {
        flex: 1,
        marginLeft: 10,
      },
      userTotalPayment: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 2,
        color: '#3b5998',
    
      },
      userRemainPayment: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 2,
      },
      userMissedPayment: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 2,
        color: 'red',
    
      },
    
    
      userStatus: {
        color: '#999',
      },
      retrnCard: {
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f4f4f4',
        
    
      },
    
      statsTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        marginTop:"2%",
        // marginRight:30
      },
    
      statsDate: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 1,
        marginTop:"2%",
        // marginRight:30
      },
    
    
    
      actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
      },
    
      actionsFilter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
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
        padding: 5,
        fontWeight: 'bold',
      },
      tableCell: {
        flex: 1,
        padding: 5,
      },
    
     
      button: {
        width: 90,
        borderRadius: 5,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#534c88",
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
        width:"90%",
        marginLeft:"5%"
      
      },
    
      input1: {
        // flex: 1,
        height: 45,
        width:"75%",
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
        backgroundColor: "white",
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 1,
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

      suggestedAmountsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
      },
      suggestedAmountButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
      },
          
      
  
  
  
  
    });
    