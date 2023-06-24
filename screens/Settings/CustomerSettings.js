import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavFooter from '../../components/Customer/NavFooter'
import NavHeader from '../../components/Seller/NavHeader'
import { getAuth, signOut } from 'firebase/auth'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'
export default function CustomerSettings({ navigation }) {
    const [error, setError] = useState('')
    const handleSignout = () => {
        const auth = getAuth()
        signOut(auth).then(() => {
            navigation.navigate("Login")
        }).catch((error) => {
            // An error happened.            
            setError(error)
        });
    }
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'CUSTOMER ACCOUNT'} />
                <ScrollView className='flex-grow p-4'>
                    <Text style={fontWeight400} className="text-red-500 text-xs">{error}</Text>
                    <Pressable onPress={handleSignout} style={shadow} className='bg-red-500 px-4 py-2 rounded-md mt-auto flex flex-row items-center mb-4'>
                        <Text style={fontWeight500} className="text-white text-center text-base">Logout</Text>
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