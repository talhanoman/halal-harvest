import { View, ScrollView, Pressable, Text, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavHeader from '../../../components/Seller/NavHeader'
import { getAuth, signOut } from '@firebase/auth'
import { fontWeight500, fontWeight400 } from '../../../assets/Styles/FontWeights'
import NavFooter from '../../../components/Customer/NavFooter'
export default function CustomerDashboard({ navigation }) {
  const [error, setError] = useState('')  
  const [search, setSearch] = useState('')
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'CUSTOMER DASHBOARD'} />
        <ScrollView className='flex-grow px-4'>
          <Text style={fontWeight400} className="text-gray-800 mt-4">Search</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
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
                            rounded-lg
                            w-full
                            mb-4
                           "
          />
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