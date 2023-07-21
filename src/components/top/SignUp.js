import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import ThemeContext from '../common/ThemeContext'
import CustomTextInput from '../common/CustomTextInput';
import { imgDelete } from '../../assets/images';

const SignUp = () => {
    const { theme } = useContext(ThemeContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAdress] = useState('');

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.primaryColor, margin: 10, borderRadius: 10, elevation: 5, paddingHorizontal: 20, }}>
            <View style={{ marginTop: 20, }}>
                <CustomTextInput
                    style={{ backgroundColor: theme.backgroundColor }}
                    placeholder={'Full Name'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='words'
                    startIcon={imgDelete}
                    value={name}
                    onChangeText={(val) => setName(val)}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginEnd: 25}}>
                    <Image source={imgDelete} style={{ width: 14, height: 15, margin: 10,}} />
                    <CustomTextInput
                        style={{ backgroundColor: theme.backgroundColor }}
                        placeholder={'Mobile'}
                        placeholderTextColor={theme.GREY}
                        // autoCapitalize='words'
                        startIcon={imgDelete}
                        keyboardType='number-pad'
                        value={mobile}
                        onChangeText={(val) => setMobile(val)}
                    />
                </View>
                <CustomTextInput
                    style={{ backgroundColor: theme.backgroundColor, marginTop: 10, }}
                    placeholder={'Address'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='words'
                    startIcon={imgDelete}
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <CustomTextInput
                    style={{ backgroundColor: theme.backgroundColor, marginTop: 10, }}
                    placeholder={'Email'}
                    placeholderTextColor={theme.GREY}
                    autoCapitalize='words'
                    startIcon={imgDelete}
                    keyboardType='email-address'
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default SignUp