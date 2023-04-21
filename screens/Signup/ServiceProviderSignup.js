import { View, Text, TextInput, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { fontWeight400, fontWeight700, fontWeight500 } from '../../assets/Styles/FontWeights';
import validator from 'validator';
// import { Picker } from '@react-native-picker/picker';
import Picker from '../../components/Picker';

const ServiceProviderSignup = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    const [selectedItem, setSelectedItem] = useState();

    const validatePassword = () => {
        let isValid = true


        if (!email || !password) {
            setError('Enter details to login')
            isValid = false;
        }
        else {
            if (validator.isEmail(email)) {
                if (password !== '' && confirmPassword !== '') {
                    if (password !== confirmPassword) {
                        isValid = false
                        setError('Passwords does not match')
                    }
                }
            }
            else {
                isValid = false;
                setError('Invalid Email')
            }
        }


        return isValid
    }


    const handleSignup = () => {
        setError('')
        setSuccess('')
        if (validatePassword()) {
            createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then((res) => {
                    console.log(res.user)
                    setSuccess('User Registered Successfully')
                })
                .catch(err => {
                    switch (err.code) {
                        case 'auth/email-already-in-use':
                            setError('Email Already in Use')
                            break;
                        case 'auth/weak-password':
                            setError('Password should be atleast 6 characters')
                        default:
                            break;
                    }
                })
        }
    }

    const items = [
        { label: 'Slaughter House', value: 'Slaughter House' },
        { label: 'Butcher', value: 'Butcher' },
        { label: 'Rider', value: 'Rider' },
    ]

    return (
        <SafeAreaView>
            <View className={`px-2 flex flex-col justify-center h-full bg-white`}>
                <View className='mx-5'>
                    <Text style={fontWeight700} className='text-center text-4xl text-[#e8b05c]'>Service Provider</Text>
                    <Text style={fontWeight500} className='text-[#2b2b2b] text-base text-center mb-5'>Register Account</Text>
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

                    {/* Password Input */}
                    <Text style={fontWeight400} className="text-gray-800 ">Confirm Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={fontWeight400}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}

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
                            w-full
                            rounded
                            mb-5"
                    />
                    <Picker items={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem} label={'Account Type'} />                  
                    <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                    <Text style={fontWeight400} className="text-green-500 text-xs">{success}</Text>
                    {/* onPress event */}
                    <Pressable className='my-5 py-3 rounded bg-[#e8b05c]' onPress={handleSignup}>
                        <Text className='text-white text-center' style={fontWeight400}>SIGNUP</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default ServiceProviderSignup;