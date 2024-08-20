
import { View, ScrollView, StatusBar, ImageBackground, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors, Font } from './Provider/Colorsfont';
import { Stack, TextInput, } from "@react-native-material/core";
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function Support({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 3 / 100 }} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon_} resizeMode='contain'
                source={require("./Icon/bk.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.white_color, marginHorizontal: mobileW * 3/ 100, fontSize: mobileW * 5 / 100,fontFamily:Font.FontMedium,marginTop:mobileW*1/100 }}>{Lang_chg.Supporttext[config.language]}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }}>
            <Image style={styles.backIcon} resizeMode='contain'
              source={require("./Icon/icon_info.png")}></Image>
          </TouchableOpacity>
        </View>


        <View style={{ padding: mobileW * 2 / 100, }}>
        <Text style={{ fontSize: mobileW * 3.8 / 100, color: Colors.black_color, fontWeight: 'bold' }}> are looking forward to providing you support.
         Please fill out information below and a  team member will be with you soon.</Text>

          <View style={{ marginTop: mobileW * 1.12 / 100, }}>
          <TextInput color={Colors.themecolor} label="Question" variant="outlined" trailing={props => (<Text></Text>)} />

          </View>
          <View style={{ marginTop: mobileW * 1.12 / 100 }}>
            <TextInput color={Colors.themecolor} label="Answer" variant="outlined" trailing={props => (<Text></Text>)} />

          </View>

          <View style={styles.inputBoxView}>
            {/* <TextInput
         style={{fontSize:mobileW*5/100,color:Colors.gray,padding:mobileW*2/100,}}
         multiline
        onChangeText={onChangeNumber}
        value={number}
        placeholderTextColor = {Colors.gray}
        placeholder="Hello,"
        // keyboardType="numeric"
      /> */}
          </View>
          {/* ======================================= Submit Button ===================================== */}

            <TouchableOpacity activeOpacity={0.8} style={styles.LoginView}>
            <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color,fontFamily:Font.FontMedium}}>{Lang_chg.SUBMITtext[config.language]}</Text>
            </TouchableOpacity>
        </View>


        <View style={{ bottom: mobileW * 5 / 100, }}>

          <Image style={{ width: mobileW, height: mobileH * 30 / 100, }}
            source={require('./Icon/graphic_new.png')}>

          </Image>

        </View>

      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Header: {
    backgroundColor: Colors.themecolor,
    width: mobileW, height: mobileW * 13/ 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon_: {
    width: mobileW * 9.5 / 100,
    height: mobileW * 9.5/ 100,
    tintColor: Colors.white_color
  },
  backIcon: {
    width: mobileW * 5.5/ 100,
    height: mobileW * 5.5/ 100,
    tintColor: Colors.white_color
  },
  inputBoxView: {
    borderColor: Colors.themecolor,
    marginTop: mobileW * 5 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.8 / 100,
    width: mobileW * 96 / 100,
    alignSelf: 'center',
    height: mobileW * 40 / 100
  },
  LoginView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 3 / 100,
    marginTop: mobileW * 8 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  }
}
)