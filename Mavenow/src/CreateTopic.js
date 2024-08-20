
import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Stack, TextInput, } from "@react-native-material/core";
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'
import { fonts } from 'react-native-elements/dist/config';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DurationTime = [
  {
    id: 1,
    time: 15
  },
  {
    id: 2,
    time: 20
  },
  {
    id: 3,
    time: 25
  },
  {
    id: 4,
    time: 40
  },
  {
    id: 5,
    time: 50
  },
  {
    id: 6,
    time: 60
  },

]



export default function CreateTopic({ navigation }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [count, setCount] = useState('')
  const [duration, setDuration] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const [Timeoutminut, setTimeoutminut] = useState('');
  console.log(Timeoutminut);


  const _Save_Next = () => {
    if (title.length <= 0) {
      msgProvider.toast(msgText.Syllabustitle[config.language], 'center')

      return false
    }
    if (description.length <= 0) {
      msgProvider.toast(msgText.Syllabusdiscription[config.language], 'center')

      return false
    }
    if (count.length <= 0) {
      msgProvider.toast(msgText.Lecturercount[config.language], 'center')

      return false
    }
    if (duration.length <= 0) {
      msgProvider.toast(msgText.Timeduration[config.language], 'center')

      return false
    }
    navigation.navigate('FirebaseTutorial')

  }

  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}

        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}  >
            <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
          </TouchableOpacity>
          <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, }}>{Lang_chg.CreateTopicTxt[config.language]}Science</Text>
          <Text></Text>
        </View>


        <ScrollView style={{ marginBottom: mobileW * 20 / 100 }}>
          <View style={{ alignSelf: 'center', width: mobileW * 96 / 100 }}>
            <View style={{ width: mobileW * 96 / 100, height: mobileW * 0.3 / 100, backgroundColor: Colors.gray, fontFamily: Font.FontRegular, marginTop: mobileW * 2 / 100 }}></View>

            <View >
              <TextInput style={{ marginTop: mobileW * 2 / 100, }}
                onChangeText={(txt) => setTitle(txt)}
                fontFamily={Font.FontRegular}
                color={title == "" ? Colors.red : Colors.themecolor} label={Lang_chg.titleTxt[config.language]} variant="outlined"
                trailing={props => (<Text></Text>)} />
            </View>

            <TextInput style={{ marginTop: mobileW * 2 / 100, }}
              height={mobileW * 52 / 100}
              paddingTop={mobileW * 2 / 100}
              textAlignVertical={"top"}
              fontFamily={Font.FontRegular}
              onChangeText={(txt) => setDescription(txt)}
              multiline
              color={description == "" ? Colors.red : Colors.themecolor} label={Lang_chg.ShortDescriptionTxt[config.language]} variant="outlined"
              trailing={props => (<Text></Text>)} />

            <Text style={styles.lacturerCount}>{Lang_chg.LecturerCountTxt[config.language]}</Text>
            <View>
              <TextInput style={{ marginTop: mobileW * 2 / 100 }}
                onChangeText={(txt) => setCount(txt)}
                keyboardType='numeric'
                fontFamily={Font.FontRegular}
                color={count == "" ? Colors.red : Colors.themecolor} label={Lang_chg.countTxt[config.language]} variant="outlined"
                trailing={props => (<Text></Text>)} />
            </View>
            <Text style={styles.lacturerCount}>{Lang_chg.DurationTxt[config.language]}</Text>
            <TouchableOpacity onPress={() => setDuration(true)}>
              <TextInput style={{ marginTop: mobileW * 2 / 100 }}
                onChangeText={(txt) => setDuration(txt)}
                fontFamily={Font.FontRegular}
                color={duration == "" ? Colors.red : Colors.themecolor} label={Lang_chg.DurationTxt[config.language]} variant="outlined"
                trailing={props => (<Text></Text>)} />
            </TouchableOpacity>
            <Text style={styles.lacturerCount}>{Lang_chg.VideoUrlTxt[config.language]}</Text>
            <View>
              <TextInput style={{ marginTop: mobileW * 2 / 100 }}
                onChangeText={(txt) => setVideoUrl(txt)}
                fontFamily={Font.FontRegular}
                color={videoUrl == "" ? Colors.red : Colors.themecolor} label='Url' variant="outlined"
                trailing={props => (<Text></Text>)} />
            </View>
          </View>
        </ScrollView>

        <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 8 }}>
          <TouchableOpacity activeOpacity={0.8} style={styles.ExitBtn}>
            <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>SAVE & EXIT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _Save_Next()} activeOpacity={0.8} style={styles.NextBtn}>
            <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontFamily: Font.FontMedium }}>SAVE & NEXT</Text>
          </TouchableOpacity>
        </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        <Modal
          animationType='fade'
          transparent={true}
          visible={duration}
        >
          <View style={styles.modal_commission}>
            <View style={[styles.DurationCard]}>
              <View style={styles.DurationModelHeader}>
                <Text style={styles.Alert_text}>Duration:</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setDuration(!duration)}>
                  <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} resizeMode='contain'
                    source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, marginBottom: mobileW * 5 / 100, backgroundColor: '#E7E8EA' }}></View>
              <View style={{ height: mobileW * 60 / 100, padding: mobileW * 3 / 100 }} >
                <FlatList
                  data={DurationTime}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) =>
                    <View>

                      <TouchableOpacity activeOpacity={0.8} onPress={() => setTimeoutminut(item.time)}>
                        <Text style={{ alignSelf: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{item.time}</Text>
                      </TouchableOpacity>

                      <View style={styles.underLine}></View>

                    </View>
                  } />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: mobileW * 3 / 100 }}>
                  <TouchableOpacity activeOpacity={0.8} style={[styles.Ok_CancelBtn, { backgroundColor: Colors.white_color }]} >
                    <Text style={[styles.OK_TExt, { color: Colors.themecolor }]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setDuration(!duration)} style={styles.Ok_CancelBtn} >
                    <Text style={styles.OK_TExt}>{Lang_chg.OkTxt[config.language]}</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 2 / 100,
    paddingRight: mobileW * 2 / 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  underLine: {
    width: mobileW * 90 / 100,
    height: mobileW * 0.5 / 100,
    backgroundColor: Colors.gray,
    marginTop: mobileW * 4 / 100,
    marginBottom: mobileW * 4 / 100
  },
  lacturerCount: {
    fontSize: mobileW * 3.5 / 100,
    fontFamily: Font.FontMedium,
    color: Colors.black_color,
    marginTop: mobileW * 2 / 100
  },
  ExitBtn: {
    width: mobileW * 45 / 100,
    height: mobileW * 12 / 100,
    backgroundColor: Colors.lightgray,
    marginHorizontal: mobileW * 1 / 100,
    borderRadius: mobileW * 2 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  NextBtn: {
    width: mobileW * 45 / 100,
    height: mobileW * 12 / 100,
    backgroundColor: Colors.themecolor,
    marginHorizontal: mobileW * 1 / 100,
    borderRadius: mobileW * 2 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal_commission: {
    flex: 1,
    // paddingVertical:mobileH*7/100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000060'
  },
  DurationCard: {
    width: mobileW * 90 / 100,
    // height:mobileH*90/100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5
  },
  DurationModelHeader: {
    width: mobileW * 90 / 100,
    // marginBottom: mobileW * 5 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mobileW * 13 / 100,
    borderTopLeftRadius: mobileW * 3 / 100,
    borderTopRightRadius: mobileW * 3 / 100,
    paddingLeft: mobileW * 2 / 100,
    paddingRight: mobileW * 2 / 100,
    backgroundColor: Colors.white_color
  },
  Alert_text: {
    color: Colors.black_color,
    fontSize: mobileW * 4.5 / 100,
    fontFamily: Font.FontMedium
  },
  Ok_CancelBtn: {
    width: mobileW * 22 / 100,
    height: mobileW * 8 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderColor: Colors.themecolor,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: mobileW * 2 / 100,
    // marginBottom: mobileW * 3 / 100,
    marginHorizontal: mobileW * 1 / 100
  },
  OK_TExt: {
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontMedium,
    color: Colors.white_color
  },
})