import React, { useContext, useEffect, useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Color } from '../../styles/Color';
import { Swipeable } from 'react-native-gesture-handler';
import { imgDelete } from '../../assets/images';
import ThemeContext from '../common/ThemeContext';

const ItemFavourite = ({ item, index, onDeleteBarOpen, onDeletePress }) => {
    const ref = useRef()
    const { theme } = useContext(ThemeContext);

    const swipe = () => {
        return (
            <TouchableOpacity
                style={{ alignSelf: "center", width: 50, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Color.RED, marginBottom: 10, }}
                onPress={() => {
                    ref.current.close()
                    onDeletePress(item.id)
                }}
            >
                <Image source={imgDelete} style={{ width: 20, height: 20, tintColor: Color.WHITE }} />
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if (item.opened == false) {
            ref.current.close();
        }
    });

    return (
        <Swipeable
            ref={ref}
            // renderLeftActions={swipe}
            renderRightActions={swipe}
            onSwipeableOpen={() => {
                console.log('opened');
                onDeleteBarOpen(index)
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.primaryColor, marginBottom: 5, }}>
                <Image source={{ uri: item.thumbnail }} style={{ width: "20%", height: 64, margin: 4 }} resizeMode='contain' />
                <View style={{ width: "55%", marginLeft: 2, }}>
                    {item.title.length < 10 ?
                        <Text style={{ fontFamily: 'Poppins', fontSize: 16, color: theme.textColor1, textTransform: 'capitalize' }}>{item.title}</Text>
                        : <Text style={{ fontFamily: 'Poppins', fontSize: 16, color: theme.textColor1, textTransform: 'capitalize' }}>{item.title.slice(0, 10)}...</Text>
                    }
                    <Text style={{ fontFamily: 'SourceSansPro', fontSize: 14, color: Color.GREEN, textTransform: 'capitalize' }}>{item.category}</Text>
                </View>
                <View style={{ width: "20%" }}>
                    <Text style={{ fontFamily: 'SourceSansPro', fontSize: 14, color: theme.textColor1, textTransform: 'capitalize' }}>Rs.{(item.price - item.discountPercentage * item.price / 100).toFixed(0)}</Text>
                    <Text style={{ fontSize: 12, color: theme.GREY }}>stock:{item.stock}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({})
export default ItemFavourite