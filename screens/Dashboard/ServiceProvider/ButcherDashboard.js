import { View, ScrollView, Pressable, TextInput, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import NavHeader from '../../../components/Customer/NavHeader'

import { fontWeight600, fontWeight400, fontWeight300, fontWeight500 } from '../../../assets/Styles/FontWeights';
import NavFooterSP from '../../../components/ServiceProvider/NavFooterSP';
import BookingCardRequest from '../../../components/ServiceProvider/BookingCardRequest';
import MyModalButcher from '../../../components/ServiceProvider/MyModalButcher';
import Toast from '../../../components/Toast';
// Firebase Imports
import { getDatabase, get, ref, query, equalTo, orderByKey, orderByChild } from 'firebase/database'
import { getAuth } from 'firebase/auth';
const tabStyle = 'text-xs text-[#e8b05c] p-1 border border-[#e8b05c] rounded-md active:scale-95';
const activeTabStyle = 'text-xs bg-[#e8b05c] text-[#FFFFFF] p-1 border border-[#e8b05c] rounded-md active:scale-95';
export default function ButcherDashboard({ navigation }) {
  const [allServices, setAllServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceExists, setServiceExists] = useState(false);

  const [filter, setFilter] = useState('All');
  const db = getDatabase();
  const auth = getAuth();

  const handleModalOpen = () => {
    setModalVisible(true);
  }
  const handleModalClose = () => {
    setModalVisible(false);
  }
  const handleServiceExists = async () => {
    const butcherServiceQuery = query(ref(db, 'OfferedServices'), orderByChild('service_provider_id'), equalTo(auth.currentUser.uid));
    try {
      const snapshot = await get(butcherServiceQuery);
      if (snapshot.exists()) {
        // this means that service already exists.
        console.log("Service Exists");
        setServiceExists(true);
      } else {
        // Return an empty array or handle the case where there are no animals
        console.log("Service Does Not Exist");
        setServiceExists(false);
      }
    } catch (error) {
      // Handle any errors here        
      setServiceExists(null)
    }
  }
  const fetchAllServices = async () => {
    try {
      const snapshot = await get(ref(db, '/ServiceRequests'));
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Map data to array
        const dataArray = await Promise.all(
          Object.keys(data).map(async (key) => {
            const service = data[key];
            const userId = service.user_id;

            // Fetch user data for the service
            const userSnapshot = await get(ref(db, `/Users/${userId}`));

            if (userSnapshot.exists()) {
              const userData = userSnapshot.val();
              return {
                id: key,
                service,
                user: userData
              };
            } else {
              // Handle the case where the user data doesn't exist
              console.error(`User data not found for service with ID ${key}`);
              return null;
            }
          })
        );

        // Filter out null entries (cases where user data was not found)
        const filteredDataArray = dataArray.filter((entry) => entry !== null);
        const butcherFilter = filteredDataArray.filter(({ user, service }) => {
          if (service?.service_type === 'Butcher' && service?.service_provider_id === auth.currentUser.uid) {
            return true;
          }
        })
        setAllServices(butcherFilter);
        console.clear();
        console.log('Data Array', butcherFilter);
      } else {
        console.log("No Data");
        setAllServices(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [toastDisplay, setToastDisplay] = useState(false)
  useEffect(() => {
    handleServiceExists();
    fetchAllServices();
  }, [serviceExists])

  return (
    <SafeAreaView>
      <View className='flex flex-col h-screen'>
        {/* Nav Header */}
        <NavHeader title={'Butchers Dashboard'} navigation={navigation} />
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
            serviceExists?
            allServices?.service?.length === 0?

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
              <>
              {/* If service exists and there are currently no bookings. */}
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

          {
            allServices?.map(({ service, user, id }) => {
              return (
                <BookingCardRequest key={id} status={service?.status} user={user} service={service} id={id} fetchAllServices={fetchAllServices} />
              )
            })
          }
        </ScrollView>

        <NavFooterSP navigation={navigation} serviceType='Butcher' />
      </View>
      {/* Footer */}
      <MyModalButcher modalVisible={modalVisible} setModalVisible={setModalVisible} setToastDisplay={setToastDisplay} />
      <Toast display={toastDisplay} message={'Your Service has been saved!'} />
    </SafeAreaView>
  )
}

const { shadow } = StyleSheet.create({
  shadow: {
    elevation: 1
  }
})