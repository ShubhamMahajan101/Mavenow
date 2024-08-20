import { View, Text, StyleSheet, StatusBar, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, YellowBox, Alert, Modal, FlatList } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Stack, TextInput, } from "@react-native-material/core";
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from "axios"
import moment from 'moment'
import { Colors } from './Provider/Colorsfont'
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const name1 = [
  {
    id: 1,
    className: 'Rating',
    skills: 'Kotlin (Basic)',
    startDate: 'Jun 30, 2023',
    endDate: 'Jun 30, 2023'
  },
  {
    id: 2,
    className: 'Rating',
    skills: 'Kotlin (Basic)',
    startDate: 'Jun 30, 2023',
    endDate: 'Jun 30, 2023'
  },
  {
    id: 3,
    className: 'Rating',
    skills: 'Kotlin (Basic)',
    startDate: 'Jun 30, 2023',
    endDate: 'Jun 30, 2023'
  }
]
const YourexpertArea = [
  {
    id: 1,
    name: 'User is not Relevant.',
    status: true
  },
  {
    id: 2,
    name: 'User is not trusted.',
    status: false
  },
  {
    id: 3,
    name: 'User might be seem as abusive.',
    status: false
  },
  {
    id: 4,
    name: 'Bad experience with this user.',
    status: false
  },
  {
    id: 5,
    name: 'Other',
    status: false
  }
]


