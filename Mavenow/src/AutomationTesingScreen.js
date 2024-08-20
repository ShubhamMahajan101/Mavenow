
import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image, } from 'react-native'
import React, { useState } from 'react'
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';

import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
    {
        id: 1,
        image: require("./Icon/icon_student.png"),
        name: 'Shubham',
        status: 'UnPaid',
    },
   
]

export default function AutomationTesingScreen({ navigation, route }) {
    const data_routeparam = route.params.item
    console.log("data here= === ==== = == ===>",data_routeparam);

    const [firstname, setFirstname] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [mydate, setDate] = useState(new Date());                                    //Dite & Time Picker
    const [displaymode, setMode] = useState('time', 'date');
    const [mynewdate, setnewDate] = useState();
    const [isDisplayDate, setShow] = useState(false);
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        
        setDate(currentDate);
        setnewDate(currentDate);
        setShow(false)
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const displayDatepicker = () => {
        showMode('date');
    };
    const displayTimepicker = () => {
        showMode('time');
    };
    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
                {/* <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} /> */}
                {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
              
                <View style={styles.Header}>
                        <TouchableOpacity activeOpacity={0.8}  onPress={() => navigation.goBack()}>
                            <Image style={styles.backIcon} resizeMode='contain'
                                source={require("./Icon/back(1).png")}></Image>
                        </TouchableOpacity>
                        <View style={{ width: mobileW * 60 / 100, alignItems:'center'}}>
                        <Text style={{ color: Colors.black_color, fontSize: mobileW * 4.2 / 100,fontFamily:Font.FontSemiBold }}>{data_routeparam.className}</Text>
                        </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} >
                <Image style={{width:mobileW*5/100, height:mobileW*5/100, tintColor:Colors.black_color}} resizeMode='contain' source={require("./Icon/about.png")}></Image>
               </TouchableOpacity>
                </View>

                <View style={styles.CardView}>
                    <View style={{ width: mobileW * 18 / 100,  }}>
                            <View style={styles.userimageView}>
                                <Image resizeMode='contain' style={styles.userImage}
                                    source={require('./Icon/ic_coach_w.png')}></Image>
                            </View>
                    </View>

            <View style={{  width:mobileW*75/100}}>
        <View >
            <Text style={{  color: Colors.black_color, fontSize: mobileW * 3.5 / 100,fontFamily:Font.FontMedium }}>{data_routeparam.teacherFullName}</Text>
                <Text style={{   color: Colors.black_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium }}>( {Lang_chg.MavenTxt[config.language]} )</Text>

            <View  >
                <View style={{ flexDirection: 'row',  }}>
                    <TouchableOpacity activeOpacity={0.8} >
                    <Image style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, tintColor: 'lightgray' }}
                        source={require('./Icon/star.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                    <Image style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, tintColor: 'lightgray' }}
                        source={require('./Icon/star.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                        <Image style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, tintColor: 'lightgray' }}
                        source={require('./Icon/star.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} >
                    <Image style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, tintColor: 'lightgray' }}
                        source={require('./Icon/star.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} >
                    <Image style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, tintColor: 'lightgray' }}
                        source={require('./Icon/star.png')}></Image>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
                <View style={{flexDirection:'row',marginTop:mobileW*2/100}}>
                    <View style={{width:mobileW*37.5/100, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: mobileW * 2.8/ 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.SessionDurationTxt[config.language]}</Text>
                            <Text style={{ fontSize: mobileW * 2.8 / 100, color: Colors.themecolor,fontFamily:Font.FontRegular }}> {data_routeparam.duration}</Text>
                        </View>
                                <View style={{ marginTop: mobileW * 1 / 100,  flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: mobileW * 2.8 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.StartSessionTxt[config.language]}</Text>
                                    <Text style={{ fontSize: mobileW * 2.8 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}> {moment(new Date(data_routeparam.StartDate)).format('MMM DD, YYYY')}</Text>
                                </View>
                                <View style={{ marginTop: mobileW * 1 / 100, flexDirection: 'row', alignItems: 'center',   }}>
                                    <Text style={{ fontSize: mobileW * 2.8 / 100, width:mobileW*12/100,  color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.SkillsTxt[config.language]} </Text>
                                    <Text style={{ fontSize: mobileW * 2.8 / 100, width:mobileW*25/100,  color: Colors.gray, fontFamily:Font.FontRegular }}>{data_routeparam.Skills}</Text>
                                </View>
                    </View>
            <View style={{width:mobileW*37.5/100, }}>
                <View style={{   flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: mobileW * 2.8/ 100, color: Colors.black_color, fontFamily:Font.FontMedium }}> </Text>
                    <Text style={{ fontSize: mobileW * 2.8 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>  </Text>
                </View>
             <View style={{ marginTop: mobileW * 1 / 100,  flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: mobileW * 2.8/ 100,  color: Colors.black_color, fontFamily:Font.FontMedium }}> </Text>
                <Text style={{ fontSize: mobileW * 2.8 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}> </Text>
             </View>
                    <View style={{ marginTop: mobileW * 1 / 100,  flexDirection: 'row', alignItems: 'center',   }}>
                        <Text style={{ fontSize: mobileW * 2.8/ 100, width:mobileW*18/100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.EndSessionTxt[config.language]}</Text>
                        <Text style={{ fontSize: mobileW * 2.8 / 100, color: Colors.gray, fontFamily:Font.FontRegular ,  }}>{moment(new Date(data_routeparam.Enddate)).format('MMM DD, YYYY')}</Text>
                    </View>
            </View>
                </View>
            </View>
                </View>

                <View style={styles.learnerListView}>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.LearnerReviewsTxt[config.language]}</Text>
                </View>

                {/* <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontWeight: '500' }}>{data_routeparam.fullname} (Feedback)</Text> */}


                {/* ==============================================================Flatlist================================================================= */}
                <ScrollView >
                    {/* <FlatList
                        data={DATA}
                        renderItem={({ item, index }) => */}
                            <View activeOpacity={0.8} style={styles.ListcardView}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={styles.imageView}>
                    <Image style={styles.imageIcon} resizeMode='contain'
                        source={require('./Icon/icon_student.png')}></Image>
                        {/* source={data_routeparam.image}></Image> */}
                </View>
                <View style={{ marginHorizontal: mobileW * 5 / 100, }}>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{data_routeparam.name} {Lang_chg.FeedbackTxt[config.language]}</Text>
                    <View style={{ flexDirection: 'row', marginTop:mobileW*1/100 }}>
                        <TouchableOpacity activeOpacity={0.8} >
                        <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
                            source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                        <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
                            source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                            <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
                            source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} >
                        <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
                            source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} >
                        <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
                            source={require('./Icon/star.png')}></Image>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>

                                {/* <Image style={{width:mobileW*10/100,height:mobileW*10/100,marginTop:mobileW*-5/100, alignSelf:'flex-end'}} resizeMode='contain'
                                    source={item.image}></Image> */}

                            </View>
                        {/* }
                        keyExtractor={item => item.id} /> */} 
                </ScrollView>
                


                {/* =================================================================Model================================================================ */}
                <View  >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                         <View style={{flex:1, backgroundColor:'#00000060'}}>
                        <View style={styles.ModelView}>
                            <View style={styles.ModelHeaderView}>
                                <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium }}>Help : Class name</Text>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  >
                                    <Image style={{width:mobileW*6/100, height:mobileW*6/100, tintColor:Colors.color_orange}} resizeMode='contain'
                                        source={require("./Icon/close2.png")}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:mobileW*90/100, height:mobileW*0.2/100, backgroundColor:'#E7E8EA'}}></View>
                            <ScrollView>
                                <View style={{ padding: mobileW * 3 / 100, }}>
                                    <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 4 / 100,fontFamily:Font.FontRegular }}>
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
        padding:mobileW*4/100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backIcon: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.black_color
    },
    CardView: {
        width: mobileW * 97 / 100,
        padding: mobileW * 2 / 100,
        flexDirection: 'row',
        borderWidth:mobileW*0.2/100,
        marginTop: mobileW * 1 / 100,
        borderRadius: mobileW * 1 / 100,
        backgroundColor: Colors.white_color,
        borderColor:'#E7E8EA',
        alignSelf: 'center'
    },
    userimageView: {
        width: mobileW * 15 / 100,
        height: mobileW * 15 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.themecolor,
        borderWidth: mobileW * 0.5 / 100,
        borderRadius: mobileW * 10 / 100
    },
    userImage: {
        width: mobileW * 12 / 100,
        height: mobileW * 12 / 100,
        borderRadius: mobileW * 5 / 100,
        tintColor: Colors.themecolor
    },
    buttonView: {
        width: mobileW * 28 / 100,
        height: mobileW * 8 / 100,
        marginTop: mobileW * 3 / 100,
        borderRadius: mobileW * 1 / 100,
        justifyContent: 'center',
        backgroundColor: Colors.themecolor
    },
    learnerListView: {
        width: mobileW * 98 / 100,
        height: mobileW * 12 / 100,
        paddingLeft:mobileW*1/100,
        paddingRight:mobileW*1/100,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: mobileW * 3 / 100,
        borderRadius: mobileW * 1 / 100,
        backgroundColor: '#FAFAFA'
    },
    ListcardView: {
        alignSelf: "center",
        margin: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
        borderRadius: mobileW * 2 / 100,
        width: mobileW * 98 / 100,
        padding: mobileW * 4 / 100,
        borderWidth:mobileW*0.2/100,
        borderColor: "#e8edfb",
    },
    imageView: {
        width: mobileW * 16 / 100,
        height: mobileW * 16  / 100,
        borderWidth: mobileW * 0.5 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.themecolor,
        borderRadius: mobileW * 10 / 100
    },
    imageIcon: {
        width: mobileW * 14 / 100,
        height: mobileW * 14 / 100,
        tintColor: Colors.themecolor,
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: mobileW * 12 / 100,
        borderTopLeftRadius: mobileW * 2 / 100,
        borderTopRightRadius: mobileW * 2 / 100,
        paddingLeft:mobileW*3/100,
        paddingRight:mobileW*3/100,
        backgroundColor: Colors.white_color
    },
}
)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Old Screen +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image, } from 'react-native'
// import React, { useState } from 'react'
// import { Colors } from './Provider/Colorsfont';
// import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';

