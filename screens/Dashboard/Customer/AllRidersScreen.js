import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import ServiceProviderCard from '../../../components/Customer/ServiceProviderCard'







export default function AllRidersScreen({ navigation }) {

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'Riders'} navigation={navigation} />
        <ScrollView className='flex-grow px-4'>
          <View className='flex flex-row justify-between flex-wrap'>
            <ServiceProviderCard navigation={navigation} serviceProvider={'Rider'} />
            <ServiceProviderCard navigation={navigation} serviceProvider={'Rider'} />
            <ServiceProviderCard navigation={navigation} serviceProvider={'Rider'} />
            <ServiceProviderCard navigation={navigation} serviceProvider={'Rider'} />
          </View>


        </ScrollView>
        <NavFooter navigation={navigation} />
      </View>
      {/* Footer */}
    </SafeAreaView>
  )
}