
import { View,ScrollView,StatusBar, Text, SafeAreaView,TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React,{useState, useEffect} from 'react';
import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, apifuntion, msgTitle, Font,  localimag,
  SocialLogin } from './Provider/utilslib/Utils';
import { Colors } from './Provider/Colorsfont';
import axios from "axios"
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
export default function QuestionPage({navigation}) {
  const [keywordstring, setKeywordstring] = useState('');
  // const [State, setlanguage11] = useState('');
  // const [keywordstring, setKeywordstring] = useState('');
  const _loginBtn=async()=>{
//------------------First name===================

if (keywordstring.length > 1) {

  // msgProvider.toast(msgText.emptyFirstName[config.language], 'center')
  
 { navigation.navigate('Testing',{item:keywordstring})}
  // return false
}else{
  msgProvider.toast(msgText.writeyourquestion[config.language], 'center')
}
  }

  return (
    <View style={{ flex: 1, }}>
    <SafeAreaView style={{ flex: 1, backgroundColor:Colors.white_color }}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ={Colors.themecolor} />
      <View style={styles.Header}>
     <TouchableOpacity activeOpacity={0.8} style={{marginHorizontal:mobileW*0/100}} onPress={()=>navigation.goBack()}>
            <Image style={styles.backIcon_} resizeMode='contain'
               source={require("./Icon/bk.png")}></Image>
           </TouchableOpacity>
<Text style={{color:Colors.white_color, marginHorizontal:mobileW*5/100, fontWeight:'500', fontSize:mobileW*5/100}}>Write your Question</Text>
</View>
<ScrollView>
  <View style={{padding:mobileW*2/100}}>
    <Text style={{color:Colors.themecolor,fontSize:mobileW*4/100}}>Please post problem below, you will get instant solution soon!</Text>
 
 <View style={styles.inputBoxView}>
    <TextInput
         style={{fontSize:mobileW*5/100,color:Colors.gray,padding:mobileW*2/100,}}
         multiline
        onChangeText={newText => setKeywordstring(newText)}
        value={keywordstring}
        placeholderTextColor = {Colors.gray}
        placeholder="Write your Question"
        // keyboardType="numeric"
      />
      </View>
      {/* onPress={()=>navigation.navigate('Testing')} */}
       {/* ======================================= Post Botton ===================================== */}
           <TouchableOpacity activeOpacity={0.8} onPress={()=>_loginBtn()}  style={styles.LoginView}>
            <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.white_color, fontWeight: '500' }}>POST QUESTION</Text>
           </TouchableOpacity>
           <View style={{bottom:0, marginTop:mobileW*20/100}}>
           <Image resizeMode='contain' style={{width:mobileW*96/100, height:mobileW*60/100, }}
           source={require('./Icon/graphic_new.png')}></Image>
           </View>
  </View>
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
    alignItems:'center'
  },
  backIcon:{ 
    width: mobileW * 6 / 100, 
    height: mobileW * 6 / 100, 
    tintColor: Colors.white_color 
  },
  backIcon_:{ 
    width: mobileW *11/ 100, 
    height: mobileW * 11 / 100, 
    tintColor: Colors.white_color 
  },
  inputBoxView:{
    borderColor:Colors.themecolor, 
    marginTop:mobileW*5/100,
    borderRadius:mobileW*2/100,  
    borderWidth:1,
    width:mobileW*96/100,
    alignSelf:'center', 
    height:mobileW*70/100
  },
  LoginView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        width:mobileW*90/100,
        height: mobileW * 12 / 100,
        backgroundColor: Colors.themecolor,
        borderRadius: mobileW * 3 / 100,
        marginTop: mobileW * 5 / 100,
        elevation: 1,
        shadowColor: '#000',
        borderColor: "#e8edfb",
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        shadowOpacity: 0.1,
      },
})