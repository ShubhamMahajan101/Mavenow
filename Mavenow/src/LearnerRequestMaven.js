
import { View, ScrollView, StatusBar, TextInput, Modal, Alert, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { Colors, Font } from './Provider/Colorsfont';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Stack, TextInput, } from "@react-native-material/core";
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DurationTime = [
  { id: 1, time: 15 },
  { id: 2, time: 20 },
  { id: 3, time: 25 },
  { id: 4, time: 40 },
  { id: 5, time: 50 },
  { id: 6, time: 60 },

]

export default function LearnerRequestMaven({ navigation, route }) {

  // const item = .params.recommendedItem;
  // console.log('data',item);

  const item = route.params.item;
  console.log('item', item);
  // console.log('data-----',item.SkillsCategory);
  const [EndTimeCheck, setEndTimeCheck] = useState(new Date(Date.now()))
  const [datePicker, setShow] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [date, setdate] = useState(Lang_chg.StartDateTxt[config.language]);
  const [time, setTime] = useState(Lang_chg.StartTimeTxt[config.language]);
  const [price, setPrice] = useState('');
  const [Percentage, setPercentage] = useState('default');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [Timeoutminut, setTimeoutminut] = useState('');
  const [duration, setDuration] = useState(false);


  // ================ refresh controller 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  // ================ refresh controller 


  const [email, setEmail] = useState('');
  console.log("price=====", email);
  useEffect(() => {
    const per = ((price) * 5 / 100);
    setPercentage(price - per);
  }, [price])


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
          {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
          <View style={styles.Header}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon_} resizeMode='contain'
                source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.black_color, marginHorizontal: mobileW * 3 / 100, fontSize: mobileW * 4.3 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.LearnerRequestTxt[config.language]}</Text>
            {/* </View> */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} >
              <Image style={styles.backIcon} resizeMode='contain'
                source={require("./Icon/about.png")}></Image>
            </TouchableOpacity>
          </View>
          {/* ++++++++++++++++++++++++++++++++++++++ Search Bar ++++++++++++++++++++++++++++++++++++++++ */}
          {/* {"Join Date :" + moment(name.createdOn).format("MMM DD, yyyy")} */}
          <View style={styles.DetailsCard}>
            <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
              <View style={{ width: mobileW * 31 / 100, alignItems: 'center', }} >
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnersDetail', { item: '' })} style={styles.StudentLernerView}>
                  <Image style={{ width: mobileW * 12 / 100, height: mobileW * 12 / 100, alignSelf: 'center' }}
                    source={require('./Icon/icon_student.png')}></Image>
                </TouchableOpacity>


              </View>
              <View style={{ width: mobileW * 63 / 100, }} >

                <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{item.userDetail.FullName}</Text>
                <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
                      source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
                      source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
                      source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
                      source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
                      source={require('./Icon/star.png')}></Image>
                  </TouchableOpacity>
                </View>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular }}>{Lang_chg.PostingdateTxt[config.language]} : {moment(item.DateOfRequest).format('MMM DD, YYYY')}</Text>
                <Text style={{ color: Colors.black_color, fontFamily: Font.FontMedium, fontSize: mobileW * 3 / 100, marginTop: mobileW * 1 / 100 }}>{Lang_chg.wantlearnTxt[config.language]} {item.name} (Basic)</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: mobileW * 1 / 100 }}>
                  <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.SkillsTxt[config.language]}</Text>
                  <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}> {item.name} [Basic]</Text>
                </View>

                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.DetailsTxt[config.language]}</Text>
                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, width: mobileW * 30 / 100, fontFamily: Font.FontRegular }}>{item.ShortDescription}</Text>

              </View>
            </View>

            <View style={{ width: mobileW * 90 / 100, marginTop: mobileW * 5 / 100, flexDirection: 'row', alignSelf: 'center', }}>
              <TouchableOpacity onPress={() => setModalVisible1(true)} activeOpacity={0.8} style={styles.selectBtn}>
                <Text style={{ color: Colors.white_color, fontFamily: Font.FontMedium, fontSize: mobileW * 3.5 / 100 }}>{Lang_chg.SelectTxt[config.language]}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.chatBtn} onPress={() => navigation.navigate('Chat')}>
                <Text style={{ color: Colors.themecolor, fontFamily: Font.FontMedium, fontSize: mobileW * 3.5 / 100 }}>{Lang_chg.LetsChat[config.language]}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ========================== duration set  */}
          <Modal
            animationType='fade'
            transparent={true}
            visible={duration}
          >
            <View style={styles.modal_commission}>
              <View style={[styles.DurationCard]}>
                <View style={styles.DurationModelHeader}>
                  <Text style={styles.Alert_text}>{Lang_chg.DurationTxt[config.language]}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { setDuration(!duration) }}>
                    <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

                <View style={{ height: mobileW * 60 / 100, padding: mobileW * 3 / 100 }} >
                  <FlatList
                    data={DurationTime}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                      <View>
                        <TouchableOpacity onPress={() => { setTimeoutminut(item.time), setDuration(!duration) }}>
                        {/* <TouchableOpacity activeOpacity={0.6} onPress={() => { setTimeoutminut(item.time)}}> */}
                          <Text style={{ alignSelf: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{item.time}</Text>
                        </TouchableOpacity>
                        <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.5 / 100, backgroundColor: Colors.gray, marginTop: mobileW * 4 / 100, marginBottom: mobileW * 4 / 100 }}></View>

                      </View>
                    } />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: mobileW * 3 / 100 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { setDuration(!duration), setModalVisible1(true) }} style={styles.Ok_CancelBtn} >
                      <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.CancelTxt[config.language]}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={0.8} onPress={() => { setDuration(!duration), setModalVisible1(true) }} style={styles.Ok_Btn} >
                      <Text style={{ color: Colors.themecolor, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.OkTxt[config.language]}</Text>
                    </TouchableOpacity> */}
                  </View>

                </View>
              </View>
            </View>
          </Modal>
          {/* ========= duration set  */}
          {/* =================================================================Model================================================================ */}
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }} >
              <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.modalCard}>
                  <View style={styles.modalHeader1}>

                    <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>Help : Learner Request</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} >
                      <Image style={styles.backIcon_CLOSE} resizeMode='contain'
                        source={require("./Icon/close2.png")}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

                  <ScrollView>
                    <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

                      <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontRegular, }}>
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

          {/* ================================================================= Tiem Duration Model================================================================ */}
          <View  >
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}
            >
              <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.modalCard}>
                  <View style={styles.modalHeader}>
                    <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.DurationTxt[config.language]}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible1(!modalVisible1)}>
                      <Image style={styles.backIcon_CLOSE} resizeMode='contain'
                        source={require("./Icon/close2.png")}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

                  <ScrollView>
                    <View style={{ alignItems: 'center', padding: mobileW * 3 / 100, }}>
                      {/* ================================================================= Date / Time ================================================================ */}
                      <View style={{ flexDirection: 'row', width: mobileW * 84 / 100, justifyContent: 'space-between' }}>
                        {timePicker && (                                                                   //Date Picker
                          <DateTimePicker
                            mode={'date'}
                            value={new Date(Date.now())}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={false}
                            minimumDate={EndTimeCheck}
                            onChange={text => setDatetoFunction(text)} />)}
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setTimePicker(true)} style={styles.CalanderView}>
                          <Image resizeMode='contain' style={styles.iconQuestionMark}
                            source={require('./Icon/icon_calendar.png')}></Image>
                          <Text style={styles.calanderText}>{date}</Text>
                        </TouchableOpacity>

                        {datePicker && (                                                                   //Date Picker
                          <DateTimePicker
                            mode={'time'}
                            value={new Date(Date.now())}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={false}
                            onChange={text => setTimetoFunction(text)} />)}
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} style={styles.CalanderView_time}>
                          <Image resizeMode='contain' style={styles.iconQuestionMark}
                            source={require('./Icon/icon_calendar.png')}></Image>
                          <Text style={styles.calanderText}>{time}</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{ marginTop: mobileW * 5 / 100, flexDirection: 'row', width: mobileW * 84 / 100, justifyContent: 'space-between' }}>

                        <TextInput
                          placeholder={Lang_chg.Concernfeeper[config.language]}
                          placeholderTextColor={Colors.black_color}
                          fontSize={mobileW * 3.6 / 100}
                          paddingLeft={mobileW * 2 / 100}
                          color={Colors.black_color}
                          fontFamily={Font.FontRegular}
                          style={styles.userCharges}
                          onChangeText={(text) => { setPrice(text) }}
                          value={price}
                          keyboardType={'number-pad'} />


                        {Percentage != "" ?
                          <View style={styles.userCharges1}>
                            <Text style={styles.multipletext}>{Percentage}</Text>
                          </View>
                          :
                          <View style={styles.userCharges_deduction}>
                            <Text style={styles.multipletext}>{Lang_chg.UserEarningTxt[config.language]}</Text>
                          </View>
                        }

                      </View>
                    </View>
                    {/* =================================================================================================================================================================================== */}

                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, marginHorizontal: mobileW * 3 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.SessionDurationTxt[config.language]}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setDuration(true)} style={styles.TimeView}>
                      <Image resizeMode='contain' style={[styles.iconQuestionMark, { right: mobileW * -2 / 100 }]}
                        source={require('./Icon/icon_calendar.png')}></Image>
                      <Text style={[styles.calanderText, { marginHorizontal: mobileW * 8 / 100, marginTop: mobileW * 1 / 100, fontSize: mobileW * 3.5 / 100 }]}>{Timeoutminut == Timeoutminut ? Timeoutminut : "HH:MM"}</Text>
                    </TouchableOpacity>




                    <View style={{ padding: mobileW * 1 / 100, flexDirection: 'row', marginTop: mobileW * 3 / 100, marginBottom: mobileW * 1.5 / 100 }}>
                      <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} activeOpacity={0.8} style={styles.ModelButton}>
                        <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.CancelTxt[config.language]}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} activeOpacity={0.8} style={[styles.ModelButton, { marginHorizontal: mobileW * 2 / 100, backgroundColor: Colors.white_color, }]}>
                        <Text style={{ color: Colors.themecolor, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.OkTxt[config.language]}</Text>
                      </TouchableOpacity>
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
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.black_color
  },
  backIcon_CLOSE: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange
  },
  backIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
  },
  multipletext: {
    fontSize: mobileW * 3.8 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    left: mobileW * 1 / 100
  },
  DetailsCard: {
    width: mobileW * 98 / 100,
    backgroundColor: Colors.white_color,
    borderRadius: mobileW * 1 / 100,
    margin: mobileW * 1 / 100,
    padding: mobileW * 2 / 100,
    alignSelf: 'center',
    borderWidth: mobileW * 0.2 / 100,
    borderColor: '#E7E8EA',
  },
  StudentLernerView: {
    width: mobileW * 14 / 100,
    height: mobileW * 14 / 100,
    justifyContent: 'center',
    borderWidth: mobileW * 0.5 / 100,
    borderColor: Colors.themecolor,
    borderRadius: mobileW * 10 / 100
  },
  chatBtn: {
    width: mobileW * 43 / 100,
    height: mobileW * 12 / 100,
    marginHorizontal: mobileW * 4 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.white_color
  },
  selectBtn: {
    width: mobileW * 43 / 100,
    height: mobileW * 12 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.themecolor,
    borderColor: Colors.themecolor,
    borderWidth: mobileW * 0.2 / 100
  },
  TimeView: {
    marginTop: mobileW * 1 / 100,
    width: mobileW * 40 / 100,
    height: mobileW * 13 / 100,
    backgroundColor: Colors.whiteColor,
    borderRadius: mobileW * 1 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.themecolor,
    borderWidth: mobileW * 0.3 / 100,
    margin: mobileW * 3 / 100,
  },
  userCharges1: {
    width: mobileW * 40 / 100,
    height: mobileW * 14 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderRadius: mobileW * 1 / 100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userCharges: {
    width: mobileW * 40 / 100,
    height: mobileW * 14 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    backgroundColor: Colors.white_color,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCharges_deduction: {
    width: mobileW * 40 / 100,
    height: mobileW * 14 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  CalanderView: {
    width: mobileW * 40 / 100,
    height: mobileW * 14 / 100,
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 1 / 100,
    padding: mobileW * 2 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  CalanderView_time: {
    width: mobileW * 40 / 100,
    height: mobileW * 14 / 100,
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 1 / 100,
    padding: mobileW * 2 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    backgroundColor: Colors.white_color
  },
  calanderText: {
    color: Colors.gray,
    alignSelf: 'center',
    fontSize: mobileW * 3.5 / 100,
    fontFamily: Font.FontMedium,
    marginHorizontal: mobileW * 3.2 / 100
  },
  iconQuestionMark: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.gray,
  },
  modalCard: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5
  },
  ModelButton: {
    width: mobileW * 40 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 2 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themecolor,
  },
  Alert_text: {
    color: Colors.black_color,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.FontMedium
  },
  modal_commission: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000060'
  },
  DurationModelHeader: {
    width: mobileW * 90 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mobileW * 13 / 100,
    borderTopLeftRadius: mobileW * 3 / 100,
    borderTopRightRadius: mobileW * 3 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    backgroundColor: Colors.white_color
  },
  DurationCard: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
    elevation: 5
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
    marginHorizontal: mobileW * 1 / 100
  },
  Ok_Btn: {
    width: mobileW * 22 / 100,
    height: mobileW * 8 / 100,
    backgroundColor: Colors.white_color,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderColor: Colors.themecolor,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: mobileW * 1 / 100
  },
  modalHeader1: {
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white_color
  }
}
)







// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old Screen ++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// import { View, ScrollView, StatusBar, TextInput, Modal, Alert, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { config, msgProvider, msgText, consolepro, Lang_chg, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import { Colors, Font } from './Provider/Colorsfont';
// import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';
// // import { Stack, TextInput, } from "@react-native-material/core";
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// const DurationTime = [
//   {
//     id: 1,
//     time: 15
//   },
//   {
//     id: 2,
//     time: 20
//   },
//   {
//     id: 3,
//     time: 25
//   },
//   {
//     id: 4,
//     time: 40
//   },
//   {
//     id: 5,
//     time: 50
//   },
//   {
//     id: 6,
//     time: 60
//   },

// ]

// export default function LearnerRequestMaven({ navigation, route }) {

//   // const item = .params.recommendedItem;
//   // console.log('data',item);

//   const item = route.params.item;
//   console.log('item', item);
//   // console.log('data-----',item.SkillsCategory);

//   const [datePicker, setShow] = useState(false);
//   const [timePicker, setTimePicker] = useState(false);
//   const [date, setdate] = useState(Lang_chg.StartDateTxt[config.language]);
//   const [time, setTime] = useState(Lang_chg.StartTimeTxt[config.language]);
//   const [price, setPrice] = useState('');
//   const [Percentage, setPercentage] = useState('default');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisible1, setModalVisible1] = useState(false);
//   const [Timeoutminut, setTimeoutminut] = useState('');
//   const [duration, setDuration] = useState(false);


