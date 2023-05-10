import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'
import NavHeader from '../../components/Seller/NavHeader'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PickerForm from '../../components/PickerForm'
import { getDatabase, ref, set } from 'firebase/database'
// Authentication
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid'
export default function PostAnimal({ navigation }) {
    const auth = getAuth()
    const user = auth.currentUser
    // loading State
    const [loading, setLoading] = useState(false);
    // Type Goat / Cow / Camel
    const [animalType, setAnimalType] = useState('Goat')
    const [category, setCategory] = useState('Independent')
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedAge, setSelectedAge] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [weight, setWeight] = useState('')
    // Error / Success
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    function saveAnimalData() {
        setLoading(true)
        setError('')
        const db = getDatabase();

        if (selectedColor !== '' && selectedAge !== '' && price !== '' && weight !== '') {
            const animalNewId = uuidv4()
            set(ref(db, 'Animals/' + animalNewId), {
                age: selectedAge,
                category: category,
                color: selectedColor,
                description: description,
                price: price,
                type: animalType,
                weight: weight,
            }).then(() => {
                setSuccess('Animal Added Successfully');
                console.log('Animal Added Successfully with Id: ', animalNewId)
                // Get Currently Logged in User / Seller ID
                if (user !== null) {
                    const newSellerAnimalId = uuidv4()
                    const sellerUid = user.uid;
                    set(ref(db, 'SellerAnimal/' + newSellerAnimalId), {
                        animal_id: animalNewId,
                        seller_id: sellerUid,
                    }).then(() => {

                        console.log('Animal Seller Reference Added')
                        setLoading(false)
                    })
                }
            })
        }
        else {
            setError('Please Fill all Details!')
            console.log('Age :' , selectedAge )
            console.log('Category :' , category )
            console.log('Color :' , selectedColor )            
            console.log('Price :' , price )
            console.log('Weight', weight)
            setLoading(false)
        }

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
                                value={price}
                                onChangeText={setPrice}
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
                                value={weight}
                                onChangeText={setWeight}
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
                                value={description}
                                onChangeText={setDescription}
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
                    <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                    <Text style={fontWeight400} className="text-green-500 text-xs">{success}</Text>
                    <Pressable onPress={saveAnimalData} style={shadow} className='bg-[#e8b05c] px-4 py-2 rounded-md ml-auto flex flex-row items-center mb-4'>
                        <Text style={fontWeight500} className="text-white text-center text-base">{
                            loading ?
                                '...'
                                :
                                'Add Post'
                        }</Text>
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
    { label: 'Select Color', value: '' },
    { label: 'White', value: 'White' },
    { label: 'Black', value: 'Black' },
    { label: 'Brown', value: 'Brown' },
    { label: 'White-Black', value: 'White-Black' },
    { label: 'White-Brown', value: 'White-Brown' },
]
const ageOptions = [
    { label: 'Select Age', value: '' },
    { label: 'Two-Tooth (دو دانت)', value: 'Two-Tooth (دو دانت)' },
    { label: 'Four-Tooth (چار دانت)', value: 'Four-Tooth (چار دانت)' },
    { label: 'Six-Tooth (چھ دانت)', value: 'Six-Tooth (چھ دانت)' },
]