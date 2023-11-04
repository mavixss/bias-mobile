// import React, { useState } from 'react';
// import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

// const TwoFactorAuthView = ({onSubmit}) => {
//   const [code, setCode] = useState('');

//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image
//           style={styles.logo}
//           source={{uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png'}}
//         />
//       </View>
//       <Text style={styles.title}>Two-Factor Authentication</Text>
//       <Text style={styles.description}>
//         Enter the code sent to your email to complete the login process.
//       </Text>
//       <View style={styles.card}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Code"
//           keyboardType="number-pad"
//           value={code}
//           onChangeText={setCode}
//           maxLength={6}
//         />
//         <TouchableOpacity style={styles.button} onPress={() => onSubmit(code)}>
//           <Text style={styles.buttonText}>Submit</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   logoContainer: {
//     overflow: 'hidden',
//     marginBottom:20,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     borderRadius:50,
//   },
//   description: {
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   card: {
//     width: '80%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     shadowColor: '#00CED1',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   input: {
//     flex: 1,
//     fontSize: 18,
//   },
//   button: {
//     backgroundColor: '#00CED1',
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default TwoFactorAuthView;

// import React, { useState } from 'react';
// import { View, Button, Text } from 'react-native';
// import ProgressBar from 'react-native-progress/Bar';

// function MyApp() {
//   const [progress, setProgress] = useState(0);

//   const handlePress = () => {
//     setProgress((prevProgress) => Math.min(prevProgress + 0.1, 1.0));
//     };

//   return (
//     <View>
//       <ProgressBar progress={progress} width={200} height={20} color="green" />
//       <Button onPress={handlePress} title="Increase progress" />
//       <Text>Progress: {(progress * 100).toFixed(0)}%</Text>
//     </View>
//   );
// }

// export default MyApp;



// import React, { useState } from 'react';
// import { View, Button, Text } from 'react-native';
// import { Checkbox } from 'react-native-paper';
// import ProgressBar from 'react-native-progress/Bar';


// function Authentication() {
//   const [isChecked, setIsChecked] = useState(false);
//     const [progress, setProgress] = useState(0);

//   const handlePress = () => {
//     setProgress((prevProgress) => Math.min(prevProgress + 0.1, 1.0));
//     };



//   return (
//     <View>
//       <Checkbox.Item
//         status={isChecked ? 'checked' : 'unchecked'}
//         onPress={() => setIsChecked(!isChecked)}
//       />

//       <ProgressBar progress={progress} width={200} height={20} color="green" />
//        <Button onPress={handlePress} title="Increase progress" />
//        <Text>Progress: {(progress * 100).toFixed(0)}%</Text>

//     </View>
//   );
// }

// export default Authentication;


// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import { Checkbox } from 'react-native-paper';

// function MyCheckBox() {
//   const [customText, setCustomText] = useState('');
//   const [checkboxDataAdd, setCheckboxDataAdd] = useState('No');
//   const [checkboxExperience, setCheckboxExperience] = useState('No');

//   const handleCheckboxChange = (option, value) => {
//     if (option === 'Add') {
//       setCheckboxDataAdd(value);
//       console.log(checkboxDataAdd)
//     } else if (option === 'Experience') {
//       setCheckboxExperience(value);
//       console.log(checkboxExperience)

//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.checkboxContainer}>
//         <Checkbox.Item
//           label="Yes"
//           status={checkboxDataAdd === 'Yes' ? 'checked' : 'unchecked'}
//           onPress={() => handleCheckboxChange('Add', 'Yes')}
//           style={styles.checkbox}
//         />
//         <Checkbox.Item
//           label="No"
//           status={checkboxDataAdd === 'No' ? 'checked' : 'unchecked'}
//           onPress={() => handleCheckboxChange('Add', 'No')}
//           style={styles.checkbox}
//         />
//         {checkboxDataAdd === 'Yes' && (
//           <TextInput
//             placeholder="Address"
//             value={customText}
//             onChangeText={(text) => setCustomText(text)}
//             style={styles.customTextContainer}
//           />
//         )}
//       </View>

//       <View style={styles.checkboxContainer}>
//         <Checkbox.Item
//           label="Yes"
//           status={checkboxExperience === 'Yes' ? 'checked' : 'unchecked'}
//           onPress={() => handleCheckboxChange('Experience', 'Yes')}
//           style={styles.checkbox}
//         />
//         <Checkbox.Item
//           label="No"
//           status={checkboxExperience === 'No' ? 'checked' : 'unchecked'}
//           onPress={() => handleCheckboxChange('Experience', 'No')}
//           style={styles.checkbox}
//         />
//         {checkboxExperience === 'Yes' && (
//           <TextInput
//             placeholder="Experience"
//             value={customText}
//             onChangeText={(text) => setCustomText(text)}
//             style={styles.customTextContainer}
//           />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     flexDirection: 'row-reverse',
//     alignItems: 'center',
//   },
//   customTextContainer: {
//     marginVertical: 10,
//   },
// });

// export default MyCheckBox;


// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { Checkbox } from 'react-native-paper';
// import { Loan } from 'loanjs';


// function MyCheckBox() {
//   const[amount, setAmount] = useState("")



//   const[loanComputed, setLoanComputed] =useState([]);
//   const handleInstallment = () => {

//     const loan = new Loan(
//       amount, // amount
//       12,   // installments number
//       3,    // interest rate
//       'annuity'  // loanType: 'annuity' | 'annuityDue' | 'diminishing' | GetNextInstalmentPartFunction
//     );
  
//     setLoanComputed(loan)
    
//   }
  



//   return (
//     <View style={styles.container}>

//       <View style={styles.customTextContainer}>
//           <TextInput
//             placeholder="Amount"
//             value={amount}
//             onChangeText={(text) => setAmount(text)}
//           />
//         </View>



//       <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
//             <TouchableOpacity
//               style={[styles.button3, styles.buttonClose]}
//               onPress={() => handleInstallment()}>
//               <Text style={styles.textStyle}>Compute</Text>
//             </TouchableOpacity>
//             </TouchableOpacity>


//             <FlatList
//             data={loanComputed.installments}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <View>
//                 <Text>Installment: {item.installment}</Text>
//                 <Text>Capital: {item.capital}</Text>
//                 <Text>Interest: {item.interest}</Text>
//                 <Text>Interest Sum: {item.interestSum}</Text>
//                 <Text>Remaining: {item.remain}</Text>
//               </View>
//             )}
//           />

      

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     flexDirection: 'row-reverse',
//     alignItems: 'center',
//   },
//   customTextContainer: {
//     marginVertical: 10,
//   },
//   selectedText: {
//     fontSize: 16,
//   },

//   button3: {
//     borderRadius: 8,
//     padding: 10,
//     elevation: 2,
//     height:"100%",
//     width:"60%",
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },

