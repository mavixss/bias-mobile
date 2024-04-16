import { StyleSheet, Text, View, Image, TextInput,handleSearchTextChange, ScrollView, TouchableOpacity, Button, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigation, useRoute} from '@react-navigation/native';
import Axios from "axios";
import Paypal from './Paypal';
import {NETWORK_ADDPOCKET} from '@env';
import { AntDesign } from '@expo/vector-icons'; 
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoadingScreen from "./LoadingScreen";
import PaypalMissed from './PaypalMissed';



export default function InvestorsReturn() {

  const route = useRoute();
  const navigation = useNavigation();

  const BussinessID = route.params.id; //from BusinessViewEntrep
  const [amountInstallment, setAmountInstallment] = useState();
  const [buss_id, setBuss_id] = useState(0);
  const transactionType = "returnloan";
  const [showPaypal, setShowPaypal] = useState(false)
  const [showPaypalMissed, setShowPaypalMissed] = useState(false)

  //for loading screen
const [isLoading, setIsLoading] = useState(true);


  const HandlepopUp =() =>{
    if(showPaypal){
      setShowPaypal(false);
    }
    else{
      setShowPaypal(true);

    }
  }


  const HandlepopUpMissed =() =>{
    if(showPaypalMissed){
      setShowPaypalMissed(false);
    }
    else{
      setShowPaypalMissed(true);

    }
  }


  const [todayDate, setTodayDate] = useState("")
  //for installments 
  // const todayDate = new Date(new Date().setMonth(new Date().getMonth() + 2));

  const [unpaidInstallment, setunpaidInstallment] = useState([]);
  const [missedPayment, setMissedPayment] = useState([]);
  const [totalReyPayment, setTotalReyPayment] = useState(0);
  const [todayPayment, setTodaysPayment] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [amount, setAmount] = useState(0);
  const [installmentID, setInstallmentID] = useState(0)



  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  
    return `${year}-${month}-${day}`;
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


  

const [filterType, setFilterType] = useState("");
const [selectedFilterType, setselectedFilterType] = useState("");

useEffect(() => {
  setTimeout(() => {
    setFilterType([
      {title: 'Payments'},
      {title: 'Missed'},
      {title: 'Paid'},
      {title: 'Transactions'},

    ]);
    setselectedFilterType('Payments');
  }, 1000);
}, []);


const FilterAction = (e) => {
  setselectedFilterType(e.title);

}

const [paidList, setPaidList] = useState([])

  useEffect(() => {
    Axios.post(`${NETWORK_ADDPOCKET}/viewBusinessInstallments`,{
          buss_id: BussinessID,
        })
      .then((res) => {
        if (res.data.status) {

          // const installdata = res.data.installmentsDatas;
          // installdata.sort((a, b) => {
          //   if (a.status === "paid" && b.status !== "paid") {
          //     return 1;
          //   } else if (a.status !== "paid" && b.status == "paid") {
          //     return -1;
          //   } else {
          //     return 0;
          //   }
          // });

          // console.log(res.data.installmentsDatas);
          // console.log(res.data.missedPayments);
          // console.log(res.data.todayPayment);
          setPaidList(res.data.retunrLoanResult)
          console.log(res.data.retunrLoanResult);
          setTodayDate(res.data.currentDate)
          //Unpaid
          setunpaidInstallment(res.data.installmentsDatas);
          //Missed Payment
          setMissedPayment(res.data.missedPayments);
          // console.log(paymentStatus.missedPayments);
          //Total Reypayments
          setTotalReyPayment(res.data.totalReyPayment);
          //Todays payment
          setTodaysPayment(res.data.todayPayment);
          //Transaction List
          setTransactionList(res.data.transresult);
          //Total Paid
          setTotalPaid(res.data.totalPaidAmount);
        } 
        else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [BussinessID]);


  const caculateMissedPayments = (missedPayment) => {
    const missedAmount = missedPayment.reduce(
      (sum, item) => sum + item.totalPayment,
      0
    );

    return missedAmount;
  };

    //Function for calculating the added intrest and for days passed
// const handleComputeAddedInterest = (maxdate, amount) => {
//   const timeDifference = Math.abs(new Date(todayDate) - new Date(maxdate));
//   const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   const interest = amount * 0.01; // Fixed interest rate of 3%
//   const interestAdded = interest * parseInt(daysDifference);
//   const totalPayment = interestAdded + amount;

//   return { daysDifference, interestAdded, totalPayment };
// };
       


const handleComputeAddedInterest = (maxdate, amount) => {
  const timeDifference = new Date(todayDate) - new Date(maxdate);
  const daysDifference = Math.floor(
    timeDifference / (7 * 24 * 60 * 60 * 1000)
  );
  const interest = amount * 0.01;
  const interestAdded = interest * parseInt(daysDifference);
  const totalPayment = interestAdded + amount;

  //console.log(daysDifference);
  return { daysDifference, interestAdded, totalPayment };
};

const TotalcaculateMissedPayments = (missedPayment) => {
  const missedPaymentsData = missedPayment.map((item) => {
    const installmentsData = item.data;

    return installmentsData;
  });

  const missedPaymentsDataWithInterest = missedPaymentsData.map((item) => {
    return {
      ...item,
      installment: handleComputeAddedInterest(item.maxdate, item.installment)
        .totalPayment,
    };
  });

  const TotalPaymentMissed = missedPaymentsDataWithInterest.reduce(
    (sum, current) => {
      return (sum += current.installment);
    },
    0
  );
  return TotalPaymentMissed;
};


const handlePayMissedPayments = () => {
  console.log(missedPayment);
  //!TODO: Make the amount and installmentId into an array and map it when storing in the database.
  const missedPaymentsData = missedPayment.map((item) => {
    const installmentsData = item.data;

    return installmentsData;
  });

  const missedPaymentsDataWithInterest = missedPaymentsData.map((item) => {
    return {
      ...item,
      installment: handleComputeAddedInterest(item.maxdate, item.installment)
        .totalPayment,
    };
  });
  setAmountInstallment(missedPaymentsDataWithInterest);
  console.log("hello")
  console.log(missedPaymentsDataWithInterest);
  setShowPaypalMissed(!showPaypalMissed);
};


useEffect(() => {
  // Simulate an API call or data loading process
  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false when data is loaded
  }, 5000); // Simulate a 2-second loading time
}, []);


  return (
    <>
{isLoading ? (

<LoadingScreen />
):(

    <View style={styles.container}>
    <ScrollView>

<View style={styles.userCard}>
        {/* <View>
          <Image 
           source={item.buss_photo ? { uri: item.buss_photo } : require("./assets/prrofilee.png")} 
          style={styles.userPhoto} />
        </View> */}
        <View style={styles.userInfo}>
        <View style={styles.actions}>   
        <Text style={styles.userTotalPayment}>
          Repayment
          </Text>

        <Text style={styles.userTotalPayment}>
          {totalReyPayment ? `₱${Number(totalReyPayment).toLocaleString()}` : ""}
          </Text>

        </View>
        <View style={styles.actions}>   
        <Text style={styles.userStatus}>
        Paid Amount
          </Text>


        <Text style={styles.userStatus}>
          {totalPaid ? `₱ ${Number(totalPaid).toLocaleString()}` : "No Payment Yet"}
          </Text>
          </View>
          <View style={styles.actions}>    
          <Text style={styles.userTotalPayment}>
          Remaining Amount
          </Text>
          <Text style={styles.userRemainPayment}>
          ₱{parseFloat(totalReyPayment - totalPaid).toFixed(2)}
          </Text>
          </View>

          <View style={styles.actions}>   
          <Text style={styles.userTotalPayment}>
          Missed Amount
          </Text>


          <Text style={styles.userMissedPayment}>
          ₱{caculateMissedPayments(missedPayment).toFixed(2)}
          </Text>

          </View>

          <View style={styles.actions}>   
          <Text style={styles.userTotalPayment}>
         Total Missed Payment
          </Text>


      <TouchableOpacity 
          onPress={() => {
          // setAmountInstallment(
          //     item.status === "missed"
          //     ? handleComputeAddedInterest(item.maxdate, item.installment).totalPayment.toFixed(2)
          //     : item.installment
          // );
          setBuss_id(BussinessID);
          handlePayMissedPayments()
          // setInstallmentID(item.id);
          // setShowPaypal(!showPaypal);
          }}
          style={styles.button}>
      <Text style={{ color: '#ffffff' }}> ₱{TotalcaculateMissedPayments(missedPayment).toFixed(2)}</Text>
      </TouchableOpacity>

          </View>


          


        </View>

      </View>
    {todayPayment ? (

    <View style={styles.retrnCard}>
       <View style={styles.actions}>
          <View style={styles.actionButton}>
             <Text style={styles.actionText}>Today's Payment</Text>
          </View>

      </View>

        <View style={styles.actions}>
          <View style={styles.actionButton}>
          <Text style={styles.statsDate}>
           {new Date(todayPayment.mindate).toDateString()} - {" "}
           {new Date(todayPayment.maxdate).toDateString()}
           </Text>
          </View>

      </View>
      <View style={styles.actions}>
      { todayPayment.status === "not paid" ? (

         <View style={styles.actionButton}>
           <Text style={styles.statsTitle}>₱{Number(todayPayment.installment).toLocaleString()} </Text>

        </View>
        ) : 
        <View style={styles.actionButton}>
           <Text style={styles.statsTitle}>
           <Text style={{color:"green"}}>Paid</Text>
          </Text>

        </View>
        }

        { todayPayment.status === "not paid" ? (
         <TouchableOpacity 
          onPress={() => {
          setInstallmentID(todayPayment.id)
          setAmountInstallment(todayPayment.installment)
          setBuss_id(BussinessID)
          setShowPaypal(!showPaypal)
          }}
         style={styles.actionButton}>
          <Text style={styles.actionText}>Pay</Text>
        </TouchableOpacity>

        ) : 
        null
        }


        
      </View>


    </View>

    ) : (
       ""
      )}

      <View style={styles.actions}>
        <SelectDropdown
        data={filterType}
        onSelect={(selectedItem, index) => {
        FilterAction(selectedItem, index);
        }}
        defaultButtonText={'Payments'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.title;
          
        }}
        rowTextForSelection={(item, index) => {
          return item.title;
        }}
        buttonStyle={styles.inputContainerDropdown}
        buttonTextStyle={{fontSize:14, marginRight:"60%", }}
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
        }}
        dropdownIconPosition={'right'}
        rowTextStyle={{fontSize:14, }}
        />



    </View>

    <View style={styles.actionsFilter}>
        {selectedFilterType === "Payments" ?(
          <ScrollView>

  <View style={styles.row}> 
    <Text style={styles.header}>Amount</Text>
    <Text style={styles.headername}>Status</Text>

    </View>


    {unpaidInstallment && unpaidInstallment.map((item, index) => (

      <View key={index} style={[styles.itemContainer1, index % 2 === 0 ? styles.evenRow:styles.oddRow]}>

      
      <View style={[styles.itemContainer1, index % 2 === 0 ? styles.evenRow:styles.oddRow]}>
      <View style={styles.row}>
      <View style={styles.column}>


      <Text style={styles.name}>

      {item.status === "not paid" ? (
                        <>{item.installment}</>
                      ) : item.status === "paid" ? (
                        
                        <>{item.amount}</>
                      ) : item.status === "missed" ?(

                        <>
                        {handleComputeAddedInterest(
                          item.maxdate,
                          item.installment
                        ).totalPayment.toFixed(2)}
                        </>
                      ) : null }

      </Text>
      <Text style={[styles.name, { color: 'green' }]}>
      {new Date(item.mindate).toLocaleDateString()} -{' '}
    {new Date(item.maxdate).toLocaleDateString()}
      </Text>

      </View>


      <Text  style={styles.name}>

      {item.status === "not paid" ? (
        <Text style={[styles.name, { color: 'blue' }]}>{item.status}</Text>

      ):item.status === "missed" ? (
        <Text style={[styles.name, { color: 'red' }]}>{item.status}</Text>
      ):item.status === "paid" ?(
        <Text style={[styles.name, { color: 'green' }]}>{item.status}</Text>
      ):item.status === "not paid" && todayPayment.mindate === item.mindate ? (
        <Text style={[styles.name, { color: 'green' }]}>today's payment</Text>
      ):null}
      </Text>

        
      <View>

{item.status === "paid" ? (
              <View style={styles.removeButton}>
                  <AntDesign name="check" size={24} color="black" />
                  </View>
              ) : item.status === "not paid" ? (
                <View>
                  {todayPayment ? (
                    <View>
                      {todayPayment.mindate === item.mindate ? (
                      <TouchableOpacity 
                          onPress={() => {
                          setAmountInstallment(
                              item.status === "missed"
                              ? handleComputeAddedInterest(item.maxdate, item.installment).totalPayment.toFixed(2)
                              : item.installment
                          );
                          setInstallmentID(item.id);
                          setBuss_id(BussinessID);
                          setShowPaypal(!showPaypal);
                      }}
                      style={styles.button}>
                      <Text style={{ color: '#ffffff' }}>Pay</Text>
                      </TouchableOpacity>
                      ) : (
                        null
                      )}
                    </View>
                  ) : (
                    null
                  )}
                </View>
              ) : item.status === "missed" ? (
                <View>
                 
                  <TouchableOpacity 
                      onPress={() => {
                      setAmountInstallment(
                          item.status === "missed"
                          ? handleComputeAddedInterest(item.maxdate, item.installment).totalPayment.toFixed(2)
                          : item.installment
                      );
                      setInstallmentID(item.id);
                      setBuss_id(BussinessID);
                      setShowPaypal(!showPaypal);
                  }}
                  style={styles.button}>
                  <Text style={{ color: '#ffffff' }}>Pay</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                null
              )}


        </View>




      </View>











      {/* <Text style={styles.tableCell}>
      {
                        handleComputeAddedInterest(
                          item.maxdate,
                          item.installment
                        ).daysDifference
                      }
      </Text> */}



{/* <View style={styles.tableCell}>

{item.status === "paid" ? (
                <AntDesign name="check" size={24} color="black" />
            ) : item.status === "not paid" ? (
              <View>
                {todayPayment ? (
                  <View>
                    {todayPayment.mindate === item.mindate ? (
                    <TouchableOpacity 
                        onPress={() => {
                        setAmountInstallment(
                            item.status === "missed"
                            ? handleComputeAddedInterest(item.maxdate, item.installment).totalPayment.toFixed(2)
                            : item.installment
                        );
                        setInstallmentID(item.id);
                        setBuss_id(BussinessID);
                        setShowPaypal(!showPaypal);
                    }}
                    style={styles.button}>
                    <Text style={{ color: '#ffffff' }}>Pay</Text>
                    </TouchableOpacity>
                    ) : (
                      null
                    )}
                  </View>
                ) : (
                  null
                )}
              </View>
            ) : item.status === "missed" ? (
              <View>
               
                <TouchableOpacity 
                    onPress={() => {
                    setAmountInstallment(
                        item.status === "missed"
                        ? handleComputeAddedInterest(item.maxdate, item.installment).totalPayment.toFixed(2)
                        : item.installment
                    );
                    setInstallmentID(item.id);
                    setBuss_id(BussinessID);
                    setShowPaypal(!showPaypal);
                }}
                style={styles.button}>
                <Text style={{ color: '#ffffff' }}>Pay</Text>
                </TouchableOpacity>
              </View>
            ) : (
              null
            )}


      </View> */}



    </View>
    </View>
 ))}

</ScrollView>

        ):selectedFilterType === "Missed" ? (



          
          <ScrollView>
          <View style={styles.row}> 
          <Text style={styles.header}>Amount</Text>
          <Text style={styles.headername}>Total</Text>
          <Text style={styles.headername}>Days</Text>
          {/* <Text style={styles.headername}>Interest</Text> */}

          <Text style={styles.headername}>Status</Text>



          </View>
          {missedPayment?.map((item, index) => (

          <View key={index} style={styles.itemContainer}>
          

            <View style={styles.infoContainer}>
            <View style={styles.row}>  

            <Text style={styles.name}>₱ {item.data.installment.toFixed(2)}</Text>
              <Text style={[styles.name, { color: 'green' }]}>
              {handleComputeAddedInterest(
                          item.data.maxdate,
                          item.data.installment
                        ).totalPayment.toFixed(2)}
                      
                      </Text>


                      <Text style={[styles.name, { color: 'green' }]}>
                      {
                        handleComputeAddedInterest(
                          item.data.maxdate,
                          item.data.installment
                        ).daysDifference
                      } 
                      
                      </Text>

                      {/* <Text style={[styles.name, { color: 'green' }]}>
                      {handleComputeAddedInterest(
                        item.data.maxdate,
                        item.data.installment
                      ).interestAdded.toFixed(2)}                      
                      </Text> */}


                      <Text style={[styles.name, { color: 'red' }]}>
                      {todayPayment ? (
          <>{item.data.status === "not paid" &&
                            todayPayment.mindate === item.data.mindate ? (
                              <Text style={[styles.name, { color: 'green' }]}>today's payment</Text>
                            ) : (
                              <Text style={[styles.name, { color: 'red' }]}> {item.data.status}</Text>
                            )}</>
        ):(
          <Text style={{color:"red"}}>{item.data.status}</Text>

        )}
                      </Text>



              </View>

            </View>




          </View>

          ))}

          </ScrollView>

        ):selectedFilterType === "Paid" ?(
          <ScrollView>

<View style={styles.row}> 
  <Text style={styles.header}>Amount</Text>
  <Text style={styles.headername}>Date</Text>

  </View>


  {unpaidInstallment.map((item, index) => (
    <View key={index} style={styles.itemContainer}>
    <View style={styles.infoContainer}>
    <View style={styles.row}>

    {item.status === "paid" ? (
                <>        
                {item.status === "not paid" ? (
                                    <Text style={styles.name}>{item.installment.toFixed(2)}</Text>
                                  ) : item.status === "missed" ? (
                                    <Text style={styles.name}>
                                      {" "}
                                      {handleComputeAddedInterest(
                                        item.maxdate,
                                        item.installment
                                      ).totalPayment.toFixed(2)}
                                    </Text>
                                  ) : item.status === "paid" ? (
                                    <Text style={styles.name}>{item.amount.toFixed(2)}</Text>
                                  ) : (
                                    null
                                  )}
    

            <Text style={[styles.name, { color: 'green' }]}>
            {new Date(item.mindate).toLocaleDateString()} -{' '}
          {new Date(item.maxdate).toLocaleDateString()}
            </Text>


            {/* <View style={styles.tableCell}> */}
            {item.status === "paid" ?(
              <Text style={[styles.name, { color: 'green' }]}>
                        {item.status}
              </Text>
            ):null}
            {/* </View> */}

            <View style={styles.name}>
            {item.status === "paid" ? (
            <AntDesign name="check" size={24} color="black" />

            ) : (
               null
           )}
            </View>

            
            </>
            ) : (
            null
           )}


    </View>
    </View>




          </View>
       
       ))}

</ScrollView>
        ):selectedFilterType === "Transactions" ?(
          <ScrollView>
          <View style={styles.row}> 
          <Text style={styles.header}>Amount</Text>
          <Text style={styles.headername}>Date</Text>
          </View>
          {transactionList?.map((item, index) => (

          <View key={index} style={styles.itemContainer}>
          

            <View style={styles.infoContainer}>
            <View style={styles.row}>  

            <Text style={styles.name}>₱ {item.returnLoan_amt.toFixed(2)}</Text>
              <Text style={[styles.name, { color: 'green' }]}>{new Date(
                        item.returnLoan_created_at
                      ).toLocaleDateString()}</Text>
              </View>

            </View>

            <View style={styles.removeButton}>
                <AntDesign name="check" size={24} color="black" />
              </View>



          </View>

          ))}

          </ScrollView>
        ): ("")}
        </View>



{showPaypal ? (
  <Paypal data={[amountInstallment, buss_id, installmentID, unpaidInstallment.length]}  type={[transactionType]} hidePopup={HandlepopUp}  />
) : ""}
{showPaypalMissed ? (
  <PaypalMissed data={[amountInstallment, buss_id, installmentID, unpaidInstallment.length]}  type={[transactionType]} hidePopup={HandlepopUpMissed}  />
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
  
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    borderRadius:20
  },

  itemContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    borderRadius:20
  },


  
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    
   
  },
  column: {
    flexDirection: 'column',
    
   
  },


  name: {
    fontSize: 16,
    marginRight:"15%"
  },

  header: {
    fontSize: 16,
    marginRight:"15%",
    marginLeft:"5%"
  },
  headername: {
    fontSize: 16,
    marginRight:"10%",
  },




  price: {
    fontSize: 16,
    color: '#888',
  },
  removeButton: {
    justifyContent: 'flex-end'
  },

  evenRow:{
    backgroundColor:"violet"
  },
  oddRow:{
backgroundColor:"yellow"
  }


});



