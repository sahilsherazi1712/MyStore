import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Color } from '../../styles/Color';
import ThemeContext from './ThemeContext';

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={[{
      backgroundColor: theme.btnColor,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
    }, style]} onPress={onPress} {...props}>
      
      <Text style={[{
        color: theme.textColor,
        fontSize: 16,
        fontWeight: 'bold',
      }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

});

export default CustomButton;
