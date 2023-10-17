import { View, ScrollView, Pressable, TextInput, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavHeader from '../../../components/Seller/NavHeader'
import BookingCardRequest from '../../../components/ServiceProvider/BookingCardRequest'
import { fontWeight400, fontWeight500, fontWeight600 } from '../../../assets/Styles/FontWeights';
import NavFooterSP from '../../../components/ServiceProvider/NavFooterSP';
// Firebase Imports
import { getDatabase, get, ref, query, equalTo, orderByChild } from 'firebase/database'
import { getAuth } from 'firebase/auth';
import MyModalSH from '../../../components/ServiceProvider/MyModalSH';

const tabStyle = 'text-xs text-[#e8b05c] p-1 border border-[#e8b05c] rounded-md active:scale-95';
const activeTabStyle = 'text-xs bg-[#e8b05c] text-[#FFFFFF] p-1 border border-[#e8b05c] rounded-md active:scale-95';
export default function SlaughterHouseDashboard({ navigation }) {
  const db = getDatabase()
  const auth = getAuth()
  const [filter, setFilter] = useState('All');
  const [allServices, setAllServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceExists, setServiceExists] = useState(false);

  const handleServiceExists = async () => {
    const riderServiceQuery = query(ref(db, 'OfferedServices'), orderByChild('service_provider_id'), equalTo(auth.currentUser.uid));
    try {
      const snapshot = await get(riderServiceQuery);
      if (snapshot.exists()) {
        console.log("Service Exists");
        setServiceExists(true);
      } else {
        console.log("Service Does Not Exist");
        setServiceExists(false);
      }
    } catch (error) {
      console.error('Error checking service existence:', error);
      setServiceExists(null);
    }
  };

  const fetchAllServices = async () => {
    try {
      const snapshot = await get(ref(db, 'ServiceRequests'));
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Map data to array
        const dataArray = await Promise.all(
          Object.keys(data).map(async (key) => {
            const serviceRequest = data[key];

            // Fetch user data for the service request
            const userSnapshot = await get(ref(db, `/Users/${serviceRequest.user_id}`));

            if (userSnapshot.exists()) {
              const userData = userSnapshot.val();
              return {
                id: key,
                service: serviceRequest,
                user: userData,
              };
            } else {
              console.error(`User data not found for service request with ID ${key}`);
              return null;
            }
          })
        );

        // Filter out null entries (cases where user data was not found)
        const filteredDataArray = dataArray.filter((entry) => entry !== null);

        setAllServices(filteredDataArray);
        console.log('Data Array', filteredDataArray);
      } else {
        console.log('No Data');
        setAllServices(null);
      }
    } catch (error) {
      console.error('Error fetching service requests:', error);
    }
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  }

  const [toastDisplay, setToastDisplay] = useState(false)
  useEffect(() => {
    handleServiceExists();
    fetchAllServices();
  }, [])

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'Slaughter House Dashboard'} navigation={navigation} />
        <ScrollView className='flex-grow px-4'>
          <View className={`flex flex-row items-center border border-gray-300 rounded-md px-4 bg-white my-5`}>
            <Icon name="search" size={20} color="#aaa" className={`mr-4`} />
            <TextInput
              className={`flex-1 h-10 text-black `}
              placeholder="Search..."
              placeholderTextColor="#aaa"
            />
          </View>
          <View className='flex flex-row justify-between bg-white p-2 my-4 rounded-md' style={shadow}>
            <Pressable onPress={() => setFilter('All')}>
              <Text className={filter === 'All' ? activeTabStyle : tabStyle} style={fontWeight600}>All</Text>
            </Pressable>
            <Pressable onPress={() => setFilter('Pending')}>
              <Text className={filter === 'Pending' ? activeTabStyle : tabStyle} style={fontWeight600}>Pending</Text>
            </Pressable>
            <Pressable onPress={() => setFilter('Served')}>
              <Text className={filter === 'Served' ? activeTabStyle : tabStyle} style={fontWeight600}>Served</Text>
            </Pressable>
            <Pressable onPress={() => setFilter('Rejected')}>
              <Text className={filter === 'Rejected' ? activeTabStyle : tabStyle} style={fontWeight600}>Rejected</Text>
            </Pressable>
          </View>
          <View className='flex flex-row justify-between items-center'>
            <Text className='text-lg' style={fontWeight600}>Bookings: </Text>
            {
              !serviceExists &&
              <Pressable onPress={handleModalOpen} className='my-5 p-3 rounded bg-[#e8b05c] flex flex-row'>
                <Icon name="add-circle-outline" size={20} color="#ffffff" className={`mr-4`} />
                <Text className='text-white text-center' style={fontWeight400}>
                  New Service
                </Text>
              </Pressable>
            }
          </View>
          {
            serviceExists ?
              <>
                <View className='p-4 flex flex-col items-center justify-center'>
                  <Image
                    source={require('../../../assets/WaitingIllustration-removebg-preview.png')}
                    className='w-full bg-contain h-52 p-2 object-contain'
                  />
                  <Text style={fontWeight500} className='text-lg text-center'>Waiting for bookings.</Text>
                </View>
              </>
              :
              <View className='p-4 flex flex-col items-center justify-center'>
                <Image
                  source={require('../../../assets/get-started.webp')}
                  className='w-full bg-contain p-2 object-contain h-[300px]'
                />
                <Text style={fontWeight500} className='text-lg text-center'>Please add a service to get started.</Text>
              </View>
          }
          {/* <BookingCardRequest status={'Approved'} />
          <BookingCardRequest status={'Pending'} />
          <BookingCardRequest status={'Served'} /> */}
        </ScrollView>
        <NavFooterSP navigation={navigation} serviceType={'Slaughter House'} />
      </View>
      {/* Footer */}
      <MyModalSH modalVisible={modalVisible} setModalVisible={setModalVisible} setToastDisplay={setToastDisplay} fetchAllServices={fetchAllServices} />
    </SafeAreaView>
  )
}

const { shadow } = StyleSheet.create({
  shadow: {
    elevation: 1
  }
})