//

// {todayPayment ? (
//   <>
//     {item.status === "not paid" &&
//     todayPayment.mindate === item.mindate ? (
//       <Text style={[styles.name, { color: 'green' }]}>
//         today's payment
//       </Text>
//     ) : (
//       <View>
//         {item.status === "missed" ? (
//           <Text style={[styles.name, { color: 'red' }]}>
//             {/* {item.status} */} missed
//           </Text>
//         ) : item.status === "paid" ? (
//           <Text style={[styles.name, { color: 'green' }]}>
//             {item.status}
//           </Text>
//         ) : item.status === "not paid" ? (
//           <Text style={[styles.name, { color: 'blue' }]}>
//             {item.status}
//           </Text>
//         ) : null}
//       </View>
//     )}
//   </>
// ) : (
//   <View>
//     {item.status === "not paid" ? null : (
//       <View>
//         {item.status === "missed" ? (
//           <Text style={[styles.name, { color: 'red' }]}>
//             {item.status}
//           </Text>
//         ) : item.status === "paid" ? (
//           <Text style={[styles.name, { color: 'green' }]}>
//             {item.status}
//           </Text>
//         ) : item.status === "not paid" ? (
//           <Text style={[styles.name, { color: 'blue' }]}>
//             {item.status}
//           </Text>
//         ) : null}
//       </View>
//     )}
//   </View>
// )}




