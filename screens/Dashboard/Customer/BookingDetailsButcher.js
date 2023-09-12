import { View, ScrollView, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
// import DatePicker from 'react-native-date-picker'

export default function BookingDetailsButcher({ navigation }) {


  // const [show, setShow] = useState(false);
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'BUTCHERS'} navigation={navigation} />
        <ScrollView className='flex-grow px-4'>                    
          
        </ScrollView>
        <NavFooter navigation={navigation} />
      </View>
      {/* Footer */}
    </SafeAreaView>
  )
}