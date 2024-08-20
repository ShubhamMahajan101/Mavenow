import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Button, FlatList ,RefreshControl } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { RadioButton } from 'react-native-paper';
import { StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { isMatchWithOptions } from 'date-fns/fp';

const Language = ({ navigation }) => {
  const [refresh, setrefresh] = useState(false);
  const [language, setlanguage] = useState()
  const [State, setlanguage11] = useState();
  console.log(State, "--------------------> State");

  // -----------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    apiCalling();
  }, [])

  const apiCalling = () => {
    axios.get('https://mavenow.com:8001/user/GetLanguages')
      .then(res => {
        const nameList = res.data.result;
        // const imageArray = nameList.result;
      for(let i=0;i<nameList.length;i++){
        nameList[0].toggle = true
        setlanguage(nameList[0].name)
        //  manage through api    
        config.language = 0
      }
      setlanguage11([...nameList]);
      })
      .catch(function (error) {
        console.log('---------->', error);
      });
  }
  // ------------------------------------------------------------------------------------------------------------------------

  const setSelectedIndex1 = (item ,index) => {
    console.log('-----------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',item);

    // [
    // {"code": "en", "enumid": 1, "id": 1, "isactive": 1, "isdelete": 0, "lan_name": "English", "lcid": 1033, "name": "English", "toggle": false}, 
    // {"code": "fr", "enumid": 2, "id": 2, "isactive": 1, "isdelete": 0, "lan_name": "Français", "lcid": 1036, "name": "French", "toggle": false}, 

    // {"code": "hi", "enumid": 3, "id": 3, "isactive": 1, "isdelete": 0, "lan_name": "??????", "lcid": 1001, "name": "Hindi", "toggle": false}, 
    // {"code": "th", "enumid": 4, "id": 4, "isactive": 1, "isdelete": 0, "lan_name": "???", "lcid": 1054, "name": "Thai", "toggle": false}, 
    // {"code": "ar", "enumid": 5, "id": 5, "isactive": 1, "isdelete": 0, "lan_name": "????", "lcid": 1025, "name": "Arabic", "toggle": false}, 
    // {"code": "nl", "enumid": 6, "id": 6, "isactive": 1, "isdelete": 0, "lan_name": "Nederlands", "lcid": 1043, "name": "Dutch", "toggle": false}, 
    // {"code": "es", "enumid": 7, "id": 7, "isactive": 1, "isdelete": 0, "lan_name": "Española", "lcid": 10, "name": "Spanish", "toggle": false}, 
    // {"code": "zh", "enumid": 8, "id": 8, "isactive": 1, "isdelete": 0, "lan_name": "???", "lcid": 2052, "name": "Chinese", "toggle": true}]


for(let i=0;i<=State.length;i++){
  
  if(item.code=="en"){
    config.language = 0

  } if(item.code=="hi"){
    config.language = 1

  }if(item.code=="es"){
    config.language = 2
  }
  if(item.code=="nl"){
    config.language = 3
  }
  if(item.code=="fr"){
    config.language = 4
  }
  if(item.code=="th"){
    config.language = 5
  }
  if(item.code=="ar"){
    config.language = 6
  }
  if(item.code=="zh"){
    config.language = 7
  }
}
      State.forEach((elem) => {
      elem.toggle = false
      if (elem.id === item.id) {
        elem.toggle = true
        setlanguage(elem.name)
      }
    })
  setlanguage11([...State]);
   };



   const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
    }, 1000);
  }



  return (

        <View style={{ flex: 1, }}>
        <SafeAreaView style={styles.SafeAreaView__View}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View style={styles.Header}>

        <TouchableOpacity activeOpacity={0.8}  onPress={() => navigation.goBack()}>
        <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
        </TouchableOpacity>
        <Text style={styles.LANGUAGE}>{Lang_chg.LanguageTxt[config.language]}</Text>
        <Text style={styles.LANGUAGE}> </Text>

        </View>
        <ScrollView refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
          tintColor={Colors.themecolor}
          colors={[Colors.themecolor]} />
      }>
     
            <View style={{ marginTop: mobileW * 2 / 100, alignItems: 'center' }}>
            <FlatList
            data={State}
            numColumns={2}
            renderItem={({ item,index }) =>
              <View style={{marginTop:mobileW*5/100}}>

<TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedIndex1(item)} style={styles.languageText}>
                      <Text style={styles.lan_name}>{item.lan_name}</Text>
                      <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', }}>
                      <View style={{ width: mobileW * 22 / 100, alignSelf: "center",  }}>
                     
                      <Text style={{ color: Colors.gray, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontRegular }}>{item.name}</Text>
                      </View>
                   <TouchableOpacity activeOpacity={0.8}onPress={() => setSelectedIndex1(item)} style={[{ borderColor: item.toggle ? Colors.themecolor : Colors.gray },styles.redioButtonBorder]}>
                      <View  style={[{ backgroundColor: item.toggle ? Colors.themecolor : Colors.white_color, },styles.redioButtonbackground]}></View>
                      </TouchableOpacity>
                      </View>
                      </TouchableOpacity>


                {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedIndex1(item,index)}>
                  <View style={styles.language_view}>
                    <View style={styles.lan______nameview}>
                      <Text style={styles.lan______name}>{item.lan_name}</Text>
                      <Text style={styles.NAme}>{item.name}</Text>
                        </View>
      <View style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, borderRadius: mobileW * 10 / 100, borderColor: item.toggle ? Colors.themecolor : Colors.gray,
      borderWidth: mobileW * 0.50 / 100, marginTop: mobileW * 3 / 100, margin: mobileW * 2 / 100, alignSelf: "center", justifyContent: "center", alignItems: 'center'}}>
      <View style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100, borderRadius: mobileW * 10 / 100, backgroundColor: item.toggle ? Colors.themecolor : Colors.white_color,
       alignSelf: "center",justifyContent: "center", alignItems: 'center'}}>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity> */}
              </View>}/>

        </View>


            <TouchableOpacity activeOpacity={0.8} style={styles.done__view} onPress={() => navigation.navigate('UserMaven')}>
            <Text style={styles.donetext}>{Lang_chg.DoneTxt[config.language]}</Text>
            </TouchableOpacity>
</ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  lan______nameview: {
    width: mobileW * 21 / 100,
    alignSelf: "center",
    margin: mobileW * 2 / 100
  },
  done__view: {
    backgroundColor: Colors.themecolor,
    width: mobileW * 92 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 2 / 100,
    marginTop:mobileW*5/100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  donetext: {
    color: Colors.white_color,
    fontSize: mobileW * 4.5 / 100,
    fontFamily:Font.FontMedium
  },
  NAme: {
    color: Colors.gray,
    fontSize: mobileW * 3.5 / 100,
    fontFamily:Font.FontRegular
  },
  language_view: {
    backgroundColor: Colors.white_color,
    flexDirection: "row",
    borderRadius: mobileW * 1 / 100,
    margin: mobileW * 2.5 / 100,
    padding: mobileW * 2 / 100,
    width: mobileW * 42 / 100,
    justifyContent: "space-between",
    height: mobileW * 18.8 / 100,
    borderWidth: mobileW * 0.24 / 100,
    borderColor: Colors.gray,
    elevation: mobileW * 0.45 / 100

  },
  lan______name: {
    color: Colors.gray,
    fontSize: mobileW * 4 / 100,
    fontFamily:Font.FontMedium
  },
  SafeAreaView__View: {
    flex: 1,
    backgroundColor: Colors.white_color,
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW, height: mobileW * 15 / 100,
    paddingLeft:mobileW*4/100,
    paddingRight:mobileW*4/100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  LANGUAGE:{ 
    color: Colors.black_color, 
    fontFamily:Font.FontSemiBold, 
    fontSize: mobileW * 4 / 100, 

  },
  FlatList_______View:{ 
    margin: mobileW * 3 / 100, 
    flexDirection: "column", 
    alignItems: "center" 
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
},

  backIcon_: {
    width: mobileW * 6/ 100,
    height: mobileW * 6/ 100,
    tintColor: Colors.black_color
  },

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  languageText: {
    backgroundColor: Colors.white_color,
    padding:mobileW*3.5/100,
    // flexDirection: "row",
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 2.3 / 100,
    // alignItems:'center',
    width: mobileW * 37 / 100,
    
    // justifyContent: "space-between",
    height: mobileW * 20 / 100,
    borderWidth: mobileW * 0.1 / 100,
    borderColor: Colors.gray,
    elevation: mobileW * 0.45 / 100
  },
  lan_name: {
    color: Colors.gray,
    fontSize: mobileW * 4 / 100,
    fontFamily:Font.FontMedium,
    alignSelf:'flex-start'
  },
  redioButtonBorder: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    borderRadius: mobileW * 5 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: mobileW * 0.55 / 100,
    marginTop: mobileW * -3 / 100,
    // margin: mobileW * 2 / 100
  },
  redioButtonbackground: {
    width: mobileW * 3 / 100,
    height: mobileW * 3 / 100,
    borderRadius: mobileW * 5 / 100,
    // borderColor:Colors.redColor
  },
});

export default Language;