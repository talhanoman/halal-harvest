import { View, ScrollView, Pressable, TextInput, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import NavHeader from '../../../components/Customer/NavHeader'

import NavFooter from '../../../components/ServiceProvider/NavFooter'
import { fontWeight600 } from '../../../assets/Styles/FontWeights';

export default function ButcherDashboard({ navigation }) {

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'BUTCHER DASHBOARD'} navigation={navigation} />
        <ScrollView className='flex-grow px-4'>
          <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
            <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
            <TextInput
              className={`flex-1 h-10 text-black `}
              placeholder="Search..."
              placeholderTextColor="#aaa"
            />
          </View>

          <Pressable onPress={()=> navigation.navigate('AllButchersScreen')} style={shadow} className='w-full bg-white rounded-md p-2 flex flex-row items-center mb-3'>
            <View className='w-24'>
              <Image
                source={require('../../../assets/butcher.png')}
                className='w-20 h-20 bg-contain'
              />
            </View>
            <Text style={fontWeight600} className='text-lg ml-2.5'>Bookings Request</Text>
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