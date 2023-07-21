import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Color } from '../../styles/Color'
import { imgDelete } from '../../assets/images'
import ThemeContext from './ThemeContext'

const CustomTextInput = ({
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
    startIcon,
    endIcon,
    endIconPress,
    ...props
}) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.input, style]}>
            {startIcon && <Image source={startIcon} style={{ width: 15, height: 15, tintColor: theme.btnColor }} />}
            <TextInput
                style={{ paddingHorizontal: 10, width: "90%" }}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                onSubmitEditing={onSubmitEditing}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                // keyboardType={keyboardType}
                maxLength={maxLength}
                value={value}
                {...props}
                multiline
                numberOfLines={5}
            // autoCapitalize='words'
            />
            {endIcon && <TouchableOpacity>
                <Image source={endIcon} style={{ width: 15, height: 15, tintColor: theme.btnColor }} />
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#ccc',
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: Color.LIGHT_GREY,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // height: 45,
    },
})
export default CustomTextInput