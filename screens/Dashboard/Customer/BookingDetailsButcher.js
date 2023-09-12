import { View, ScrollView, Text, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontWeight400 } from '../../../assets/Styles/FontWeights'
export default function BookingDetailsButcher({ navigation }) {


  const [date, setDate] = useState(new Date(1598051730000));  
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);    
    setDate(currentDate);    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'BUTCHERS'} navigation={navigation} />
        <ScrollView className='flex-grow p-4'>          
          <Text style={fontWeight400} className="text-gray-800 ">Select Booking Date: </Text>
          <View className='flex flex-row justify-between items-center gap-x-2 mb-3'>
          <View
              className="
                          form-control
                          block
                          py-2
                          px-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded 
                          flex-1 
                                                   "
            >
              <Text style={fontWeight400}>{date.toLocaleDateString()}</Text>
            </View>   
            <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c]' onPress={showDatepicker}>
              <Icon name="calendar-outline" size={20} color="#ffffff" />
            </Pressable>
          </View>
          <Text style={fontWeight400} className="text-gray-800 ">Select Booking Time: </Text>
          <View className='flex flex-row justify-between items-center gap-x-2 mb-3'>
            <View
              className="
                          form-control
                          block
                          py-2
                          px-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded 
                          flex-1                        "
            >
              <Text style={fontWeight400}>{date.toLocaleTimeString()}</Text>
            </View>         
            <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c]' onPress={showTimepicker}>
              <Icon name="time-outline" size={20} color="#ffffff" />
            </Pressable>
          </View>                  
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
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