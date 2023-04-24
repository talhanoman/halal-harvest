import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'
import NavHeader from '../../components/Seller/NavHeader'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function PostAnimal({ navigation }) {

    const [category, setCategory] = useState('')

    const selectedCategory = 'rounded-md w-[48%] bg-white p-5 flex flex-col items-center justify-center border border-[#e8b05c]'
    const categoryStyle = 'rounded-md w-[48%] bg-white p-5 flex flex-col items-center justify-center'
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'POST ANIMAL'} />
                <ScrollView className='flex-grow px-4'>
                    <View className='mt-4'>
                        <Text style={fontWeight400} className="text-gray-800 mb-2">Category</Text>
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
                        {/* Forms */}
                        <View className='mt-5'>
                            <Text style={fontWeight400} className="text-gray-800 ">Price (Rs)</Text>
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
                        </View>
                    </View>
                </ScrollView>
                <NavFooter navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})