import { Modal, Alert, Share, ScrollView, TextInput, StatusBar, Animated, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { localStorage } from './Provider/localStorageProvider';
import axios from 'axios';
import moment from 'moment';
import { log } from 'react-native-reanimated';
import { getDate, set } from 'date-fns';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { id } from 'date-fns/locale';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const data2 = [
  { label: '30', value: '1' },
  { label: '35', value: '2' },
  { label: '45', value: '3' },
];

const LearnerRequest = [
  {
    id: 1,
    name: 'Jointh Smith',
    learnerImage: require('./Icon/12.jpg'),
    rquestDate: 'Jul 07, 2023',
    IsSuggested: false
  },
  {
    id: 2,
    name: 'Shubham Mahajan',
    learnerImage: require('./Icon/12.jpg'),
    rquestDate: 'Jul 08, 2023',
    IsSuggested: false
  }
]

export default function SessionRequestBasic({ navigation, route }) {
  const data = route.params.Active;
  console.log("route", data);
  const item = route.params.item;
  console.log("Active Data-------", data)
  console.log("Active item========", item.Id)

  const [Learner_Request, setLearner_Request] = useState(LearnerRequest)
  const [change, setChange] = useState('Accept')
  const [reject, setReject] = useState('reject')
  const [userMode, setuserMode] = useState();
  const [request_DetailData, setrequestDetailData] = useState({})
  console.log("Request DetailsData Here", request_DetailData);
  const [learnerList, setlearnerList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('Dance');
  const [shouldShow, setShouldShow] = useState(0)
  const [firstname, setFirstname] = useState('');
  const [textmodal, settextmodal] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [datePicker, setShow] = useState(false);
  const [date, setdate] = useState(Lang_chg.StartDateTxt[config.language]);
  const [time, setTime] = useState(Lang_chg.StartTimeTxt[config.language]);
  const [EndTimeCheck, setEndTimeCheck] = useState(new Date(Date.now()))

  // =============================================== Accept  Request ==============================================
  const ApplyBtn = (itemId) => {
    setLearner_Request((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, IsSuggested: !item.IsSuggested } : item
      )
    );
  };
  // =============================================== remove  Request ==============================================
  const removeItem = (itemId) => {
    const updatedItems = Learner_Request.filter(item => item.id !== itemId);
    setLearner_Request(updatedItems);
  };

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
    console.log(given_time, "time selected here ")
    setShow(false)
    var formateDate = given_time.nativeEvent.timestamp
    console.log(formateDate, "formateDate selected here ")
    var hours = new Date(formateDate).getHours(); //Current Hours
    var min = new Date(formateDate).getMinutes(); //Current Minutes
    var sec = new Date(formateDate).getSeconds(); //Current Seconds

    var formattedDate = hours + ":" + min + ":" + sec
    setTime(formattedDate)
    console.log('Time is here===========', formattedDate);

  }


  // ======= share 
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    SetMode()
    setTimeout(() => {
      // setModalVisible_loadergif(false)
    }, 2000);

    ApiCalling();
  }, [])
  const SetMode = async (data) => {
    const value = await localStorage.getItemString('UserMode')
    console.log("..........", value);
    setuserMode(value)
  }

  const ApiCalling = () => {
    // setModalVisible_loadergif(true)
    axios.get('https://mavenow.com:8001/userrequest/Processing/discipleormaster/848/' + item.Id + '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NzQ5NTc5Nn0.hp75g4O_N7R7MVkAyeWYiMlfglGAXP5Sl9pGohbPUYY', {

    })
      .then(function (data) {
        var GetData = data.data.result
        var requestDetailData = data.data.requestDetail
        //    setActived(GetData) 
        setrequestDetailData(requestDetailData)
        // console.log('Completed API ========= >', GetData)
        // console.log('Completed API Details ========= >', requestDetailData)
        setlearnerList(GetData)


        // if(StatusCode!=200) {
        //   setCompleted(GetData) 
        //   // navigation.navigate('Home')
        //   // navigation.navigate('Testing')
        //   console.log('Completed API ========= >',GetData)
        // }else{

        // }

      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />

        <ScrollView

          refreshControl={
            <RefreshControl
              // tintColor={Colors.themecolor}
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
          {/* // =======>  about text modal // ========> */}

          {/*====> Header  =====>*/}

          <View style={styles.Header}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
              </TouchableOpacity>

            </View>
            <View style={{ width: mobileW * 65 / 100, marginLeft: mobileW * 1 / 100 }}>
              <Text style={styles.HeaderName}>{item.TypeOfRequest == 'teaching' ? 'Session Request' : 'Learning Request'} - {request_DetailData.Skills} ({item.TypeOfRequest == 'teaching' ? request_DetailData.skill_level : request_DetailData.Skills})</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>


              <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 1 / 100 }} onPress={() => settextmodal(true)}>
                <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'black', }} resizeMode="stretch" source={require("./Icon/about.png")}></Image>
              </TouchableOpacity>
            </View>
          </View>





          {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Maven Details +++++++++++++++++++++++++++++++++++++++++++++++ */}


          <View>
            <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100, padding: mobileW * 4 / 100, }}>
              <View style={{ width: mobileW * 18 / 100, }}>
                <View>
                  <Image resizeMode='contain' style={{ width: mobileW * 16 / 100, height: mobileW * 16 / 100, borderRadius: mobileW * 9 / 100 }}
                    source={require('./Icon/12.jpg')}></Image>
                </View>
              </View>
              <View style={{ width: mobileW * 74 / 100, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{request_DetailData.FullName} {Lang_chg.MavenTxt[config.language]}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => onShare()}>
                    <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/share.png")}></Image>
                  </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                  <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', }}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.CourseNameTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 12 / 100, }}>Kotlin</Text>
                  </View>
                  <View style={styles.manageView}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.StartDateTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 21 / 100, }}>{moment(new Date(request_DetailData.StartDate)).format('MMM DD, YYYY')}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                  <View style={styles.manageView}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.EndDateTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 19 / 100, }}>{moment(new Date(request_DetailData.Enddate)).format('MMM DD, YYYY')}</Text>
                  </View>
                  <View style={styles.manageView}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.DurationTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 12 / 100, }}>{request_DetailData.CourseDuration}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                  <View style={styles.manageView}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.SessionTimeTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 13 / 100, }}>{request_DetailData.startduration} hours</Text>
                  </View>
                  <View style={styles.manageView}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.SkillsTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 18 / 100, }}>{request_DetailData.Skills}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                  <View style={styles.manageView}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.LevelTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{item.TypeOfRequest == 'teaching' ? request_DetailData.skill_level : request_DetailData.Skills}</Text>
                  </View>
                  <View style={styles.manageView}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, textAlign: 'center', }}>{Lang_chg.PostdateTxt[config.language]} </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 18 / 100, }}>{moment(new Date(request_DetailData.DateOfRequest)).format('MMM DD, YYYY')}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
                  <View style={styles.manageView}>
                    <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, }}>{Lang_chg.FeeTxt[config.language]} </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, }}>{request_DetailData.Charges}</Text>
                      <Text style={styles.rsTxt}>RS</Text>
                    </View>
                  </View>
                  <View style={{ width: mobileW * 37 / 100, }}>
                    <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.green, alignSelf: 'flex-end' }}>{Lang_chg.ApplyTillTxt[config.language]} {moment(new Date(request_DetailData.AppliedTill)).format('MMM DD, YYYY')}</Text>
                  </View>
                </View>

              </View>

            </View>
            <View style={{ width: mobileW, height: mobileW * 0.3 / 100, backgroundColor: '#E7E8EA' }}></View>
          </View>



          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={styles.ScheduleHeader}>
            <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{Lang_chg.SCHEDULESESSIONTxt[config.language]}</Text>
          </TouchableOpacity>

          <Text style={styles.appliedlearner}>{Lang_chg.AppliedlearnerTxt[config.language]}</Text>

          <View style={{}}>
            <FlatList
              data={Learner_Request}
              renderItem={({ item }) =>

                <View style={{}} >
                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AutomationTesting')} style={{ width: mobileW * 92 / 100, flexDirection: 'row', marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100, }}>
                    <View style={{ width: mobileW * 18 / 100, }}>
                      <Image resizeMode='contain' style={{ width: mobileW * 16 / 100, height: mobileW * 16 / 100, borderRadius: mobileW * 9 / 100 }} source={item.learnerImage}></Image>
                    </View>
                    <View style={{ width: mobileW * 74 / 100, }}>
                      <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{item.name}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.RequestDateTxt[config.language]} </Text>
                        <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.gray, }}>{item.rquestDate}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.PaymentStatusTxt[config.language]} </Text>
                        <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{request_DetailData.isPaid == '0' ? 'Unpaid' : 'Paid'}</Text>
                      </View>


                      <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, alignSelf: "flex-end" }}>

                        {!item.IsSuggested ? (
                          <TouchableOpacity activeOpacity={0.8} style={styles.ApplyBtn} onPress={() => ApplyBtn(item.id)} >
                            <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color, }}>{Lang_chg.ApplyTxt[config.language]}</Text>
                          </TouchableOpacity>)
                          :
                          null}



                        <View>
                          {!item.IsSuggested ? (
                            <TouchableOpacity activeOpacity={0.8} style={styles.RejectBtn} onPress={() => removeItem(item.id)}>
                              <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor, }}>{Lang_chg.RejectTxt[config.language]}</Text>
                            </TouchableOpacity>)
                            : <TouchableOpacity activeOpacity={0.8} style={styles.AcceptedButton}>
                              <Text style={{ color: Colors.themecolor, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.Applied[config.language]}</Text>
                            </TouchableOpacity>}</View>

                      </View>

                    </View>

                  </TouchableOpacity>
                  <View style={{ width: mobileW, height: mobileW * 0.3 / 100, backgroundColor: '#E7E8EA', marginBottom: mobileW * 10 / 100, marginTop: mobileW * 4 / 100 }}></View>
                </View>} />
          </View>




          {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

          <View  >
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.ModelCard}>
                  <View style={styles.ModelHeader}>
                    <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, }}>{Lang_chg.CreateSessionTxt[config.language]}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  >
                      <Image style={[styles.close_Icon,]} resizeMode='contain'
                        source={require("./Icon/close2.png")}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                  <ScrollView>
                    <View style={{ alignItems: 'center', padding: mobileW * 3 / 100, }}>

                      <TextInput style={styles.ClassNameView}
                        // style={styles.input}
                        onChangeText={setFirstname}
                        value={firstname}
                        placeholderTextColor={Colors.gray}
                        placeholder={Lang_chg.ClassNameTxt[config.language]}
                        color={Colors.black_color} fontFamily={Font.FontRegular} />

                      {/* =================================================== Date / Time ================================================================ */}

                      <View style={{ flexDirection: 'row', width: mobileW * 85 / 100, justifyContent: 'space-between', }}>
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
                            minimumDate={EndTimeCheck}
                            onChange={text => setTimetoFunction(text)} />)}
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} style={styles.CalanderView}>
                          <Image resizeMode='contain' style={styles.iconQuestionMark} source={require('./Icon/icon_calendar.png')}></Image>
                          <Text style={styles.calanderText}>{time}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.courseDurationText}>{Lang_chg.CourseDurationTxt[config.language]}</Text>

                    <View>
                      <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data2}
                        search
                        Mode={"outlined"}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        // placeholder={!isFocus ?{Lang_chg.Dance[config.language]}: '...'}
                        // placeholder={Lang_chg.Dance[config.language]}
                        placeholderTextColor={Colors.gray}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setValue(item.value);
                          setIsFocus(false);
                        }}
                      />
                    </View>

                    <Text style={styles.learnerListText}>{Lang_chg.LearnerListTxt[config.language]}</Text>
                    <View style={styles.mavenSelectBox}>
                      <Text style={styles.MavenTxt}>{Lang_chg.MavenTxt[config.language]}</Text>
                      <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
                        {shouldShow ? (
                          <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, tintColor: Colors.themecolor, height: mobileW * 5 / 100 }}
                            source={require('./Icon/check.png')}></Image>) :
                          <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, tintColor: Colors.themecolor, height: mobileW * 5 / 100 }}
                            source={require('./Icon/square.png')}></Image>}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.underline}></View>

                    <View style={{ padding: mobileW * 1 / 100, marginBottom: mobileW * 5 / 100, justifyContent: 'space-between', flexDirection: 'row', marginTop: mobileW * 5 / 100 }}>

                      <TouchableOpacity activeOpacity={0.8} style={styles.ModelButton} onPress={() => setShouldShow('shouldShow')}>
                        <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.3 / 100, textAlign: 'center', fontFamily: Font.FontMedium, }}>{Lang_chg.SelectallTxt[config.language]}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setShouldShow()} activeOpacity={0.8} style={[styles.ModelButton, { backgroundColor: Colors.white_color }]}>
                        <Text style={{ color: Colors.themecolor, fontSize: mobileW * 3.3 / 100, textAlign: 'center', fontFamily: Font.FontMedium, }}>{Lang_chg.DeselectTxt[config.language]}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.8} style={[styles.ModelButton,]} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.3 / 100, textAlign: 'center', fontFamily: Font.FontMedium, }}>{Lang_chg.SubmitTxt[config.language]}</Text>
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
  manageView: {
    width: mobileW * 37 / 100,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  rsTxt: {
    fontSize: mobileW * 2.5 / 100,
    fontFamily: Font.FontRegular,
    color: Colors.themecolor,
    alignSelf: 'flex-end'
  },
  croseImage: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    borderRadius: mobileW * 2 / 100,
    tintColor: Colors.themecolor
  },
  searchView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon_edit: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange,
  },
  TextInputView: {
    backgroundColor: Colors.white_color,
    width: mobileW * 92 / 100,
    flexDirection: 'row',
    borderRadius: mobileW * 2 / 100,
    alignItems: 'center',
    borderWidth: mobileW * 0.5 / 100,
    borderColor: Colors.themecolor
  },
  TextInput: {
    width: mobileW * 82 / 100,
    borderRadius: mobileW * 1 / 100,
    height: mobileW * 10 / 100,
    fontSize: mobileW * 3.3 / 100,
    fontFamily: Font.FontMedium,
    backgroundColor: Colors.white_color,
    color: Colors.black_color
  },
  close_Icon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange
  },
  HeaderName: {
    color: Colors.blackColor,
    fontSize: mobileW * 3.5 / 100,
    textAlign: 'center',
    fontFamily: Font.FontSemiBold
  },
  appliedlearner: {
    fontFamily: Font.FontMedium,
    color: Colors.black_color,
    margin: mobileW * 4 / 100,
    fontSize: mobileW * 4 / 100
  },
  SkillsinHeader: {
    color: Colors.blackColor,
    fontSize: mobileW * 3 / 100,
    textAlign: 'center',
    marginTop: mobileW * -1 / 100,
    fontFamily: Font.FontRegular
  },
  ApplyBtn: {
    width: mobileW * 18.4 / 100,
    height: mobileW * 7.4 / 100,
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 2 / 100,
    backgroundColor: Colors.themecolor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
  },
  RejectBtn: {
    width: mobileW * 18.4 / 100,
    height: mobileW * 7.4 / 100,
    borderRadius: mobileW * 1 / 100,
    backgroundColor: Colors.white_color,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    borderColor: Colors.themecolor,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
  },
  ClassNameView: {
    width: mobileW * 85 / 100,
    borderColor: Colors.themecolor,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 2 / 100,
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 2 / 100,
    borderWidth: mobileW * 0.3 / 100
  },
  placeholderStyle: {
    fontSize: mobileW * 3 / 100,
    fontFamily: Font.FontMedium,
    marginHorizontal: mobileW * 1 / 100,
  },
  MavenTxt: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.gray,
    marginHorizontal: mobileW * 2 / 100,
    fontFamily: Font.FontMedium,
  },
  selectedTextStyle: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
  },
  iconStyle: {
    width: mobileW * 7 / 100,
    height: mobileW * 2 / 100,
  },
  inputSearchStyle: {
    height: mobileW * 10 / 100,
    fontSize: mobileW * 3.5 / 100,
    fontFamily: Font.FontMedium,
  },
  ModelButton: {
    width: mobileW * 26 / 100,
    height: mobileW * 9 / 100,
    justifyContent: 'center',
    borderWidth: mobileW * 0.2 / 100,
    borderColor: Colors.themecolor,
    alignItems: 'center',
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 1 / 100,
    marginHorizontal: mobileW * 1.5 / 100,
  },
  dropdown: {
    height: mobileW * 12 / 100,
    width: mobileW * 85 / 100,
    alignSelf: 'center',
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    borderRadius: mobileW * 1 / 100,
    paddingHorizontal: mobileW * 3 / 100,
  },
  ModelCard: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
  },
  ScheduleHeader: {
    width: mobileW * 96 / 100,
    height: mobileW * 8 / 100,
    marginTop: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    borderColor: '#e8edfb',
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center'
  },
  ModelHeader: {
    width: mobileW * 90 / 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 3 / 100,
    borderTopRightRadius: mobileW * 3 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    backgroundColor: Colors.white_color
  },
  courseDurationText: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.themecolor,
    marginBottom: mobileW * 2 / 100,
    marginHorizontal: mobileW * 2 / 100,
    fontFamily: Font.FontMedium,
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
  CalanderView: {
    width: mobileW * 40 / 100,
    height: mobileW * 12 / 100,
    marginTop: mobileW * 3 / 100,
    borderRadius: mobileW * 1 / 100,
    padding: mobileW * 2 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sessionDurationView: {
    width: mobileW * 40 / 100,
    marginHorizontal: mobileW * 2 / 100,
    height: mobileW * 13 / 100,
    marginTop: mobileW * 1 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.5 / 100,
    borderColor: Colors.themecolor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  learnerListText: {
    fontSize: mobileW * 3.5 / 100,
    color: Colors.themecolor,
    marginHorizontal: mobileW * 2 / 100,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 2 / 100
  },
  mavenSelectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: mobileW * 85 / 100,
    marginTop: mobileW * 2 / 100
  }

})



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old Design ++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { View, StatusBar, ScrollView, FlatList, Modal, Alert, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { Colors, Font } from './Provider/Colorsfont';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Stack, TextInput, } from "@react-native-material/core";
// import { config, msgProvider, msgText, consolepro, Lang_chg,  msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import { localStorage } from './Provider/localStorageProvider';
// // import { flingHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import moment from 'moment';
// import axios from 'axios';
// import { Dropdown } from 'react-native-element-dropdown';


