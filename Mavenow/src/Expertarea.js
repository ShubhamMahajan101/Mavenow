import { View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList, TextInput } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import axios from "axios"

const Msignup = ({ navigation }) => {
  useEffect(() => {
    apicalling()
    // onRefresh()
    setTimeout(() => {
      setModalVisible_loadergif(false)

    }, 4000);
  }, [])

  const [inputHeight, setInputHeight] = useState(0);
  const [modalVisible_active, setModalVisible_active] = useState(false);
  const [fullname, setFullname] = useState('')
  const [ModalVisible_loadergif, setModalVisible_loadergif] = useState(false)
  const [data, setdata] = useState()
  console.log(data, "____data ________________");

  console.log(fullname, "...........>fullname");
  const apicalling = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://mavenow.com:8004/skills/getDefaultSkills',
    };

    axios.request(config)
      .then((response) => {
        var succeeded = response.data.succeeded
        var ErrorMessage = response.data.ErrorMessage
        var resData = response.data.getDefaultSkills
        console.log(resData, "------> resData resData");
        console.log(JSON.stringify(response.data));
        if (succeeded == true) {
          console.log(JSON.stringify(response.data.getDefaultSkills));
          for (i = 0; i < resData.length; i++) {
            if (resData[0].isActive == 1) {
              resData[0].isActive = 0;
              setFullname(resData[0].SkillName)
              break;
            }
          }
          setdata(resData)
          console.log('resData======>>>>>>>', resData);
          console.log(JSON.stringify(response.data));
        } else {
          alert(ErrorMessage)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // --------- > This code is single selection 
  const List2 = (item) => {

    if (item.isActive != 0) {
      setFullname(item.SkillName)
    }
    let updatedState = data.map((data) =>
      data.Id === item.Id
        ? { ...data, isActive: 0 }
        : { ...data, isActive: 1 }
    );
    setdata(updatedState);
    console.log('i am here with data -----', updatedState);
  };
  //  // --------- > This code is single selection 

  //  ============>  This code is multiple selction 
  //  const List2=(selectedIndex)=>{
  //   let temp = data //local array
  //   temp.map((item,id)=> {
  //     if(id==selectedIndex) item.isActive=!item.isActive
  //   })
  //   setdata([...temp]) //set your local state
  // }

  //  ============>  This code is multiple selction 

  return (
    <View style={{ flex: 1, backgroundColor: '#E0F2F3' }}>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible_loadergif} input
            onRequestClose={() => {
              setModalVisible_loadergif(!ModalVisible_loadergif);
            }}>
            <View style={styles.success_modal}>
              <Image style={styles.Gif_image} source={require("./Icon/neighcoach_loader.gif")} />
            </View>
          </Modal>
        </View>
        {/* here is a modal .......... */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_active}>
            <View style={styles.success_modal}>

              <View onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)} style={styles.text_inputview}>

                <TextInput
                  style={styles.input}
                  multiline
                  fontFamily={Font.FontRegular}
                  onChangeText={(text) => setFullname(text)}
                  placeholder='Please Enter your expert Aera i.e i am expert in  React-native Development'
                  fontSize={mobileW * 3.2 / 100}
                  placeholderTextColor={Colors.black_color}
                // value={fullname}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{ marginRight: mobileW * 2 / 100 }} ></TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("ReletedKeyword", { fullname: fullname }), setModalVisible_loadergif(true), setModalVisible_active(!modalVisible_active) }} style={styles.send__msg}>
                  <Image resizeMode='contain' style={styles.msg_______icon} source={require('./Icon/SendMessage.png')} />
                </TouchableOpacity>
              </View>

            </View>
          </Modal>
        </View>
        {/* here is a modal .......... */}

        <View style={styles.Top_view}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style={styles.profile_text}>{Lang_chg.ProfileTxt[config.language]}</Text>
            <Text></Text>
          </View>
          <View style={{ marginTop: mobileW * 2 / 100 }}>
            <Image style={styles.mavenowLogo} resizeMode="contain" source={require("./Icon/expert.png")}></Image>
            <View style={{ position: 'absolute', bottom: "71%", }}>
              <Text style={styles.hii}>{Lang_chg.Hi[config.language]} Arman</Text>
              <Text style={styles.welcome_text}>{Lang_chg.WelcometoMavenow[config.language]}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardView}>
          <Text style={styles.topText}>{Lang_chg.expertAreaTxt[config.language]}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data != '' ?


              // BL =  #121A23
              // White =  #FFFFFF
              // Gray =  #9B9B9B
              // BR =  #EFF2F1
              // BR2 =  #E7E8EA
              // Blue=  #00959E
              // BG =  #FAFAFA

              <View>
                <FlatList
                  data={data}
                  numColumns={3}
                  contentContainerStyle={{ width: '100%', }}
                  horizontal={false}
                  columnWrapperStyle={{ flexWrap: 'wrap' }}
                  renderItem={({ item, obj }) =>
                    <View style={{ flexDirection: 'row', }}>
                      <TouchableOpacity onPress={() => List2(item)} activeOpacity={0.8} style={[styles.keywordView, { backgroundColor: item.isActive == 0 ? Colors.themecolor : Colors.white_color }]}>
                        <Text style={[{ color: item.isActive == 0 ? Colors.white_color : Colors.gray, }, styles.skillName]}>{item.SkillName}</Text>
                      </TouchableOpacity>
                    </View>} />

                <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: mobileW * 15 / 100, marginTop: mobileW * 2 / 100 }}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.continue_button} onPress={() => navigation.navigate("ReletedKeyword", { fullname: fullname })}>
                    <Text style={styles.continue_text}>{Lang_chg.ContinueTxt[config.language]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.other_Button} activeOpacity={0.8} onPress={() => { setModalVisible_active(true) }}>
                    {/* <Image resizeMode='contain' style={[styles.other_image, { width: mobileW * 31/ 100, height: mobileH * 12 / 100, marginTop: mobileW * 1 / 100 }]} source={require('./Icon/other.png')}/> */}
                    <Text style={styles.other_text}>{Lang_chg.Other[config.language]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <Image style={styles.Gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}
export default Msignup
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  SafeAreaView: {
    flex: 1,
  },
  continue_button: {
    width: mobileW * 43.5 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillName: {
    fontSize: mobileW * 3 / 100,
    fontFamily: Font.FontRegular,
    margin: mobileW * 0.2 / 100
  },
  other_Button: {
    width: mobileW * 43.5 / 100,
    height: mobileW * 12 / 100,
    borderRadius: mobileW * 1 / 100,
    backgroundColor: '#EFF2F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  other_text: {
    color: Colors.black_color,
    fontSize: mobileW * 3.7 / 100,
    alignSelf: 'center',
    fontFamily: Font.FontMedium
  },
  success_modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060',
  },
  continue_text: {
    color: Colors.white_color,
    fontSize: mobileW * 3.7 / 100,
    alignSelf: 'center',
    fontFamily: Font.FontMedium
  },
  profile_text: {
    fontSize: mobileW * 4 / 100,
    color: Colors.text_dark_black,
    alignItems: 'center',
    fontFamily: Font.FontSemiBold
  },
  other_image: -{
    width: mobileW * 20 / 100,
    height: mobileW * 20 / 100
  },
  backIcon: {
    width: mobileW * 2.5 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.dark_gray
  },
  welcome_text: {
    color: Colors.gray,
    fontSize: mobileW * 3.4 / 100,
    fontFamily: Font.FontRegular
  },
  keywordView: {
    margin: mobileW * 0.5 / 100,
    borderColor: '#EFF2F1',
    borderWidth: mobileW * 0.3 / 100,
    borderRadius: mobileW * 5 / 100,
    padding: mobileW * 1.2 / 100,
    justifyContent: "center",
    backgroundColor: Colors.white_color,
    marginTop: mobileW * 3 / 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  hi: {
    fontSize: mobileW * 4.5 / 100,
    color: Colors.blackColor,
    fontFamily: Font.FontSemiBold,
  },
  hii: {
    fontSize: mobileW * 5 / 100,
    color: Colors.blackColor,
    fontFamily: Font.FontMedium,
  },
  Gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100,
    alignSelf: "center",
  },
  bottom___view: {
    flexDirection: 'row',
    alignSelf: 'center', bottom: 3,
    width: mobileW * 95 / 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: mobileW * 2 / 100,
    backgroundColor: "blue"
  },
  msg_______icon: {
    tintColor: Colors.whiteColor,
    height: mobileW * 5 / 100,
    width: mobileW * 5 / 100,
  },
  text_inputview: {
    elevation: 1,
    width: mobileW * 88 / 100,
    borderRadius: mobileW * 2 / 100,
    height: mobileW * 23 / 100,
    backgroundColor: Colors.white_color
  },
  mavenowLogo: {
    width: mobileW * 60 / 100,
    height: mobileW * 68 / 100,
    alignSelf: "flex-end",
  },
  input: {
    margin: mobileW * 2 / 100,
    width: mobileW * 75 / 100,
    height: mobileW * 15 / 100,
    marginTop: mobileW * -1 / 100
  },
  send__msg: {
    width: mobileW * 8.5 / 100,
    height: mobileW * 8.5 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 5.5 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    right: mobileW * 2 / 100,
    marginTop: mobileW * -2.5 / 100
  },
  cardView: {
    width: mobileW,
    height: mobileH * 70 / 100,
    backgroundColor: Colors.white_color,
    padding: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 7 / 100,
    borderTopRightRadius: mobileW * 7 / 100
  },
  backIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,
  },
  topText: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold,
    marginHorizontal: mobileW * 2 / 100,
    marginTop: mobileW * 5 / 100
  },
  Top_view: {
    width: mobileW,
    height: mobileH * 35 / 100,
    padding: mobileW * 4 / 100,
  },
})