//   // ================ refresh controller
//   const [refreshing, setRefreshing] = React.useState(false);
//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);
//   // ================ refresh controller







//   const [email, setEmail] = useState('');
//   console.log("price=====", email);
//   useEffect(() => {
//     const per = ((price) * 5 / 100);
//     setPercentage(price - per);
//   }, [price])


//   const setDatetoFunction = (date) => {
//     setTimePicker(false)
//     setTimeout(() => {
//       console.log(timePicker);
//     }, 500);

//     var formateDate = date.nativeEvent.timestamp

//     let newDate = moment(new Date(formateDate)).format('DD/MM/YYYY')

//     setdate(newDate)

//     console.log('date is here--------->>>>>>', newDate);
//   }
//   const setTimetoFunction = (given_time) => {
//     console.log(given_time)
//     setShow(false)
//     var formateDate = given_time.nativeEvent.timestamp
//     var hours = new Date(formateDate).getHours(); //Current Hours
//     var min = new Date(formateDate).getMinutes(); //Current Minutes
//     var sec = new Date(formateDate).getSeconds(); //Current Seconds

//     var formattedDate = hours + ":" + min // + ":" + sec
//     setTime(formattedDate)
//     console.log('Time is here===========', formattedDate);

//   }
//   return (
//     <View style={{ flex: 1, }}>
//       <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
//         <ScrollView
//           refreshControl={
//             <RefreshControl
//               colors={[Colors.themecolor]}
//               refreshing={refreshing} onRefresh={onRefresh} />
//           }>
//           {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
//           <View style={styles.Header}>
//             {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
//               <Image style={styles.backIcon_} resizeMode='contain'
//                 source={require("./Icon/back(1).png")}></Image>
//             </TouchableOpacity>
//             <Text style={{ color: Colors.black_color, marginHorizontal: mobileW * 3 / 100, fontSize: mobileW * 4.3 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.LearnerRequestTxt[config.language]}</Text>
//             {/* </View> */}
//             <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} >
//               <Image style={styles.backIcon} resizeMode='contain'
//                 source={require("./Icon/about.png")}></Image>
//             </TouchableOpacity>
//           </View>
//           {/* ++++++++++++++++++++++++++++++++++++++ Search Bar ++++++++++++++++++++++++++++++++++++++++ */}
//           {/* {"Join Date :" + moment(name.createdOn).format("MMM DD, yyyy")} */}
//           <View style={styles.DetailsCard}>
//             <Text style={{ color: Colors.black_color, fontSize: mobileW * 3 / 100, alignSelf: 'flex-end', marginTop: mobileW * 1 / 100, fontFamily: Font.FontRegular }}>{Lang_chg.PostingdateTxt[config.language]} {moment(item.DateOfRequest).format('MMM DD, YYYY')}</Text>
//             <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
//               <View style={{ width: mobileW * 31 / 100, alignItems: 'center' }} >
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnersDetail', { item: '' })} style={styles.StudentLernerView}>
//                   <Image style={{ width: mobileW * 13 / 100, height: mobileW * 13 / 100, alignSelf: 'center' }}
//                     source={require('./Icon/icon_student.png')}></Image>
//                 </TouchableOpacity>
//                 <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.5 / 100, marginTop: mobileW * 2 / 100, fontFamily: Font.FontMedium }}>{item.userDetail.FullName}</Text>
//                 <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
//                   <TouchableOpacity activeOpacity={0.8}>
//                     <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
//                       source={require('./Icon/star.png')}></Image>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.8}>
//                     <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
//                       source={require('./Icon/star.png')}></Image>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.8}>
//                     <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
//                       source={require('./Icon/star.png')}></Image>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.8}>
//                     <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
//                       source={require('./Icon/star.png')}></Image>
//                   </TouchableOpacity>
//                   <TouchableOpacity activeOpacity={0.8}>
//                     <Image resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center', tintColor: 'lightgray' }}
//                       source={require('./Icon/star.png')}></Image>
//                   </TouchableOpacity>
//                 </View>

