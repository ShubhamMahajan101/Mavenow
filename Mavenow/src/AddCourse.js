import { View, Text, ScrollView, TextInput, FlatList, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Button, Alert, Modal, RefreshControl } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Font } from './Provider/Colorsfont';
import { consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { Stack, TextInput as TextInputPaper, } from "@react-native-material/core";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import moment from 'moment';
import { msgProvider, msgText } from './Provider/Messageconsolevalidationprovider/messageProvider';
import { config } from './Provider/configProvider';
import { tr } from 'date-fns/locale';
import { isMatchWithOptions } from 'date-fns/fp';
import style from 'react-native-beautiful-video-recorder/lib/style';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const topArray = [
  {
    id: 1,
    topic: 'Computer Science',
    status: true
  },
  {
    id: 2,
    topic: 'Social Work',
    status: false
  },
  {
    id: 3,
    topic: 'Chemistry',
    status: false
  },
  {
    id: 4,
    topic: 'Android',
    status: false
  },
  {
    id: 5,
    topic: 'SDK',
    status: false
  },
  {
    id: 6,
    topic: 'Java',
    status: false
  },
  {
    id: 7,
    topic: 'Views',
    status: false
  },
  {
    id: 8,
    topic: 'XML',
    status: false
  },
  {
    id: 9,
    topic: 'Eclipse',
    status: false
  },
  {
    id: 10,
    topic: 'Gradle',
    status: false
  },

]

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

const AddCourse = ({ navigation }) => {
  const [refresh, setrefresh] = useState(false);
  const [datePicker, setShow] = useState(false);
  const [session, setSession] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [endtimePicker, setendTimePicker] = useState(false);
  const [date, setdate] = useState(Lang_chg.StartDateTxt[config.language]);
  const [enddate, setenddate] = useState(Lang_chg.EndDateTxt[config.language]);
  const [time, setTime] = useState('HH:MM');
  const [sessionTime, setsessionTime] = useState('HH:MM');
  const [seccessmodal, setSeccessmodal] = useState(false)
  const [category, setCategory] = useState([]);
  const [modalVisible_GIF, setModalVisible_GIF] = useState(false);
  const [price, setPrice] = useState('')
  const [modalVisible_active, setModalVisible_active] = useState(false);
  const [ModalForCommission, setModalForCommission] = useState(false);
  const [duration, setDuration] = useState(false);
  const [Timeoutminut, setTimeoutminut] = useState('');

  const [coursename, setCoursename] = useState('')
  const [topic, setTopic] = useState(topic == null ? Lang_chg.TopicTxt[config.language] : topic)
  const [modalVisible1, setModalVisible1] = useState(false);
  const [SelectTopic, setSelectTopic] = useState(topArray);
  const [checkedd, setCheckedd] = useState('1')
  const [checkedData, setCheckedData] = useState('')
  const [EndTimeCheck, setEndTimeCheck] = useState(new Date(Date.now()))

  console.log(" EndTimeCheck +++++++++++ ", EndTimeCheck);


  const setDatetoFunction = (date) => {
    // setEndTimeCheck(date.nativeEvent.timestamp)
    setTimePicker(false)
    var formateDate = date.nativeEvent.timestamp
    console.log(" Searching for invalide date ++++++++", moment(new Date(formateDate)));
    let newDate = moment(new Date(formateDate)).format('DD/MM/YYYY')
    setdate(newDate)
    console.log('date is here-----++---->>>>>>', newDate);
  }

  const setEndDatetoFunction = (date) => {
    setendTimePicker(false)
    var formateDate = date.nativeEvent.timestamp
    let newDate = moment(new Date(formateDate)).format('DD/MM/YYYY')
    setenddate(newDate)
    console.log('date is here--------->>>>>>', newDate);
  }

  const setRedioBtn = (item) => {
    console.log("item", item.topic);
    setTopic(item.topic)
    SelectTopic.forEach((elem) => {
      elem.status = false
      if (elem.id === item.id) {
        elem.status = true
        // setlanguage(elem.name)
      }
    })
    setSelectTopic([...SelectTopic]);
  }

  const _navigationHandle = () => {
    setSeccessmodal(!seccessmodal),
      navigation.navigate('Syllabus')
  }


  const NextButton = () => {
    if (coursename <= 0) {
      msgProvider.toast(msgText.CourseName[config.language], 'center')

      return false
    }
    if (topic == 'Topic') {
      msgProvider.toast(msgText.selectTopic[config.language], 'center')

      return false
    }
    if (date == "Start Date") {
      msgProvider.toast(msgText.selectStartdate[config.language], 'center')

      return false
    }
    if (enddate == "End Date") {
      msgProvider.toast(msgText.selectEndtdate[config.language], 'center')

      return false
    }
    if (time == "HH:MM") {
      msgProvider.toast(msgText.selectTime[config.language], 'center')

      return false
    }
    if (Timeoutminut <= 0) {
      msgProvider.toast(msgText.selectTime[config.language], 'center')

      return false
    }
    if (price <= 0) {
      msgProvider.toast(msgText.CourseFee[config.language], 'center')

      return false
    }
    setSeccessmodal(true)

  }

  const [datalevel, setDatalevel] = useState(Level)
  const changelevel = (item) => {

    let updatedState = datalevel.map((data) =>
      data.id === item.id
        ? { ...data, status: true }
        : { ...data, status: false }
    );
    setDatalevel(updatedState);

  }



  // const skillCategory_close = (item) => {
  //   console.log("am here", item);

  //   setSkillName(item.name)
  //   setSkills(item.Skills)
  //   setmodalCategory(false)
  // }

  // const skill_close = (item) => {
  //   console.log("am here", item);
  //   setSkill(item.SkillName)
  //   if (item.level == 1) {
  //     setSkillLevelForText('Basic')
  //   } else if (item.level == 2) {
  //     setSkillLevelForText("Medium")
  //   } else if (item.level == 3) {
  //     setSkillLevelForText('Advance')
  //   }
  //   setmodalSkills(false)
  // }

  // ---------- To get Percenage State ----------  
  const [percentage, setPercentage] = useState('you');

  useEffect(() => {
    // Not sure but percentage should be divided 300 I guess
    const per = ((price) * 5) / 100;
    setPercentage(price - per);
  }, [price]);


  const _onRefresh = async () => {
    setrefresh(true)

    setTimeout(() => {
      setrefresh(false)
    }, 1200);
  }

  // const setDatetoFunction = (date) => {
  //   setTimePicker(false)
  //   setTimeout(() => {
  //     console.log(timePicker);
  //   }, 500);

  //   var formateDate = date.nativeEvent.timestamp
  //   let newDate = moment(new Date(formateDate)).format('DD-MM-YYYY')

  //   setdate(newDate)
  //   console.log('Startdate is here--------->>>>>>', newDate);
  // }

  // const setendDatetoFunction = (date1) => {
  //   console.log("data1",date1);
  //   var invalid = date1.type
  //   console.log("invalid",invalid);

  //   if(invalid=="dismissed"){
  //     console.log("date is invalid");

  //   }else{
  //     console.log("date is valid");
  //   }

  //   setendTimePicker(false)
  //   setTimeout(() => {
  //     console.log(endtimePicker);
  //   }, 500);

  //   var formateDate = date1.nativeEvent.timestamp
  //   console.log('Enddate is here --------->>>>>>', formateDate);
  //   let newDate = moment(new Date(formateDate)).format('DD-MM-YYYY')
  //   setenddate(newDate)

  //   if(newDate<=date){
  //     msgProvider.toast(msgText.valideDate[config.language], 'center')
  //     console.log("Please Select Valide Date");
  // }
  // console.log('date is here----++----->>>>>>', newDate);
  //   console.log('Enddate is here--------->>>>>>', newDate);

  // }

  const setTimetoFunction = (given_time) => {
    if (given_time.type != 'dismissed') {
      console.log(given_time.type)
      setShow(false)
      var formateDate = given_time.nativeEvent.timestamp
      var hours = new Date(formateDate).getHours(); //Current Hours
      var min = new Date(formateDate).getMinutes(); //Current Minutes
      var sec = new Date(formateDate).getSeconds(); //Current Seconds

      var formattedDate = hours + ":" + min
      setTime(formattedDate)
      console.log('Time is here===========', formattedDate);

    } else {
      setTime("HH:MM")
      setShow(false)
    }

  }

  const setSessionDuration = (given_time) => {
    if (given_time.type != 'dismissed') {
      console.log(given_time.type)
      setSession(false)
      var formateDate = given_time.nativeEvent.timestamp
      console.log('Time is  here data ===========', formateDate);
      var hours = new Date(formateDate).getHours(); //Current Hours
      var min = new Date(formateDate).getMinutes(); //Current Minutes
      var sec = new Date(formateDate).getSeconds(); //Current Seconds

      var formattedDate = hours + ":" + min
      setsessionTime(formattedDate)
      console.log('Time is here===========', formattedDate);

    } else {
      setTime("HH:MM")
      setSession(false)
    }

  }

  useEffect(() => {
    apiCalling();
  }, [])

  const apiCalling = () => {
    axios.get('https://mavenow.com:8001/usercategory?userId=848&userType=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI', {
    })
      .then(function (data) {
        var GetData = data.data.result
        console.log('-------- discipleOrMaster >', GetData)
        setCategory(GetData)
        setCategory(GetData)
        var data = data.data.result;
      })
      .catch(function (error) {
        console.log('======>', error);
      });
  }

  // =========================
  const Level = [
    { label: Lang_chg.BasicTxt[config.language], value: '1', status: true, },
    { label: Lang_chg.MediumTxt[config.language], value: '2', status: false, },
    { label: Lang_chg.AdvanceTxt[config.language], value: '3', status: false, },
  ];

  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={styles.SafeArea_View}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />

        {/* <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_active}>
           <View style={styles.success_modal}>
           <View style={styles.modalHeader}>
           <Text style={styles.success_text}>Success</Text>
           </View>
           <View style={styles.modalCard}>
          <View style={{alignSelf:'center', padding:mobileW*3/100}} >
          <Text style={[styles.commission_TExt,{width:mobileW*70/100, }]} >Your Teaching been submitted successfully for admin approval</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.ok_Button} onPress={() => navigation.navigate('SessionRequest')}>
           <Text style={styles.OKKK_text}>Okay</Text>
          </TouchableOpacity>
          </View>
          </View>
          </Modal>
          </View> */}

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_GIF}>
            <View style={{ flex: 1, alignSelf: 'center', justifyContent: "center" }}>
            </View>
          </Modal>
        </View>
        {/* header */}
        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
          </TouchableOpacity>
          <Text style={styles.HeaderText}>{Lang_chg.AddCourseTxt[config.language]}</Text>
          <Text style={styles.HeaderText}> </Text>
        </View>
        {/* <View style={{  backgroundColor: '#d6eef8',width: mobileW, padding:mobileW*3/100, borderBottomLeftRadius:mobileW*4/100, borderBottomRightRadius:mobileW*4/100}}>

                <Text style={{fontSize:mobileW*4/100,color:Colors.black_color,fontFamily:Font.FontSemiBold}}>Vinay Dexit</Text>
                <Text style={{fontSize:mobileW*3/100,color:Colors.gray,fontFamily:Font.FontRegular}}>{Lang_chg.CreateCourseTxt[config.language]}</Text>
              </View> */}




        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={_onRefresh}
              tintColor={Colors.themecolor}
              colors={[Colors.themecolor]} />
          }

          showsVerticalScrollIndicator={false} style={{ marginLeft: mobileW * 4 / 100, marginRight: mobileW * 4 / 100, marginTop: mobileW * 2 / 100, }}>
          <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.CourseNameTxt[config.language]}</Text>
          <View>
            <TextInputPaper style={{ marginTop: mobileW * 2 / 100, height: mobileW * 16 / 100, }}
              height={mobileW * 16 / 100}
              onChangeText={(txt) => setCoursename(txt)}
              // color={coursename==""? Colors.red:Colors.themecolor}label={Lang_chg.NameTxt[config.language]} variant="outlined"
              color={Colors.themecolor} label={Lang_chg.NameTxt[config.language]} variant="outlined"
              trailing={props => (<Text></Text>)} />
          </View>

          <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, marginTop: mobileW * 2 / 100 }}>{Lang_chg.SelectTopicTxt[config.language]}</Text>
          <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.skillssectionTxt[config.language]}</Text>

          <TouchableOpacity onPress={() => setModalVisible1(true)} style={{ marginTop: mobileW * 1 / 100, }}>
            <TextInputPaper style={{ marginTop: mobileW * 2 / 100, height: mobileW * 16 / 100 }}
              onChangeText={(txt) => setTopic(txt)}
              onFocus={() => setModalVisible1(true)}
              height={mobileW * 16 / 100}
              color={topic == "" ? Colors.red : Colors.themecolor} label={topic} variant="outlined"
              trailing={props => (<Text></Text>)} />
          </TouchableOpacity>


          <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, marginTop: mobileW * 2 / 100 }}>{Lang_chg.SelectLevelTxt[config.language]}</Text>
          <Text style={{ fontSize: mobileW * 3.5 / 100, marginTop: mobileW * 1 / 100, color: Colors.gray, fontFamily: Font.FontRegular }}>{Lang_chg.mavenexpertiesTxt[config.language]}</Text>


          <View style={{ height: mobileH * 8 / 100, marginTop: mobileW * 1 / 100, alignItems: 'center', justifyContent: 'center', }}>
            <FlatList
              data={Level}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ height: mobileH * 8 / 100, alignItems: 'center', justifyContent: 'center', width: mobileW * 92 / 100 }}
              renderItem={({ item }) =>
                <View style={{}}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { setCheckedd(item.value) }}
                    style={[styles.levelBtn, { borderWidth: mobileW * 0.3 / 100, borderColor: checkedd === item.value ? Colors.themecolor : '#FAFAFA', }]}
                  >
                    {checkedd == item.value ?
                      <Image resizeMode='contain' style={styles.iconTick} source={require('./Icon/icon_tick.png')} /> :
                      <Image resizeMode='contain' style={{
                        width: mobileW * 4 / 100, height: mobileW * 4 / 100, alignSelf: 'flex-end',
                        tintColor: Colors.white_color,
                      }} source={require('./Icon/icon_tick.png')} />
                    }
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: checkedd === item.value ? Colors.themecolor : Colors.black_color, 
                    fontFamily: Font.FontMedium, marginTop: mobileW * -1 / 100, }}>{item.label}</Text>
                  </TouchableOpacity>
                </View>}
              keyExtractor={item => item.id} />
          </View>

          {/* Date Section  */}
          <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, marginTop: mobileW * 2 / 100 }}>{Lang_chg.EstimatedDurationTxt[config.language]}</Text>

          <View style={styles.dateView}>
            <View>
              <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.StartDateTxt[config.language]}</Text>
              {timePicker && (
                <DateTimePicker
                  mode={'date'}
                  value={new Date(Date.now())}
                
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={false}
                  minimumDate={EndTimeCheck}
                  inimumDate={new Date(Date.now())}
                  onChange={text => setDatetoFunction(text)} />)}
              <TouchableOpacity activeOpacity={0.8} onPress={() => setTimePicker(true)} style={styles.CalanderView}>
                <Image resizeMode='contain' style={styles.iconQuestionMark} source={require('./Icon/icon_calendar.png')}></Image>
                <Text style={styles.calanderText}>  {date}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.EndDateTxt[config.language]}</Text>
              {endtimePicker && (
                <DateTimePicker
                  mode={'date'}
                  value={new Date(Date.now())}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={false}
                  minimumDate={EndTimeCheck}
                  onChange={text => setEndDatetoFunction(text)} />)}
              <TouchableOpacity activeOpacity={0.8} onPress={() => setendTimePicker(true)} style={styles.CalanderView}>
                <Image resizeMode='contain' style={styles.iconQuestionMark} source={require('./Icon/icon_calendar.png')}></Image>
                <Text style={styles.calanderText}>  {enddate}</Text>

              </TouchableOpacity>
            </View>
          </View>
          {/* time selection */}
          <View style={styles.dateView}>
            <View>
              <Text style={styles.batchTimeTxt}>{Lang_chg.BatchTime[config.language]}</Text>
              {datePicker && (
                <DateTimePicker
                  mode={'time'}
                  value={new Date(Date.now())}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={false}
                  onChange={text => setTimetoFunction(text)} />)}
              <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} style={[styles.TimeView,]}>
                <Image resizeMode='contain' style={styles.historyIcon} source={require('./Icon/history.png')}></Image>
                <Text style={styles.calanderText}>{time}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ fontSize: mobileW * 3.5 / 100, marginTop: mobileW * 2 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.SessionDurationTxt[config.language]}</Text>
              {/* <Text style={[styles.CourseDurationText, { marginTop: mobileW * 3 / 100, }]}>{Lang_chg.SessionDurationnTxt[config.language]}</Text> */}
              {/* {session && (
             <DateTimePicker
              mode={'time'}
              value={new Date(Date.now())}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={false}
              onChange={text => setSessionDuration(text)} />)} */}
              <TouchableOpacity activeOpacity={0.8} onPress={() => setDuration(true)} style={styles.TimeView}>
                <Image resizeMode='contain' style={styles.history_icon}
                  source={require('./Icon/history.png')}></Image>
                <Text style={styles.calanderText}>{Timeoutminut == Timeoutminut ? Timeoutminut : "HH:MM"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.charges_view}>
            <Text style={styles.SarvisChargesTxt}>{Lang_chg.ServiceChargeTxt[config.language]}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalForCommission(true)} style={{}} >
              <Image style={styles.info_icon} resizeMode='contain' source={require("./Icon/about.png")}></Image>
            </TouchableOpacity>
          </View>


          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: mobileW * 2 / 100 }}>
            <Text style={styles.courseFeeTxt}>{Lang_chg.Coursefeeperuser[config.language]}</Text>
            <Text style={styles.earningMoneyTxt}>{Lang_chg.Yourearningperuser[config.language]}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", }}>

            <View style={[styles.userCharges1, { flexDirection: 'row', alignItems: 'center' }]}>
              <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.themecolor }}
                source={require("./Icon/money.png")}></Image>
              <TextInput style={{ width: mobileW * 30 / 100 }} onChangeText={(text) => { setPrice(text) }}
                value={price}
                height={mobileW * 15 / 100}

                fontFamily={Font.FontRegular}
                keyboardType={'number-pad'}
                trailingContainerStyle={{ fontSize: mobileW * 3 / 100, color: Colors.red }}
                color={Colors.themecolor}
                label={Lang_chg.CourseFeeTxt[config.language]} variant="outlined" />
            </View>

            <View>
              {percentage != "" ?
                <View style={[styles.userCharges1, { justifyContent: 'center' }]}>
                  <Text style={styles.multipletext}>Rs {percentage}</Text>
                </View>
                :
                <View>
                  <View style={styles.userCharges}>
                    <Text style={styles.UserEarning}>{Lang_chg.YourEarningTxt[config.language]}</Text>
                  </View>
                </View>
              }
            </View>
          </View>

          {/* +++++++++++++++++++++++++++++++++ Post Button +++++++++++++++++++++++++++++++++ */}
          <TouchableOpacity activeOpacity={0.8} style={styles.PostButton} onPress={() => NextButton()} >
            {/* <Text style={styles.post___texttt}>{Lang_chg.POSTTxt[config.language]}</Text> */}
            <Text style={styles.post___texttt}>{Lang_chg.NEXTTxt[config.language]}</Text>
          </TouchableOpacity>
          {/* ------------------------------------- MODEL -------------------------------------*/}


          {/*modal open */}
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}>
              <View style={{ justifyContent: 'flex-end', flex: 1, backgroundColor: "#00000060" }}>
                <View style={styles.selectTopicBottomSheet}>
                  <View style={{ margin: mobileW * 5 / 100, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{Lang_chg.SelectTopicTxt[config.language]}</Text>
                      <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} style={{}}>
                        <Image style={styles.closseIconTint}
                          source={require('./Icon/close2.png')}></Image>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.lineView_}></View>

                    <View style={{ paddingBottom: mobileH * 10 / 100 }}>
                      <FlatList
                        data={SelectTopic}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                          <TouchableOpacity activeOpacity={0.8} onPress={() => setRedioBtn(item)} 
                          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: mobileW * 8.5 / 100 }}>
                            <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontRegular, color: Colors.black_color }}>{item.topic}</Text>

                            <View activeOpacity={0.8} style={[{ borderColor: item.status ? Colors.themecolor : Colors.gray }, styles.redioButtonBorder]}>
                              <View style={[{ backgroundColor: item.status ? Colors.themecolor : Colors.white_color }, styles.redioButtonbackground]}></View>
                            </View>
                          </TouchableOpacity>} />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>


          {/* ------------ MOdal to Select Category -------------- */}

          {/* <Modal animationType="slide"  transparent={true} visible={modalCategory}>
              <View style={styles.category_view}>
              <View style={styles.ModelCard}>
              <View style={styles.ModelHeader}>
               <Text style={styles.cHOOSECATEGORY_TEXT}>Choose category</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ padding: mobileW * 3 / 100 }}>
              <View style={{ alignItems: 'center', }}>
              <FlatList
               data={category}
              renderItem={({ item }) =>
              <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }}onPress={() => skillCategory_close(item)}>
              <Text style={styles.multipletext}>{item.name}</Text>
              <View style={styles.skillCategory_close_view} />
              </TouchableOpacity>
              } />
              </View>
              <View style={styles.Main__View}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(!modalCategory)} style={styles.CancelBtn}>
              <Text style={styles.ok_cancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(!modalCategory)} style={styles.okBtn}>
              <Text style={styles.ok_cancel}>Ok</Text>
              </TouchableOpacity>
              </View>
              </View>
              </ScrollView>
              </View>
              </View>
              </Modal> */}

          {/* ------------ MOdal to Select Skills -------------- */}

          {/* <Modal  animationType="slide"     transparent={true}  visible={modalskills} >
                <View style={styles.chooseskill_modal}>
                <View style={styles.ModelCard}>
                <View style={styles.ModelHeader}>
                <Text style={styles.choose_skill}>Choose skill</Text>
                 </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: mobileW * 3 / 100 }}>
                {skills != '' ?
                <View style={{ alignItems: 'center',}}>
                <FlatList
                data={skills}
                renderItem={({ item }) =>
                <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }} onPress={() => skill_close(item)}>
                 <Text style={styles.multipletext}>{item.SkillName}</Text>
                <View style={styles.underline} />
                </TouchableOpacity>} />
                    </View> :
                    <View>
                    <Text style={styles.selectcategory}>Plesae Select Category First</Text>
                    </View>}
                    <View style={styles.Main__View}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalSkills(!modalskills)} style={styles.CancelBtn}>
                    <Text style={styles.ok_cancel}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalSkills(!modalskills)} style={styles.okBtn}>
                    <Text style={styles.ok_cancel}>Ok</Text>
                    </TouchableOpacity>
                    </View>
                   </View>
                  </ScrollView>
                  </View>
                  </View>
                  </Modal> */}

          { /* +++++++++++++++++++++++++++ Skill Category Modal +++++++++++++++++++++++++++ */}
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalCategory}>
            <View style={styles.modal____VIEW}>
            <View style={styles.ModelCard}>
            <View style={styles.ModelHeader}>
            <Text style={styles.ChooseCategory_text}>Choose category</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ padding: mobileW * 3 / 100 }}>
            <View style={{ alignItems: 'center', }}>
            <FlatList
            data={category}
            renderItem={({ item }) =>
            <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }} onPress={() => skillCategory_close(item)}>
            <Text style={styles.multipletext}>{item.name}</Text>
            <View style={styles.underline} />
            </TouchableOpacity>}/>
            </View>
            <View style={styles.Main__View}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(!modalCategory)} style={styles.CancelBtn}>
            <Text style={styles.cancel_text}>Cancel</Text>
            </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(!modalCategory)} style={styles.CancelBtn}>
            <Text style={styles.okk}>Ok</Text>
             </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
            </View>
            </View>
            </Modal> */}
          {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
          {/* skill select modal  */}
          <Modal
            animationType='fade'
            transparent={true}
            visible={ModalForCommission}>
            <View style={styles.modal_commission}>
              <View style={[styles.ModelCard]}>
                <View style={styles.ModelHeader}>
                  <Text style={styles.Alert_text}>{Lang_chg.AlertTxt[config.language]}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setModalForCommission(!ModalForCommission)}>
                    <Image style={styles.closseIconTint} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, marginBottom: mobileW * 5 / 100, backgroundColor: '#E7E8EA' }}></View>

                <View style={{}}>
                  <Text style={styles.commission_TExt}>{Lang_chg.CommisionforchargeTxt[config.language]}</Text>
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: mobileW * 3 / 100 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalForCommission(!ModalForCommission)} style={styles.ok_Button} >
                      <Text style={styles.OK_TExt}>{Lang_chg.OkTxt[config.language]}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          {/*  set time duiration modal*/}
          <Modal
            animationType='fade'
            transparent={true}
            visible={duration}>
            <View style={[styles.modal_commission]}>
              <View style={[styles.DurationCard, { height: mobileW * 98 / 100 }]}>
                <View style={styles.DurationModelHeader}>
                  <Text style={styles.Alert_text}>{Lang_chg.DurationTxt[config.language]}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setDuration(!duration)}>
                    <Image style={styles.closeIcon} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.grayLineView}></View>

                <View style={{ height: mobileW * 75 / 100, padding: mobileW * 3 / 100 }}>
                  <FlatList
                    data={DurationTime}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                      <View>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => { setTimeoutminut(item.time), setDuration(!duration) }}>
                          <Text style={styles.timeTxt}>{item.time}</Text>
                        </TouchableOpacity>
                        <View style={styles.lineView}></View>

                      </View>
                    } />



                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', right: mobileW * 2 / 100 }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { setDuration(!duration) }} style={styles.Ok_CancelBtn} >
                    <Text style={styles.OK_TExt}>{Lang_chg.CancelTxt[config.language]}</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setDuration(!duration)} style={[styles.Ok_CancelBtn,{backgroundColor:Colors.white_color}]} >
              <Text style={[styles.OK_TExt,{color:Colors.themecolor}]}>{Lang_chg.OkTxt[config.language]}</Text>
              </TouchableOpacity> */}
                </View>
              </View>

            </View>

          </Modal>

          <Modal
            animationType='fade'
            transparent={true}
            visible={seccessmodal} >
            <View style={styles.modal_commission}>
              <View style={[styles.DurationCard_]}>
                <View style={[styles.SuccessmodalHeader]}>
                  <Text style={styles.Alert_text}>{Lang_chg.SuccessTxt[config.language]}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { setSeccessmodal(!seccessmodal) }}>
                    <Image style={styles.closseIconTint} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>

                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>

                <View style={{ padding: mobileW * 3 / 100 }} >
                  <Text style={styles.teachingSubmittedTxt}>{Lang_chg.TeachingsubmittedTxt[config.language]}</Text>


                  <TouchableOpacity activeOpacity={0.8} onPress={() => { _navigationHandle() }}
                    style={[styles.Ok_CancelBtn, { marginTop: mobileW * 3 / 100 }]} >
                    <Text style={styles.OK_TExt}>{Lang_chg.OkayTxt[config.language]}</Text>
                  </TouchableOpacity>


                </View>
              </View>
            </View>
          </Modal>



        </ScrollView>
      </SafeAreaView>
    </View>

  )
}
export default AddCourse
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  lineView_: {
    width: mobileW * 90 / 100,
    height: mobileW * 0.2 / 100,
    marginTop: mobileW * 5 / 100,
    backgroundColor: Colors.gray,
  },
  courseFeeTxt: {
    width: mobileW * 42 / 100,
    right: mobileW * 0.2 / 100,
    fontSize: mobileW * 3.3 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
  },
  batchTimeTxt: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    marginTop: mobileW * 2 / 100,
    fontSize: mobileW * 3.5 / 100,
  },
  history_icon: {
    width: mobileW * 5.5 / 100,
    height: mobileW * 5.5 / 100,
    marginHorizontal: mobileW * 4 / 100
  },

  timeTxt: {
    alignSelf: 'center',
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  earningMoneyTxt: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    width: mobileW * 42 / 100,
    fontSize: mobileW * 3.3 / 100,
  },
  closeIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange
  },
  selectTopicBottomSheet:{ 
    backgroundColor: Colors.white_color, 
    width: mobileW, 
    height: mobileH * 50 / 100, 
    borderTopLeftRadius: mobileW * 5 / 100, 
    borderTopRightRadius: mobileW * 5 / 100, 
  },
  closseIconTint: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange
  },
  grayLineView: {
    width: mobileW * 90 / 100,
    height: mobileW * 0.2 / 100,
    backgroundColor: '#E7E8EA'
  },
  lineView: {
    width: mobileW * 90 / 100,
    height: mobileW * 0.5 / 100,
    marginTop: mobileW * 4 / 100,
    backgroundColor: Colors.gray,
    marginBottom: mobileW * 4 / 100,
  },
  historyIcon: {
    width: mobileW * 5.5 / 100,
    height: mobileW * 5.5 / 100,
    marginHorizontal: mobileW * 4 / 100
  },
  teachingSubmittedTxt: {
    textAlign: 'center',
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.8 / 100,
  },
  post___texttt: {
    color: Colors.white_color,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 4 / 100,
  },
  redioButtonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.40 / 100,
  },
  redioButtonbackground: {
    width: mobileW * 3 / 100,
    height: mobileW * 3 / 100,
    borderRadius: mobileW * 2 / 100
  },
  Alert_text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  info_icon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    borderRadius: mobileW * 2 / 100,
  },
  commission_TExt: {
    textAlign: 'center',
    color: Colors.blackColor,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
  },
  multipletext: {
    color: Colors.themecolor,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  modal_commission: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060'
  },
  SarvisChargesTxt: {
    color: Colors.themecolor,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 3.5 / 100,
    marginHorizontal: mobileW * 5 / 100,
  },
  OK_TExt: {
    color: Colors.white_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  SafeArea_View: {
    flex: 1,
    backgroundColor: Colors.white_color
  },
  charges_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: mobileW * 2 / 100
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color,
  },
  ok_Button: {
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    width: mobileW * 22 / 100,
    height: mobileW * 8 / 100,
    marginTop: mobileW * 2 / 100,
    marginBottom: mobileW * 3 / 100,
    borderRadius: mobileW * 2 / 100,
    marginHorizontal: mobileW * 1 / 100
  },
  Ok_CancelBtn: {
    width: mobileW * 22 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.2 / 100,
    marginHorizontal: mobileW * 1 / 100,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.themecolor,
    backgroundColor: Colors.themecolor,
  },
  backIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.blackColor,
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
  },
  Main__View: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: mobileW * 5 / 100
  },
  modalCard: {
    backgroundColor: Colors.whiteColor,
    width: mobileW * 90 / 100,
    elevation: mobileW * 3 / 100,
    borderBottomRightRadius: mobileW * 2 / 100,
    borderBottomLeftRadius: mobileW * 2 / 100,
  },
  setprice_view: {
    width: mobileW * 42 / 100,
    height: mobileW * 15 / 100,
    marginTop: mobileW * 2 / 100,
  },
  HeaderText: {
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 4 / 100,
  },
  Header: {
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
  },
  Categoryselect: {
    elevation: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#9f9f9f",
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    width: mobileW * 94 / 100,
    margin: mobileW * 2 / 100,
    height: mobileW * 13 / 100,
    padding: mobileW * 3 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.3 / 100,
  },
  dateView: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: mobileW * 92 / 100,
    marginTop: mobileW * 1 / 100,
  },
  iconTick: {
    alignSelf: 'flex-end',
    width: mobileW * 4 / 100,
    height: mobileW * 4 / 100,
    tintColor: Colors.themecolor,
  },
  levelBtn: {
    alignItems: 'center',
    backgroundColor: Colors.white_color,
    padding: mobileW * 1 / 100,
    margin: mobileW * 1.3 / 100,
    width: mobileW * 28.7 / 100,
    height: mobileW * 13.2 / 100,
    borderRadius: mobileW * 1 / 100,
  },
  iconQuestionMark: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.themecolor
  },
  success_text: {
    color: Colors.whiteColor,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
  CourseDurationText: {
    color: Colors.gray,
    fontFamily: Font.FontRegular,
    marginLeft: mobileW * 5 / 100,
    marginTop: mobileW * 1.5 / 100,
    fontSize: mobileW * 2.9 / 100,
  },
  CalanderView: {
    width: mobileW * 42 / 100,
    height: mobileW * 16 / 100,
    padding: mobileW * 2 / 100,
    marginTop: mobileW * 1.5 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#9f9f9f",
    borderColor: Colors.gray,
    backgroundColor: Colors.white_color,
  },
  TimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.gray,
    backgroundColor: Colors.whiteColor,
    width: mobileW * 42 / 100,
    height: mobileW * 16 / 100,
    marginTop: mobileW * 1 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.2 / 100,
  },
  calanderText: {
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
    marginHorizontal: mobileW * 2 / 100
  },
  UserEarning: {
    color: Colors.blackColor,
    fontSize: mobileW * 4 / 100
  },
  PostButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor,
    width: mobileW * 92 / 100,
    height: mobileW * 12 / 100,
    marginTop: mobileW * 3 / 100,
    marginBottom: mobileW * 10 / 100,
    borderRadius: mobileW * 2.4 / 100,
  },
  ModelCard: {
    elevation: 5,
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
  },
  DurationCard_: {
    elevation: 5,
    width: mobileW * 90 / 100,
    height: mobileW * 50 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
  },
  DurationCard: {
    elevation: 5,
    width: mobileW * 90 / 100,
    height: mobileW * 75 / 100,
    borderRadius: mobileW * 3 / 100,
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
  DurationModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 3 / 100,
    borderTopRightRadius: mobileW * 3 / 100,
  },
  SuccessmodalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    width: mobileW * 90 / 100,
    height: mobileW * 12 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    borderTopLeftRadius: mobileW * 3 / 100,
    borderTopRightRadius: mobileW * 3 / 100,
  },
  underline: {
    width: mobileW * 85 / 100,
    height: mobileW * 0.3 / 100,
    marginTop: mobileW * 3 / 100,
    marginBottom: mobileW * 3 / 100,
    backgroundColor: Colors.gray
  },
  CancelBtn: {
    width: mobileW * 25 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 2 / 100,
    marginHorizontal: mobileW * 1 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor
  },
  okBtn: {
    width: mobileW * 25 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 2 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themecolor
  },
  userCharges: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.gray,
    width: mobileW * 42 / 100,
    height: mobileW * 15 / 100,
    marginTop: mobileW * 2 / 100,
    marginRight: mobileW * 0 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.3 / 100,
  },
  userCharges1: {
    width: mobileW * 42 / 100,
    height: mobileW * 15 / 100,
    padding: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: mobileW * 0.3 / 100,
    borderColor: Colors.themecolor,
    justifyContent: 'space-between',
  },
})