export default function LearnersDetail({ navigation }) {
  const [name, setName] = useState([]);
  const [shouldShow1, SetShouldShow1] = useState("Rating")
  const [shouldShow2, SetShouldShow2] = useState("right")
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalSill, setModalSkill] = useState(false);
  const [dataary, setdataary] = useState(YourexpertArea);
  const [userMode, setuserMode] = useState();
  const [modalreport, setmodalreport] = useState(false)
  const [show, setshow] = useState('reported')
  const [selectreport, setselectreport] = useState(false)
  const [textmodal, settextmodal] = useState(false)

  // const [reportmodal ,setreportmodal] =useState(false)

  const Radio_Button = (item) => {
    var data = dataary
    let updatedState = data.map((data) =>
      data.id === item.id
        ? { ...data, status: true }
        : { ...data, status: false }
    );
    setdataary(updatedState);
    console.log('i am here with data -----', updatedState);
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setModalVisible_loadergif(false)
    // }, 2000);
    // apiCalling();

    SetMode();
  }, [])

  const SetMode = async (data) => {
    const value = await localStorage.getItemString('UserMode')
    console.log("..........", value);
    setuserMode(value)
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />

        {/* ===========> Header */}

        <View style={styles.Header}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.HeaderName}>{userMode == 'maven' ? Lang_chg.LearnerDetailsTxt[config.language] : Lang_chg.MavenDetailsTxt[config.language]}</Text>
          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 1 / 100 }} onPress={() => settextmodal(true)}>
            <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'black', }} resizeMode="stretch" source={require("./Icon/about.png")}></Image>
          </TouchableOpacity>
        </View>

        {/* =============> modal reportmodal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalreport}>
          <View style={{ flex: 1, backgroundColor: '#00000060', alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.Modal}>
              <View style={styles.ModalHeader_want}>
                <Text style={{ color: Colors.black_color, width: mobileW * 75 / 100, fontSize: mobileW * 4 / 100, fontFamily: Font.FontRegular, }}>{Lang_chg.WanttoreportTxt[config.language]}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { setmodalreport(!modalreport) }}  >
                  <Image style={styles.backIcon_edit} resizeMode='contain'
                    source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
              <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: mobileW * 3 / 100, padding: mobileW * 3 / 100 }}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.ChatBtn} onPress={() => { setmodalreport(!modalreport), setModalVisible2(true) }}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color }}>{Lang_chg.CancelTxt[config.language]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.ReportBtn} onPress={() => { setmodalreport(!modalreport), setshow('report') }} >
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor }}>{Lang_chg.YesTxt[config.language]}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* =============> modal reportmodal */}


        {/* ====> about text modal */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={textmodal}
            onRequestClose={() => {
              settextmodal(!textmodal);
            }}>
            <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>

              <View style={styles.ModelCard}>
                <View style={styles.ModelHeader}>
                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Help : profile</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => settextmodal(!textmodal)}  >
                    <Image style={styles.backIcon_edit} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                <ScrollView>
                  <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

                    <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontRegular }}>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        {/* // =======>  about text modal  */}



        <View style={{ width: mobileW * 92 / 100, flexDirection: 'row', alignItems: 'center', margin: mobileW * 4 / 100 }}>
          <View>
            <Image resizeMode='contain' style={{ width: mobileW * 18 / 100, height: mobileW * 18 / 100, borderRadius: mobileW * 9 / 100 }}
              source={require('./Icon/12.jpg')}></Image>
          </View>
          <View style={{ marginHorizontal: mobileW * 2 / 100, width: mobileW * 70 / 100, }}>
            <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>Jointh Smith</Text>
            <Text style={{ fontSize: mobileW * 3 / 100, marginTop: mobileW * -1 / 100, fontFamily: Font.FontRegular, color: Colors.gray }}>{Lang_chg.JoinDateTxt[config.language]} Mar 21 2023</Text>
          </View>
        </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Session Details +++++++++++++++++++++++++++++++++++++++++++++++ */}
        <View style={{ flexDirection: 'row', width: mobileW * 92 / 100, marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100, marginTop: mobileW * 3 / 100 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Badges')} style={{ width: mobileW * 23 / 100, alignItems: 'center' }}>
            <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color, textAlign: 'center' }}>250</Text>
            <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.AchievementTxt[config.language]}</Text>
          </TouchableOpacity>
          <View style={{ width: mobileW * 23 / 100, alignItems: 'center' }}>
            <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color, textAlign: 'center' }}>250</Text>
            <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.SessionCompletedTxt[config.language]}</Text>
          </View>
          <View style={{ width: mobileW * 23 / 100, alignItems: 'center' }}>
            <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color, textAlign: 'center' }}>250</Text>
            <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.ActiveSessionTxt[config.language]}</Text>
          </View>
          {userMode == 'maven' ?
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearners')} style={{ width: mobileW * 23 / 100, alignItems: 'center' }}>
              <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color, textAlign: 'center' }}>250</Text>
              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{userMode === 'maven' ? Lang_chg.MavensTxt[config.language] : Lang_chg.LearnersTxt[config.language]}</Text>
            </TouchableOpacity> :
            <TouchableOpacity activeOpacity={0.8} style={{ width: mobileW * 23 / 100, alignItems: 'center' }} onPress={() => navigation.navigate('MyLearners')}>
              <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, textAlign: 'center' }}>250</Text>
              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center' }}>{Lang_chg.MavensTxt[config.language]}</Text>
            </TouchableOpacity>}
        </View>

        <View style={{ width: mobileW * 92 / 100, marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100, flexDirection: 'row' }}>
          <View style={{ width: mobileW * 46 / 100, }}>
            <Text style={{ fontSize: mobileW * 3.8 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, marginTop: mobileW * 1 / 100 }}>{Lang_chg.learnerskillTxt[config.language]}</Text>
          </View>
          <View style={{ width: mobileW * 46 / 100, }}>
            <Text style={{ fontSize: mobileW * 3.8 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, marginTop: mobileW * 1 / 100 }}>{Lang_chg.MavenskillTxt[config.language]}</Text>
          </View>
        </View>
        <View style={{ width: mobileW * 92 / 100, flexDirection: 'row', marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100 }}>
          <View style={{ width: mobileW * 46 / 100, }}>
            <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.gray, marginTop: mobileW * 1 / 100 }}>AI(basic)</Text>
            <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.gray, marginTop: mobileW * 1 / 100 }}>Kotlin(basic)</Text>
            <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.gray, marginTop: mobileW * 1 / 100 }}>Android(basic)</Text>

            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalSkill(true)}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor, marginTop: mobileW * 1 / 100 }}>{Lang_chg.seemoreTxt[config.language]}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: mobileW * 46 / 100, }}>
            <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.gray, marginTop: mobileW * 1 / 100 }}>As Learner skill</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: mobileW, marginLeft: mobileW * 50 / 100, }}>
          <TouchableOpacity activeOpacity={0.8} style={styles.ChatBtn} onPress={() => navigation.navigate('Chat')}>
            <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color, }}>{Lang_chg.ChatTxt[config.language]}</Text>
          </TouchableOpacity>

          {show == 'reported' ?
            <TouchableOpacity activeOpacity={0.8} style={styles.ReportBtn} onPress={() => setModalVisible2(true)}>
              <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor, }}>{Lang_chg.ReportTxt[config.language]}</Text>
            </TouchableOpacity> :

            <TouchableOpacity activeOpacity={0.8} style={styles.ReportedBtn}>
              <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor, }}>{Lang_chg.ReportedTxt[config.language]}</Text>
            </TouchableOpacity>
          }
        </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Button  +++++++++++++++++++++++++++++++++++++++++++++++ */}

        <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => SetShouldShow1('Rating')}>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 12 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Rating' ? Colors.themecolor : Colors.gray }}>{Lang_chg.RatingReviewTxt[config.language]}</Text>

            </View>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Rating' ? Colors.themecolor : "#E7E8EA" }}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => SetShouldShow1('About')}>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 12 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Rating' ? Colors.gray : Colors.themecolor }}>{Lang_chg.AboutMeTxt[config.language]}</Text>
            </View>
            <View style={{ width: mobileW * 50 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Rating' ? "#E7E8EA" : Colors.themecolor }}></View>
          </TouchableOpacity>
        </View>


        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Rating & Review Data  +++++++++++++++++++++++++++++++++++++++++++++++ */}

        {shouldShow1 == 'Rating' &&
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: mobileW * 1 / 100, marginBottom: mobileW * 10 / 100, }}>
              <FlatList
                data={name1}
                renderItem={({ item }) =>
                  <View style={styles.ratingCard}>
                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                      <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.OverallRatingTxt[config.language]}</Text>
                      </View>
                      <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>

                        <View style={{ flexDirection: 'row' }}>
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                          <Image style={styles.star_image} resizeMode='contain'
                            source={require("./Icon/rating_full.gif")} />
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1.5 / 100 }}>
                      <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.ClassNameTxt[config.language]}</Text>
                      </View>
                      <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{item.className}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1.5 / 100 }}>
                      <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.SkillsTxt[config.language]}</Text>
                      </View>
                      <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{item.skills}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1.5 / 100 }}>
                      <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.StartDateTxt[config.language]}</Text>
                      </View>
                      <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{item.startDate}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1.5 / 100 }}>
                      <View style={{ width: mobileW * 35 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, }}>{Lang_chg.EndDateTxt[config.language]}</Text>
                      </View>
                      <View style={{ width: mobileW * 53 / 100, justifyContent: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3.1 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{item.endDate}</Text>
                      </View>
                    </View>
                  </View>
                } />
            </View>
          </ScrollView>}


        {/* About Me Data */}


        {shouldShow1 == 'About' &&
          <View>
            {shouldShow2 == "right" ?
              <View style={styles.textInputView}>
                <TextInput
                  color={Colors.themecolor}
                  editable={false}
                  marginLeft={mobileW * -4 / 100}
                  marginBottom={mobileW * -4 / 100}
                  backgroundColor={Colors.white_color}
                  fontSize={mobileW * 3 / 100}
                  fontFamily={Font.FontMedium}
                  value={name.note} style={styles.textInput} placeholder={Lang_chg.aboutyourselfTxt[config.language]} />
                <TouchableOpacity onPress={() => SetShouldShow2('write')}>
                  <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.blackColor }} resizeMode='contain'
                    source={require("./Icon/ic_edit.png")}></Image>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.textInputView}>

                <TextInput
                  style={styles.input}
                  multiline
                  fontFamily={Font.FontMedium}
                  color={Colors.themecolor}
                  fontSize={mobileW * 3 / 100}
                  marginLeft={mobileW * -4 / 100}
                  marginBottom={mobileW * -4 / 100}
                  backgroundColor={Colors.white_color}
                  placeholder={Lang_chg.aboutyourselfTxt[config.language]}
                  value={name} />
                <View style={{ position: 'absolute', left: mobileW * 85 / 100 }}>
                  <TouchableOpacity onPress={() => SetShouldShow2('right')} style={styles.chackicon}>
                    <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.whiteColor }} source={require("./Icon/check.png")}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        }


        {/* Report Modal */}

        <View >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}>
            <View style={{ flex: 1, backgroundColor: "#00000060", justifyContent: "center", alignItems: 'center' }}>
              <View style={{ borderRadius: mobileW * 2 / 100, backgroundColor: 'white', width: mobileW * 92 / 100 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: mobileW * 4 / 100 }}>
                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.Helpusunderstandwhatshappening[config.language]}</Text>
                  <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2)}>
                    <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} source={require('./Icon/close2.png')}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 92 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>



                <View style={{ width: mobileW * 84 / 100, flexDirection: 'row', alignItems: 'center', padding: mobileW * 2 / 100 }}>
                  <View>
                    <Image resizeMode='contain' style={{ width: mobileW * 14 / 100, height: mobileW * 14 / 100, borderRadius: mobileW * 9 / 100 }}
                      source={require('./Icon/12.jpg')}></Image>
                  </View>
                  <View style={{ marginHorizontal: mobileW * 2 / 100, width: mobileW * 70 / 100 }}>
                    <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>Jointh Smith</Text>
                    <Text style={{ fontSize: mobileW * 3 / 100, marginTop: mobileW * -1 / 100, fontFamily: Font.FontRegular, color: Colors.gray }}>{Lang_chg.JoinDateTxt[config.language]} Mar 21 2023</Text>
                  </View>
                </View>
                <Text style={styles.expertAreaTxt}>{Lang_chg.expertAreaTxt[config.language]}</Text>

                <FlatList
                  data={dataary}
                  renderItem={({ item }) =>
                    <View style={{ flexDirection: "row", margin: mobileW * 1 / 100, alignItems: 'center', left: mobileW * 2 / 100 }}>
                      <TouchableOpacity activeOpacity={0.8} onPress={() => Radio_Button(item)}>
                        <View style={[styles.redioBtn, { borderColor: item.status === true ? Colors.themecolor : '#E7E8EA' }]}>
                          <View style={[styles.RedioBtnDot, { backgroundColor: item.status === true ? Colors.themecolor : Colors.white_color, }]}>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: mobileW * 2 / 100, color: Colors.black_color, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular }}>{item.name}</Text>
                    </View>} />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: mobileW * 5 / 100, padding: mobileW * 4 / 100 }}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.ChatBtn} onPress={() => setModalVisible2(!modalVisible2)}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color, }}>{Lang_chg.CancelTxt[config.language]}</Text>
                  </TouchableOpacity>
                  {/* {YourexpertArea ==""? */}


                  {/* // <TouchableOpacity activeOpacity={0.8} style={styles.ReportBtn} onPress={()=>setselectreport(true)}>
                  // <Text style={{ fontSize: mobileW * 3 / 100,fontFamily: Font.FontMedium,color: Colors.themecolor}}>{Lang_chg.ReportTxt[config.language]}</Text>
                  // </TouchableOpacity>
                  // : */}
                  <TouchableOpacity activeOpacity={0.8} style={styles.ReportBtn} onPress={() => { setmodalreport(true), setModalVisible2(!modalVisible2) }}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor }}>{Lang_chg.ReportTxt[config.language]}</Text>
                  </TouchableOpacity>

                  {/* // } */}



                </View>
              </View>

            </View>
          </Modal>
        </View>

        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ See More Skills Modal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        <View >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSill}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060', }}>
              <View style={styles.seeMoreCard}>
                <Text style={[styles.SkillsTxt]}>Maven</Text>
                <Text style={[styles.SkillsTxt, { marginTop: mobileW * 2 / 100 }]}>data</Text>
                <Text style={[styles.SkillsTxt, { marginTop: mobileW * 2 / 100 }]}>Maven</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.OkayBtn} onPress={() => setModalSkill(!modalSill)}>
                  <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color, }}>{Lang_chg.OkayTxt[config.language]}</Text>
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
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon_edit: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange,
  },
  seeMoreCard: {
    alignItems: 'center',
    backgroundColor: Colors.white_color,
    width: mobileW * 92 / 100,
    padding: mobileW * 4 / 100,
    borderRadius: mobileW * 2 / 100,
  },
  SkillsTxt: {
    fontSize: mobileW * 3 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontRegular
  },
  ratingCard: {
    borderColor: '#E7E8EA',
    width: mobileW * 92 / 100,
    padding: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100,
    marginLeft: mobileW * 4 / 100,
    marginRight: mobileW * 4 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
  },
  ModelCard: {
    elevation: 5,
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
  },
  ModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  HeaderName: {
    fontSize: mobileW * 4 / 100,
    marginHorizontal: mobileW * 3 / 100,
    color: Colors.blackColor,
    fontFamily: Font.FontSemiBold
  },
  OkayBtn: {
    width: mobileW * 18 / 100,
    height: mobileW * 7 / 100,
    marginTop: mobileW * 5 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.themecolor,
    alignItems: 'center',
    borderColor: "#e8edfb",
    justifyContent: 'center',
  },
  ChatBtn: {
    width: mobileW * 18 / 100,
    height: mobileW * 7 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderRadius: mobileW * 1 / 100,
    alignItems: 'center',
    borderColor: "#e8edfb",
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
  },
  ReportBtn: {
    width: mobileW * 18 / 100,
    height: mobileW * 7 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 2 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.themecolor,
    backgroundColor: Colors.white_color,
  },
  ReportedBtn: {
    width: mobileW * 20 / 100,
    height: mobileW * 7 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 2 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.themecolor,
    backgroundColor: Colors.white_color,
  },
  star_image: {
    tintColor: Colors.gray,
    width: mobileW * 3.7 / 100,
    height: mobileW * 3.7 / 100,
  },
  input: {
    width: mobileW * 92 / 100,
    height: mobileW * 10 / 100,
    backgroundColor: Colors.white_color,
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: mobileW * 2 / 100,
    marginLeft: mobileW * 4 / 100,
    marginRight: mobileW * 4 / 100,
  },
  ModalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white_color,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
  },
  ModalHeader_want: {
    padding: mobileW * 3 / 100,
    width: mobileW * 90 / 100,
    // height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    // paddingLeft:mobileW*3/100,
    // paddingRight:mobileW*3/100,

    backgroundColor: Colors.white_color,
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'space-between'
  },
  Modal: {
    elevation: 5,
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
  },
  chackicon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    borderRadius: mobileW * 4 / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.themecolor,
  },
  expertAreaTxt: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    width: mobileW * 87 / 100,
    left: mobileW * 2 / 100,
    marginTop: mobileW * 4 / 100,
    fontSize: mobileW * 3.5 / 100,

  },
  textInput: {
    width: mobileW * 84 / 100,
    fontSize: mobileW * 2 / 100,
    height: mobileW * 10.5 / 100,
    borderBottomWidth: mobileW * 1 / 100,
    backgroundColor: Colors.white_color,
    borderBottomColor: Colors.white_color,
  },
  redioBtn: {
    alignItems: "center",
    justifyContent: 'center',
    width: mobileW * 4 / 100,
    height: mobileW * 4 / 100,
    borderRadius: mobileW * 10 / 100,
    borderWidth: mobileW * 0.40 / 100,
  },
  RedioBtnDot: {
    width: mobileW * 2.4 / 100,
    height: mobileW * 2.4 / 100,
    borderRadius: mobileW * 10 / 100,
  },
})













// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old Learner Detail Screen +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// import { View, Text, StyleSheet, StatusBar, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground, YellowBox, Alert, Modal, FlatList } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import axios from "axios"
// import moment from 'moment'
// import { Colors } from './Provider/Colorsfont'
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// const LearnersDetail = ({ navigation, route }) => {
//   const data = route.params.item
//   console.log('route params data ', data);
//   console.log('route params data user Id ', data.userId);

//   const [change, setChange] = useState('yes')
//   const [shouldShow, setShouldShow] = useState("Radio_Button1");
//   const [shouldShow1, SetShouldShow1] = useState("Rating")
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalSill, setModalSkill] = useState(false);
//   const [modalVisible2, setModalVisible2] = useState(false);
//   const [modalVisible3, setModalVisible3] = useState(false);
//   const [modalVisible4, setModalVisible4] = useState(true);
//   const [name, setName] = useState([]);
//   const [Learnerskills, setLearnerskills] = useState([]);
//   const [classdata, setclassdata] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [skill, setSkill] = useState([]);
//   const [userMode, setuserMode] = useState();

//   // =======================================================================================        <>               ===================================================
//   useEffect(() => {
//     setTimeout(() => {
//       setModalVisible4(false)
//     }, 1000);
//     SetMode();
//     apiCalling();
//     apiCalling_classbyratting();
//   }, [])

