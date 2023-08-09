import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import TopNavigator from '../../navigation/TopNavigator'
import ThemeContext from '../common/ThemeContext'
import { imgLogo } from '../../assets/images'

const AuthenticationScreen = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, width: '100%', alignSelf: 'center',backgroundColor: theme.backgroundColor }}>
      {/* <View style={{ alignItems: 'center' }}>
        <Text style={{ marginTop: 15, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 22, color: theme.textColor1 }}>Welcome to</Text>
        <Image source={imgLogo} style={{ width: 84, height: 84, marginTop: 10, }} />
      </View> */}

      <View style={{flex: 1, marginTop: 0, }}>
        <TopNavigator/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
export default AuthenticationScreen