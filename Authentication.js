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

import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

function MyApp() {
  const [progress, setProgress] = useState(0);

  const handlePress = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 0.1, 1.0));
    };

  return (
    <View>
      <ProgressBar progress={progress} width={200} height={20} color="green" />
      <Button onPress={handlePress} title="Increase progress" />
      <Text>Progress: {(progress * 100).toFixed(0)}%</Text>
    </View>
  );
}

export default MyApp;