//   const SetMode = async (data) => {
//     const value = await localStorage.getItemString('UserMode')
//     console.log("..........", value);
//     setuserMode(value)

//   }

//   const apiCalling = () => {
//     axios.get('https://mavenow.com:8001/user?id=' + data.userId + '&userType=1&userId=' + data.userId + '&token=%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NDEyNzQ1N30.zqWCkVDbh-1a2zUBpOpZg-4_8b2QvdB_AmJeXEdf95Q"')
//       .then(res => {
//         const nameList = res.data.result;
//         // const imageArray = nameList.result;
//         console.log('User learners details......... ->', nameList)

//         setName(nameList)
//         var str = nameList.learningskills;
//         var new_str = str.replace(/,/g, '\n\n');
//         setLearnerskills(new_str)
//         //  console.log("mmmmmmmmmmmmmmmmmmmmmmmmm",new_str);
//         setCategory(nameList.category)
//         setSkill(nameList.teachingskills)
//       })
//       .catch(function (error) {
//         console.log('---------->', error);
//       });
//   }
//   // --------------------------------------------------------------------------
//   const apiCalling_classbyratting = () => {

//     axios.get('https://mavenow.com:8001/userrequest/getUserClassesByRating?userId=' + data.userId + '&TypeofRequest=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NDIxMzE2Nn0.ASnHQya29LrSAqN6ff2DCam56LZRA_71X2oM6JUyJM8')

//       .then(res => {
//         const set_data = res.data.result;
//         console.log('set_data  Ratting--------------------- ! >', set_data);
//         setclassdata(set_data)

//         // console.log(JSON.stringify(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   // ....................................................................../. This Api used Get Profile Data User .....................................

//   return (
//     <View style={{ flex: 1 }}>
//       <SafeAreaView style={{ flex: 1 }}>
//         {/*======================================================= HEADER ========================================================== */}
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />
//         <View style={styles.Header}>
//            <View style={{ flexDirection: "row", alignItems: 'center' }}>
//             <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 2 / 100 }} onPress={() => navigation.goBack()}>
//               <Image style={styles.backIcon_} resizeMode='contain'
//                 source={require("./Icon/bk.png")}></Image>
//             </TouchableOpacity>
//             <Text style={{ color: Colors.white_color, fontSize: mobileW * 4.3 / 100, marginHorizontal: mobileW * 1 / 100, fontFamily:Font.FontMedium }}>{userMode == 'maven' ?Lang_chg.LearnerDetailsTxt[config.language] : "Maven's Details"}</Text>
//           </View>
//           <View style={{ flexDirection: "row" }}>
//             <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 5 / 100 }} onPress={() => setModalVisible(true)}>
//               <Image style={styles.backIcon} resizeMode='contain'
//                 source={require("./Icon/icon_info.png")}></Image>
//             </TouchableOpacity>

//           </View>
//           </View>

//         {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ User Details +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

//         <View style={{ backgroundColor: Colors.light_cyan, }}>
//           <View style={{ alignSelf: "flex-end", marginRight: mobileW * 5 / 100 }}>
//             <Text style={styles.joindate} >{Lang_chg.JoinDateTxt[config.language]}: {moment(name.createdOn).format("MMM DD, yyyy")}</Text>
//             {/* {"Join Date : " + moment(details.createdOn).format("MMM DD, yyyy")} */}
//           </View>

//           <View style={{ flexDirection: "row", }}>
//             <View >
//               <View style={styles.imageCard}>
//                 {userMode === 'maven' ? <Image style={styles.mavenImage} resizeMode='contain' source={require("./Icon/icon_student.png")}></Image> :
//                   <Image style={styles.mavenImage} resizeMode='contain' source={require("./Icon/icon_maven.png")}></Image>}
//               </View>
//               <Text style={{ color: Colors.blackColor, alignSelf: "center", marginTop: mobileW * 1 / 100, fontFamily:Font.FontMedium,fontSize:mobileW*3.2/100 }}>{name.FirstName}</Text>

//               {userMode != 'maven' &&
//                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: mobileW * 1 / 100 }}>
//                   <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/star.png")} />
//                   <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/star.png")} />
//                   <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/star.png")} />
//                   <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/star.png")} />
//                   <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/star.png")} />
//                 </View>}
//             </View>

//             <View>
//               <Text style={{ color: Colors.blackColor, fontFamily:Font.FontRegular }}>{name.studentAboutMe}</Text>
//               <View style={{ flexDirection: "row", marginTop: mobileW * 5 / 100, justifyContent: "space-between", marginHorizontal: mobileH * 0 / 100 }}>
//                 <View style={{ width: mobileW * 19 / 100 }} >
//                   <TouchableOpacity onPress={() => navigation.navigate('Badges')}>
//                     <Image style={styles.sessionImage} resizeMode='contain'
//                       source={require("./Icon/ic_reward_w.png")}></Image>
//                   </TouchableOpacity>

//                   <Text style={{ color: Colors.black_color, alignSelf: 'center', fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{name.numberOfBedges}</Text>
//                   <Text style={styles.sessionText}>{Lang_chg.AchievementTxt[config.language]} </Text>
//                 </View>
//                 <View style={{ width: mobileW * 19 / 100 }} >
//                   <Image style={styles.sessionImage} resizeMode='contain'
//                     source={require("./Icon/Session_Completed.png")}></Image>
//                   <Text style={{ color: Colors.black_color, alignSelf: 'center', fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{name.completeclass}</Text>
//                   <Text style={styles.sessionText}>{Lang_chg.SessionAttendedTxt[config.language]}</Text>
//                 </View>
//                 <View style={{ width: mobileW * 19 / 100 }} >
//                   <Image style={styles.sessionImage} resizeMode='contain'
//                     source={require("./Icon/Active_Session.png")}></Image>
//                   <Text style={{ color: Colors.black_color, alignSelf: 'center', fontSize: mobileW * 3 / 100,fontFamily:Font.FontRegular  }}>{name.activesession}</Text>
//                   <Text style={styles.sessionText}>{Lang_chg.ActiveSessionTxt[config.language]}</Text>
//                 </View>

