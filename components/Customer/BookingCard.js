import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'
import StarRatingCustomer from './StarRatingCustomer'


function Badge({ type }) {
    return (
        <>
            {
                type === 'Approved' ?
                    <View className='px-2 py-1 bg-[#00b22d] rounded-md'>
                        <Text style={fontWeight400} className='text-xs text-[#FFFFFF]'>Approved</Text>
                    </View>
                    :
                    type === 'Pending' ?
                        <View className='px-2 py-1 bg-[#e8b05c] rounded-md'>
                            <Text style={fontWeight400} className='text-xs text-[#FFFFFF]'>Pending</Text>
                        </View>

                        :
                        <View className='px-2 py-1 bg-[#1877F2] rounded-md'>
                            <Text style={fontWeight400} className='text-xs text-[#FFFFFF]'>Served</Text>
                        </View>
            }

        </>
    )
}
export default function BookingCard({ status }) {
    return (
        <Pressable style={shadow} className='w-full bg-white rounded-md p-2 mb-3 active:scale-95'>
            <Text style={fontWeight500} className='text-xs'>Booking Id: #8217361827</Text>
            {/* Row */}
            <View className='flex flex-row justify-between items-center'>
                <View className='w-[49%]'>
                    <Text style={fontWeight400} className='text-xs '>Service Type:</Text>
                </View>
                <View className='w-[49%]'>
                    <Text style={fontWeight500} className='text-sm  text-right'>Butcher</Text>
                </View>
            </View>
            {/* Row */}
            <View className='flex flex-row justify-between items-center'>
                <View className='w-[49%]'>
                    <Text style={fontWeight400} className='text-xs '>Service Provider Name:</Text>
                </View>
                <View className='w-[49%]'>
                    <Text style={fontWeight500} className='text-sm  text-right'>Talha Noman</Text>
                </View>
            </View>
            {/* Row */}
            <View className='flex flex-row justify-between items-center'>
                <View className='w-[49%]'>
                    <Text style={fontWeight400} className='text-xs '>Date:</Text>
                </View>
                <View className='w-[49%]'>
                    <Text style={fontWeight500} className='text-sm  text-right'>Wed 22, May</Text>
                </View>
            </View>
            {/* Row */}
            <View className='flex flex-row justify-between items-center'>
                <View className='w-[49%]'>
                    <Text style={fontWeight400} className='text-xs '>Charges:</Text>
                </View>
                <View className='w-[49%]'>
                    <Text style={fontWeight500} className='text-sm  text-right'>Rs. 22000</Text>
                </View>
            </View>
            {/* Row */}
            <View className='flex flex-row justify-between items-center'>
                <View className='w-[49%]'>
                    <Text style={fontWeight400} className='text-xs '>Status:</Text>
                </View>

                <Badge type={status} />
            </View>
            {/* Divider */}
            <View className='h-[1px] bg-gray-300 my-3' />
            <View className='mx-auto'>
                <StarRatingCustomer />
            </View>

        </Pressable>
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})