//               </View>
//               <View style={{ width: mobileW * 63 / 100, }} >
//                 <Text style={{ color: Colors.black_color, fontFamily: Font.FontMedium, fontSize: mobileW * 3 / 100 }}>{Lang_chg.wantlearnTxt[config.language]} {item.name} (Basic)</Text>
//                 <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, }}>
//                   <View style={{ width: mobileW * 31.5 / 100, }}>
//                     <View style={{}}>
//                       <Text style={{ fontSize: mobileW * 2.5 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.CategoryTxt[config.language]}</Text>
//                     </View>

//                   </View>
//                   <View style={{ width: mobileW * 31.5 / 100, }}>
//                     <View style={{}}>
//                       <Text style={{ fontSize: mobileW * 2.5 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
//                   <View style={{ width: mobileW * 31.5 / 100, }}>
//                     <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily: Font.FontRegular }}>{item.SkillsCategory}</Text>
//                   </View>

//                   <View style={{ width: mobileW * 31.5 / 100, }}>
//                     <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, width: mobileW * 30 / 100, fontFamily: Font.FontRegular }}>{item.name} [Basic]</Text>
//                   </View>
//                 </View>

//                 <View style={{ flexDirection: 'row' }}>
//                   <View style={{ width: mobileW * 31.5 / 100, }}>
//                     <View style={{ marginTop: mobileW * 1 / 100, }}>
//                       <Text style={{ fontSize: mobileW * 2.5 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.DetailsTxt[config.language]}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
//                   <View style={{ width: mobileW * 31.5 / 100, }}>
//                     <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, width: mobileW * 30 / 100, fontFamily: Font.FontRegular }}>{item.ShortDescription}</Text>
//                   </View>
//                 </View>

