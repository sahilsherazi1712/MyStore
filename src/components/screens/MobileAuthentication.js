import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, PermissionsAndroid, Alert, Button, TextInput, Modal } from 'react-native'
import ThemeContext from '../common/ThemeContext'
import CustomTextInput from '../common/CustomTextInput';
import { imgAccount, imgAdd, imgCall, imgCamera, imgEmail, imgFacebook, imgGallery, imgGoogle, imgHidePass, imgLocation, imgPassword, imgProfile, imgShowPass } from '../../assets/images';
import CustomButton from '../common/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RiteLoader from '../../utils/helpers/RiteLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_USER_LOGGED_IN, MOBILE_AUTH_ID, MOBILE_AUTH_LOGIN, } from '../../utils/Keys';
import AnimatedLottieView from 'lottie-react-native';
import { gifMobileAuth } from '../../assets/gifs';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const MobileAuthentication = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [mobile, setMobile] = useState('');
    const [countryCode, setCountryCode] = useState('92');
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [loaderMsg, setLoaderMsg] = useState('Loading ...');
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    const rbSheetRef = useRef();

    //////////////////////// Mobile No Authentication Start ////////////////////////
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    // verification code (OTP - One-Time-Passcode)

    // Handle login
    // const onAuthStateChanged = (user) => {
    //     if (user) {
    //         // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
    //         // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
    //         // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
    //         // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    //     }
    // }

    // useEffect(() => {
    //     // rbSheetRef.current.open()
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

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
            if (confirmation !== "") {
                rbSheetRef.current.open()
                setLoaderVisible(false)
            }
        } catch (error) {
            setLoaderVisible(false)
            console.log('signInWithPhoneNumberError', error);
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
    console.log(mobile);
    console.log('value',value);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.primaryColor, elevation: 5, paddingHorizontal: 20, }}>
            <View style={{ marginTop: 50, }}>
                <RBSheet
                    ref={rbSheetRef}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={310}
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
                    <View style={{ paddingLeft: 25, paddingRight: 25, backgroundColor: theme.primaryColor, shadowColor: theme.textColor1, margin: 10, }}>
                        <Text style={{ color: theme.textColor1, fontWeight: '500', marginBottom: 5, textAlign: 'center', fontSize: 18, marginTop: 15, }}>OTP</Text>
                        <Text style={{ color: theme.textColor1, marginBottom: 5, textAlign: 'center', fontSize: 14, opacity: .7 }}>Provide the otp, you just received to complete your registration.</Text>
                        <CodeField
                            ref={ref}
                            {...props}
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={value}
                            // caretHidden={false}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={{ marginTop: 20 }}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        lineHeight: 38,
                                        fontSize: 24,
                                        borderWidth: 2,
                                        borderColor: isFocused ? theme.btnColor : theme.GREY,
                                        textAlign: 'center',
                                    }}
                                    // style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                        <CustomButton
                            title={'Continue'}
                            style={{ marginTop: 30, }}
                            onPress={async () => {
                                setLoaderMsg('Storing Data ...')
                                setLoaderVisible(true);
                                try {
                                    setLoaderVisible(false)
                                    const msg = await confirm.confirm(value);
                                    console.log('success',msg);
                                    rbSheetRef.current.close()
                                } catch (error) {
                                    console.log('Invalid code.', error);
                                }
                            }}
                        />
                    </View>
                </RBSheet>

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

const styles = StyleSheet.create({
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
})