// const data2 = [
//     { label: '30', value: '1' },
//     { label: '35', value: '2' },
//     { label: '45', value: '3' },
// ];
// //============================================Other Applicants==================================
// const OtherApplicant = [
//     {
//         id: 1,
//         image: require("./Icon/icon_maven.png"),
//         name: 'Shubham Mahajan',
//         paymentstatuss: 'Paid',
//         startdate: 'Dec 15, 2022',
//         enddate: 'Dec 18, 2022'
//     },
// ];
// const Syllabus_list = [
//     {
//       Id:1,
//       title: 'Firebase syllabus 1',
//       status:false,
//       items: [
//         { subtitle: 'Firebase syllabus Topic 1' },
//         { subtitle: 'Firebase syllabus Topic 2' },
//         { subtitle: 'Firebase syllabus Topic 3' },
//       ]
//     },
//     {
//       Id:2,
//       title: 'Firebase syllabus 2',
//       status:false,
//       items: [
//         { subtitle: 'Firebase syllabus Topic 1' },
//         { subtitle: 'Firebase syllabus Topic 2' },
//         { subtitle: 'Firebase syllabus Topic 3' },
//       ]
//     }
//   ]

// const SessionRequestBasic = ({ navigation, route }) => {
//     const [listShow, setlistShow] = useState(Syllabus_list);
//     const [checked, setChecked] = useState('Syllabus')
//     // const [ModalValue, setModalVale] = useState(0)
 
