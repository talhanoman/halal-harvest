import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'

const ServiceProviderCard = ({ navigation, serviceProvider, service, user }) => {
    return (
        <View className='bg-white rounded-md w-[49%] p-2 flex flex-col mb-2.5'>
            <Image
                source={require('../../assets/sample-avatar.png')}
                className='w-12 h-12 rounded-full mx-auto mb-3'
            />
            <View className='flex flex-row justify-between text-sm my-2'>
                <Text style={fontWeight400} >Name: </Text>
                <Text style={fontWeight500} >{user?.fullname}</Text>
            </View>
            {
                service?.service_type === 'Butcher' &&
                <>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Rate Goat: </Text>
                        <Text style={fontWeight500} >{service?.rate_goat}Pkr</Text>
                    </View>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Rate Cow: </Text>
                        <Text style={fontWeight500} >{service?.rate_cow}Pkr</Text>
                    </View>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Rate Camel: </Text>
                        <Text style={fontWeight500} >{service?.rate_camel}Pkr</Text>
                    </View>
                </>
            }

            {
                service?.service_type === 'Rider' &&
                <>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Contact: </Text>
                        <Text style={fontWeight500} >{service?.contact}</Text>
                    </View>
                    <View className='flex flex-row justify-between text-sm my-2'>
                        <Text style={fontWeight400}>Min. Fare: </Text>
                        <Text style={fontWeight500} >{service?.minimum_fare}Pkr</Text>
                    </View>                   
                </>
            }
            <View className='flex flex-row justify-between text-sm my-2'>
                <Text style={fontWeight400}>Rating: </Text>
                <Text style={fontWeight500} >{service?.rating === 0 ? 'Not Available' : service?.rating}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate(serviceProvider === 'Rider' ? 'BookingDetailsRider' : serviceProvider === 'Butcher' ? 'BookingDetailsButcher' : 'BookingDetailsSlaughterHouse', {
                service,
                user
            })} className='my-5 py-3 rounded bg-[#e8b05c] active:scale-95'>
                <Text className='text-white text-center' style={fontWeight400}>Request Service</Text>
            </Pressable>
        </View>
    )
}

export default ServiceProviderCard