import { View, ScrollView, Pressable, TextInput, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'

import { fontWeight600 } from '../../../assets/Styles/FontWeights';
import NavFooterSP from '../../../components/ServiceProvider/NavFooterSP';
import BookingCardRequest from '../../../components/ServiceProvider/BookingCardRequest';


const tabStyle = 'text-xs text-[#e8b05c] p-1 border border-[#e8b05c] rounded-md';
const activeTabStyle = 'text-xs bg-[#e8b05c] text-[#FFFFFF] p-1 border border-[#e8b05c] rounded-md';
export default function RidersDashboard({ navigation }) {
  const [filter, setFilter] = useState('All');
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'Butchers Dashboard'} navigation={navigation} />
        <ScrollView className='flex-grow px-4'>
          <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
            <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
            <TextInput
              className={`flex-1 h-10 text-black `}
              placeholder="Search..."
              placeholderTextColor="#aaa"
            />
          </View>
          <Text className='text-lg' style={fontWeight600}>Bookings: </Text>
          <View className='flex flex-row justify-between bg-white p-2 my-4 rounded-md' style={shadow}>
            <Pressable onPress={() => setFilter('All')}>
              <Text className={filter === 'All' ? activeTabStyle : tabStyle} style={fontWeight600}>All</Text>
            </Pressable>
            <Pressable onPress={() => setFilter('Pending')}>
              <Text className={filter === 'Pending' ? activeTabStyle : tabStyle} style={fontWeight600}>Pending</Text>
            </Pressable>
            <Pressable onPress={() => setFilter('Served')}>
              <Text className={filter === 'Served' ? activeTabStyle : tabStyle} style={fontWeight600}>Served</Text>
            </Pressable>
            <Pressable onPress={() => setFilter('Rejected')}>
              <Text className={filter === 'Rejected' ? activeTabStyle : tabStyle} style={fontWeight600}>Rejected</Text>
            </Pressable>
          </View>
          <BookingCardRequest status={'Approved'} />
          <BookingCardRequest status={'Pending'} />
          <BookingCardRequest status={'Served'} />
        </ScrollView>

        <NavFooterSP navigation={navigation} serviceType='Butcher' />
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