//     const [userMode, setuserMode] = useState();

//     const [shouldShow, setShouldShow] = useState(0)
//     const [modalVisible, setModalVisible] = useState(false);
//     const [learnerList, setlearnerList] = useState([]);
//     const [modalVisible_loadergif, setModalVisible_loadergif] = useState(false);


//     const [firstname, setFirstname] = useState('');
//     //Dite & Time Picker

//     const [datePicker, setShow] = useState(false);
//     const [timePicker, setTimePicker] = useState(false);
//     const [date, setdate] = useState(Lang_chg.StartDateTxt[config.language]);
//     const [time, setTime] = useState(Lang_chg.StartTimeTxt[config.language]);

//     const [isFocus, setIsFocus] = useState(false);
//     const [value, setValue] = useState('Dance');
//     const [change, setChange] = useState('Accept')
//     const [reject, setReject] = useState('reject')
//     const [request_DetailData, setrequestDetailData] = useState({})

//     // const data = route.params.Active;
//     const item = route.params.item;
//     // console.log("Active Data-------", data)
//     // console.log("Active item========", item.Id)


  

//     const setDatetoFunction = (date) => {
//         setTimePicker(false)
//         setTimeout(() => {
//             console.log(timePicker);
//         }, 500);

//         var formateDate = date.nativeEvent.timestamp
//         let newDate = moment(new Date(formateDate)).format('DD/MM/YYYY')
//         setdate(newDate)
//         console.log('date is here--------->>>>>>', newDate);
//     }

//     const setTimetoFunction = (given_time) => {
//         console.log(given_time)
//         setShow(false)
//         var formateDate = given_time.nativeEvent.timestamp
//         var hours = new Date(formateDate).getHours(); //Current Hours
//         var min = new Date(formateDate).getMinutes(); //Current Minutes
//         var sec = new Date(formateDate).getSeconds(); //Current Seconds