//                 <View style={{ width: mobileW * 19 / 100 }}>
//                   {userMode === 'maven' ? <Image style={styles.sessionImage} resizeMode='contain'
//                     source={require("./Icon/icon_maven.png")}></Image> :
//                     <Image style={styles.sessionImage} resizeMode='contain'
//                       source={require("./Icon/icon_student.png")}></Image>}

//                   <Text style={{ color: Colors.black_color, alignSelf: 'center', fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{name.numberOfMaster}</Text>
//                   <Text style={styles.sessionText}>{userMode === 'maven' ?Lang_chg.MavensTxt[config.language]  : Lang_chg.LearnersTxt[config.language] }</Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Maven Learner Skills +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

//           <View style={{ marginTop: mobileW * 3 / 100, width: mobileW * 90 / 100, alignSelf: "center" }}>
//             <View>
//               <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 2 / 100, }}>
//                 <View style={{ width: mobileW * 45 / 100, }}>
//                   <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.learnerskillTxt[config.language]}</Text>

//                 </View>
//                 <View style={{ width: mobileW * 45 / 100, }}>
//                   <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100,fontFamily:Font.FontRegular }}>{Lang_chg.MavenskillTxt[config.language]}</Text>

//                 </View>
//               </View>
//               <View style={{ flexDirection: "row", marginTop: mobileW * 2 / 100, }}>
//                 <View style={{ width: mobileW * 45 / 100, }}>

//                   <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }} >{Learnerskills}</Text>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalSkill(true)}>
//                     <Text style={styles.seeMoreText} >{Lang_chg.seemoreTxt[config.language]}</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={{ width: mobileW * 45 / 100, }}>

//                   <Text style={{ marginHorizontal: mobileW * 0 / 100, color: Colors.blackColor, fontSize: mobileW * 3 / 100,fontFamily:Font.FontRegular }}>{name.myskills}</Text>
//                 </View>
//               </View>
//             </View>

//             <View style={{ width: mobileW * 90 / 100, flexDirection: 'row', }}>
//               <View style={{ width: mobileW * 45 / 100, justifyContent: 'center', }}>
//                 {userMode != 'maven' &&
//                   <View style={{ width: 40 / 100, }}>
//                     <TouchableOpacity activeOpacity={0.8} style={{}} >
//                       <Image resizeMode='contain' style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, }}
//                         source={require('./Icon/you_tube.png')}></Image>
//                     </TouchableOpacity>
//                   </View>}
//                 </View>
//                 <View style={{ width: mobileW * 45 / 100, }}>
//                 <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: mobileW * 1.5 / 100, marginBottom: mobileW * 1.5 / 100 }}>

//                     <TouchableOpacity onPress={() => navigation.navigate('Chat')} activeOpacity={0.8} style={styles.chatBtn}>
//                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, alignSelf: 'center', fontFamily:Font.FontMedium }}>{Lang_chg.ChatTxt[config.language]}</Text>
//                      </TouchableOpacity>

//                {change ?
//                       <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible2(true)} style={styles.reportBtn}>
//                       <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, alignSelf: 'center', fontFamily:Font.FontMedium }}>{Lang_chg.ReportTxt[config.language]}</Text>
//                       </TouchableOpacity>
//                      :
//                      <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible2(false)} style={styles.reportBtn}>
//                       <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, alignSelf: 'center', fontFamily:Font.FontMedium }}>{Lang_chg.ReportedTxt[config.language]}</Text>
//                      </TouchableOpacity>
//                     }

//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Ratting & Review Button +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

//     <View style={{ flexDirection: "row", alignSelf: "center", marginTop: mobileW * 2 / 100 }}>
//     <TouchableOpacity style={[{ backgroundColor: shouldShow1 === 'Rating' ? Colors.themecolor : Colors.light_cyan }, styles.Ratingbtn]} onPress={() => SetShouldShow1('Rating')}>
//     <Text style={{ color: shouldShow1 === 'Rating' ? Colors.white_color : Colors.blackColor, fontSize: mobileW * 3.6 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.RatingReviewTxt[config.language]}</Text>
//     </TouchableOpacity>

//       <TouchableOpacity style={[{ backgroundColor: shouldShow1 === 'About' ? Colors.themecolor : Colors.light_cyan }, styles.AboutMebtn]} onPress={() => SetShouldShow1("About")}>
//       <Text style={{ color: shouldShow1 === 'About' ? Colors.white_color : Colors.blackColor, fontSize: mobileW * 3.6 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.AboutMeTxt[config.language]}</Text>
//        </TouchableOpacity>
//         </View>

//         {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Ratting Card +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

//         {shouldShow1 == 'Rating' &&
//           <ScrollView >
//             <View style={{ paddingVertical: mobileW * 2 / 100 }}>
//               <FlatList
//                 data={classdata}
//                 renderItem={({ item }) =>
//                   <View >
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AutomationTesingScreen', { item: item })} style={styles.RatingView}>
//                       <View style={{ flexDirection: "row", alignItems: "center", }}>
//                         <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.OverallRatingTxt[config.language]}</Text>
//                         <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: mobileW * 5 / 100 }}>
//                           <Image style={styles.starimge} resizeMode='contain' source={require("./Icon/star.png")} />
//                           <Image style={styles.starimge} resizeMode='contain' source={require("./Icon/star.png")} />
//                           <Image style={styles.starimge} resizeMode='contain' source={require("./Icon/star.png")} />
//                           <Image style={styles.starimge} resizeMode='contain' source={require("./Icon/star.png")} />
//                           <Image style={styles.starimge} resizeMode='contain' source={require("./Icon/star.png")} />
//                         </View>
//                       </View>
//                       <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 2 / 100 }}>
//                         <View style={{ width: mobileW * 20 / 100 }}>
//                           <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.ClassNameTxt[config.language]}</Text>
//                         </View>
//                         <View style={{ width: mobileW * 75 / 100 }}>
//                           <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.3 / 100, fontFamily:Font.FontRegular }}>{item.className} </Text>
//                         </View>
//                       </View>

