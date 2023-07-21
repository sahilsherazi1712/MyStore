import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import ItemFavourite from './ItemFavourite'
import AnimatedLottieView from 'lottie-react-native'
import CustomButton from '../common/CustomButton'
import { gifEmptyFav } from '../../assets/gifs'
import ThemeContext from '../common/ThemeContext'

const Favourite = ({ }) => {
  const [favouriteItems, setFavouriteItems] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const tempArray = useSelector((state) => state.myFavourites.favouriteItems)

  useEffect(() => {
    let data = tempArray.map(product => ({ ...product, opened: false }));
    setFavouriteItems(data);

  }, [tempArray])

  console.log('favouriteItems', favouriteItems);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: theme.backgroundColor}}>
      {favouriteItems.length > 0 ?
        <FlatList
          data={favouriteItems}
          extraData={favouriteItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('ProductDetail', { product_id: item.id }) }}>
                <ItemFavourite
                  item={item}
                  index={index}
                  onDeleteBarOpen={(ind) => {
                    let tempData = favouriteItems;
                    tempData.map((item, index) => {
                      if (index == ind) {
                        item.opened = true;
                      } else {
                        item.opened = false;
                      }
                    });
                    let temp = [];
                    tempData.map((item) => {
                      temp.push(item);
                    })
                    setFavouriteItems(temp);
                  }}
                  onDeletePress={(id) => {
                    dispatch(actions.removeFromFavourite(id))
                    console.log("pressed");
                  }}
                />
              </TouchableOpacity>
            )
          }}
        /> :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 10, }}>
          <AnimatedLottieView
            source={gifEmptyFav}
            autoPlay
            loop={true}
            style={{ height: 300 }}
            resizeMode={'contain'}
          />
          <CustomButton
            title={"Continue Shopping ..."}
            style={{ marginTop: 40 }}
            onPress={() => navigation.goBack()}
          />
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({})
export default Favourite