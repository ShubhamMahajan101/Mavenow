import { Modal, Alert, ScrollView, TextInput, StatusBar, Animated, FlatList, RefreshControl, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { localStorage } from './Provider/localStorageProvider';
import axios from 'axios';
import moment from 'moment';
import { log } from 'react-native-reanimated';
import { getDate, set } from 'date-fns';
import { useController } from 'react-hook-form';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DataArray = [
  {
    "Id": 1779,
    "DateOfRequest": "2023-04-05T11:53:31.000Z",
    "ShortDescription": "hello react native developer",
    "TypeOfRequest": "learning",
    "charges": 500,
    "Charges": 500,
    "StartDate": "2023-04-05T18:30:00.000Z",
    "Enddate": "2023-04-08T18:29:00.000Z",
    "CourseDuration": 2,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Shubham Mahajan",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },
  {
    "Id": 1772,
    "DateOfRequest": "2023-04-03T05:05:34.000Z",
    "ShortDescription": "I want to learn React-Native",
    "TypeOfRequest": "teaching",
    "charges": 50,
    "Charges": 50,
    "StartDate": "2023-04-03T18:30:00.000Z",
    "Enddate": "2023-04-05T18:29:00.000Z",
    "CourseDuration": 1,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Ajaj Meer",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },
  {
    "Id": 1769,
    "DateOfRequest": "2023-03-31T12:25:22.000Z",
    "ShortDescription": "hello developer what are you doing",
    "TypeOfRequest": "teaching",
    "charges": 500,
    "Charges": 500,
    "StartDate": "2023-03-31T18:30:00.000Z",
    "Enddate": "2023-04-02T18:29:00.000Z",
    "CourseDuration": 1,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Gaurav Pathak",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },
  {
    "Id": 1756,
    "DateOfRequest": "2023-04-03T05:05:34.000Z",
    "ShortDescription": "I want to learn React-Native",
    "TypeOfRequest": "teaching",
    "charges": 50,
    "Charges": 50,
    "StartDate": "2023-04-03T18:30:00.000Z",
    "Enddate": "2023-04-05T18:29:00.000Z",
    "CourseDuration": 1,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Ajaj Meer",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },
]
const ScheduleDataArray = [
  {
    "Id": 1779,
    "DateOfRequest": "2023-04-05T11:53:31.000Z",
    "ShortDescription": "hello react native developer",
    "TypeOfRequest": "learning",
    "charges": 500,
    "Charges": 500,
    "StartDate": "2023-04-05T18:30:00.000Z",
    "Enddate": "2023-04-08T18:29:00.000Z",
    "CourseDuration": 2,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Shubham Mahajan",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },
  {
    "Id": 1772,
    "DateOfRequest": "2023-04-03T05:05:34.000Z",
    "ShortDescription": "I want to learn React-Native",
    "TypeOfRequest": "teaching",
    "charges": 50,
    "Charges": 50,
    "StartDate": "2023-04-03T18:30:00.000Z",
    "Enddate": "2023-04-05T18:29:00.000Z",
    "CourseDuration": 1,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Ajaj Meer",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },
  {
    "Id": 1762,
    "DateOfRequest": "2023-04-03T05:05:34.000Z",
    "ShortDescription": "I want to learn React-Native",
    "TypeOfRequest": "teaching",
    "charges": 50,
    "Charges": 50,
    "StartDate": "2023-04-03T18:30:00.000Z",
    "Enddate": "2023-04-05T18:29:00.000Z",
    "CourseDuration": 1,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Gaurav Pathak",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },
  {
    "Id": 1761,
    "DateOfRequest": "2023-04-03T05:05:34.000Z",
    "ShortDescription": "I want to learn React-Native",
    "TypeOfRequest": "teaching",
    "charges": 50,
    "Charges": 50,
    "StartDate": "2023-04-03T18:30:00.000Z",
    "Enddate": "2023-04-05T18:29:00.000Z",
    "CourseDuration": 1,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Pradeep Bairagi",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },
  {
    "Id": 1792,
    "DateOfRequest": "2023-04-03T05:05:34.000Z",
    "ShortDescription": "I want to learn React-Native",
    "TypeOfRequest": "teaching",
    "charges": 50,
    "Charges": 50,
    "StartDate": "2023-04-03T18:30:00.000Z",
    "Enddate": "2023-04-05T18:29:00.000Z",
    "CourseDuration": 1,
    "Skills": "Kotlin",
    "skill_level": "Basic",
    "PostedByMe": 1,
    "userDetail": {
      "profileImage": "",
      "Id": 0,
      "FullName": "Demo User",
      "email": "",
      "timezone": "",
      "username": "",
      "firebaseToken": "",
      "mobile_number": "",
      "FirstName": "",
      "MiddleName": "",
      "LastName": ""
    },
    "isApproved": 2,
    "rejectReason": "",
    "requestagainreason": "No one has applied",
    "requestagainstatus": 0
  },

]

export default function SessionRequest({ navigation }) {
  const [shouldShow1, SetShouldShow1] = useState("Active")
  const [userMode, setuserMode] = useState();
  const [show, setShow] = useState('Add')
  const [completed, setCompleted] = useState('');
  const [scheduled, setScheduled] = useState('');
  console.log("completed tab ", completed);
  const [textmodal, settextmodal] = useState(false)
  const [completedForSearch, setCompletedForSearch] = useState([]);
  const [ActiveForSearch, setActiveForSearch] = useState([]);
  const [checked, setChecked] = useState('Active')
  const [active, setActived] = useState();
  const [Activedata, setActivedatad] = useState(DataArray);
  const [ScheduleData, setScheduleDataArray] = useState(ScheduleDataArray);
  const [itemDeletmodal, setItemDeletmodal] = useState(false)
  const [removeid, setRemoveid] = useState(0)
  const [modalVisible_gifloader, setModalVisible_gifloader] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');



  // const handleRemove = (itemToRemove) => {
  //   const filteredArray = Activedata.filter(item => item !== itemToRemove);
  //   setActivedatad(filteredArray);
  // };



  const handleRemove = () => {
    var Id = removeid
    const Datalist = Activedata.filter((items) => items.Id !== Id);

    console.log("item Remove :- ", Datalist);
    console.log("item Remove :- ", Id);
    setActivedatad(Datalist)
  };

  // ===========================================refreshController
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  // ===========================================> refreshController
  useEffect(() => {
    CompletedData();
    SetMode();
  }, [])


  const SetMode = async (data) => {
    const value = await localStorage.getItemString('UserMode')
    console.log("..........", value);
    setuserMode(value)
  }


  const CompletedData = () => {
    axios.post('https://mavenow.com:8001/userrequest/CompleteRequest?userId=848&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NzQ5NTc5Nn0.hp75g4O_N7R7MVkAyeWYiMlfglGAXP5Sl9pGohbPUYY',
      {
        "ActiveDate": "2022-12-24 18:29:00",
        "typeofrequest": 1
      })
      .then(function (data) {
        var GetData = data.data.result
        setCompleted(GetData)
        console.log(setCompleted, ' session request screen on tab .... ====> ');
        setCompletedForSearch(GetData)
        console.log(setCompletedForSearch, '...............');
        console.log('Completed API ========= >', GetData)
      })
      .catch(function (error) {
        console.log('======>', error);
      });
    try {
      setCompletedForSearch(GetData)

    } catch (error) {
      console.log(error, "url not found");
    }

  }

  // ...... Searching functionlity ........
  const _searchLearner = (text) => {
    setSearchQuery(text);


    const ActivedataResult = DataArray.filter((item) =>
      item.userDetail.FullName.toLowerCase().includes(text.toLowerCase())
    );
    setActivedatad(ActivedataResult);

    const filteredResult = ScheduleDataArray.filter((item) =>
      item.userDetail.FullName.toLowerCase().includes(text.toLowerCase())
    );
    setScheduleDataArray(filteredResult);

    const filteredResults = completed.filter((item) =>
      item.userDetail.FullName.toLowerCase().includes(text.toLowerCase())
    );
    setCompleted(filteredResults);
  };

  // const _searchLearner = (textToSearch) => {

  //   var textToSearch = textToSearch.toString().toLowerCase();
  //   if (shouldShow1 == 'Active') {
  //     var data1 = Activedata
  //   } else if (shouldShow1 == 'Scheduled') {
  //     var data1 = ScheduleData
  //   } else if (shouldShow1 == 'Completed') {
  //     var data1 = completedForSearch
  //   }

  //   if (data1 != 'NA') {
  //     console.log('data1', data1);
  //     if (data1 != 'NA') {
  //       var text_data = textToSearch.trim();
  //       let newData = data1.filter(function (item) {
  //         var name = item.userDetail.FullName
  //         return (
  //           name.toString().toLowerCase().indexOf(text_data) > - 1
  //           // name.toString().toLowerCase().indexOf(text_data) >= 0
  //         )
  //       });

  //       console.log('newData------- before set', newData);
  //       if (shouldShow1 == 'Active') {
  //         if (newData.length > 0) {
  //           setActivedatad(newData)
  //         } else if (newData.length <= 0) {
  //           setActivedatad('')
  //         }
  //       }
  //       else if (shouldShow1 == 'Scheduled') {
  //         if (newData.length > 0) {
  //           setScheduleDataArray(newData)
  //         } else if (newData.length <= 0) {
  //           setScheduleDataArray('')
  //         }
  //       } else if (shouldShow1 == 'Completed') {
  //         if (newData.length > 0) {
  //           setCompleted(newData)
  //         } else if (newData.length <= 0) {
  //           // name.toString().toLowerCase().indexOf(text_data) >= 0
  //           setCompleted('')
  //         }
  //       }
  //     }
  //   }
  // }



  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />
        {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl 
           tintColor={Colors.themecolor}
            colors={[Colors.themecolor]} 
          refreshing={refreshing} onRefresh={onRefresh} />
        }> */}

        {/* =========================== */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible_gifloader}
          onRequestClose={() => { setModalVisible_gifloader(!modalVisible_gifloader); }}>
          <View style={styles.gif_view}>
            <Image style={styles.gif_image} source={require("./Icon/neighcoach_loader.gif")}></Image>
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
                  <TouchableOpacity activeOpacity={0.8} onPress={() => settextmodal(!textmodal)}  >
                    <Image style={styles.backIcon_edit} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{ width: mobileW * 90 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                <ScrollView>
                  <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

                    <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 4 / 100, fontFamily: Font.FontRegular }}>
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


        {/*============> Header */}

        <View style={styles.Header}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>

          </View>
          <Text style={styles.HeaderName}>{userMode == 'maven' ? Lang_chg.SessionRequestTxt[config.language] : Lang_chg.LearningRequestTxt[config.language]}</Text>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 2 / 100 }} onPress={() => setShow('search')}>
              <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'black' }} resizeMode='contain' source={require("./Icon/icon_search.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }} onPress={() => {
              setModalVisible_gifloader(true)
              setTimeout(() => {
                userMode == 'maven' ? navigation.navigate('AddCourse') : navigation.navigate('Chatbots')
              }, 1000);

            }}>
              <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'black', }} resizeMode="stretch" source={require("./Icon/plus.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 1 / 100 }} onPress={() => settextmodal(true)}>
              <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'black', }} resizeMode="stretch" source={require("./Icon/about.png")}></Image>
            </TouchableOpacity>
          </View>
        </View>
        {show != 'Add' &&
          <View style={styles.searchView}>
            <View style={styles.TextInputView}>
              <TextInput style={styles.TextInput}
                onChangeText={(txt) => _searchLearner(txt)}
                paddingLeft={mobileW * 2 / 100}
                value={searchQuery}
                placeholder={Lang_chg.SearchEngine[config.language]}
                placeholderTextColor={Colors.gray} />
              <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('Add')}>
                <Image resizeMode='contain' style={styles.croseImage} source={require('./Icon/close2.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>}

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Active/ Scheduled/ Completed Button +++++++++++++++++++++++++++++++++++++++++++++++ */}


        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => SetShouldShow1('Active')}>
            <View style={{ width: mobileW * 33.3 / 100, height: mobileW * 10 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Active' ? Colors.themecolor : Colors.gray }}>{Lang_chg.ActiveTxt[config.language]}</Text>

            </View>
            <View style={{ width: mobileW * 33.3 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Active' ? Colors.themecolor : Colors.light_grey }}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => SetShouldShow1('Scheduled')}>
            <View style={{ width: mobileW * 33.3 / 100, height: mobileW * 10 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Scheduled' ? Colors.themecolor : Colors.gray }}>{Lang_chg.ScheduledTxt[config.language]}</Text>
            </View>
            <View style={{ width: mobileW * 33.3 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Scheduled' ? Colors.themecolor : Colors.light_grey }}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => SetShouldShow1('Completed')}>
            <View style={{ width: mobileW * 33.4 / 100, height: mobileW * 10 / 100, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: shouldShow1 === 'Completed' ? Colors.themecolor : Colors.gray }}>{Lang_chg.CompletedTxt[config.language]}</Text>
            </View>
            <View style={{ width: mobileW * 33.4 / 100, height: mobileW * 0.3 / 100, backgroundColor: shouldShow1 === 'Completed' ? Colors.themecolor : Colors.light_grey }}></View>
          </TouchableOpacity>
        </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Active Button Data +++++++++++++++++++++++++++++++++++++++++++++++ */}

        {shouldShow1 == 'Active' &&

          <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                tintColor={Colors.themecolor}
                colors={[Colors.themecolor]}
                refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {Activedata != "" ? <View>
              <FlatList
                // contentContainerStyle={{bottom:mobileH*20/100}}
                data={Activedata}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View >
                      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequestBasic', { Active: shouldShow1, item: item })}
                        style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100, padding: mobileW * 3 / 100, }}>
                        <View style={{ width: mobileW * 18 / 100, }}>
                          <View>
                            <Image resizeMode='contain' style={{ width: mobileW * 16 / 100, height: mobileW * 16 / 100, borderRadius: mobileW * 9 / 100 }}
                              source={require('./Icon/12.jpg')}></Image>
                          </View>
                        </View>
                        <View style={{ width: mobileW * 74 / 100, }}>
                          <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{item.userDetail.FullName != '' ? item.userDetail.FullName : '[Maven]'}</Text>

                          <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                            <View style={{ width: mobileW * 37 / 100, flexDirection: 'row' }}>
                              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.RequestTxt[config.language]} </Text>
                              <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 22 / 100 }}>{item.TypeOfRequest}</Text>
                            </View>
                            <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.StartDateTxt[config.language]} </Text>
                              <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 22 / 100 }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                            <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.EndDateTxt[config.language]} </Text>
                              <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 21 / 100 }}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                            </View>
                            <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.SkillsTxt[config.language]} </Text>
                              <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 30 / 100 }}>{item.Skills}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                            <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.LevelTxt[config.language]} </Text>
                              <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 26 / 100 }}>{item.skill_level}</Text>
                            </View>
                            <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center', }}>
                              <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.PostdateTxt[config.language]} </Text>
                              <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 18 / 100 }}>{moment(new Date(item.DateOfRequest)).format('MMM DD, YYYY')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100, }}>
                            <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor, }}>{Lang_chg.FeeTxt[config.language]} </Text>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, }}>{item.charges}</Text>
                                <Text style={{ fontSize: mobileW * 2.5 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, alignSelf: 'flex-end' }}>{Lang_chg.RsTxt[config.language]}</Text>
                              </View>
                            </View>
                            <View style={{ width: mobileW * 37 / 100, }}>
                              {/* <TouchableOpacity activeOpacity={0.8}   > */}
                              {/* <TouchableOpacity activeOpacity={0.8} onPress={() => { handleRemove(item)  }}  > */}
                              <TouchableOpacity activeOpacity={0.8} onPress={() => { setItemDeletmodal(true), setRemoveid(item.Id) }}  >
                                <Image resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: Colors.themecolor, alignSelf: 'flex-end' }}
                                  source={require('./Icon/delete.png')}></Image>
                              </TouchableOpacity>
                            </View> 
                          </View>
                          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('FirebaseTutorial')} style={{ marginTop: mobileW * 2 / 100, }}>
                            <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, alignSelf: 'flex-end' }}>{Lang_chg.EditDetailsTxt[config.language]}</Text>
                          </TouchableOpacity>

                        </View>

                      </TouchableOpacity >
                      <View style={{ width: mobileW, height: mobileW * 0.3 / 100, backgroundColor: '#E7E8EA' }}></View>
                    </View>)
                }}
              />
            </View> :
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: mobileH * 35 / 100 }}>
                <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.blackColor, fontFamily: Font.FontMedium }}>{Lang_chg.Nodatafound[config.language]}</Text>
              </View>
            }
          </ScrollView>

        }


        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Scheduled Button Data +++++++++++++++++++++++++++++++++++++++++++++++ */}
        <ScrollView showsVerticalScrollIndicator={false}

          refreshControl={
            <RefreshControl
              tintColor={Colors.themecolor}
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View >
            {shouldShow1 == 'Scheduled' &&
              <View  >

                {ScheduleData != "" ? <View  >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={ScheduleData}
                    renderItem={({ item, index }) => {
                      return (
                        <View >
                          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequestBasic', { Active: shouldShow1, item: item })} style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100, padding: mobileW * 3 / 100, }}>
                            <View style={{ width: mobileW * 18 / 100, }}>
                              <View>
                                <Image resizeMode='contain' style={{ width: mobileW * 16 / 100, height: mobileW * 16 / 100, borderRadius: mobileW * 9 / 100 }}
                                  source={require('./Icon/12.jpg')}></Image>
                              </View>
                            </View>
                            <View style={{ width: mobileW * 74 / 100, }}>
                              <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{item.userDetail.FullName != '' ? item.userDetail.FullName : '[Maven]'}</Text>

                              <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100, }}>
                                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', }}>
                                  <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.RequestTxt[config.language]} </Text>
                                  <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 22 / 100 }}>{item.TypeOfRequest}</Text>
                                </View>
                                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.StartDateTxt[config.language]} </Text>
                                  <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 22 / 100 }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.EndDateTxt[config.language]} </Text>
                                  <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 21 / 100 }}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                                </View>
                                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.SkillsTxt[config.language]} </Text>
                                  <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 30 / 100 }}>{item.Skills}</Text>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.LevelTxt[config.language]} </Text>
                                  <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 26 / 100 }}>{item.skill_level}</Text>
                                </View>
                                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.PostdateTxt[config.language]}</Text>
                                  <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, textAlign: 'center', width: mobileW * 18 / 100 }}>{moment(new Date(item.DateOfRequest)).format('MMM DD, YYYY')}</Text>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
                                <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                  <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor, }}>{Lang_chg.FeeTxt[config.language]} </Text>
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, }}>{item.charges}</Text>
                                    <Text style={{ fontSize: mobileW * 2.5 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, alignSelf: 'flex-end' }}>{Lang_chg.RsTxt[config.language]}</Text>
                                  </View>
                                </View>
                                <View style={{ width: mobileW * 37 / 100, }}>
                                  {/* <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, alignSelf: 'flex-end' }}>Edit Details </Text> */}
                                </View>
                              </View>

                            </View>

                          </TouchableOpacity>
                          <View style={{ width: mobileW, height: mobileW * 0.3 / 100, backgroundColor: '#E7E8EA' }}></View>
                        </View>)
                    }}
                  />
                </View> :
                  <View style={{ alignItems: "center", justifyContent: "center", marginTop: mobileH * 35 / 100 }}>
                    <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.blackColor, fontFamily: Font.FontMedium }}>{Lang_chg.Nodatafound[config.language]}</Text>
                  </View>

                }
              </View>}

          </View>
        </ScrollView>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Scheduled Button Data +++++++++++++++++++++++++++++++++++++++++++++++ */}
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={Colors.themecolor}
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {shouldShow1 == 'Completed' &&
            <View >

              {completed != "" ? <View >
                <FlatList
                  contentContainerStyle={{ bottom: mobileH * 0.5 / 100, }}
                  showsVerticalScrollIndicator={false}
                  data={completed}
                  renderItem={({ item, index }) => {
                    return (
                      <View >
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequestBasic', { Active: shouldShow1, item: item })} style={{ flexDirection: 'row', marginTop: mobileW * 1.8 / 100, padding: mobileW * 3 / 100, }}>
                          <View style={{ width: mobileW * 18 / 100, }}>
                            <View>
                              <Image resizeMode='contain' style={{ width: mobileW * 16 / 100, height: mobileW * 16 / 100, borderRadius: mobileW * 9 / 100 }}
                                source={require('./Icon/12.jpg')}></Image>
                            </View>
                          </View>
                          <View style={{ width: mobileW * 74 / 100, }}>
                            <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{item.userDetail.FullName != '' ? item.userDetail.FullName : '[Maven]'}</Text>

                            <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                              <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', }}>
                                <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.RequestTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 22 / 100 }}>{item.TypeOfRequest}</Text>
                              </View>
                              <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.StartDateTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 22 / 100 }}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                              <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.EndDateTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 21 / 100 }}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
                              </View>
                              <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.SkillsTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 30 / 100 }}>{item.Skills}</Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                              <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}>{Lang_chg.LevelTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 26 / 100 }}>{item.skill_level}</Text>
                              </View>
                              <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, textAlign: 'center', }}>{Lang_chg.PostdateTxt[config.language]} </Text>
                                <Text style={{ fontSize: mobileW * 2.6 / 100, fontFamily: Font.FontRegular, color: Colors.gray, width: mobileW * 18 / 100, }}>{moment(new Date(item.DateOfRequest)).format('MMM DD, YYYY')}</Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
                              <View style={{ width: mobileW * 37 / 100, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium, color: Colors.themecolor, }}>{Lang_chg.FeeTxt[config.language]} </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, }}>{item.charges}</Text>
                                  <Text style={{ fontSize: mobileW * 2.5 / 100, fontFamily: Font.FontRegular, color: Colors.themecolor, alignSelf: 'flex-end' }}>{Lang_chg.RsTxt[config.language]}</Text>
                                </View>
                              </View>
                              <View style={{ width: mobileW * 37 / 100, }}>
                                <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular, color: item.requestagainreason != 'Student paid fee.' ? Colors.black_color : Colors.green, alignSelf: 'flex-end' }}>{item.requestagainreason}</Text>
                              </View>
                            </View>

                          </View>

                        </TouchableOpacity>
                        <View style={{ width: mobileW, height: mobileW * 0.3 / 100, backgroundColor: '#E7E8EA' }}></View>
                      </View>)
                  }}
                />
              </View> :
                <View style={{ alignItems: "center", justifyContent: "center", marginTop: mobileH * 35 / 100 }}>
                  <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.blackColor, fontFamily: Font.FontMedium }}>{Lang_chg.Nodatafound[config.language]}</Text>
                </View>
              }
            </View>}
        </ScrollView>

        <View>
          <Modal
            animationType='fade'
            transparent={true}
            // {item.id} setItemDeletmodal=
            visible={itemDeletmodal}>
            <View style={styles.modal_commission}>
              <View style={[styles.ModelCard]}>
                <View style={styles.ModelHeader}>
                  <Text style={styles.Alert_text}>{Lang_chg.AlertTxt[config.language]}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setItemDeletmodal(!itemDeletmodal)}>
                    <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>

                <View style={{ width: mobileW * 85 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA', marginBottom: mobileW * 5 / 100, }}></View>
                <Text style={styles.commission_TExt}>{Lang_chg.yousuredeleteTxt[config.language]}</Text>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: mobileW * 3 / 100 }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setItemDeletmodal(!itemDeletmodal)} style={[styles.ok_Button, { backgroundColor: Colors.white_color }]} >
                    <Text style={[styles.OK_TExt, { color: Colors.themecolor }]}>{Lang_chg.NOTxt[config.language]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { handleRemove(), setItemDeletmodal(!itemDeletmodal) }} style={styles.ok_Button}>
                    <Text style={styles.OK_TExt}>{Lang_chg.OkTxt[config.language]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/* </ScrollView> */}

      </SafeAreaView>
    </View>
  )
}