// ++++++++++++++++++++++++++++++++++++++++++++++++++ OLD SCREEN ++++++++++++++++++++++++++++++++++++++++++++++++++++++




// import { View, Text, ScrollView, FlatList, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Button, Alert, Modal, } from 'react-native'
// import React, { useState, useRef, useCallback, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors, Font } from './Provider/Colorsfont';
// import {    consolepro, Lang_chg,   msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import { Stack, TextInputPaper, } from "@react-native-material/core";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import moment from 'moment';
// import { msgProvider, msgText } from './Provider/Messageconsolevalidationprovider/messageProvider';
// import { config } from './Provider/configProvider';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// const SkillLevelsss = [
//   { id: 1, level: 'Basic' },
//   { id: 2, level: 'Medium' },
//   { id: 3, level: 'Advance' }
// ]

// const AddCourse = ({ navigation }) => {

//   const [datePicker, setShow] = useState(false);
//   const [timePicker, setTimePicker] = useState(false);
//   const [endtimePicker, setendTimePicker] = useState(false);
//   const [date, setdate] = useState(Lang_chg.StartDateTxt[config.language]);
//   const [enddate, setenddate] = useState(Lang_chg.EndDateTxt[config.language]);
//   const [time, setTime] = useState('HH:MM');
//   const [shouldShow, setShouldShow] = useState(false);
//   const [category, setCategory] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [modalVisible, setmodalVisible] = useState(false);
//   const [modalVisible_GIF, setModalVisible_GIF] = useState(false);
//   const [price, setPrice] = useState('')
//   const [modalCategory, setmodalCategory] = useState(false);
//   const [modalVisible_active, setModalVisible_active] = useState(false);
//   const [SkillName, setSkillName] = useState('Basic');
//   const [modalskills, setmodalSkills] = useState(false);
//   const [modalskillsLevel, setmodalSkillsLevel] = useState(false);
//   const [ModalForCommission, setModalForCommission] = useState(false);
//   const [Skill, setSkill] = useState('Medium');
//   const [SkillLevelForText, setSkillLevelForText] = useState('Advance');
//   const [SkillLevel, setSkillLevel] = useState(SkillLevelsss);
//   const [checked, setChecked] = useState('Active')




