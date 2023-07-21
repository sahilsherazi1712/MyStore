import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from '../components/top/Login';
import SignUp from '../components/top/SignUp';
import ThemeContext from '../components/common/ThemeContext';

const TopNavigator = () => {
    const Tab = createMaterialTopTabNavigator();
    const { theme } = useContext(ThemeContext)

    return (
        <Tab.Navigator initialRouteName='SignUp'
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'transparent',
                },
                tabBarAndroidRipple: { color: theme.backgroundColor, },
                tabBarIndicator: ({ }) => (<View></View>),
            }}>

            <Tab.Screen
                name='Login'
                component={Login}
                options={{
                    // tabBarShowLabel: false,
                    tabBarLabel: ({ focused }) => (
                        <View style={{ backgroundColor: focused && theme.btnColor, alignItems: 'center', justifyContent: 'center', paddingVertical: 7, paddingHorizontal: 50, borderRadius: 20, }}>
                            <Text style={{ color: focused ? theme.textColor : theme.GREY, fontSize: 16, fontFamily: 'Poppins', fontWeight: 'bold' }}>Login</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name='SignUp'
                component={SignUp}
                options={{
                    // tabBarShowLabel: false,
                    tabBarLabel: ({ focused }) => (
                        <View style={{ backgroundColor: focused && theme.btnColor, alignItems: 'center', justifyContent: 'center', paddingVertical: 7, paddingHorizontal: 50, borderRadius: 20, }}>
                            <Text style={{ color: focused ? theme.textColor : theme.GREY, fontSize: 16, fontFamily: 'Poppins', fontWeight: 'bold' }}>SignUp</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})
export default TopNavigator