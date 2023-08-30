import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect} from 'react'
import { Color } from '../../styles/Color'
import { useNavigation } from '@react-navigation/native'
import { imgLogo } from '../../assets/images'

const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("HomeScreen")  
    }, 3000);
  }, [])
  

  return (
    <View style={{height: "100%",justifyContent: "center", alignItems: "center"}}>
      <Image 
        style={{width: 120, height:120,alignSelf: "center"}}
        source={imgLogo}
      />
      <Text style={{color: Color.BLUE, fontSize: 15, fontWeight: "600"}}>My Store</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
export default SplashScreen
