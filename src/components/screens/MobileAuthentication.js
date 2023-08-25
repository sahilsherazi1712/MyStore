import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, PermissionsAndroid, Alert, Button, TextInput } from 'react-native'
import ThemeContext from '../common/ThemeContext'
import CustomTextInput from '../common/CustomTextInput';
import { imgAccount, imgAdd, imgCall, imgCamera, imgEmail, imgFacebook, imgGallery, imgGoogle, imgHidePass, imgLocation, imgPassword, imgProfile, imgShowPass } from '../../assets/images';
import CustomButton from '../common/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RiteLoader from '../../utils/helpers/RiteLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_USER_LOGGED_IN, MOBILE_AUTH_ID, MOBILE_AUTH_LOGIN, USER_ID } from '../../utils/Keys';
import AnimatedLottieView from 'lottie-react-native';
import { gifMobileAuth } from '../../assets/gifs';

const MobileAuthentication = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [mobile, setMobile] = useState('1234567890');
    const [countryCode, setCountryCode] = useState('92');
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [loaderMsg, setLoaderMsg] = useState('Loading ...')

    const rbSheetRef = useRef();

    //////////////////////// Mobile No Authentication Start ////////////////////////
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    // Handle login
    const onAuthStateChanged = (user) => {
        if (user) {
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    const signUpWithPhoneNumber = () => {
        const mobileFormate = /^[0-9]{10}$/;
        const trimedMobile = mobile.trim();
        trimedMobile === "" ? console.log("Please Enter Your Mobile No.!")
            : signUp('+' + countryCode + trimedMobile);
    }

    const signUp = async (mobile) => {
        setLoaderVisible(true)
        setLoaderMsg('Signing Up ...')
        console.log(mobile,);
        const id = Date.now();
        console.log('timeStamp: ', id);
        try {
            await AsyncStorage.setItem(MOBILE_AUTH_ID, id.toString());
            const confirmation = await auth().signInWithPhoneNumber(mobile);
            setConfirm(confirmation);
            console.log('bbb', confirmation);
            if (confirm !== '') {
                firestore()
                    .collection('users')
                    .doc(`${id}`)
                    .set({
                        mobile: mobile,
                    })
                    .then((res) => {
                        setLoaderVisible(false)
                        console.log('UserSaveRes', res);
                        setMobile('')
                        navigation.navigate('Account')
                    })
                    .catch((error) => {
                        setLoaderVisible(false)
                        console.log('userSaveError:', error);
                    });
            }
        } catch (error) {
            setLoaderVisible(false)
            console.log('signInWithPhoneNumberError', error);
        }
    }
    const confirmCode = async () => {
        try {
            await confirm.confirm(code);
            console.log('success');
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    // if (!confirm) {
    //     return (
    //         <Button
    //             title="Phone Number Sign In"
    //             onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
    //             // onPress={() => signInWithPhoneNumber('+923472980272')}
    //         />
    //     );
    // }
    //////////////////////// Mobile No Authentication End   ////////////////////////

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.primaryColor, elevation: 5, paddingHorizontal: 20, }}>
            <View style={{ marginTop: 50, }}>
                <View style={{ alignItems: 'center' }}>

                    <RBSheet
                        ref={rbSheetRef}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        height={160}
                        customStyles={{
                            wrapper: {
                                //   backgroundColor: "transparent"
                            },
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                // alignItems: 'center',
                                // justifyContent: 'center',
                            },
                            draggableIcon: {
                                backgroundColor: theme.GREY
                            }
                        }}
                    >
                        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ fontSize: 17, color: theme.textColor1, fontWeight: 'bold' }}>Pick Image from: </Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15, justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => {
                                    rbSheetRef.current.close()
                                    pickImageFromGallery()
                                }}>
                                    <Image source={imgGallery} style={{ width: 44, height: 44, tintColor: theme.btnColor }} />
                                    <Text style={{ marginTop: 5, color: theme.btnColor, fontWeight: '500' }}>Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 80, }} onPress={() => {
                                    rbSheetRef.current.close()
                                    pickImageFromCamera()
                                }}>
                                    <Image source={imgCamera} style={{ width: 44, height: 44, tintColor: theme.btnColor }} />
                                    <Text style={{ marginTop: 5, color: theme.btnColor, fontWeight: '500' }}>Camera</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </RBSheet>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <AnimatedLottieView
                        source={gifMobileAuth}
                        loop
                        autoPlay
                        style={{ height: 200 }}
                        resizeMode='contain'
                    />
                </View>
                <CustomTextInput
                    label={'Mobile'}
                    style={{ backgroundColor: theme.backgroundColor }}
                    placeholder={'Mobile'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='none'
                    // startIcon={imgMobile}
                    keyboardType='number-pad'
                    setCountryCode={setCountryCode}
                    value={mobile}
                    onChangeText={(val) => setMobile(val)}
                />

                <CustomButton
                    title={'Sign Up'}
                    style={{ marginTop: 20, width: 150, alignSelf: 'center', }}
                    onPress={() => signUpWithPhoneNumber()}
                />
            </View>

            <View style={{ marginTop: 80, marginBottom: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: .5, width: '45%', backgroundColor: theme.GREY }}><Text>aa</Text></View>
                    <Text style={{ marginLeft: 10, marginRight: 10, color: theme.textColor1 }}>OR</Text>
                    <View style={{ height: .5, width: '45%', backgroundColor: theme.GREY }}><Text>aa</Text></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Image source={imgFacebook} style={{ width: 44, height: 44, }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Image source={imgGoogle} style={{ width: 44, height: 44, marginLeft: 30, }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, }}>

                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}
                    >
                        <Text style={{ color: theme.GREY, fontFamily: 'Poppins' }}>Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: theme.btnColor, fontFamily: 'Poppins' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <RiteLoader setModalVisible={setLoaderVisible} modalVisible={loaderVisible} loaderMsg={loaderMsg} />
        </ScrollView>
    )
}

export default MobileAuthentication

const styles = StyleSheet.create({})