//   const PostButton=()=>{
//     // if (shouldShow == false) {
//     //   msgProvider.toast(msgText.acceptTerms[config.language], 'center')
//     //   return false
//     // }
//     // ======================== Validations for Signup ==================
//     // {fullname.length==""?Colors.red:Colors.themecolor}
//     // if (fullname.length <= 0?Colors.red:Colors.themecolor && email.length <= 0 && mobile_number.length <= 0) {
//     //   msgProvider.toast(msgText.Sign_In_or_Login_error_msg[config.language], 'center')
//     //   return false
//     // }
//     //=====================All Fields Check================

//     if (SkillName == "Basic") {
//       msgProvider.toast(msgText.selectskillsbasic[config.language], 'center')
//       return false
//     }

//     // if (Skill == "Medium") {
//     //   msgProvider.toast(msgText.selectskillsmedium[config.language], 'center')
//     //   return false
//     // }
//     // //===========email============================
//     // if (SkillLevelForText == "Advance") {
//     //   msgProvider.toast(msgText.selectskills[config.language], 'center')
//     //   setEmail('NA')
//     //   return false
//     // }
    
//     if (date == "Start Date") {
//       msgProvider.toast(msgText.StartDate[config.language], 'center')
//       return false
//     }
    
//     //======================================mobile============================
//     if (enddate == 'End Date') {
//       msgProvider.toast(msgText.EndDate[config.language], 'center')
//       return false
//     }
//     if (time == "HH:MM") {
//       msgProvider.toast(msgText.TimeSelect[config.language], 'center')
//       return false
//     }
//     if (price == '') {
//       msgProvider.toast(msgText.priceset[config.language], 'center')
//       return false
//     }
//     var mobilevalidation = config.mobilevalidation;
//     if (mobilevalidation.test(mobile_number) !== true) {
//       msgProvider.toast(msgText.validMobile[config.language], 'center')
//       return false
//     }
  
