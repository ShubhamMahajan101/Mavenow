
import { View, Text, SafeAreaView,StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image,Button ,Alert} from 'react-native'
import React, { useState, useRef } from 'react'
import { Colors } from './Provider/Colorsfont';
import PhoneInput from 'react-native-phone-number-input';
import { Stack, TextInput, } from "@react-native-material/core";
import ImagePicker from 'react-native-image-crop-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { RadioButton } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'

const Noti=({navigation})=> {
    const [number, onChangeNumber] = React.useState(null);
  return (
    <View style={{ flex: 1, }}>
    <SafeAreaView style={{ flex: 1,backgroundColor:Colors.white_color }}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ={Colors.themecolor} />
 {/* ===============               HEADER ===================== */}
<View style={styles.Header}>
<TouchableOpacity activeOpacity={0.8} style={{marginHorizontal:mobileW*5/100}} onPress={()=>navigation.goBack()}>
<Image style={styles.backIcon} resizeMode='contain'source={require("./Icon/icon_back.png")}></Image>
</TouchableOpacity>
<Text style={{color:Colors.white_color, marginHorizontal:mobileW*5/100, fontWeight:'500', fontSize:mobileW*5/100}}>Notification</Text>
<TouchableOpacity activeOpacity={0.8} style={{marginHorizontal:mobileW*5/100}} onPress={()=>navigation.goBack()}>
<Image style={styles.Help_icon} resizeMode='contain'source={require("./Icon/ic_help.png")}></Image>
</TouchableOpacity>
</View>
 {/* ++++++++++++++++++++++++++++++++++++++ Search Bar ++++++++++++++++++++++++++++++++++++++++ */}
 <View style={{alignSelf:"center",padding:mobileW*6/100}}>
  <Text style={{textAlign:"center",color:"black",fontSize:mobileW*3.45/100}}> in this  screen you will get notified about each single activity in your account,whether,its about the  Maven(s)has accepted your request, or any new mission has been added or started, or a new  request from a learner to join your session, etc.  </Text>
 </View>

</SafeAreaView>
</View>
  )
}
export default Noti
const styles = StyleSheet.create({
    container: {
  flex:1
    },
    Header:{
       
        width:mobileW, height:mobileW*15/100, 
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:Colors.themecolor
      },
    backIcon:{ 
      width: mobileW * 8 / 100, 
      height: mobileW * 6  / 100, 
},
Help_icon:{ 
      width: mobileW * 8 / 100, 
      height: mobileW * 7  / 100, 
},
    input: {
        height: mobileW*12/100,
        margin: mobileW*2/100,
        borderRadius:mobileW*1/100,
        borderWidth: 1,
        padding: mobileW*2/100,
    
      },
}
)