//old return

// return (
//   <>
//   {newsfeedsData.map((item, index) => (

//   <View key={index} style={styles.container}>

// <View style={styles.userCard}>
//       <View>
//         <Image 
//          source={item.buss_photo ? { uri: item.buss_photo } : require("./assets/prrofilee.png")} 
//         style={styles.userPhoto} />
//       </View>
//       <View style={styles.userInfo}>
//         <Text style={styles.userName}>P{Number(item.buss_loan_return).toLocaleString()} </Text>
//         <Text style={styles.userFollowers}>Due until 2024</Text>
//       </View>

//     </View>
//     {/* {Object.keys(monthlyTotals).map((month, index) => (

//       <View key={index} style={styles.retrnCard}>
//   <View style={styles.actions}>
//         <View style={styles.actionButton}>
//       <Text style={styles.actionText}>Monthly Return</Text>
//     </View>

//     </View>

//     <View style={styles.actions}>
//     <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
//      <Text style={styles.statsTitle}>P{Number(monthlyTotals[month]).toLocaleString()} </Text>
//      <Text style={styles.statsTitle}>{month} </Text>

//     </TouchableOpacity>



//     <TouchableOpacity onPress={() => {ReturnLoan(!showPaypal)}} style={styles.actionButton}>
//       <Text style={styles.actionText}>Deposite</Text>
//     </TouchableOpacity>
//     </View>


