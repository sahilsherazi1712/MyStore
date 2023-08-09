import React, { useContext, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ThemeContext from '../common/ThemeContext'
import CustomTextInput from '../common/CustomTextInput';
import { imgEmail, imgFacebook, imgGoogle, imgHidePass, imgPassword, imgShowPass } from '../../assets/images';
import CustomButton from '../common/CustomButton';

const Login = () => {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

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

                    }}
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
                        onPress={() => {

                        }}
                    >
                        <Image source={imgGoogle} style={{ width: 54, height: 54, marginLeft: 40, }} />
                    </TouchableOpacity>
                </View>
                <View style={{}}>

                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}
                    >
                        <Text style={{ color: theme.GREY, fontFamily: 'Poppins' }}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <Text style={{ color: theme.btnColor, fontFamily: 'Poppins' }}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default Login