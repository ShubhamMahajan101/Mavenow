import { StatusBar, Modal, Alert, ScrollView, TextInput, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { config, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Font } from './Provider/Colorsfont';
import DateTimePicker from '@react-native-community/datetimepicker';
import { msgProvider, msgText } from './Provider/Messageconsolevalidationprovider/messageProvider';
import axios from 'axios';
import moment from 'moment';
import { logError } from 'react-native-linkedin';
import { log } from 'react-native-reanimated';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const ActiveDATA = [
    {
        id: 1,
        image: require('./Icon/icon_maven.png'),
        name: 'cvv',
        request: 'Learning',
        skills: 'Automation ',
        startdate: 'Dec 07, 2022',
        level: 'Basic',
        enddate: 'Dec 09, 2022',
        postdate: 'Dec 06, 2022',
        Language: 'PHP',
        fee: '',
        status: 'Request From Learner',
        // selected:false
    },
    {
        id: 1,
        image: require('./Icon/icon_maven.png'),
        name: 'cvv',
        request: 'Learning',
        skills: 'Automation ',
        startdate: 'Dec 07,',
        level: 'Basic',
        enddate: 'Dec 09, ',
        postdate: 'Dec 06, ',
        Language: 'PHP',
        fee: '',
        status: 'Request From Learner',
        // selected:false
    },
    {
        id: 1,
        image: require('./Icon/icon_maven.png'),
        name: 'cvv',
        request: 'Learning',
        skills: 'Automation ',
        startdate: 'Dec 07,',
        level: 'Basic',
        enddate: 'Dec 09, ',
        postdate: 'Dec 06, ',
        Language: 'PHP',
        fee: '',
        status: 'Request From Learner',
        // selected:false
    },
    {
        id: 1,
        image: require('./Icon/icon_maven.png'),
        name: 'cvv',
        request: 'Learning',
        skills: 'Automation ',
        startdate: 'Dec 07, ',
        level: 'Basic',
        enddate: 'Dec 09, ',
        postdate: 'Dec 06, ',
        Language: 'PHP',
        fee: '',
        status: 'Request From Learner',
        // selected:false
    },
    {
        id: 1,
        image: require('./Icon/icon_maven.png'),
        name: 'cvv',
        request: 'Learning',
        skills: 'Automation ',
        startdate: 'Dec 07, ',
        level: 'Basic',
        enddate: 'Dec 09, ',
        postdate: 'Dec 06, ',
        Language: 'PHP',
        fee: '',
        status: 'Request From Learner',
        // selected:false
    },
    {
        id: 1,
        image: require('./Icon/icon_maven.png'),
        name: 'cvv',
        request: 'Learning',
        skills: 'Automation ',
        startdate: 'Dec 07, ',
        level: 'Basic',
        enddate: 'Dec 09, ',
        postdate: 'Dec 06, ',
        Language: 'PHP',
        fee: '',
        status: 'Request From Learner',
        // selected:false
    },
]

export default function History({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [timePicker, setTimePicker] = useState(false);
    console.log(timePicker, '======> timePicker');
    const [endtimePicker, setendTimePicker] = useState(false);
    const [date, setdate] = useState(Lang_chg.StartDateTxt[config.language]);
    console.log(date, '====> date ======> ');
    const [enddate, setenddate] = useState(Lang_chg.EndDateTxt[config.language]);
    const [refresh, setrefresh] = useState(false)
    const [EndTimeCheck, setEndTimeCheck] = useState(new Date(Date.now()))
    const [monthStart, setmonthStart] = useState('')
    console.log(monthStart, "..monthStart");
    const [Endmonth, setEndmonth] = useState('')
    console.log(Endmonth, "=========> End Month ");
    const [EndYear, setEndYear] = useState('')
    console.log(EndYear, '====> EndYear ======> ');
    const [yearStart, setyearStart] = useState('')
    console.log(yearStart, '====== yearStart======yearStart');




    // -------------------->> refresh
    const refresh_Control = () => {
        setrefresh(true)
        setTimeout(() => {
            setrefresh(false)
        }, 1200);
    }
    // -------------------->> refresh

    const setDatetoFunction = (date) => {
        console.log(date, '.........................................');
        setTimePicker(false)
        setEndTimeCheck(date.nativeEvent.timestamp)
        var formateDate = date.nativeEvent.timestamp
        let newDate = moment(new Date(formateDate)).format('DD/MM/YYYY')
        let startM = moment(new Date(formateDate)).format('MM')
        setmonthStart(startM)
        let startY = moment(new Date(formateDate)).format('YYYY')
        setyearStart(startY)
        console.log(setmonthStart, "...setmonthStart ...setmonthStart");
        console.log(newDate, 'new date...');
        setdate(newDate)

    }

    const setEndDatetoFunction = (date) => {
        setendTimePicker(false)
        var formateDate = date.nativeEvent.timestamp
        let newDate = moment(new Date(formateDate)).format('DD/MM/YYYY')
        let endM = moment(new Date(formateDate)).format('MM')
        setEndmonth(endM)
        let endY = moment(new Date(formateDate)).format('YYYY')
        setEndYear(endY)

        setenddate(newDate)
        console.log('date is here--------->>>>>>', newDate);
    }

    const OnConfirm = () => {
        console.log('====> date_Data < =====');
        if (date == "Start Date") {
            msgProvider.toast(msgText.selectStartdate[config.language], 'center')
            return false
        }
        if (enddate == "End Date") {
            msgProvider.toast(msgText.selectEndtdate[config.language], 'center')
            return false
        }

        if (enddate <= date) {
            msgProvider.toast(msgText.greaterDate[config.language], 'center')
            return false
        }
        setModalVisible(!modalVisible)
    }

    // const OnConfirm = () => {
    //     // check the dates
    //     let date1 = date;
    //     let date2 = enddate;
    //      let Monthstart = monthStart
    //      let EndMonth = Endmonth
    //     if (date1 < date2)  {
    //     // if (date1 < date2,Monthstart <= EndMonth )  {
    //         var emptyMobile1 = 'All fine'
    //         msgProvider.toast(emptyMobile1, 'center')
    //         setModalVisible(!modalVisible)
    //         return false
    //     }
    //      else if (date1 > date2) {
    //     //  else if (date1 > date2,Monthstart >= EndMonth) {
    //         var emptyMobile2 = 'Please Enter Greater Date'
    //         msgProvider.toast(emptyMobile2, 'center')
    //         return false

    //     } 
    //      else if (date1 > date2) {
    //     //  else if (date1 > date2,Monthstart >= EndMonth) {
    //         var emptyMobile2 = 'Please Enter Greater Date'
    //         msgProvider.toast(emptyMobile2, 'center')
    //         return false

    //     } 
    //     else {
    //         var emptyMobile3 = 'Both dates are equal'
    //         msgProvider.toast(emptyMobile3, 'center')
    //         return false

    //     }
    // };

    useEffect(() => {
        apiCalling();

    }, [])


    const apiCalling = () => {
        axios.get('https://mavenow.com:8001/userrequest/history?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicGF0aGFrZzg3NkBnbWFpbC5jb20iLCJ1c2VyX0lkIjo5MDksImlhdCI6MTY3NDIxMzE2Nn0.ASnHQya29LrSAqN6ff2DCam56LZRA_71X2oM6JUyJM8&fromdate=2022-12-20T18:30:00.000Z&todate=2022-12-29T18:29:00.000Z', {
            "isactive": 1
        })
            .then(function (data) {
                var GetData = data.data
                //   console.log('jsdsssss',GetData);
                if (GetData.StatusCode == 200) {
                    var GetData1 = GetData.result
                    console.log("result data", GetData1);
                    var DataToSet = GetData.response
                    console.log('All response ==>', DataToSet);
                } else {
                    console.log("I am in not found")
                }
                //   console.log("dfdfsfs",GetData);
            })
            .catch(function (error) {
                console.log('======>', error);
            });
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
                {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
                <View style={styles.Header}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
                    <TouchableOpacity style={{}} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Image style={styles.backIcon_} resizeMode='contain'
                            source={require("./Icon/back(1).png")}></Image>
                    </TouchableOpacity>
                    <Text style={styles.history_Text}>{Lang_chg.HistoryTxt[config.language]}</Text>
                    <Text style={{ color: Colors.black_color, fontSize: mobileW * 4.5 / 100, fontFamily: Font.FontMedium }}> </Text>
                    {/* </View> */}

                </View>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={refresh_Control}
                            tintColor={Colors.themecolor}
                            colors={[Colors.themecolor]}
                        />
                    }>
                    <View style={{ marginBottom: mobileW * 5 / 100 }}>
                        <FlatList
                            data={ActiveDATA}
                            renderItem={({ item, index }) =>
                                <View style={{ marginTop: mobileW * 2 / 100 }}>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.flatlistCard}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <View style={{ width: mobileW * 20 / 100, paddingTop: mobileW * 2 / 100 }}>
                                                <View style={styles.imageCard}>
                                                    <Image resizeMode='contain' style={styles.mavenImage}
                                                        source={item.image}></Image>
                                                </View>
                                                {/* <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color }}>{item.name} </Text> */}

                                            </View>

                                            <View >
                                                <Text style={styles.static_Txt}>vinay Dexit (Maven)</Text>
                                                {/* <Text style={{ fontSize: mobileW * 3.2/ 100, color: Colors.black_color, marginTop: mobileW * 0.5 / 100,fontFamily:Font.FontMedium }}></Text> */}
                                                <View style={{ flexDirection: 'row', }}>
                                                    <View style={{ width: mobileW * 36 / 100, marginTop: mobileW * 1.10 / 100 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                                            <Text style={styles.request_text}>{Lang_chg.RequestTxt[config.language]} </Text>
                                                            <Text style={[styles.Dynamic_text, { width: mobileW * 22 / 100, }]}>{item.request},</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ width: mobileW * 36 / 100, marginTop: mobileW * 1.10 / 100, }}>
                                                        <View style={{ flexDirection: 'row' }} >
                                                            <Text style={styles.request_text}>{Lang_chg.StartDateTxt[config.language]} </Text>
                                                            <Text style={[styles.Dynamic_text, { width: mobileW * 20 / 100, }]}>{item.startdate}</Text>
                                                        </View>

                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', }}>
                                                    <View style={{ width: mobileW * 36 / 100, marginTop: mobileW * 1.10 / 100 }}>

                                                        <View style={{ flexDirection: 'row' }} >
                                                            <Text style={styles.request_text}>{Lang_chg.SkillsTxt[config.language]} </Text>
                                                            <Text numberOfLines={2} style={{ fontSize: mobileW * 2.6 / 100, color: '#777', width: mobileW * 26 / 100 }}>{item.skills}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: mobileW * 36 / 100, marginTop: mobileW * 1.10 / 100, }}>
                                                        <View style={{ flexDirection: 'row', }} >
                                                            <Text style={styles.request_text}>{Lang_chg.EndDateTxt[config.language]} </Text>
                                                            <Text style={[styles.Dynamic_text, { width: mobileW * 22 / 100, }]}>{item.enddate}</Text>
                                                        </View>
                                                        {/* <View style={{ marginTop: mobileW * 2 / 100 }} >
                                                <Text style={styles.request_text}>{Lang_chg.LevelTxt[config.language]}</Text>
                                                <Text style={styles.Dynamic_text}>{item.level}</Text>
                                            </View> */}
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <View style={{ width: mobileW * 36 / 100, marginTop: mobileW * 1.10 / 100 }}>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                                            <Text style={styles.request_text}>{Lang_chg.LevelTxt[config.language]} </Text>
                                                            <Text style={[styles.Dynamic_text, { width: mobileW * 27 / 100 }]}>{item.level}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: mobileW * 36 / 100, marginTop: mobileW * 1.10 / 100, }}>
                                                        <View style={{ flexDirection: 'row' }} >
                                                            <Text style={styles.request_text}>{Lang_chg.PostdateTxt[config.language]} </Text>
                                                            <Text style={[styles.Dynamic_text, { width: mobileW * 22 / 100, }]}>{item.postdate}</Text>
                                                        </View>

                                                    </View>
                                                </View>

                                            </View>
                                        </View>



                                        <View style={styles.flatlistFootar}>
                                            <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color }}>{item.fee}</Text>
                                            <Text style={styles.status_Txt}>{Lang_chg.studentstatusTxt[config.language]}{ }</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ width: mobileW, height: mobileW * 0.2 / 100, backgroundColor: Colors.gray }}></View>
                                </View>
                            }
                            keyExtractor={item => item.id} />
                    </View>
                </ScrollView>
                {/* ================================================================= Time Duration Model================================================== */}
                <View  >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}>
                        <View style={{ flex: 1, backgroundColor: '#00000090', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={styles.ModelCard}>
                                <View style={styles.ModelHeader}>
                                    <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.SelectDateTxt[config.language]}</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  >
                                        <Image style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, tintColor: Colors.color_orange }} resizeMode='contain'
                                            source={require("./Icon/close2.png")}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: mobileW * 85 / 100, height: mobileW * 0.2 / 100, backgroundColor: '#E7E8EA' }}></View>
                                <ScrollView>
                                    <View style={{ alignItems: 'center', paddingBottom: mobileW * 2 / 100 }}>

                                        {/* =================================================== Date / Time ================================================================ */}

                                        <View style={{ flexDirection: 'row' }}>

                                            {timePicker && (                                                        //Date Picker
                                                <DateTimePicker
                                                    mode={'date'}
                                                    value={new Date(Date.now())}
                                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                    is24Hour={false}
                                                    minimumDate={new Date(Date.now())}
                                                    onChange={text => setDatetoFunction(text)}
                                                />
                                            )}
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => setTimePicker(true)} style={styles.CalanderView}>
                                                <Image resizeMode='contain' style={styles.iconQuestionMark}
                                                    source={require('./Icon/icon_calendar.png')}></Image>
                                                <Text style={styles.calanderText}>{date}</Text>
                                            </TouchableOpacity>

                                            {endtimePicker && (                                                                   //Date Picker
                                                <DateTimePicker
                                                    mode={'date'}
                                                    value={new Date(Date.now())}
                                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                    is24Hour={false}
                                                    minimumDate={EndTimeCheck}
                                                    onChange={text => setEndDatetoFunction(text)} />
                                            )}
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => setendTimePicker(true)} style={styles.CalanderView}>
                                                <Image resizeMode='contain' style={styles.iconQuestionMark}
                                                    source={require('./Icon/icon_calendar.png')}></Image>
                                                <Text style={styles.calanderText}>{enddate}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: mobileW * 3 / 100 }}>
                                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} activeOpacity={0.8} style={styles.CancleButton}>
                                                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.white_color, fontFamily: Font.FontRegular }}>{Lang_chg.CancelTxt[config.language]}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={0.8} style={[styles.CancleButton, { backgroundColor: Colors.white_color }]}
                                                onPress={() => OnConfirm()} >
                                                {/* onPress={() => setModalVisible(!modalVisible)} > */}
                                                <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.themecolor, fontFamily: Font.FontRegular }}>{Lang_chg.OkTxt[config.language]}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={styles.Button}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} >

                        <Image resizeMode='contain' style={styles.Bottom_Image} source={require('./Icon/history_modal.png')}></Image>

                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Header: {
        backgroundColor: Colors.white_color,
        width: mobileW,
        paddingLeft: mobileW * 4 / 100,
        paddingRight: mobileW * 4 / 100,
        height: mobileW * 15 / 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backIcon_: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.black_color
    },
    history_Text:{ 
        color: Colors.black_color,
         fontSize: mobileW * 4.5 / 100, 
    fontFamily: Font.FontMedium 
},
    flatlistCard: {
        width: mobileW * 92 / 100,
        alignSelf: 'center',
        marginTop: mobileW * 3 / 100,
        borderRadius: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
    },
    imageCard: {
        width: mobileW * 16 / 100,
        height: mobileW * 16 / 100,
        borderRadius: mobileW * 10 / 100,
        borderWidth: mobileW * 0.6 / 100,
        borderColor: Colors.themecolor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    status_Txt:{ 
        fontSize: mobileW * 3.2 / 100, 
    color: Colors.themecolor, 
    fontFamily: Font.FontMedium
 },
    mavenImage: {
        width: mobileW * 12 / 100,
        height: mobileW * 12 / 100,
        borderRadius: mobileW * 2 / 100,
        tintColor: Colors.themecolor
    },
    flatlistFootar: {
        width: mobileW * 92 / 100,
        flexDirection: 'row',
        alignItems: 'center',
        padding: mobileW * 1.8 / 100,
        justifyContent: 'space-between',
        borderBottomLeftRadius: mobileW * 2 / 100,
        borderBottomRightRadius: mobileW * 2 / 100,
    },
    ModelCard: {
        width: mobileW * 85 / 100,
        borderRadius: mobileW * 3 / 100,
        backgroundColor: Colors.white_color,
        elevation: 5
    },
    ModelHeader: {
        width: mobileW * 85 / 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: mobileW * 12 / 100,
        borderTopLeftRadius: mobileW * 2 / 100,
        borderTopRightRadius: mobileW * 2 / 100,
        paddingLeft: mobileW * 3 / 100,
        paddingRight: mobileW * 3 / 100,
        backgroundColor: Colors.white_color
    },
    CalanderView: {
        width: mobileW * 38 / 100,
        marginHorizontal: mobileW * 2 / 100,
        height: mobileW * 13.5 / 100,
        marginTop: mobileW * 3 / 100,
        borderRadius: mobileW * 1.5 / 100,
        padding: mobileW * 2 / 100,
        borderWidth: mobileW * 0.3 / 100,
        borderColor: "#9f9f9f",
        flexDirection: 'row',
        alignItems: 'center'
    },
    static_Txt:{
         fontSize: mobileW * 3.2 / 100, 
    color: Colors.black_color,
     fontFamily: Font.FontMedium 
},
    calanderText: {
        color: "#777",
        alignSelf: 'center',
        fontSize: mobileW * 3.2 / 100,
        fontFamily: Font.FontRegular,
        marginHorizontal: mobileW * 2 / 100
    },
    sessionDuration: {
        color: Colors.gray,
        fontSize: mobileW * 5 / 100,
        fontWeight: '500',
        marginHorizontal: mobileW * 2 / 100
    },
    iconQuestionMark: {
        width: mobileW * 5 / 100,
        height: mobileW * 5 / 100,
        tintColor: Colors.gray
    },
    Button: {
        width: mobileW * 15 / 100,
        height: mobileW * 15 / 100,
        backgroundColor: Colors.themecolor,
        position: 'absolute',
        bottom: mobileW * 10 / 100,
        marginLeft: mobileW * 80 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: mobileW * 10 / 100,
    },
    CancleButton: {
        width: mobileW * 23 / 100,
        height: mobileW * 7 / 100,
        marginHorizontal: mobileW * 2 / 100,
        borderRadius: mobileW * 1 / 100,
        borderWidth: mobileW * 0.2 / 100,
        borderColor: Colors.themecolor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.themecolor
    },
    request_text: {
        fontSize: mobileW * 2.6 / 100,
        color: Colors.black_color,
        fontFamily: Font.FontMedium
    },
    Dynamic_text: {
        fontSize: mobileW * 2.6 / 100,
        color: "#777",
        // marginTop: mobileW * 0.6 / 100,
        fontFamily: Font.FontRegular
    },
    Bottom_Image: {
        width: mobileW * 8 / 100,
        height: mobileW * 8 / 100,
        tintColor: Colors.white_color
    }
})