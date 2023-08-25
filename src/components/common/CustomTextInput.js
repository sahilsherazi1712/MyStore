import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Color } from '../../styles/Color'
import ThemeContext from './ThemeContext';
import CountryPicker from 'react-native-country-picker-modal'

const CustomTextInput = ({
    label,
    onChangeText,
    onFocus,
    onBlur,
    onSubmitEditing,
    placeholder,
    secureTextEntry,
    keyboardType,
    maxLength,
    value,
    style,
    multiline,
    startIcon,
    endIcon,
    endIconPress,
    setCountryCode,
    touchable,
    ...props
}) => {
    const { theme } = useContext(ThemeContext);
    const [cca2, setCca2] = useState('PK')

    return (
        <View style={{ marginTop: 10, }}>
            <Text style={{ padding: 3, color: theme.btnColor, textAlign: 'left', fontFamily: 'Poppins' }}>{label}:</Text>
            <TouchableOpacity
                onPress={() => {
                    touchable && (

                        console.log("Input Pressed")
                    )
                }}
                activeOpacity={1}
                style={[{
                    borderColor: '#ccc',
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    backgroundColor: Color.LIGHT_GREY,
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: multiline ? 'flex-start' : 'center',
                    height: multiline ? 120 : 42,
                }, style]}
            >
                {startIcon && <Image source={startIcon} style={{ width: 14, height: 14, tintColor: theme.btnColor, marginTop: multiline && 12 }} />}
                {label === 'Mobile' && <View>
                    <CountryPicker
                        {...{

                            countryCode: cca2,
                            withFilter: true,
                            withFlag: true,
                            // withCountryNameButton: true,
                            withCallingCodeButton: true,
                            withAlphaFilter: true,
                            withCallingCode: true,
                            onSelect: (slectedCountry) => {
                                console.log(slectedCountry);
                                setCca2(slectedCountry.cca2)
                                setCountryCode(Number(slectedCountry.callingCode))
                            },
                        }}
                    // visible
                    />
                </View>}
                <View pointerEvents={touchable && 'none'} style={{ width: "88%", }}>
                    <TextInput
                        style={{ paddingHorizontal: 10, width: endIcon? "88%": "100%", textAlignVertical: 'top', color: theme.textColor1 }}
                        onChangeText={onChangeText}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSubmitEditing={onSubmitEditing}
                        spellCheck={false}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        value={value}
                        {...props}
                        multiline={multiline}
                        numberOfLines={multiline && 5}
                    />
                </View>
                {endIcon && <TouchableOpacity onPress={endIconPress}>
                    <Image source={endIcon} style={{ width: 16, height: 16, tintColor: theme.btnColor }} />
                </TouchableOpacity>}
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#ccc',
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: Color.LIGHT_GREY,
        flexDirection: 'row',
        alignItems: 'center',
        // height: 45,
    },
})
export default CustomTextInput