//     </View>

//     ))} */}
//     <View style={styles.tableContainer}>
// <ScrollView horizontal={true} style={{ marginTop: 10 }}>
//   <View style={styles.table}>
//     <View style={styles.tableRow}>
//     <Text style={styles.tableHeader}>Capital</Text>
//       <Text style={styles.tableHeader}>Amount</Text>
//       <Text style={styles.tableHeader}>%</Text>
//       <Text style={styles.tableHeader}>Start Date</Text>
//       <Text style={styles.tableHeader}>Due Date</Text>
//       <Text style={styles.tableHeader}>Status</Text>
//       <Text style={styles.tableHeader}></Text>
//     </View>

//     {item.buss_installment && typeof item.buss_installment === 'string' ? (
//       JSON.parse(item.buss_installment).map((installment, index) => (
//         <View style={styles.tableRow} key={index}>
//         <Text style={styles.tableCell}>{parseFloat(installment.capital).toFixed(2)}</Text>
//           <Text style={styles.tableCell}>{installment.installment}</Text>
//           <Text style={styles.tableCell}>{installment.interest}</Text>
//           <Text style={styles.tableCell}>{formatDate(installment.mindate)}</Text>

//           <Text style={styles.tableCell}>{formatDate(installment.maxdate)}</Text>
//           <Text style={styles.tableCell}>{installment.status}</Text>
//           <View style={styles.tableCell}>
//             <TouchableOpacity 
//             // onPress={() => {ReturnLoan(installment.installment, item.buss_id)}} 
//             onPress={() => {
//               setAmountInvest(installment.installment)
//               setBuss_id(item.buss_id)
//               setShowPaypal(!showPaypal)
//               // ReturnLoan(installment.installment, item.buss_id)
//               }}
//             style={styles.button} >
//               <Text style={{ color: '#ffffff' }}>Pay</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))
//     ) : (
//       <Text>Invalid or missing installment data</Text>
//     )}
//   </View>
// </ScrollView>
// </View>


// {showPaypal ? (
// <Paypal data={[amountInvest,buss_id]}  type={[transactionType]} hidePopup={HandlepopUp}  />
// ) : ""}

//   </View>
//   ))}
// </>

// )





{/* <View style={styles.tableContainer}>
<ScrollView horizontal={true} style={{ marginTop: 10 }}>
   <View style={styles.table}>
     <View style={styles.tableRow}>
       <Text style={styles.tableHeader}>Capital</Text>
       <Text style={styles.tableHeader}>Amount</Text>
       <Text style={styles.tableHeader}>Due Date</Text>
       <Text style={styles.tableHeader}>Status</Text>
       <Text style={styles.tableHeader}>Status</Text>
       <Text style={styles.tableHeader}>Days</Text>
       <Text style={styles.tableHeader}>Action</Text>
    </View>

    {unpaidInstallment.map((item, index) => (
    <View style={styles.tableRow} key={index}>

    <Text style={styles.tableCell}>{parseFloat(item.capital).toFixed(2)}</Text>
      <Text style={styles.tableCell}>

      {item.status === "not paid" ? (
                        <>{item.installment}</>
                      ) : item.status === "paid" ? (
                        
                        <>{item.amount}</>
                      ) : item.status === "missed" ?(

                        <>
                        {handleComputeAddedInterest(
                          item.mindate,
                          item.installment
                        ).totalPayment.toFixed(2)}
                        </>
                      ) : null
                      
       }

      </Text>

      <Text style={styles.tableCell}>
      {formatDate(item.mindate)}            
      </Text>

      <Text style={styles.tableCell}>
      {item.status}
      </Text>

      <Text style={styles.tableCell}>
      {
                        handleComputeAddedInterest(
                          item.mindate,
                          item.installment
                        ).daysDifference
                      }
      </Text>


      <View style={styles.tableCell}>
      
      {item.status === "not paid" || item.status === "missed" ? (
    <TouchableOpacity 
        onPress={() => {
         setAmountInstallment(
          item.status === "missed"
          ? handleComputeAddedInterest(item.mindate, item.installment).totalPayment.toFixed(2)
          : item.installment
      );
         setInstallmentID(item.id);
         setBuss_id(BussinessID);
        setShowPaypal(!showPaypal);
    }}
    style={styles.button}>
     <Text style={{ color: '#ffffff' }}>Pay</Text>
  </TouchableOpacity>
  ) : 
  <AntDesign name="check" size={24} color="black" />
}
      </View>
    </View>
 
 ))}
</View>
</ScrollView>
</View> */}