//         var formattedDate = hours + ":" + min + ":" + sec
//         setTime(formattedDate)
//         console.log('Time is here===========', formattedDate);

//     }
  

//     useEffect(() => {
//          SetMode()
//         setTimeout(() => {
//             setModalVisible_loadergif(false)
//         }, 2000);

//         ApiCalling();
//     }, [])
//     const SetMode = async (data) => {
//         const value = await localStorage.getItemString('UserMode')
//         console.log("..........", value);
//         setuserMode(value)
//     }

//     const syllabusList = (index) => {
//         var DataToset = listShow
//         for (let i = 0; i < DataToset.length; i++) {
//           DataToset[i].status = false;
//         }
//         DataToset[index].status = ! DataToset[index].status 
//         setlistShow(DataToset)
//       console.log('shouldShow----',DataToset);
        
//      }

//      const set_Subtitle = (item) => {
//         console.log("You Select ++++++++ ", item.subtitle);
//         // if (ModalValue == 0) {
//         // console.log("skillName", item.subtitle);
//         // }
//       }

//     const ApiCalling = () => {
//         setModalVisible_loadergif(true)
//         axios.get('https://mavenow.com:8001/userrequest/Processing/discipleormaster/848/' + item.Id + '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NzQ5NTc5Nn0.hp75g4O_N7R7MVkAyeWYiMlfglGAXP5Sl9pGohbPUYY', {

//         })
//             .then(function (data) {
//                 var GetData = data.data.result
//                 var requestDetailData = data.data.requestDetail
//                 //    setActived(GetData) 
//                 setrequestDetailData(requestDetailData)
//                 // console.log('Completed API ========= >', GetData)
//                 // console.log('Completed API Details ========= >', requestDetailData)
//                 setlearnerList(GetData)


//                 // if(StatusCode!=200) {
//                 //   setCompleted(GetData) 
//                 //   // navigation.navigate('Home')
//                 //   // navigation.navigate('Testing')
//                 //   console.log('Completed API ========= >',GetData)
//                 // }else{

//                 // }

//             })
//             .catch(function (error) {
//                 console.log('======>', error);
//             });
//     }

//     return (
//         <View style={{ flex: 1, }}>
//             <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
//                 <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
//                 {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
//                 <View style={styles.Header}>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 3 / 100 }} onPress={() => navigation.goBack()}>
//                             <Image style={styles.backIcon_} resizeMode='contain'
//                                 source={require("./Icon/bk.png")}></Image>
//                         </TouchableOpacity>
//                         <View style={{ width: mobileW * 71 / 100, }}>
//                             <Text style={styles.HeaderText}>{item.TypeOfRequest == 'teaching' ? 'Session Request' : 'Learning Request'} - {request_DetailData.Skills} ({item.TypeOfRequest == 'teaching' ? request_DetailData.skill_level : request_DetailData.Skills})</Text>
//                         </View>
//                     </View>
//                     <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }} >
//                         <Image style={styles.backIcon} resizeMode='contain'
//                             source={require("./Icon/icon_info.png")}></Image>
//                     </TouchableOpacity>
//                 </View>
//                 {/* ====================================================HEADER CLOSE============================================ */}
//                 <ScrollView >

//                     <View style={styles.cardView}>
//                         <View style={styles.cardHeader}>
//                             <View style={{ width: mobileW * 20 / 100, borderTopLeftRadius: mobileW * 2 / 100, }}></View>
//                             <View style={styles.cardHeaderr}>
//                                 <View style={{ width: mobileW * 50 / 100, justifyContent: 'space-between' }}>
//                                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium }}>{request_DetailData.FullName} {Lang_chg.MavenTxt[config.language]}</Text>
//                                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 3 / 100, fontFamily:Font.FontRegular }}>{request_DetailData.Skills} ({item.TypeOfRequest == 'teaching' ? request_DetailData.skill_level : request_DetailData.Skills})</Text>
//                                 </View>
//                                 {/* <TouchableOpacity activeOpacity={0.8}>
//                                     <Image resizeMode='contain' style={styles.shareicon}
//                                         source={require('./Icon/share.png')}></Image>
//                                 </TouchableOpacity> */}
//                             </View>

//                         </View>
//                         <View style={{ flexDirection: 'row' }}>
//                             <View style={{ width: mobileW * 21 / 100, }}>
//                                 <View style={styles.imageCard}>
//                                     <Image style={styles.imageIcon} resizeMode='contain'
//                                         source={require("./Icon/icon_maven.png")}
//                                     ></Image>
//                                 </View>
//                             </View>
//                             <View>
//                                 <View style={{ flexDirection: 'row' }}>
//                                     <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{moment(new Date(request_DetailData.StartDate)).format('MMM DD, YYYY')}</Text>
//                                     </View>

//                                     <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium}}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{moment(new Date(request_DetailData.Enddate)).format('MMM DD, YYYY')}</Text>
//                                     </View>

//                                     <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.DurationTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{request_DetailData.CourseDuration}</Text>
//                                     </View>
//                                 </View>
//                                 <View style={{ flexDirection: 'row' }}>
//                                     <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.SessionTimeTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{request_DetailData.startduration} hours</Text>
//                                     </View>

//                                     <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{request_DetailData.Skills}</Text>
//                                     </View>

//                                     <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.LevelTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{item.TypeOfRequest == 'teaching' ? request_DetailData.skill_level : request_DetailData.Skills}</Text>
//                                     </View>
//                                 </View>
//                                 <View style={{ flexDirection: 'row' }}>
//                                     {/* <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.4 / 100, color: Colors.black_color }}>Category</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray }}>{request_DetailData.SkillsCategory}</Text>
//                                     </View> */}
//                                     <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.PostdateTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{moment(new Date(request_DetailData.DateOfRequest)).format('MMM DD, YYYY')}</Text>
//                                     </View>
//                                     <View style={{ width: mobileW * 50 / 100, marginTop: mobileW * 2 / 100, }}>
//                                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.sessionincludesTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{request_DetailData.ShortDescription}</Text>
//                                     </View>
//                                 </View>
//                                 {/* <View style={{ flexDirection: 'row' }}>
//                                     <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.4 / 100, color: Colors.black_color }}>Post date:</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray }}>{moment(new Date(request_DetailData.DateOfRequest)).format('MMM DD, YYYY')}</Text>
//                                     </View>
//                                 </View> */}
//                             </View>
//                         </View>
//                         <View style={styles.cardfooter}>
//                             <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", }}>
//                                 <View style={{ flexDirection: "row", }}>
//                                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, marginLeft: mobileW * 3 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.FeeTxt[config.language]} {request_DetailData.Charges}</Text>
//                                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 2.5 / 100,  alignSelf: 'flex-end', fontFamily:Font.FontMedium }}> Rs</Text >
//                                 </View>
//                                 <View >
//                                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, marginRight: mobileW * 2 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.ApplyTillTxt[config.language]} {moment(new Date(request_DetailData.AppliedTill)).format('MMM DD, YYYY')}</Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
                   
