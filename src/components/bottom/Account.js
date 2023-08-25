import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import CustomButton from '../common/CustomButton'
import { Color } from '../../styles/Color'
import { imgAvatar, imgDown, imgEdit, imgNext, imgProfile } from '../../assets/images'
import ThemeContext from '../common/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_USER_LOGGED_IN, USER_ID } from '../../utils/Keys';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native'

const Account = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openHelpCenter, setOpenHelpCenter] = useState(false);
  const [userProfile, setUserProfie] = useState('')
  const { theme } = useContext(ThemeContext);
  const isFocued = useIsFocused();

  useEffect(() => {
    checkUserLoginStatus()
    fetchUserDetails()
  }, [isFocued])

  const fetchUserDetails = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    if (userId !== '') {
      firestore()
        .collection('users')
        .doc(`${userId}`)
        .get()
        .then((res) => {
          console.log('userData', res._data);
          setUserProfie(res._data)
        })
    }
  }

  const checkUserLoginStatus = async () => {
    const isUser = await AsyncStorage.getItem(IS_USER_LOGGED_IN);
    if (isUser === 'true') {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  const showTour = () => {
    Alert.alert('Note', 'Do you want to start the tour how to place an order successfully.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('tourShown');
              navigation.navigate('Home');
            } catch (error) {
              console.log('ErrorTourShown', error);
            }
          }
        },
      ])
  }

  return (
    <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10, backgroundColor: theme.backgroundColor }}>
      {!isLoggedIn ?
        (<CustomButton
          style={{ width: 250, marginTop: 50, alignSelf: 'center', backgroundColor: theme.btnColor }}
          title={"Sign In / Register"}
          textStyle={{ color: theme.textColor }}
          onPress={() => { navigation.navigate('AuthenticationScreen') }}
        />
        ) : (
          <View style={{ width: "100%", alignItems: 'center', marginTop: 50, flexDirection: 'row', justifyContent: 'center', }}>
            <View style={{ width: "20%" }}>
              <Image source={userProfile ? { uri: userProfile.image } : imgProfile} style={{ width: 64, height: 64, borderRadius: 32, }} />
            </View>
            <View style={{ width: "65%", marginLeft: 10, }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins', color: theme.textColor1 }}>{userProfile ? userProfile.name : 'Your Name'}</Text>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins', color: theme.GREY }}>{userProfile ? userProfile.email : 'yourmail@gmail.com'}</Text>
            </View>
            <TouchableOpacity style={{width: "10%", padding: 10,}} onPress={()=> navigation.navigate('UserProfile', {'userData': userProfile})}>
              <Image source={imgEdit} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
          </View>
        )
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
          onPress={() => {
            setOpenHelpCenter(!openHelpCenter)
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 14, color: theme.GREY }}>Help Canter</Text>
            <Image source={openHelpCenter ? imgDown : imgNext} style={{ width: 18, height: 18, tintColor: theme.GREY }} />
          </View>
          {openHelpCenter &&
            <View style={{ padding: 10, backgroundColor: theme.backgroundColor, borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 10, }}>
              <Text style={{ color: theme.GREY, fontSize: 12 }} onPress={() => showTour()}>How to place Order?</Text>
            </View>}
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