//     if (language == 'Select language') {
//       msgProvider.toast(msgText.ChooseLanguage[config.language], 'center')
//       return false
//     }

//   }

//   const SkillLevelToSet = (item) => {
//     setSkillLevelForText(item.level)
//     setmodalSkillsLevel(false)
//   }

//   const skillCategory_close = (item) => {
//     console.log("am here", item);

//     setSkillName(item.name)
//     setSkills(item.Skills)
//     setmodalCategory(false)
//   }

//   const skill_close = (item) => {
//     console.log("am here", item);
//     setSkill(item.SkillName)
//     if (item.level == 1) {
//       setSkillLevelForText('Basic')
//     } else if (item.level == 2) {
//       setSkillLevelForText("Medium")
//     } else if (item.level == 3) {
//       setSkillLevelForText('Advance')
//     }
//     setmodalSkills(false)
//   }

//   // ---------- To get Percenage State ----------  
//   const [percentage, setPercentage] = useState('you');

//   useEffect(() => {
//     // Not sure but percentage should be divided 300 I guess
//     const per = ((price) * 5) / 100;
//     setPercentage(price - per);
//   }, [price]);

//   const setDatetoFunction = (date) => {
//     setTimePicker(false)
//     setTimeout(() => {
//       console.log(timePicker);
//     }, 500);

