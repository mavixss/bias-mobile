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

  
  
  
  
  export default function InvestmentUpdate() {
    
      const route = useRoute();

      const buss_id = route.params.buss_id; //from buss id
      const investors_id = route.params.investors_id; //from user id
      const amount = route.params.amount; //from amount
      const sender_id = route.params.user_id; //from amount
      const invst_id = route.params.invst_id; //from amount
      const investData = route.params.items; //from amount
      //  console.log(investData.invst_interest_sum)

      


      const[dataFeeds, setDataFeeds] = useState([]);



    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call or data loading process
        setTimeout(() => {
          setIsLoading(false); // Set isLoading to false when data is loaded
        }, 5000); // Simulate a 2-second loading time
      }, []);
      

      const[amountInvest, setAmountInvest] = useState("");
      const [month, setMonth] = useState("");
      const [capitalDisply, setCapitalDisply] = useState(null);
    const suggestedAmounts = ["100", "200", "500", "1000"];
    const [amoutRemain, setAmountReamin] = useState(null);

  
  
  
    
   const msg = "has updated an investment to your business"
  
    // const [senderID,setsenderID] = useState(route.params.userID) 
    // const [userbussID,setuserbussID] = useState(route.params.bussID) 
  
    const[user, setUser] = useState('');
    const[dataID, setData] = useState([]);
    const notifMsg = dataID + ' ' + msg;
    // const type = 'investment'
    const transactionType = "invest_update";
  
  
  
    useEffect(() => {
      async function fecthUser(){
        const id = await AsyncStorage.getItem('userID');
        console.log(id);
        setUser(id)
    
        // Axios.post("http://192.168.8.103:19001/testID",{
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
    
      
  
      const [summaryTotalAmount, setSummaryTotalAmount] = useState(0);
      const [summaryInterest, setSummaryInterest] = useState(0);
      const [summaryReturn, setSummaryReturn] = useState(0);
      const [message, setMessage] = useState("");
      const [amountReturn, setAmountReturn] = useState(0);




  
  
  
  
  const getDate = (mnth) => {
   setMonth(mnth)
  
  };
      const HandleHidepopUp =() =>{
        hidePopup()
      }


      useEffect(() => {
        // setShowLoarder(true);
        Axios.post(`${NETWORK_ADDPOCKET}/getTotalInvestAmount`, {
            buss_id: buss_id,
          })
          .then((res) => {
            const capitalBusiness = investData.buss_capital;
            const investamount = res.data.result[0].totalInvstAmt;
            const myinvest = res.data.result[0].invst_amt;
            const remainingAmttoInvest =
              parseFloat(capitalBusiness) - parseFloat(investamount);
            setAmountReamin(remainingAmttoInvest);
            console.log(capitalBusiness);
            setCapitalDisply(capitalBusiness)

            // setShowLoarder(false);
          });
      }, []);


      const [totalInterest, setTotalInterest] = useState(0);

      const handleComputeLoan = (inputAmount) => {
        if (inputAmount > 0 && inputAmount <= amoutRemain) {
          const loanjs = new Loan(
            inputAmount,
            investData.buss_approved_updated_month,
            investData.buss_approved_percent
          );
          setMessage("");
          setSummaryTotalAmount(
            parseFloat(investData.invst_amt) + parseFloat(inputAmount)
          );
          setSummaryInterest(
            parseFloat(loanjs.interestSum) +
              parseFloat(investData.invst_interest_sum)
          );
          setSummaryReturn(
            parseFloat(loanjs.sum) + parseFloat(investData.invst_returned_amt)
          );
          setAmountInvest(inputAmount);
          setAmountReturn(loanjs.sum);
          setTotalInterest(loanjs.interestSum);
        } 
        else if (parseFloat(amoutRemain) < inputAmount) {
          setMessage("Amount exceeded ");
        } 
        else if (inputAmount <= 0) {
          setMessage("No amount Inputted");
        }
      };
    




    
  
  
  
      //////////////// created
   
    var datee = new Date().getDate();
    var monthh = new Date().getMonth() + 1;
    var yr = new Date().getFullYear();
    var hr = new Date().getHours();
    var min = new Date().getMinutes();
    var secs = new Date().getSeconds();
  
    // You can turn it in to your desired format
    var createdAt = yr + '-' + monthh + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y; 
  
  
  const handleValidation = () => {
    const numberValue = parseFloat(amountInvest); // Parse the input as a float
  
    if (!amountInvest || isNaN(numberValue) || numberValue < 0 || numberValue === 0 ) {
      ToastAndroid.show("Please fill in a valid amount", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      return; // Don't proceed with the submission if the input is empty, NaN, or negative
    }
    if(numberValue > amoutRemain){
      ToastAndroid.show("the amount you inputted excedeed", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      return;
    }
   
    // If the input is valid (not empty, not NaN, and non-negative), proceed with the logic
    setShowPaypal(!showPaypal);
    // InvestFinal()
  };
  // const invst_interest_sum = totalReturn - amountInvest;
  
  
  
  
    //installment
    const[installments, setInstallments] = useState([])
    const[totalReturn,  setTotalReturn] = useState([])
  
  
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
    // handleOnBlur()
    handleValidation()              

  
  }
  
  
  
  
  
  
   
  return (
    <>
{isLoading ? (

<LoadingScreen />
):(

    <View style={styles.container}>

    <ScrollView >

<View style={styles.userCard}>

        <View style={styles.userInfo}>
        <View style={styles.actions}>   
        <Text style={styles.userTotalPayment}>
          Current Investment
          </Text>

        <Text style={styles.userTotalPayment}>
        P{parseFloat(investData.invst_amt)}
          </Text>

        </View>

        <View style={styles.actions}>   
        <Text style={styles.userTotalPayment}>
          Total Capital
          </Text>

        <Text style={styles.userTotalPayment}>
        {Number(capitalDisply).toLocaleString()}
        
          </Text>

        </View>

        <View style={styles.actions}>    
          <Text style={styles.userTotalPayment}>
          Remaining
          </Text>
              <Text style={styles.userRemainPayment}>
              {Number(amoutRemain).toLocaleString()}
              </Text>
          </View>



        <View style={styles.actions}>   
        <Text style={styles.userTotalPayment}>
          Added Investment
          </Text>

        <Text style={styles.userTotalPayment}>
        {Number(totalInterest).toLocaleString()}
          </Text>

        </View>

        <View style={styles.actions}>   
        <Text style={styles.userTotalPayment}>
          Added Return
          </Text>

        <Text style={styles.userTotalPayment}>
        {Number(amountReturn).toLocaleString()}
          </Text>
        </View>



        <View style={styles.actions}>   
        <Text style={styles.userTotalPayment}>
          Total Investment
          </Text>

        <Text style={styles.userTotalPayment}>
        P{summaryTotalAmount.toFixed(2)}
          </Text>

        </View>

        <View style={styles.actions}>   
        <Text style={styles.userTotalPayment}>
          Total Return
          </Text>

        <Text style={styles.userTotalPayment}>
        P{summaryReturn.toFixed(2)}
          </Text>

        </View>



        <View style={styles.actions}>   
        <Text style={styles.userStatus}>
        Interest Rate
          </Text>


        <Text style={styles.userStatus}>
         3%
          </Text>
          </View>

          <View style={styles.actions}>   
          <Text style={styles.userTotalPayment}>
         Return
          </Text>


          <Text style={styles.userMissedPayment}>
          {amountReturn}
          </Text>

          </View>



      <View style={[styles.inputContainer]}>
      <TextInput
        style={styles.input1}
        onChangeText={(amount) => {handleComputeLoan(amount)}}
        placeholder="Enter Amount"
          // value={amountInvest}
          keyboardType="numeric"
          // onSubmitEditing={handleOnBlur}
      />

    </View>

    <View style={styles.actions}>  
    {message ? (
        <Text style={styles.userStatus}>
        {message}
          </Text>

    ):("")} 
          </View>


    <TouchableOpacity style={styles.button}
    onPress={() => {
        HandleInvestment()              
    }} >
        <Text style={{ color:'#ffffff' }}>Update</Text> 
      </TouchableOpacity> 

        </View>

      </View>



{showPaypal ? (
  <Paypal data={[amountInvest, amountReturn, buss_id, sender_id, notifMsg, invst_id, summaryTotalAmount, summaryInterest, summaryReturn]}  type={[transactionType]} hidePopup={HandlepopUp}  />
) : ""}

</ScrollView>
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
    