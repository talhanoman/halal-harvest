import { View, ScrollView, Pressable, Text, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import { fontWeight600 } from '../../../assets/Styles/FontWeights'
import NavFooter from '../../../components/Customer/NavFooter'
import { getDatabase, get, ref, query, equalTo } from 'firebase/database'
import { useRoute } from '@react-navigation/native';
import AnimalListingCard from '../../../components/Customer/AnimalListingCard';



export default function SellerListingDetails({ navigation }) {
    const route = useRoute()
    const sellerId = route.params?.sellerId;
    const [animalData, setAnimalData] = useState([]);    

    const fetchAnimalListings = async (sellerId) => {
        const db = getDatabase();

        // Create a query to fetch animals with a specific seller_id
        const animalQuery = query(ref(db, 'Animals'), equalTo('seller_id', sellerId));

        try {
            const snapshot = await get(animalQuery);            
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log('Data', data)
                // Map data to an array
                const animalArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                return animalArray;
            } else {
                // Return an empty array or handle the case where there are no animals
                return [];
            }
        } catch (error) {
            // Handle any errors here
            console.error(error);
            return [];
        }
    };
    useEffect(() => {
        fetchAnimalListings(sellerId).then((data) => {
            console.log('Returned Array', data)
            setAnimalData(data)
        }).catch((err) => console.error(err))
    }, []);
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'CUSTOMER DASHBOARD'} navigation={navigation} />
                <ScrollView className='flex-grow px-4'>
                    <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
                        <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
                        <TextInput
                            className={`flex-1 h-10 text-black `}
                            placeholder="Search..."
                            placeholderTextColor="#aaa"
                        />
                    </View>
                    <View className="flex flex-row justify-between flex-wrap mt-4">
                        {
                            animalData?.map(({ id, price, age, color, type, category, weight }) => {
                                return (
                                    <AnimalListingCard key={id} id={id} price={price} age={age} color={color} type={type} category={category} weight={weight} navigation={navigation} />
                                )
                            })
                        }
                    </View>
                    <Text>{sellerId}</Text>
                </ScrollView>
                <NavFooter navigation={navigation} />
            </View>
            {/* Footer */}
        </SafeAreaView>
    )
}