//               </View>

//             </View>
//             <View style={{ width: mobileW * 90 / 100, marginTop: mobileW * 5 / 100, flexDirection: 'row', alignSelf: 'center', }}>
//               <TouchableOpacity onPress={() => setModalVisible1(true)} activeOpacity={0.8} style={styles.selectBtn}>
//                 <Text style={{ color: Colors.white_color, fontFamily: Font.FontMedium, fontSize: mobileW * 3.5 / 100 }}>{Lang_chg.SelectTxt[config.language]}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity activeOpacity={0.8} style={styles.chatBtn} onPress={() => navigation.navigate('Chat')}>
//                 <Text style={{ color: Colors.themecolor, fontFamily: Font.FontMedium, fontSize: mobileW * 3.5 / 100 }}>{Lang_chg.LetsChat[config.language]}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* ========================== duration set  */}
//           <Modal
//             animationType='fade'
//             transparent={true}
//             visible={duration}
//           >
//             <View style={styles.modal_commission}>
//               <View style={[styles.DurationCard]}>
//                 <View style={styles.DurationModelHeader}>
//                   <Text style={styles.Alert_text}>{Lang_chg.DurationTxt[config.language]}</Text>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => { setDuration(!duration) }}>
//                     <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} resizeMode='contain'
//                       source={require("./Icon/close2.png")}></Image>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

//                 <View style={{ height: mobileW * 60 / 100, padding: mobileW * 3 / 100 }} >
//                   <FlatList
//                     data={DurationTime}
//                     showsVerticalScrollIndicator={false}
//                     renderItem={({ item, index }) =>
//                       <View>
//                         <TouchableOpacity onPress={() => setTimeoutminut(item.time)}>
//                           <Text style={{ alignSelf: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>{item.time}</Text>
//                         </TouchableOpacity>
//                         <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.5 / 100, backgroundColor: Colors.gray, marginTop: mobileW * 4 / 100, marginBottom: mobileW * 4 / 100 }}></View>

//                       </View>
//                     } />

