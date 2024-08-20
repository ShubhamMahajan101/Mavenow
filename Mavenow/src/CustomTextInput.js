import { View, Text,TextInput, ScrollView, FlatList,  StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Button, Alert, Modal, } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function CustomTextInput({route}) {
    const [setOnActiveHeader,setsetOnActiveHeader] = useState(false)
    const [onChangeText,setonChangeText] = useState(false)
    // console.log('onChangeText------', this.props.HeaderData);
    // const [HeaderData,setHeaderData] = useState(route.params.HeaderData)
    return (
      <View style={{flex:1 }}>
          <TextInput maxLength={50}
            keyboardType='email-address'
            placeholderTextColor="black"
            onFocus={()=>{setsetOnActiveHeader(true)}}
            onChangeText={(txt) =>{setonChangeText(txt), setsetOnActiveHeader(true)}}
            placeholder=' Search' style={{
              width: mobileW * 94 / 100,backgroundColor:'White',
              borderWidth:mobileH*0.3/100,borderColor:setOnActiveHeader?Colors.themecolor:Colors.greyColor,
              marginTop:mobileH*1/100,borderRadius:mobileW*2/100,
              alignSelf:'center',
                fontSize: mobileW * 3.3 / 100,
            }}></TextInput>
            {setOnActiveHeader && 
            <View style={{backgroundColor:'white',marginLeft:30,marginBottom:mobileH*25/100,position:'absolute' }}>
            <Text style={{color:'black'}}>  HeaderData  </Text>
            </View>}
      </View>
    )

}