const styles = StyleSheet.create({
  Header: {
    width: mobileW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
  },
  gif_view: {
    justifyContent: 'center',
    flex: 1, alignItems: 'center',
    backgroundColor: '#00000096'
  },
  gif_image: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100
  },
  scrollView: {
    flex: 1,
  },
  HeaderName: {
    color: Colors.blackColor,
    fontFamily: Font.FontSemiBold,
    fontSize: mobileW * 4 / 100,
    marginHorizontal: mobileW * 3 / 100,
  },
  croseImage: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    borderRadius: mobileW * 2 / 100,
    tintColor: Colors.color_orange
  },
  backIcon_edit: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.color_orange,
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
  ModelCard: {
    elevation: 5,
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
  },
  searchView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.gray,
    backgroundColor: Colors.white_color,
    width: mobileW * 92 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: mobileW * 0.3 / 100,
  },
  TextInput: {
    width: mobileW * 82 / 100,
    height: mobileW * 10 / 100,
    fontSize: mobileW * 3.1 / 100,
    borderRadius: mobileW * 2 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    backgroundColor: Colors.white_color,
  },
  modal_commission: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060'
  },
  ModelCard: {
    elevation: 5,
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,
    backgroundColor: Colors.white_color,
  },
  ModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
    width: mobileW * 90 / 100,
    paddingLeft: mobileW * 3 / 100,
    paddingRight: mobileW * 3 / 100,
    height: mobileW * 13 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
  },
  Alert_text: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4.5 / 100,
  },
  commission_TExt: {
    textAlign: 'center',
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 3.5 / 100,
  },
  ok_Button: {
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.themecolor,
    backgroundColor: Colors.themecolor,
    width: mobileW * 22 / 100,
    height: mobileW * 8 / 100,
    borderWidth: mobileW * 0.2 / 100,
    marginTop: mobileW * 2 / 100,
    marginHorizontal: mobileW * 1 / 100,
    borderRadius: mobileW * 2 / 100,
    marginBottom: mobileW * 3 / 100,
  },
  OK_TExt: {
    color: Colors.white_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
})




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old Screen +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// import {  StatusBar, Modal, Alert, ScrollView, TextInput, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { Colors, Font } from './Provider/Colorsfont';
// import { localStorage } from './Provider/localStorageProvider';
// import { config, msgProvider, msgText, consolepro, Lang_chg,   msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';