//                       <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 2 / 100 }}>
//                         <View style={{ width: mobileW * 20 / 100 }}>
//                           <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                         </View>
//                         <View style={{ width: mobileW * 75 / 100 }}>
//                         <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.3 / 100, fontFamily:Font.FontRegular }}>{item.Skills} ({item.request_level})</Text>
//                         </View>
//                       </View>

//                       {/* <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1 / 100 }}>
//                         <View style={{ width: mobileW * 20 / 100 }}>
//                           <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>Category</Text>
//                         </View>
//                         <View style={{ width: mobileW * 75 / 100 }}>
//                           <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3 / 100 }}>{item.SkillsCategory}</Text>
//                         </View>
//                       </View> */}

//                       <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: mobileW * 2 / 100 }}>
//                         <View>
//                           <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                           <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.3 / 100, fontFamily:Font.FontRegular }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
//                         </View>
//                         <View>
//                           <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                           <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.3 / 100, fontFamily:Font.FontRegular }}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
//                         </View>
//                       </View>
//                     </TouchableOpacity>

//                   </View>
//                 } />
//             </View>

//           </ScrollView>

//         }

//         {shouldShow1 == 'About' &&
//           <Text style={styles.nodataFound}>{Lang_chg.Nodatafound[config.language]}</Text>
//         }

//         {/* ***************************************************************** ALL MODaL ARE HARE ********************************************************************************* */}

//         {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Loader Modal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible4}
//         >
//           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000060' }}>
//             <Image style={{ width: mobileW * 25 / 100, height: mobileW * 12 / 100 }}
//               source={require("./Icon/neighcoach_loader.gif")}></Image>
//           </View>
//         </Modal>

//         {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Skills Modal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
//         <View >
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalSill}
//           >
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060', }}>
//               <View style={{ width: mobileW * 90 / 100, }}>
//                 <View style={styles.skillmodalHeader}>
//                   <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                 </View>
//                 <View style={styles.skillmodalCard}>
//                   <ScrollView>
//                     {/* <Text style={{fontSize:mobileW*4/100, color:Colors.black_color, fontWeight:'500', alignSelf:'center'}}>Data not found...</Text> */}
//                     <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.5 / 100, textAlign: 'center',fontFamily:Font.FontRegular }}>{Learnerskills}</Text>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => setModalSkill(!modalSill)} style={[styles.chatBtn, { alignSelf: 'center', marginTop: mobileW * 8 / 100 }]}>
//                       <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, alignSelf: 'center', fontFamily:Font.FontMedium }}>{Lang_chg.OkayTxt[config.language]}</Text>
//                     </TouchableOpacity>

//                   </ScrollView>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//         </View>

//         {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Redio Button Modal+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
//         {/* <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible2}
//           >
//            <View style={{ flex: 1, backgroundColor: "#00000096", justifyContent: "center" }}>
//            <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontWeight: '500' }}>Help us understand what's happening</Text>
//            <View style={{ flexDirection: "row", marginTop: mobileW * 2 / 100, alignSelf: "center" }}>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible2(!modalVisible2)} style={[styles.cancelBtn,]}>
//                   <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, alignSelf: 'center', fontWeight: "500" }}>{Lang_chg.CancelTxt[config.language]}</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity activeOpacity={0.8} onPress={() => { setModalVisible3(true) }} style={[styles.cancelBtn, { marginHorizontal: mobileW * 2 / 100 }]}>
//                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, alignSelf: 'center', fontWeight: "500" }}>Report</Text>
//                   </TouchableOpacity>
//                 </View>
//             </View>
//             </Modal> */}
//         <View >
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible2}
//           >
//             <View style={{ flex: 1, backgroundColor: "#00000060", justifyContent: "center" }}>
//               <View style={styles.redioBtnHeader}>
//                 <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.Helpusunderstandwhatshappening[config.language]}</Text>
//               </View>
//               <View style={styles.redioBtnCard}>
//                 <View style={{ flexDirection: 'row', marginTop: mobileW * 4 / 100 ,}}>
//                   {/* <Text style={{fontSize:mobileW*4/100, color:Colors.black_color, fontWeight:'500',marginHorizontal:mobileW*32/100}}>Data Not Found</Text> */}
//                <View>
//                     <View style={styles.imageCard2}>
//                       {userMode === 'maven' ?
//                         <Image style={styles.imageIcon2} resizeMode='contain' source={require('./Icon/icon_student.png')}></Image> :
//                         <Image style={styles.imageIcon2} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>}
//                     </View>
//                     <Text style={{ color: Colors.blackColor, alignSelf: "center", fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium }}>{name.FirstName}</Text>
//                   </View>

//                   <View >
//                     <Text style={{ color: Colors.blackColor, marginRight: mobileW * 3 / 100, fontFamily:Font.FontMedium, fontSize: mobileW * 3.2 / 100 }}>{Lang_chg.Whatdoyouliketodo[config.language]}</Text>
//                     <View style={{ margin: mobileW * 2 / 100, marginHorizontal: mobileW * 5 / 100 }}>

//                       <View style={{ flexDirection: "row", margin: mobileW * 1 / 100 }}>
//                       <TouchableOpacity activeOpacity={0.8} onPress={() => setShouldShow('Radio_Button1')}
//                           style={[]}>
//                           <View style={[styles.redioBtn, { borderColor: shouldShow === 'Radio_Button1' ? Colors.themecolor : Colors.gray }]}>
//                           <View style={[styles.RedioBtnDot, { backgroundColor: shouldShow === 'Radio_Button1' ? Colors.themecolor : Colors.white_color, }]}>
//                           </View>
//                           </View>
//                       </TouchableOpacity>
//                       <Text style={{ marginHorizontal: mobileW * 2 / 100, color: Colors.black_color, fontSize: mobileW * 2.7 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.Userisnotrelevant[config.language]}</Text>
//                       </View>

//                       <View style={{ flexDirection: "row", margin: mobileW * 1 / 100 }}>
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setShouldShow('Radio_Button2')}>
//                           <View style={[styles.redioBtn, { borderColor: shouldShow === 'Radio_Button2' ? Colors.themecolor : Colors.gray }]}>
//                             <View style={[styles.RedioBtnDot, { backgroundColor: shouldShow === 'Radio_Button2' ? Colors.themecolor : Colors.white_color, }]}>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                         <Text style={{ marginHorizontal: mobileW * 2 / 100, color: Colors.black_color, fontSize: mobileW * 2.7 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.Userisnottrusted[config.language]}</Text>
//                       </View>