// import { SafeAreaView } from 'react-native-safe-area-context'
// import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// const DATA = [
//     {
//         id: 1,
//         image: require("./Icon/icon_student.png"),
//         name: 'Shubham',
//         status: 'UnPaid',
//     },
   
// ]

// export default function AutomationTesingScreen({ navigation, route }) {
//     const data_routeparam = route.params.item
//     console.log("data here= === ==== = == ===>",data_routeparam);

//     const [firstname, setFirstname] = useState('');
//     const [modalVisible, setModalVisible] = useState(false);

//     const [mydate, setDate] = useState(new Date());                                    //Dite & Time Picker
//     const [displaymode, setMode] = useState('time', 'date');
//     const [mynewdate, setnewDate] = useState();
//     const [isDisplayDate, setShow] = useState(false);
//     const changeSelectedDate = (event, selectedDate) => {
//         const currentDate = selectedDate || mydate;
        
//         setDate(currentDate);
//         setnewDate(currentDate);
//         setShow(false)
//     };
//     const showMode = (currentMode) => {
//         setShow(true);
//         setMode(currentMode);
//     };
//     const displayDatepicker = () => {
//         showMode('date');
//     };
//     const displayTimepicker = () => {
//         showMode('time');
//     };
//     return (
//         <View style={{ flex: 1, }}>
//             <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
//                 {/* <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} /> */}
//                 {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
              