//                   <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: mobileW * 3 / 100 }}>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => { setDuration(!duration), setModalVisible1(true) }} style={styles.Ok_CancelBtn} >
//                       <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.CancelTxt[config.language]}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => { setDuration(!duration), setModalVisible1(true) }} style={styles.Ok_Btn} >
//                       <Text style={{ color: Colors.themecolor, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.OkTxt[config.language]}</Text>
//                     </TouchableOpacity>
//                   </View>

//                 </View>
//               </View>
//             </View>
//           </Modal>
//           {/* ========= duration set  */}
//           {/* =================================================================Model================================================================ */}
//           <View>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//               onRequestClose={() => {
//                 setModalVisible(!modalVisible);
//               }} >
//               <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
//                 <View style={styles.modalCard}>
//                   <View style={styles.modalHeader1}>

//                     <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>Help : Learner Request</Text>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} >
//                       <Image style={styles.backIcon_CLOSE} resizeMode='contain'
//                         source={require("./Icon/close2.png")}></Image>
//                     </TouchableOpacity>
//                   </View>
//                   <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

//                   <ScrollView>
//                     <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

//                       <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontRegular, }}>
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//                         when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                         It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
//                         It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
//                         and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

//                       </Text>
//                     </View>
//                   </ScrollView>
//                 </View>
//               </View>
//             </Modal>
//           </View>

//           {/* ================================================================= Tiem Duration Model================================================================ */}
//           <View  >
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible1}
//             >
//               <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
//                 <View style={styles.modalCard}>
//                   <View style={styles.modalHeader}>
//                     <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.DurationTxt[config.language]}</Text>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible1(!modalVisible1)}>
//                       <Image style={styles.backIcon_CLOSE} resizeMode='contain'
//                         source={require("./Icon/close2.png")}></Image>
//                     </TouchableOpacity>
//                   </View>
//                   <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

//                   <ScrollView>
//                     <View style={{ alignItems: 'center', padding: mobileW * 3 / 100, }}>

//                       {/* ================================================================= Date / Time ================================================================ */}

//                       <View style={{ flexDirection: 'row', width: mobileW * 84 / 100, justifyContent: 'space-between' }}>
//                         {timePicker && (                                                                   //Date Picker
//                           <DateTimePicker
//                             mode={'date'}
//                             value={new Date(Date.now())}
//                             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                             is24Hour={false}
//                             onChange={text => setDatetoFunction(text)} />)}
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setTimePicker(true)} style={styles.CalanderView}>
//                           <Image resizeMode='contain' style={styles.iconQuestionMark}
//                             source={require('./Icon/icon_calendar.png')}></Image>
//                           <Text style={styles.calanderText}>{date}</Text>
//                         </TouchableOpacity>

//                         {datePicker && (                                                                   //Date Picker
//                           <DateTimePicker
//                             mode={'time'}
//                             value={new Date(Date.now())}
//                             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                             is24Hour={false}
//                             onChange={text => setTimetoFunction(text)} />)}
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} style={styles.CalanderView_time}>
//                           <Image resizeMode='contain' style={styles.iconQuestionMark}
//                             source={require('./Icon/icon_calendar.png')}></Image>
//                           <Text style={styles.calanderText}>{time}</Text>
//                         </TouchableOpacity>
//                       </View>

//                       <View style={{ marginTop: mobileW * 5 / 100, flexDirection: 'row', width: mobileW * 84 / 100, justifyContent: 'space-between' }}>

//                         <TextInput
//                           placeholder={Lang_chg.Concernfeeper[config.language]}
//                           placeholderTextColor={Colors.black_color}
//                           fontSize={mobileW * 3.6 / 100}
//                           paddingLeft={mobileW * 2 / 100}
//                           color={Colors.black_color}
//                           fontFamily={Font.FontRegular}
//                           style={styles.userCharges}
//                           onChangeText={(text) => { setPrice(text) }}
//                           value={price}
//                           keyboardType={'number-pad'} />


//                         {Percentage != "" ?
//                           <View style={styles.userCharges1}>
//                             <Text style={styles.multipletext}>{Percentage}</Text>
//                           </View>
//                           :
//                           <View style={styles.userCharges_deduction}>
//                             <Text style={styles.multipletext}>{Lang_chg.UserEarningTxt[config.language]}</Text>
//                           </View>
//                         }

//                       </View>
//                     </View>
//                     {/* =================================================================================================================================================================================== */}

//                     <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, marginHorizontal: mobileW * 3 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.SessionDurationTxt[config.language]}</Text>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => { setDuration(true), setModalVisible1(false) }} style={styles.TimeView}>
//                       <Image resizeMode='contain' style={[styles.iconQuestionMark, { right: mobileW * -2 / 100 }]}
//                         source={require('./Icon/icon_calendar.png')}></Image>
//                       <Text style={[styles.calanderText, { marginHorizontal: mobileW * 8 / 100, marginTop: mobileW * 1 / 100, fontSize: mobileW * 3.5 / 100 }]}>{Timeoutminut == Timeoutminut ? Timeoutminut : "HH:MM"}</Text>
//                     </TouchableOpacity>