///old 

// import { StyleSheet, Text, View, Image, TextInput,handleSearchTextChange, ScrollView, TouchableOpacity, Button, ToastAndroid, FlatList } from 'react-native';
// import React from 'react';
// import { useEffect, useState } from "react";
// import { useNavigation, useRoute} from '@react-navigation/native';
// import { update } from 'firebase/database';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Axios from "axios";
// import { Ionicons } from '@expo/vector-icons';
// import Deposite from './components/deposite'
// import Paypal from './Paypal';
// import {NETWORK_ADDPOCKET} from '@env';
// import { AntDesign } from '@expo/vector-icons'; 
// import SelectDropdown from "react-native-select-dropdown";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import LoadingScreen from "./LoadingScreen";



// export default function InvestorsReturn() {

//   const route = useRoute();
//   const navigation = useNavigation();

//   const BussinessID = route.params.id; //from BusinessViewEntrep
//   const [newsfeedsData, setnewsfeedsData] = useState([]);
//   const [monthlyTotals, setMonthlyTotals] = useState({});

//   const [amountInstallment, setAmountInstallment] = useState();
//   const [buss_id, setBuss_id] = useState(0);
//   const transactionType = "returnloan";
//   const [showPaypal, setShowPaypal] = useState(false)
//   //for loading screen
// const [isLoading, setIsLoading] = useState(true);


//   const HandlepopUp =() =>{
//     if(showPaypal){
//       setShowPaypal(false);
//     }
//     else{
//       setShowPaypal(true);

//     }
//   }

//   const [todayDate, setTodayDate] = useState("")
//   //for installments 
//   // const todayDate = new Date(new Date().setMonth(new Date().getMonth() + 2));

//   const [unpaidInstallment, setunpaidInstallment] = useState([]);
//   const [missedPayment, setMissedPayment] = useState([]);
//   const [totalReyPayment, setTotalReyPayment] = useState(0);
//   const [todayPayment, setTodaysPayment] = useState([]);
//   const [transactionList, setTransactionList] = useState([]);
//   const [totalPaid, setTotalPaid] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [installmentID, setInstallmentID] = useState(0)



//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
//     const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  
//     return `${year}-${month}-${day}`;
//   }

//   //////////////// created
 
//   var datee = new Date().getDate();
//   var month = new Date().getMonth() + 1;
//   var year = new Date().getFullYear();
//   var hr = new Date().getHours();
//   var min = new Date().getMinutes();
//   var secs = new Date().getSeconds();

//   // You can turn it in to your desired format
//   var createdAt = year + '-' + month + '-' + datee + ' ' + hr + ':' + min + ':' + secs;//format: d-m-y;


//   // useEffect(() => {
//   //   // Axios.post("http://192.168.8.103:19001/ViewBussiness",{
//   //     Axios.post(`${NETWORK_ADD}:19001/ViewBussinessReturn`,{
//   //       bussID:BussinessID
//   //   })
//   //     // .then((res) => setData(res.data.results[0]))
//   //     .then((res) => setnewsfeedsData(res.data.results)
//   //     )
  
//   //     //  .then((data) => setData(data)
//   //     .catch((error) => console.log(error));
  
//   // }, [newsfeedsData]);
  
//   // useEffect(() => {
//   //   Axios.post(`${NETWORK_ADD}:19001/ViewBussinessReturn`, {
//   //     bussID: BussinessID,
//   //   })
//   //     .then((res) => setnewsfeedsData(res.data.results))
//   //     .catch((error) => console.log(error));
//   // }, [BussinessID]);

//   // // Calculate monthly totals
//   // useEffect(() => {
//   //   const totals = {};

//   //   newsfeedsData.forEach((item) => {
//   //     if (item.buss_installment && typeof item.buss_installment === 'string') {
//   //       JSON.parse(item.buss_installment).forEach((installment) => {
//   //         const maxDate = new Date(installment.maxdate);
//   //         const day = maxDate.getDate(); // Get the day
//   //         const monthKey = `${maxDate.getMonth() + 1}-${day}-${maxDate.getFullYear()}`;

//   //         if (!totals[monthKey]) {
//   //           totals[monthKey] = 0;
//   //         }

//   //         totals[monthKey] += parseFloat(installment.installment);
//   //       });
//   //     }
//   //   });

//   //   setMonthlyTotals(totals);
//   // }, [newsfeedsData]);


// //   const ReturnLoan = (installment, buss_id) => {

// // Axios.post(`${NETWORK_ADD}:19001/notif`, {
// //   installment: installment, //returnLoan_amt	
// //   createdAt:createdAt, //returnLoan_created_at 
// // //returnLoan_transac_id
// //   buss_id: buss_id, //returnLoan_buss_id

// // })
// //   .then((res) =>  
// //     Test(),
// //     ToastAndroid.show("Investment sucessfully requested.",
// //     ToastAndroid.SHORT,ToastAndroid.BOTTOM),
// //   )
// //   .catch((error) => console.log(error));

// //   };

// const [filterType, setFilterType] = useState("");
// const [selectedFilterType, setselectedFilterType] = useState("");

// useEffect(() => {
//   setTimeout(() => {
//     setFilterType([
//       {title: 'Payments'},
//       {title: 'Missed'},
//       {title: 'Paid'},

//     ]);
//     setselectedFilterType('Payments');
//   }, 1000);
// }, []);


// const FilterAction = (e) => {
//   setselectedFilterType(e.title);

// }

// const [paidList, setPaidList] = useState([])

//   useEffect(() => {
//     Axios.post(`${NETWORK_ADDPOCKET}/viewBusinessInstallments`,{
//           buss_id: BussinessID,
//         })
//       .then((res) => {
//         if (res.data.status) {


//           // console.log(res.data.installmentsDatas);
//           // console.log(res.data.missedPayments);
//           // console.log(res.data.todayPayment);
//           setPaidList(res.data.retunrLoanResult)
//           console.log(res.data.retunrLoanResult);
//           setTodayDate(res.data.currentDate)
//           //Unpaid
//           setunpaidInstallment(res.data.installmentsDatas);
//           //Missed Payment
//           setMissedPayment(res.data.missedPayments);
//           // console.log(paymentStatus.missedPayments);
//           //Total Reypayments
//           setTotalReyPayment(res.data.totalReyPayment);
//           //Todays payment
//           setTodaysPayment(res.data.todayPayment);
//           //Transaction List
//           setTransactionList(res.data.returnData);
//           //Total Paid
//           setTotalPaid(res.data.totalPaidAmount);
//         } 
//         else {
//           alert(res.data.message);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [BussinessID]);


//   const caculateMissedPayments = (missedPayment) => {
//     const missedAmount = missedPayment.reduce(
//       (sum, item) => sum + item.totalPayment,
//       0
//     );

//     return missedAmount;
//   };