//                 <View style={styles.Header}>
//                         <TouchableOpacity activeOpacity={0.8}  onPress={() => navigation.goBack()}>
//                             <Image style={styles.backIcon} resizeMode='contain'
//                                 source={require("./Icon/back(1).png")}></Image>
//                         </TouchableOpacity>
//                         <View style={{ width: mobileW * 60 / 100, alignItems:'center'}}>
//                         <Text style={{ color: Colors.black_color, fontSize: mobileW * 4.2 / 100,fontFamily:Font.FontSemiBold }}>{data_routeparam.className}</Text>
//                         </View>
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} >
//                 <Image style={{width:mobileW*6/100, height:mobileW*6/100, tintColor:Colors.black_color}} resizeMode='contain' source={require("./Icon/about.png")}></Image>
//                </TouchableOpacity>
//                 </View>

//                 <View style={styles.CardView}>
//                     <View style={{ width: mobileW * 31 / 100, }}>
//                         <View>
//                             <View style={styles.userimageView}>
//                                 <Image resizeMode='contain' style={styles.userImage}
//                                     source={require('./Icon/ic_coach_w.png')}></Image>
//                             </View>


//                             <Text style={{ textAlign: 'center', color: Colors.black_color, fontSize: mobileW * 3.5 / 100,fontFamily:Font.FontMedium }}>{data_routeparam.teacherFullName}</Text>

