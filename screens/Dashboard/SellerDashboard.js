import { View, Text, ScrollView, StyleSheet, BackHandler, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import NavFooter from '../../components/Seller/NavFooter'
import { fontWeight400, fontWeight500, fontWeight600, fontWeight700 } from '../../assets/Styles/FontWeights'
import NavHeader from '../../components/Seller/NavHeader'

import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from "react-native";

// Firebase Imports
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth'

export default function SellerDashboard({ navigation }) {

  const backActionHandler = () => {
    Alert.alert("Alert!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "YES", onPress: () => BackHandler.exitApp()          
      }
    ]);
    return true;
  };


  const db = getDatabase();
  const auth = getAuth()

  const userId = auth.currentUser.uid
  const [userDetails, setUserDetails] = useState({})


  const getUserData = async () => {

    return onValue(ref(db, '/Users/' + userId), (snapshot) => {
      const user = snapshot.val() || 'Anonymous'
      console.log('User', user)
      let temp = user;
      let lastname = user.fullname.split(' ')
      temp.fullname = lastname[0];
      setUserDetails(temp)
    }, {
      onlyOnce: true
    })
  }

  useEffect(() => {
    if (!userId) {
      navigation.navigate('Welcome')
    }
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);
    getUserData()

    return () => {
      //clear remove 
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler)
    }
  }, [])

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'SELLER DASHBOARD'} />
        <ScrollView className='flex-grow px-4'>
          <View className='mt-5'>
            <Text className='text-[10px] inter text-[#2b2b2b]' style={fontWeight400}>WED, 23 MARCH </Text>
            <Text className='text-2xl inter text-[#e8b05c]' style={fontWeight600}>Greetings, {userDetails.fullname}</Text>
          </View>

          <View className='mt-10'>
            <View className='flex flex-row justify-between items-center mb-5'>
              <Text style={fontWeight500} className='text-base'>Analytics</Text>
              <Text className='text-[10px] inter text-[#2b2b2b]' style={fontWeight400}>SALES (Rs)</Text>
            </View>
            {/* Line Chart */}
            <View style={shadow} className='py-2 px-1 rounded-md bg-white'>
              <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                withInnerLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
              />
            </View>
            {/* Cards */}
            <View className='flex flex-col'>
              <View className='mt-5 flex flex-row justify-between'>
                <View style={shadow} className='w-[48%] rounded-md bg-white p-5'>
                  <Text style={fontWeight500} className='text-sm mb-1'>Total Listings</Text>
                  <Text style={fontWeight700} className='text-2xl text-[#e8b05c]'>23</Text>
                </View>
                <View style={shadow} className='w-[48%] rounded-md bg-white p-5'>
                  <Text style={fontWeight500} className='text-sm mb-1'>Shared Qurbani</Text>
                  <Text style={fontWeight700} className='text-2xl text-[#e8b05c]'>42</Text>
                </View>
              </View>
              <View className='mt-5 flex flex-row justify-between'>
                <View style={shadow} className='w-full rounded-md bg-white p-5'>
                  <Text style={fontWeight500} className='text-sm mb-1'>Total Sales</Text>
                  <Text style={fontWeight700} className='text-2xl text-[#e8b05c]'>23</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* Footer */}
        <NavFooter navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}

const { shadow } = StyleSheet.create({
  shadow: {
    elevation: 1
  }
})


const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [25000, 26000, 32000, 33000, 28000, 36000],
      color: (opacity = 1) => `rgba(232, 176, 92, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ]
};
const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(43, 43, 43, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional  
};
const screenWidth = Dimensions.get("window").width;