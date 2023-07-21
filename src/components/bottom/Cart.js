import React, { useContext } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Color } from '../../styles/Color'
import actions from '../../redux/actions'
import CustomButton from '../common/CustomButton'
import AnimatedLottieView from 'lottie-react-native'
import { gifEmptyCart } from '../../assets/gifs'
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../common/ThemeContext'
import RazorpayCheckout from 'react-native-razorpay';
import { imgLogo } from '../../assets/images'

const Cart = () => {
  const cartItems = useSelector((state) => state.myCart.cartItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const width = Dimensions.get('window').width;

  console.log("cartItems", cartItems);

  const handleAddToCart = (product) => {
    dispatch(actions.addToCart(product));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(actions.increaseCartItemQuantity(productId))
    // increaseCartItemQuantity(productId);
    console.log("cartItemss", cartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(actions.decreaseCartItemQuantity(productId))
    // decreaseCartItemQuantity(productId);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(actions.removeFromCart(productId))
    // removeFromCart(productId);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item, index) => {
      totalPrice += ((item.price - item.discountPercentage * item.price / 100).toFixed(0)) * item.quantity
    })
    return <Text style={{ fontFamily: 'Poppins', color: Color.RED, fontWeight: 'bold', fontSize: 18, }}>Rs.{totalPrice}</Text>
  }
  const totalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item, index) => {
      totalPrice += ((item.price - item.discountPercentage * item.price / 100).toFixed(0)) * item.quantity
    })
    return totalPrice;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      {cartItems.length > 0 &&
        <View style={{ width: width, flexDirection: 'row', backgroundColor: theme.primaryColor, elevation: 5, padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>Total: {getTotalPrice()}</Text>
          <CustomButton
            title={`Check Out (${cartItems.length})`}
            style={{ backgroundColor: theme.btnColor }}
            textStyle={{color: theme.textColor}}
            onPress={()=>{
              // console.log("pressed: ", totalPrice());
              var options = {
                description: 'Credits towards consultation',
                image: {imgLogo},
                currency: 'INR',
                // key: '<YOUR_KEY_ID>',
                key: 'rzp_test_PLbERPkkqGZkOF',
                amount: totalPrice()*100,
                name: 'My Store',
                order_id: '',//Replace this with an order_id created using Orders API.
                prefill: {
                  email: 'alien.air@gmail.com',
                  contact: '9292929292',
                  name: 'Alien Air'
                },
                theme: {color: Color.BLUE}
              }
              RazorpayCheckout.open(options).then((data) => {
                // handle success
                Alert.alert(`Success: ${data.razorpay_payment_id}`);
                console.log("OrderData: ", data);
              }).catch((error) => {
                // handle failure
                Alert.alert(`Error: ${error.code} | ${error.description}`);
                console.log("Error: ", error);
              });
            }}
          />
        </View>}
      {cartItems.length > 0 ?
        <FlatList
          data={cartItems}
          extraData={cartItems}
          style={{ flex: 1, }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={{ margin: 7, }} activeOpacity={1}
                onPress={() => navigation.navigate('ProductDetail', { product_id: item.id })}>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                  <Image source={{ uri: item?.thumbnail }} style={{ width: 74, height: 74, marginRight: 10, }} resizeMode='contain' />
                  <View style={{ flex: 1, }}>
                    <Text style={{ textAlign: 'left', fontFamily: 'Poppins', textTransform: 'capitalize', color: theme.textColor1, }}>{item.title}</Text>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ textAlign: 'left', fontFamily: 'Poppins', textTransform: 'capitalize', color: theme.GREY, fontSize: 12 }}>{item.description}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', }}>
                      <Text style={{ fontSize: 14, color: Color.RED, fontFamily: 'Poppins', }}>Rs.{(item.price - item.discountPercentage * item.price / 100).toFixed(0)}</Text>

                      <View style={{ flexDirection: 'row', backgroundColor: theme.GREY, borderRadius: 10, }}>
                        {item.quantity === 1 ? (
                          <TouchableOpacity
                            style={{ height: 30, backgroundColor: Color.RED, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}
                            onPress={() => {
                              Alert.alert('Delete', `Do you want to delete "${item.title}" from your cart permanently!`, [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                { text: 'OK', onPress: () => handleRemoveFromCart(item.id) },
                              ]);
                            }}
                          >
                            <Text style={{
                              fontFamily: 'Poppins',
                              fontSize: 14,
                              color: Color.WHITE,
                            }}> Delete </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{ width: 50, height: 30, backgroundColor: theme.btnColor, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}
                            onPress={() => {
                              if (item.quantity > 1) {
                                handleDecreaseQuantity(item.id)
                              }
                            }}
                          >
                            <Text style={{
                              fontFamily: 'Poppins',
                              fontSize: 20,
                              color: theme.textColor,
                            }}> - </Text>
                          </TouchableOpacity>
                        )}
                        <Text style={{ fontFamily: 'Poppins', fontSize: 16, alignSelf: 'center', marginLeft: 10, marginRight: 10,}}> {item.quantity} </Text>
                        <TouchableOpacity
                          style={{ width: 50, height: 30, backgroundColor: theme.btnColor, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}
                          onPress={() => {
                            if (item.quantity < item.stock) {
                              handleIncreaseQuantity(item.id)
                              console.log(item.id);
                            }
                          }}
                        >
                          <Text style={{
                            fontFamily: 'Poppins',
                            fontSize: 20,
                            color: theme.textColor,
                          }}> + </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ height: 1, backgroundColor: Color.LIGHT_GREY, marginTop: 5 }}></View>
              </TouchableOpacity>
            )
          }}
        /> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 10, }}>
          {/* <Image source={gifEmptyCart} style={{width: 150, height: 150,}}/> */}
          <AnimatedLottieView
            source={gifEmptyCart}
            autoPlay
            loop={true}
            style={{ height: 300 }}
            resizeMode='contain'
          />
          <CustomButton
            title={"Continue Shopping ..."}
            style={{ marginTop: 40, backgroundColor: theme.btnColor}}
            textStyle={{color: theme.textColor}}
            onPress={() => navigation.goBack()}
          />
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({})
export default Cart