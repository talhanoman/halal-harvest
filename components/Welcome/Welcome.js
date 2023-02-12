import { Text, StyleSheet } from 'react-native'
import React from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font'

SplashScreen.preventAutoHideAsync();

const Welcome = () => {
    const [fontsLoaded] = useFonts({
        'Montserrat-900': require('../../assets/fonts/Montserrat-Black.ttf'),
        'Montserrat-800': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat-700': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-600': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-500': require('../../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-400': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-300': require('../../assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-200': require('../../assets/fonts/Montserrat-ExtraLight.ttf'),
        'Montserrat-100': require('../../assets/fonts/Montserrat-Thin.ttf')
    });
    // Keep the splash screen visible while we fetch resources
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
    return (
        <SafeAreaProvider>
            <SafeAreaView onLayout={onLayoutRootView}>
                <Text style={styles.fontStyle900} className='text-red-400 text-xl text-center'>Welcome</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    fontStyle100 : {
        fontFamily : 'Montserrat-100'
    },
    fontStyle200 : {
        fontFamily : 'Montserrat-200'
    },
    fontStyle300 : {
        fontFamily : 'Montserrat-300'
    },
    fontStyle400 : {
        fontFamily : 'Montserrat-400'
    },
    fontStyle500 : {
        fontFamily : 'Montserrat-500'        
    },
    fontStyle600 : {
        fontFamily : 'Montserrat-600'
    },
    fontStyle700 : {
        fontFamily : 'Montserrat-700'
    }, 
    fontStyle800 : {
        fontFamily : 'Montserrat-800'
    },
    fontStyle900 : {
        fontFamily : 'Montserrat-900'
    }    
})
export default Welcome