//     var formateDate = date.nativeEvent.timestamp
//     let newDate = moment(new Date(formateDate)).format('DD-MM-YYYY')

//     setdate(newDate)
//     console.log('date is here--------->>>>>>', newDate);
//   }

//   const setendDatetoFunction = (date1) => {
//     setendTimePicker(false)
//     setTimeout(() => {
//       console.log(endtimePicker);
//     }, 500);

//     var formateDate = date1.nativeEvent.timestamp
//     let newDate = moment(new Date(formateDate)).format('DD-MM-YYYY')
//     setenddate(newDate)
//     console.log('date is here--------->>>>>>', newDate);
//   }

//   const setTimetoFunction = (given_time) => {
//     if (given_time.type != 'dismissed') {
//       console.log(given_time.type)
//       setShow(false)
//       var formateDate = given_time.nativeEvent.timestamp
//       var hours = new Date(formateDate).getHours(); //Current Hours
//       var min = new Date(formateDate).getMinutes(); //Current Minutes
//       var sec = new Date(formateDate).getSeconds(); //Current Seconds

//       var formattedDate = hours + ":" + min
//       setTime(formattedDate)
//       console.log('Time is here===========', formattedDate);

//     } else {
//       setTime("HH:MM")
//       setShow(false)
//     }


//   }

