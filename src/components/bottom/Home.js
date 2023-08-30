import React, { useContext, useEffect, useState } from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  SafeAreaView,
  BackHandler,

} from 'react-native'
import actions from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/myAction';
import { Color } from '../../styles/Color';
import CustomHeader from '../common/CustomHeader';
import CustomCarousel from '../common/CustomCarousel';
import { imgStar } from '../../assets/images';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Modal } from 'react-native-paper';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ThemeContext from '../common/ThemeContext';
import TourWrapper from '../../utils/helpers/TourWrapper';

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('')
  const [showFilterView, setShowFilterView] = useState(false)
  const [exitDialogVisible, setExitDialogVisible] = useState(false);

  const { theme } = useContext(ThemeContext)

  const tabBarHeight = useBottomTabBarHeight()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productsData);
  //pick categories from products list
  const categories = products.map((item) => item.category)
  //remove dublicates
  //1.
  let productCategories = [...new Set(categories)]
  //2.
  // let categoriess = [...new Map(categories.map((m) => [m, m])).values()]
  // console.log("categories:",productCategories);
  // console.log('Books_Verses', Books["book_id_1"]['chapters']['chap_id_1']['verses']);
  // const data = Books["book_id_1"]['chapters']['chap_id_1']['verses']
  // const [data, setData] = useState(ComfortAPI)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  useEffect(() => {
    if (products.length > 0) {
      setData(products)
    }
  }, [products])


  console.log("query", query);

  const getPosts = async () => {
    try {
      const res = await actions.getPosts()
      console.log("resPosts", res);
      setData(res)
    } catch (error) {
      console.log("errorPosts", error);
    }
  }
  const deletePost = async (id) => {
    try {
      const res = await actions.deletePost(id)
      console.log("resDelete", res);
      let tempData = [...data]
      let modifyData = tempData.filter((item, index) => {
        return item.id !== id && item
      })
      setData(modifyData)
    } catch (error) {
      console.log("error in deleting post: ", error);
    }
  }

  const carouselData = [
    'https://www.whatmobile.com.pk/control/news/assets/15062020/130aeec765706173310b0379dd6933d1.jpg',
    'https://blog.daraz.pk/wp-content/uploads/2020/08/DBILLS-OG-1.jpg',
    'https://techsanchar.com/wp-content/uploads/2021/08/Daraz-Mall-Festival-2078.jpg',
    'https://static-01.daraz.pk/other/shop/bc78d99b5bd72c557bdc67aa988ced62.png_2200x2200q75.jpg_.webp',
  ];

  ///////// handle back press start //////////
  //// used this hook because if I opened pop up on back press on home screen which is in tab.navigator 
  //// but when I go to the detail screen which is in stack.navigator, back press did not work. 
  /// we use the useFocusEffect hook to register and unregister the back press event listener 
  /// whenever the home screen gains or loses focus.
  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return () => backHandler.remove();
  })

  const handleBackPress = () => {
    if (exitDialogVisible) {
      setExitDialogVisible(false); // Close the pop-up
      return true; // Prevent default back press behavior
    } else {
      setExitDialogVisible(true)
      // navigation.navigate('StackScreen'); // Navigate to the Stack Navigator screen
      return true; // Prevent default back press behavior
    }
  };
  ///////// handle back press end //////////

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View>
        <StatusBar backgroundColor={theme.statusBarColor} barStyle={'light-content'} />
        <CustomHeader
          nav={navigation}
          query={query}
          setQuery={setQuery}
          setData={setData}
          filterPress={() => {
            setShowFilterView(!showFilterView)
          }}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => setShowFilterView(false)}>
        <View style={{ flex: 1 }}>
          <CustomCarousel data={carouselData} autoPlay={true} />

          {/* Categories */}
          <View style={{ marginTop: 10, marginBottom: 10, borderBottomWidth: .3, borderBottomColor: Color.GREY, flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                marginLeft: 15,
                marginRight: 15,
                padding: 5,
                marginBottom: 5,
                backgroundColor: Color.GREY,
                borderRadius: 20,
              }}
              onPress={() => {
                // const filteredProducts = products.filter((product)=>product.category === item)
                // console.log(filteredProducts);
                setData(products)
              }}>
              <Text style={{ color: Color.WHITE, margin: 5, }}>All</Text>
            </TouchableOpacity>
            <ScrollView
              horizontal
            // contentContainerStyle={{ flexGrow: 1 }} // Adjust the contentContainerStyle
            >
              {productCategories.map((item, index) => {
                //key in the view is added as keyExtractor in flatlist
                //The key property allows React Native to track these list 
                //of objects and that way it can keep track of what you are modifying or deleting and just delete 
                //that particular element with a particular key.
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginRight: 15,
                      padding: 5,
                      marginBottom: 5,
                      backgroundColor: theme.categorybgColor,
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      const filteredProducts = products.filter((product) => product.category === item)
                      console.log(filteredProducts);
                      setData(filteredProducts)
                    }}>
                    <Text style={{ color: theme.textColor, margin: 5, }}>{item}</Text>
                  </TouchableOpacity>)
              })}
            </ScrollView>
          </View>

          <TourWrapper tourKey={'results'} zone={1} text='Welcome to myStore' style={{ width: 1, height: 1, }} onStop={() => { }} />
          <TourWrapper
            tourKey={'results'}
            zone={2}
            text='Click any item from the below list'
            style={{ position: 'absolute', bottom: 0, width: "95%", height: 500, margin: 5, }}
            onStop={() => {
              navigation.navigate('ProductDetail', {
                product_id: data[0]?.id,
              })
            }}></TourWrapper>
          {data && <FlatList
            style={{ flex: 1, alignSelf: "center", width: "100%", }}
            data={data}
            extraData={data}
            numColumns={2}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={()=>{
              return(
                <Text>No More Data</Text>
              )
            }}
            ListFooterComponentStyle={{height: 140, alignItems: 'center', marginTop: 20}}
            renderItem={({ item, index }) => {
              return (
                // <View>
                //   <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.book_title}</Text>
                //   {item.chapters == '' ? (<View><Text>{'No Data'}</Text></View>) :
                //     (<View>
                //       {item.chapters.map(items => {
                //         return (
                //           <View>
                //             <Text>{'Chapter No. '}{items.chap_num}</Text>
                //             <Text>{items.chapterAudioUrl}</Text>
                //             {items.verses.map(itemss => {
                //               return (
                //                 <View>
                //                   <Text>{itemss.verse_num}{'. '}{itemss.text}</Text>
                //                 </View>
                //               )
                //             })}
                //           </View>
                //         )
                //       })}
                //     </View>)}
                // </View>
                <TouchableOpacity
                  style={{ elevation: 2, margin: 5, backgroundColor: theme.primaryColor, borderRadius: 10, width: "47%", }}
                  onPress={() => {
                    navigation.navigate('ProductDetail', {
                      product_id: item.id,
                    })
                  }}
                >
                  <Image source={{ uri: item.thumbnail }} style={{ width: "100%", height: 140, borderTopLeftRadius: 10, borderTopRightRadius: 10, }} resizeMode='stretch' />
                  <View style={{ padding: 5 }}>
                    <Text style={{ textAlign: 'left', fontFamily: 'Poppins', textTransform: 'capitalize', color: theme.textColor1, }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, }}>
                      <Image source={imgStar} style={{ width: 14, height: 14 }} />
                      <Text style={{ color: theme.textColor1, fontSize: 11, marginLeft: 5 }}>{(item.rating)?.toFixed(1)}/5</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                      <Text style={{ fontSize: 14, color: Color.RED, fontFamily: 'Poppins', }}>Rs.{(item.price - item.discountPercentage * item.price / 100)?.toFixed(0)}</Text>
                      <Text style={{ fontSize: 12, color: theme.textColor1, marginTop: 2, marginLeft: 5, textDecorationLine: 'line-through' }}>Rs.{item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }} />
          }

          {/* filter view */}
          {showFilterView &&
            <View style={{
              // height: 50,
              backgroundColor: Color.WHITE,
              position: 'absolute', top: 10, right: 10,
              padding: 15,
              borderRadius: 10,
              elevation: 5,
              // borderWidth: 1,
              // borderColor: Color.DARK_BLUE,
            }}>
              <TouchableOpacity
                style={{ padding: 7, backgroundColor: Color.LIGHT_BLUE, marginBottom: 8, borderRadius: 10, }}
                onPress={() => {
                  let tempData = data.sort((a, b) => {
                    let aa = (a.price - a.discountPercentage * a.price / 100)?.toFixed(0);
                    let bb = (b.price - b.discountPercentage * b.price / 100)?.toFixed(0);
                    return aa - bb;
                  })
                  setData(tempData)
                  setShowFilterView(false)
                }}>
                <Text style={{ color: Color.WHITE }}>By Price (low to high)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 7, backgroundColor: Color.LIGHT_BLUE, marginBottom: 8, borderRadius: 10, }}
                onPress={() => {
                  let tempData = data.sort((a, b) => {
                    let aa = (a.price - a.discountPercentage * a.price / 100)?.toFixed(0)
                    let bb = (b.price - b.discountPercentage * b.price / 100)?.toFixed(0)
                    return bb - aa
                  })
                  setData(tempData)
                  setShowFilterView(false)
                }}>
                <Text style={{ color: Color.WHITE }}>By Price (high to low)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 7, backgroundColor: Color.LIGHT_BLUE, marginBottom: 8, borderRadius: 10, }}
                onPress={() => {
                  let tempData = data.sort((a, b) => {
                    return a.rating - b.rating;
                  })
                  setData(tempData)
                  setShowFilterView(false)
                }}>
                <Text style={{ color: Color.WHITE }}>By Rating (low to high)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 7, backgroundColor: Color.LIGHT_BLUE, borderRadius: 10, }}
                onPress={() => {
                  let tempData = data.sort((a, b) => {
                    return b.rating - a.rating;
                  })
                  setData(tempData)
                  setShowFilterView(false)
                }}>
                <Text style={{ color: Color.WHITE }}>By Rating (high to low)</Text>
              </TouchableOpacity>
            </View>}
          <Modal visible={exitDialogVisible} animationType="fade" transparent>
            <View style={{ padding: 20, backgroundColor: "rgba(34, 89, 128, 0.7)", width: "100%", height: "100%", justifyContent: "center" }}>
              <View style={{ backgroundColor: Color.WHITE, padding: 20, borderRadius: 20, }}>
                <Text style={{
                  fontFamily: 'Poppin',
                  fontSize: 18,
                  color: Color.DARK_BLUE
                }}>{'Exit'}</Text>
                <Text style={{
                  fontFamily: 'Poppin',
                  fontSize: 14,
                  marginTop: 10,
                  lineHeight: 20,
                  color: Color.GREY
                }}>{'Are you sure to close app!'}</Text>
                <View style={{ flexDirection: "row", marginTop: 20, alignSelf: "flex-end", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      marginRight: 20
                    }}
                    onPress={() => setExitDialogVisible(false)}>
                    <Text style={{
                      fontFamily: 'Poppins',
                      fontSize: 14,
                      color: Color.DARK_BLUE,
                    }}>{'Cancel'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: Color.DARK_BLUE, padding: 5, borderRadius: 7, }}
                    onPress={() => {
                      setExitDialogVisible(false)
                      BackHandler.exitApp()
                    }}>
                    <Text style={{
                      fontFamily: 'Poppins',
                      fontSize: 14,
                      color: Color.WHITE,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>{'Exit'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
export default Home