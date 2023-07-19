import { View, ScrollView, Pressable, Text, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavHeader from '../../../components/Seller/NavHeader'
import { getAuth, signOut } from '@firebase/auth'
import { fontWeight500, fontWeight400, fontWeight600 } from '../../../assets/Styles/FontWeights'
import NavFooter from '../../../components/Customer/NavFooter'
import { getDatabase, get, ref } from 'firebase/database'

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import FilterButton from '../../../components/Customer/FilterButton';




export default function CustomerDashboard({ navigation }) {
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [animals, setAnimals] = useState([])

  const fetchSellerListings = async () => {
    const db = getDatabase()
    const snapshot = await get(ref(db, '/Animals'));
    if (snapshot.exists()) {
      const data = snapshot.val()
      // Map data to array
      const dataArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }))
      return dataArray;
    } else {
      return new Error('Failed!');
    }

  };

  useEffect(() => {
    fetchSellerListings()
      .then((data) => {
        console.log(data)
      }).catch((err) => console.log(err))
  }, [])


  // Filter States
  const [animalType, setanimalType] = useState('')
  const [animalAge, setAnimalAge] = useState('')
  const [sacrificeType, setSacrificeType] = useState('')
  const [animalColor, setAnimalColor] = useState('')
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'CUSTOMER DASHBOARD'} />
        <ScrollView className='flex-grow px-4'>
          <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
            <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
            <TextInput
              className={`flex-1 h-10 text-black `}
              placeholder="Search..."
              placeholderTextColor="#aaa"
            />
          </View>

          <Collapse isExpanded={true} onToggle={(state) => console.log(state)}>
            <CollapseHeader >
              <View className='flex flex-row justify-between items-center py-4'>
                <Text style={fontWeight600} className='text-[#e8b05c] text-sm'>Filters</Text>
                <Icon name="filter" size={20} color="#e8b05c" />
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View className='flex flex-col gap-y-4'>
                {/* Row 0 */}
                <View className='flex flex-row justify-between'>
                  <FilterButton filter={'Goat'} setFilterType={setanimalType} filterType={animalType} />
                  <FilterButton filter={'Cow'} setFilterType={setanimalType} filterType={animalType} />
                  <FilterButton filter={'Camel'} setFilterType={setanimalType} filterType={animalType} />
                </View>
                {/* Row 1 */}
                <View className='flex flex-row justify-between'>
                  <FilterButton filter={'Kheera'} setFilterType={setAnimalAge} filterType={animalAge} />
                  <FilterButton filter={'Two Tooth'} setFilterType={setAnimalAge} filterType={animalAge} />
                  <FilterButton filter={'Four Tooth'} setFilterType={setAnimalAge} filterType={animalAge} />
                  <FilterButton filter={'Six Tooth'} setFilterType={setAnimalAge} filterType={animalAge} />
                </View>

                {/* Row 2 */}
                <View className='flex flex-row justify-between'>
                  <FilterButton filter={'Independent'} setFilterType={setSacrificeType} filterType={sacrificeType} />
                  <FilterButton filter={'Shared'} setFilterType={setSacrificeType} filterType={sacrificeType} />
                </View>
                {/* Row 3 */}
                <View className='flex flex-row justify-between'>
                  <FilterButton filter={'White'} setFilterType={setAnimalColor} filterType={animalColor} />
                  <FilterButton filter={'Brown'} setFilterType={setAnimalColor} filterType={animalColor} />
                  <FilterButton filter={'Black'} setFilterType={setAnimalColor} filterType={animalColor} />
                  
                </View>

              </View>
            </CollapseBody>
          </Collapse>


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