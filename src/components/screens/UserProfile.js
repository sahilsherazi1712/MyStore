import React, { useEffect, useContext, useState, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, PermissionsAndroid, Alert, Modal } from 'react-native'
import { imgAccount, imgAdd, imgCamera, imgEmail, imgFacebook, imgGallery, imgGoogle, imgHidePass, imgLocation, imgPassword, imgProfile, imgShowPass } from '../../assets/images';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RiteLoader from '../../utils/helpers/RiteLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_USER_LOGGED_IN, USER_ID } from '../../utils/Keys';
import ThemeContext from '../common/ThemeContext';
import { useIsFocused } from '@react-navigation/native';
import { Color } from '../../styles/Color';
import AnimatedLottieView from 'lottie-react-native';
import { gifForgetPassword, gifLogout, gifUpdateEmail } from '../../assets/gifs';

const UserProfile = ({ navigation, route }) => {
    const { userData } = route.params;
    const { theme } = useContext(ThemeContext);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showCPassword, setCShowPassword] = useState(true);
    const [countryCode, setCountryCode] = useState('92');
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [loaderMsg, setLoaderMsg] = useState('')
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [showForgetPassModal, setShowForgetPassModal] = useState(false)
    const [forgetEmail, setForgetEmail] = useState('')
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [filePath, setFilePath] = useState('');

    const rbSheetRef = useRef();
    const isFouced = useIsFocused()

    useEffect(() => {
        setAllData()
    }, [isFouced])

    const setAllData = () => {
        setFilePath(userData.image)
        setName(userData.name)
        setMobile(userData.mobile.slice(3, 13))
        setAddress(userData.address)
        setEmail(userData.email)
        // setPassword(userData.password)
    }

    pickImageFromGallery = () => {
        var options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeExtra: true,
        };
        launchImageLibrary(options, res => {
            console.log('galleryRes: ', res);
            if (res.didCancel) {
                console.log('User cancalled image picker.');
            } else if (res.error) {
                console.log("ImagePicker Error:", res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button', res.customButton);
                Alert.alert(res.customButton)
            } else {
                // setFilePath(res.assets[0].uri)
                cropImage(res.assets[0].uri)
            }
        })
        // ImagePicker.openCamera({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        // }).then(image => {
        //     console.log('resaa', image);
        // }).catch(error => {
        //     console.log('resae', error);
        // });
    }

    pickImageFromCamera = () => {
        var options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeExtra: true,
        }
        launchCamera(options, res => {
            console.log('cameraRes: ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error:', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button', res.customButton);
                Alert.alert(res.customButton)
            } else {
                // setFilePath(res.assets[0].uri)
                cropImage(res.assets[0].uri)
            }
        })
    }

    //install and use crop library without any androi side integration
    const cropImage = (uri) => {
        ImageCropPicker.openCropper({
            path: uri,
            // width: 300,
            // height: 300,
            cropperCircleOverlay: false,
        }).then(res => {
            console.log('croppedImgRes', res);
            setFilePath(res.path)
        }).catch(error => {
            console.log('CroppedImgError:', error);
        });
    }

    const updateInfo = () => {
        const mobileFormate = /^[0-9]{10}$/;
        const trimedName = name.trim();
        const trimedMobile = mobile.trim();
        const trimedAddress = address.trim();
        filePath === "" ? console.log("Please Select Your Image")
            : trimedName === "" ? console.log("Please Enter Your Name!")
                : trimedMobile === "" ? console.log("Please Enter Your Mobile No.!")
                    : trimedAddress === "" ? console.log("Please Enter Your Address!")
                        : saveInfo(filePath, trimedName, '+' + countryCode + trimedMobile, trimedAddress)
    }

    const saveInfo = async (image, name, mobile, address) => {
        setLoaderVisible(true)
        setLoaderMsg('Updating ...')
        console.log(image, name, mobile, address);
        try {
            const userId = await AsyncStorage.getItem(USER_ID);
            firestore()
                .collection('users')
                .doc(`${userId}`)
                .update({
                    image: image,
                    name: name,
                    mobile: mobile,
                    address: address,
                })
                .then(res => {
                    setLoaderVisible(false)
                    console.log('InfoUpdateRes', res);
                })
                .catch(error => {
                    setLoaderVisible(false)
                    console.log('InfoUpdateError:', error);
                });
        } catch (error) {
            console.log('ErrorInfoUpdate: ', error);
        }
    }

    const changeEmail = () => {
        let emailFormate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const trimedEmail = email.trim();
        trimedEmail === "" ? console.log("Please Enter Your Email Address!")
            : emailFormate.test(email) === false ? console.log("Entered Email is invalid!")
                : setShowPasswordModal(true);
    }

    const updateEmail = () => {
        const trimedEmail = email.trim();
        const trimedPassword = password.trim();
        console.log(trimedEmail);
        trimedPassword === "" ? console.log("Please Enter Your Password!")
            : saveEmail(trimedEmail, userData.email, trimedPassword)
    }

    const saveEmail = async (newEmail, email, password) => {
        setShowPasswordModal(false)
        console.log(newEmail, email, password);
        setLoaderVisible(true)
        setLoaderMsg('Updating Your Email ...')
        try {
            const userId = await AsyncStorage.getItem(USER_ID)
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(async (res) => {
                    setLoaderVisible(false)
                    console.log('userEmailRes: ', res);
                    res.user.updateEmail(newEmail); // same way to change the password
                    firestore()
                        .collection('users')
                        .doc(userId)
                        .update({
                            email: newEmail
                        })
                })
                .catch((error) => {
                    setLoaderVisible(false)
                    console.log('UpdatingEmailError: ', error);
                })
        } catch (error) {
            console.log('ErrorHandingEmailUpdate', error);
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.primaryColor, padding: 10, elevation: 5, paddingHorizontal: 20, }}>
            <View style={{ marginTop: 20, }}>
                <View style={{ alignItems: 'center' }}>
                    {filePath ?
                        <Image
                            source={{ uri: filePath }}
                            style={{ height: 84, width: 84, borderRadius: 100, borderWidth: 1.5, borderColor: 'black', }}
                        />
                        : <Image
                            source={imgProfile}
                            style={{ width: 84, height: 84, borderRadius: 37, tintColor: theme.textColor1 }}
                        />
                    }
                    <TouchableOpacity
                        style={{ start: 30, top: -28, width: 24, height: 24, backgroundColor: theme.btnColor, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {
                            // requestCameraPermission()
                            // console.log('Pressed');
                            // pickImage();
                            rbSheetRef.current.open();
                        }}
                    >
                        <Image source={imgAdd} style={{ width: 12, height: 12, tintColor: theme.textColor }} />
                    </TouchableOpacity>
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
                <CustomTextInput
                    label={'Full Name'}
                    style={{ backgroundColor: theme.backgroundColor }}
                    placeholder={'Full Name'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='words'
                    startIcon={imgAccount}
                    value={name}
                    onChangeText={(val) => setName(val)}
                />
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
                <CustomTextInput
                    label={'Permanent Address'}
                    style={{ backgroundColor: theme.backgroundColor, }}
                    placeholder={'Address'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='words'
                    multiline
                    startIcon={imgLocation}
                    value={address}
                    onChangeText={(val) => setAddress(val)}
                // touchable
                />
                <CustomButton
                    title={'Update Info'}
                    style={{ marginTop: 20, }}
                    onPress={() => { updateInfo() }}
                />
                <View style={{ marginTop: 50, }}>
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
                    <CustomButton
                        title={'Change Email'}
                        style={{ marginTop: 20, }}
                        onPress={() => { changeEmail() }}
                    />
                </View>
                {/* <CustomTextInput
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
                <CustomTextInput
                    label={'Confim Passowrd'}
                    style={{ backgroundColor: theme.backgroundColor, }}
                    placeholder={'Confirm Password'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='none'
                    startIcon={imgPassword}
                    endIcon={showCPassword ? imgShowPass : imgHidePass}
                    endIconPress={() => {
                        setCShowPassword(!showCPassword)
                    }}
                    value={cPassword}
                    secureTextEntry={showCPassword}
                    onChangeText={(val) => setCPassword(val)}
                /> */}

                <CustomButton
                    title={'Forget Password?'}
                    style={{ marginTop: 40, backgroundColor: theme.primaryColor }}
                    onPress={() => { setShowForgetPassModal(true) }}
                    textStyle={{ color: theme.textColor1 }}
                />

                <CustomButton
                    title={'Logout?'}
                    style={{ backgroundColor: theme.primaryColor }}
                    onPress={() => { setShowLogoutModal(true) }}
                    textStyle={{ color: Color.RED }}
                />
            </View>

            <RiteLoader setModalVisible={setLoaderVisible} modalVisible={loaderVisible} loaderMsg={loaderMsg} />
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showPasswordModal}
                    onRequestClose={() => {
                        setShowPasswordModal(!showPasswordModal);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { backgroundColor: theme.primaryColor, shadowColor: theme.textColor1, }]}>
                            <AnimatedLottieView
                                source={gifUpdateEmail}
                                autoPlay
                                loop
                                style={{ height: 120 }}
                                resizeMode='contain'
                            />
                            <Text style={{ color: theme.textColor1, fontWeight: '500', marginBottom: 5, textAlign: 'center', fontSize: 16, marginTop: 15 }}>To change your email address, password is required.</Text>
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
                                title={'Update Email'}
                                style={{ marginTop: 50, }}
                                onPress={() => { updateEmail() }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showForgetPassModal}
                    onRequestClose={() => {
                        setShowForgetPassModal(!showForgetPassModal);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { backgroundColor: theme.primaryColor, shadowColor: theme.textColor1, }]}>
                            <AnimatedLottieView
                                source={gifForgetPassword}
                                autoPlay
                                loop
                                style={{ height: 120 }}
                                resizeMode='contain'
                            />
                            <Text style={{ color: theme.textColor1, fontWeight: '500', marginBottom: 5, textAlign: 'center', fontSize: 16, marginTop: 15, }}>Do you forget your password?</Text>
                            <Text style={{ color: theme.textColor1, marginBottom: 5, textAlign: 'center', fontSize: 12, opacity: .7 }}>Don't worry! Just enter your login email address and we will send you an email to reset your password.</Text>
                            <CustomTextInput
                                label={'Email Address'}
                                style={{ backgroundColor: theme.backgroundColor, }}
                                placeholder={'Email'}
                                placeholderTextColor={theme.GREY}
                                autoCapitalize='none'
                                startIcon={imgEmail}
                                keyboardType='email-address'
                                value={forgetEmail}
                                onChangeText={(val) => setForgetEmail(val)}
                            />
                            <CustomButton
                                title={'Send Email'}
                                style={{ marginTop: 50, }}
                                onPress={() => {
                                    console.log(forgetEmail);
                                    setLoaderMsg('Sending you an email ...')
                                    setLoaderVisible(true);
                                    auth()
                                        .sendPasswordResetEmail(forgetEmail)
                                        .then((res) => {
                                            setLoaderVisible(false);
                                            setShowForgetPassModal(false);
                                            console.log('SendEmailRes: ', res);
                                            Alert.alert('Note', 'Please check your email.');
                                        })
                                        .catch((error)=> {
                                            console.log('SendEmailError: ', error);
                                        })
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showLogoutModal}
                    onRequestClose={() => {
                        setShowLogoutModal(!showLogoutModal);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { backgroundColor: theme.primaryColor, shadowColor: theme.textColor1, }]}>
                            <AnimatedLottieView
                                source={gifLogout}
                                autoPlay
                                loop
                                style={{ height: 150 }}
                                resizeMode='contain'
                            />
                            <Text style={{ color: theme.textColor1, fontWeight: '500', marginBottom: 5, textAlign: 'center', fontSize: 16, marginTop: 15, }}>Note!</Text>
                            <Text style={{ color: theme.textColor1, marginBottom: 5, textAlign: 'center', fontSize: 12, opacity: .7 }}>If you logout then you many features will be disable from you. Keeping this in mind, do you want to logout from MyStore? </Text>
                            <CustomButton
                                title={'Logout'}
                                style={{ marginTop: 30, }}
                                onPress={() => {
                                    console.log(forgetEmail);
                                    setLoaderMsg('logging out ...')
                                    setLoaderVisible(true);
                                    auth()
                                        .signOut()
                                        .then(async(res) => {
                                            setLoaderVisible(false);
                                            setShowLogoutModal(false);
                                            console.log('logoutRes', res);
                                            navigation.navigate('Account')
                                            await AsyncStorage.setItem(IS_USER_LOGGED_IN, '');
                                        })
                                        .catch((error)=>{
                                            console.log('LogoutError: ', error);
                                        })
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,140, 0.2)'
    },
    modalView: {
        margin: 10,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        marginLeft: 25,
        marginRight: 25,
    },
})
export default UserProfile