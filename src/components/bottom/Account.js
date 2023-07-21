import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomButton from '../common/CustomButton'
import { Color } from '../../styles/Color'
import { imgAvatar, imgNext } from '../../assets/images'
import ThemeContext from '../common/ThemeContext'

const Account = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoggedIn();
  }, [])

  return (
    <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10, backgroundColor: theme.backgroundColor }}>
      {!isLoggedIn ?
        <CustomButton
          style={{ width: 250, marginTop: 50, alignSelf: 'center', backgroundColor: theme.btnColor }}
          title={"Sign In / Register"}
          textStyle={{color: theme.textColor}}
          onPress={() => { navigation.navigate('AuthenticationScreen')}}
        /> :
        <View style={{ width: "100%", alignItems: 'center', marginTop: 50, flexDirection: 'row', justifyContent: 'center', }}>
          <View style={{ width: "20%" }}>
            <Image source={imgAvatar} style={{ width: 64, height: 64, borderRadius: 32, }} />
          </View>
          <View style={{ width: "75%", marginLeft: 10, }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins', color: theme.textColor1 }}>John Peter</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins', color: theme.GREY }}>@johnpeter123</Text>
          </View>
        </View>
      }
      <View style={{ marginTop: 30, backgroundColor: theme.primaryColor, padding: 10, borderRadius: 10, }}>
        <Text style={{ padding: 7, fontSize: 16, fontWeight: '700', color: theme.textColor1 }}>Actions</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, }}
          onPress={() => { }}
        >
          <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: theme.GREY }}>Settings</Text>
          <Image source={imgNext} style={{ width: 18, height: 18, tintColor: theme.GREY }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, }}
          onPress={() => { }}
        >
          <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: theme.GREY }}>Help Canter</Text>
          <Image source={imgNext} style={{ width: 18, height: 18, tintColor: theme.GREY }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, }}
          onPress={() => { }}
        >
          <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: theme.GREY }}>FeedBack</Text>
          <Image source={imgNext} style={{ width: 18, height: 18, tintColor: theme.GREY }} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10, backgroundColor: theme.primaryColor, padding: 10, borderRadius: 10, }}>
        <Text style={{ padding: 7, fontSize: 16, fontWeight: '700', color: theme.textColor1 }}>Privacy</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, }}
          onPress={() => { }}
        >
          <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: theme.GREY }}>Privary Policy</Text>
          <Image source={imgNext} style={{ width: 18, height: 18, tintColor: theme.GREY }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, }}
          onPress={() => { }}
        >
          <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: theme.GREY }}>Delete Account</Text>
          <Image source={imgNext} style={{ width: 18, height: 18, tintColor: theme.GREY }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
export default Account;