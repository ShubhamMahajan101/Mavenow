import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Stack, TextInput, } from "@react-native-material/core";
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'
import { fonts } from 'react-native-elements/dist/config';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


export default function CreateSyllabus({ navigation }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [refresh, setrefresh] = useState(false);


  const _Save_Next = () => {
    if (title.length <= 0) {
      msgProvider.toast(msgText.Syllabustitle[config.language], 'center')

      return false
    }
    if (description.length <= 0) {
      msgProvider.toast(msgText.Syllabusdiscription[config.language], 'center')

      return false
    }

    clear_data()
    navigation.navigate('CreateTopic')
  }
  // if (title.length <= 0) {
  //   msgProvider.toast(msgText.accountHolderName[config.language], 'center')
  //   return false
  // }
  const clear_data = () => {
    setTitle('')
    setDescription('')
   }

  const _onRefresh = async () => {
    console.log('_onRefresh', '_onRefresh')
    setrefresh(true)
    setTimeout(() => {
      setrefresh(false)
    }, 1200);
  }
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
            tintColor={Colors.themecolor}
            colors={[Colors.themecolor]} />
        } />
                     {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}

        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}  >
            <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
          </TouchableOpacity>
          <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, }}>{Lang_chg.CreateSyllabusTxt[config.language]}</Text>
          <Text></Text>
        </View>

        <View style={{ alignSelf: 'center', width: mobileW * 96 / 100 }}>
          <View style={styles.underLine}></View>
          <Text style={styles.workingHeader}>{Lang_chg.workingtitleTxt[config.language]}</Text>
          <Text style={[styles.workingHeader, { color: Colors.gray }]}>{Lang_chg.changelaterTxt[config.language]}</Text>

          <View>
            <TextInput style={{ marginTop: mobileW * 2 / 100 }}
              fontFamily={Font.FontRegular}
              onChangeText={(txt) => setTitle(txt)}
              color={title == "" ? Colors.red : Colors.themecolor} label={Lang_chg.titleTxt[config.language]} variant="outlined"
              trailing={props => (<Text></Text>)} />
          </View>

          <TextInput style={{ marginTop: mobileW * 2 / 100, }}
            height={mobileW * 50 / 100}
            multiline
            fontFamily={Font.FontRegular}
            paddingTop={mobileW * 2 / 100}
            textAlignVertical={"top"}
            onChangeText={(txt) => setDescription(txt)}
            color={description == "" ? Colors.red : Colors.themecolor} label={Lang_chg.ShortDescriptionTxt[config.language]} variant="outlined"
            trailing={props => (<Text></Text>)} />

        </View>


        {/* <View style={styles.textinput_view}>
      </View> */}

        <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 8 }}>
          <TouchableOpacity activeOpacity={0.8} style={styles.Save_ExitBtn}>
            <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>SAVE & EXIT</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.Save_NextBtn} onPress={() => _Save_Next()}>
            <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontFamily: Font.FontMedium }}>SAVE & NEXT</Text>
          </TouchableOpacity>
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
    width: mobileW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 2 / 100,
    paddingRight: mobileW * 2 / 100,
  },
  HeaderText: {
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 4.3 / 100,
    marginRight: mobileW * 8 / 100
  },
  workingHeader: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 3.5 / 100,
  },
  underLine: {
    width: mobileW * 96 / 100,
    height: mobileW * 0.3 / 100,
    marginTop: mobileW * 2 / 100,
    backgroundColor: Colors.gray,
    fontFamily: Font.FontRegular,
  },
  Save_ExitBtn: {
    width: mobileW * 45 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 2 / 100,
    marginHorizontal: mobileW * 1 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightgray,
  },
  Save_NextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 45 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.themecolor,
    marginHorizontal: mobileW * 1 / 100,
  }
})