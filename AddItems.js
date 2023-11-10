import React, { useEffect, useState } from 'react';
import { View, Text, Button, ToastAndroid, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Loan } from "loanjs";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


const AddItems = () => {
const [item,setItem] = useState("")
const [price,setPrice] = useState("")
const [installments,setInstallments] = useState("")
const [businessCapital,setBussinessCapital] = useState("")
const [totalReturn,setTotalReturn] = useState("")


  const [useFunds, setUseFunds] = useState([])

  const addItem = item => {
    setUseFunds([...useFunds, item])
  }

  const removeItem = item => {
    setUseFunds(useFunds.filter(i => i !== item))
  }


  const handleValidation = () => {

    if (!item || !price) {
      ToastAndroid.show("Please fill in all required fields", 
      ToastAndroid.SHORT, ToastAndroid.BOTTOM);

      return; // Don't proceed with the submission if any field is empty

    }
   else{
    addItem({
        product: item,
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
        status: "not paid",
        id: `${listStartDate[index].getMonth() + 1}-${listStartDate[
          index
        ].getDate()}-${listStartDate[index].getFullYear()}-${uuidv4()}`,
      }));

      console.log(updateReturnsWithDate);

      ///Installments data
      setInstallments(updateReturnsWithDate);
      
    }
    setBussinessCapital(totalSum);

},[useFunds]) 

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Product</Text>
      <View style={{flexDirection:'row'}}>

      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input1}
        placeholder="Item"
        onChangeText={(text) => setItem(text)}
        value={item}
        autoCapitalize="none"
      />
    </View>

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input1}
        placeholder="Price"
        onChangeText={(text) => setPrice(text)}
        value={price}
        autoCapitalize="none"
        keyboardType="numeric"
      />
    </View>

    <Button
        title="Add Item"
        onPress={() =>
            handleValidation()
        }
      />


</View>


<View style={styles.inputContainer}>
<Text> {businessCapital} </Text>

    </View>
    <View style={styles.inputContainer}>
<Text> {totalReturn} </Text>

    </View>


    





        {useFunds.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>Product: {item.product}</Text>
            <Text style={styles.price}>Price: P{item.amount}</Text>
          </View>
          <TouchableOpacity  onPress={() => removeItem(item)} style={styles.removeButton}>
          <MaterialIcons name="delete-forever" size={24} color="black" />

          </TouchableOpacity>
        </View>
      ))}



      {/* <View style={styles.tableContainer}>
<ScrollView horizontal={true} style={{ marginTop: 10 }}>
 <View style={styles.table}>
   <View style={styles.tableRow}>
     <Text style={styles.tableHeader}>Amount</Text>
     <Text style={styles.tableHeader}>Due Date</Text>
   </View>
   {installments.map((item, index) => (
     <View key={index} style={styles.tableRow}>
       <Text style={styles.tableCell}>{item.installment}</Text>
       <Text style={styles.tableCell}>{item.maxdate }</Text>

     </View>
   ))}
 </View>
</ScrollView>

</View>
 */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:10,
  },
  tittle:{
    fontSize:24,
    marginBottom:20,
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
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginRight: 10,
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

  input1: {
    // flex: 1,
    height: 45,
    width:"38%",
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



})

export default AddItems