//                    { userMode != 'maven' &&
//                    <View>
//                     <View style={{ backgroundColor: Colors.white_color,width: mobileW * 96 / 100, elevation:2,
//         height: mobileW * 10 / 100, flexDirection: 'row', justifyContent: 'center', alignSelf:'center' }}>
//           <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Syllabus')} style={[{ backgroundColor: checked === 'Syllabus' ? Colors.themecolor : Colors.white_color }, styles.CurrentLearner]} >
//             <Text style={{ color: checked === 'Syllabus' ? Colors.white_color : Colors.black_color, fontSize: mobileW * 3.5/ 100, fontFamily:Font.FontSemiBold }}>{Lang_chg.SyllabusTxt[config.language]}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Old')} style={[{ backgroundColor: checked === 'Old' ? Colors.themecolor : Colors.white_color }, styles.CurrentLearner]} >
//             <Text style={{ color: checked === 'Old' ? Colors.white_color : Colors.black_color, fontSize: mobileW *3.5 / 100, fontFamily:Font.FontSemiBold }}>Applied</Text>
//           </TouchableOpacity>

//         </View>
//             {checked == 'Syllabus' && 


 
        
        
//         <View style={{}}>
//                 <Text style={styles.ListText}>Syllabus List</Text>
//                 <FlatList
//                      // showsHorizontalScrollIndicator={false}
//                      // horizontal={this.state.isHorizontal}
//                      contentContainerStyle={{  }}
//                      data={listShow}
//                      renderItem={({ item, index }) => {
//                         return (
//                     <View style={{ width: '96%', alignSelf: 'center', borderWidth: 1, borderColor: '#ccc', marginTop: mobileW*2/100,}}>
//                     <View style={{ padding: 6, justifyContent: 'flex-start',alignItems: 'flex-start', marginVertical:5}}>
//                     <TouchableOpacity   style={{flexDirection: 'row',padding: 8, alignItems: "center"}}  onPress={() => syllabusList(index)}>
//                     <Image style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100, }}source={require('./Icon/icon_drapdown.png')} ></Image>
//                     <Text style={styles.text2}>{item.title}</Text>
//                     </TouchableOpacity>
//  {item.status == true && 
//                         <View style={{ flexWrap: 'wrap', width: '100%', alignSelf: 'center' , }}>
//                         <View style={{ borderColor: '#D0D7DE', width: '100%', borderWidth: 1, }}></View>
    
//  <FlatList 
//  data={item.items}
// renderItem={({item, })=>{
//     return(
//             <View style={{ marginTop:mobileW*2/100, marginLeft:mobileW*7/100}}>
//             <TouchableOpacity onPress={()=>set_Subtitle(item)}>
//             <Text style={{fontSize:mobileW*3.4/100, fontFamily:Font.FontRegular, color:Colors.gray,}}>{item.subtitle}</Text>
//             </TouchableOpacity>
//             </View>
//     )
// }}
//  />
//             {/* {
//                 item.items.map(item => {
//       return (
//         <View  style={{ marginTop:mobileW*2/100, marginLeft:mobileW*7/100}}>
//             <TouchableOpacity activeOpacity={0.8} onPress={()=>set_Subtitle(item)}>
//           <Text style={{fontSize:mobileW*3.4/100, fontFamily:Font.FontRegular, color:Colors.gray,}}>{item.subtitle}</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     })} */}
//                                     {/* <Text style={{fontSize:mobileW*3.4/100, fontFamily:Font.FontRegular, color:Colors.gray,}}>I am SubList</Text> */}
//                                  </View>
//                                  }
                                 
//                               </View>
//                            </View>
//                         )
//                      }}
//                    />
//             </View>
            
//             }

// {checked == 'Old' && 
        
//         <View>
           
//         <Text style={styles.ListText}>{Lang_chg.LearnerListTxt[config.language]}</Text>
//         <FlatList
//             data={learnerList}
//             renderItem={({ item, index }) =>
//                 <View activeOpacity={0.8} style={styles.ListcardView}>
//                     <View style={styles.ListcardHeader}>
//                         <View style={{ width: mobileW * 20 / 100, borderTopLeftRadius: mobileW * 2 / 100, }}></View>
//                         <View style={{ width: mobileW * 76 / 100, borderTopRightRadius: mobileW * 2 / 100, justifyContent: 'center' }}>
//                             <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontWeight: '500' }}>{item.FullName}</Text>
//                         </View>
//                     </View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <View style={{ width: mobileW * 21 / 100, }}>
//                             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnersDetail', { item: item })} style={styles.listimageCard}>
//                                 <Image style={styles.imageIcon} resizeMode='contain'
//                                     source={item.profileImage == '' ? { uri: item.profileImage } : require("./Icon/icon_maven.png")}

//                                 ></Image>
//                             </TouchableOpacity>
//                         </View>
//                         <View>
//                             <View style={styles.listtextView}>
//                                 <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color }}>{Lang_chg.PaymentStatusTxt[config.language]}</Text>
//                                 <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, }}>{item.isPaid == '0' ? 'Unpaid' : 'Paid'}</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             }
//             keyExtractor={item => item.id} />
//     </View>
//             }
           
//         </View>
//         }
//                     {/* -------------------------------------------- gif loader modal -------------------------- */}
//                     <Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={modalVisible_loadergif}
//                       >
//                         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000060' }}>
//                             <Image style={styles.GIF}
//                                 source={require("./Icon/neighcoach_loader.gif")}></Image>
//                         </View>
//                     </Modal>

//                     {/* ============================================================== Learner's Flatlist================================================================= */}

//                     {item.TypeOfRequest == 'teaching' ?
//                         // <View>
//                         //     <Text style={styles.ListText}>{Lang_chg.LearnerListTxt[config.language]}</Text>
//                         //     <FlatList
//                         //         data={learnerList}
//                         //         renderItem={({ item, index }) =>
//                         //             <View activeOpacity={0.8} style={styles.ListcardView}>
//                         //                 <View style={styles.ListcardHeader}>
//                         //                     <View style={{ width: mobileW * 20 / 100, borderTopLeftRadius: mobileW * 2 / 100, }}></View>
//                         //                     <View style={{ width: mobileW * 76 / 100, borderTopRightRadius: mobileW * 2 / 100, justifyContent: 'center' }}>
//                         //                         <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontWeight: '500' }}>{item.FullName}</Text>
//                         //                     </View>
//                         //                 </View>
//                         //                 <View style={{ flexDirection: 'row' }}>
//                         //                     <View style={{ width: mobileW * 21 / 100, }}>
//                         //                         <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnersDetail', { item: item })} style={styles.listimageCard}>
//                         //                             <Image style={styles.imageIcon} resizeMode='contain'
//                         //                                 source={item.profileImage == '' ? { uri: item.profileImage } : require("./Icon/icon_maven.png")}

//                         //                             ></Image>
//                         //                         </TouchableOpacity>
//                         //                     </View>
//                         //                     <View>
//                         //                         <View style={styles.listtextView}>
//                         //                             <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color }}>{Lang_chg.PaymentStatusTxt[config.language]}</Text>
//                         //                             <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, }}>{item.isPaid == '0' ? 'Unpaid' : 'Paid'}</Text>
//                         //                         </View>
//                         //                     </View>
//                         //                 </View>
//                         //             </View>
//                         //         }
//                         //         keyExtractor={item => item.id} />
//                         // </View>
//                         null
    
//                         :

//                         <View>
//                             <Text style={styles.ListText}>{Lang_chg.AppliedMavenTxt[config.language]}</Text>
//                             {/* ============================================================== Applied Maven Flatlist================================================================= */}

