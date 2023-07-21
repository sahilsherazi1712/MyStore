import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ThemeContext from '../common/ThemeContext'

const Login = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <ScrollView style={{flex: 1, backgroundColor: theme.primaryColor, margin: 10, borderRadius: 10, elevation: 5, padding: 10,}}>
            <Text>Login</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default Login