//     //Function for calculating the added intrest and for days passed
// const handleComputeAddedInterest = (maxdate, amount) => {
//   const timeDifference = Math.abs(new Date(todayDate) - new Date(maxdate));
//   const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   const interest = amount * 0.01; // Fixed interest rate of 3%
//   const interestAdded = interest * parseInt(daysDifference);
//   const totalPayment = interestAdded + amount;

//   return { daysDifference, interestAdded, totalPayment };
// };
          

// useEffect(() => {
//   // Simulate an API call or data loading process
//   setTimeout(() => {
//     setIsLoading(false); // Set isLoading to false when data is loaded
//   }, 5000); // Simulate a 2-second loading time
// }, []);


//   return (
//     <>
// {isLoading ? (

// <LoadingScreen />
// ):(

//     <View style={styles.container}>
//     <ScrollView>

// <View style={styles.userCard}>
//         {/* <View>
//           <Image 
//            source={item.buss_photo ? { uri: item.buss_photo } : require("./assets/prrofilee.png")} 
//           style={styles.userPhoto} />
//         </View> */}
//         <View style={styles.userInfo}>
//         <View style={styles.actions}>   
//         <Text style={styles.userTotalPayment}>
//           Repayment
//           </Text>

//         <Text style={styles.userTotalPayment}>
//           {totalReyPayment ? `₱${Number(totalReyPayment).toLocaleString()}` : ""}
//           </Text>

//         </View>
//         <View style={styles.actions}>   
//         <Text style={styles.userStatus}>
//         Paid Amount
//           </Text>


//         <Text style={styles.userStatus}>
//           {totalPaid ? `₱ ${Number(totalPaid).toLocaleString()}` : "No Payment Yet"}
//           </Text>
//           </View>
//           <View style={styles.actions}>    
//           <Text style={styles.userTotalPayment}>
//           Remaining Amount
//           </Text>
//           <Text style={styles.userRemainPayment}>
//           ₱{parseFloat(totalReyPayment - totalPaid).toFixed(2)}
//           </Text>
//           </View>

//           <View style={styles.actions}>   
//           <Text style={styles.userTotalPayment}>
//           Missed Amount
//           </Text>


//           <Text style={styles.userMissedPayment}>
//           ₱{caculateMissedPayments(missedPayment).toFixed(2)}
//           </Text>

//           </View>

          


//         </View>

//       </View>
//     {todayPayment ? (

//     <View style={styles.retrnCard}>
//        <View style={styles.actions}>
//           <View style={styles.actionButton}>
//              <Text style={styles.actionText}>Today's Payment</Text>
//           </View>

//       </View>

//         <View style={styles.actions}>
//           <View style={styles.actionButton}>
//           <Text style={styles.statsDate}>
//            {new Date(todayPayment.mindate).toDateString()} - {" "}
//            {new Date(todayPayment.maxdate).toDateString()}
//            </Text>
//           </View>

//       </View>
//       <View style={styles.actions}>
//       { todayPayment.status === "not paid" ? (

//          <View style={styles.actionButton}>
//            <Text style={styles.statsTitle}>₱{Number(todayPayment.installment).toLocaleString()} </Text>

//         </View>
//         ) : 
//         <View style={styles.actionButton}>
//            <Text style={styles.statsTitle}>
//            <Text style={{color:"green"}}>Paid</Text>
//           </Text>

//         </View>
//         }

//         { todayPayment.status === "not paid" ? (
//          <TouchableOpacity 
//           onPress={() => {
//           setInstallmentID(todayPayment.id)
//           setAmountInstallment(todayPayment.installment)
//           setBuss_id(BussinessID)
//           setShowPaypal(!showPaypal)
//           }}
//          style={styles.actionButton}>
//           <Text style={styles.actionText}>Pay</Text>
//         </TouchableOpacity>

//         ) : 
//         null
//         }


        
//       </View>


//     </View>

//     ) : (
//        ""
//       )}

//       <View style={styles.actions}>
//         <SelectDropdown
//         data={filterType}
//         onSelect={(selectedItem, index) => {
//         FilterAction(selectedItem, index);
//         }}
//         defaultButtonText={'Filter Payments'}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem.title;
          
//         }}
//         rowTextForSelection={(item, index) => {
//           return item.title;
//         }}
//         buttonStyle={styles.inputContainerDropdown}
//         buttonTextStyle={{fontSize:14, marginRight:"60%", }}
//         renderDropdownIcon={isOpened => {
//           return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
//         }}
//         dropdownIconPosition={'right'}
//         rowTextStyle={{fontSize:14, }}
//         />



//     </View>

//     <View style={styles.actionsFilter}>
//         {selectedFilterType === "Payments" ?(
          
//     <View style={styles.tableContainer}>
//       <ScrollView horizontal={true} style={{ marginTop: 10 }}>
//          <View style={styles.table}>
//            <View style={styles.tableRow}>
//              <Text style={styles.tableHeader}>Capital</Text>
//              <Text style={styles.tableHeader}>Amount</Text>
//              <Text style={styles.tableHeader}>Due Date</Text>
//              <Text style={styles.tableHeader}>      Status</Text>
//              <Text style={styles.tableHeader}>Days</Text>
//              <Text style={styles.tableHeader}>Action</Text>
//           </View>

//           {unpaidInstallment.map((item, index) => (
//           <View style={styles.tableRow} key={index}>

//           <Text style={styles.tableCell}>{parseFloat(item.capital).toFixed(2)}</Text>
//             <Text style={styles.tableCell}>

//             {item.status === "not paid" ? (
//                               <>{item.installment}</>
//                             ) : item.status === "paid" ? (
                              
//                               <>{item.amount}</>
//                             ) : item.status === "missed" ?(

//                               <>
//                               {handleComputeAddedInterest(
//                                 item.maxdate,
//                                 item.installment
//                               ).totalPayment.toFixed(2)}
//                               </>
//                             ) : null
                            
//              }

//             </Text>

//             <Text style={styles.tableCell}>
//             {formatDate(item.mindate)}            
//             </Text>

//             <Text  style={styles.tableCell}>
//             {/* {
//             {item.status === 'missed' ?(

//             ):(
//               item.status === "paid" ?
//             ): null}
//           } */}


//           {item.status === "missed" ? (
//                               <>
//                               <Text style={{color: 'red'}}>{item.status}</Text>
//                               </>
//                             ) : item.status === "paid" ? (
                              
//                               <>
//                               <Text style={{color: 'green'}}> {item.status} </Text>
//                               </>
//                             ) : item.status === "not paid" ?(

//                               <>
//                               <Text  style={{color: 'blue'}}>{item.status}</Text>
                              
//                               </>
//                             ) : null
                            
//              }

//             </Text>

//             <Text style={styles.tableCell}>
//             {
//                               handleComputeAddedInterest(
//                                 item.maxdate,
//                                 item.installment
//                               ).daysDifference
//                             }
//             </Text>


//             {/* <View style={styles.tableCell}>
            