//   useEffect(() => {
//     apiCalling();
//   }, [])

//   const apiCalling = () => {
//     axios.get('https://mavenow.com:8001/usercategory?userId=848&userType=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAaW53aXphcmRzLmluIiwidXNlcl9JZCI6ODQ4LCJpYXQiOjE2NzQyMDkzNjF9.kEE4daftkvB5z3xMdMhjTq1DYnnNz__U1yXS2TRQRjI', {
//     })
//       .then(function (data) {
//         var GetData = data.data.result
//         console.log('-------- discipleOrMaster >', GetData)
//         setCategory(GetData)
//         setCategory(GetData)
//         var data = data.data.result;
//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });
//   }

//         return (
//         <View style={{ flex: 1, }}>
//         <SafeAreaView style={styles.SafeArea_View}>
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />

//             <View>
//             <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible_active}>
//            <View style={styles.success_modal}>
//            <View style={styles.modalHeader}>
//            <Text style={styles.success_text}>Success</Text>
//            </View>
//            <View style={styles.modalCard}>
//           <View style={{alignSelf:'center', padding:mobileW*3/100}} >
//           <Text style={[styles.commission_TExt,{width:mobileW*70/100, }]} >Your Teaching been submitted successfully for admin approval</Text>
//           </View>
//           <TouchableOpacity activeOpacity={0.8} style={styles.ok_Button} onPress={() => navigation.navigate('SessionRequest')}>
//            <Text style={styles.OKKK_text}>Okay</Text>
//           </TouchableOpacity>
//           </View>
//           </View>
//           </Modal>
//           </View>

//           <View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible_GIF}>
//             <View style={{ flex: 1, alignSelf: 'center', justifyContent: "center"}}>
//            </View>
//            </Modal>
//           </View>
//               {/* ++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++ */}
//               <View style={styles.Header}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <TouchableOpacity activeOpacity={0.8}  onPress={() => navigation.goBack()}>
//               <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/bk.png")}></Image>
//               </TouchableOpacity>
//               <Text style={styles.HeaderText}>{Lang_chg.AddCourseTxt[config.language]}</Text>
//               </View>
//               <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 5 / 100 }} >
//               <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/icon_info.png")}></Image>
//               </TouchableOpacity>
//               </View>
//               <ScrollView showsVerticalScrollIndicator={false}>

//             {/*  +++++++++++++++++++++++++++ Skill, Category, Level +++++++++++++++++++++++++++ */}
//             <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(true)} style={styles.Categoryselect}>
//             <Text style={styles.dianamic___text}  >{SkillName}</Text>
//             <Image style={styles.DRAWER_image} resizeMode='contain' source={require("./Icon/icon_drapdown.png")}></Image>
//             </TouchableOpacity>

//             <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalSkills(true)} style={styles.Categoryselect}>
//             <Text style={styles.dianamic___text}  >{Skill}</Text>
//             <Image style={styles.DRAWER_image}resizeMode='contain' source={require("./Icon/icon_drapdown.png")}></Image>
//             </TouchableOpacity>
//             <TouchableOpacity activeOpacity={0.8} style={styles.Categoryselect}>
//             <Text style={styles.dianamic___text}  >{SkillLevelForText}</Text>
//             <Image style={styles.DRAWER_image}resizeMode='contain' source={require("./Icon/icon_drapdown.png")}></Image>
//             </TouchableOpacity>

//           {/* ==============================Date Picker============================== */}
//               <Text style={styles.CourseDurationText}>{Lang_chg.EstimatedDurationTxt[config.language]}</Text>
//               <View style={styles.dateView}>
//               {timePicker && ( 
//                <DateTimePicker
//                 mode={'date'}
//                 value={new Date(Date.now())}
//                 display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                 is24Hour={false}
//                 onChange={text => setDatetoFunction(text)} />)}
//                <TouchableOpacity activeOpacity={0.8} onPress={() => setTimePicker(true)} style={styles.CalanderView}>
//                <Image resizeMode='contain' style={styles.iconQuestionMark} source={require('./Icon/icon_calendar.png')}></Image>
//                <Text style={styles.calanderText}>  {date}</Text>
//               </TouchableOpacity>

//                {endtimePicker && ( 
//                <DateTimePicker
//                 mode={'date'}
//                 value={new Date(Date.now())}
//                 display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                 is24Hour={false}
//                 onChange={text => setendDatetoFunction(text)}/> )}
//                <TouchableOpacity activeOpacity={0.8} onPress={() => setendTimePicker(true)}style={styles.CalanderView}>
//               <Image resizeMode='contain' style={styles.iconQuestionMark}source={require('./Icon/icon_calendar.png')}></Image>
//               <Text style={styles.calanderText}>  {enddate}</Text>

//              </TouchableOpacity>
//              </View>
//              <Text style={[styles.CourseDurationText, { marginTop: mobileW * 3 / 100, }]}>{Lang_chg.SessionDurationnTxt[config.language]}</Text>
//              {datePicker && (
//              <DateTimePicker
//               mode={'time'}
//               value={new Date(Date.now())}
//               display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//               is24Hour={false}
//               onChange={text => setTimetoFunction(text)} />)}
//             <TouchableOpacity  activeOpacity={0.8} onPress={() => setShow(true)} style={styles.TimeView}>
//             <Text style={styles.calanderText}>{time}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity activeOpacity={0.8} style={styles.show_touchableview} onPress={() => setShouldShow(!shouldShow)}>
//             {shouldShow ? (
//            <TouchableOpacity style={{ width: mobileW * 94 / 100, }}>
//            <TextInputPaper color={Colors.themecolor} height={mobileH * 20 / 100}
//             textAlignVertical={'top'}
//              paddingTop={mobileH * 2 / 100}
//              multiline label="Please explain about  your  concern"
//             variant="outlined" trailing={props => (<Text></Text>)} />
//               </TouchableOpacity>
//              ) :
//               (<View style={styles.showBox}>
//                <Text style={styles.sharma_text}>Hello,{'\n'} I am  Aman Sharma,I am into growth marketing. {'\n'}I want to learn how to
//                 integrate WhatsApp API to send automated replies and Promotional messages to our users.</Text>
//                 </View>)}
//                 </TouchableOpacity>

//                <View style={styles.charges_view}>
//                {/* <Text style={{ marginHorizontal: mobileW * 5 / 100, color: Colors.themecolor, fontSize: mobileW * 3.5 / 100 }}>Mavenow 5 % Service Charge</Text> */}
//                <Text style={{ marginHorizontal: mobileW * 5 / 100, color: Colors.themecolor, fontSize: mobileW * 3.5 / 100 }}>{Lang_chg.freesessionTxt[config.language]}</Text>
//                {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setModalForCommission(true)}style={{}} >
//                <Image style={styles.info_icon}resizeMode='contain' source={require("./Icon/icon_info.png")}></Image>
//                </TouchableOpacity> */}
//                </View>
//           {/* +++++++++++++++++++++++++++++++++ Set Charges +++++++++++++++++++++++++++++++++ */}
//               <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: mobileW * 2 / 100 }}>
//               <View style={styles.setprice_view}>
//               <TextInputPaper onChangeText={(text) => { setPrice(text) }}
//                  value={price}
              
//                 height={mobileW * 14 / 100} 
//                 keyboardType={'number-pad'}
//                 trailingContainerStyle={{fontSize:mobileW*3/100,color:Colors.red}}
//                 color={Colors.themecolor}
//                 label="Course Fee" variant="outlined"/>
//                 </View>
              
             
//                 {percentage != ""?
//                 <View style={styles.userCharges1}>
//                  <Text style={styles.multipletext}>{percentage}</Text>
//                 </View>
//                  :
//                 <View style={styles.userCharges}>
//                 <Text style={styles.UserEarning}>Your Earning*</Text>
//                </View>
//               }
            

//               </View>
//               {/* +++++++++++++++++++++++++++++++++ Post Button +++++++++++++++++++++++++++++++++ */}
//                <TouchableOpacity activeOpacity={0.8} style={styles.PostButton} onPress={() => { PostButton() }}>
//                <Text style={styles.post___texttt}>{Lang_chg.POSTTxt[config.language]}</Text>
//               </TouchableOpacity> 
//               {/* ------------------------------------- MODEL -------------------------------------*/}

