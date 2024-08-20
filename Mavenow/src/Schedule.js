
import { View, Text, Modal, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ScrollView,RefreshControl } from 'react-native'
import { StatusBar } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { config, msgProvider, msgText, consolepro, Lang_chg,  localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { Colors, Font } from './Provider/Colorsfont'
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import moment from 'moment'
import CalendarPicker from 'react-native-calendar-picker';
 import { addDays } from 'date-fns';
 import { color } from 'react-native-reanimated'
import dots from 'react-native-view-slider/dots'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { tr } from 'date-fns/locale'
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';


 const Session = [
  {
    id: 1,
    image: require('./Icon/icon_maven.png'),
    name:'dixit',
    title:'Automation testing (Basic)',
    startdate:'Jan 13, 2023',
    enddate:'Jan 13, 2023',
    time: '30 min',
    isEnabled: false
  },
  {
    id: 2,
    image: require('./Icon/icon_maven.png'),
    name:'dixit',
    title:'Automation testing (Basic)',
    startdate:'Jan 13, 2023',
    enddate:'Jan 13, 2023',
    time:'30 min',
    isEnabled: false
  },

]
const Schedule = ({ navigation }) => {
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_Gif, setModalVisible_Gif] = useState(false);
  const [userMode, setuserMode] = useState('');
// ---------- Calenders -------------------------------------------
  const [selected, setSelected] = useState('');


  // ================ refresh controller 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  // ================ refresh controller 


  console.log("date here",selectedStartDate);
  const [ markedDates, setMarkedDates ] = useState({});

  useEffect(() => {
    SetMode();
}, [])

   const SetMode = async (data) => { 
   const value = await localStorage.getItemString('UserMode')
    console.log("..........", value);
    setuserMode(value)
 }

  const markDate = (dateString) => {
      setMarkedDates(
          (markedDates[dateString] = {
              endingDay: true,
              color: 'blue'
          })
      );
  };
  const onDateChange = (date, type) => {
    // setModalVisible_Gif(true)
    setTimeout(() => {
      setModalVisible_Gif(false)
    }, 2000);

    let newDate = moment(date).format('DD-MM-YYYY')
    console.log('.................', newDate);

   //function to handle the date change
    setSelectedEndDate(newDate);
    console.log(newDate,"=============> newDate <===========");
    setSelectedStartDate(newDate);
    console.log(newDate,"............................... newDate ..........................");

  };
  const nextDays = [
    '2023-05-01',
    '2023-05-05',
    '2023-05-08',
    '2023-05-07',
    '2023-05-18',
    '2023-05-17',
    '2023-05-28',
    '2023-05-29'
  ];

  let newDaysObject = {};

  nextDays.forEach((day) => {
    newDaysObject = {
      ...newDaysObject,
      [day]: {
        selected: true,
        marked: true
      }
    };
  });


const school = {key:'school', color: 'orange', selectedDotColor: 'red'};
const canteen = {key:'canteen', color: 'green', selectedDotColor: 'green'};
const rooms = {key:'rooms', color: 'orange'};


  // console.log(selectedEndDate,"---------------------------?>selectedEndDate");
  return (
    <View style={{ flex: 1, }}>
    <SafeAreaView style={styles.SafeAreaView}>
    <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
 

      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Header +++++++++++++++++++++++++++++++++++++++++++++++ */}

        <View style={styles.Header}>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
        </TouchableOpacity>
           
         </View>
         <Text style={styles.HeaderName}>          {Lang_chg.MyScheduleTxt[config.language]}</Text>
         <View style={{ flexDirection: "row", alignItems: 'center' }}>
        
           <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 3.2 / 100 }} onPress={() => navigation.navigate('SessionRequest')}>
             <Image style={{width:mobileW*5/100, height:mobileW*5/100, tintColor:'black',  }} resizeMode="stretch" source={require("./Icon/plus.png")}></Image>
           </TouchableOpacity>
           <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 1 / 100 }} onPress={() => setModalVisible(true)} >
             <Image style={{width:mobileW*5/100, height:mobileW*5/100, tintColor:'black',  }} resizeMode="stretch" source={require("./Icon/about.png")}></Image>
           </TouchableOpacity>
         </View>
       </View>

        {/* --------------------------------------------- Calander APPLY --------------------------------------------- */}

        <ScrollView
       refreshControl={
         <RefreshControl 
         // tintColor={Colors.themecolor}
         colors={[Colors.themecolor]}
         refreshing={refreshing} onRefresh={onRefresh} />
       }>
        <View style={styles.calender_view}>
           
          <CalendarPicker
            startFromMonday={true}
            minDate={new Date(1850, 1, 1)}
            maxDate={new Date(2050, 6, 3)}
            weekdays={
              ['Sun', 'Mon', 'Tue', 'Wed', 'Th', 'Fr', 'Sa',]}
            months={['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]}
            previousComponent={<View style={styles.background}>
                    <Image style={styles.next_icon} resizeMode="contain" source={require("./Icon/icon_back.png")}/>
                    </View>
                }
            nextComponent={ <View style={styles.background}>   
               <Image style={styles.Privious_icon} resizeMode='contain' source={require("./Icon/icons8-more-than-50.png")}></Image>
               </View>
                    }
            selectedDayColor="#00959e"
             selectedDisabledDatesTextStyle="purple"
            DateChangedCallback={'green'}
            customDatesStyles={[<View style={{width:20,height:20,borderRadius:mobileW*10/100,backgroundColor:"blue"}}></View>]}
            // markedDates={nextDays}
            markedDates={{"1850, 1, 1": { selectedEndDate: true, marked: true, selectedColor: "orange" },"2050, 6, 3": { selectedStartDate: true, marked: true, selectedColor: "red" }, }}
            
           
            onDayPress={({ dateString }) => markDate(dateString)}
            allowBackwardRangeSelect="true"
            dayLabelsWrapper={{color: "pink"}}
            scaleFactor={355} 
            dayShape= "circle"
            todayBackgroundColor={'lightgray'}
             //dayLabelsWrapper={{ color: "pink" }}
            //scaleFactor={375}
            selectedDayTextColor={'white'}
           // dayShape= 'oval' 
           // todayBackgroundColor={'lightgray'}

         
             textStyle={{
             fontFamily: 'Cochin',
             color: '#000000' ,
            //  color:selectedEndDate==='Sun'?'red':'green'
            onDateChange:selectedStartDate==='Sun'?'red':'green'}}
            onDateChange={onDateChange}/>
           </View>

        {/* ----------------------------------------------------- Calander APPLY -------------------------------------------------------- */}
           
            <TouchableOpacity activeOpacity={0.8} >
            <Text style={styles.text_session}>{Lang_chg.SessionTxt[config.language]}</Text>
            </TouchableOpacity>
   
 
{userMode=='maven'?
          <View>
          <Image resizeMode='contain' style={{width:mobileW*90/100, height:mobileH*50/100,  alignSelf:'center'}} 
          source={require('./Icon/mission_graphi.png')}></Image>
          </View>

:
        <FlatList
          data={Session}
          renderItem={({ item, index }) => {
            return (
         <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AutomationTesting')}>
         <View style={{width:mobileW*92/100, marginLeft:mobileW*4/100, marginRight:mobileW*4/100, marginTop:mobileW*2/100, flexDirection:'row'}}>
          <View style={{ width:mobileW*18/100}}>
          <View>
              <Image resizeMode ='contain' style={{width:mobileW*16/100, height:mobileW*16/100, borderRadius:mobileW*9/100}}
              source={require('./Icon/12.jpg')}></Image>
            </View>
          </View>
          <View style={{width:mobileW*74/100}}>
            <View>
              <Text style={{fontSize:mobileW*3.5/100, color:Colors.black_color, fontFamily:Font.FontMedium}}>{item.name}</Text>
            <Text style={{fontSize:mobileW*3/100, marginTop:mobileW*-1/100, color:Colors.gray, fontFamily:Font.FontRegular}}>{item.title}</Text>
            </View>
            <View style={{flexDirection:'row', marginTop:mobileW*2/100}}>
<View style={{width:mobileW*37/100, }}>
  <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:mobileW*2.6/100, color:Colors.black_color, fontFamily:Font.FontRegular}}>{Lang_chg.StartDateTxt[config.language]}: </Text>
      <Text style={{fontSize:mobileW*2.6/100,width:mobileW*19/100, color:Colors.gray, fontFamily:Font.FontRegular}}>{item.startdate}</Text>
    </View>

  </View>
  <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:mobileW*2.6/100, color:Colors.black_color, fontFamily:Font.FontRegular}}>{Lang_chg.EndDateTxt[config.language]}: </Text>
      <Text style={{fontSize:mobileW*2.6/100,width:mobileW*19/100, color:Colors.gray, fontFamily:Font.FontRegular}}>{item.enddate}</Text>
    </View>
</View>
<View style={{flexDirection:'row', marginTop:mobileW*1/100}}>
<View style={{width:mobileW*37/100, }}>
  <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:mobileW*2.6/100, color:Colors.black_color, fontFamily:Font.FontRegular}}>{Lang_chg.SessionDurationTxt[config.language]} </Text>
      <Text style={{fontSize:mobileW*2.6/100,width:mobileW*19/100, color:Colors.gray, fontFamily:Font.FontRegular}}>{item.time}</Text>
    </View>

  </View>

