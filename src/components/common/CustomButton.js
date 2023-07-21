import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Color } from '../../styles/Color';

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.DARK_BLUE,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
