import {StatusBar,ScrollView, Animated,FlatList, View, Text,Dimensions,TouchableOpacity,Image, StyleSheet,RefreshControl } from 'react-native'
import React,{useRef,useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { Colors } from './Provider/Colorsfont';



const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function LearnerList({navigation, route}) {

      // ================ refresh controller 
      const [refreshing, setRefreshing] = React.useState(false);
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
      // ================ refresh controller 

  const item = route.params.item
  console.log("complate data here====",item);

  return (
         <View style={{ flex: 1, backgroundColor:Colors.white_color}}>
         <SafeAreaView style={{ flex: 1, backgroundColor:Colors.white_color}}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ={Colors.themecolor} />
         <ScrollView
          refreshControl={
          <RefreshControl 
          colors={[Colors.themecolor]}
         refreshing={refreshing} onRefresh={onRefresh} />
          }>
         <View style={styles.Header}>
        
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon_top} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.black_color, fontFamily:Font.FontMedium, fontSize: mobileW * 4 / 100 }}>{Lang_chg.LearnerList[config.language]}</Text>
            <Text style={{ color: Colors.black_color, fontFamily:Font.FontMedium, fontSize: mobileW * 4 / 100 }}> </Text>

        </View>

        <View style={styles.cardView}>
          <View style={{width:mobileW*29/100, alignItems:'center',padding:mobileW*2/100}}>


          <View style={styles.imageCard}>
              <Image resizeMode='contain' style={styles.mavenImage}
                  source={require('./Icon/icon_student.png')}></Image>
                  </View>
                  <Text  style={{fontSize:mobileW*3.5/100, color:Colors.black_color, marginTop:mobileW*1/100, fontFamily:Font.FontMedium,}}>{item.user.FirstName}</Text>
                <View style={{flexDirection:'row', marginTop:mobileW*1/100}}>
                  <TouchableOpacity activeOpacity={0.8}>
                <Image resizeMode='contain' style={{width:mobileW*4/100, height:mobileW*4/100, tintColor:Colors.light_grey}}
                  source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                <Image resizeMode='contain' style={{width:mobileW*4/100, height:mobileW*4/100, tintColor:Colors.light_grey}}
                  source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                <Image resizeMode='contain' style={{width:mobileW*4/100, height:mobileW*4/100, tintColor:Colors.light_grey}}
                  source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                <Image resizeMode='contain' style={{width:mobileW*4/100, height:mobileW*4/100, tintColor:Colors.light_grey}}
                  source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                <Image resizeMode='contain' style={{width:mobileW*4/100, height:mobileW*4/100, tintColor:Colors.light_grey}}
                  source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
            </View>
          </View>
          <View style={{width:mobileW*69/100, padding:mobileW*2/100, justifyContent:'center',}}>
          <Text style={{color:Colors.black_color, fontSize:mobileW*3.5/100,fontFamily:Font.FontMedium,}}>Your Earning*</Text>
          <Text style={{color:Colors.gray,marginTop:mobileW*4/100, fontSize:mobileW*3/100,fontFamily:Font.FontMedium,}}>Your Earning*</Text>
          <Text style={{color:Colors.themecolor,fontSize:mobileW*3.8/100,fontFamily:Font.FontMedium, }}>Rs {item.Charges}</Text>
          </View>
        </View>
        </ScrollView>
</SafeAreaView>
</View>
  )
}

const styles = StyleSheet.create({
  container: {
flex:1,
// backgroundColor:"red"
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW, height: mobileW * 15 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    paddingLeft:mobileW*4/100,
    paddingRight:mobileW*4/100
  },
  backIcon: {
    width: mobileW * 11 / 100,
    height: mobileW * 11 / 100,
    tintColor: Colors.white_color
  },
  cardView:{
    width:mobileW*98/100, 
    margin:mobileW*2/100, 
    backgroundColor:Colors.white_color ,
    borderWidth:mobileW*0.5/100,
    borderColor:'#FAFAFA',
    // elevation:2,
    borderRadius:mobileW*1/100, 
    flexDirection:'row' ,
    alignSelf:'center'
  },
  imageCard:{
    width:mobileW*18/100,
    height:mobileW*18/100,
    borderRadius:mobileW*10/100,
    borderWidth:mobileW*0.4/100,
    borderColor:Colors.themecolor, 
    alignItems:'center',
    justifyContent:'center'
  },
  mavenImage:{
    width:mobileW*16/100,
    height:mobileW*16/100,
    borderRadius:mobileW*2/100, 
    tintColor:Colors.themecolor
  },
  backIcon_top:{
    width:mobileW*6/100,
    height:mobileW*6/100
  }
})