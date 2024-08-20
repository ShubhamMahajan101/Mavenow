
import { View,ScrollView,StatusBar,Modal,Alert,FlatList, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
    {
      id: 1,
      image: require('./Icon/galley_placeholder.png'),
      title:'test',
      description:'this is only test',
      awards:'Awarded on:27, Sep 2022',
    },
    {
      id: 2,
      image: require('./Icon/ic_coach_w.png'),
      title:'Teaching completion',
      description:'Get badge on complete first successful teaching request',
      awards:'Awarded on:19, Jul 2022',
    },
   
  ]

export default function LearnerBadges({navigation}) {
  return (
    <View style={{ flex: 1, }}>
    <SafeAreaView style={{ flex: 1,backgroundColor:Colors.white_color }}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ={Colors.themecolor} />
            {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
            <View style={styles.Header}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
     <TouchableOpacity activeOpacity={0.8} style={{marginHorizontal:mobileW*5/100}} onPress={()=>navigation.goBack()}>
            <Image style={styles.backIcon} resizeMode='contain'
               source={require("./Icon/icon_back.png")}></Image>
           </TouchableOpacity>
<Text style={{color:Colors.white_color, marginHorizontal:mobileW*5/100, fontWeight:'500', fontSize:mobileW*5/100}}>Badges</Text>
</View>
<TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}  style={{marginRight:mobileW*2/100}} >
            <Image style={styles.backIcon} resizeMode='contain'
               source={require("./Icon/icon_info.png")}></Image>
           </TouchableOpacity>
</View>
{/* ==============================================================Flatlist================================================================= */}
<ScrollView style={{}}>
<FlatList
            data={DATA}
            renderItem={({ item, index }) =>
          <View>
            <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:Colors.light_cyan,padding:mobileW*2/100, width:mobileW*98/100,  margin:mobileW*1/100, flexDirection:'row',alignItems:'center'}}>
     <View style={{width:mobileW*30/100,alignItems:'center',justifyContent:'center', }}> 
    <Image resizeMode='contain' style={{width:mobileW*30/100, height:mobileW*20/100}} 
    source={item.image}></Image>
   </View> 
    <View style={{ width:mobileW*70/100, padding:mobileW*3/100}}>
    <Text style={{fontSize:mobileW*4/100,color:Colors.black_color, fontWeight:'500' }}>{item.title}</Text>
    <Text style={{fontSize:mobileW*3.2/100,color:Colors.black_color, fontWeight:"500", marginTop:mobileW*2/100  }}>{item.description}</Text>
    <Text style={{fontSize:mobileW*3.2/100,color:Colors.gray, fontWeight:"500" , marginTop:mobileW*2/100 }}>{item.awards}</Text>

    </View>
</TouchableOpacity> 
          </View>
          }
           keyExtractor={item => item.id}/>
          </ScrollView>
      </SafeAreaView>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
  flex:1
    },
    Header:{
        backgroundColor:Colors.themecolor, 
        width:mobileW, height:mobileW*15/100, 
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between'
      },
    backIcon:{ 
      width: mobileW * 6 / 100, 
      height: mobileW * 6  / 100, 
      tintColor: Colors.white_color 
    },
}
)