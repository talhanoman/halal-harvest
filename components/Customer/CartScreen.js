import React from 'react';
import { View, Text, FlatList, Button, Image, Pressable, ScrollView } from 'react-native';
import { useCart } from '../../Context/CartContext'; // Import the useCart hook
import { SafeAreaView } from 'react-native-safe-area-context'
import { fontWeight400, fontWeight500 } from '../../assets/Styles/FontWeights';
import { Ionicons } from '@expo/vector-icons';
import NavHeader from '../Seller/NavHeader';
const CartScreen = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                <NavHeader title={'Cart'} />
                <ScrollView className='flex-grow p-4'>
                    <View>                      
                        <FlatList
                            data={cartItems}
                            renderItem={({ item }) => (
                                <View className='flex flex-row bg-white p-1 my-1'>
                                    {
                                        item.type === 'Goat' ?
                                            <Image
                                                source={require('../../assets/white-goat.jpeg')}
                                                className='w-24 bg-contain p-2 h-24 my-auto rounded-md'
                                            />
                                            :
                                            item.type === 'Camel' ?
                                                <Image
                                                    source={require('../../assets/camel.jpg')}
                                                    className='w-24 bg-contain p-2 h-24 my-auto rounded-md'
                                                />
                                                :
                                                <Image
                                                    source={require('../../assets/cow.jpg')}
                                                    className='w-24 bg-contain p-2 h-24 my-auto rounded-md'
                                                />
                                    }
                                    <View className='bg-[#FFFFFF] flex-1 flex flex-row items-center'>
                                        <View className='flex flex-col gap-y-2 p-2'>
                                            <View className='flex flex-row gap-x-1'>
                                                <Text style={fontWeight500} className='text-xs text-gray-600'>Id: </Text>
                                                <Text style={fontWeight400} className='text-xs'>{item.id.slice(1, 10)}</Text>
                                            </View>
                                            <View className='flex flex-row gap-x-1'>
                                                <Text style={fontWeight500} className='text-xs text-gray-600'>Color: </Text>
                                                <Text style={fontWeight400} className='text-xs'>{item.color}</Text>
                                            </View>
                                            <View className='flex flex-row gap-x-1'>
                                                <Text style={fontWeight500} className='text-xs text-gray-600'>Weight: </Text>
                                                <Text style={fontWeight400} className='text-xs'>{item.weight}</Text>
                                            </View>
                                        </View>
                                        <Pressable className='ml-auto' onPress={() => removeFromCart(item.id)}>
                                            <Ionicons name='trash-outline' size={32} color={"red"} />
                                        </Pressable>
                                    </View>
                                    <Text>{item.name}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;
