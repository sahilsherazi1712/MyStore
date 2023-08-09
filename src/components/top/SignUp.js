import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Platform, PermissionsAndroid, ActivityIndicator, Alert } from 'react-native'
import ThemeContext from '../common/ThemeContext'
import CustomTextInput from '../common/CustomTextInput';
import { imgAccount, imgAdd, imgAvatar, imgCamera, imgDelete, imgEmail, imgFacebook, imgGallery, imgGoogle, imgHidePass, imgLocation, imgMobile, imgPassword, imgProfile, imgShowPass } from '../../assets/images';
import CustomButton from '../common/CustomButton';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { statusCodes, GoogleSignin } from '@react-native-google-signin/google-signin';

const SignUp = () => {
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
    console.log('myCallingCode', countryCode);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [locationStatus, setLocationStatus] = useState('');

    const [filePath, setFilePath] = useState('');

    const rbSheetRef = useRef();

    useEffect(() => {
        requestLocationPermission();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: "77527106159-ue2l2srsl9jjc0gjd4ft81mq7rasbn5k.apps.googleusercontent.com",
        });
    },[])

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

    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    getOneTimeLocation();
                    subscribeLocation();
                } else {
                    setLocationStatus('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition( // is a one-time method that fetches the user's current location only once when it is called.
            (info) => {
                setLocationStatus('You are Here');

                const currentLongitude = JSON.stringify(info.coords.longitude);
                const currentLatitude = JSON.stringify(info.coords.latitude);

                console.log(info);

                setCurrentLongitude(currentLongitude);
                setCurrentLatitude(currentLatitude);

                console.log("myLong: ", info.coords.longitude);
                console.log("lat: ", info.coords.latitude);
                reverseLocation(info.coords.latitude, info.coords.longitude)
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false, // Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.
                timeout: 30000, // Is a positive value, length of time (in milliseconds) the device is allowed to take in order to return a position
                maximumAge: 1000 //  Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return
            },
        );
    }

    const subscribeLocation = () => {
        watchID = Geolocation.watchPosition( //is a continuous method that continuously monitors the user's location and provides updates whenever the location changes.
            (position) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                console.log(position);

                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);

                setCurrentLongitude(currentLongitude);
                setCurrentLatitude(currentLatitude);
                reverseLocation(position.coords.latitude, position.coords.longitude)
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };

    const reverseLocation = async (latitude, longitude) => {
        const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyC3dIdjxKf1lG1bbVJU9BXK6pwfJD-chUg";
        // AIzaSyC3dIdjxKf1lG1bbVJU9BXK6pwfJD-chUg
        Geocoder.init(YOUR_GOOGLE_MAPS_API_KEY);
        Geocoder.from(latitude, longitude)
            .then((response) => {
                const addressComponents = response.results[0].address_components;
                // Extract required location information
                // const country = getAddressComponent(addressComponents, 'country');
                // const state = getAddressComponent(addressComponents, 'administrative_area_level_1');
                // const city = getAddressComponent(addressComponents, 'locality');
                // const postalCode = getAddressComponent(addressComponents, 'postal_code');

                // setLocationInfo({
                //     country,
                //     state,
                //     city,
                //     postalCode,
                // });
                console.log("addressComponents", addressComponents);
            })
            .catch((error) => {
                console.log('Error reverse geocoding:', error);
            });
    }

    const validateInputs = () => {
        const mobileFormate = /^[0-9]{10}$/;
        let emailFormate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const trimedName = name.trim();
        const trimedMobile = mobile.trim();
        const trimedAddress = address.trim();
        const trimedEmail = email.trim();
        const trimedPassword = password.trim();
        const trimedCPassword = cPassword.trim();

        trimedName === "" ? console.log("Please Enter Your Name!")
            : trimedMobile === "" ? console.log("Please Enter Your Mobile No.!")
                : trimedAddress === "" ? console.log("Please Enter Your Address!")
                    : trimedEmail === "" ? console.log("Please Enter Your Email Address!")
                        : emailFormate.test(email) === false ? console.log("Entered Email is invalid!")
                            : trimedPassword === "" ? console.log("Please Enter Your Password!")
                                : trimedPassword.length < 6 ? console.log("Password must be at least 6 characters long!")
                                    : trimedCPassword === "" ? console.log("Please Enter Your Confirm Password!")
                                        : trimedCPassword !== trimedPassword ? console.log("Passwords do not match.")
                                            : console.log("validated");
    }

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            // await GoogleSignin.signOut();
            const userInfo = await GoogleSignin.signIn();
            // const { idToken } = await GoogleSignin.signIn();
            // await GoogleSignin.revokeAccess();
            console.log('userInfo', userInfo, idToken);
            // create a new firebase credential with the token
            // const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            // login with credential
            // const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        } catch (error) {
            // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            //     console.log('User Cancelled the login flow.');
            // } else if (error.code === statusCodes.IN_PROGRESS) {
            //     console.log('Sign in is already in progress.');
            // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            //     console.log('Play services are note available or outdated.');
            // } else {
                console.log('googleLoginError: ', error);
            // }
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.primaryColor, margin: 10, borderRadius: 10, elevation: 5, paddingHorizontal: 20, }}>
            <View style={{ marginTop: 20, }}>
                <View style={{ alignItems: 'center' }}>
                    {filePath ?
                        <Image
                            source={{ uri: filePath }}
                            style={{ height: 74, width: 74, borderRadius: 100, borderWidth: 1.5, borderColor: 'black', }}
                        />
                        : <Image
                            source={imgProfile}
                            style={{ width: 74, height: 74, borderRadius: 37, tintColor: theme.textColor1 }}
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
                <CustomTextInput
                    label={'Confim Passowrd'}
                    style={{ backgroundColor: theme.backgroundColor, }}
                    placeholder={'Confirm Password'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='none'
                    startIcon={imgDelete}
                    endIcon={showCPassword ? imgShowPass : imgHidePass}
                    endIconPress={() => {
                        setCShowPassword(!showCPassword)
                    }}
                    value={cPassword}
                    secureTextEntry={showPassword}
                    onChangeText={(val) => setCPassword(val)}
                />

                <CustomButton
                    title={'Sign Up'}
                    style={{ marginTop: 40, }}
                    onPress={() => validateInputs()}
                />
            </View>

            <View style={{ marginTop: 50, marginBottom: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: .5, width: '45%', backgroundColor: theme.GREY }}><Text>aa</Text></View>
                    <Text style={{ marginLeft: 10, marginRight: 10, color: theme.textColor1 }}>OR</Text>
                    <View style={{ height: .5, width: '100%', backgroundColor: theme.GREY }}><Text>aa</Text></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Image source={imgFacebook} style={{ width: 54, height: 54, }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => signInWithGoogle()}
                    >
                        <Image source={imgGoogle} style={{ width: 54, height: 54, marginLeft: 40, }} />
                    </TouchableOpacity>
                </View>
                <View style={{}}>

                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}
                    >
                        <Text style={{ color: theme.GREY, fontFamily: 'Poppins' }}>Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <Text style={{ color: theme.btnColor, fontFamily: 'Poppins' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default SignUp