//                             <Text style={{ textAlign: 'center', color: Colors.black_color, fontSize: mobileW * 3.5 / 100, fontFamily:Font.FontMedium }}>( {Lang_chg.MavenTxt[config.language]} )</Text>
//                         </View>
//                     </View>
//                     <View>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.SessionDurationTxt[config.language]}</Text>
//                             <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.themecolor,fontFamily:Font.FontRegular }}> {data_routeparam.duration}</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row' }}>
//                             <View style={{ width: mobileW * 31 / 100, }}>

//                             <View style={{ marginTop: mobileW * 3 / 100,  }}>
//                                     <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.StartSessionTxt[config.language]}</Text>
//                                     <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{moment(new Date(data_routeparam.StartDate)).format('MMM DD, YYYY')}</Text>
//                                 </View>
//                                 <View style={{ marginTop: mobileW * 3 / 100 }}>
//                                     <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.SkillsTxt[config.language]}</Text>
//                                     <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{data_routeparam.Skills}</Text>
//                                 </View>
//                                 {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}  style={styles.buttonView}>
//             <Text style={{color:Colors.white_color,alignSelf:'center', fontSize:mobileW*2.8/100}}>Reschedule Session</Text>
//         </TouchableOpacity> */}

//                             </View>
//                             <View style={{ width: mobileW * 31 / 100, }}>
//                             <View style={{ marginTop: mobileW * 3 / 100,  }}>
//                                     <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}> </Text>
//                                     <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}> </Text>
//                                 </View>
                               
//                                 <View style={{ marginTop: mobileW * 3 / 100, }}>
//                                     <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.EndSessionTxt[config.language]}</Text>
//                                     <Text style={{ fontSize: mobileW * 3.2 / 100, color: Colors.gray, fontFamily:Font.FontRegular }}>{moment(new Date(data_routeparam.Enddate)).format('MMM DD, YYYY')}</Text>
//                                 </View>
//                                 {/* <TouchableOpacity activeOpacity={0.8} style={styles.buttonView}>
//             <Text style={{color:Colors.white_color,alignSelf:'center', fontSize:mobileW*2.8/100}}>Cancle</Text>
//         </TouchableOpacity> */}
        
//                             </View>
//                         </View>
//                     </View>

//                 </View>
//                 <View style={styles.learnerListView}>
//                     <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{Lang_chg.LearnerReviewsTxt[config.language]}</Text>
//                 </View>

//                 {/* <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontWeight: '500' }}>{data_routeparam.fullname} (Feedback)</Text> */}


