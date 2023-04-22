import { View, Text, TextInput, Pressable } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { fontWeight400, fontWeight700 } from '../../assets/Styles/FontWeights';
import PickerForm from '../../components/PickerForm'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])




  const handleLogin = () => {
    setError('')
    setSuccess('')
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setSuccess('Logged In Successfully')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        setError('Incorrect Credentials')
      });

  }


  const [selectedItem, setSelectedItem] = useState('Customer')
  const items = [
    { label: 'Seller', value: 'Seller' },
    { label: 'Customer', value: 'Customer' },
    { label: 'Service Provider', value: 'Service Provider' },
  ]

  const handleFlow = () => {
    console.log(selectedItem)
    switch (selectedItem) {
      case 'Seller':
        navigation.navigate('SellerDashboard')
        break;
      case 'Customer':
        navigation.navigate('CustomerDashboard')
        break;
      default:
        break;
    }
  }
  return (
    <SafeAreaView>
      <View className={`px-2 flex flex-col justify-center h-full bg-white`}>
        <View className='mx-5'>
          <Text style={fontWeight700} className='text-center text-4xl mb-10 text-[#e8b05c]'>Log in</Text>
          {/* Phone Input */}
          <Text style={fontWeight400} className="text-gray-800 ">Email</Text>
          <TextInput
            style={fontWeight400}
            keyboardType="email"
            value={email}
            onChangeText={setEmail}

            className="     form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            w-full
                            mb-5"
          />
          {/* Password Input */}
          <Text style={fontWeight400} className="text-gray-800 ">Password</Text>
          <TextInput
            secureTextEntry={true}
            style={fontWeight400}
            value={password}
            onChangeText={setPassword}

            className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded 
                            w-full
                            mb-5"
          />
          <PickerForm items={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem} label={'Account Type'} />
          <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
          <Text style={fontWeight400} className="text-green-500 text-xs">{success}</Text>
          {/* COMMENTED TEMPORARILY TO DESIGN FLOW OF SCREENS*/}
          {/* <Pressable className='my-5 py-3 rounded bg-[#e8b05c]' onPress={handleLogin}>
            <Text className='text-white text-center' style={fontWeight400}>LOGIN</Text>
          </Pressable> */}
          <Pressable className='my-5 py-3 rounded bg-[#e8b05c]' onPress={handleFlow}>
            <Text className='text-white text-center' style={fontWeight400}>LOGIN</Text>
          </Pressable>
          <Text style={fontWeight700} className='text-center'>OR</Text>
          <Text style={fontWeight400} className='mt-1 text-center'>Already Have An Account? <Text className='text-[#e8b05c] font-semibold' onPress={() => navigation.navigate('Signup')} > Sign up</Text></Text>
        </View>

      </View>
    </SafeAreaView>
  )
}
export default Login;