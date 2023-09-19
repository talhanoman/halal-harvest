import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights'


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
                        type === 'Rejected' ?
                            <View className='px-2 py-1 bg-red-500 rounded-md'>
                                <Text style={fontWeight400} className='text-xs text-[#FFFFFF]'>Rejected</Text>
                            </View>
                            :
                            <View className='px-2 py-1 bg-[#1877F2] rounded-md'>
                                <Text style={fontWeight400} className='text-xs text-[#FFFFFF]'>Served</Text>
                            </View>

            }

        </>
    )
}
export default function BookingCardRequest({ status }) {
    return (
        <Pressable style={shadow} className='w-full bg-white rounded-md p-2 mb-3 flex flex-col gap-y-1'>
            <Text style={fontWeight500} className='text-xs'>Booking Id: #8217361827</Text>
            {/* Row */}
            <View className='flex flex-row justify-between items-center'>
                <View className='w-[49%]'>
                    <Text style={fontWeight400} className='text-xs '>Pickup Location:</Text>
                </View>
                <View className='w-[49%]'>
                    <Text style={fontWeight500} className='text-sm  text-right'>Sargodha Road</Text>
                </View>
            </View>
            {/* Row */}
            <View className='flex flex-row justify-between items-center'>
                <View className='w-[49%]'>
                    <Text style={fontWeight400} className='text-xs '>Destination:</Text>
                </View>
                <View className='w-[49%]'>
                    <Text style={fontWeight500} className='text-sm  text-right'>Canal Road</Text>
                </View>
            </View>
            {/* Row */}
            <View className='flex flex-row justify-between items-center'>
                <View className='w-[49%]'>
                    <Text style={fontWeight400} className='text-xs '>Customer Name:</Text>
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

                {
                    status === 'Pending' ?
                        <View className='flex flex-row justify-between items-center gap-x-2'>
                            <Pressable className='active:bg-gray-100'>
                                <Text className='text-xs p-1 border border-red-500 rounded-md text-red-500' style={fontWeight500}>
                                    Reject
                                </Text>
                            </Pressable>
                            <Pressable className='active:bg-gray-100'>
                                <Text className='text-xs p-1 border border-green-500 rounded-md text-green-500' style={fontWeight500}>
                                    Accept
                                </Text>
                            </Pressable>
                        </View>
                        :
                        <Badge type={status} />
                }
            </View>


        </Pressable>
    )
}

const { shadow } = StyleSheet.create({
    shadow: {
        elevation: 1
    }
})