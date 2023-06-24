import { View, ScrollView, Pressable, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavHeader from '../../../components/Seller/NavHeader'
import { getAuth, signOut } from '@firebase/auth'
import { fontWeight500 } from '../../../assets/Styles/FontWeights'
import NavFooter from '../../../components/Customer/NavFooter'
export default function CustomerDashboard({ navigation }) {
  const [error, setError] = useState('')
  // firebase  
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
        <NavHeader title={'CUSTOMER DASHBOARD'} />
        <ScrollView className='flex-grow px-4'>
          <Pressable onPress={handleSignout} style={shadow} className='bg-red-500 px-4 py-2 rounded-md mt-auto flex flex-row items-center mb-4'>
            <Text style={fontWeight500} className="text-white text-center text-base">CustomerDashboard</Text>
          </Pressable>
        </ScrollView>
        <NavFooter navigation={navigation} />
      </View>
      {/* Footer */}
    </SafeAreaView>
  )
}

const { shadow } = StyleSheet.create({
  shadow: {
    elevation: 1
  }
})