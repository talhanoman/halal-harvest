import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import NavHeader from '../../../components/Customer/NavHeader'
import NavFooter from '../../../components/Customer/NavFooter'
import ServiceProviderCard from '../../../components/Customer/ServiceProviderCard'






export default function AllButchersScreen({ navigation }) {

    return (
        <SafeAreaView>
            <View className='flex flex-col h-screen'>
                {/* Nav Header */}
                <NavHeader title={'Butchers'} navigation={navigation} />
                <ScrollView className='flex-grow px-4'>
                    <View className='flex flex-row justify-between flex-wrap'>
                        <ServiceProviderCard  navigation={navigation} serviceProvider={'Butcher'} />
                        <ServiceProviderCard  navigation={navigation} serviceProvider={'Butcher'}/>
                        <ServiceProviderCard  navigation={navigation} serviceProvider={'Butcher'}/>
                        <ServiceProviderCard  navigation={navigation} serviceProvider={'Butcher'}/>
                    </View>


                </ScrollView>
                <NavFooter navigation={navigation} />
            </View>
            {/* Footer */}
        </SafeAreaView>
    )
}