//                     <View style={{ padding: mobileW * 1 / 100, flexDirection: 'row', marginTop: mobileW * 3 / 100, marginBottom: mobileW * 1.5 / 100 }}>
//                       <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} activeOpacity={0.8} style={styles.ModelButton}>
//                         <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.CancelTxt[config.language]}</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} activeOpacity={0.8} style={[styles.ModelButton, { marginHorizontal: mobileW * 2 / 100, backgroundColor: Colors.white_color, }]}>
//                         <Text style={{ color: Colors.themecolor, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.OkTxt[config.language]}</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </ScrollView>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   Header: {
//     backgroundColor: Colors.white_color,
//     width: mobileW,
//     height: mobileW * 15 / 100,
//     paddingLeft: mobileW * 4 / 100,
//     paddingRight: mobileW * 4 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   backIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.black_color
//   },
//   backIcon_CLOSE: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.color_orange
//   },
//   backIcon_: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     // tintColor: Colors.white_color
//   },
//   multipletext: {
//     fontSize: mobileW * 3.8 / 100,
//     color: Colors.black_color,
//     fontFamily: Font.FontRegular,
//     left: mobileW * 1 / 100
//   },
//   DetailsCard: {
//     width: mobileW * 98 / 100,
//     backgroundColor: Colors.white_color,
//     borderRadius: mobileW * 1 / 100,
//     margin: mobileW * 1 / 100,
//     padding: mobileW * 2 / 100,
//     alignSelf: 'center',
//     borderWidth: mobileW * 0.2 / 100,
//     borderColor:'#E7E8EA',
//   },
//   StudentLernerView: {
//     width: mobileW * 16 / 100,
//     height: mobileW * 16 / 100,
//     justifyContent: 'center',
//     borderWidth: mobileW * 0.5 / 100,
//     borderColor: Colors.themecolor,
//     borderRadius: mobileW * 10 / 100
//   },
//   chatBtn: {
//     width: mobileW * 43 / 100,
//     height: mobileW * 12 / 100,
//     marginHorizontal: mobileW * 4 / 100,
//     borderWidth: mobileW * 0.2 / 100,
//     borderColor: Colors.themecolor,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: mobileW * 1 / 100,
//     backgroundColor: Colors.white_color
//   },
//   selectBtn: {
//     width: mobileW * 43 / 100,
//     height: mobileW * 12 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: mobileW * 1 / 100,
//     backgroundColor: Colors.themecolor,
//     borderColor: Colors.themecolor,
//     borderWidth: mobileW * 0.2 / 100
//   },

//   TimeView: {
//     // marginLeft: mobileW * 3 / 100,
//     marginTop: mobileW * 1 / 100,
//     width: mobileW * 40 / 100,
//     height: mobileW * 13 / 100,
//     backgroundColor: Colors.whiteColor,
//     borderRadius: mobileW * 1 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: Colors.themecolor,
//     borderWidth: mobileW * 0.3 / 100,
//     margin: mobileW * 3 / 100,

