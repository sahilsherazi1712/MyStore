import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SplashScreen from '../components/screens/SplashScreen';
import HomeScreen from '../components/screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import ProductDetail from '../components/screens/ProductDetail';
import ContactUs from '../components/drawer/ContactUs';
import About from '../components/drawer/About';
import AuthenticationScreen from '../components/screens/AuthenticationScreen';

const AppNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={SplashScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='ProductDetail' component={ProductDetail} />
                <Stack.Screen name='ContactUs' component={ContactUs} />
                <Stack.Screen name='About' component={About} />
                <Stack.Screen name='AuthenticationScreen' component={AuthenticationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
export default AppNavigator