import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import { fontWeight300, fontWeight400, fontWeight600 } from '../../assets/Styles/FontWeights'
import NavHeader from '../../components/Seller/NavHeader'

export default function SellerDashboard() {
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        <NavHeader />
        <ScrollView className='flex-grow px-4'>
          <View className='mt-5'>
            <Text className='text-[10px] inter text-[#2b2b2b]' style={fontWeight400}>WED, 23 MARCH </Text>
            <Text className='text-2xl inter text-[#e8b05c]' style={fontWeight600}>Hello, John Doe</Text>
          </View>
        </ScrollView>
        <NavFooter />
      </View>
    </SafeAreaView>
  )
}