import React, { useState, useEffect, useRef, memo } from 'react';
import { FlatList, Text, Alert, BackHandler, ScrollView, Modal, ImageBackground, StatusBar, View, StyleSheet, Keyboard, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, RefreshControl } from 'react-native'
import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, apifuntion, msgTitle, Font, Colors, mobileH, mobileW, localimag, SocialLogin } from './Provider/utilslib/Utils';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { log } from 'react-native-reanimated';
import UserMaven from './UserMaven';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { fonts } from 'react-native-elements/dist/config';

const Level = [
  { label: Lang_chg.BasicTxt[config.language], value: '1' },
  { label: Lang_chg.MediumTxt[config.language], value: '2' },
  { label: Lang_chg.AdvanceTxt[config.language], value: '3' },

];

export default function Chat({ navigation, route }) {
  const [shouldShow, setShouldShow] = useState(true);
  const [Continue, setcontinue] = useState(false)
  const [checked, setChecked] = useState('Basic')
  const [checkedData, setCheckedData] = useState('')
  console.log('you select level', checkedData);
  const [inputHeight, setInputHeight] = useState(0);
  const [ModalVisible_Gif, setModalVisible_loadergif] = useState(false);
  const [modalVisible_GIF, setModalVisible_GIF] = useState(false);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [Button, setbutton] = useState('yes')
  const [hide, sethide] = useState(true)
  const [refresh, set_refresh] = useState(false);
  const [userId, set_userId] = useState('');
  const [userType, set_userType] = useState('');
  const [message, setmessage] = useState('')
  const [data, setData] = useState('')
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [keyword, setKeyword] = useState([]);
  const [listArry, setlistArry] = useState([]);
  // console.log("All Keywords++++++++", listArry);

  console.log(question);
  console.log(answer);

  useEffect(() => {
    getuserId();
    if (isFocused) {
    }
  }, [isFocused]);


  const getuserId = async () => {
    var UserData = await localStorage.getItemObject('user_arr');
    var user_id = UserData._id
    var user_type = UserData.userType
    console.log('UserData---', UserData, '----------', user_id);
    console.log('UserData---', UserData, '----------', user_type);
    set_userId(user_id)
    set_userType(user_type)
  }

  const sendMessagesss = () => {

    if (message == '') {
      sethide(hide)
      // setModalVisible(true);
      return false
    }
    setModalVisible_GIF(true)

    sethide(false)
    console.log(message, "i am in no calling", userId);

    let data = JSON.stringify({
      userId: userId,
      question: message
    });

    let configuratin = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://mavenow.com:8989/sendQuestion',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(configuratin)
      .then((response) => {
        console.log("API Call Here ===", response);
        var IsScucceded = response.data.ErrorCode;
        var ErrorMessage = response.data.ErrorMessage;

        if (IsScucceded == 200) {
          setModalVisible_GIF(false)
          console.log("API Response.............. .", response.data);
          var responseData = response.data.sendQuestion
          var getDate = responseData.data
          var Keywords = responseData.keyword

          var buttonset = Keywords;
          for (let i = 0; i < buttonset.length; i++) {
            console.log(buttonset[i]);
            buttonset[i].IsSuggested = false
          }
          console.log(buttonset, ".....................??");
          setKeyword(buttonset)

          console.log("you are answer=================", getDate.answer);
          setQuestion(getDate.question)
          var ansData = getDate.answer
          const t = ansData.replace('"', ' ')
          const LineChangedData = t.replace(/\\n/g, '\n');
          setAnswer(LineChangedData)
          // console.log(LineChangedData, 'hello i am here ');

        } else {
          console.log("API Call Here ===111111111111111111111");
          alert(ErrorMessage)
        }
        var IdArray = [];
        for (let i = 0; i < Keywords.length; i++) {
          console.log("All Id GEt data", Keywords[i].id);
          IdArray.push(Keywords[i].id)
        }

        setlistArry(IdArray)
      })
      .catch((error) => {
        console.log(error);
        alert(error)
      });
  }

  const keywordArray = () => {
    if (Button == 'yes') {
      console.log("you press no button");
      kerwordnotselected()
    } else {
      sendMessagesss()
      setTimeout(() => {
        navigation.navigate('UserMaven')
        console.log("you navigate no button side");
      }, 2000);
    }
  }

  const kerwordnotselected = () => {
    var data = JSON.stringify({
      keywordIds: listArry,
      userId: userId,
      userType: userType,
      level: 3

    });
    console.log("Appi ", data);
    console.log("Yes i am in api calling");
    var config1 = {
      method: 'post',
      url: config.baseURL + 'createUserKeyword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config1)
      .then(async (response) => {

        var IsScucceded = response.data.ErrorCode;
        var ErrorMessage = response.data.ErrorMessage;

        if (IsScucceded == 200) {
          // var data1 = response.data
          // console.log("Second API Call......", data1);
          var Allkeyword = response.data.createUserKeyword
          console.log('Keyword Array Here ++++++++++++++', Allkeyword)
          await localStorage.setItemObject('KeyArry', Allkeyword);
          setTimeout(() => {
            navigation.navigate('UserMaven')
          }, 2000);
        } else {

          alert(ErrorMessage)
        }
      })
      .catch((error) => {
        alert(error)
      });
  }

  const [keyarray1111, setkeyarray1111] = useState([])

  const List2 = async (item) => {
    // console.log('item------',item);
    // console.log('keyword------',keyword);
    const newState = keyword.map(obj => {
      if (obj.id === item.id) {
        if (obj.IsSuggested == true) {
          return { ...obj, IsSuggested: false };

        } else {
          // setcontinue(false)
          var buttonid = item.key
          keyarray1111.push(buttonid)
          return { ...obj, IsSuggested: true };
        }
      }

      return obj;
    });
    setKeyword(newState);
    console.log(keyarray1111, "...............>> .......");

  };

  // ___________________-message send____________________________
  const refreshControl = () => {
    set_refresh(true)
    setTimeout(() => {
      set_refresh(false)

    }, 2000);
  }

  return (
    <View style={styles.container}>
      {/* ----------- App Headder --------------- */}
      <SafeAreaView style={{ backgroundColor: Colors.themecolor }}></SafeAreaView>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
      <View style={styles.header_View}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon_Arrow} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
        </TouchableOpacity>
        <Text style={styles.personname}>{Lang_chg.ChatboatTxt[config.language]}</Text>
        <Text style={styles.personname}> </Text>
      </View>

      {/* --------------------- Gif Image Start ------------------ */}
      {shouldShow ? (
        <View style={{ alignItems: "center", marginTop: mobileH * 10 / 100, }}>

          <Image resizeMode='contain' style={{ width: mobileW * 95 / 100, height: mobileW * 70 / 100 }} source={require("./Icon/Render_1.gif")} />
          <Text style={styles.WelcomeText}>{Lang_chg.WelcomeMavenowTxt[config.language]}</Text>
          <Text style={styles.solutiontext}>Solutions For Any plights,Mavenow Got Your Back Alright! inme se koi sahi nhi beth rha h?</Text>
          <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
            <Image resizeMode='contain' style={styles.GIFImages} source={require("./Icon/gif.png")}/>

          </TouchableOpacity>
        </View>) :
        (<ImageBackground resizeMode='contain' style={{ flex: 1, width: "100%", height: '100%', }}
          source={require('./Icon/Man_thinking-pana_1.png')}>
          <SafeAreaView style={styles.SafeArea_____view} />
          <StatusBar
            hidden={false}
            backgroundColor={Colors.themecolor}
            translucent={false}
            networkActivityIndicatorVisible={true} />

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={refreshControl}
                tintColor={Colors.themecolor}
                colors={[Colors.themecolor]}
              />
            }>

            <KeyboardAvoidingView style={[styles.messageList, { marginBottom: inputHeight + hp('12%') }]}
              behavior={Platform.OS === 'android' ? null : 'padding'}
              keyboardVerticalOffset={Platform.OS === 'android' ? 0 : inputHeight + hp('7%')}>
              <View>

                {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Chat Section ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                <View>
                  <View style={{ width: mobileW, padding: mobileW * 3 / 100, flex: 1 }}>
                    <Text style={{ fontSize: mobileW * 4 / 100, width: mobileW * 85 / 100, paddingBottom: mobileW * 3 / 100, color: Colors.dark_gray, fontFamily: Font.FontRegular }}>{Lang_chg.solutionsoonTxt[config.language]}</Text>
                    {hide == false &&
                      <View style={{ maxWidth: Dimensions.get('window').width / 1.5 + 10, alignSelf: 'flex-end' }}>
                        <View style={styles.questionView}>
                          <Text style={{ padding: 10, fontSize: 16, fontFamily: Font.FontRegular, color: Colors.themecolor }}>{message}

                          </Text>
                        </View>
                      </View>}

                    {answer != "" ?
                      <View style={{ maxWidth: Dimensions.get('window').width / 1.3 + 10, alignSelf: 'flex-start', marginTop: mobileW * 4 / 100, }}>
                        <View style={styles.answerView}>

                          <Text style={{ padding: 10, fontSize: mobileW * 4 / 100, fontFamily: Font.FontRegular, color: Colors.black_color }}>{answer}
                          </Text>
                        </View>
                      </View> : <View >
                        {modalVisible_GIF == true &&
                          <View >
                            <Image style={styles.Gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>
                          </View>}
                      </View>}
                  </View>

                  {answer != '' &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: mobileW * 3 / 100, alignSelf: 'center' }}>
                      <Text style={{ color: Colors.themecolor, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Satisfied Answer</Text>

                      <TouchableOpacity activeOpacity={0.8} onPress={() => { setbutton('yes'), setModalVisible_loadergif(true) }} style={styles.yesBtn}>

                        <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.YESTxt[config.language]}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => setbutton('no')} style={styles.noBtn}>
                        <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.NOTxt[config.language]}</Text>
                      </TouchableOpacity>
                    </View>
                  }

                  {Button == 'no' &&
                    <View>
                      <Text style={styles.selectKeywords_text}>Please Select Suitable Keywords To Define Your Requirements</Text>
                      <FlatList
                        data={keyword}
                        numColumns={4}
                        contentContainerStyle={{ width: '100%', alignSelf: 'center', padding: mobileW * 2 / 100 }}
                        horizontal={false}
                        columnWrapperStyle={{ flexWrap: 'wrap' }}
                        renderItem={({ item, obj }) =>
                          <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => List2(item)} activeOpacity={0.8} style={[styles.keywordView, { backgroundColor: item.IsSuggested ? Colors.themecolor : Colors.white_color }]}>
                              <Text style={{ color: item.IsSuggested ? Colors.white_color : Colors.gray, fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular }}>{item.key}</Text>
                            </TouchableOpacity>
                          </View>}
                      />

                      {keyarray1111.length > 0 &&
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loadergif(true)} style={styles.CONTINUE}>
                          <Text style={styles.CONTINUE___text}>CONTINUE</Text>
                        </TouchableOpacity>}
                    </View>
                  }

                </View>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisible_Gif}>
                <View style={{ flex: 1, backgroundColor: '#00000060', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <View style={{ backgroundColor: Colors.white_color, height: mobileW * 70 / 100, borderTopLeftRadius: mobileW * 5 / 100, borderTopRightRadius: mobileW * 5 / 100, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: mobileW * 3 / 100, }}>
                      <Text style={styles.levelselect_text}>{Lang_chg.SelectLevelTxt[config.language]}</Text>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loadergif(!ModalVisible_Gif)}>
                        <Image resizeMode='contain' style={styles.closeIcon}
                          source={require('./Icon/close2.png')}></Image>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.under________line}></View>
                    <View style={{ alignItems: "center", alignSelf: "center", }}>
                      <Text style={styles.static__text}>We have whom can help  you immediately to fix your problem would like to connect level of maven experties.</Text>
                    </View>

                    <View style={{ height: mobileH * 12 / 100, alignItems: 'center', justifyContent: 'center', }}>
                      <FlatList
                        data={Level}
                        horizontal
                        contentContainerStyle={{ height: mobileH * 12 / 100, alignItems: 'center', justifyContent: 'center' }}
                        renderItem={({ item }) =>
                          <View style={{}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { setChecked(item.value), setCheckedData(item) }}
                              style={[styles.levelBtn, { borderColor: checked === item.value ? Colors.themecolor : Colors.gray, }]}
                            >
                              {checked == item.value ?
                                <Image resizeMode='contain' style={styles.iconTick} source={require('./Icon/icon_tick.png')} /> :
                                <Image resizeMode='contain' style={{
                                  width: mobileW * 4 / 100, height: mobileW * 4 / 100, alignSelf: 'flex-end',
                                  tintColor: Colors.white_color
                                }} source={require('./Icon/icon_tick.png')}
                                />
                              }
                              <Text style={{ fontSize: mobileW * 4 / 100, color: checked === item.value ? Colors.themecolor : Colors.gray, marginTop: mobileW * -2 / 100, fontFamily: Font.FontRegular }}>{item.label}</Text>
                            </TouchableOpacity>
                          </View>}
                        keyExtractor={item => item.id} />
                    </View>

                    <View style={[styles.BUTTON____________,]}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loadergif(!ModalVisible_Gif)} style={styles.CancleButton}>
                        <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.blackColor, fontFamily: Font.FontMedium }}>{Lang_chg.CANCELTxt[config.language]}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity activeOpacity={0.8} onPress={() => keywordArray()} style={styles.RbsubmitButton}>
                        <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontFamily: Font.FontMedium }}>{Lang_chg.SUBMITTxt[config.language]}</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </Modal>

            </KeyboardAvoidingView>


          </ScrollView>
          <KeyboardAvoidingView
            style={{
              position: 'absolute',
              bottom: wp('1.2%'),
              width: '97.5%',
              marginHorizontal: wp('1.2%')
            }}
            behavior={Platform.OS === 'android' ? null : 'position'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 0 : mobileH * 5 / 100}
            enabled>

            {hide ? (
              <View style={styles.bottom___view}>
                <View onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)} style={styles.text_inputview}>
                  <TextInput
                    maxLength={1000}
                    placeholderTextColor={Colors.border_color}
                    color={Colors.black_color}
                    multiline={true}
                    value={message}
                    placeholder='Type Here...'
                    onChangeText={(text) => setmessage(text)}
                    style={styles.text_inputmsg}>
                  </TextInput>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.send__msg}
                    onPress={() => { sendMessagesss(), setShouldShow(false) }}
                  // onPress={() => { sendMessagesss(), setShouldShow(!shouldShow) }}
                  >
                    <Image
                      resizeMode='contain'
                      style={styles.msg_______icon}
                      source={require('./Icon/SendMessage.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </KeyboardAvoidingView>
        </ImageBackground>)}
      {/* --------------------- Gif Image End ------------------ */}
      {/* <KeyboardAvoidingView
        style={{
          position: 'absolute',
          bottom: wp('1.2%'),
          width: '97.5%',
          marginHorizontal: wp('1.2%')
        }}
        behavior={Platform.OS === 'android' ? null : 'position'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 0 : mobileH * 5 / 100}
        enabled> 
        {hide ? (

          <View style={styles.bottom___view}>
            <View onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)} style={styles.text_inputview}>
              <TextInput
                maxLength={1000}
                placeholderTextColor={Colors.border_color}
                color={Colors.black_color}
                multiline={true}
                value={message}
                placeholder='Type Here...'
                onChangeText={(text) => setmessage(text)}
                style={styles.text_inputmsg}>
              </TextInput>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.send__msg}
                onPress={() => { sendMessagesss(), setShouldShow(false) }}
              // onPress={() => { sendMessagesss(), setShouldShow(!shouldShow) }}
              >
                <Image
                  resizeMode='contain'
                  style={styles.msg_______icon}
                  source={require('./Icon/SendMessage.png')}/>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

      </KeyboardAvoidingView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.whiteColor
  },
  levelselect_text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
    marginHorizontal: mobileW * 2 / 100
  },
  static__text: {
    color: "#777777",
    fontFamily: Font.FontMedium,
    width: mobileW * 85 / 100,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 3.5 / 100,
  },
  GIFImages: {
    alignSelf: "center",
    position: "absolute",
    width: mobileW * 58 / 100,
    height: mobileW * 9 / 100,
    marginTop: mobileW * 5 / 100,
    borderRadius: mobileW * 5 / 100,
  },
  text_inputmsg: {
    width: mobileW * 80 / 100,
    height: mobileW * 10 / 100,
    fontSize: mobileW * 3.6 / 100,
    paddingLeft: mobileW * 2 / 100,
    borderRadius: mobileW * 10 / 100,
    backgroundColor: Colors.white_color
  },
  CONTINUE___text: {
    color: Colors.white_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  text_inputview: {
    elevation: 1,
    width: mobileW * 95 / 100,
    padding: mobileW * 0.5 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.1 / 100,
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.light_grey,
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
  },
  msg_______icon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.whiteColor,
  },
  backIcon_Arrow: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  SafeArea_____view: {
    flex: 0,
    backgroundColor: Colors.themecolor
  },
  gif_VIEW: {
    flex: 1,
    marginTop: mobileW * 2 / 100,
    backgroundColor: '#00000060'
  },
  header_View: {
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
  },
  send__msg: {
    width: mobileW * 8.5 / 100,
    height: mobileW * 8.5 / 100,
    marginRight: mobileW * 1 / 100,
    borderRadius: mobileW * 5.5 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
  },
  keywordView: {
    margin: mobileW * 0.9 / 100,
    padding: mobileW * 2.5 / 100,
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 5 / 100,
    borderWidth: mobileW * 0.2 / 100,
    justifyContent: "center",
    borderColor: Colors.light_grey,
    backgroundColor: Colors.white_color,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
  },
  BACK_ICON: {
    height: mobileW * 4 / 100,
    width: mobileW * 4.5 / 100
  },
  BACK_ICON_: {
    width: mobileW * 9.5 / 100,
    height: mobileW * 9.5 / 100,
    tintColor: Colors.whiteColor
  },
  BUTTON____________: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  under________line: {
    width: mobileW * 100 / 100,
    height: mobileW * 0.3 / 100,
    backgroundColor: Colors.lightgray
  },
  back_Icon: {
    alignItems: "center",
    justifyContent: 'center',
    width: mobileW * 5 / 100,
    height: mobileW * 6 / 100,
    borderRadius: mobileW * 4 / 100,
  },
  selectKeywords_text: {
    color: Colors.blackColor,
    fontFamily: Font.FontRegular,
    padding: mobileW * 4 / 100,
    fontSize: mobileW * 4 / 100,
  },
  bottom___view: {
    bottom: 3,
    width: mobileW * 95 / 100,
    alignSelf: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  personname: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold
  },
  status: {
    color: Colors.whiteColor,
    fontFamily: Font.FontRegular,
    marginTop: mobileW * 1 / 100,
    fontSize: mobileW * 2.8 / 100,
  },
  SubmitButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    width: mobileW * 87 / 100,
    height: mobileW * 11 / 100,
    marginTop: mobileW * 10 / 100,
    borderRadius: mobileW * 2 / 100,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOffset: { width: 0, },
  },
  questionView: {
    backgroundColor: '#E5F4F5',
    borderTopLeftRadius: mobileW * 5 / 100,
    borderBottomLeftRadius: mobileW * 5 / 100,
    borderBottomRightRadius: mobileW * 5 / 100,
  },
  answerView: {
    backgroundColor: '#F7F7F7',
    borderTopLeftRadius: mobileW * 5 / 100,
    borderBottomLeftRadius: mobileW * 5 / 100,
    borderBottomRightRadius: mobileW * 5 / 100,
  },
  yesBtn: {
    backgroundColor: "#E1E1E1",
    alignItems: "center",
    justifyContent: 'center',
    width: mobileW * 27 / 100,
    height: mobileW * 9 / 100,
    borderRadius: mobileW * 2 / 100,
    marginHorizontal: mobileW * 2 / 100,
    marginHorizontal: mobileW * 3 / 100,
  },
  noBtn: {
    width: mobileW * 27 / 100,
    height: mobileW * 9 / 100,
    borderRadius: mobileW * 2 / 100,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
  },
  levelBtn: {
    alignItems: 'center',
    width: mobileW * 28 / 100,
    height: mobileW * 12 / 100,
    padding: mobileW * 1 / 100,
    margin: mobileW * 1.5 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    backgroundColor: Colors.whiteColor,
  },
  Gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  CONTINUE: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 95 / 100,
    height: mobileW * 13 / 100,
    marginTop: mobileW * 10 / 100,
    borderRadius: mobileW * 2 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    backgroundColor: Colors.themecolor,
  },
  gif_VIEW: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060'
  },
  CancleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E1E1E1",
    width: mobileW * 43 / 100,
    height: mobileW * 11 / 100,
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 2 / 100
  },
  RbsubmitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    width: mobileW * 43 / 100,
    height: mobileW * 11 / 100,
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 2 / 100,
  },
  iconTick: {
    width: mobileW * 4 / 100,
    height: mobileW * 4 / 100,
    alignSelf: 'flex-end',
    tintColor: Colors.themecolor,
  },
  closeIcon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    marginRight: mobileW * 1 / 100
  },
  solutiontext: {
    color: "#777777",
    textAlign: "center",
    fontFamily: Font.FontMedium,
    width: mobileW * 90 / 100,
    fontSize: mobileW * 4 / 100,
    marginTop: mobileW * 3 / 100,
  },
  WelcomeText: {
    color: "#011A38",
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4.5 / 100,
    marginTop: mobileW * 1.5 / 100
  },
})