// import axios from 'axios';
// import moment from 'moment';
// import { SafeAreaView } from 'react-native-safe-area-context'
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// export default function SessionRequest({ navigation }) {
//   const [checked, setChecked] = useState('Active')
//   const [show, setShow] = useState('Add')
//   const [number, onChangeNumber] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const [active, setActived] = useState('');
//   const [scheduled, setScheduled] = useState('');
//   const [completed, setCompleted] = useState('');
//   const [refresh, setrefresh] = useState(false)
//   const [userMode, setuserMode] = useState();
//   const [activeForSearch, setActiveForSearch] = useState([]);
//   const [scheduledForSearch, setScheduleForSearch] = useState([]);
//   const [completedForSearch, setCompletedForSearch] = useState([]);

//   useEffect(() => {
//     CompletedData();
//     ScheduledDATA();
//     ActiveDATA();
//     SetMode();
//   }, [])

//      const SetMode = async (data) => {
//      const value = await localStorage.getItemString('UserMode')
//      console.log("..........", value);
//      setuserMode(value)
//  }

//   const ActiveDATA = () => {
//     axios.post('https://mavenow.com:8001/userrequest/AppliedRequets?userId=848&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NzQ5NTc5Nn0.hp75g4O_N7R7MVkAyeWYiMlfglGAXP5Sl9pGohbPUYY', {
//       "ActiveDate": "2022-12-24 18:29:00",
//       "typeofrequest": 1
//     })
//       .then(function (data) {
//         var GetData = data.data.result
//         setActived(GetData)
//         setActiveForSearch(GetData)
//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });
//   }