//                       <View style={{ flexDirection: "row", margin: mobileW * 1 / 100 }}>
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setShouldShow('Radio_Button3')}>
//                           <View style={[styles.redioBtn, { borderColor: shouldShow === 'Radio_Button3' ? Colors.themecolor : Colors.gray }]}>
//                             <View style={[styles.RedioBtnDot, { backgroundColor: shouldShow === 'Radio_Button3' ? Colors.themecolor : Colors.white_color, }]}>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                         <Text style={{ marginHorizontal: mobileW * 2 / 100, color: Colors.black_color, fontSize: mobileW * 2.7 / 100, fontFamily:Font.FontRegular }}> {Lang_chg.Usermightbeseemasabusive[config.language]}</Text>
//                       </View>

//                       <View style={{ flexDirection: "row", margin: mobileW * 1 / 100, }}>
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setShouldShow('Radio_Button4')}>
//                           <View style={[styles.redioBtn, { borderColor: shouldShow === 'Radio_Button4' ? Colors.themecolor : Colors.gray }]}>
//                             <View style={[styles.RedioBtnDot, { backgroundColor: shouldShow === 'Radio_Button4' ? Colors.themecolor : Colors.white_color, }]}>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                         <Text style={{ marginHorizontal: mobileW * 2 / 100, color: Colors.black_color, fontSize: mobileW * 2.7 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.Badexperiencewiththisuser[config.language]}</Text>
//                       </View>

//                       <View style={{ flexDirection: "row", margin: mobileW * 1 / 100 }}>
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setShouldShow('Radio_Button5')}>
//                           <View style={[styles.redioBtn, { borderColor: shouldShow === 'Radio_Button5' ? Colors.themecolor : Colors.gray }]}>
//                             <View style={[styles.RedioBtnDot, { backgroundColor: shouldShow === 'Radio_Button5' ? Colors.themecolor : Colors.white_color, }]}>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                         <Text style={{ marginHorizontal: mobileW * 2 / 100, color: Colors.black_color, fontSize: mobileW * 2.7 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.Other[config.language]}</Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>

//                 <View style={{ flexDirection: "row", marginTop: mobileW * 4 / 100, alignSelf: "center" }}>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible2(!modalVisible2)} style={[styles.cancelBtn,]}>
//                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, alignSelf: 'center', fontFamily:Font.FontMedium }}>{Lang_chg.CancelTxt[config.language]}</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity activeOpacity={0.8} onPress={() => { setModalVisible3(true) }} style={[styles.cancelBtn, { marginHorizontal: mobileW * 2 / 100 }]}>
//                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, alignSelf: 'center', fontFamily:Font.FontMedium }}>{Lang_chg.ReportTxt[config.language]}</Text>
//                   </TouchableOpacity>
//                 </View>

//               </View>
//             </View>
//           </Modal>
//         </View>

//         {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ model are you sure want to block ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
//         <View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible3}
//           >
//             <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
//               <View style={styles.modalblokHeader}>
//                 <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.Alert[config.language]}</Text>
//               </View>

//               <View style={styles.modalblokView}>
//                 <Text style={{ color: Colors.blackColor, alignSelf: "center", fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{Lang_chg.sureblockTxt[config.language]}</Text>
//                 <View style={{ flexDirection: "row", margin: mobileW * 2 / 100, alignSelf: "center", marginTop: mobileW * 4 / 100 }}>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => { setChange(!change), setModalVisible2(!modalVisible2), setModalVisible3(!modalVisible3) }} style={styles.yesBtn}>
//                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.YesTxt[config.language]}</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible3(!modalVisible3)} style={styles.yesBtn}>
//                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.NoTxt[config.language]}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//           </Modal>
//         </View>


//         {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Other Profile Modal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

//         <View >
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//           >
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000060', }}>
//               <View style={{ width: mobileW * 90 / 100, }}>
//                 <View style={styles.modalHeader}>
//                   <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }} >
//                     <Text></Text>
//                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium }}>Help : Other Profile</Text>
//                     <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
//                       <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.whiteColor, marginRight: mobileW * 3 / 100 }} resizeMode='contain'
//                         source={require("./Icon/close2.png")}></Image>
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 <View style={styles.helpmodaTextview}>
//                   <ScrollView>
//                     <Text style={{ color: Colors.gray ,fontSize:mobileW*3/100,fontFamily:Font.FontRegular}}>Kalam earned a degree in aeronautical engineering from the
//                       Madras Institute of Technology and in 1958 joined the Defence Research and Development
//                       Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
//                       was project director of the SLV-III, the first satellite launch vehicle that was both designed
//                       and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
//                       rn him the ni

//                       was project director of the SLV-III, the first satellite launch vehicle that was both designed
//                       and produced in India. Rejoining DRDO
//                       in 1982, Kala
//                       m planned the progra
//                       ganisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
//                       was project director of the SLV-III, the first satellite launch vehicle that was both designed
//                       and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
//                       rn him the ni
//                       Organisation (DRDO). In 1969 he moved to the Indian
//                       Space Research Organisation, where he
//                       was project director of the SLV-III, the first satellite launch vehicle that was both designed
//                       and produced in India. Rejoining DRDO
//                       in 1982, Kala
//                       on, where he
//                       was project director of the SLV-III, the first satellite launch vehicle that was both designed
//                       and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
//                       rn him the ni
//                       Organisation (DRDO). In 1969 he moved to the Indian
//                       Space Research Organisation, where he
//                       was project director of the SLV-III, the first sa

//                       of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first
//                       intermediate-range ballistic missile, which incorporated aspect
//                       SLV-III and was launched in 1989.</Text>
//                   </ScrollView>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//         </View>

//       </SafeAreaView>

//     </View>
//   )
// };
// export default LearnersDetail