// });

// export default MyCheckBox;


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Loan } from 'loanjs';

function MyCheckBox() {
  const [amount, setAmount] = useState(0);
  const [loanComputed, setLoanComputed] = useState([]);
  const [sumComputed, setSumComputed] = useState([]);


  const handleInstallment = () => {
    const loan = new Loan(
      amount, // amount
      6,   // installments number
      5,    // interest rate
      'annuity'  // loanType: 'annuity' | 'annuityDue' | 'diminishing' | GetNextInstalmentPartFunction
    );

    setLoanComputed(loan.installments);
    setSumComputed(loan.sum)
  }

  const[installments, setInstallments] = useState([])
  const[totalReturn,  setTotalReturn] = useState([])
// JSON.stringify(installments)

  const handleOnBlur = (e) =>{
    let listdate = [];
    if (amount) {
      const loans = new Loan(amount, 6, 5);
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

  return (
    <View style={styles.container}>
      <View style={styles.customTextContainer}>
        <TextInput
          placeholder="Amount"
          value={amount.toString()}
          onChangeText={(text) => setAmount(text)}
          onSubmitEditing={handleOnBlur}
          
        />
      </View>

      {/* <TouchableOpacity onPress={handleOnBlur} style={styles.actionButton}>
        <TouchableOpacity
          style={[styles.button3, styles.buttonClose]}
          onPress={handleOnBlur}
        >
          <Text style={styles.textStyle}>Compute</Text>
        </TouchableOpacity>
      </TouchableOpacity>
 */}
      <ScrollView horizontal={true} style={{ marginTop: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Capital</Text>
            <Text style={styles.tableHeader}>Interest</Text>
            <Text style={styles.tableHeader}>Months</Text>
            <Text style={styles.tableHeader}>Sum</Text>


          </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{amount}</Text>
              <Text style={styles.tableCell}>5%</Text>
              <Text style={styles.tableCell}>6</Text>
              <Text style={styles.tableCell}>{totalReturn}</Text>

            </View>
        </View>
      </ScrollView>




      <ScrollView horizontal={true} style={{ marginTop: 10 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Amount</Text>
            <Text style={styles.tableHeader}>Due Date</Text>
          </View>
          {installments.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.installment}</Text>
              <Text style={styles.tableCell}>{item.date}</Text>

            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  customTextContainer: {
    marginVertical: 10,
  },
  button3: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    height: "100%",
    width: "60%",
  },
  actionButton: {
    flexDirection: 'row',
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
});

export default MyCheckBox;

