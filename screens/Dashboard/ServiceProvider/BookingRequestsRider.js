import { View, ScrollView, Pressable, TextInput, Image, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import NavHeader from '../../../components/Customer/NavHeader'

import NavFooterSP from '../../../components/ServiceProvider/NavFooterSP';
import BookingCardRequest from '../../../components/ServiceProvider/BookingCardRequest';

export default function BookingRequestsRider({ navigation }) {

    return (
        <>
            <BookingCardRequest status={'Approved'} />
            <BookingCardRequest status={'Pending'} />
            <BookingCardRequest status={'Served'} />
        </>
    )
}