</View>
          </View>
         </View>
         <View style={{width:mobileW, height:mobileW*0.2/100, marginTop:mobileW*2/100, backgroundColor:'#E7E8EA',}}></View>
         </TouchableOpacity>
            )
          }
          }
        />
        }
                                                 {/* -------------- HEADER MODAL --------- */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
           > 
            <View style={styles.view}>
              <View style={styles.ModelCard}>
                <View style={styles.ModelHeader}>
                  <Text style={styles.Help_Text}>Help : Maven Calendar</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}>
                    <Image style={styles.backIcon_close} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{width:mobileW*90/100, height:mobileW*0.2/100, backgroundColor:'#E7E8EA'}}></View>
                <ScrollView>
                  <View style={styles.header_modalview}>
                    <Text style={styles.Header_text}>
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

        {/* -------------------------------------  gif modal */}
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_Gif}
            onRequestClose={() => {
              setModalVisible_Gif(!modalVisible_Gif);
            }} >
            <View style={styles.GIF_modal}>
              <Image style={styles.GIF_Images} source={require("./Icon/neighcoach_loader.gif")}></Image>
            </View>
          </Modal>
        </View>
        {/* -------------------------------------  gif modal */}
</ScrollView>
      </SafeAreaView>
    </View>

  );
};
export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: mobileW * 5 / 100,
    backgroundColor: Colors.light_cyan,
    padding: mobileW * 10 / 100,
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW, 
    height: mobileW * 15 / 100,
    paddingLeft:mobileW*4/100, 
    paddingRight:mobileW*4/100,
    // padding:mobileW*4/100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon:{
    width:mobileW*6/100,
    height:mobileW*6/100
  },
  backIcon_close:{
    width:mobileW*6/100,
    height:mobileW*6/100,
    tintColor:Colors.color_orange
  },
  HeaderName: {
    color: Colors.blackColor,
    fontSize: mobileW * 4/ 100,
    marginHorizontal: mobileW * 3 / 100,
    fontFamily: Font.FontSemiBold
  },
  top_view: {
    flexDirection: 'row',
    backgroundColor:'red'
  },
  background:{

      borderColor: "#E7E8EA",
      borderWidth:mobileW*0.2/100,
      width:mobileW*9/100,
      height:mobileW*9/100,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:mobileW*3/100
    

  },

  IMAge_view: {
    width: mobileW * 19 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'green'
  },
  imageView: {
    width: mobileW * 16 / 100,
    height: mobileW * 16 / 100,
    backgroundColor: Colors.DashBosrdView,
    borderRadius: mobileW * 8 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
 End_Date: {
    fontSize: mobileW * 3.2 / 100,
    color: Colors.black_color,
    fontFamily:Font.FontMedium
  },
  title_sessionduration: {
    fontSize: mobileW * 3.2 / 100,
    color: Colors.themecolor,
    fontFamily:Font.FontMedium
  },
  HEADER_VIEW: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  calender_view: {
    backgroundColor: Colors.white_color,
    marginTop: mobileW * 3 / 100,
    alignItems:'center',
    justifyContent:"center"
  },
  title_api: {
    fontSize: mobileW * 3.4/ 100,
    color: Colors.blackColor,
    fontFamily:Font.FontSemiBold
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white_color
  },

  session_view: {
    margin: mobileW * 2 / 100,
    marginTop: mobileW * 2 / 100
  },
  text_session: {
    color: Colors.black_color,
    fontSize: mobileW * 4 / 100,
    marginTop:mobileW*2/100, 
    marginLeft:mobileW*4/100,
    marginRight:mobileW*4/100,
    fontFamily:Font.FontMedium,
  },
  selecteddate: {
    color: Colors.gray,
    fontSize: mobileW * 4 / 100,
  },
  dianamic_image: {
    width: mobileW * 8 / 100,
    height: mobileW * 8 / 100,
    borderRadius: mobileW * 2 / 100,
    tintColor: Colors.black_color
  },

  MySchedule_txt: {
    color: Colors.white_color,
    fontSize: mobileW * 4.6 / 100,
    marginHorizontal:mobileW*3/100,
    fontFamily:Font.FontMedium
  },
  date_manageView: {
    width: mobileW * 25 / 100,
    // backgroundColor:"red",
    padding:mobileW*1/100
  },
  view: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center'
  },
  header_modalview: {
    alignItems: 'center',
    padding: mobileW * 3 / 100
  },
  Header_text: {
    color: Colors.dark_gray,
    fontSize: mobileW * 3.5 / 100,
    fontFamily:Font.FontRegular
  },
  GIF_modal: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center'
  },
  GIF_Images: {
    width: mobileW * 25 / 100,
    height: mobileW * 12 / 100,
    alignSelf: "center"
  },
  Session_text: {
    fontSize: mobileW * 3.2 / 100,
    color: Colors.black_color,
    width: mobileW * 23 / 100,
    fontFamily:Font.FontMedium

  },
  next_icon: {
    width: mobileW * 4/100,
    height: mobileW * 4/100,
    tintColor: Colors.blackColor,
    // backgroundColor:"red",
  
  },
  Privious_icon: {
    width: mobileW * 6 / 100,
    height: mobileW * 8 / 100,
    tintColor: Colors.blackColor
  },
  textStyle: {
    marginTop: 10,
  },
 
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.blackColor,
    marginHorizontal: mobileW * 2 / 100
  },
  ModelCard: {
    width: mobileW * 90 / 100,
    borderRadius: mobileW * 3 / 100,

    alignSelf: 'center',
    backgroundColor: Colors.white_color,
    elevation: 5
  },
  ModelHeader: {
    width: mobileW * 90 / 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    borderTopLeftRadius: mobileW * 2 / 100,
    borderTopRightRadius: mobileW * 2 / 100,
    paddingLeft:mobileW*3/100,
    paddingRight:mobileW*3/100,
    backgroundColor: Colors.white_color,
  },
  // sessionBtn: {
  //   width: mobileW * 96 / 100,
  //   height: mobileW * 10 / 100,
  //   justifyContent: 'center',
  //   backgroundColor: Colors.themecolor,
  //   borderRadius: mobileW * 2 / 100,
  // },
  listCard: {
    backgroundColor: Colors.blue,
    elevation: 2,
    flexDirection: 'row',
    padding: mobileW * 1.5 / 100,
    marginTop: mobileW * 2 / 100,
    width: mobileW * 96 / 100,
    borderRadius: mobileW * 2 / 100,
    alignSelf: 'center',
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },

  orangeDot: {
    width: mobileW * 2.5 / 100,
    height: mobileW * 2.5 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.color_orange,
    alignSelf: 'flex-end',
    marginRight: mobileW * 2 / 100
  },
  SearchIcon: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
    tintColor: Colors.white_color
  },
  Start_date: { 
    fontSize: mobileW * 3.2 / 100,
     color: Colors.black_color ,
     fontFamily:Font.FontMedium
    },
  dynamic_date: {
    fontSize: mobileW * 3.2/ 100, 
    color: Colors.gray,
    fontFamily:Font.FontRegular,
   },
  Help_Text: {
     color: Colors.black_color, 
    fontSize: mobileW * 4 / 100,
     fontFamily:Font.FontMedium
    },
 });






























// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old Schedule Screen ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { View, Text, Modal, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ScrollView, } from 'react-native'
// import { StatusBar } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { config, msgProvider, msgText, consolepro, Lang_chg,  localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import { Colors, Font } from './Provider/Colorsfont'
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import moment from 'moment'
// import CalendarPicker from 'react-native-calendar-picker';
//  import { addDays } from 'date-fns';
//  import { color } from 'react-native-reanimated'
// import dots from 'react-native-view-slider/dots'
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import { tr } from 'date-fns/locale'
// import { red100 } from 'react-native-paper/lib/typescript/styles/colors';


//  const Session = [
//   {
//     id: 1,
//     image: require('./Icon/icon_maven.png'),
//     name: 'dixit',
//     title: 'Automation testing basic by kumar',
//     startdate: 'Jan 13, 2023 01:05 PM',
//     enddate: 'Jan 13, 2023 01:35 PM',
//     time: '30 min',
//     isEnabled: false
//   },
//   {
//     id: 2,
//     image: require('./Icon/icon_maven.png'),
//     name: 'dixit',
//     title: 'Automation testing basic by kumar',
//     startdate: 'Jan 13, 2023 01:05 PM',
//     enddate: 'Jan 13, 2023 01:35 PM',
//     time: '30 min',
//     isEnabled: false
//   },