//             {item.status === "not paid" || item.status === "missed" ? (
//           <TouchableOpacity 
//               onPress={() => {
//                setAmountInstallment(
//                 item.status === "missed"
//                 ? handleComputeAddedInterest(item.maxdate, item.installment).totalPayment.toFixed(2)
//                 : item.installment
//             );
//                setInstallmentID(item.id);
//                setBuss_id(BussinessID);
//               setShowPaypal(!showPaypal);
//           }}
//           style={styles.button}>
//            <Text style={{ color: '#ffffff' }}>Pay</Text>
//         </TouchableOpacity>
//         ) : 
//         <AntDesign name="check" size={24} color="black" />
// }
//             </View> */}

//             {todayPayment ? (
//   <>
//   {todayPayment.mindate === item.mindate || item.status === "missed" ? (
//     <>
//     <View style={styles.tableCell}>
            
//             {item.status === "not paid" || item.status === "missed" ? (
//           <TouchableOpacity 
//               onPress={() => {
//                setAmountInstallment(
//                 item.status === "missed"
//                 ? handleComputeAddedInterest(item.maxdate, item.installment).totalPayment.toFixed(2)
//                 : item.installment
//             );
//                setInstallmentID(item.id);
//                setBuss_id(BussinessID);
//               setShowPaypal(!showPaypal);
//           }}
//           style={styles.button}>
//            <Text style={{ color: '#ffffff' }}>Pay</Text>
//         </TouchableOpacity>
//         ) : 
//         <AntDesign name="check" size={24} color="black" />
// }
//             </View>

//     </>
//   ):("")}
//   </>
// ):("")}

//           </View>
       
//        ))}
//     </View>
//   </ScrollView>
// </View>

//         ):selectedFilterType === "Missed" ? (
//           <View style={styles.tableContainer}>
//       <ScrollView horizontal={true} style={{ marginTop: 10 }}>
//          <View style={styles.table}>
//            <View style={styles.tableRow}>
//              <Text style={styles.tableHeader}>Amount</Text>
//              <Text style={styles.tableHeader}>Total</Text>

//              <Text style={styles.tableHeader}>Days</Text>
//              <Text style={styles.tableHeader}>Interest</Text>

//              <Text style={styles.tableHeader}>Date</Text>

//              <Text style={styles.tableHeader}>   Status</Text>
//              <Text style={styles.tableHeader}>Action</Text>
//           </View>

//           {missedPayment.map((item, index) => (
//           <View style={styles.tableRow} key={index}>

//           <Text style={styles.tableCell}>{item.data.installment}  </Text>

//             <Text style={styles.tableCell}>

//             {handleComputeAddedInterest(
//                                 item.data.maxdate,
//                                 item.data.installment
//                               ).totalPayment.toFixed(2)}

//             </Text>
//             <Text style={styles.tableCell}>
//             {
//                               handleComputeAddedInterest(
//                                 item.data.maxdate,
//                                 item.data.installment
//                               ).daysDifference
//                             } 
//             </Text>
//             <Text style={styles.tableCell}>
//             {handleComputeAddedInterest(
//                               item.data.maxdate,
//                               item.data.installment
//                             ).interestAdded.toFixed(2)}
//             </Text>



//             <Text style={styles.tableCell}>
//             {formatDate(item.data.mindate)}            
//             </Text>

//             <Text style={styles.tableCell}> 
//             <Text style={{color:"red"}}>{item.data.status}</Text>
//            </Text>



//             <View style={styles.tableCell}>
            
//             {item.data.status === "missed" ? (
//           <TouchableOpacity 
//               onPress={() => {
//                setAmountInstallment(
//                 item.data.status === "missed"
//                 ? handleComputeAddedInterest(item.data.maxdate, item.data.installment).totalPayment.toFixed(2)
//                 : item.data.installment
//             );
//                setInstallmentID(item.data.id);
//                setBuss_id(BussinessID);
//               setShowPaypal(!showPaypal);
//           }}
//           style={styles.button}>
//            <Text style={{ color: '#ffffff' }}>Pay</Text>
//         </TouchableOpacity>
//         ) : 
//         <AntDesign name="check" size={24} color="black" />
// }
//             </View>
//           </View>
       
//        ))}
//     </View>
//   </ScrollView>
// </View>

//         ):selectedFilterType === "Paid" ?(
//           <View style={styles.tableContainer}>
//       <ScrollView horizontal={true} style={{ marginTop: 10 }}>
//          <View style={styles.table}>
//            <View style={styles.tableRow}>
//              <Text style={styles.tableHeader}>Capital</Text>
//              <Text style={styles.tableHeader}>         </Text>
//              <Text style={styles.tableHeader}>Date</Text>
//              <Text style={styles.tableHeader}>         </Text>
//              <Text style={styles.tableHeader}>     Status</Text>
//           </View>

//           {paidList.map((item, index) => (
//           <View style={styles.tableRow} key={index}>

//           <Text style={styles.tableCell}>{parseFloat(item.returnLoan_amt).toFixed(2)}</Text>
//           <Text style={styles.tableCell}>     </Text>
//             <Text style={styles.tableCell}>
//             {formatDate(item.returnLoan_created_at)}            
//             </Text>

//             <Text style={styles.tableCell}>      </Text>

//             <View style={styles.tableCell}>
            
//             {item.status === "not paid" || item.status === "missed" ? (
//           <TouchableOpacity 
//               onPress={() => {
//                setAmountInstallment(
//                 item.status === "missed"
//                 ? handleComputeAddedInterest(item.maxdate, item.installment).totalPayment.toFixed(2)
//                 : item.installment
//             );
//                setInstallmentID(item.id);
//                setBuss_id(BussinessID);
//               setShowPaypal(!showPaypal);
//           }}
//           style={styles.button}>
//            <Text style={{ color: '#ffffff' }}>Pay</Text>
//         </TouchableOpacity>
//         ) : 
//         <AntDesign name="check" size={24} color="black" />
// }
//             </View>
//           </View>
       
//        ))}
//     </View>
//   </ScrollView>
// </View>
//         ): ("")}
//         </View>



// {showPaypal ? (
//   <Paypal data={[amountInstallment, buss_id, installmentID, unpaidInstallment.length]}  type={[transactionType]} hidePopup={HandlepopUp}  />
// ) : ""}

// </ScrollView>
//     </View>
    
//     )}

//     </>

//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop:"1%",
//     height: "100%"

//   },
//   userCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   userPhoto: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   userInfo: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   userTotalPayment: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 2,
//     color: '#3b5998',

//   },
//   userRemainPayment: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 2,
//   },
//   userMissedPayment: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 2,
//     color: 'red',

//   },


//   userStatus: {
//     color: '#999',
//   },
//   retrnCard: {
//     marginHorizontal: 20,
//     marginVertical: 10,
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#f4f4f4',
    

//   },

//   statsTitle: {
//     fontWeight: 'bold',
//     fontSize: 25,
//     marginBottom: 10,
//     marginTop:"2%",
//     // marginRight:30
//   },

//   statsDate: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     marginBottom: 1,
//     marginTop:"2%",
//     // marginRight:30
//   },



//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 2,
//   },

//   actionsFilter: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 2,
//   },


