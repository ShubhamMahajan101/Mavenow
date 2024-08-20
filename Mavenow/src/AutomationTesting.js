

import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, useColorScheme, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RollInLeft } from 'react-native-reanimated';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
  {
    id: 1,
    image: require("./Icon/icon_student.png"),
    name: 'Vinay Dexit',
    status: 'UnPaid',
  },

]

export default function AutomationTesting({ navigation, }) {
  const [firstname, setFirstname] = useState('');

  const [textmodal, settextmodal] = useState(false)
  const [resechdulemodal, setresechdulemodal] = useState(false)

  const [timePicker, setTimePicker] = useState(false);
  const [datePicker, setShow] = useState(false);
  const [date, setdate] = useState(Lang_chg.StartDateTxt[config.language]);
  const [time, setTime] = useState(Lang_chg.StartTimeTxt[config.language]);

  const [EndTimeCheck, setEndTimeCheck] = useState(new Date(Date.now()))



  // ================ refresh controller 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  // ================ refresh controller 



  const setDatetoFunction = (date) => {
    setTimePicker(false)
    setTimeout(() => {
      console.log(timePicker);
    }, 500);

    var formateDate = date.nativeEvent.timestamp
    let newDate = moment(new Date(formateDate)).format('DD/MM/YYYY')
    setdate(newDate)
    console.log('date is here--------->>>>>>', newDate);
  }

  const setTimetoFunction = (given_time) => {
    console.log(given_time)
    setShow(false)
    var formateDate = given_time.nativeEvent.timestamp
    var hours = new Date(formateDate).getHours(); //Current Hours
    var min = new Date(formateDate).getMinutes(); //Current Minutes
    var sec = new Date(formateDate).getSeconds(); //Current Seconds

    var formattedDate = hours + ":" + min + ":" + sec    
    setTime(formattedDate)
    console.log('Time is here===========', formattedDate);

}



  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>


          {/* // =======>  about text modal  */}




          {/* ======> Header */}
          <View style={styles.Header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Image style={styles.backIcon_Arrow} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
              </TouchableOpacity>

            </View>
            <View >
              <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, marginHorizontal: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.AutomationTestingTxt[config.language]}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => settextmodal(true)} >
                <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/about.png")}></Image>
              </TouchableOpacity>
              {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}  style={{marginRight:mobileW*2/100}} > */}
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('QRScanner')}   >
                <Image style={styles.scanner} resizeMode='contain' source={require("./Icon/icons8-scanner-78.png")}></Image>
              </TouchableOpacity>
            </View>
          </View>
          {/* =====> Header */}

          <View style={styles.CardView}>
            <View style={{ width: mobileW * 20 / 100 }}>
              <View>
                {/* <View style={styles.userimageView}> */}
                {/* <Image resizeMode='contain' style={styles.userImage}source={require('./Icon/ic_coach_w.png')}></Image> */}
                <Image resizeMode='contain' style={{ width: mobileW * 13 / 100, height: mobileW * 13 / 100, borderRadius: mobileW * 9 / 100, alignSelf: "center", alignItems: "center", marginTop: mobileW * 2.3 / 100 }}
                  source={require('./Icon/12.jpg')}></Image>
                {/* </View> */}



              </View>
            </View>
            <View  >
              <View >
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.8 / 100, fontFamily: Font.FontMedium }}>vinay</Text>
                <View style={{ flexDirection: 'row', marginTop: mobileW * 1.6 / 100 }}>
                  <View style={{ width: mobileW * 34.5 / 100, }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.DateTxt[config.language]} </Text>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>Dec 16, 2022</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.StartTimeTxt[config.language]} </Text>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular, }}>05:00 PM</Text>
                    </View>
                    {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}  style={styles.buttonView}>
        <Text style={{color:Colors.white_color,alignSelf:'center', fontSize:mobileW*2.6/100,fontFamily:Font.FontRegular}}>{Lang_chg.RescheduleSessionTxt[config.language]}</Text>
        </TouchableOpacity> */}
                  </View>

                  <View style={{ width: mobileW * 38 / 100, }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.SessionDurationTxt[config.language]} </Text>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>30 min</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.EndTimeTxt[config.language]} </Text>
                      <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>05:30 PM</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignSelf: "flex-end", }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setresechdulemodal(true)} style={[styles.buttonView, { right: mobileW * 3 / 100 }]}>
                  <Text style={{ color: Colors.white_color, alignSelf: 'center', fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.RescheduleSessionTxt[config.language]}</Text>
                </TouchableOpacity>
                 <TouchableOpacity activeOpacity={0.8} style={styles.buttonView_cancel}>
                  <Text style={{ color: Colors.themecolor, alignSelf: 'center', fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.CancelTxt[config.language]}</Text>
                </TouchableOpacity>
              </View>

            </View>


          </View>
          <View style={{ width: mobileW, height: mobileW * 0.2 / 100, marginTop: mobileW * 1 / 100, backgroundColor: '#E7E8EA' }}></View>

          <Text style={styles.LearnerListText}>{Lang_chg.LearnerListTxt[config.language]}</Text>



          {/* ==============================================================Flatlist================================================================= */}
          <ScrollView>
            <FlatList
              data={DATA}
              renderItem={({ item, index }) =>
                <TouchableOpacity activeOpacity={0.8} style={styles.ListcardView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image resizeMode='contain' style={{ width: mobileW * 13 / 100, height: mobileW * 13 / 100, borderRadius: mobileW * 9 / 100 }}
                      source={require('./Icon/12.jpg')}></Image>
                    {/* <Image style={styles.imageIcon} resizeMode='contain'source={item.image}></Image> */}
                    <Text style={{
                      fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, left: mobileW *
                        3 / 100
                    }}>{item.name}</Text>
                  </View>



                </TouchableOpacity>
              }
              keyExtractor={item => item.id} />
          </ScrollView>
          {/* =================================================================Model================================================================ */}
          <View  >
          </View>





          <Modal
            animationType="slide"
            transparent={true}
            visible={resechdulemodal}
            onRequestClose={() => {
              setresechdulemodal(!resechdulemodal);
            }}>
            <View style={{ backgroundColor: "#00000060", alignItems: "center", flex: 1, justifyContent: 'center' }}>
              <View style={styles.ModelCard_DATEPICKER}>
                <View style={styles.ModelHeader}>
                  <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.RescheduleSessionTxt[config.language]}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setresechdulemodal(!resechdulemodal)} >
                    <Image style={styles.backIcon_edit} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                <View style={{ flexDirection: 'row', margin: mobileW * 5 / 100 }}>
                  {timePicker && (                                                                   //Date Picker
                    <DateTimePicker
                      mode={'date'}
                      value={new Date(Date.now())}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={false}
                      minimumDate={EndTimeCheck}
                      onChange={text => setDatetoFunction(text)} />)}
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setTimePicker(true)} style={styles.CalanderView}>
                    <Image resizeMode='contain' style={styles.iconQuestionMark} source={require('./Icon/icon_calendar.png')}></Image>
                    <Text style={styles.calanderText}>{date}</Text>
                  </TouchableOpacity>

                  {datePicker && (                                                                   //Date Picker
                    <DateTimePicker
                      mode={'time'}
                      value={new Date(Date.now())}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={false}
                      
                      onChange={text => setTimetoFunction(text)} />)}
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} style={styles.CalanderView}>
                    <Image resizeMode='contain' style={styles.iconQuestionMark} source={require('./Icon/icon_calendar.png')}></Image>
                    <Text style={styles.calanderText}>{time}</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ margin: mobileW * 3 / 100, flexDirection: 'row', }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setresechdulemodal(!resechdulemodal)} style={{ backgroundColor: Colors.themecolor, width: mobileW * 18 / 100, padding: mobileW * 0.5 / 100, borderWidth: mobileW * 0.2 / 100, borderColor: Colors.themecolor, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.CancelTxt[config.language]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setresechdulemodal(!resechdulemodal)} style={{ backgroundColor: Colors.white_color, width: mobileW * 18 / 100, padding: mobileW * 0.5 / 100, borderWidth: mobileW * 0.2 / 100, borderColor: Colors.themecolor, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', left: mobileW * 2 / 100 }}>
                    <Text style={{ color: Colors.themecolor, fontSize: mobileW * 3.5 / 100, textAlign: 'center', fontFamily: Font.FontMedium }}>{Lang_chg.OkTxt[config.language]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>







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
                    <TouchableOpacity activeOpacity={0.8} onPress={() => settextmodal(!textmodal)} >
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
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100
  },
  backIcon_: {
    width: mobileW * 9.5 / 100,
    height: mobileW * 9.5 / 100,
    tintColor: Colors.white_color,
  },
  calanderText: {
    color: Colors.gray,
    alignSelf: 'center',
    fontSize: mobileW * 2.8 / 100,
    fontFamily: Font.FontMedium,
    marginHorizontal: mobileW * 2 / 100
  },
  iconQuestionMark: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.gray
  },
  backIcon_Arrow: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  backIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    marginHorizontal: mobileW * 2 / 100,
    tintColor: Colors.black_color
  },
  scanner: {
    width: mobileW * 5.5 / 100,
    height: mobileW * 5.5 / 100,
    tintColor: Colors.black_color,
  },
  CardView: {
    width: mobileW,
    padding: mobileW * 2 / 100,
    flexDirection: 'row',
    marginTop: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    alignSelf: 'center',
  },
  userimageView: {
    width: mobileW * 16 / 100,
    height: mobileW * 16 / 100,
    alignSelf: 'center',
    marginTop: mobileW * 3 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.themecolor,
    borderWidth: mobileW * 0.5 / 100,
    borderRadius: mobileW * 10 / 100
  },
  userImage: {
    width: mobileW * 13 / 100,
    height: mobileW * 13 / 100,
    borderRadius: mobileW * 5 / 100,
    tintColor: Colors.themecolor
  },
  buttonView: {
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    paddingTop: mobileW * 1 / 100,
    paddingBottom: mobileW * 0.5 / 100,
    marginTop: mobileW * 2 / 100,
    borderRadius: mobileW * 1 / 100,
    justifyContent: 'center',
    backgroundColor: Colors.themecolor
  },
  buttonView_cancel: {
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    marginTop: mobileW * 2 / 100,
    borderRadius: mobileW * 1 / 100,
    justifyContent: 'center',
    backgroundColor: Colors.white_color,
    borderColor: Colors.themecolor,
    borderWidth: mobileW * 0.2 / 100
  },
  LearnerListText: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginLeft: mobileW * 4 / 100,
    marginRight: mobileW * 4 / 100,
    marginTop: mobileW * 5 / 100
  },
  learnerListView: {
    width: mobileW * 98 / 100,
    height: mobileW * 10 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.light_cyan
  },
  ListcardView: {
    alignSelf: "center",
    margin: mobileW * 2 / 100,
    borderRadius: mobileW * 2 / 100,
    width: mobileW * 98 / 100,
    padding: mobileW * 2 / 100,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: mobileW * 0.1 / 100,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  imageIcon: {
    width: mobileW * 14 / 100,
    height: mobileW * 14 / 100,
    tintColor: Colors.themecolor,
    marginHorizontal: mobileW * 2 / 100,
    marginBottom: mobileW * 3 / 100
  },
  backIcon_edit: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange,
  },
  ModelHeader: {
    width: mobileW * 90 / 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    backgroundColor: Colors.white_color
  },
  ModelCard: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5
  },
  ModelCard_DATEPICKER: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5,
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: 'center'
  },
  // ==============================================================Model===========================================
  ModelView: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    marginTop: mobileH * 30 / 100,
    alignSelf: 'center',
    backgroundColor: Colors.white_color,
    elevation: 5
  },
  ModelHeaderView: {
    width: mobileW * 90 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    backgroundColor: Colors.themecolor
  },
  CalanderView: {
    width: mobileW * 40 / 100,
    marginHorizontal: mobileW * 2 / 100,
    height: mobileW * 10 / 100,
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 1 / 100,
    padding: mobileW * 2 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  calanderText: {
    color: Colors.gray,
    alignSelf: 'center',
    fontSize: mobileW * 2.8 / 100,
    fontFamily: Font.FontMedium,
    marginHorizontal: mobileW * 2 / 100
  },
  textinputView: {
    width: mobileW * 85 / 100,
    flexDirection: 'row',
    padding: mobileW * 2 / 100,
    marginTop: mobileW * 5 / 100,
    borderRadius: mobileW * 1 / 100,
    height: mobileW * 22 / 100,
    borderWidth: mobileW * 0.5 / 100,
    borderColor: Colors.themecolor,
  },
  iconQuestionMark: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.gray,
  },

}
)