// ]
// const Schedule = ({ navigation }) => {
//   const [selectedStartDate, setSelectedStartDate] = useState('')
//   const [selectedEndDate, setSelectedEndDate] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisible_Gif, setModalVisible_Gif] = useState(false);
//   const [userMode, setuserMode] = useState('');
// // ---------- Calenders -------------------------------------------
//   const [selected, setSelected] = useState('');


//   console.log("date here",selectedStartDate);
//   const [ markedDates, setMarkedDates ] = useState({});

//   useEffect(() => {
//     SetMode();
// }, [])

//    const SetMode = async (data) => { 
//    const value = await localStorage.getItemString('UserMode')
//     console.log("..........", value);
//     setuserMode(value)
//  }

//   const markDate = (dateString) => {
//       setMarkedDates(
//           (markedDates[dateString] = {
//               endingDay: true,
//               color: 'blue'
//           })
//       );
//   };
//   const onDateChange = (date, type) => {
//     // setModalVisible_Gif(true)
//     setTimeout(() => {
//       setModalVisible_Gif(false)
//     }, 2000);

//     let newDate = moment(date).format('DD-MM-YYYY')
//     console.log('.................', newDate);

//    //function to handle the date change
//     setSelectedEndDate(newDate);
//     console.log(newDate,"=============> newDate <===========");
//     setSelectedStartDate(newDate);
//     console.log(newDate,"............................... newDate ..........................");

