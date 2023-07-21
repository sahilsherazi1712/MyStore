import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Menu from '../components/drawer/Menu'
import About from '../components/drawer/About'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Color } from '../styles/Color'
import { imgAbout, imgLogout, imgMenu, imgSetting } from '../assets/images'
import DrawerContent from './DrawerContent'

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
    return (
        // <Drawer.Navigator
        //     initialRouteName='Splash' 
        //     screenOptions={{
        //         drawerActiveTintColor: Color.BLUE, 
        //         // drawerInactiveTintColor: "#888",
        //         // itemStyle: { marginVertical: 5 },
        //         drawerStyle: {
        //             // backgroundColor: '#c6cbef', //Set Drawer background
        //             width: 250, //Set Drawer width
        //           },
        //           headerStyle: {
        //             backgroundColor: Color.BLUE, //Set Header color
        //           },
        //           headerTintColor: '#fff', //Set Header text color
        //           headerTitleStyle: {
        //             fontWeight: 'bold', //Set Header text style
        //           }
        //     }}>
        //     <Drawer.Screen name='Menu' component={Menu} 
        //         options={{ headerShown: true,drawerLabel: "Menu" ,drawerIcon: ({focused, color, size})=>(
        //             <Image source={imgMenu} style={[
        //                 { width: 16, height: 16 },
        //                 focused ? { tintColor: Color.BLUE } : { tintColor: "#888" },
        //             ]}/>
        //     ) }} />
        //     <Drawer.Screen name='About' component={About} options={{ headerShown: false, drawerIcon: ({focused})=>(
        //         <Image source={imgAbout} style={{width:16, height:16, tintColor: focused? Color.BLUE: "#888"}}/>
        //     ) }} />
        // </Drawer.Navigator>
        <Drawer.Navigator 
            drawerContent={props => <DrawerContent {... props}/> } 
            screenOptions={{
                headerShown: false,
            }}>
            <Drawer.Screen 
                name='Menu'
                component={Menu}
                // options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
                />
        </Drawer.Navigator>
    )
}

function LogoTitle(){
    return (
        <Image
          style={{ width: 50, height: 50 }}
          source={imgLogout}
        />
      );
}

const styles = StyleSheet.create({})
export default DrawerNavigator