//                        <Modal animationType="slide" transparent={true}  visible={modalVisible}>
//                        <View style={styles.modalview_view}>
//                        <View style={styles.ModelCard}>
//                        <View style={styles.ModelHeader}>
//                        <Text style={styles._ModalCategory}>Choose category</Text>
//                        </View>
//                        <ScrollView showsVerticalScrollIndicator={false} >
//                        <View style={{ padding: mobileW * 3 / 100 }}>
//                        <View style={{ alignItems: 'center', }}>
//                        <FlatList
//                         data={category}
//                         renderItem={({ item }) =>
//                         <View style={{ alignItems: 'center' }}>
//                         <Text style={{fontSize:mobileW*3/100}}>{item.name}</Text>
//                         <View style={styles.FlatList__Data} />
//                         </View>}/>
//                         </View>
//                         <View style={styles.Main__View}>
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalVisible(!modalVisible)} style={styles.CancelBtn}>
//                         <Text style={styles.camcelok_whitetext}>Cancel</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalVisible(!modalVisible)} style={styles.okBtn}>
//                         <Text style={styles.camcelok_whitetext}>Ok</Text>
//                        </TouchableOpacity>
//                        </View>
//                        </View>
//                        </ScrollView>
//                        </View>
//                        </View>
//                        </Modal>

//           {/* ------------ MOdal to Select Category -------------- */}

//               <Modal animationType="slide"  transparent={true} visible={modalCategory}>
//               <View style={styles.category_view}>
//               <View style={styles.ModelCard}>
//               <View style={styles.ModelHeader}>
//                <Text style={styles.cHOOSECATEGORY_TEXT}>Choose category</Text>
//               </View>
//               <ScrollView showsVerticalScrollIndicator={false}>
//               <View style={{ padding: mobileW * 3 / 100 }}>
//               <View style={{ alignItems: 'center', }}>
//               <FlatList
//                data={category}
//               renderItem={({ item }) =>
//               <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }}onPress={() => skillCategory_close(item)}>
//               <Text style={styles.multipletext}>{item.name}</Text>
//               <View style={styles.skillCategory_close_view} />
//               </TouchableOpacity>
//               } />
//               </View>
//               <View style={styles.Main__View}>
//               <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(!modalCategory)} style={styles.CancelBtn}>
//               <Text style={styles.ok_cancel}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(!modalCategory)} style={styles.okBtn}>
//               <Text style={styles.ok_cancel}>Ok</Text>
//               </TouchableOpacity>
//               </View>
//               </View>
//               </ScrollView>
//               </View>
//               </View>
//               </Modal>

//           {/* ------------ MOdal to Select Skills -------------- */}

//                 <Modal  animationType="slide"     transparent={true}  visible={modalskills} >
//                 <View style={styles.chooseskill_modal}>
//                 <View style={styles.ModelCard}>
//                 <View style={styles.ModelHeader}>
//                 <Text style={styles.choose_skill}>Choose skill</Text>
//                  </View>
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={{ padding: mobileW * 3 / 100 }}>
//                 {skills != '' ?
//                 <View style={{ alignItems: 'center',}}>
//                 <FlatList
//                 data={skills}
//                 renderItem={({ item }) =>
//                 <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }} onPress={() => skill_close(item)}>
//                  <Text style={styles.multipletext}>{item.SkillName}</Text>
//                 <View style={styles.underline} />
//                 </TouchableOpacity>} />
//                     </View> :
//                     <View>
//                     <Text style={styles.selectcategory}>Plesae Select Category First</Text>
//                     </View>}
//                     <View style={styles.Main__View}>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalSkills(!modalskills)} style={styles.CancelBtn}>
//                     <Text style={styles.ok_cancel}>Cancel</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalSkills(!modalskills)} style={styles.okBtn}>
//                     <Text style={styles.ok_cancel}>Ok</Text>
//                     </TouchableOpacity>
//                     </View>
//                    </View>
//                   </ScrollView>
//                   </View>
//                   </View>
//                   </Modal>

//           { /* +++++++++++++++++++++++++++ Skill Category Modal +++++++++++++++++++++++++++ */}
//             <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalCategory}>
//             <View style={styles.modal____VIEW}>
//             <View style={styles.ModelCard}>
//             <View style={styles.ModelHeader}>
//             <Text style={styles.ChooseCategory_text}>Choose category</Text>
//             </View>
//             <ScrollView showsVerticalScrollIndicator={false} >
//             <View style={{ padding: mobileW * 3 / 100 }}>
//             <View style={{ alignItems: 'center', }}>
//             <FlatList
//             data={category}
//             renderItem={({ item }) =>
//             <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }} onPress={() => skillCategory_close(item)}>
//             <Text style={styles.multipletext}>{item.name}</Text>
//             <View style={styles.underline} />
//             </TouchableOpacity>}/>
//             </View>
//             <View style={styles.Main__View}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(!modalCategory)} style={styles.CancelBtn}>
//             <Text style={styles.cancel_text}>Cancel</Text>
//             </TouchableOpacity>
//              <TouchableOpacity activeOpacity={0.8} onPress={() => setmodalCategory(!modalCategory)} style={styles.CancelBtn}>
//             <Text style={styles.okk}>Ok</Text>
//              </TouchableOpacity>
//             </View>
//             </View>
//             </ScrollView>
//             </View>
//             </View>
//             </Modal>

//           {/* ------------ MOdal to Select Skills -------------- */}
//                <Modal
//               animationType='fade'
//                transparent={true}
//               visible={ModalForCommission}
//               onRequestClose={() => {
//               Alert.alert("Modal has been closed.");
//               setModalForCommission(!ModalForCommission); }}>
//               <View style={styles.modal_commission}>
//               <View style={[styles.ModelCard]}>
//               <View style={styles.ModelHeader}>
//               <Text style={styles.Alert_text}>Alert</Text>
//               </View>
//               <View style={{  }}>
//               <Text style={styles.commission_TExt}>Commision 0% for next 30 course {"\n"} then 10% should be charge per user</Text>
//               <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: mobileW * 3 / 100 }}>
//               <TouchableOpacity activeOpacity={0.8} onPress={() => setModalForCommission(!ModalForCommission)} style={styles.ok_Button} >
//               <Text style={styles.OK_TExt}>Ok</Text>
//               </TouchableOpacity>
//               </View>
//               </View>
//                </View>
//               </View>
//               </Modal>
//               </ScrollView>
//              </SafeAreaView>
//             </View>

//   )
// }
// export default AddCourse
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   FlatList__Data:{width: mobileW * 85 / 100,height: mobileW * 0.5 / 100, marginTop: mobileW * 3 / 100, marginBottom: mobileW * 3 / 100, backgroundColor: Colors.gray },
//   post___texttt:{ color: Colors.white_color,fontSize: mobileW * 4 / 100, fontWeight: '500'},
//   Alert_text: {
//     color: Colors.white_color,
//     fontSize: mobileW * 4.5 / 100,
//     fontWeight: '500'
//   },
//   multi:{
//     fontSize:mobileW*2/100,
//     color:Colors.green

//   },
//   dianamic___text:{ color: Colors.blackColor, fontSize: mobileW * 4 / 100, },
//   modalview_view:{flex: 1, justifyContent: 'center', alignItems: 'center',  paddingVertical: mobileH * 7 / 100,backgroundColor: '#00000090' },
//   sharma_text:{ fontSize: mobileW * 3.1/ 100, color: Colors.gray,fontFamily:Font.FontRegular },
//   info_icon:{ width: mobileW * 5 / 100,height: mobileW * 5 / 100, borderRadius: mobileW * 2 / 100 },
//   choose_skill:{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontWeight: '500' },
//   cHOOSECATEGORY_TEXT:{ color: Colors.white_color, fontSize: mobileW * 4 / 100, fontWeight: '500' },
//   selectcategory:{ color: Colors.blackColor, fontSize: mobileW * 4 / 100, fontWeight: '500',alignSelf:"center" },
//   commission_TExt: {
//     fontSize: mobileW * 4 / 100,
//     fontWeight: '400',
//     color: Colors.blackColor,
//     textAlign: 'center'
//   },
//   ChooseCategory_text: {
//     color: Colors.white_color,
//     fontSize: mobileW * 4 / 100,
//     fontWeight: '500'
//   },
//   chooseskill_modal:{flex: 1,paddingVertical: mobileH * 7 / 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000090' },
//   multipletext:{ fontSize: mobileW * 4 / 100, color: Colors.black_color },
//   modal_commission: {
//     flex: 1,
//     // paddingVertical:mobileH*7/100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#00000090'
//   },
//   skillCategory_close_view:{width: mobileW * 85 / 100, height: mobileW * 0.5 / 100, marginTop: mobileW * 3 / 100,marginBottom: mobileW * 3 / 100, backgroundColor: Colors.gray},
//   camcelok_whitetext:{ fontSize: mobileW * 4 / 100, fontWeight: '500', color: Colors.white_color },

