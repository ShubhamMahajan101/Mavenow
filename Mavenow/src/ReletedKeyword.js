
import { View, StatusBar, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Modal, Alert } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, Currentltlg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const ReletedKeyword = ({ navigation, route }) => {
  const [userId, set_userId] = useState('');
  const [keyarray1111, setkeyarray1111] = useState([])
  const [userType, set_userType] = useState('')

  console.log("userId here===", userId);
  console.log("userType here===", userType);

  const value = route.params.fullname
  console.log("get value --------->", value);
  const [keyword, setKeyword] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [userkeyword, setuserkeyword] = useState('');

  useEffect(() => {
    getuserId();
    sendMessagesss();

  }, [])

  const getuserId = async () => {
    var UserData = await localStorage.getItemObject('user_arr');
    console.log("User Details >>>> user data>>>>>>>", UserData);
    var user_id = UserData._id
    set_userId(user_id)
    var user_type = UserData.userType
    console.log('UserData--------', user_id, '-----------------  user_type-----------------------', user_type);
    set_userType(user_type)
  }

  const sendMessagesss = async () => {
    var UserData = await localStorage.getItemObject('user_arr');
    var user_id1 = UserData._id
    console.log('________ user_id1 ____ ................', user_id1);

    let data = JSON.stringify({
      userId: user_id1,
      question: value
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
    console.log("user Details", data);

    axios.request(configuratin)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        console.log("send Question API Here++++", response);

        var IsScucceded = response.data.ErrorCode;
        var ErrorMessage = response.data.ErrorMessage;

        if (IsScucceded == 200) {

          console.log("API Response.................> first api data ", response.data);
          var responseData = response.data.sendQuestion
          // var getDate = responseData.data
          var Keywords = responseData.keyword
          console.log("API Keyword her======", Keywords);
          setKeyword(Keywords)

        } else {
          console.log("API Call Here ===111111111111111111111");
          alert(ErrorMessage)
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }
  // ===================> here is multiple items selestion code 
  const List2 = async (item) => {
    const newState = keyword.map(obj => {
      if (obj.id === item.id) {
        if (obj.IsSuggested == true) {

          arr = keyarray1111.filter(val => val !== item.id);
          setkeyarray1111(arr)
          console.log('Select and Unselect Array=====', arr);

          return { ...obj, IsSuggested: false };
        } else {
          var buttonid = item.id
          console.log("keyword here", buttonid);
          keyarray1111.push(buttonid)
          setkeyarray1111(keyarray1111)
          return { ...obj, IsSuggested: true };
        }
      }
      return obj;
    });
    setKeyword(newState);
  };
  // ===================> here is multiple items selestion code 



  console.log('DataArrauy=====', keyarray1111);



  const kerwordnotselected = () => {

    var data = JSON.stringify({
      keywordIds: keyarray1111,
      userId: userId,
      userType: userType,
      level: 3
    });

    console.log("i am in Yes calling", data);
    var config1 = {
      method: 'post',
      url: config.baseURL + 'createUserKeyword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config1)
      .then((response) => {

        var IsScucceded = response.data.ErrorCode;
        var ErrorMessage = response.data.ErrorMessage;

        if (IsScucceded == 200) {
          var data1 = response.data
          console.log("Second API Call......", data1);
          var Allkeyword = data1.createUserKeyword
          setuserkeyword(Allkeyword)

          console.log('Keyword Array Here ++++++++++++++', Allkeyword)
          { navigation.navigate('UpdateMavenn_Profile', { userkeyword: userkeyword }) }
        } else {

          alert(ErrorMessage)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const ProfileUpdate = () => {
    if (keyarray1111 == '') {
      setModalVisible(true);
      console.log("please select category first");
    } else {
      kerwordnotselected();
      console.log("profile updated");
    }
  }

  return (
    <View style={styles.Top_View}>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#E0F2F3" />

        {/* ------------------> header <---------------- */}
        <View style={styles.header_view}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style={styles.profile_text}>{Lang_chg.ProfileTxt[config.language]}</Text>
            <Text></Text>
          </View>

          <View style={{ marginTop: mobileW * 2 / 100 }}>
            <Image style={styles.mavenowLogo} resizeMode='contain' source={require("./Icon/maven_thinking.png")}></Image>
            <View style={{ bottom: "70%", position: 'absolute' }} >
              <Text style={styles.hii}>{Lang_chg.Hi[config.language]} Arman</Text>
              <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.GoodtoseeYouMaven[config.language]}</Text>
            </View>
          </View>

        </View>
        {/* ------------------> header <---------------- */}
        <View style={styles.cardView}>
          <Text style={styles.topText}>{Lang_chg.RelatedKeywordTxt[config.language]} {value} :-</Text>

          <ScrollView showsVerticalScrollIndicator={false}>

            {keyword != '' ?
              <View style={{ marginLeft: mobileW * -1 / 100 }}>
                <FlatList
                  data={keyword}
                  numColumns={5}
                  // numColumns={parseInt( keyword.length/3.5)}
                  contentContainerStyle={{ width: '100%', alignSelf: 'center', paddingBottom: mobileH * 15 / 100 }}
                  horizontal={false}
                  columnWrapperStyle={{ flexWrap: 'wrap' }}
                  renderItem={({ item, obj }) =>
                    <View style={{ flexDirection: 'row', padding: mobileW * 1 / 100 }}>
                      <TouchableOpacity onPress={() => List2(item)} activeOpacity={0.8} style={[styles.keywordView, { backgroundColor: item.IsSuggested ? Colors.themecolor : Colors.white_color }]}>
                        <Text style={[{ color: item.IsSuggested ? Colors.white_color : Colors.gray, fontSize: mobileW * 3.4 / 100, fontFamily: Font.FontRegular }]}>{item.key}</Text>
                      </TouchableOpacity>
                    </View>}
                /></View>
              :
              <View style={[styles.cardView, { alignItems: 'center', justifyContent: 'center', marginTop: mobileH * -10 / 100, }]}>
                {/* <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.black_color }}>We are searching , please wait.</Text> */}
                <Image style={styles.Gif_image} source={require("./Icon/neighcoach_loader.gif")} />
              </View>}
          </ScrollView>

          {/* ======================================= Login Button ===================================== */}

        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.LoginView} onPress={() => ProfileUpdate()} >
          <Text style={styles.LOGIN_TEXT}>{Lang_chg.CONTINUETxt[config.language]}</Text>
        </TouchableOpacity>

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.validation_view}>
              <View style={styles.modalHeaderView}>
                <Text style={styles.error_txt}>{Lang_chg.ErrorTxt[config.language]}</Text>
              </View>
              <View style={styles.modalWhiteCard}>
                <Text style={styles.errorMassege}>{Lang_chg.anyKeywordTxt[config.language]}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.Text_OK}>{Lang_chg.OkTxt[config.language]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  SafeAreaView: {
    flex: 0,
    // backgroundColor: Colors.DashBosrdView
    backgroundColor: "#d6eef8"
  },
  Top_View: {
    flex: 1,
    backgroundColor: Colors.themecolor
  },
  backIcon: {
    width: mobileW * 2.5 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.dark_gray
  },
  mavenowLogo: {
    width: mobileW * 66 / 100,
    height: mobileW * 70 / 100,
    alignSelf: 'flex-end'
  },
  hii: {
    fontSize: mobileW * 5 / 100,
    color: Colors.blackColor,
    fontFamily: Font.FontMedium,
    marginHorizontal: mobileW * 1 / 100,
  },
  cardView: {
    width: mobileW,
    height: mobileH * 70 / 100,
    backgroundColor: Colors.whiteColor,
    paddingLeft: mobileW * 5 / 100,
    paddingRight: mobileW * 5 / 100,
    borderTopLeftRadius: mobileW * 7 / 100,
    borderTopRightRadius: mobileW * 7 / 100,
  },
  profile_text: {
    fontSize: mobileW * 4.3 / 100,
    color: Colors.text_dark_black,
    alignItems: 'center',
    fontFamily: Font.FontSemiBold
  },
  topText: {
    fontSize: mobileW * 3.5 / 100,
    width: mobileW * 86 / 100,
    color: Colors.black_color,
    marginTop: mobileW * 6 / 100,
    fontFamily: Font.FontSemiBold
  },
  LoginView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: mobileW * 90 / 100,
    height: mobileW * 12.8 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    bottom: mobileW * 10 / 100,
    position: 'absolute',
    borderColor: "#e8edfb",
    // elevation: 1,
    // shadowColor: '#000',
    // borderWidth: 0,
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, },
    // shadowOpacity: 0.1,
  },
  LOGIN_TEXT: {
    fontSize: mobileW * 4 / 100,
    color: Colors.white_color,
    fontFamily: Font.FontMedium
  },
  Gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100,
    alignSelf: "center",
  },
  header_view: {
    width: mobileW,
    height: mobileH * 35 / 100,
    padding: mobileW * 4 / 100,
    backgroundColor: "#E0F2F3"
  },
  keywordView: {
    margin: mobileW * 0.2 / 100,
    borderColor: '#EFF2F1',
    borderWidth: mobileW * 0.2 / 100,
    borderRadius: mobileW * 5 / 100,
    padding: mobileW * 1.4 / 100,
    justifyContent: "center",
    backgroundColor: Colors.white_color,
    marginTop: mobileW * 3 / 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  // ++++++++++++++++++++++++++++++++++++ Modal CSS +++++++++++++++++++++++++
  validation_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000090"
  },
  backIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,

  },
  modalHeaderView: {
    backgroundColor: Colors.themecolor,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalWhiteCard: {
    backgroundColor: Colors.whiteColor,
    elevation: mobileW * 1 / 100,
    padding: mobileW * 3 / 100,
    width: mobileW * 90 / 100,
    borderBottomRightRadius: mobileW * 2 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100,
  },
  errorMassege: {
    textAlign: "center",
    color: Colors.blackColor,
    padding: mobileW * 2 / 100,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontMedium
  },
  modalButton: {
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    width: mobileW * 20 / 100,
    height: mobileW * 8 / 100,
    alignSelf: "center",
    justifyContent: 'center',
    marginTop: mobileW * 2 / 100
  },
  error_txt: {
    color: Colors.white_color,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontMedium
  },
  Text_OK: {
    color: Colors.white_color,
    fontSize: mobileW * 4 / 100,
    textAlign: "center",
    fontFamily: Font.FontMedium
  },
})

export default ReletedKeyword