//   const ScheduledDATA = () => {
//     axios.post('https://mavenow.com:8001/userrequest/ProcessRequets?userId=848&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NzQ5NTc5Nn0.hp75g4O_N7R7MVkAyeWYiMlfglGAXP5Sl9pGohbPUYY', {
//       "ActiveDate": "2022-12-24 18:29:00",
//       "typeofrequest": 1
//     })
//       .then(function (data) {
//         var GetData = data.data.result
//         setScheduled(GetData)
//         setScheduleForSearch(GetData)
//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });
//   }

//   const CompletedData = () => {
//     axios.post('https://mavenow.com:8001/userrequest/CompleteRequest?userId=848&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NzQ5NTc5Nn0.hp75g4O_N7R7MVkAyeWYiMlfglGAXP5Sl9pGohbPUYY', {
//       "ActiveDate": "2022-12-24 18:29:00",
//       "typeofrequest": 1
//     })
//       .then(function (data) {
//         var GetData = data.data.result
//         setCompleted(GetData)
//         setCompletedForSearch(GetData)
//         console.log('Completed API ========= >', GetData)
//       })
//       .catch(function (error) {
//         console.log('======>', error);
//       });
//   }
//   // -----------------------------------------------------------------
//   const _searchLearner = (textToSearch) => {
//     console.log('textToSearch---------',textToSearch);
//     var textToSearch = textToSearch.toString().toLowerCase();
//     if (checked == 'Active') {
//       var data1 = active
//     } else if (checked == 'Scheduled') {
//       var data1 = scheduled
//     } else if (checked == 'Completed') {
//       var data1 = completed
//     }
//   var data1=completedForSearch
//     if (data1 != 'NA') {
//       console.log('data1', data1);
//       if (data1 != 'NA') {
//         var text_data = textToSearch.trim();
//         let newData = data1.filter(function (item) {
//           var name = item.userDetail.FirstName
//           return (
//             // name.toString().toLowerCase().indexOf(text_data) >- 1
//             name.toString().toLowerCase().indexOf(text_data) >= 0
//           )
//         });
 
