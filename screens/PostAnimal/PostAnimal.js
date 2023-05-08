import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import { fontWeight400, fontWeight500, fontWeight600, fontWeight700 } from '../../assets/Styles/FontWeights'
import NavHeader from '../../components/Seller/NavHeader'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PickerForm from '../../components/PickerForm'
import { getDatabase } from 'firebase/database'

export default function PostAnimal({ navigation }) {

    const [animalType, setAnimalType] = useState('')
    const [category, setCategory] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedAge, setSelectedAge] = useState('')

    function saveAnimalData(userId, email, userType) {
        const db = getDatabase();
        set(ref(db, 'Animals/' + userId), {
            user_id: userId,
            fullname: fullname,
            email: email,
            usertype: userType,
            details_found: false
        }).then(() => {
            // console.log('User Successfully Added of Type', userType);
            // setTimeout(() => {
            //     navigation.navigate('Login')
            // }, 1000)
        })
    }
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'POST ANIMAL'} />
                <ScrollView className='flex-grow px-4'>
                    <View className='mt-5'>
                        <Text style={fontWeight400} className="text-gray-800 mb-2">Animal Type</Text>
                        <View className='flex flex-row justify-between'>
                            <Pressable onPress={() => setAnimalType('Goat')} className={animalType === 'Goat' ? selectedAnimal : animalStyle}>

                                <Text style={fontWeight500} className={animalType === 'Goat' ? 'text-sm mt-1 text-white' : 'text-sm mt-1'}>Goat</Text>
                            </Pressable>
                            <Pressable onPress={() => setAnimalType('Cow')} className={animalType === 'Cow' ? selectedAnimal : animalStyle}>

                                <Text style={fontWeight500} className={animalType === 'Cow' ? 'text-sm mt-1 text-white' : 'text-sm mt-1'}>Cow</Text>
                            </Pressable>
                            <Pressable onPress={() => setAnimalType('Camel')} className={animalType === 'Camel' ? selectedAnimal : animalStyle}>

                                <Text style={fontWeight500} className={animalType === 'Camel' ? 'text-sm mt-1 text-white' : 'text-sm mt-1'}>Camel</Text>
                            </Pressable>
                        </View>
                        {
                            (animalType === 'Cow' || animalType === 'Camel') &&
                            <>
                                <Text style={fontWeight400} className="text-gray-800 mb-2 mt-5">Category</Text>
                                <View className='flex flex-row justify-between'>
                                    <Pressable onPress={() => setCategory('Independent')} className={category === 'Independent' ? selectedCategory : categoryStyle}>
                                        <MaterialIcons name="goat" size={30} color="#e8b05c" />
                                        <Text style={fontWeight500} className='text-sm mt-1'>Independent</Text>
                                    </Pressable>
                                    <Pressable onPress={() => setCategory('Shared')} className={category === 'Shared' ? selectedCategory : categoryStyle}>
                                        <MaterialCommunityIcons name="knife" size={30} color="#e8b05c" />
                                        <Text style={fontWeight500} className='text-sm mt-1'>Shared</Text>
                                    </Pressable>
                                </View>
                            </>
                        }
                        {/* Forms */}
                        <View className='mt-5'>
                            <PickerForm items={colorOptions} selectedItem={selectedColor} setSelectedItem={setSelectedColor} label={'Color'} />
                            <View className='my-4'>
                                <PickerForm items={ageOptions} selectedItem={selectedAge} setSelectedItem={setSelectedAge} label={'Age'} />
                            </View>
                            <Text style={fontWeight400} className="text-gray-800">Price (Rs)</Text>
                            <TextInput
                                style={fontWeight400}
                                keyboardType="numeric"

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
                            mb-4
                           "
                            />
                            <Text style={fontWeight400} className="text-gray-800 ">Weight (Kg)</Text>
                            <TextInput
                                style={fontWeight400}
                                keyboardType="numeric"

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
                            mb-4
                            "
                            />
                            <Text style={fontWeight400} className="text-gray-800 ">Description</Text>
                            <TextInput
                                style={fontWeight400}
                                keyboardType="default"
                                numberOfLines={4}
                                multiline
                                className="  
                                 form-control
                            block                            
                            px-2                            
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            w-full
                            mb-4
                            "
                            />
                        </View>
                    </View>
                    <Pressable style={shadow} className='bg-[#e8b05c] px-4 py-2 rounded-md ml-auto flex flex-row items-center mb-4'>
                        <Text style={fontWeight500} className="text-white text-center text-base">Add Post</Text>
                    </Pressable>
                </ScrollView>
                <NavFooter navigation={navigation} />
            </View >
        </SafeAreaView >
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})

const selectedCategory = 'rounded-md w-[48%] bg-white p-5 flex flex-col items-center justify-center border border-[#e8b05c]'
const categoryStyle = 'rounded-md w-[48%] bg-white p-5 flex flex-col items-center justify-center'

const selectedAnimal = 'rounded-md w-[32%] bg-white px-5 py-2.5 flex flex-col items-center justify-center bg-[#e8b05c]'
const animalStyle = 'rounded-md w-[32%] bg-white px-5 py-2.5 flex flex-col items-center justify-center'

const colorOptions = [
    { label: 'White', value: 'White' },
    { label: 'Black', value: 'Black' },
    { label: 'Brown', value: 'Brown' },
    { label: 'White-Black', value: 'White-Black' },
    { label: 'White-Brown', value: 'White-Brown' },
]
const ageOptions = [
    { label: 'Two-Tooth (دو دانت)', value: 'Two-Tooth (دو دانت)' },
    { label: 'Four-Tooth (چار دانت)', value: 'Four-Tooth (چار دانت)' },
    { label: 'Six-Tooth (چھ دانت)', value: 'Six-Tooth (چھ دانت)' },
]