import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Home from '../components/bottom/Home'
import Cart from '../components/bottom/Cart'
import Account from '../components/bottom/Account'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Color } from '../styles/Color'
import { imgAccount, imgCart, imgChat, imgHeart, imgHome } from '../assets/images'
import Chat from '../components/bottom/Chat'
import Favourite from '../components/bottom/Favourite'
import ThemeContext from '../components/common/ThemeContext'
const BottomNavigator = () => {
    const {theme} = useContext(ThemeContext);

    const Tab = createBottomTabNavigator()    
    return (
        <Tab.Navigator
         screenOptions={{
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle:{
                position: 'absolute',
                bottom: 5,
                left: 15,
                right: 15,
                elevation: 0,
                backgroundColor: theme.primaryColor,
                borderRadius: 15,
                height: 70,
                ...styles.shadow,
            }
         }}>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center',}}>
                            <Image 
                                source={imgHome}
                                style={{width: 25, height:25, tintColor:focused ? theme.categorybgColor : theme.GREY}}
                            />
                            <Text style={{fontSize: 10, color: focused? theme.categorybgColor : theme.GREY}}>HOME</Text>
                        </View>
                    )
                }}
                />
            <Tab.Screen 
                name="Favourite" 
                component={Favourite} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center',}}>
                            <Image 
                                source={imgHeart}
                                style={{width: 25, height:25, tintColor:focused ? theme.categorybgColor : theme.GREY}}
                            />
                            <Text style={{fontSize: 10, color: focused? theme.categorybgColor : theme.GREY}}>Favourite</Text>
                        </View>
                    )
                }}
                />
            <Tab.Screen 
                name="Cart" 
                component={Cart} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{
                            top: -25, 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            ...styles.shadow,
                            width:60,
                            height: 60,
                            borderRadius: 35,
                            backgroundColor: theme.headerBgColor,
                        }}>
                            <Image 
                                source={imgCart}
                                style={{width: 25, height:25, tintColor: Color.WHITE,}}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Account" 
                component={Account} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center',}}>
                            <Image 
                                source={imgAccount}
                                style={{width: 25, height:25, tintColor:focused ? theme.categorybgColor : theme.GREY}}
                            />
                            <Text style={{fontSize: 10, color: focused? theme.categorybgColor : theme.GREY}}>Account</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Chat" 
                component={Chat} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center',}}>
                            <Image 
                                source={imgChat}
                                style={{width: 25, height:25, tintColor:focused ? theme.categorybgColor : theme.GREY}}
                            />
                            <Text style={{fontSize: 10, color: focused? theme.categorybgColor : theme.GREY}}>Chat</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {width:0, height:10,},
        shadowOpacity: .25,
        shadowRadius: 3.5,
        elevation: 5,
    },
})
export default BottomNavigator