//                             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AutomationTesting')} style={styles.ListcardView}>
//                                 <View style={styles.ListcardHeader}>
//                                     <View style={{ width: mobileW * 21 / 100, borderTopLeftRadius: mobileW * 2 / 100, }}></View>
//                                     <View style={{ width: mobileW * 71 / 100, borderTopRightRadius: mobileW * 2 / 100, justifyContent: 'center' }}>
//                                         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding:mobileW*1/100}}>
//                                             <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontRegular }}>{request_DetailData.FullName}</Text>

//                                             {reject ? (
//                                                 <View>
//                                                     {change ? (
//                                                         <TouchableOpacity activeOpacity={0.8} onPress={() => setChange(!change)} style={styles.acceptedButton} >
//                                                             <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: mobileW * 1 / 100 }}>
//                                                                 <Image resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, }}
//                                                                     source={require('./Icon/icon_tick.png')}></Image>
//                                                                 <Text style={styles.AcceptText}>{Lang_chg.AcceptTxt[config.language]}</Text>
//                                                             </View>
//                                                         </TouchableOpacity>) : null
//                                                     }
//                                                 </View>) : null}
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={{flexDirection: 'row'}}>
//                                     <View style={{ width: mobileW * 21 / 100,}}>
//                                         <View activeOpacity={0.8} style={styles.listimageCard}>
//                                             <Image style={styles.imageIcon} resizeMode='contain'
//                                                 // source={item.image}
//                                                 source={item.image == '' ? '' : require("./Icon/icon_maven.png")}
//                                                 ></Image>
//                                         </View>
//                                     </View>
//                                     <View>
//                                         <View style={styles.requestDate}>
//                                             <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>{Lang_chg.PaymentStatusTxt[config.language]}</Text>
//                                             <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular}}>{request_DetailData.isPaid == '0' ? 'Unpaid' : 'Paid'}</Text>
//                                         </View>
//                                         <View style={styles.requestDate}>
//                                             <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                                             <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular}}>{moment(new Date(request_DetailData.StartDate)).format('MMM DD, YYYY')}</Text>
//                                         </View>
//                                         <View style={[styles.requestDate, { paddingBottom: mobileW * 3 / 100 }]}>
//                                             <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color, fontFamily:Font.FontRegular }}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                                             <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, fontFamily:Font.FontRegular}}>{moment(new Date(request_DetailData.Enddate)).format('MMM DD, YYYY')}</Text>
//                                         </View>
//                                         {reject ? (
//                                             <View>
//                                                 {change ? (
//                                                     <TouchableOpacity activeOpacity={0.8} onPress={() => setReject(!reject)} style={styles.RejectButton}>
//                                                         <Text style={{ color: Colors.whiteColor, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.RejectTxt[config.language]}</Text>
//                                                     </TouchableOpacity>) :
//                                                     <TouchableOpacity activeOpacity={0.8} style={styles.AcceptedButton}>

//                                                         <Text style={{ color: Colors.themecolor, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium }}>{Lang_chg.AcceptedTxt[config.language]}</Text>
//                                                     </TouchableOpacity>}
//                                             </View>) : null}
//                                     </View>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                     }

//                     {/* ============================================================== SCHEDULE SESSION ================================================================= */}
//                   {userMode=='maven'&&
//                     <View>
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={styles.ScheduleHeader}>
//                             <Text style={{ fontSize: mobileW * 3.5 / 100, fontWeight: '500', color: Colors.white_color }}>{Lang_chg.SCHEDULESESSIONTxt[config.language]}</Text>
//                         </TouchableOpacity>
//                         <Text style={styles.ListText}>{Lang_chg.OtherApplicantsTxt[config.language]}</Text>
//                         <FlatList
//                             data={OtherApplicant}
//                             renderItem={({ item, index }) =>

//                             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AutomationTesting')} style={styles.ListcardView}>
//                             <View style={styles.ListcardHeader}>
//                                 <View style={{ width: mobileW * 21 / 100, borderTopLeftRadius: mobileW * 2 / 100 }}></View>
//                                 <View style={{ width: mobileW * 71 / 100, borderTopRightRadius: mobileW * 2 / 100, justifyContent: 'center' }}>
//                                     <View style={{  padding:mobileW*1/100}}>
//                                         <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontWeight: '500' }}>{item.name}</Text>

                                     
//                                     </View>
//                                 </View>
//                             </View>
//                             <View style={{ flexDirection: 'row' }}>
//                                 <View style={{ width: mobileW * 21 / 100 }}>
//                                     <View activeOpacity={0.8} style={styles.listimageCard}>
//                                         <Image style={styles.imageIcon} resizeMode='contain'
//                                               source={item.image}></Image>
//                                     </View>
//                                 </View>
//                                 <View>
//                                     <View style={styles.requestDate}>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color }}>{Lang_chg.PaymentStatusTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, }}>{item.paymentstatuss}</Text>
//                                     </View>
//                                     <View style={styles.requestDate}>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color }}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, }}>{item.startdate}</Text>
//                                     </View>
//                                     <View style={[styles.requestDate, { paddingBottom: mobileW * 3 / 100 }]}>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.black_color }}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                                         <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.gray, }}>{item.enddate}</Text>
//                                     </View>
                                   
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                             }
//                             keyExtractor={item => item.id} />
//                     </View>}
//                 </ScrollView>

//                 {/* ================================================================= Tiem Duration Model================================================================ */}
//                 <View  >
//                     <Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={modalVisible}>
//                         <View style={{ flex: 1, backgroundColor: '#00000060', justifyContent: 'center', alignItems: 'center' }}>
//                             <View style={styles.ModelCard}>
//                                 <View style={styles.ModelHeader}>
//                                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontFamily:Font.FontMedium, }}></Text>
//                                     <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium, }}>          {Lang_chg.CreateSessionTxt[config.language]}</Text>
//                                     <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{ marginRight: mobileW * 2 / 100 }} >
//                                         <Image style={[styles.backIcon, { marginRight: mobileW * 2 / 100 }]} resizeMode='contain'
//                                             source={require("./Icon/close2.png")}></Image>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <ScrollView>
//                                     <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

//                                         <TextInput style={{ width: mobileW * 85 / 100, marginHorizontal: mobileW * 2 / 100,  }}
//                                             onChangeText={(firstname) => { setFirstname(firstname) }}
//                                             color={Colors.themecolor} fontFamily={Font.FontRegular} label={Lang_chg.ClassNameTxt[config.language]} variant="outlined" trailing={props => (<Text></Text>)} />

//                                         {/* =================================================== Date / Time ================================================================ */}

//                                         <View style={{ flexDirection: 'row' }}>
//                                             {timePicker && (                                                                   //Date Picker
//                                                 <DateTimePicker
//                                                     mode={'date'}
//                                                     value={new Date(Date.now())}
//                                                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                                                     is24Hour={false}
//                                                     onChange={text => setDatetoFunction(text)}/> )}
//                                             <TouchableOpacity activeOpacity={0.8} onPress={() => setTimePicker(true)} style={styles.CalanderView}>
//                                             <Image resizeMode='contain' style={styles.iconQuestionMark}source={require('./Icon/icon_calendar.png')}></Image>
//                                             <Text style={styles.calanderText}>{date}</Text>
//                                             </TouchableOpacity>

