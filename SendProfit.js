import { StyleSheet, Text, View, Image, TextInput,handleSearchTextChange, ScrollView, TouchableOpacity, Button, ToastAndroid, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { update } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from 'react-native-progress/Bar';
import { Loan } from 'loanjs';


const SendProfit = ({route}) => {
  const { amount, month, interestRate, busscapital } = route.params;


  const[user, setUser] = useState('');
  const[dataID, setData] = useState([]);

  useEffect(() => {
    Axios.post("http://192.168.8.103:19001/testID",{
      user:user
    })
      // .then((res) => setData(res.data.results[0]))
      .then((res) => setData(res.data.results)
    
      )

      //  .then((data) => setData(data)
      .catch((error) => console.log(error));

  }, [dataID]);

  const [progress, setProgress] = useState(0);

  const handlePress = () => {
    const invstAmt = 400;
    const capital = 1000;

    
    setProgress((invstAmt /capital));
    };

const [loanSum, SetloadnSum] = useState("")
    // const handleInstallment = () => {

    //   const loan = new Loan(
    //     amount, // amount
    //     month,   // installments number
    //     interestRate,    // interest rate
    //     'annuity'  // loanType: 'annuity' | 'annuityDue' | 'diminishing' | GetNextInstalmentPartFunction
    //   );
    
    //   // console.log(loan.sum)
    //   SetloadnSum(loan.sum);
      
    // }

    useEffect(() => {
      const loan = new Loan(
        amount, // amount
        month,   // installments number
        interestRate,    // interest rate
        'annuity'  // loanType: 'annuity' | 'annuityDue' | 'diminishing' | GetNextInstalmentPartFunction
      );
    
      // console.log(loan.sum)
      SetloadnSum(loan.sum);
    
    }, [loanSum]);
  
    


  return (
    <View style={styles.container}>

{/* <FlatList
  data={dataID}
  keyExtractor={item => item.user_id}
  renderItem={({item}) => ( */}

    <View style={styles.userCard}>
        <View>
          <Image source={require("./assets/prrofilee.png")} style={styles.userPhoto} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userFollowers}>Joined since 2023</Text>
        </View>

      </View>

  {/* )}/> */}




      {/* <View style={styles.statsCard}>
       

        <ScrollView contentContainerStyle={styles.body}>
      
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={require("./assets/profilee.png")}/>
          </View>

          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}/>
          </View>

          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}/>
          </View>

    
      </ScrollView>

      </View> */}

      <View style={styles.retrnCard}>

      <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <Text style={styles.actionText}>Return</Text>
            </TouchableOpacity>

            </View>

            <View style={styles.actions}>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
             <Text style={styles.statsTitle}>P {loanSum}
             {/* {amount}  % {interestRate} month {month} capital {busscapital}  */}
             </Text>
            </TouchableOpacity>
            </View>
            

            <ProgressBar progress={progress} width={330} height={30} color="grey" />
      <Button onPress={handlePress} title="Increase progress" />
      <Text>Progress: {(progress * 100).toFixed(0)}%</Text>
      {/* <Button onPress={handleInstallment} title="Loan" /> */}




            </View>


      <View style={styles.statsCard}>
      <Text style={styles.userName}>Upcoming Returns</Text>

       <ScrollView contentContainerStyle={styles.body}>
     
         {/* <View style={styles.dataContainer}>
           <Image style={styles.image} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}/>
         </View>

         <View style={styles.dataContainer}>
           <Image style={styles.image} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}/>
         </View>

         <View style={styles.dataContainer}>
           <Image style={styles.image} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}/>
         </View> */}
         

   
     </ScrollView>

     </View>

    </View>
  );
};

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
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  userFollowers: {
    color: '#999',
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#008B8B',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
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
    marginTop:"1%",
    // marginRight:30


  },

  Cashout: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    marginTop:"2%",
    

  },

  statItem: {
    marginTop:20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsCategory: {
    color: '#999',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },

  body: {
    alignItems: 'center',
    padding: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '33%',
    padding: 5,
  },
  dataContainer: {
    width: '50%',
    padding: 5,
  },

  image: {
    width: '100%',
    height: 100,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#534c88",
    
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



});

export default SendProfit
