import { Text, StyleSheet } from 'react-native'
import React from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font'

SplashScreen.preventAutoHideAsync();

const Welcome = () => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/fonts/Montserrat.ttf'),
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
                <Text style={styles.fontStyle}>Welcome</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    fontStyle : {
        fontFamily : 'Montserrat'
    }
})
export default Welcome