//         console.log('newData-------',newData);
//         if (checked == 'Active') {
//           if (newData.length > 0) {
//             setActived(newData)
//           } else if (newData.length <= 0) {
//             setActived('')
//           }
//         } else if (checked == 'Scheduled') {
//           if (newData.length > 0) {
//             setScheduled(newData)
//           } else if (newData.length <= 0) {
//             setScheduled('')
//           }
//         } else if (checked == 'Completed') {
//           if (newData.length > 0) {
//             setCompleted(newData)
//           } else if (newData.length <= 0) {
//             // name.toString().toLowerCase().indexOf(text_data) >= 0
//             setCompleted('')
//           }
//         }
//       }
//     }
//   }


//   // -------------------------- refresh --------------------
//   const _onRefresh = async () => {
//     console.log('_onRefresh', '_onRefresh')
//     setrefresh(true)
//     setTimeout(() => {
//       setrefresh(false)
//     }, 1200);
//   }
//   // -----------------------refresh-------------------

// return (
//         <View style={{ flex: 1, }}>
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
//         {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
//         <View style={styles.Header}>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ marginHorizontal: mobileW * 2 / 100 }}>
//         <Image style={styles.backIcon_top} resizeMode='contain'source={require("./Icon/bk.png")}></Image>
//         </TouchableOpacity>

//         <Text style={{ color: Colors.white_color, fontSize: mobileW * 4.5 / 100 ,marginHorizontal:mobileW*1/100,fontFamily:Font.FontMedium}}>{userMode == 'maven' ? Lang_chg.SessionRequestTxt[config.language] : Lang_chg.LearningRequestTxt[config.language] }</Text>

//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('search')} style={{ marginHorizontal: mobileW * 2 / 100 }} >
//         <Image style={styles.SearchIcon} resizeMode='contain'source={require("./Icon/icon_search.png")}></Image>
//         </TouchableOpacity>
//         <TouchableOpacity activeOpacity={0.8} onPress={() =>{userMode == 'maven' ? navigation.navigate('AddCourse'): navigation.navigate('Chatbots')}} style={{ marginHorizontal: mobileW * 2 / 100 }} >
//         <Image style={styles.plusicon} resizeMode='contain'source={require("./Icon/plus.png")}></Image>
//         </TouchableOpacity>
//         <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={{ marginHorizontal: mobileW * 2 / 100 }}>
//         <Image style={styles.SearchIcon} resizeMode='contain'source={require("./Icon/icon_info.png")}></Image>
//         </TouchableOpacity>
//         </View>
//         </View>

