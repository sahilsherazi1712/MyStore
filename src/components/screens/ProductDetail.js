import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, BackHandler, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Swiper from 'react-native-swiper';
import { Color } from '../../styles/Color';
import { imgCart, imgStar } from '../../assets/images';
import CustomButton from '../common/CustomButton';
import actions from '../../redux/actions';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import ThemeContext from '../common/ThemeContext';
import TourWrapper from '../../utils/helpers/TourWrapper';

const ProductDetail = ({ navigation, route }) => {
    const { product_id } = route.params;
    const [productData, setProductData] = useState('');
    const [images, setImages] = useState([]);
    const [relatedProducts, SetRelatedProducts] = useState([]);
    // const [isFavourite, setIsFavourite] = useState(false);
    const { theme } = useContext(ThemeContext);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.productsData)
    console.log(products);
    const cartItems = useSelector((state) => state.myCart.cartItems)
    console.log("cartItems", cartItems);

    const favouriteItems = useSelector((state) => state.myFavourites.favouriteItems)

    useEffect(() => {
        const currentProduct = products.find((item) => {
            return item.id === product_id ? item : null
        })
        setProductData(currentProduct)
    }, [])
    // console.log("currentProduct", productData);
    useEffect(() => {
        setImages(productData.images)
        // console.log("category==>", productData.category);

        const sameCatArray = products.filter((item) => {
            return productData.category === item.category ? item : null
        })
        SetRelatedProducts(sameCatArray)

        console.log("isFavourite", isFavourite);
        // setIsFavourite(isFavourite)
    }, [productData])
    // console.log(images);
    // console.log(relatedProducts);

    const widthh = Dimensions.get('window').width;
    const isFavourite = favouriteItems.find((item) => item.id === productData.id);
    const isInCart = cartItems.find((item) => item.id === productData.id);

    const AddItemToCart = (item) => {
        dispatch(actions.addToCart(item));
    }

    useEffect(() => {
        // const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        // return () => backHandler.remove();
    }, []);

    const handleBackPress = () => {
        navigation.goBack();
        return true; // Prevent default back press behavior
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.backgroundColor }} showsVerticalScrollIndicator={false}>
            <View style={{ height: 250 }}>
                {images && <Swiper
                    loop={false}
                    key={images.length}
                    height={250}
                    renderPagination={(index, total, context) => {
                        console.log(index, total);
                    }}
                >
                    {images && images.map((item, index) => {
                        return (
                            <View key={index}>
                                <Image source={{ uri: item }} style={{ width: "100%", height: 250 }} />
                                <View style={{ backgroundColor: Color.GREY, position: 'absolute', bottom: 10, left: widthh / 2, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
                                    <Text style={{ color: Color.RED, fontSize: 14, color: Color.WHITE }}>{index + 1}/{images.length}</Text>
                                </View>
                            </View>
                        )
                    })}
                </Swiper>}
            </View>
            <TourWrapper tourKey={'results1'} zone={2} text='Goto Cart' style={{ position: 'absolute', top: 10, right: 10, }}
                onStop={() => {
                    const product = products.find((item) => {
                        return item.id === product_id ? item : null
                    })
                    console.log('currentProduct', product);
                    AddItemToCart(product)
                    navigation.navigate('Cart')
                }}>
                <TouchableOpacity
                    style={{ width: 42, height: 42, backgroundColor: theme.statusBarColor, borderRadius: 21, padding: 5, alignItems: 'center', justifyContent: 'center', }}
                    onPress={() => navigation.navigate('Cart')}>
                    <Image source={imgCart} style={{ width: 20, height: 20, tintColor: Color.WHITE }} />
                </TouchableOpacity>
            </TourWrapper>
            <View style={{ width: "95%", backgroundColor: theme.primaryColor, alignSelf: 'center', marginTop: 10, paddingHorizontal: 10, paddingTop: 15, paddingBottom: 15, borderRadius: 10 }}>
                <Text style={{ textAlign: 'left', fontFamily: 'Poppins', textTransform: 'capitalize', color: theme.textColor1, }}>{productData.title}</Text>
                <Text style={{ fontFamily: 'SourceSansPro', color: theme.GREY }}>{productData.description}</Text>

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 14, color: Color.RED, fontFamily: 'Poppins', }}>Rs.{(productData.price - productData.discountPercentage * productData.price / 100).toFixed(0)}</Text>
                        <Text style={{ fontSize: 12, color: theme.textColor1, marginTop: 2, marginLeft: 5, textDecorationLine: 'line-through' }}>Rs.{productData.price}</Text>
                        <Text style={{ fontSize: 12, color: theme.textColor1, marginTop: 2, marginLeft: 5 }}>-{(productData.discountPercentage)}%</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: theme.GREY, fontFamily: 'Poppins', }}>Stock: {productData.stock}</Text>
                </View>

                <View style={{ height: .25, backgroundColor: Color.GREY }}></View>

                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <Image source={imgStar} style={{ width: 14, height: 14 }} />
                    <Text style={{ color: Color.GREY, fontSize: 11, marginLeft: 5, color: theme.textColor1 }}>{productData.rating?.toFixed(1)}/5</Text>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 15, }}>
                    <Text style={{ color: Color.GREY, fontSize: 13, marginLeft: 5, lineHeight: 20, color: theme.textColor1 }}>Category: {productData.category}</Text>
                    <Text style={{ color: Color.GREY, fontSize: 13, lineHeight: 20, marginLeft: 5, color: theme.textColor1 }}>Brand: {productData.brand}</Text>
                </View>
            </View>
            <FlatList
                data={relatedProducts}
                extraData={relatedProducts}
                horizontal
                style={{ flex: 1, alignSelf: "center", marginLeft: 5, marginTop: 10 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{ elevation: 2, margin: 5, backgroundColor: theme.primaryColor, borderRadius: 10, width: 180, height: 230 }}
                            onPress={() => {
                                // navigation.navigate('ProductDetail', { product_id: item.id })
                                setProductData(item)
                            }}
                        >
                            <Image source={{ uri: item.thumbnail }} style={{ width: "100%", height: 140, borderTopLeftRadius: 10, borderTopRightRadius: 10, }} resizeMode='stretch' />
                            <View style={{ padding: 5, }}>
                                {item.title.length > 18 ?
                                    <Text style={{ textAlign: 'left', fontFamily: 'Poppins', textTransform: 'capitalize', color: theme.textColor1, }}>{
                                        item.title.slice(0, 15)
                                    } ...</Text> :
                                    <Text style={{ textAlign: 'left', fontFamily: 'Poppins', textTransform: 'capitalize', color: theme.textColor1, }}>{
                                        item.title
                                    }</Text>
                                }
                                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                                    <Image source={imgStar} style={{ width: 14, height: 14 }} />
                                    <Text style={{ color: theme.GREY, fontSize: 11, marginLeft: 5 }}>{(item.rating)?.toFixed(1)}/5</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <Text style={{ fontSize: 14, color: Color.RED, fontFamily: 'Poppins', }}>Rs.{(item.price - item.discountPercentage * item.price / 100)?.toFixed(0)}</Text>
                                    <Text style={{ fontSize: 12, color: theme.GREY, marginTop: 2, marginLeft: 5, textDecorationLine: 'line-through' }}>Rs.{item.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />

            <View style={{ flexDirection: 'row', backgroundColor: theme.primaryColor, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                <CustomButton
                    title={'Add to Favourites'}
                    disabled={isFavourite ? true : false}
                    style={{ width: 170, backgroundColor: isFavourite ? theme.GREY : Color.RED }}
                    onPress={() => dispatch(actions.addToFavourite(productData))}
                />
                <TourWrapper tourKey={'results1'} zone={1} text='Press the "+ Add to Cart" button' onStop={() => { }}>
                    <CustomButton
                        title={'+ Add to Cart'}
                        disabled={isInCart ? true : false}
                        style={{ width: 170, backgroundColor: isInCart ? theme.GREY : theme.btnColor, marginLeft: 5, }}
                        textStyle={{ color: theme.textColor }}
                        onPress={() => AddItemToCart(productData)}
                    />
                </TourWrapper>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({})
export default ProductDetail