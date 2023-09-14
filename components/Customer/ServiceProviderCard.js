import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'

const ServiceProviderCard = ({ navigation, serviceProvider }) => {
    return (
        <View className='bg-white rounded-md w-[49%] p-2 flex flex-col mb-2.5'>            
            <Image
                source={require('../../assets/sample-avatar.png')}
                className='w-12 h-12 rounded-full mx-auto mb-3'
            />
            <View className='flex flex-row justify-between text-sm my-2'>
                <Text style={fontWeight400} >Name: </Text>
                <Text style={fontWeight500} >Talha Noman</Text>
            </View>
            {/* <View className='flex flex-row justify-between text-sm my-2'>
                <Text style={fontWeight400}>Rate: </Text>
                <Text style={fontWeight500} >500Pkr</Text>
            </View> */}
            <View className='flex flex-row justify-between text-sm'>
                <Text style={fontWeight400}>Rating: </Text>
                <Text style={fontWeight500} >4.5</Text>
            </View>        
            <Pressable onPress={()=> navigation.navigate(serviceProvider === 'Rider'? 'BookingDetailsRider' : serviceProvider === 'Butcher'? 'BookingDetailsButcher': 'BookingDetailsSlaughterHouse')} className='my-5 py-3 rounded bg-[#e8b05c]'>
                <Text className='text-white text-center' style={fontWeight400}>Request Service</Text>
            </Pressable>
        </View>
    )
}

export default ServiceProviderCard