//   },
//   userCharges1: {
//     width: mobileW * 40 / 100,
//     height: mobileW * 14 / 100,
//     borderWidth: mobileW * 0.3 / 100,
//     borderRadius: mobileW * 1 / 100,
//     borderColor: Colors.themecolor,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   userCharges: {
//     width: mobileW * 40 / 100,
//     height: mobileW * 14 / 100,
//     borderRadius: mobileW * 1 / 100,
//     borderWidth: mobileW * 0.3 / 100,
//     borderColor: Colors.themecolor,
//     backgroundColor: Colors.white_color,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userCharges_deduction: {
//     width: mobileW * 40 / 100,
//     height: mobileW * 14 / 100,
//     borderRadius: mobileW * 1 / 100,
//     borderWidth: mobileW * 0.3 / 100,
//     borderColor: Colors.themecolor,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   input: {
//     height: mobileW * 12 / 100,
//     margin: mobileW * 2 / 100,
//     borderRadius: mobileW * 1 / 100,
//     borderWidth: 1,
//     padding: mobileW * 2 / 100,
//     borderColor: Colors.themecolor
//   },
//   CalanderView: {
//     width: mobileW * 40 / 100,
//     height: mobileW * 14 / 100,
//     marginTop: mobileW * 3 / 100,
//     borderRadius: mobileW * 1 / 100,
//     padding: mobileW * 2 / 100,
//     borderWidth: mobileW * 0.3 / 100,
//     borderColor: Colors.themecolor,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   CalanderView_time: {
//     width: mobileW * 40 / 100,
//     height: mobileW * 14 / 100,
//     marginTop: mobileW * 3 / 100,
//     borderRadius: mobileW * 1 / 100,
//     padding: mobileW * 2 / 100,
//     borderWidth: mobileW * 0.3 / 100,
//     borderColor: Colors.themecolor,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   modalHeader: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: mobileW * 90 / 100,
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     paddingLeft: mobileW * 3 / 100,
//     paddingRight: mobileW * 3 / 100,
//     backgroundColor: Colors.white_color
//   },
//   sessionDurationView: {
//     width: mobileW * 40 / 100,
//     marginHorizontal: mobileW * 2 / 100,
//     height: mobileW * 13 / 100,
//     marginTop: mobileW * 1 / 100,
//     borderRadius: mobileW * 1 / 100,
//     padding: mobileW * 2 / 100,
//     borderWidth: mobileW * 0.5 / 100,
//     borderColor: Colors.themecolor,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   calanderText: {
//     color: Colors.gray,
//     alignSelf: 'center',
//     fontSize: mobileW * 3.5 / 100,
//     fontFamily: Font.FontMedium,
//     marginHorizontal: mobileW * 3.2 / 100
//   },
//   sessionDuration: {
//     color: Colors.gray,
//     fontSize: mobileW * 4 / 100,
//     fontFamily: Font.FontMedium,
//     marginHorizontal: mobileW * 2 / 100
//   },
//   iconQuestionMark: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.gray,

//   },
//   modalCard: {
//     width: mobileW * 90 / 100,
//     borderRadius: mobileW * 3 / 100,

//     backgroundColor: Colors.white_color,
//     elevation: 5
//   },
//   ModelButton: {
//     width: mobileW * 40 / 100,
//     height: mobileW * 10 / 100,
//     borderRadius: mobileW * 1 / 100,
//     marginHorizontal: mobileW * 2 / 100,
//     borderWidth: mobileW * 0.3 / 100,
//     borderColor: Colors.themecolor,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.themecolor,
//   },
//   Alert_text: {
//     color: Colors.black_color,
//     fontSize: mobileW * 4 / 100,
//     fontFamily: Font.FontMedium
//   },
//   modal_commission: {
//     flex: 1,
//     // paddingVertical:mobileH*7/100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#00000060'
//   },
//   DurationModelHeader: {
//     width: mobileW * 90 / 100,
//     // marginBottom: mobileW * 5 / 100,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: mobileW * 13 / 100,
//     borderTopLeftRadius: mobileW * 3 / 100,
//     borderTopRightRadius: mobileW * 3 / 100,
//     paddingLeft: mobileW * 3 / 100,
//     paddingRight: mobileW * 3 / 100,
//     backgroundColor: Colors.white_color
//   },
//   SuccessmodalHeader: {
//     width: mobileW * 90 / 100,
//     // marginBottom: mobileW * 5 / 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: mobileW * 13 / 100,
//     borderTopLeftRadius: mobileW * 3 / 100,
//     borderTopRightRadius: mobileW * 3 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   DurationCard: {
//     width: mobileW * 90 / 100,
//     // height:mobileH*90/100,
//     borderRadius: mobileW * 3 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 5
//   },

//   Ok_CancelBtn: {
//     width: mobileW * 22 / 100,
//     height: mobileW * 8 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 2 / 100,
//     borderWidth: mobileW * 0.2 / 100,
//     borderColor: Colors.themecolor,
//     alignSelf: "center",
//     alignItems: 'center',
//     justifyContent: 'center',
//     // marginTop: mobileW * 2 / 100,
//     // marginBottom: mobileW * 3 / 100,
//     marginHorizontal: mobileW * 1 / 100
//   },
//   Ok_Btn: {
//     width: mobileW * 22 / 100,
//     height: mobileW * 8 / 100,
//     backgroundColor: Colors.white_color,
//     borderRadius: mobileW * 2 / 100,
//     borderWidth: mobileW * 0.2 / 100,
//     borderColor: Colors.themecolor,
//     alignSelf: "center",
//     alignItems: 'center',
//     justifyContent: 'center',
//     // marginTop: mobileW * 2 / 100,
//     // marginBottom: mobileW * 3 / 100,
//     marginHorizontal: mobileW * 1 / 100
//   },
//   modalHeader1: {
//     width: mobileW * 90 / 100,
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     paddingLeft: mobileW * 3 / 100,
//     paddingRight: mobileW * 3 / 100,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.white_color
//   }
// }
// )
