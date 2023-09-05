import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { fontWeight400, fontWeight500, fontWeight600 } from '../../assets/Styles/FontWeights'

const SellerStoreCard = ({ name, city, sellerId, navigation }) => {
    return (
        <View className="bg-white shadow-lg rounded-lg overflow-hidden w-full mb-3">
            <View className="px-4 py-4">
                <Text style={fontWeight600} className="text-xl font-semibold text-gray-800">{name}</Text>
                <Text style={fontWeight400} className="text-gray-600">{city}</Text>
            </View>
            <View className="px-4 py-4">
                <Text className="text-gray-700">Seller Description</Text>
            </View>
            <View className="px-4 py-4 flex justify-between items-center">
                <Text style={fontWeight500} className="text-gray-600">
                    4.5 Rating
                </Text>
                <Pressable onPress={() => navigation.navigate('SellerListingDetails', { sellerId })} className="px-4 py-2 bg-[#e8b05c] text-white rounded-full hover:bg-[#e8b05c] focus:outline-none focus:ring focus:ring-[#e8b05c]">
                    <Text className='text-[#FFFFFF]' style={fontWeight500}>
                        View Listings
                    </Text>
                </Pressable>
            </View>
        </View>

    )
}

export default SellerStoreCard