//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionText: {
//     fontSize: 15
//     ,
//     color: '#3b5998',
//   },
//   actionCount: {
//     fontSize: 15,
//     marginLeft: 5,
//   },

//   tableContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },

//   table: {
//     width: '100%',
//     borderWidth: .5,
//     borderColor: 'black',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: 'lightgray',
//   },
//   tableHeader: {
//     flex: 1,
//     padding: 5,
//     fontWeight: 'bold',
//   },
//   tableCell: {
//     flex: 1,
//     padding: 5,
//   },

 
//   button: {
//     width: 90,
//     borderRadius: 5,
//     height: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#534c88",
//   },
//   inputContainerDropdown: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 8,
//     backgroundColor: "white",
//     borderRadius: 10,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 1,
//     borderWidth: 1,
//     width:"90%",
//     marginLeft:"5%"
  
//   },
  
  


// });



// //old return

// // return (
// //   <>
// //   {newsfeedsData.map((item, index) => (

// //   <View key={index} style={styles.container}>

// // <View style={styles.userCard}>
// //       <View>
// //         <Image 
// //          source={item.buss_photo ? { uri: item.buss_photo } : require("./assets/prrofilee.png")} 
// //         style={styles.userPhoto} />
// //       </View>
// //       <View style={styles.userInfo}>
// //         <Text style={styles.userName}>P{Number(item.buss_loan_return).toLocaleString()} </Text>
// //         <Text style={styles.userFollowers}>Due until 2024</Text>
// //       </View>

// //     </View>
// //     {/* {Object.keys(monthlyTotals).map((month, index) => (

// //       <View key={index} style={styles.retrnCard}>
// //   <View style={styles.actions}>
// //         <View style={styles.actionButton}>
// //       <Text style={styles.actionText}>Monthly Return</Text>
// //     </View>

// //     </View>

// //     <View style={styles.actions}>
// //     <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
// //      <Text style={styles.statsTitle}>P{Number(monthlyTotals[month]).toLocaleString()} </Text>
// //      <Text style={styles.statsTitle}>{month} </Text>

// //     </TouchableOpacity>



// //     <TouchableOpacity onPress={() => {ReturnLoan(!showPaypal)}} style={styles.actionButton}>
// //       <Text style={styles.actionText}>Deposite</Text>
// //     </TouchableOpacity>
// //     </View>


// //     </View>

// //     ))} */}
// //     <View style={styles.tableContainer}>
// // <ScrollView horizontal={true} style={{ marginTop: 10 }}>
// //   <View style={styles.table}>
// //     <View style={styles.tableRow}>
// //     <Text style={styles.tableHeader}>Capital</Text>
// //       <Text style={styles.tableHeader}>Amount</Text>
// //       <Text style={styles.tableHeader}>%</Text>
// //       <Text style={styles.tableHeader}>Start Date</Text>
// //       <Text style={styles.tableHeader}>Due Date</Text>
// //       <Text style={styles.tableHeader}>Status</Text>
// //       <Text style={styles.tableHeader}></Text>
// //     </View>

// //     {item.buss_installment && typeof item.buss_installment === 'string' ? (
// //       JSON.parse(item.buss_installment).map((installment, index) => (
// //         <View style={styles.tableRow} key={index}>
// //         <Text style={styles.tableCell}>{parseFloat(installment.capital).toFixed(2)}</Text>
// //           <Text style={styles.tableCell}>{installment.installment}</Text>
// //           <Text style={styles.tableCell}>{installment.interest}</Text>
// //           <Text style={styles.tableCell}>{formatDate(installment.mindate)}</Text>

// //           <Text style={styles.tableCell}>{formatDate(installment.maxdate)}</Text>
// //           <Text style={styles.tableCell}>{installment.status}</Text>
// //           <View style={styles.tableCell}>
// //             <TouchableOpacity 
// //             // onPress={() => {ReturnLoan(installment.installment, item.buss_id)}} 
// //             onPress={() => {
// //               setAmountInvest(installment.installment)
// //               setBuss_id(item.buss_id)
// //               setShowPaypal(!showPaypal)
// //               // ReturnLoan(installment.installment, item.buss_id)
// //               }}
// //             style={styles.button} >
// //               <Text style={{ color: '#ffffff' }}>Pay</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       ))
// //     ) : (
// //       <Text>Invalid or missing installment data</Text>
// //     )}
// //   </View>
// // </ScrollView>
// // </View>


// // {showPaypal ? (
// // <Paypal data={[amountInvest,buss_id]}  type={[transactionType]} hidePopup={HandlepopUp}  />
// // ) : ""}

// //   </View>
// //   ))}
// // </>

// // )





// {/* <View style={styles.tableContainer}>
// <ScrollView horizontal={true} style={{ marginTop: 10 }}>
//    <View style={styles.table}>
//      <View style={styles.tableRow}>
//        <Text style={styles.tableHeader}>Capital</Text>
//        <Text style={styles.tableHeader}>Amount</Text>
//        <Text style={styles.tableHeader}>Due Date</Text>
//        <Text style={styles.tableHeader}>Status</Text>
//        <Text style={styles.tableHeader}>Status</Text>
//        <Text style={styles.tableHeader}>Days</Text>
//        <Text style={styles.tableHeader}>Action</Text>
//     </View>

//     {unpaidInstallment.map((item, index) => (
//     <View style={styles.tableRow} key={index}>

//     <Text style={styles.tableCell}>{parseFloat(item.capital).toFixed(2)}</Text>
//       <Text style={styles.tableCell}>

//       {item.status === "not paid" ? (
//                         <>{item.installment}</>
//                       ) : item.status === "paid" ? (
                        
//                         <>{item.amount}</>
//                       ) : item.status === "missed" ?(

//                         <>
//                         {handleComputeAddedInterest(
//                           item.mindate,
//                           item.installment
//                         ).totalPayment.toFixed(2)}
//                         </>
//                       ) : null
                      
//        }

//       </Text>

//       <Text style={styles.tableCell}>
//       {formatDate(item.mindate)}            
//       </Text>

//       <Text style={styles.tableCell}>
//       {item.status}
//       </Text>

//       <Text style={styles.tableCell}>
//       {
//                         handleComputeAddedInterest(
//                           item.mindate,
//                           item.installment
//                         ).daysDifference
//                       }
//       </Text>


//       <View style={styles.tableCell}>
      
//       {item.status === "not paid" || item.status === "missed" ? (
//     <TouchableOpacity 
//         onPress={() => {
//          setAmountInstallment(
//           item.status === "missed"
//           ? handleComputeAddedInterest(item.mindate, item.installment).totalPayment.toFixed(2)
//           : item.installment
//       );
//          setInstallmentID(item.id);
//          setBuss_id(BussinessID);
//         setShowPaypal(!showPaypal);
//     }}
//     style={styles.button}>
//      <Text style={{ color: '#ffffff' }}>Pay</Text>
//   </TouchableOpacity>
//   ) : 
//   <AntDesign name="check" size={24} color="black" />
// }
//       </View>
//     </View>
 
//  ))}
// </View>
// </ScrollView>
// </View> */}