//   };
//   const nextDays = [
//     '2023-05-01',
//     '2023-05-05',
//     '2023-05-08',
//     '2023-05-07',
//     '2023-05-18',
//     '2023-05-17',
//     '2023-05-28',
//     '2023-05-29'
//   ];

//   let newDaysObject = {};

//   nextDays.forEach((day) => {
//     newDaysObject = {
//       ...newDaysObject,
//       [day]: {
//         selected: true,
//         marked: true
//       }
//     };
//   });


// const school = {key:'school', color: 'orange', selectedDotColor: 'red'};
// const canteen = {key:'canteen', color: 'green', selectedDotColor: 'green'};
// const rooms = {key:'rooms', color: 'orange'};


//   // console.log(selectedEndDate,"---------------------------?>selectedEndDate");
//   return (
//     <View style={{ flex: 1, }}>
//       <SafeAreaView style={styles.SafeAreaView}>
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
//  {/* ----------------- HEADER--------------- */}
//      <View style={styles.Header}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ marginHorizontal: mobileW * 2/ 100 }}>
//               <Image style={styles.backIcon_top} resizeMode='contain'source={require("./Icon/bk.png")}></Image>
//             </TouchableOpacity>
//             <Text style={styles.MySchedule_txt}>{Lang_chg.MyScheduleTxt[config.language]}</Text>
//           </View>
//           <View style={styles.HEADER_VIEW}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SessionRequest')} style={{ marginRight: mobileW * 3 / 100 }}>
//               <Image style={styles.plusicon} resizeMode='contain'
//                 source={require("./Icon/plus.png")}></Image>
//             </TouchableOpacity>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={{ marginRight: mobileW * 2 / 100 }}>
//               <Image style={styles.SearchIcon} resizeMode='contain'
//                 source={require("./Icon/icon_info.png")}></Image>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* --------------------------------------------- Calander APPLY --------------------------------------------- */}