//         {/* =================================================================Model================================================================ */}
//         <View  >
//         <Modal animationType="slide"
//         transparent={true} visible={modalVisible} onRequestClose={() => {
//         setModalVisible(!modalVisible);
//          }}>
//                   <View style={{ flex: 1, backgroundColor: '#00000060' }}>
//                   <View style={styles.Modal}>
//                   <View style={styles.ModalHeader}>
//                   <Text style={styles.HELP_TEXT}></Text>
//                   <Text style={styles.HELP_TEXT}>         Help:Session Request(s)</Text>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{ marginRight: mobileW * 2 / 100 }}>
//                   <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
//                   </TouchableOpacity>
//                   </View>
//                   <ScrollView>
//                   <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

//                   <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3.6/ 100, fontFamily:Font.FontRegular}}>
//                   Lorem Ipsum is simply dummy  text of the printing and typesetting industry.
//                   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley {'\n'}of type and scrambled it to make a type specimen book.
//                   It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
//                   It was popularised in the 1960. {'\n'} with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//                   </Text>
//                   </View>
//                  </ScrollView>
//                  </View>
//                  </View>
//                  </Modal>
//                  </View>

//                {show != 'Add' &&
//               <View style={styles.searchView}>
//               <View style={styles.TextInputView}>
//                <TextInput style={styles.TextInput} onChangeText={(txt) => _searchLearner(txt)}
//                 // value={number}
//                 placeholder={Lang_chg.SearchEngine[config.language]}
//                 placeholderTextColor={Colors.gray} />
//                <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('Add')}>
//                 <Image resizeMode='contain' style={styles.croseImage} source={require('./Icon/close2.png')}></Image>
//                 </TouchableOpacity>
//                 </View>
//                  </View>}
//              <View style={{ padding:mobileW * 2 / 100,}}>
//              <View style={styles.buttonCard}>
//              <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Active')}style={[{ backgroundColor: checked === 'Active' ? Colors.themecolor : Colors.white_color, }, styles.activeButton]}>
//              <Text style={{color: checked === 'Active' ? Colors.white_color : Colors.black_color, fontSize: mobileW * 3.1 / 100,fontFamily:Font.FontSemiBold}}>{Lang_chg.ActiveTxt[config.language]}</Text>
//              </TouchableOpacity >
//              <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Scheduled')} style={[{ backgroundColor: checked === 'Scheduled' ? Colors.themecolor : Colors.white_color, }, styles.activeButton]}>
//              <Text style={{color: checked === 'Scheduled' ? Colors.white_color : Colors.black_color, fontSize: mobileW * 3.1 / 100,fontFamily:Font.FontSemiBold}}>{Lang_chg.ScheduledTxt[config.language]}</Text>
//              </TouchableOpacity>
//              <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Completed')}style={[{ backgroundColor: checked === 'Completed' ? Colors.themecolor : Colors.white_color }, styles.activeButton]}>
//               <Text style={{color: checked === 'Completed' ? Colors.white_color : Colors.black_color, fontSize: mobileW * 3.1 / 100,fontFamily:Font.FontSemiBold }}>{Lang_chg.CompletedTxt[config.language]}</Text>
//             </TouchableOpacity>
//              </View>
//              </View>

//                               <ScrollView
//                               refreshControl={
//                               <RefreshControl
//                                refreshing={refresh}
//                               onRefresh={_onRefresh}
//                               tintColor={Colors.themecolor}
//                               colors={[Colors.themecolor]} /> }>

//                         <View style={{ marginBottom: mobileW * 10 / 100 }}>
                          
//                         {checked == 'Active' &&    
//                         <View>    
//                         {active!=""? <View>                  
//                         <FlatList
//                         data={active}
//                         renderItem={({ item, index }) =>
//                         <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequestBasic', { Active: checked, item: item })}style={styles.flatlistCard}>
//                         <View style={{ flexDirection: 'row' }}>
//                         <View style={{ width: mobileW * 24 / 100, alignItems: 'center', padding: mobileW * 2 / 100, }}>
//                         <View style={styles.imageCard}>
//                         <Image resizeMode='contain' style={styles.mavenImage} source={item.userDetail.profileImage == '' || null ? require("./Icon/icon_maven.png") : { uri: item.userDetail.profileImage }}></Image>
//                         </View>
//                         <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color,fontFamily:Font.FontRegular }}>{item.userDetail.FullName !=''?item.userDetail.FullName:'[Maven]'}</Text>
//                         </View>
//                         <View>
//                         <View style={{ flexDirection:'row', marginTop:mobileW*3/100  }}>
//                         <View style={{width: mobileW * 24 / 100, }} >
//                         <Text style={styles.text_view}>{Lang_chg.RequestTxt[config.language]}</Text>
//                         <Text style={styles.appi_text}>{item.TypeOfRequest}</Text>
//                          </View>
//                         <View style={styles.mainview} >
//                         <Text style={styles.text_view}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                         <Text style={styles.appi_text}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
//                         </View>
//                         <View style={styles.mainview} >
//                         <Text style={styles.text_view}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                         <Text style={styles.appi_text}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
//                         </View>
//                         </View>
//                         <View style={{ flexDirection:'row', marginTop:mobileW*2/100 }}>
//                         <View  style={styles.mainview}>
//                          <Text style={styles.text_view}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                          <Text style={styles.appi_text}>{item.Skills}</Text>
//                          </View>

                       
//                         <View style={styles.mainview} >
//                         <Text style={styles.text_view}>{Lang_chg.LevelTxt[config.language]}</Text>
//                         <Text style={styles.appi_text}>{item.skill_level}</Text>
//                         </View>

//                         <View style={styles.mainview} >
//                         <Text style={styles.text_view}>{Lang_chg.PostdateTxt[config.language]}</Text>
//                         <Text style={styles.appi_text}>{moment(new Date(item.DateOfRequest)).format('MMM DD, YYYY')}</Text>
//                         </View>
//                         </View>