//                 {/* ==============================================================Flatlist================================================================= */}
//                 <ScrollView >
//                     {/* <FlatList
//                         data={DATA}
//                         renderItem={({ item, index }) => */}
//                             <View activeOpacity={0.8} style={styles.ListcardView}>
//                                 <View style={{ flexDirection: 'row', alignItems: 'center', }}>
//                                     <View style={styles.imageView}>
//                                         <Image style={styles.imageIcon} resizeMode='contain'
//                                             source={require('./Icon/icon_student.png')}></Image>
//                                             {/* source={data_routeparam.image}></Image> */}
//                                     </View>
//                                     <View style={{ marginHorizontal: mobileW * 5 / 100,  }}>
//                                         <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color, fontFamily:Font.FontMedium }}>{data_routeparam.name} {Lang_chg.FeedbackTxt[config.language]}</Text>
//                                         <View style={{ flexDirection: 'row', marginTop:mobileW*1/100 }}>
//                                             <TouchableOpacity activeOpacity={0.8} >
//                                             <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
//                                                 source={require('./Icon/star.png')}></Image>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity activeOpacity={0.8}>
//                                             <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
//                                                 source={require('./Icon/star.png')}></Image>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity activeOpacity={0.8}>
//                                                <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
//                                                 source={require('./Icon/star.png')}></Image>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity activeOpacity={0.8} >
//                                             <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
//                                                 source={require('./Icon/star.png')}></Image>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity activeOpacity={0.8} >
//                                             <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, tintColor: 'lightgray' }}
//                                                 source={require('./Icon/star.png')}></Image>
//                                                 </TouchableOpacity>
//                                         </View>
//                                     </View>
//                                 </View>

//                                 {/* <Image style={{width:mobileW*10/100,height:mobileW*10/100,marginTop:mobileW*-5/100, alignSelf:'flex-end'}} resizeMode='contain'
//                                     source={item.image}></Image> */}

//                             </View>
//                         {/* }
//                         keyExtractor={item => item.id} /> */}
//                 </ScrollView>
                


//                 {/* =================================================================Model================================================================ */}
//                 <View  >
//                     <Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={modalVisible}
                    
//                     >
//                          <View style={{flex:1, backgroundColor:'#00000060'}}>
//                         <View style={styles.ModelView}>
//                             <View style={styles.ModelHeaderView}>
//                                 <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium }}>Help : Class name</Text>
//                                 <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  >
//                                     <Image style={{width:mobileW*6/100, height:mobileW*6/100, tintColor:Colors.color_orange}} resizeMode='contain'
//                                         source={require("./Icon/close2.png")}></Image>
//                                 </TouchableOpacity>
//                             </View>
//                             <View style={{width:mobileW*90/100, height:mobileW*0.2/100, backgroundColor:'#E7E8EA'}}></View>
//                             <ScrollView>
//                                 <View style={{ padding: mobileW * 3 / 100, }}>

//                                     <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 4 / 100,fontFamily:Font.FontRegular }}>
//                                         Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class   Reschedule Class
//                                     </Text>

//                                 </View>


//                             </ScrollView>
//                         </View>
//                         </View>
//                     </Modal>
//                 </View>




//             </SafeAreaView>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     Header: {
//         backgroundColor: Colors.white_color,
//         width: mobileW, 
//         height: mobileW * 15 / 100,
//         padding:mobileW*4/100,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     backIcon: {
//         width: mobileW * 6 / 100,
//         height: mobileW * 6 / 100,
//         tintColor: Colors.black_color
//     },
//     CardView: {
//         width: mobileW * 97 / 100,
//         padding: mobileW * 2 / 100,
//         flexDirection: 'row',
//         // elevation: 5,
//         borderWidth:mobileW*0.2/100,
//         marginTop: mobileW * 1 / 100,
//         borderRadius: mobileW * 1 / 100,
//         backgroundColor: Colors.white_color,
//         borderColor:'#E7E8EA',
//         alignSelf: 'center'
//     },
//     userimageView: {
//         width: mobileW * 18 / 100,
//         height: mobileW * 18 / 100,
//         alignSelf: 'center',
//         marginTop: mobileW * 3 / 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderColor: Colors.themecolor,
//         borderWidth: mobileW * 0.5 / 100,
//         borderRadius: mobileW * 10 / 100
//     },
//     userImage: {
//         width: mobileW * 15 / 100,
//         height: mobileW * 15 / 100,
//         borderRadius: mobileW * 5 / 100,
//         tintColor: Colors.themecolor
//     },
//     buttonView: {
//         width: mobileW * 28 / 100,
//         height: mobileW * 8 / 100,
//         marginTop: mobileW * 3 / 100,
//         borderRadius: mobileW * 1 / 100,
//         justifyContent: 'center',
//         backgroundColor: Colors.themecolor
//     },
//     learnerListView: {
//         width: mobileW * 98 / 100,
//         height: mobileW * 12 / 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginTop: mobileW * 3 / 100,
//         borderRadius: mobileW * 1 / 100,
//         backgroundColor: Colors.light_cyan
//     },
//     ListcardView: {
//         alignSelf: "center",
//         margin: mobileW * 2 / 100,
//         backgroundColor: Colors.white_color,
//         borderRadius: mobileW * 2 / 100,
//         width: mobileW * 98 / 100,
//         padding: mobileW * 4 / 100,
//         borderWidth:mobileW*0.2/100,
//         // elevation: 5,
//         // shadowColor: '#000',
//         borderColor: "#e8edfb",
//         // borderWidth: 1,
//         // shadowOpacity: 0.1,
//         // shadowOffset: { width: 0, },
//     },
//     imageView: {
//         width: mobileW * 16 / 100,
//         height: mobileW * 16  / 100,
//         borderWidth: mobileW * 0.5 / 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderColor: Colors.themecolor,
//         borderRadius: mobileW * 10 / 100
//     },
//     imageIcon: {
//         width: mobileW * 14 / 100,
//         height: mobileW * 14 / 100,
//         tintColor: Colors.themecolor,
//         // marginHorizontal: mobileW * 2 / 100,