//         <View style={styles.calender_view}>
//            {/* <Calendar
//            markedDates={{        
//           //  '2023-05-20': {dots: [school, canteen, rooms], selected: true, selectedColor:Colors.themecolor},
//            '2023-06-20': {dots: [school,], selected: true, selectedColor:Colors.themecolor},
//            '2023-06-26': {dots: [canteen, rooms], disabled: true}
//              }}
//              previousComponent={<Image style={styles.next_icon} resizeMode="contain" source={require("./Icon/icon_back.png")}></Image>}
//              nextComponent={<Image style={styles.Privious_icon} resizeMode='contain' source={require("./Icon/icons8-more-than-50.png")}></Image>}
//  onDayPress={day => {console.log('day------>>',day.dateString)
//   // setSelected(day.dateString);
//   }}
  
//   selectedDayBackgroundColor ={Colors.red}
//   disableMonthChange={false}
//   style={{backgroundColor:Colors.whiteColor,width:mobileW,height:mobileH*40/100}}
//   markingType={'multi-dot'}/> */}

//           <CalendarPicker
//             startFromMonday={true}
//             minDate={new Date(1850, 1, 1)}
//             maxDate={new Date(2050, 6, 3)}
//             weekdays={
//               ['Sun', 'Mon', 'Tue', 'Wed', 'Th', 'Fr', 'Sa',]}
//             months={['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]}
//             previousComponent={<Image style={styles.next_icon} resizeMode="contain" source={require("./Icon/icon_back.png")}></Image>}
//             nextComponent={<Image style={styles.Privious_icon} resizeMode='contain' source={require("./Icon/icons8-more-than-50.png")}></Image>}
//             selectedDayColor="#00959e"
//              selectedDisabledDatesTextStyle="purple"
//             DateChangedCallback={'green'}
//             customDatesStyles={[<View style={{width:20,height:20,borderRadius:mobileW*10/100,backgroundColor:"blue"}}></View>]}
//             // markedDates={nextDays}
//             markedDates={{"1850, 1, 1": { selectedEndDate: true, marked: true, selectedColor: "orange" },"2050, 6, 3": { selectedStartDate: true, marked: true, selectedColor: "red" }, }}
            
           
//             onDayPress={({ dateString }) => markDate(dateString)}
//             allowBackwardRangeSelect="true"
//             dayLabelsWrapper={{color: "pink"}}
//             scaleFactor={355} 
//             dayShape= "circle"
//             todayBackgroundColor={'lightgray'}
//              //dayLabelsWrapper={{ color: "pink" }}
//             //scaleFactor={375}
//             selectedDayTextColor={'white'}
//            // dayShape= 'oval' 
//            // todayBackgroundColor={'lightgray'}

         
//              textStyle={{
//              fontFamily: 'Cochin',
//              color: '#000000' ,
//             //  color:selectedEndDate==='Sun'?'red':'green'
//             onDateChange:selectedStartDate==='Sun'?'red':'green'}}
//             onDateChange={onDateChange}/>
//            </View>

//         {/* ----------------------------------------------------- Calander APPLY -------------------------------------------------------- */}
//             <View style={styles.session_view}>
//             <TouchableOpacity activeOpacity={0.8} style={styles.sessionBtn}>
//             <Text style={styles.text_session}>{Lang_chg.SessionTxt[config.language]}</Text>
//             </TouchableOpacity>
//         </View>
 
// {userMode=='maven'?
//         <View>
//           <Image resizeMode='contain' style={{width:mobileW*90/100, height:mobileH*50/100,  alignSelf:'center'}} 
//           source={require('./Icon/mission_graphi.png')}></Image>
//         </View>

