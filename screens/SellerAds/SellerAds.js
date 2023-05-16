import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import NavHeader from '../../components/Seller/NavHeader'

// Authentication
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import SellerCard from '../../components/Seller/SellerCard'
// import { v4 as uuidv4 } from 'uuid'
export default function SellerAds({ navigation }) {
    const auth = getAuth()
    // const db = getDatabase()
    // const user = auth.currentUser
    // user.uid to get uid of current user
    const [animals, setAnimals] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const fetchData = async () => {
        try {
            const db = getDatabase()
            const snapshot = await get(ref(db, '/Animals'));
            if (snapshot.exists()) {
                const data = snapshot.val()
                // Map data to array
                const dataArray = Object.keys(data).map((key)=>({
                    id  : key,
                    ...data[key]
                }))
                console.log(dataArray)
                setAnimals(dataArray)

                
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'Seller Ads'} />
                <ScrollView className='flex-grow px-4'>
                    <View className="mt-5">
                        {/* Seller Card */}                        
                        {
                            animals?.map(({id, age, category, color, price, weight, type})=>{                                
                                return (
                                    <SellerCard key={id} age={age} category={category} color={color} price={price} weight={weight} type={type}/>
                                )
                            })
                        }
                    
                    </View>
                </ScrollView>
                <NavFooter navigation={navigation} />
            </View >
        </SafeAreaView >
    )
}



