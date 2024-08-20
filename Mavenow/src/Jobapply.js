import { View, Text, StyleSheet, Image, StatusBar, Dimensions, TouchableOpacity, ScrollView, ImageBackground, YellowBox, Alert, Modal, FlatList, Linking, TouchableNativeFeedback, Share, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { Colors, Font } from './Provider/Colorsfont'
import { SafeAreaView } from 'react-native-safe-area-context';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


const DATA = [
    {
        id: 1,
        cname: 'Tata Consultancy  services',
        technology: 'Web Design',
        skills: 'Photoshop, Adobe illustration, Html'
    },
    {
        id: 2,
        cname: 'infosys',
        technology: 'Web Development',
        skills: 'Photoshop, Adobe illustration'
    },
    {
        id: 3,
        cname: 'infosys',
        technology: 'Android Development',
        skills: 'Photoshop, Adobe illustration'
    },
    {
        id: 4,
        cname: 'infosys',
        technology: 'IOS Development',
        skills: 'Photoshop, Adobe illustration'
    },
    {
        id: 5,
        cname: 'infosys',
        technology: 'PHP Development',
        skills: 'Photoshop, Adobe illustration'
    },
    {
        id: 6,
        cname: 'infosys',
        technology: 'Angular Development',
        skills: 'Photoshop, Adobe illustration'
    },

]

export default function Jobapply({navigation, route}) {
    const Details = route.params.item
    console.log("Details here.......",Details);
    const [companyData, setCompanyData] = useState(DATA)
    return (
        <View style={{ flex: 1, backgroundColor:Colors.white_color }}>
             <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />
            <TouchableOpacity activeOpacity={0.8} style={styles.Header} onPress={() => navigation.goBack()}>
                <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, }}
                    source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>

            <View style={styles.aboutCompany}>

                <View style={styles.Company_LogoView}>

                    <Image resizeMode='contain' style={{ width: mobileW * 11 / 100, height: mobileW * 11 / 100, }}
                        source={Details.Company_Logo}></Image>
                        </View>

                <View style={{ width: mobileW * 45 / 100, marginHorizontal: mobileW * 2 / 100,}}>
                    <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>{Details.company}</Text>
                </View>
            </View>

            <Text style={styles.postJobtxt}>Recently Posted Jobs</Text>
            <View>
                <FlatList
                    data={companyData}
                    renderItem={({ item, index }) =>
                    <View>
                        <View style={styles.listcard}>
                            <View>
                                <Text style={{ fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium, color: '#121A23' }}>{item.technology}</Text>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontMedium, color: '#121A23' }}>Skills: </Text>
                                    <Text style={{ fontSize: mobileW * 2.8 / 100, fontFamily: Font.FontRegular,  color: '#A2A2A2', width: mobileW * 55 / 100, }}>{item.skills} </Text>
                                </View>
                            </View>

                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonCard} onPress={()=>navigation.navigate('Apply',{Details})}>
                                <Text style={{ fontSize: mobileW * 3 / 100, fontFamily: Font.FontMedium, color: Colors.white_color, textAlign:'center' }}>{Lang_chg.ApplyTxt[config.language]}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{width:mobileW, height:mobileW*0.2/100, backgroundColor:'#E7E8EA'}}></View>
                        </View>}
                />
            </View>
            </SafeAreaView>

            {/* BL =  #121A23
White =  #FFFFFF
Gray =  #9B9B9B
BR =  #EFF2F1
BR2 =  #E7E8EA
Blue=  #00959E
BG =  #FAFAFA */}

        </View>
    )
}

const styles = StyleSheet.create({
    Header: {
        width: mobileW,
        height: mobileW * 15 / 100,
        padding: mobileW * 4 / 100,
        justifyContent: 'center',
        backgroundColor:Colors.white_color
    },
    Company_LogoView:{
        width:mobileW*14/100, 
        height:mobileW*14/100, 
        borderRadius:mobileW*1/100, 
        alignItems:'center', 
        justifyContent:'center',
        backgroundColor:'#FAFAFA', 
    },
    aboutCompany: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: mobileW * 92 / 100,
        marginTop: mobileW * 5 / 100
    },
    postJobtxt: {
        marginLeft: mobileW * 4 / 100,
        marginTop: mobileW * 10 / 100,
        // marginBottom: mobileW * 3 / 100,
        fontSize: mobileW * 3.5 / 100,
        color: Colors.gray,
        fontFamily: Font.FontRegular
    },
    listcard: {
        width: mobileW,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: mobileW * 2 / 100,
        paddingTop: mobileW * 2 / 100,
        paddingLeft: mobileW * 4 / 100,
        paddingRight: mobileW * 4 / 100,
        paddingBottom: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
        // elevation: 2,
        // shadowColor: '#000',
        // borderColor: "#e8edfb",
        // borderWidth: 1,
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 0, },
    },
    buttonCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:mobileW*0.3/100,
        width: mobileW * 12.5 / 100,
        borderRadius: mobileW * 1 / 100,
        backgroundColor: Colors.themecolor,
    }
})