//                                             {datePicker && (                                                                   //Date Picker
//                                                 <DateTimePicker
//                                                     mode={'time'}
//                                                     value={new Date(Date.now())}
//                                                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                                                     is24Hour={false}
//                                                     onChange={text => setTimetoFunction(text)}  />)}
//                                             <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} style={styles.CalanderView}>
//                                             <Image resizeMode='contain' style={styles.iconQuestionMark}source={require('./Icon/icon_calendar.png')}></Image>
//                                             <Text style={styles.calanderText}>{time}</Text>
//                                             </TouchableOpacity>
//                                             </View>
//                                              </View>
//                                     {/* {timePicker && (                                                                   //Date Picker
//                                             <DateTimePicker
//                                             mode={'date'}
//                                             value={new Date(Date.now())}
//                                             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                                             is24Hour={false}
//                                             onChange={text=>setDatetoFunction(text)}
//                                             />
//                                         )} */}
//                                     <Text style={styles.courseDurationText}>{Lang_chg.CourseDurationTxt[config.language]}</Text>

//                                     <View >
//                                         <Dropdown
//                                             style={[styles.dropdown, isFocus && { borderColor: Colors.themecolor }]}
//                                             placeholderStyle={styles.placeholderStyle}
//                                             selectedTextStyle={styles.selectedTextStyle}
//                                             inputSearchStyle={styles.inputSearchStyle}
//                                             iconStyle={styles.iconStyle}
//                                             data={data2}
//                                             search
//                                             Mode={"outlined"}
//                                             maxHeight={300}
//                                             labelField="label"
//                                             valueField="value"
//                                             placeholder={!isFocus ? 'Dance' : '...'}
//                                             searchPlaceholder="Search..."
//                                             value={value}
//                                             onFocus={() => setIsFocus(true)}
//                                             onBlur={() => setIsFocus(false)}
//                                             onChange={item => {
//                                                 setValue(item.value);
//                                                 setIsFocus(false);
//                                             }}

//                                         />
//                                     </View>
//                                     <Text style={styles.learnerListText}>{Lang_chg.LearnerListTxt[config.language]}</Text>
//                                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: mobileW * 85 / 100, marginTop: mobileW * 2 / 100 }}>
//                                         <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, marginHorizontal: mobileW * 2 / 100, fontFamily:Font.FontMedium, }}>Maven</Text>
//                                         <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
//                                             {shouldShow ? (
//                                                 <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, tintColor: Colors.themecolor, height: mobileW * 5 / 100 }}
//                                                     source={require('./Icon/check.png')}></Image>) :
//                                                 <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, tintColor: Colors.themecolor, height: mobileW * 5 / 100 }}
//                                                     source={require('./Icon/square.png')}></Image>}
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={styles.underline}></View>

//                                     <View style={{ padding: mobileW * 1 / 100, marginBottom: mobileW * 5 / 100, flexDirection: 'row', marginTop: mobileW * 5 / 100 }}>
//                                         <TouchableOpacity activeOpacity={0.8} style={styles.ModelButton} onPress={() => setShouldShow('shouldShow')}>
//                                             <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium, }}>{Lang_chg.SelectallTxt[config.language]}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() => setShouldShow()} activeOpacity={0.8} style={[styles.ModelButton,]}>
//                                             <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium, }}>{Lang_chg.DeselectTxt[config.language]}</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity activeOpacity={0.8} style={[styles.ModelButton,]} onPress={() => setModalVisible(!modalVisible)}>
//                                             <Text style={{ color: Colors.white_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium, }}>{Lang_chg.SubmitTxt[config.language]}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </ScrollView>
//                             </View>
//                         </View>
//                     </Modal>
//                 </View>
//             </SafeAreaView>
//         </View>
//     )
// }
// export default SessionRequestBasic;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     Header: {
//         backgroundColor: Colors.themecolor,
//         width: mobileW, height: mobileW * 13 / 100,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     backIcon: {
//         width: mobileW * 6 / 100,
//         height: mobileW * 6 / 100,
//         tintColor: Colors.white_color
//     },
//     backIcon_: {
//         width: mobileW * 9.5/ 100,
//         height: mobileW * 9.5/ 100,
//         tintColor: Colors.white_color
//     },
//     HeaderText: {
//         color: Colors.white_color,
//         marginHorizontal: mobileW * 0/ 100,
//         fontSize: mobileW * 4 / 100,
//         textAlign: "center",
//         fontFamily:Font.FontSemiBold
//     },
//     input: {
//         height: mobileW * 12 / 100,
//         margin: mobileW * 2 / 100,
//         borderRadius: mobileW * 1 / 100,
//         borderWidth: 1,
//         padding: mobileW * 2 / 100,
//         borderColor: Colors.themecolor
//     },
//     cardView: {
//         alignSelf: "center",
//         margin: mobileW * 2 / 100,
//         backgroundColor: Colors.white_color,
//         // backgroundColor: 'green',
//         elevation: 2,
//         borderRadius: mobileW * 2 / 100
//     },
//     cardHeader: {
//         backgroundColor: Colors.themecolor,
//         flexDirection: 'row',
//         width: mobileW * 96 / 100,
//         // height: mobileW * 15 / 100,
//         borderTopLeftRadius: mobileW * 2 / 100,
//         borderTopRightRadius: mobileW * 2 / 100
//     },
//     cardHeaderr: {
//         // width: mobileW * 76 / 100,
//         flexDirection: 'row',
//         borderTopRightRadius: mobileW * 2 / 100,
//         padding: mobileW * 1 / 100,
//         // alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: Colors.themecolor
//     },
//     shareicon: {
//         width: mobileW * 5 / 100,
//         height: mobileW * 5 / 100,
//         tintColor: Colors.white_color,
//         marginRight: mobileW * 5 / 100,
//     },
//     ListcardView: {
//         alignSelf: "center",
//         margin: mobileW * 2 / 100,
//         backgroundColor: Colors.white_color,
//         elevation: 2,
//         borderRadius: mobileW * 1 / 100
//     },
//     ListText: {
//         marginLeft: mobileW * 5 / 100,
//         fontSize: mobileW * 3.5 / 100,
//         color: Colors.black_color,
//        fontFamily:Font.FontMedium,
//         marginBottom: mobileW * 2 / 100,
//         marginTop: mobileW * 2 / 100
//     },
//     ListcardHeader: {
//         backgroundColor: Colors.themecolor,
//         flexDirection: 'row',
//         width: mobileW * 96 / 100,
//         height: mobileW * 12 / 100,
//         borderTopLeftRadius: mobileW * 2 / 100,
//         borderTopRightRadius: mobileW * 2 / 100,
//         alignSelf: 'center',
//     },
//     CurrentLearner: {
//         width: mobileW * 48 / 100,
//         height: mobileW * 10 / 100,
//      borderRadius:mobileW*2/100,
//         justifyContent: 'center',
//         alignItems: 'center'
//       },
//     acceptedButton: {
//         flexDirection: 'row',
//         borderRadius: mobileW * 1 / 100,
//         width: mobileW * 22 / 100,
//         height: mobileW * 8 / 100,
//         backgroundColor: Colors.white_color,
//         // marginTop:mobileW*2/100,
//         // marginBottom:mobileW*2/100
//     },
//     RejectButton: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: mobileW * 1 / 100,
//         width: mobileW * 22 / 100,
//         height: mobileW * 8 / 100,
//         backgroundColor: Colors.themecolor,
//         marginBottom: mobileW * 2 / 100,
//         alignSelf: 'flex-end',
//         // marginRight: mobileW * 1 / 100
//     },
//     AcceptedButton: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: mobileW * 1 / 100,
//         width: mobileW * 22 / 100,
//         height: mobileW * 8 / 100,
//         marginBottom: mobileW * 2 / 100,
//         alignSelf: 'flex-end',
//         // marginRight: mobileW * 1 / 100
//     },
//     text2:{
//         fontSize:mobileW*4/100,
//         fontFamily:Font.FontRegular,
//         color:Colors.black_color,
//         marginHorizontal:mobileW*2/100
    