//                          {/* <View style={{width: mobileW * 72 / 100,  marginTop:mobileW*2/100, }} >
//                          <Text style={styles.text_view}>Skills</Text>
//                          <Text style={styles.appi_text}>{item.Skills}</Text>
//                          </View> */}
//                          </View>
                        
              
//                     </View>
//                     <TouchableOpacity activeOpacity={0.8}>
//                     <Text style={{fontSize:mobileW*3.5/100, color:Colors.themecolor, fontFamily:Font.FontRegular, alignSelf:'flex-end', marginRight:mobileW*5/100}}>Edit Details</Text>
//                     </TouchableOpacity>
//                     <View style={styles.flatlistFootar}>
//                     <View style={{ flexDirection: 'row', paddingLeft: mobileW * 3 / 100 }}>
//   <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.white_color,fontFamily:Font.FontMedium}}>{Lang_chg.FeeTxt[config.language]} {item.charges} </Text>
//   <Text style={{ fontSize: mobileW * 2.5 / 100, color: Colors.white_color, alignSelf: 'flex-end', fontFamily:Font.FontRegular }}>{Lang_chg.RsTxt[config.language]}</Text>
//   </View>
//   <TouchableOpacity activeOpacity={0.8}>
//   <Image resizeMode='contain'style={{width:mobileW*6/100, height:mobileW*6/100, tintColor:Colors.white_color,marginRight:mobileW*4/100,}} source={require("./Icon/delete.png")}></Image>
//                       </TouchableOpacity>
//                      {/* <Text style={{ fontSize: mobileW * 2.8 / 100, color: item.requestagainreason != 'Student paid fee.' ? Colors.black_color : Colors.whiteColor, paddingRight: mobileW * 2 / 100,fontFamily:Font.FontMedium }}>{item.requestagainreason}</Text> */}
//                     </View>
//                     </TouchableOpacity>
//                        }  keyExtractor={item => item.id} />
//                           </View>
//                         :
//                         <View style={{alignItems:"center",justifyContent:"center",marginTop:mobileH*35/100}}>
//                         <Text style={{fontSize:mobileW*5/100,color:Colors.blackColor,fontFamily:Font.FontRegular}}>{Lang_chg.Nodatafound[config.language]}</Text>  
//                        </View>
//                         }
//                           </View>
//                        }

//                      {checked == 'Scheduled' &&
//                       <View>    
//                       {scheduled!=""? <View>
//                  <FlatList
//                    // data={DATA}
//                 data={scheduled}
//                 renderItem={({ item, index }) =>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequestBasic', { Active: checked, item: item })} style={styles.flatlistCard}>
//                 <View style={{ flexDirection: 'row' }}>
//                 <View style={{ width: mobileW * 24 / 100, alignItems: 'center', padding: mobileW * 2 / 100 }}>
//                 <View style={styles.imageCard}>
//                 <Image resizeMode='contain' style={styles.mavenImage}source={item.userDetail.profileImage == '' || null ? require("./Icon/icon_maven.png") : { uri: item.userDetail.profileImage }}></Image>
//                 </View>
//                         <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color }}>{item.userDetail.FullName}</Text>
//                         {/* <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color }}>[Maven]</Text> */}

//                            </View>
//                             <View>
//                             <View style={{ flexDirection:'row', marginTop:mobileW*3/100  }}>
//                             <View style={{width: mobileW * 24 / 100, }} >
//                             <Text style={styles.text_view}>{Lang_chg.RequestTxt[config.language]}</Text>
//                             <Text style={styles.appi_text}>{item.TypeOfRequest}</Text>
//                              </View>
//                              <View style={styles.mainview} >
//                              <Text style={styles.text_view}>{Lang_chg.StartDatetTxt[config.language]}</Text>
//                              <Text style={styles.appi_text}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
//                              </View>
//                              <View style={styles.mainview} >
//                              <Text style={styles.text_view}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                              <Text style={styles.appi_text}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
//                              </View>
//                              </View>

//                             <View style={{ flexDirection:'row', marginTop:mobileW*2/100 }}>
//                             <View style={styles.mainview} >
//                             <Text style={styles.text_view}>{Lang_chg.PostdateTxt[config.language]}</Text>
//                             <Text style={styles.appi_text}>{moment(new Date(item.DateOfRequest)).format('MMM DD, YYYY')}</Text>
//                             </View>
//                              <View style={styles.mainview} >
//                             <Text style={styles.text_view}>{Lang_chg.LevelTxt[config.language]}</Text>
//                              <Text style={styles.appi_text}>{item.skill_level}</Text>
//                              </View>
//                              </View>
//                             <View style={{width: mobileW * 72 / 100,  marginTop:mobileW*2/100, }} >
//                             <Text style={styles.text_view}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                             <Text style={styles.appi_text}>{item.Skills}</Text>
//                             </View>
//                             </View>
                  
//                         </View>
//                         <View style={styles.flatlistFootar}>
//                         <View style={{ flexDirection: 'row', paddingLeft: mobileW * 3 / 100, alignItems: 'center' }}>
//                         <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.white_color }}>{Lang_chg.FeeTxt[config.language]} {item.charges}</Text>
//                         <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontFamily:Font.FontRegular}}>{Lang_chg.RsTxt[config.language]}</Text>
//                         </View>
//                        <Text style={{ fontSize: mobileW * 3.5 / 100, color: item.requestagainreason != 'Student paid fee.' ? Colors.black_color : Colors.whiteColor, paddingRight: mobileW * 2 / 100 }}>{item.requestagainreason}</Text>
//                        </View>
//                        </TouchableOpacity>
//                         } keyExtractor={item => item.id} />
//                         </View>
//                         :
//                         <View style={{alignItems:"center",justifyContent:"center",marginTop:mobileH*35/100}}>
//                         <Text style={{fontSize:mobileW*5/100,color:Colors.blackColor,fontFamily:Font.FontRegular}}>{Lang_chg.Nodatafound[config.language]}</Text>  
//                         </View>
//                         }
//                           </View>
//                        }

//              {checked == 'Completed' &&
//               <View>    
//               {completed!=""? <View>  
//               <FlatList
//                 data={completed}
//                 renderItem={({ item, index }) => {
//                   return (
//                             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequestBasic', { Active: checked, item: item })}style={styles.flatlistCard}>
//                             <View style={{ flexDirection: 'row' }}>
//                             <View style={{ width: mobileW * 24 / 100, alignItems: 'center', padding: mobileW * 2 / 100, }}>
//                             <View style={styles.imageCard}>
//                             <Image resizeMode='contain' style={styles.mavenImage} source={item.userDetail.profileImage == '' || null ? require("./Icon/icon_maven.png") : { uri:item.userDetail.profileImage }}></Image>
//                             </View>
//                            <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color,fontFamily:Font.FontRegular }}>{item.userDetail.FullName !=''?item.userDetail.FullName:'[Maven]'}</Text>
//                            </View>
//                             <View>
//                             <View style={{ flexDirection:'row', marginTop:mobileW*3/100}}>
//                             <View style={{width: mobileW *24/ 100,}}>
//                             <Text style={styles.text_view}>{Lang_chg.RequestTxt[config.language]}</Text>
//                             <Text style={styles.appi_text}>{item.TypeOfRequest}</Text>
//                              </View>
//                             <View style={styles.mainview} >
//                             <Text style={styles.text_view}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                             <Text style={styles.appi_text}>{moment(new Date(item.StartDate)).format('MMM DD, YYYY')}</Text>
//                             </View>
//                             <View style={styles.mainview} >
//                             <Text style={styles.text_view}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                             <Text style={styles.appi_text}>{moment(new Date(item.Enddate)).format('MMM DD, YYYY')}</Text>
//                             </View>
//                             </View>
//                              <View style={{ flexDirection:'row', marginTop:mobileW*2/100 }}>
//                              <View  style={styles.mainview}>
//                              <Text style={styles.text_view}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                              <Text style={styles.appi_text}>{item.Skills}</Text>
//                              </View>

                           
//                             <View style={styles.mainview} >
//                             <Text style={styles.text_view}>{Lang_chg.LevelTxt[config.language]}</Text>
//                             <Text style={styles.appi_text}>{item.skill_level}</Text>
//                             </View>

