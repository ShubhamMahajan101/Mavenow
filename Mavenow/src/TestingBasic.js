import { View, StatusBar,ScrollView,FlatList, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import { Colors } from './Provider/Colorsfont';
import PhoneInput from 'react-native-phone-number-input';
import { Stack, TextInput, } from "@react-native-material/core";
// import { flingHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
    {
      id: 1,
      image: require("./Icon/icon_maven.png"),
      name:'Gaurav',
     
    },
    
  ]
  
const TestingBasic = ({ navigation }) => {
    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
          
                {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
                <View style={styles.Header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 5 / 100 }} onPress={() => navigation.goBack()}>
                            <Image style={styles.backIcon} resizeMode='contain'
                                source={require("./Icon/icon_back.png")}></Image>
                        </TouchableOpacity>
                        <View style={{ width: mobileW * 71 / 100, height: mobileW * 12 / 100, }}>
                            <Text style={styles.HeaderText}>Automation testing (Basic)</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }} >
                        <Image style={styles.backIcon} resizeMode='contain'
                            source={require("./Icon/icon_info.png")}></Image>
                    </TouchableOpacity>
                </View>
                {/* ====================================================HEADER CLOSE============================================ */}
                <View style={{paddingRight:mobileW*2/100,paddingLeft:mobileW*2/100}}>

                <View style={styles.cardView}>
                    <View style={styles.cardHeader}>
                        <View style={{ width: mobileW * 20 / 100, borderTopLeftRadius: mobileW * 2 / 100, }}></View>
                        <View style={{ width: mobileW * 76 / 100, borderTopRightRadius: mobileW * 2 / 100, justifyContent: 'center' }}>
                            
                            <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100, }}>Automation testing (Basic)</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: mobileW * 21 / 100, }}>
                            <View style={styles.imageCard}>
                                <Image style={styles.imageIcon} resizeMode='contain'
                                    source={require("./Icon/icon_maven.png")}></Image>
                            </View>


                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>Start Date</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>Dec 07, 2022</Text>
                                </View>

                                <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>End Date</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>Dec 11, 2022</Text>
                                </View>

                                <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>Duration</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>5 days</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>Session Time</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>12 hours</Text>
                                </View>

                                <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>Skills</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>Automation testing</Text>
                                </View>

                                <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>Level</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>Basic</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>Session Time</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>12 hours</Text>
                                </View>

                                <View style={{ width: mobileW * 50 / 100, marginTop: mobileW * 2 / 100, }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>session includes</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>hgvfg jhghgjhgjkhui jhgjhh</Text>

                                </View>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: mobileW * 25 / 100, marginTop: mobileW * 2 / 100 }}>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>Session Time</Text>
                                    <Text style={{ fontSize: mobileW * 3.5 / 100, color: Colors.gray }}>12 hours</Text>
                                </View>



                            </View>
                        </View>

                    </View>


                    <View style={styles.cardfooter}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: mobileW * 2 / 100 }}>
                            <View style={{ flexDirection: "row", marginTop: mobileW * 1 / 100 }}>
                                <Text style={{ color: Colors.white_color }}>Fee 0</Text>
                                <Text style={{ color: Colors.white_color }}>rs</Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: mobileW * 1 / 100 }}>
                                <Text style={{ color: Colors.white_color, }}>Apply Till Dec 09,2022</Text>

                            </View>

                        </View>

                    </View>
            
                </View>

                <Text style={{color:Colors.blackColor}} >Applied Maven</Text>
                <Image style={{width:mobileW*55 /100,height:mobileW*55/100,alignSelf:"center"}} resizeMode='contain'
                                    source={require("./Icon/graphics_learner.png")}></Image>
                {/* ==============================================================Flatlist================================================================= */}

                </View>
            </SafeAreaView>
        </View>
    )
}
export default TestingBasic;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    Header: {
        backgroundColor: Colors.themecolor,
        width: mobileW, height: mobileW * 15 / 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backIcon: {
        width: mobileW * 8 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.white_color
    },
    HeaderText: {
        color: Colors.white_color,
        marginHorizontal: mobileW * 4 / 100,
        fontWeight: '500',
        fontSize: mobileW * 4.32 / 100,
        textAlign: "center"
    },
    input: {
        height: mobileW * 12 / 100,
        margin: mobileW * 2 / 100,
        borderRadius: mobileW * 1 / 100,
        borderWidth: 1,
        padding: mobileW * 2 / 100,
        borderColor: Colors.themecolor
    },
    cardView:{ 
        alignSelf: "center", 
        margin: mobileW * 2 / 100, 
        backgroundColor: Colors.white_color, 
        elevation: 2, 
        borderRadius: mobileW * 2 / 100 
    },
    cardHeader: {
        backgroundColor: Colors.themecolor,
        flexDirection: 'row',
        width: mobileW * 96 / 100,
        height: mobileW * 12 / 100,
        borderTopLeftRadius: mobileW * 2 / 100,
        borderTopRightRadius: mobileW * 2 / 100
    },
    ListcardView:{ 
        alignSelf: "center", 
        margin: mobileW * 2 / 100, 
        backgroundColor: Colors.white_color, 
        elevation: 2, 
        borderRadius: mobileW * 2 / 100 
    },
    ListText:{
        marginLeft:mobileW*5/100, 
        fontSize:mobileW*4/100, 
        color:Colors.black_color, 
        fontWeight:'bold', 
        marginBottom:mobileW*2/100
    },
    ListcardHeader: {
        backgroundColor: Colors.themecolor,
        flexDirection: 'row',
        width: mobileW * 92 / 100,
        height: mobileW * 12 / 100,
        borderTopLeftRadius: mobileW * 2 / 100,
        borderTopRightRadius: mobileW * 2 / 100,
        alignSelf:'center',
    },
    imageCard: {
        width: mobileW * 15 / 100,
        height: mobileW * 15 / 100,
        borderRadius: mobileW * 8 / 100,
        marginTop: mobileW * -8 / 100,
        marginHorizontal: mobileW * 2 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white_color,
        elevation: 5,
        shadowColor: '#000',
        borderColor: "#e8edfb",
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        shadowOpacity: 0.1,
    },
    listimageCard: {
        width: mobileW * 15 / 100,
        height: mobileW * 15 / 100,
        borderRadius: mobileW * 8 / 100,
        marginTop: mobileW * -8 / 100,
        marginHorizontal: mobileW * 2 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white_color,
        elevation: 5,
        shadowColor: '#000',
        borderColor: "#e8edfb",
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        shadowOpacity: 0.1,
    },
    imageIcon: {
        width: mobileW * 12 / 100,
        height: mobileW * 12 / 100,
        tintColor: Colors.themecolor,
        marginHorizontal: mobileW * 2 / 100
    },
    cardfooter: {
        width: mobileW * 96 / 100,
        height: mobileW * 10 / 100,
        marginTop: mobileW * 5 / 100,
        backgroundColor: Colors.themecolor,
        borderBottomEndRadius: mobileW * 2 / 100,
        borderBottomStartRadius: mobileW * 2 / 100,
        alignSelf: "center",
    },
    listtextView:{ 
        flexDirection: 'row',
        paddingBottom:mobileW*5/100,
        alignItems:'center', 
        justifyContent:'space-between', 
        width: mobileW * 71 / 100, 
        marginTop: mobileW * 3 / 100 
    }
}
)