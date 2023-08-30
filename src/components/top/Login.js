import React, { useContext, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ThemeContext from '../common/ThemeContext'
import CustomTextInput from '../common/CustomTextInput';
import { imgCall, imgEmail, imgFacebook, imgGoogle, imgHidePass, imgPassword, imgShowPass } from '../../assets/images';
import CustomButton from '../common/CustomButton';
import RiteLoader from '../../utils/helpers/RiteLoader';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EMAIL_PASS_LOGIN, IS_USER_LOGGED_IN, USER_DATA, USER_ID } from '../../utils/Keys';
import firebase from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [loaderMsg, setLoaderMsg] = useState('Loading ...')

    const validateInputs = () => {
        const trimedEmail = email.trim();
        const trimedPassword = password.trim();
        trimedEmail === "" ? console.log("Please Enter Your Email Address!")
            : trimedPassword === "" ? console.log("Please Enter Your Password!")
                : loginUser(trimedEmail, trimedPassword);
    }

    const loginUser = (email, password) => {
        setLoaderMsg('Logging In ...')
        setLoaderVisible(true)
        try {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(async (res) => {
                    setLoaderVisible(false)
                    const uuid = res.user.uid;
                    await AsyncStorage.setItem(IS_USER_LOGGED_IN, 'true')
                    await AsyncStorage.setItem(USER_ID, uuid)
                    firebase()
                        .collection('users')
                        .doc(uuid)
                        .get()
                        .then(async(res) => {
                            console.log('data: ',res._data);
                            await AsyncStorage.setItem(USER_DATA, JSON.stringify(res._data));
                        })
                        .catch((e) => {
                            console.log('Error:', e);
                        })
                    console.log('LoginInRes: ', res);
                    setEmail('')
                    setPassword('')
                    navigation.navigate('Account')
                })
                .catch((error) => {
                    setLoaderVisible(false)
                    console.log('LoginInError: ', error);
                })
        } catch (error) {
            console.log('SavingLoginInError: ', error);
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.primaryColor, margin: 10, borderRadius: 10, elevation: 5, paddingHorizontal: 20, }}>
            <View style={{ marginTop: 40, }}>
                <CustomTextInput
                    label={'Email Address'}
                    style={{ backgroundColor: theme.backgroundColor, }}
                    placeholder={'Email'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='none'
                    startIcon={imgEmail}
                    keyboardType='email-address'
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <CustomTextInput
                    label={'Password'}
                    style={{ backgroundColor: theme.backgroundColor, }}
                    placeholder={'Password'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='none'
                    startIcon={imgPassword}
                    endIcon={showPassword ? imgShowPass : imgHidePass}
                    endIconPress={() => {
                        setShowPassword(!showPassword)
                        console.log(showPassword);
                    }}
                    value={password}
                    secureTextEntry={showPassword}
                    onChangeText={(val) => setPassword(val)}
                />
                <CustomButton
                    title={'Login'}
                    style={{ marginTop: 40, }}
                    onPress={() => {
                        validateInputs();
                    }}
                />
            </View>

            <View style={{ marginTop: 50, marginBottom: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: .5, width: '45%', backgroundColor: theme.GREY }}><Text>aa</Text></View>
                    <Text style={{ marginLeft: 10, marginRight: 10, color: theme.textColor1 }}>OR</Text>
                    <View style={{ height: .5, width: '100%', backgroundColor: theme.GREY }}><Text>aa</Text></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Image source={imgFacebook} style={{ width: 44, height: 44, }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Image source={imgGoogle} style={{ width: 44, height: 44, marginLeft: 30, }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, }}>

                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}
                    >
                        <Text style={{ color: theme.GREY, fontFamily: 'Poppins' }}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SignUp')
                            }}>
                            <Text style={{ color: theme.btnColor, fontFamily: 'Poppins' }}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <RiteLoader modalVisible={loaderVisible} setModalVisible={setLoaderVisible} loaderMsg={loaderMsg} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default Login