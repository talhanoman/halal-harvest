import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'

export default function BookingDetailsRider({ navigation }) {

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'RIDER BOOKING DETAILS'} navigation={navigation} />
        <ScrollView className='flex-grow px-4'>
          <View className='flex flex-row justify-between flex-wrap'>           
          
          </View>


        </ScrollView>
        <NavFooter navigation={navigation} />
      </View>
      {/* Footer */}
    </SafeAreaView>
  )
}