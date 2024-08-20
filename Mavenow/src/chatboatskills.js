
import React, { useState, useEffect, useRef, memo } from 'react';
import { FlatList, Text, Alert, BackHandler, ScrollView, Modal, ImageBackground, StatusBar, View, StyleSheet, Keyboard, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, RefreshControl } from 'react-native'
import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, apifuntion, msgTitle, Font, Colors, mobileH, mobileW, localimag, SocialLogin } from './Provider/utilslib/Utils';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Chatboatskills({ navigation, route }) {
  const [shouldShow, setShouldShow] = useState(true);
  const [checkedData, setCheckedData] = useState('')

  console.log('you select level', checkedData);

  const [inputHeight, setInputHeight] = useState(0);
  const [modalVisible_GIF, setModalVisible_GIF] = useState(false);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const [hide, sethide] = useState(true)
  const [refresh, set_refresh] = React.useState(false);

  const [userId, set_userId] = useState('');
  const [userType, set_userType] = useState('');
  const [message, setmessage] = useState('')
  const [data, setData] = useState('')

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [keyword, setKeyword] = useState([]);
  const [listArry, setlistArry] = useState([]);
  console.log("All Keywords++++++++", listArry);

  console.log(question);
  console.log(answer);

  useEffect(() => {
    getuserId();
    setShouldShow()
    if (isFocused) {
    }
  }, [isFocused]);

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
          var buttonid = item
          keyarray1111.push(buttonid)
          // itemremove.remove(keyarray1111)

          // await localStorage.setItemString('selectedkyword',buttonid)
          return { ...obj, IsSuggested: true };
        }
      }

      return obj;
    });
    setKeyword(newState);
    console.log(keyarray1111, "...............>> .......");

  };


  const getuserId = async () => {
    var UserData = await localStorage.getItemObject('user_arr');
    var user_id = UserData._id
    var user_type = UserData.userType
    console.log('UserData---', UserData, '----------', user_id);
    console.log('UserData---', UserData, '----------', user_type);
    set_userId(user_id)
    set_userType(user_type)
  }

  //   var IdArray = [];

  const sendMessagesss = () => {

    if (message == '') {
      sethide(hide)
      // setModalVisible(true);
      return false
    }

    setModalVisible_GIF(true)
    sethide(false)
    // console.log("i am inno calling");
    // return false
    var data = JSON.stringify({
      userId: userId,
      question: message
    });
    console.log("Appi ", data);

    console.log("i am in No calling");

    var config1 = {
      method: 'post',
      url: config.baseURL + 'sendQuestion',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config1)
      .then(async (response) => {
        console.log('response is arriwal =======================', response.data)

        var IsScucceded = response.data.ErrorCode;
        var ErrorMessage = response.data.ErrorMessage;

        if (IsScucceded == 200) {
          setModalVisible_GIF(false)
          console.log("API Response.............. .", response.data.sendQuestion);
          var response = response.data.sendQuestion
          var getDate = response.data
          var Keywords = response.keyword

          var buttonset = Keywords;
          for (let i = 0; i < buttonset.length; i++) {
            console.log(buttonset[i]);
            buttonset[i].IsSuggested = false
          }
          console.log(buttonset, ".....................??");
          setKeyword(buttonset)

          // setKeyword(Keywords)
          setData(getDate)
          console.log("you are Question", getDate.question);
          setQuestion(getDate.question)
          var ansData = getDate.answer
          const t = ansData.replaceAll('"', ' ')
          const LineChangedData = t.replace(/\\n/g, '\n');
          setAnswer(LineChangedData)
          console.log(LineChangedData, 'hello i am here ');
        } else {
          alert(ErrorMessage)
        }

        for (let i = 0; i < Keywords.length; i++) {
          console.log("All Id GEt data", Keywords[i].id);
          IdArray.push(Keywords[i].id)
        }

        setlistArry(IdArray)

        const IdArray = IdArray.filter(item => item.id !== id);
        console.log("arrayList", IdArray)

      })
      .catch((error) => {
        alert(ErrorMessage)
      });
  }

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
      <View style={styles.header_View}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_Icon} activeOpacity={0.8}>
          <Image resizeMode='contain' source={require("./Icon/icon_back.png")} style={styles.BACK_ICON} />
        </TouchableOpacity>
        <Text style={styles.personname}>Chat boat</Text>
      </View>

      {/* --------------------- Gif Image Start ------------------ */}
      {shouldShow ? (
        <View style={{ alignItems: "center", marginTop: mobileH * 10 / 100}}>

          <Image resizeMode='contain' style={{ width: mobileW * 95 / 100, height: mobileW * 70 / 100 }} source={require("./Icon/Render_1.gif")} />
          <Text style={styles.WelcomeText}>Welcome to Mavenow</Text>
          <Text style={styles.solutiontext}>Solutions for Any plights Mavenow's Got Your Back Alright! inme se koi sahi nhi beth rha h ?</Text>
          <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
            <Image style={styles.GIFImages} source={require("./Icon/gif.png")} />

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
                colors={[Colors.themecolor]} />}>

            <KeyboardAvoidingView
              style={[styles.messageList, { marginBottom: inputHeight + hp('12%') }]}
              behavior={Platform.OS === 'android' ? null : 'padding'}
              keyboardVerticalOffset={Platform.OS === 'android' ? 0 : inputHeight + hp('7%')}>
              <View>

                {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Chat Section ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

                <View>
                  <View style={{ width: mobileW, padding: mobileW * 3 / 100, flex: 1 }}>
                    <Text style={{ fontSize: mobileW * 4.2 / 100, width: mobileW * 85 / 100, paddingBottom: mobileW * 3 / 100, color: Colors.dark_gray, fontWeight: '400' }}>I can teach*</Text>
                    {hide == false &&
                      <View style={{ maxWidth: Dimensions.get('window').width / 1.5 + 10, alignSelf: 'flex-end' }}>
                        <View style={styles.questionView}>
                          <Text style={{ padding: 10, fontSize: 16, fontWeight: '400', color: Colors.themecolor }}>{message}

                          </Text>
                        </View>
                      </View>}

                    {answer != "" ?

                      <View >
                        <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.dark_gray, fontFamily: Font.FontMedium }}>Select About Your Skills</Text>
                        <FlatList
                          data={keyword}
                          numColumns={4}
                          contentContainerStyle={{ width: '100%', alignSelf: 'center', padding: mobileW * 2 / 100 }}
                          horizontal={false}
                          columnWrapperStyle={{ flexWrap: 'wrap' }}
                          renderItem={({ item, obj }) =>
                            <View style={{ flexDirection: 'row' }}>
                              <TouchableOpacity onPress={() => List2(item)} activeOpacity={0.8} style={[styles.keywordView, { backgroundColor: item.IsSuggested ? Colors.themecolor : Colors.white_color }]}>
                                <Text style={{ color: item.IsSuggested ? Colors.white_color : Colors.gray, fontSize: mobileW * 3.5 / 100, fontWeight: "400" }}>{item.key}</Text>
                              </TouchableOpacity>
                            </View>}
                        />


                        {/* {keyarray1111.length > 0 &&
  <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible_loadergif(true)} style={styles.CONTINUE}>
    <Text style={styles.CONTINUE___text}>CONTINUE</Text>
  </TouchableOpacity>} */}
                      </View>
                      // <View style={{ maxWidth: Dimensions.get('window').width / 1.3 + 10, alignSelf: 'flex-start', marginTop: mobileW * 4 / 100, }}>
                      //   <View style={styles.answerView}>

                      //     <Text style={{ padding: 10, fontSize: mobileW * 4 / 100, fontWeight: '400', color: Colors.black_color }}>{answer}
                      //     </Text>
                      //   </View>
                      // </View> 
                      : <View >
                        {modalVisible_GIF == true &&
                          <View >
                            <Image style={styles.Gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>
                          </View>}
                      </View>}
                  </View>



                </View>

              </View>


              {/* </RBSheet> */}

            </KeyboardAvoidingView>

          </ScrollView>
          {keyarray1111.length > 0 &&
            <TouchableOpacity activeOpacity={0.8} style={styles.CONTINUE} onPress={() => navigation.navigate('ChatBoats1', { selectKeyword: keyarray1111 })}>
              <Text style={styles.CONTINUE___text}>CONTINUE</Text>
            </TouchableOpacity>
          }
          {/* {answer != '' &&
         <TouchableOpacity activeOpacity={0.8} style={styles.CONTINUE} onPress={()=> navigation.navigate('ChatBoats1')}>
         <Text style={styles.CONTINUE___text}>CONTINUE</Text>
       </TouchableOpacity>
        } */}
        </ImageBackground>)}
      {/* --------------------- Gif Image End ------------------ */}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.whiteColor
  },
  GIFImages: {
    borderRadius: mobileW * 5 / 100,
    width: mobileW * 63 / 100,
    height: mobileW * 10 / 100,
    alignSelf: "center",
    position: "absolute",
    marginTop: mobileW * 7 / 100
  },
  text_inputmsg: {
    width: mobileW * 80 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 10 / 100,
    paddingLeft: mobileW * 2 / 100,
    fontSize: mobileW * 3.6 / 100,
    backgroundColor: Colors.white_color
  },
  CONTINUE___text: {
    fontSize: mobileW * 4.5 / 100,
    color: Colors.white_color,
    fontFamily: Font.FontMedium
  },
  text_inputview: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    width: mobileW * 95 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.1 / 100,
    borderColor: Colors.light_grey,
    justifyContent: 'space-between',
    padding: mobileW * 0.5 / 100,
    backgroundColor: Colors.white_color
  },
  msg_______icon: {
    tintColor: Colors.whiteColor,
    height: mobileW * 5 / 100,
    width: mobileW * 5 / 100,
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
    paddingHorizontal: mobileW * 4 / 100,
    height: mobileW * 13 / 100,
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: Colors.themecolor,
  },
  send__msg: {
    width: mobileW * 8.5 / 100,
    height: mobileW * 8.5 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 5.5 / 100,
    marginRight: mobileW * 1 / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BACK_ICON: {
    height: mobileW * 4 / 100,
    width: mobileW * 4.5 / 100
  },
  back_Icon: {
    width: mobileW * 5 / 100,
    height: mobileW * 6 / 100,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: mobileW * 4 / 100,
  },
  bottom___view: {
    flexDirection: 'row',
    alignSelf: 'center', bottom: 3,
    width: mobileW * 95 / 100,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  personname: {
    fontSize: mobileW * 4.5 / 100,
    color: Colors.whiteColor,
    marginHorizontal: mobileW * 8 / 100,
    fontFamily: Font.FontMedium
  },
  status: {
    fontSize: mobileW * 2.8 / 100,
    fontFamily: Font.FontRegular,
    color: Colors.whiteColor,
    marginTop: mobileW * 1 / 100
  },
  questionView: {
    backgroundColor: '#E5F4F5',
    borderTopLeftRadius: mobileW * 5 / 100,
    borderBottomRightRadius: mobileW * 5 / 100,
    borderBottomLeftRadius: mobileW * 5 / 100
  },
  answerView: {
    backgroundColor: '#F7F7F7',
    borderTopLeftRadius: mobileW * 5 / 100,
    borderBottomRightRadius: mobileW * 5 / 100,
    borderBottomLeftRadius: mobileW * 5 / 100
  },
  Gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  CONTINUE: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: mobileW * 95 / 100,
    height: mobileW * 13 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    bottom: 10,
    position: 'absolute',
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  gif_VIEW: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060'
  },
  solutiontext: {
    color: "#777777",
    fontSize: mobileW * 4 / 100,
    width: mobileW * 90 / 100,
    textAlign: "center",
    marginTop: mobileW * 3 / 100
  },
  WelcomeText: {
    fontSize: mobileW * 5.5 / 100,
    fontWeight: "500",
    color: "#011A38",
  },
  keywordView: {
    margin: mobileW * 0.9 / 100,
    borderColor: Colors.light_grey,
    borderWidth: mobileW * 0.2 / 100,
    borderRadius: mobileW * 5 / 100,
    padding: mobileW * 2.5 / 100,
    justifyContent: "center",
    backgroundColor: Colors.white_color,
    marginTop: mobileW * 3 / 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
})