// const styles = StyleSheet.create({
//   Header: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW, height: mobileW * 13 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   backIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   backIcon_: {
//     width: mobileW * 9.5/ 100,
//     height: mobileW * 9.5 / 100,
//     tintColor: Colors.white_color
//   },
//   joindate: {
//     fontSize: mobileW * 3 / 100,
//     margin: mobileW * 1 / 100,
//     color: Colors.blackColor,
//     marginTop: mobileW * 2 / 100,
//     fontFamily:Font.FontRegular
//   },
//   sessionImage: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.themecolor,
//     alignSelf: "center"
//   },
//   sessionText: {
//     fontSize: mobileW * 2.6 / 100,
//     textAlign: "center",
//     marginTop: mobileW * 1 / 100,
//     color: Colors.blackColor,
//     width: mobileW * 18 / 100,
//     fontFamily:Font.FontRegular
//   },
//   learner_icon: {
//     width: mobileW * 15 / 100,
//     height: mobileW * 15 / 100,
//     tintColor: Colors.themecolor,
//     alignSelf: "center",
//     borderWidth: mobileW * 0.25 / 100,
//     borderColor: Colors.themecolor,
//     borderRadius: mobileW * 10 / 100,
//     marginTop: mobileW * -2 / 100
//   },
//   learner_icon2: {
//     width: mobileW * 15 / 100,
//     height: mobileW * 15 / 100,
//     tintColor: Colors.themecolor,
//     alignSelf: "center",
//     borderWidth: mobileW * 0.25 / 100,
//     borderColor: Colors.themecolor,
//     borderRadius: mobileW * 10 / 100,
//     marginTop: mobileW * -2 / 100
//   }, customRatingBarStyle: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 0,
//   },
//   chatBtn: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 18 / 100,
//     height: mobileW * 6 / 100,
//     borderRadius: mobileW * 2 / 100,
//     marginHorizontal: mobileW * 2 / 100,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   reportBtn: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 18 / 100,
//     height: mobileW * 6 / 100,
//     borderRadius: mobileW * 2 / 100,
//     // marginHorizontal: mobileW * 2 / 100,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   RatingView: {
//     backgroundColor: Colors.white_color,
//     elevation: 1,
//     width: mobileW * 95 / 100,
//     alignSelf: 'center',
//     borderRadius: mobileW * 1 / 100,
//     marginBottom: mobileW * 2 / 100,
//     // marginTop: mobileW * 2 / 100,
//     padding: mobileW * 2 / 100
//   },
//   imageCard: {
//     width: mobileW * 16 / 100,
//     height: mobileW * 16 / 100,
//     borderRadius: mobileW * 9 / 100,
//     borderWidth: mobileW * 0.6 / 100,
//     borderColor: Colors.themecolor,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: mobileW * 4 / 100,
//     marginTop: mobileW * 2 / 100
//   },
//   imageCard2: {
//     width: mobileW * 17 / 100,
//     height: mobileW * 17 / 100,
//     borderRadius: mobileW * 10 / 100,

//     // borderColor:Colors.themecolor,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: mobileW * 3 / 100,
//     borderWidth: mobileW * 0.40 / 100,
//     borderColor: Colors.themecolor
//   },
//   imageIcon: {
//     width: mobileW * 12 / 100,
//     height: mobileW * 12 / 100,
//     tintColor: Colors.themecolor,
//     marginHorizontal: mobileW * 2 / 100
//   },
//   imageIcon2: {
//     width: mobileW * 15 / 100,
//     height: mobileW * 15 / 100,
//     borderRadius: mobileW * 7 / 100,
//     tintColor: Colors.themecolor,
//     marginHorizontal: mobileW * 2 / 100
//   },
//   mavenImage: {
//     width: mobileW * 14 / 100,
//     height: mobileW * 14 / 100,
//     borderRadius: mobileW * 6 / 100,
//     tintColor: Colors.themecolor,
//   },
//   AboutMebtn: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 49 / 100,
//     height: mobileW * 10 / 100,
//     borderBottomRightRadius: mobileW * 3 / 100
//   },
//   Ratingbtn: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: mobileW * 49 / 100,
//     height: mobileW * 10 / 100,
//     borderBottomLeftRadius: mobileW * 3 / 100
//   },
//   starimge: {
//     width: mobileW * 4 / 100,
//     height: mobileW * 4 / 100,
//     tintColor: Colors.light_grey,
//   },
//   redioBtnHeader: {
//     backgroundColor: Colors.themecolor,
//     height: mobileW * 12 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderTopRightRadius: mobileW * 3 / 100,
//     borderTopLeftRadius: mobileW * 3 / 100
//   },
//   redioBtnCard: {
//     backgroundColor: Colors.whiteColor,
//     elevation: mobileW * 3 / 100,
//     padding: mobileW * 3 / 100,
//     width: mobileW,
//     borderBottomRightRadius: mobileW * 3 / 100,
//     borderBottomLeftRadius: mobileW * 3 / 100
//   },
//   redioBtn: {
//     width: mobileW * 4 / 100,
//     height: mobileW * 4 / 100,
//     borderRadius: mobileW * 10 / 100,
//     borderWidth: mobileW * 0.40 / 100,
//     justifyContent: 'center',
//     alignItems: "center",
//   },
//   RedioBtnDot: {
//     width: mobileW * 2.4 / 100,
//     height: mobileW * 2.4 / 100,
//     borderRadius: mobileW * 10 / 100,
//   },
//   cancelBtn: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 35 / 100,
//     height: mobileW * 9 / 100,
//     borderRadius: mobileW * 1 / 100,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   yesBtn: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 30 / 100,
//     height: mobileW * 8 / 100,
//     borderRadius: mobileW * 1 / 100,
//     marginHorizontal: mobileW * 1 / 100,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   seeMoreText: {
//     color: Colors.blackColor,
//     fontSize: mobileW * 3.5 / 100,
//     marginTop: mobileW * 1 / 100,
//     color: Colors.themecolor,
//     fontFamily:Font.FontMedium
//   },
//   helpmodaTextview: {
//     backgroundColor: Colors.whiteColor,
//     elevation: mobileW * 3 / 100,
//     padding: mobileW * 3 / 100,
//     borderBottomRightRadius: mobileW * 4 / 100,
//     borderBottomLeftRadius: mobileW * 4 / 100,
//     textAlign: "center"
//   },
//   skillmodalHeader: {
//     backgroundColor: Colors.themecolor,
//     height: mobileW * 12 / 100,
//     alignItems: 'center',
//     justifyContent: "center",
//     borderTopLeftRadius: mobileW * 3 / 100,
//     borderTopRightRadius: mobileW * 3 / 100
//   },
//   nodataFound:{
//     alignSelf: "center",
//     color: Colors.blackColor,
//     fontSize: mobileW * 5 / 100,
//     marginTop: mobileW * 6 / 100,
//     fontFamily:Font.FontMedium
//   },
//   modalHeader: {
//     backgroundColor: Colors.themecolor,
//     height: mobileW * 12 / 100,
//     justifyContent: "center",
//     borderTopLeftRadius: mobileW * 3 / 100,
//     borderTopRightRadius: mobileW * 3 / 100
//   },
//   modalblokHeader: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW * 90 / 100,
//     height: mobileW * 12 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderTopRightRadius: mobileW * 2 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100
//   },
//   modalblokView: {
//     backgroundColor: Colors.whiteColor,
//     elevation: mobileW * 3 / 100,
//     padding: mobileW * 2 / 100,
//     width: mobileW * 90 / 100,
//     borderBottomRightRadius: mobileW * 2 / 100,
//     borderBottomLeftRadius: mobileW * 2 / 100
//   },
//   skillmodalCard: {
//     backgroundColor: Colors.whiteColor,
//     elevation: mobileW * 3 / 100,
//     padding: mobileW * 3 / 100,
//     borderBottomRightRadius: mobileW * 3 / 100,
//     borderBottomLeftRadius: mobileW * 3 / 100,
//   },
// })