import { View, ScrollView, Pressable, TextInput, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import NavHeader from '../../../components/Customer/NavHeader'

import NavFooter from '../../../components/Customer/NavFooter'
import { fontWeight400, fontWeight500, fontWeight600 } from '../../../assets/Styles/FontWeights';
import BookingCard from '../../../components/Customer/BookingCard';

export default function AllBookingsCustomer({ navigation }) {

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'All Bookings'} navigation={navigation} />
        <ScrollView className='flex-grow px-4'>
          <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
            <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
            <TextInput
              className={`flex-1 h-10 text-black `}
              placeholder="Search..."
              placeholderTextColor="#aaa"
            />
          </View>

          <BookingCard status={'Approved'} />
          <BookingCard status={'Pending'} />
          <BookingCard status={'Served'} />

        </ScrollView>
        <NavFooter navigation={navigation} />
      </View>
      {/* Footer */}
    </SafeAreaView>
  )
}