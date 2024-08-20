import { StatusBar, ScrollView, Animated, RefreshControl, FlatList, View, Text, Dimensions, TouchableOpacity, Modal, Image, StyleSheet, Alert,SafeAreaView } from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import UserSliderDot from './UserSliderDot';
import { Colors, Font } from './Provider/Colorsfont';
import { localStorage } from './Provider/localStorageProvider';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import axios from 'axios';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const Viewall=({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
  return (
         <View style={{flex:1}}>
         <SafeAreaView style={{backgroundColor:Colors.themecolor,flex:1}}>
         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />

         <View style={{backgroundColor:Colors.white_color,flex:1}}>

<View style={styles.Header}>

<TouchableOpacity  activeOpacity={0.8} onPress={() => navigation.goBack()}>
<Image style={styles. backIcon_TOP} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
</TouchableOpacity>
<Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, width: mobileW * 65 / 100 }}>{Lang_chg.MavenSuggestiontxt[config.language]}</Text>

<View style={{flexDirection:'row', alignItems:'center',}}>
<TouchableOpacity onPress={() => navigation.navigate('Search')} activeOpacity={0.8} style={{ width: mobileW * 8 / 100, height: mobileW * 8 / 100,  alignItems: 'center', justifyContent: 'center', borderRadius: mobileW * 2 / 100,  }}>
     <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_search.png")}></Image>
   </TouchableOpacity>
 
   <TouchableOpacity activeOpacity={0.8}  onPress={() => setModalVisible(true)}>
   <Image style={styles.backIcon} resizeMode='contain'
     source={require("./Icon/about.png")}></Image>
 </TouchableOpacity>
 </View>

</View>
</View>

            <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060', }}>
            <View style={{ width: mobileW * 90 / 100, }}>
            <View style={styles.modalHeader}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
            
            <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium,marginLeft:mobileW*3/100 }}>Help : Other Profile</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange, marginRight: mobileW * 3 / 100 }} resizeMode='contain'
            source={require("./Icon/close2.png")}></Image>
            </TouchableOpacity>
            </View>
            </View>

                <View style={styles.helpmodaTextview}>
                  <ScrollView>
                    <Text style={{ color: Colors.gray ,fontSize:mobileW*3/100,fontFamily:Font.FontRegular}}>Kalam earned a degree in aeronautical engineering from the
                      Madras Institute of Technology and in 1958 joined the Defence Research and Development
                      Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                      was project director of the SLV-III, the first satellite launch vehicle that was both designed
                      and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
                      rn him the ni

                      was project director of the SLV-III, the first satellite launch vehicle that was both designed
                      and produced in India. Rejoining DRDO
                      in 1982, Kala
                      m planned the progra
                      ganisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                      was project director of the SLV-III, the first satellite launch vehicle that was both designed
                      and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
                      rn him the ni
                      Organisation (DRDO). In 1969 he moved to the Indian
                      Space Research Organisation, where he
                      was project director of the SLV-III, the first satellite launch vehicle that was both designed
                      and produced in India. Rejoining DRDO
                      in 1982, Kala
                      on, where he
                      was project director of the SLV-III, the first satellite launch vehicle that was both designed
                      and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
                      rn him the ni
                      Organisation (DRDO). In 1969 he moved to the Indian
                      Space Research Organisation, where he
                      was project director of the SLV-III, the first sa

                      of successful missiles, which helped earn him the nickname ?Missile Man.? Among those successes was Agni, India?s first
                      intermediate-range ballistic missile, which incorporated aspect
                      SLV-III and was launched in 1989.</Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        </View>
       
  </SafeAreaView>
  </View>
  )
}
export default Viewall;
const styles=StyleSheet.create({
    Header: {
        backgroundColor: Colors.white_color,
        width: mobileW, height: mobileW * 15 / 100,
        paddingLeft:mobileW*4/100,
        paddingRight:mobileW*4/100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      backIcon: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.black_color,
      },
      backIcon_TOP: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.black_color
      },
      SearchIcon: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        marginRight:mobileW * 2 /100,
        tintColor: Colors.black_color, 
      },
      modalHeader: {
        backgroundColor: Colors.white_color,
        height: mobileW * 12 / 100,
        justifyContent: "center",
        borderTopLeftRadius: mobileW * 3 / 100,
        borderTopRightRadius: mobileW * 3 / 100
      },
      modalCard: {
        width: mobileW * 90 / 100,
        borderRadius: mobileW * 3 / 100,

        backgroundColor: Colors.white_color,
        elevation: 5
      },
      helpmodaTextview: {
        backgroundColor: Colors.whiteColor,
        elevation: mobileW * 3 / 100,
        padding: mobileW * 3 / 100,
        borderBottomRightRadius: mobileW * 4 / 100,
        borderBottomLeftRadius: mobileW * 4 / 100,
        textAlign: "center"
      },

})