//   category_view:{ flex: 1, paddingVertical: mobileH * 7 / 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000090' },
//   ok_cancel:{ fontSize: mobileW * 4 / 100, fontWeight: '500',
//    color: Colors.white_color },
//    modal____VIEW:{ flex: 1, paddingVertical: mobileH * 7 / 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000090' },
  
//   cancel_text: {
//     fontSize: mobileW * 4 / 100,
//     fontWeight: '500',
//     color: Colors.white_color
//   },
//   OK_TExt: {
//     fontSize: mobileW * 4 / 100,
//     fontWeight: '500',
//     color: Colors.white_color
//   },
//   success_modal:{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000096' },
//   okk: {
//     fontSize: mobileW * 4 / 100,
//     fontWeight: '500',
//     color: Colors.white_color
//   },
//   SafeArea_View: {
//     flex: 1,
//     backgroundColor: Colors.white_color
//   },
//   charges_view:{flexDirection: 'row',alignItems: 'center',justifyContent: 'center', marginTop: mobileW * 2 / 100 },
//   backIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color,
//   },
//   ok_Button: {
//     width: mobileW * 22 / 100,
//     height: mobileW * 8 / 100,
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 2 / 100,
//     alignSelf: "center",
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: mobileW * 2 / 100,
//     marginBottom: mobileW * 3 / 100
//   },
//   show_touchableview:{ width: mobileW * 94 / 100,  marginTop: mobileW * 4 / 100, borderColor: Colors.light_grey, alignSelf: 'center' },
//   backIcon_: {
//     width: mobileW * 9.5 / 100,
//     height: mobileW * 9.5/ 100,
//     tintColor: Colors.white_color,
//   },
//   _ModalCategory:{color: Colors.white_color, fontSize: mobileW * 4 / 100, fontWeight: '500' },
//   OKKK_text:{ color: Colors.whiteColor, fontSize: mobileW * 4 / 100, fontWeight: '500' },
//   modalHeader: {
//     backgroundColor: Colors.themecolor,
//     height: mobileW * 12 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     width: mobileW * 90 / 100
//   },
//   Main__View:{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: mobileW * 5 / 100 },
 
//   modalCard: {
//     backgroundColor: Colors.whiteColor,
//     elevation: mobileW * 3 / 100,
//     borderBottomRightRadius: mobileW * 2 / 100,
//     borderBottomLeftRadius: mobileW * 2 / 100,
//     width: mobileW * 90 / 100
//   },
//   setprice_view:{ 
//     marginTop: mobileW * 2 / 100, 
//     width: mobileW * 45 / 100, 
//     marginLeft:mobileW*3/100,
//     // height:mobileW*10/100
//   },

//   HeaderText: {
//     color: Colors.white_color,
//     marginHorizontal: mobileW * 2 / 100,
//      fontSize: mobileW * 4.3 / 100,
//      fontFamily:Font.FontMedium
   
//   },
//   Header: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW,
//     height: mobileW * 13/ 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: mobileW * 2 / 100
//   },
//   Categoryselect: {
//     width: mobileW * 94 / 100,
//     height: mobileW * 13 / 100,
//     padding: mobileW * 3 / 100,
//     margin: mobileW * 2 / 100,
//     borderWidth: mobileW * 0.3/ 100,
//     borderColor:"#9f9f9f",
//     backgroundColor: Colors.white_color,
//     elevation: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderRadius: mobileW * 1 / 100,
//     alignSelf: 'center'
//   },
//   dateView: {
//     flexDirection: 'row',
//     marginTop: mobileW * 2 / 100,
//     width: mobileW * 94 / 100,
//     justifyContent: 'space-between',
//     alignSelf: 'center'
//   },
//   iconQuestionMark: {
//     width: mobileW * 6.5 / 100,
//     height: mobileW * 6.5 / 100,
//     tintColor: Colors.gray
//   },
//   success_text:{ color: Colors.whiteColor, fontSize: mobileW * 4 / 100, fontWeight: '500' },
//   CourseDurationText: {
//     marginLeft: mobileW * 5 / 100,
//     marginTop: mobileW * 1.5 / 100,
//     color: Colors.gray,
//     fontSize: mobileW * 2.9/ 100,
//     fontFamily:Font.FontRegular

//   },
//   sessionDurationTime: {
//     color: Colors.gray,
//     fontSize: mobileW * 3.5 / 100,
//     marginTop: mobileW * 2 / 100,
//     marginHorizontal: mobileW * 3 / 100,
//     marginLeft: mobileW * 5 / 100,
//   },
//   CalanderView: {
//     width: mobileW * 44 / 100,
//     height: mobileW * 13 / 100,
//     backgroundColor: Colors.whiteColor,
//     borderRadius: mobileW * 1 / 100,
//     padding: mobileW * 2 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     borderWidth: mobileW * 0.2/ 100,
//     borderColor:"#9f9f9f",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     borderColor:Colors.gray
//   },
//   TimeView: {
//     marginLeft: mobileW * 3 / 100,
//     marginTop: mobileW * 1/ 100,
//     width: mobileW * 44 / 100,
//     height: mobileW * 13 / 100,
//     backgroundColor: Colors.whiteColor,
//     borderRadius: mobileW * 1 / 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     borderColor: Colors.light_grey,
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     borderColor: Colors.themecolor
//   },
//   calanderText: {
//     color: Colors.black_color,
//     alignSelf: 'center',
//     fontSize: mobileW * 4 / 100,
//     // fontWeight: '400',
//     marginHorizontal: mobileW * 2 / 100
//   },
//   calanderText1: {
//     color: Colors.gray,
//     fontSize: mobileW * 3 / 100,
//     fontWeight: '500',
//     marginHorizontal: mobileW * 12 / 100,
//     alignSelf: 'center'
//   },
//   UserEarning:{
//     color:Colors.blackColor,
//     fontSize:mobileW*4/100

//   },
//   PostButton: {
//     width: mobileW * 94 / 100,
//     height: mobileW * 12 / 100,
//     marginTop: mobileW * 3 / 100,
//     borderRadius: mobileW * 2.4 / 100,
//     backgroundColor: Colors.themecolor,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginBottom: mobileW * 10 / 100
//   },
//   ModelCard: {
//     width: mobileW * 90 / 100,
//     // height:mobileH*90/100,
//     borderRadius: mobileW * 3 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 5
//   },
//   ModelHeader: {
//     width: mobileW * 90 / 100,
//     marginBottom: mobileW * 5 / 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: mobileW * 11 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   underline: {
//     width: mobileW * 85 / 100,
//     height: mobileW * 0.3 / 100,
//     marginTop: mobileW * 3 / 100,
//     marginBottom: mobileW * 3 / 100,
//     backgroundColor: Colors.gray
//   },
//   CancelBtn: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 8 / 100,
//     borderRadius: mobileW * 2 / 100,
//     marginHorizontal: mobileW * 1 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.themecolor
//   },
//   okBtn: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 8 / 100,
//     borderRadius: mobileW * 2 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.themecolor
//   },
//   DRAWER_image:{ 
//     width: mobileW * 3.4 / 100, 
//     height: mobileW * 3.4/ 100,
//     tintColor:'gray'
//   },
  
//   showBox: {
//     width: mobileW * 94 / 100,
//     elevation: 1,
//     padding: mobileW * 5 / 100,
//     borderRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.white_color,
//     borderColor: Colors.gray,
//     borderWidth:mobileW*0.3/100
//   },
//   userCharges: {
//     marginTop: mobileW * 2 / 100,
//     width: mobileW * 45 / 100,
//     height: mobileW * 15/ 100,
//    marginRight:mobileW*3/100,
//     borderWidth: mobileW * 0.3 / 100,
//     borderRadius: mobileW * 1 / 100,
//     borderColor: Colors.gray,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   userCharges1: {
//     marginTop: mobileW * 2 / 100,
//     width: mobileW * 45 / 100,
//     height: mobileW * 15 / 100,
//     // marginHorizontal: mobileW * 2 / 100,
//     borderWidth: mobileW * 0.3 / 100,
//     borderRadius: mobileW * 1 / 100,
//     borderColor: Colors.themecolor,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
// })