// :
//         <FlatList
//           data={Session}
//           renderItem={({ item, index }) => {
//             return (
//               <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AutomationTesting')} style={styles.listCard}>
//                 <View style={styles.top_view}>
//                   <View style={styles.IMAge_view}>
//                     <View style={styles.imageView}>
//                       <Image style={styles.dianamic_image} source={item.image}></Image>
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ width: mobileW * 75 / 100 }}>
//                       <View style={styles.orangeDot}></View>
//                       <Text style={styles.title_api}>{item.title}</Text>
//                     </View>
//                     <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
//                     <View style={styles.date_manageView}>
//                     <Text style={styles.Start_date}>{Lang_chg.StartDateTxt[config.language]}</Text>
//                     <Text style={styles.dynamic_date}>{item.startdate}</Text>
//                     </View>
//                     <View style={styles.date_manageView}>
//                     <Text style={styles.End_Date}>{Lang_chg.EndDateTxt[config.language]}</Text>
//                     <Text style={styles.dynamic_date}>{item.enddate}</Text>
//                       </View>
//                       <View style={styles.date_manageView}>
//                         <Text style={styles.Session_text}>{Lang_chg.SessionDurationTxt[config.language]}</Text>
//                         <Text style={styles.title_sessionduration}>{item.time}</Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )
//           }
//           }
//         />
//         }
//                                                  {/* -------------- HEADER MODAL --------- */}
//         <View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               Alert.alert("Modal has been closed.");
//               setModalVisible(!modalVisible);
//             }} >
//             <View style={styles.view}>
//               <View style={styles.ModelCard}>
//                 <View style={styles.ModelHeader}>
//                   <Text style={styles.Help_Text}></Text>
//                   <Text style={styles.Help_Text}>Help : Maven Calendar</Text>
//                   <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{ marginRight: mobileW * 2 / 100 }} >
//                     <Image style={styles.backIcon} resizeMode='contain'
//                       source={require("./Icon/close2.png")}></Image>
//                   </TouchableOpacity>
//                 </View>
//                 <ScrollView>
//                   <View style={styles.header_modalview}>
//                     <Text style={styles.Header_text}>
//                       Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//                       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//                       when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                       It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
//                       It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
//                       and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

//                     </Text>
//                   </View>
//                 </ScrollView>
//               </View>
//             </View>
//           </Modal>
//         </View>

//         {/* -------------------------------------  gif modal */}
//         <View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible_Gif}
//             onRequestClose={() => {
//               setModalVisible_Gif(!modalVisible_Gif);
//             }} >
//             <View style={styles.GIF_modal}>
//               <Image style={styles.GIF_Images} source={require("./Icon/neighcoach_loader.gif")}></Image>
//             </View>
//           </Modal>
//         </View>
//         {/* -------------------------------------  gif modal */}

//       </SafeAreaView>
//     </View>

//   );
// };
// export default Schedule;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: mobileW * 5 / 100,
//     backgroundColor: Colors.light_cyan,
//     padding: mobileW * 10 / 100,
//   },
//   End_Date: {
//     fontSize: mobileW * 3.2 / 100,
//     color: Colors.black_color,
//     fontFamily:Font.FontMedium
//   },
//   title_sessionduration: {
//     fontSize: mobileW * 3.2 / 100,
//     color: Colors.themecolor,
//     fontFamily:Font.FontMedium
//   },
//   HEADER_VIEW: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },

//   calender_view: {
//     backgroundColor: Colors.light_cyan,
//     marginTop: mobileW * 3 / 100,
//     alignItems:'center',
//     justifyContent:"center"
//   },
//   title_api: {
//     fontSize: mobileW * 3.4/ 100,
//     color: Colors.blackColor,
//     fontFamily:Font.FontSemiBold
//   },
//   SafeAreaView: {
//     flex: 1,
//     backgroundColor: Colors.white_color
//   },
//   IMAge_view: {
//     width: mobileW * 19 / 100,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   session_view: {
//     margin: mobileW * 2 / 100,
//     marginTop: mobileW * 2 / 100
//   },
//   text_session: {
//     color: Colors.white_color,
//     fontSize: mobileW * 4 / 100,
//     fontFamily:Font.FontMedium
//   },
//   selecteddate: {
//     color: Colors.gray,
//     fontSize: mobileW * 4 / 100,
 