//       },
//     imageCard: {
//         width: mobileW * 15 / 100,
//         height: mobileW * 15 / 100,
//         borderRadius: mobileW * 8 / 100,
//         marginTop: mobileW * -8 / 100,
//         marginHorizontal: mobileW * 2 / 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: Colors.white_color,
//         elevation: 5,
//         shadowColor: '#000',
//         borderColor: "#e8edfb",
//         borderWidth: 1,
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, },
//         shadowOpacity: 0.1,
//     },
//     listimageCard: {
//         width: mobileW * 15 / 100,
//         height: mobileW * 15 / 100,
//         borderRadius: mobileW * 8 / 100,
//         marginTop: mobileW * -8 / 100,
//         marginHorizontal: mobileW * 2 / 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: Colors.white_color,
//         elevation: 1,
//         shadowColor: '#000',
//         borderColor: "#e8edfb",
//         // borderWidth: 1,
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, },
//         shadowOpacity: 0.1,
//     },
//     imageIcon: {
//         width: mobileW * 12 / 100,
//         height: mobileW * 12 / 100,
//         borderRadius: mobileW * 4 / 100,
//         tintColor: Colors.themecolor,
//         marginHorizontal: mobileW * 2 / 100
//     },
//     cardfooter: {
//         width: mobileW * 96 / 100,
//         height: mobileW * 10 / 100,
//         marginTop: mobileW * 5 / 100,
//         backgroundColor: Colors.themecolor,
//         borderBottomEndRadius: mobileW * 2 / 100,
//         borderBottomStartRadius: mobileW * 2 / 100,
//         justifyContent: 'center',
//         alignSelf: "center",
//     },
//     AcceptText: {
//         color: Colors.themecolor,
//         fontSize: mobileW * 3.5 / 100,
//         fontFamily:Font.FontMedium,
//         marginHorizontal: mobileW * 2 / 100
//     },
//     ScheduleHeader: {
//         width: mobileW * 96 / 100,
//         height: mobileW * 8 / 100,
//         marginTop: mobileW * 2 / 100,
//         backgroundColor: Colors.themecolor,
//         borderRadius: mobileW * 2 / 100,
//         alignSelf: "center",
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     listtextView: {
//         flexDirection: 'row',
//         paddingBottom: mobileW * 8 / 100,
//         marginTop: mobileW * 3 / 100,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: mobileW * 71 / 100,
//     },
//     OtherApplicant: {
//         flexDirection: 'row',
//         paddingBottom: mobileW * 3 / 100,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: mobileW * 71 / 100,
//     },
//     requestDate: {
//         flexDirection: 'row',
//         padding: mobileW * 1 / 100,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: mobileW * 71 / 100,
     

//     },
//     CalanderView: {
//         width: mobileW * 40 / 100,
//         marginHorizontal: mobileW * 2 / 100,
//         height: mobileW * 12 / 100,
//         marginTop: mobileW * 3 / 100,
//         borderRadius: mobileW * 1 / 100,
//         padding: mobileW * 2 / 100,
//         borderWidth: mobileW * 0.5 / 100,
//         borderColor: Colors.themecolor,
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     sessionDurationView: {
//         width: mobileW * 40 / 100,
//         marginHorizontal: mobileW * 2 / 100,
//         height: mobileW * 13 / 100,
//         marginTop: mobileW * 1 / 100,
//         borderRadius: mobileW * 1 / 100,
//         borderWidth: mobileW * 0.5 / 100,
//         borderColor: Colors.themecolor,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     courseDurationText: {
//         fontSize: mobileW * 3.5 / 100,
//         color: Colors.themecolor,
//         marginBottom: mobileW * 2 / 100,
//         marginHorizontal: mobileW * 2 / 100,
//         fontFamily:Font.FontMedium,
//     },
//     calanderText: {
//         color: Colors.gray,
//         alignSelf: 'center',
//         fontSize: mobileW * 2.8 / 100,
//         fontFamily:Font.FontMedium,
//         marginHorizontal: mobileW * 2 / 100
//     },
//     // sessionDuration: {
//     //     color: Colors.gray,
//     //     fontSize: mobileW * 5 / 100,
//     //     fontFamily:Font.FontMedium,
//     //     marginHorizontal: mobileW * 2 / 100
//     // },
//     iconQuestionMark: {
//         width: mobileW * 5 / 100,
//         height: mobileW * 5 / 100,
//         tintColor: Colors.gray
//     },
//     ModelButton: {
//         width: mobileW * 25 / 100,
//         height: mobileW * 8 / 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.themecolor,
//         borderRadius: mobileW * 1 / 100,
//         marginHorizontal: mobileW * 2 / 100,
//     },
//     dropdown: {
//         height: mobileW * 12 / 100, width: mobileW * 85 / 100,
//         alignSelf: 'center',
//         borderWidth: 1,
//         borderRadius: mobileW * 1 / 100,
//         paddingHorizontal: mobileW * 3 / 100,
//     },
//     ModelCard: {
//         width: mobileW * 90 / 100,
//         borderRadius: mobileW * 3 / 100,
//         backgroundColor: Colors.white_color,
//         elevation: 5
//     },
//     ModelHeader: {
//         width: mobileW * 90 / 100,
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: mobileW * 12 / 100,
//         borderTopLeftRadius: mobileW * 3 / 100,
//         borderTopRightRadius: mobileW * 3 / 100,
//         backgroundColor: Colors.themecolor
//     },
//     GIF: {
//         width: mobileW * 25 / 100,
//         height: mobileW * 12 / 100
//     },
//     underline: {
//         width: mobileW * 85 / 100,
//         height: mobileW * 0.2 / 100,
//         marginTop: mobileW * 2 / 100,
//         backgroundColor: Colors.gray,
//         alignSelf: 'center'
//     },
//     icon: {
//         marginRight: 0,
//     },
//     label: {
//         position: 'absolute',
//         left: 22,
//         top: 2,
//         zIndex: 999,
//         paddingHorizontal: 0,
//         fontSize: 12,
//     },
//     placeholderStyle: {
//         fontSize: mobileW * 3 / 100,
//         fontFamily:Font.FontMedium,
//         marginHorizontal: mobileW * 1 / 100
//     },
//     selectedTextStyle: {
//         fontSize: mobileW * 4 / 100,
//         color: Colors.gray,
//         fontFamily:Font.FontMedium,
//     },
//     iconStyle: {
//         width: mobileW * 7 / 100,
//         height: mobileW * 2 / 100,
//     },
//     inputSearchStyle: {
//         height: mobileW * 10 / 100,
//         fontSize: mobileW * 3.5 / 100,
//         fontFamily:Font.FontMedium,
//     },
//     learnerListText: {
//         fontSize: mobileW * 3.5 / 100,
//         color: Colors.themecolor,
//         marginHorizontal: mobileW * 2 / 100,
//         fontFamily:Font.FontMedium,
//         marginTop: mobileW * 2 / 100
//     },
// }
// )