//                             <View style={styles.mainview}>
//                             <Text style={styles.text_view}>{Lang_chg.PostdateTxt[config.language]}</Text>
//                             <Text style={styles.appi_text}>{moment(new Date(item.DateOfRequest)).format('MMM DD, YYYY')}</Text>
//                             </View>
//                             </View>
  
//                              {/* <View style={{width: mobileW * 72 / 100,  marginTop:mobileW*2/100, }} >
//                              <Text style={styles.text_view}>Skills</Text>
//                              <Text style={styles.appi_text}>{item.Skills}</Text>
//                              </View> */}
//                              </View>
                  
//                         </View>
//                         <View style={styles.flatlistFootar}>
//                         <View style={{ flexDirection: 'row', paddingLeft: mobileW * 3 / 100,}}>
//     <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.white_color,fontFamily:Font.FontMedium }}>{Lang_chg.FeeTxt[config.language]} {item.charges} </Text>
//     <Text style={{ fontSize: mobileW * 2.2 / 100, color:Colors.white_color, alignSelf: 'flex-end',fontFamily:Font.FontRegular }}>{Lang_chg.RsTxt[config.language]}</Text>


//                         </View>
//                          <Text style={{ fontSize: mobileW * 3 / 100, color: item.requestagainreason != 'Student paid fee.' ? Colors.black_color : Colors.whiteColor, paddingRight: mobileW * 2 / 100,fontFamily:Font.FontMedium }}>{item.requestagainreason}</Text>
//                         </View>
//                         </TouchableOpacity>) }  }
//                          keyExtractor={item => item.id}/> 
//                           </View>
//                         :
//                         <View style={{alignItems:"center",justifyContent:"center",marginTop:mobileH*35/100}}>
//                         <Text style={{fontSize:mobileW*5/100,color:Colors.blackColor,fontFamily:Font.FontMedium}}>{Lang_chg.Nodatafound[config.language]}</Text>  
//                         </View>
//                         }
//                           </View>
//                        }
//                             </View>

//                            </ScrollView>
//                            </SafeAreaView> 
//                            </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   HELP_TEXT:{ 
//     color: Colors.white_color, 
//     fontSize: mobileW * 4 / 100,
//     fontFamily:Font.FontMedium  
//   },
//   Header: {
//     backgroundColor:Colors.themecolor,
//     width: mobileW, 
//     height: mobileW * 13 / 100,
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'space-between'
//   },
//   text_view:{ 
//     fontSize: mobileW * 3/ 100, 
//     color: Colors.black_color, 
//     fontFamily:Font.FontMedium
//   },
//   backIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   backIcon_top: {
//     width: mobileW * 9.5/ 100,
//     height: mobileW * 9.5 / 100,
//     tintColor: Colors.white_color
//   },
//   mainview:{ 
//     width: mobileW * 24 / 100, 
//   },
//   SearchIcon: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.white_color
//   },
//   plusicon: {
//     width: mobileW * 4.5 / 100,
//     height: mobileW * 4.5 / 100,
//     tintColor: Colors.white_color
//   },
//   appi_text:{ 
//     fontSize: mobileW * 3 / 100, 
//     color:"#777" ,
//     width:mobileW*21/100,
//     marginTop:mobileW*0.3/100,
//     fontFamily:Font.FontRegular
//   },
//   searchView: {
//     width: mobileW,
//     height: mobileW * 12 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.themecolor
//   },
//   TextInputView: {
//     backgroundColor: Colors.white_color,
//     width: mobileW * 95 / 100,
//     flexDirection: 'row',
//     borderRadius: mobileW * 1 / 100,
//     alignItems: 'center'
//   },
//   TextInput: {
//     width: mobileW * 85 / 100,
//     borderRadius: mobileW * 1 / 100,
//     height: mobileW * 10 / 100,
//     fontSize:mobileW*3.3/100,
//     fontFamily:Font.FontMedium,
//     backgroundColor: Colors.white_color,
//     color: Colors.black_color
//   },
//   croseImage: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     borderRadius: mobileW * 2 / 100,
//     tintColor: Colors.themecolor
//   },
//   buttonCard: {
//     flexDirection: 'row',
//     backgroundColor: Colors.white_color,
//     elevation: 5,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   activeButton: {
//     width: mobileW * 32 / 100,
//     height: mobileW * 10 / 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: mobileW * 2 / 100
//   },
//   flatlistCard: {
//     //  width: mobileW * 97 / 100,
//     alignSelf: 'center',
//     marginTop: mobileW * 3 / 100,
//     borderRadius: mobileW * 1.5 / 100,
//     backgroundColor: Colors.white_color,
//     elevation: 5,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//   },
//   imageCard: {
//     width: mobileW * 16 / 100,
//     height: mobileW * 16 / 100,
//     borderRadius: mobileW * 9 / 100,
//     borderWidth: mobileW * 0.6 / 100,
//     borderColor: Colors.themecolor,
//     backgroundColor: Colors.white_color,
//     alignItems: 'center',
//     justifyContent: 'center' 
//   },
//   mavenImage: {
//     width: mobileW * 14 / 100,
//     height: mobileW * 14 / 100,
//     borderRadius: mobileW * 8 / 100,
//     tintColor: Colors.themecolor,
//   },
//   flatlistFootar: {
//     width: mobileW * 96 / 100,
//     height: mobileW * 9 / 100,
//     marginTop: mobileW * 2 / 100,
//     backgroundColor: Colors.themecolor,
//     borderBottomEndRadius: mobileW * 1.5 / 100,
//     borderBottomStartRadius: mobileW * 1.5 / 100,
//     alignSelf: "center",
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // padding: mobileW * 1 / 100,
//     flexDirection: 'row',
//     elevation: 1,
//     shadowColor: '#000',
//     // borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   ModalHeader: {
//     width: mobileW * 90 / 100,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.themecolor
//   },
//   Modal: {
//     width: mobileW * 90 / 100,
//     borderRadius: mobileW * 3 / 100,
//     marginTop: mobileH * 25 / 100,
//     alignSelf: 'center',
//     backgroundColor: Colors.white_color,
//     elevation: 5
//   },
// }
// )















