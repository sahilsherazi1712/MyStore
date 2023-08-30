import React, { useContext, useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, Alert, Linking, ScrollView } from 'react-native'
import ThemeContext from '../common/ThemeContext'
import { imgChat, imgChatting, imgContact, imgEmail, imgSubject, } from '../../assets/images';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from '../../utils/Keys';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import RiteLoader from '../../utils/helpers/RiteLoader';

const ContactUs = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [ratings, setRatings] = useState(2.5);
  const [uuid, setUuid] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false)
  const [loaderMsg, setLoaderMsg] = useState('Loading ...')

  const isFocued = useIsFocused();

  useEffect(() => {
    fetchUserData();
  }, [isFocued])

  const fetchUserData = async () => {
    const user = await AsyncStorage.getItem(USER_DATA);
    const data = JSON.parse(user);
    console.log('user---', data);
    setEmail(data.email)
    setUuid(data.id)
  }

  const sendMail = async () => {
    const supportEmail = 'glidegadgets1022@gmail.com';
    const trimedEmail = email.trim();
    const trimedSubject = subject.trim();
    const trimedMsg = message.trim();
    const rating = ratings;
    if (trimedSubject === '' || trimedMsg === '') {
      console.log('Input fields should not be empty.');
    } else {
      setLoaderMsg('Sending Your Reviews ...')
      setLoaderVisible(true)
      try {
        firestore()
        .collection('reviews')
        .add({
          id: uuid,
          email: trimedEmail,
          message: trimedMsg,
          ratings: rating,
        })
        .then(async (res) => {
          setLoaderVisible(false)
          console.log('UserSaveRes', res);
          const url = `mailto:${supportEmail}?subject=${trimedSubject}&body=${trimedMsg}`;
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            setSubject('')
            setMessage('')
            await Linking.openURL(url);
          }
        })
        .catch(error => {
          setLoaderVisible(false)
          console.log('userSaveError:', error);
        });
      } catch (error) {
        console.log('Error:', error);
      }
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View style={{ alignItems: 'center' }}>
        <Image source={imgContact} style={{ width: 120, height: 120, marginTop: 50, }} />
        <View style={{ width: '95%', backgroundColor: theme.primaryColor, padding: 20, borderRadius: 20, marginTop: 0 }}>
          <Text>Are you satisfied of your shopping from us, please share your thinking with us. We will appreciate your feedback.</Text>
          <View style={{ marginTop: 20 }}></View>
          {/* <CustomTextInput
            label={'Your Email'}
            style={{ backgroundColor: theme.backgroundColor, }}
            placeholder={'Email'}
            placeholderTextColor={theme.GREY}
            autoCapitalize='none'
            startIcon={imgEmail}
            keyboardType='email-address'
            value={email}
            onChangeText={(val) => setEmail(val)}
          /> */}
          <CustomTextInput
            label={'Subject'}
            style={{ backgroundColor: theme.backgroundColor, }}
            placeholder={'Subject'}
            placeholderTextColor={theme.GREY}
            autoCapitalize='words'
            startIcon={imgSubject}
            value={subject}
            onChangeText={(val) => setSubject(val)}
          />
          <CustomTextInput
            label={'Your Message'}
            style={{ backgroundColor: theme.backgroundColor, }}
            placeholder={'Message'}
            placeholderTextColor={theme.GREY}
            autoCapitalize='words'
            multiline
            startIcon={imgChat}
            value={message}
            onChangeText={(val) => setMessage(val)}
          // touchable
          />
          <View style={{ marginTop: 15 }}>
            <Rating
              type='star'
              showRating={false}
              ratingColor='#3498db'
              ratingBackgroundColor='#c8c7c8'
              startingValue={2.5}
              fractions={1}
              ratingCount={5}
              imageSize={30}
              // onStartRating={rating => console.log('Start Rating: ', rating)}
              // onSwipeRating={rating => console.log('Swipe Rating: ', rating)}
              onFinishRating={rating => {
                console.log('Finish Rating: ', rating)
                setRatings(rating)
              }}
              style={{ paddingVertical: 10, }}
            />
          </View>
          <CustomButton
            title={'Send Mail'}
            style={{ marginTop: 60, }}
            onPress={() => sendMail()}
          />
        </View>
      </View>
      <RiteLoader setModalVisible={setLoaderVisible} modalVisible={loaderVisible} loaderMsg={loaderMsg} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
export default ContactUs