//   },
//   dianamic_image: {
//     width: mobileW * 8 / 100,
//     height: mobileW * 8 / 100,
//     borderRadius: mobileW * 2 / 100,
//     tintColor: Colors.black_color
//   },
//   top_view: {
//     flexDirection: 'row',
//   },
//   MySchedule_txt: {
//     color: Colors.white_color,
//     fontSize: mobileW * 4.6 / 100,
//     marginHorizontal:mobileW*3/100,
//     fontFamily:Font.FontMedium
//   },
//   date_manageView: {
//     width: mobileW * 25 / 100,
//     // backgroundColor:"red",
//     padding:mobileW*1/100
//   },
//   view: {
//     flex: 1,
//     backgroundColor: '#00000060',
//     justifyContent: 'center'
//   },
//   header_modalview: {
//     alignItems: 'center',
//     padding: mobileW * 3 / 100
//   },
//   Header_text: {
//     color: Colors.dark_gray,
//     fontSize: mobileW * 3.5 / 100,
//     fontFamily:Font.FontRegular
//   },
//   GIF_modal: {
//     flex: 1,
//     backgroundColor: '#00000060',
//     justifyContent: 'center'
//   },
//   GIF_Images: {
//     width: mobileW * 25 / 100,
//     height: mobileW * 12 / 100,
//     alignSelf: "center"
//   },
//   Session_text: {
//     fontSize: mobileW * 3.2 / 100,
//     color: Colors.black_color,
//     width: mobileW * 23 / 100,
//     fontFamily:Font.FontMedium

//   },
//   next_icon: {
//     width: mobileW * 4 / 100,
//     height: mobileW * 4 / 100,
//     tintColor: Colors.blackColor
//   },
//   Privious_icon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 8 / 100,
//     tintColor: Colors.blackColor
//   },
//   textStyle: {
//     marginTop: 10,
//   },
//   titleStyle: {
//     textAlign: 'center',
//     fontSize: 30,
//     margin: 20,
//   },
//   Header: {
//     backgroundColor: Colors.themecolor,
//     width: mobileW, height: mobileW * 13 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   backIcon: {
//     width: mobileW * 8 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.white_color
//   },
//   backIcon_top: {
//     width: mobileW * 9.5/ 100,
//     height: mobileW * 9.5/ 100,
//     tintColor: Colors.white_color
//   },
//   plusicon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.white_color
//   },
//   SearchIcon: {
//     width: mobileW * 6 / 100,
//     height: mobileW * 6 / 100,
//     tintColor: Colors.blackColor,
//     marginHorizontal: mobileW * 2 / 100
//   },
//   ModelCard: {
//     width: mobileW * 90 / 100,
//     borderRadius: mobileW * 3 / 100,

//     alignSelf: 'center',
//     backgroundColor: Colors.white_color,
//     elevation: 5
//   },
//   ModelHeader: {
//     width: mobileW * 90 / 100,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: mobileW * 12 / 100,
//     borderTopLeftRadius: mobileW * 2 / 100,
//     borderTopRightRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.themecolor,
//   },
//   sessionBtn: {
//     width: mobileW * 96 / 100,
//     height: mobileW * 10 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.themecolor,
//     borderRadius: mobileW * 2 / 100,
//   },
//   listCard: {
//     backgroundColor: Colors.white_color,
//     elevation: 2,
//     flexDirection: 'row',
//     padding: mobileW * 1.5 / 100,
//     marginTop: mobileW * 2 / 100,
//     width: mobileW * 96 / 100,
//     borderRadius: mobileW * 2 / 100,
//     alignSelf: 'center',
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//   },
//   imageView: {
//     width: mobileW * 16 / 100,
//     height: mobileW * 16 / 100,
//     backgroundColor: Colors.DashBosrdView,
//     borderRadius: mobileW * 8 / 100,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   orangeDot: {
//     width: mobileW * 2.5 / 100,
//     height: mobileW * 2.5 / 100,
//     borderRadius: mobileW * 2 / 100,
//     backgroundColor: Colors.color_orange,
//     alignSelf: 'flex-end',
//     marginRight: mobileW * 2 / 100
//   },
//   SearchIcon: {
//     width: mobileW * 5 / 100,
//     height: mobileW * 5 / 100,
//     tintColor: Colors.white_color
//   },
//   Start_date: { 
//     fontSize: mobileW * 3.2 / 100,
//      color: Colors.black_color ,
//      fontFamily:Font.FontMedium
//     },
//   dynamic_date: {
//     fontSize: mobileW * 3.2/ 100, 
//     color: Colors.gray,
//     fontFamily:Font.FontRegular,
//    },
//   Help_Text: {
//      color: Colors.white_color, 
//     fontSize: mobileW * 4 / 100,
//      fontFamily:Font.FontMedium
//     },
//  });




