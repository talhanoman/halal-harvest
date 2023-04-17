import { View, Text, TextInput, Pressable } from 'react-native';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../../firebase';

import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import { fontWeight400, fontWeight700 } from '../../assets/Styles/FontWeights';
// import validator from 'validator';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);  
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])




// const handleLogin = ()=>{
//   if(email === '' && password === '')
//   {
//     setError('Enter details to login!')    
//   }else{
//     auth.signInWithEmailAndPassword(email, password)
//     .then((res)=>{
//       setSuccess('User Logged In Successfully ')
//     })
//     .catch((err)=> console.log(err.code))
//   }

// }
  return (
    <SafeAreaView>
      <View className={`px-2 flex flex-col justify-center h-full bg-white`}>
        <View className='mx-5'>
          <Text style={fontWeight700} className='text-center text-4xl mb-10 text-[#e8b05c]'>Login</Text>
          {/* Phone Input */}
          <Text style={fontWeight400} className="text-gray-800 ">Email</Text>
          <TextInput
            style={fontWeight400}
            keyboardType="email"
            value={email}
            onChangeText={setEmail}

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

          <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
          <Text style={fontWeight400} className="text-green-500 text-xs">{success}</Text>
          {/* onPress event */}
          <Pressable className='my-5 py-3 rounded bg-[#e8b05c]' onPress={handleLogin}>
            <Text className='text-white text-center' style={fontWeight400}>LOGIN</Text>
          </Pressable>
          <Text style={fontWeight700} className='text-center'>OR</Text>
          <Text style={fontWeight400} className='mt-1 text-center'>Already Have An Account? <Text className='text-[#e8b05c] font-semibold' onPress={() => navigation.navigate('Signup')} > Login</Text></Text>
        </View>

      </View>
    </SafeAreaView>
  )
}
export default Login;