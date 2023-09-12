import { View, TextInput, Button, Text, KeyboardAvoidingView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useRef } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { fontWeight400 } from '../../../assets/Styles/FontWeights'

export default function BookingDetailsRider({ navigation }) {
  const mapRef = useRef()
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0, // Default latitude
    longitude: 0, // Default longitude
  });
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fare, setFare] = useState('');
  function cleanNullFromString(inputString) {
    // Use a regular expression to remove 'null' (case-insensitive)
    const cleanedString = inputString.replace(/null,/gi, '');

    return cleanedString;
  }
  const zoomToMarker = () => {
    mapRef.current.fitToCoordinates([{
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    }], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Adjust padding as needed
      animated: true, // Animated zoom
    });
  };
  const handleGetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // Extract latitude and longitude from the location object
    const { latitude, longitude } = location.coords;
    setCurrentLocation({
      latitude: latitude,
      longitude: longitude
    })
    // Use reverse geocoding to get city name
    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    let address = geocode[0];
    let address2 = `${address?.street}, ${address.streetNumber},${address.district},  ${address.city}, ${address.country}`
    console.log(address2)
    setFrom(cleanNullFromString(address2))
    zoomToMarker()
  }
  const handleRequestService = () => {
    // Implement your service request logic here
  };
  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'RIDER BOOKING DETAILS'} navigation={navigation} />
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            z
          >
            <Marker

              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="From Location"
            />
            {/* <Marker
              coordinate={{
                latitude: parseFloat(from.split(',')[0]),
                longitude: parseFloat(from.split(',')[1]),
              }}            
              title="from"
            /> */}
          </MapView>

          <View style={{ padding: 16 }}>
            {/* <Text>Current Location:</Text>
            <TextInput
              value={`${currentLocation.latitude}, ${currentLocation.longitude}`}
              placeholder="Enter Current Location"
              onChangeText={(text) => setCurrentLocation(text)}
            /> */}
            <Pressable onPress={handleGetCurrentLocation} className='my-5 py-3 rounded bg-[#e8b05c]' >
              <Text className='text-white text-center' style={fontWeight400}>Use Current Location</Text>
            </Pressable>            
            <KeyboardAvoidingView>
              <Text>From:</Text>
              <TextInput
              style={fontWeight400}
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
                 w-full
                 mb-1"
                value={from}
                placeholder="Enter from"
                onChangeText={(text) => setFrom(text)}
              />

              <Text>To:</Text>
              <TextInput
              style={fontWeight400}
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
                 w-full
                 mb-1"
                value={to}
                placeholder="Enter Destination"
                onChangeText={(text) => setTo(text)}
              />
              <Text>Fare:</Text>
              <TextInput
                style={fontWeight400}
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
                 w-full
                 mb-1"
                value={fare}
                placeholder="Enter Fare"
                keyboardType="numeric"
                onChangeText={(text) => setFare(text)}
              />
            </KeyboardAvoidingView>
            <Pressable className='my-5 py-3 rounded bg-[#e8b05c]' >
              <Text className='text-white text-center' style={fontWeight400}>Request Service</Text>
            </Pressable>

          </View>
        </View>
        <NavFooter navigation={navigation} />
      </View>
      {/* Footer */}
    </SafeAreaView>
  )
}