//     },
//     // ==============================================================Model===========================================
//     ModelView: {
//         width: mobileW * 90 / 100,
//         borderRadius: mobileW * 3 / 100,
//         marginTop: mobileH * 30 / 100,
//         alignSelf: 'center',
//         backgroundColor: Colors.white_color,
//         elevation: 5
//     },
//     ModelHeaderView: {
//         width: mobileW * 90 / 100,
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: mobileW * 12 / 100,
//         borderTopLeftRadius: mobileW * 2 / 100,
//         borderTopRightRadius: mobileW * 2 / 100,
//         paddingLeft:mobileW*3/100,
//         paddingRight:mobileW*3/100,
//         backgroundColor: Colors.white_color
//     },
//     CalanderView: {
//         width: mobileW * 40 / 100,
//         marginHorizontal: mobileW * 2 / 100,
//         height: mobileW * 10 / 100,
//         marginTop: mobileW * 3 / 100,
//         borderRadius: mobileW * 1 / 100,
//         padding: mobileW * 2 / 100,
//         borderWidth: mobileW * 0.5 / 100,
//         borderColor: Colors.themecolor,
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     calanderText: {
//         color: Colors.gray,
//         alignSelf: 'center',
//         fontSize: mobileW * 2.8 / 100,
//         fontWeight: '500',
//         marginHorizontal: mobileW * 2 / 100
//     },
//     textinputView: {
//         width: mobileW * 85 / 100,
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: mobileW * 2 / 100,
//         marginTop: mobileW * 5 / 100,
//         borderRadius: mobileW * 1 / 100,
//         height: mobileW * 22 / 100,
//         borderWidth: mobileW * 0.5 / 100,
//         borderColor: Colors.themecolor,
//         // backgroundColor:'green',
//     },
//     iconQuestionMark: {
//         width: mobileW * 5 / 100,
//         height: mobileW * 5 / 100,
//         tintColor: Colors.gray
//     },
//     textInput: {
//         fontSize: mobileW * 4 / 100,
//         width: mobileW * 75 / 100,
//         fontWeight: '500',
//         // backgroundColor:'yellow' ,
//         color: Colors.gray,
//         padding: mobileW * 2 / 100,
//         // height:mobileW*30/100
//     },
//     ModalButton: {
//         width: mobileW * 35 / 100,
//         marginHorizontal: mobileW * 2 / 100,
//         height: mobileW * 10 / 100,
//         marginTop: mobileW * 3 / 100,
//         borderRadius: mobileW * 1 / 100,
//         justifyContent: 'center',
//         backgroundColor: Colors.themecolor
//     },
//     modelButtonText: {
//         color: Colors.white_color,
//         alignSelf: 'center',
//         fontSize: mobileW * 2.8 / 100
//     }
// }
// )