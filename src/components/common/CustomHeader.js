import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput} from 'react-native'
import { Color } from '../../styles/Color'
import { imgFilter, imgNav, imgSearch } from '../../assets/images'
import { useSelector } from 'react-redux'
import ThemeContext from './ThemeContext'

const Header = ({nav, title, query, setQuery, setData, filterPress}) => {
  const [shoDropDown, setShowDropDown] = useState(false)
  const products = useSelector((state) => state.products.productsData);
  const {theme} = useContext(ThemeContext);

  console.log(products);
  return (
    <View style={{height: 60, backgroundColor: theme.headerBgColor, alignItems: "center", paddingRight:10, flexDirection: 'row', elevation: 5,}}>
        <TouchableOpacity 
          style={{alignItems: 'center', justifyContent: 'center', width:"15%"}}
          onPress={()=>nav.openDrawer()}>
          <Image source={imgNav} style={{width: 28, height: 28, tintColor: Color.WHITE}}/>
        </TouchableOpacity>  
        {/* <Text style={{
            color: Color.WHITE, 
            fontSize: 20, 
            fontFamily:'Poppins', 
            marginLeft: 10, 
            fontWeight: "bold"}}>{title}</Text>       */}
        <View style={{
          height: 35,
          width: "70%", 
          backgroundColor: Color.WHITE, 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingLeft: 7, 
          paddingRight: 15,
          borderRadius: 14,
          elevation: 5,
        }}>
          <Image source={imgSearch} style={{width:14, height:14, resizeMode:'contain', tintColor: Color.GREY}}/>
          <TextInput
                value={query}
                placeholder='Search your favourite ...'
                style={{fontSize: 12, padding:5, }}
                onChangeText={(txt)=>{
                  setQuery(txt)
                  let filteredList = products.filter((item)=>{
                    return item.title.toLowerCase().match(txt.toLowerCase()) 
                  })
                  setData(filteredList)
                }}
                onFocus={()=> setShowDropDown(true)}
                onBlur={()=>setShowDropDown(false)}
            />
        </View>
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center', width:"15%"}} 
          onPress={filterPress}
        >
          <Image source={imgFilter} style={{width: 28, height: 28, tintColor: Color.WHITE}}/>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({})
export default Header