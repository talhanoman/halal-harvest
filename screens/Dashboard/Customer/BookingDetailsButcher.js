import { View, ScrollView, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontWeight400, fontWeight500, fontWeight600 } from '../../../assets/Styles/FontWeights'
// Expo Location
import * as Location from 'expo-location';
const goatRate = 4000
const cowRate = 8000;
const camelRate = 12000
export default function BookingDetailsButcher({ navigation }) {
  
  const [error, setError] = useState("")
  const [isBooked, setIsBooked] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [goats, setGoats] = useState(0)
  const [cows, setCows] = useState(0)
  const [camels, setCamels] = useState(0)
  const [currentLocation, setCurrentLocation] = useState("")
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const cleanNullFromString = (inputString) => {
    // Use a regular expression to remove 'null' (case-insensitive)
    const cleanedString = inputString.replace(/null,/gi, '');

    return cleanedString;
  }
  const handleLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // Extract latitude and longitude from the location object
    const { latitude, longitude } = location.coords;
    // Use reverse geocoding to get city name
    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    // Extract city name from the geocode result
    if (geocode.length > 0) {
      let address = geocode[0];
      let address2 = `${address?.street}, ${address.streetNumber},${address.district},  ${address.city}, ${address.country}`
      setCurrentLocation(cleanNullFromString(address2));
    }
    console.clear()
    console.log('Location', location)
  }

  const handleTotal = () => {
    return (goatRate * goats) + (cowRate * cows) + (camelRate * camels)
  }
  const handleRequestService = () => {
    if (date !== "" && handleTotal() !== 0) {
      setIsBooked(true);
      setTimeout(() => {
        navigation.navigate('AllBookingsCustomer')
      }, 2000);
    } else {
      setError("Please fill all details!")
    }
  }
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'Butchers'} navigation={navigation} />
        <ScrollView className='flex-grow p-4'>
          <Text style={fontWeight600} className='text-xl mb-2'>Talha Noman</Text>
          <View className='flex flex-row items-center mb-5'>
            <Text style={fontWeight500} className='text-lg'>4.5</Text>
            <Icon name="star" size={20} color="#e8b05c" />
          </View>
          {/* Booking Date */}
          <Text style={fontWeight400} className="text-gray-800 ">Select Booking Date: </Text>
          <View className='flex flex-row justify-between items-center gap-x-2 mb-3'>
            <View
              className="
                          form-control
                          block
                          py-2
                          px-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded 
                          flex-1 
                                                   "
            >
              <Text style={fontWeight400}>{date.toLocaleDateString()}</Text>
            </View>
            <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c]' onPress={showDatepicker}>
              <Icon name="calendar-outline" size={20} color="#ffffff" />
            </Pressable>
          </View>
          {/* Booking Time */}
          <Text style={fontWeight400} className="text-gray-800 ">Select Booking Time: </Text>
          <View className='flex flex-row justify-between items-center gap-x-2 mb-3'>
            <View
              className="
                          form-control
                          block
                          py-2
                          px-2
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded 
                          flex-1                        "
            >
              <Text style={fontWeight400}>{date.toLocaleTimeString()}</Text>
            </View>
            <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c]' onPress={showTimepicker}>
              <Icon name="time-outline" size={20} color="#ffffff" />
            </Pressable>
          </View>

          <Text style={fontWeight400} className="text-gray-800 ">Address</Text>
          <View className='flex flex-row gap-x-2'>
            <TextInput
              style={fontWeight400}
              value={currentLocation}
              onChangeText={setCurrentLocation}

              className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded 
                            flex-1
                           "
            />
            <Pressable style={shadow} className='py-2 px-2 rounded bg-[#e8b05c]' onPress={handleLocation}>
              <Icon name="location-outline" size={20} color="#ffffff" />
            </Pressable>
          </View>


          {/* Animal Count */}
          <View className='flex flex-row justify-between gap-x-2 mt-3'>
            {/* Section 1/3 */}
            <View className='w-[29%]'>
              <Text style={fontWeight400} className="text-gray-800 ">Goat(s)</Text>
              <TextInput
                style={fontWeight400}
                value={goats}
                onChangeText={setGoats}
                keyboardType='numeric'
                className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded 
                          flex-1
                           "
              />
            </View>
            {/* Section 2/3 */}
            <View className='w-[29%]'>
              <Text style={fontWeight400} className="text-gray-800 ">Cow(s)</Text>
              <TextInput
                style={fontWeight400}
                value={cows}
                onChangeText={setCows}
                keyboardType='numeric'
                className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded  
                            flex-1                           
                           "
              />
            </View>
            {/* Section 3/3 */}
            <View className='w-[29%]'>
              <Text style={fontWeight400} className="text-gray-800 ">Camel(s)</Text>
              <TextInput
                style={fontWeight400}
                value={camels}
                onChangeText={setCamels}
                keyboardType='numeric'
                className="
                            form-control
                            block
                            py-1.5
                            px-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded 
                            flex-1
                           "
              />
            </View>
          </View>
          {/* Divider */}
          <View className='h-[1px] bg-gray-300 w-full my-5' />

          {/* <Text style={fontWeight600} className='text-lg'>Charges: </Text> */}
          <View className='flex flex-row justify-between'>
            <View className='w-[34%]'><Text style={fontWeight500} className='text-center'>Animal Type </Text></View>
            <View className='w-[29%]'><Text style={fontWeight500} className='text-center'>Qty </Text></View>
            <View className='w-[34%]'><Text style={fontWeight500} className='text-center'>Qurbani Rate </Text></View>
          </View>
          <View className='flex flex-row justify-between'>
            <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Goat </Text></View>
            <View className='w-[29%]'><Text style={fontWeight500} className='text-xs text-center'>{goats} </Text></View>
            <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Rs. 3000 </Text></View>
          </View>
          <View className='flex flex-row justify-between'>
            <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Cow </Text></View>
            <View className='w-[29%]'><Text style={fontWeight500} className='text-xs text-center'>{cows} </Text></View>
            <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Rs. 7000 </Text></View>
          </View>
          <View className='flex flex-row justify-between'>
            <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Camel </Text></View>
            <View className='w-[29%]'><Text style={fontWeight500} className='text-xs text-center'>{camels} </Text></View>
            <View className='w-[34%]'><Text style={fontWeight500} className='text-xs text-center'>Rs. 14000 </Text></View>
          </View>
          <View className="border border-3 border-dashed my-2" />
          <View className='flex flex-row justify-between'>
            <Text style={fontWeight600} className='text-lg'>Total: </Text>
            <Text style={fontWeight600} className='text-lg'>Rs. {handleTotal()} </Text>
          </View>
          <Text style={fontWeight500} className='text-xs text-red-500'>{error}</Text>
          {
            isBooked === true ?
              <Pressable className='my-5 py-3 rounded bg-white border-[#00b22d] border'>
                <Text className='text-[#00b22d] text-center' style={fontWeight500}>Requested</Text>
              </Pressable>
              :
              <Pressable onPress={handleRequestService} className='my-5 py-3 rounded bg-[#e8b05c]'>
                <Text className='text-white text-center' style={fontWeight400}>Request Service</Text>
              </Pressable>
          }
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
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