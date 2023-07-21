import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper';
import { Color } from '../../styles/Color';

const CustomCarousel = ({data, autoPlay}) => {
    return (
        <View style={{height:120}}>
            <Swiper
                loop
                key={data.length}
                height={120}
                autoplay ={autoPlay}
                // showsButtons
                autoplayTimeout={3}
                dotColor= {Color.GREY}
                activeDotColor= {Color.BLUE}>
                    {data.map((item, index)=>{
                        return(
                            <View key={index}>
                                <Image source={{uri: item}} style={{width: "100%", height:120}}/>
                            </View>
                        )
                        })}   
            </Swiper>
        </View>
        
        
  )
}

const styles = StyleSheet.create({})
export default CustomCarousel