import {StatusBar, ScrollView, Animated, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import UserSliderDot from './UserSliderDot';
import { Colors } from './Provider/Colorsfont';
import { SafeAreaView } from 'react-native-safe-area-context';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++ Slider +++++++++++++++++++++++++++++++++++++++++++++++++++++
const slides = [
    { id: 1, image: require('./Icon/slide1.png'), },
    { id: 2, image: require('./Icon/slide2.png'), },
    { id: 3, image: require('./Icon/slide3.png'), },
    { id: 4, image: require('./Icon/slide4.png'), },
    { id: 5, image: require('./Icon/slide5.png'), },
    // { id: 6, image: require('./Icon/welcome_six.png'), }
]
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++ Free Upskilling Courses +++++++++++++++++++++++++++++++++++++++++++++++++++++
const Courses = [
    {
        id: 1,
        image: require('./Icon/video.png'),
        title: 'Work Stress Management',
        discripsion: 'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
    },
    {
        id: 2, image: require('./Icon/video.png'),
        title: 'Emotional Intelligence',
        discripsion: 'kjfkjfsdfjk fjsdkfjkvbcvbcvbfj fjskfjs fk ',
    },
    {
        id: 3, image: require('./Icon/welcome_three.png'),
        title: 'Professional Growth',
        discripsion: 'kjfkjfsdfjk fjsdkfjkfj fjskfjs fk ',
    },
    {
        id: 4, image: require('./Icon/welcome_four.png'),
        title: 'Critical Thinking and Problem Solving',
        discripsion: 'kjfkjfsdfjk fjsdkfjkfj fjskfjs fk ',
    },
    {
        id: 5, image: require('./Icon/welcome_five.png'),
        title: 'Effective Speaking',
        discripsion: 'kjfkjfsdfjk fjsdkfjkfj fjskfjs fk ',
    },
    {
        id: 6, image: require('./Icon/welcome_six.png'),
        title: 'Public Speaking',
        discripsion: 'kjfkjfsdfjk fjsdkfjkfj fjskfjs fk ',
    }
]

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++ Expert Talk +++++++++++++++++++++++++++++++++++++++++++++++++++++

const MavenTesting = [
    {
        id: 1,
        image: require('./Icon/icon_maven.png'),
        heading: 'Maven(s) Recommended for Automation testing',
        title: 'Support Team',
        skills: 'Automation testion',
        level: 'Basic',
        categary: 'Testing',
        // discripsion:'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
    },
    {
        id: 2,
        image: require('./Icon/icon_maven.png'),
        heading: 'Maven(s) Recommended for React',
        title: 'Support Team',
        skills: 'Automation testion',
        level: 'Basic',
        categary: 'Web DeVelopment',
        // discripsion:'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
    },
]
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++ Expert Talk +++++++++++++++++++++++++++++++++++++++++++++++++++++
// const Expert =[
//   {id:1,
//     image:require('./Icon/video.png'),
//     title:'Create First ASP.NET MVC Project',
//     discripsion:'kjfkjfsdfjk fjsdkfjkfj vbbfghfgcvbfgh  fjskfjs fk ',
// },
//   {id:2,image:require('./Icon/welcome_two.png') ,
//   title:'Create New Project in Angular CLI Command',
//   discripsion:'kjfkjfsdfjk fjsdkfjkvbcvbcvbfj fjskfjs fk ',
// },
//   {id:3,image:require('./Icon/welcome_three.png') ,
//   title:'How to create a Java project in Eclipse ',
//   discripsion:'kjfkjfsdfjk fjsdkfjkfj fjskfjs fk ',
// },

// ]


export default function UserLearner({ navigation }) {


    const scrollX = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);
    const handleOnScroll = event => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX
                        },
                    },
                },
            ],
            {
                useNativeDriver: false
            },
        )(event)
    };


    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;
    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
                <View style={styles.Header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyLearnerProfile')} style={{ marginHorizontal: mobileW * 5 / 100 }} >
                            <Image style={styles.backIcon} resizeMode='contain'
                                source={require("./Icon/icon_student.png")}></Image>
                        </TouchableOpacity>
                        <Text style={{ color: Colors.white_color, fontWeight: '500', fontSize: mobileW * 5 / 100 }}>User(Learner)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerSearch')} style={{ marginRight: mobileW * 2 / 100 }} >
                            <Image style={styles.SearchIcon} resizeMode='contain'
                                source={require("./Icon/icon_search.png")}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerNotification')} style={{ marginRight: mobileW * 2 / 100 }} >
                            <Image style={styles.SearchIcon} resizeMode='contain'
                                source={require("./Icon/icon_notification.png")}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ padding: mobileW * 4 / 100 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyMavens')} style={styles.LearnerCard}>
                                <View style={styles.MavenImageView}>
                                    <Image resizeMode='contain' style={{ width: mobileW * 8 / 100, height: mobileW * 8 / 100, alignSelf: 'center' }}
                                        source={require('./Icon/icon_maven_border.png')}></Image>
                                </View>
                                <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontWeight: 'bold', textAlign: 'center' }}>My Maven(s)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerRequest')} style={styles.LearnerCard} >
                                <View style={styles.MavenImageView}>
                                    <Image resizeMode='contain' style={{ width: mobileW * 8 / 100, height: mobileW * 8 / 100, alignSelf: 'center', }}
                                        source={require('./Icon/icon_learning_request_border.png')}></Image>
                                </View>
                                <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontWeight: 'bold', textAlign: 'center' }}>My Learning Request</Text>
                            </TouchableOpacity>
                        </View>
                        {/*  ++++++++++++++++++++++++++++++++++++++++++++++++++++++ Slider +++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                        <FlatList
                            pagingEnabled
                            viewabilityConfig={viewabilityConfig}
                            data={slides}
                            horizontal={true}
                            snapToAlignment='center'
                            //  snapToAlignment='center'
                            style={{ marginTop: mobileW * 5 / 100, }}
                            onScroll={handleOnScroll}
                            showsHorizontalScrollIndicator={false}
                            //  onViewableItemsChanged={handleOnViewableItemsChanged}
                            renderItem={({ item, index }) =>
                                <View style={{
                                    width: mobileW * 92 / 100, alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                }}>
                                    <Image resizeMode='contain' style={{ width: mobileW * 100 / 100, height: mobileW * 45 / 100 }}
                                        source={item.image}></Image>
                                    <UserSliderDot data={slides} scrollX={scrollX} />
                                </View>
                            }
                        />


                        {/*  ++++++++++++++++++++++++++++++++++++++++++++++++++++++ Free Upskilling Courses +++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

                        <Text style={{ fontSize: mobileW * 4.5 / 100, color: Colors.black_color, fontWeight: 'bold', marginTop: mobileW * 2 / 100 }}>Free Upskilling Courses</Text>
                        <View style={{ marginTop: mobileW * 3 / 100 }}>
                            <FlatList
                                data={Courses}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) =>
                                    <View style={{ width: mobileW * 45 / 100, marginHorizontal: mobileW * 2 / 100, }}>
                                        <Image resizeMode='contain' style={{ width: mobileW * 45 / 100, height: mobileW * 30 / 100, borderRadius: mobileW * 2 / 100, }}
                                            source={item.image}></Image>
                                        <Text style={{ fontSize: mobileW * 3.3 / 100, color: Colors.black_color, fontWeight: '500' }}>{item.title}</Text>
                                        <Text style={{ fontSize: mobileW * 2.5 / 100, color: Colors.gray, fontWeight: 'bold' }}>{item.discripsion}</Text>
                                    </View>

                                }

                            />
                        </View>
                        {/*  ++++++++++++++++++++++++++++++++++++++++++++++++++++++ Maven(s) Recommended for Automation testing +++++++++++++++++++++++++++++++++++++++++++++++++++++ */}


                        <View style={{ marginTop: mobileW * 3 / 100, marginBottom: mobileW * 5 / 100 }}>
                            <FlatList
                                data={MavenTesting}
                                // horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) =>
                                    <View>
                                        <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontWeight: 'bold', marginTop: mobileW * 2 / 100 }}>{item.heading}</Text>
                                        <View style={styles.recommendedMaven}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image resizeMode='contain' style={{ width: mobileW * 12 / 100, height: mobileW * 12 / 100 }}
                                                    source={item.image}></Image>

                                                <View style={{ marginHorizontal: mobileW * 5 / 100 }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.black_color, fontWeight: '500' }}>{item.title}</Text>
                                                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('LearnerSuport')} style={styles.askAnithingButton}>
                                                            <Text style={{ color: Colors.white_color, fontWeight: '500', fontSize: mobileW * 4 / 100 }}>Ask Anything</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>Skills</Text>
                                                        <Text style={styles.supportTeamData}>{item.skills}</Text>

                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>Level</Text>
                                                            <Text style={styles.supportTeamData}>{item.level}</Text>

                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>Category</Text>
                                                            <Text style={styles.supportTeamData}>{item.categary}</Text>

                                                        </View>
                                                    </View>

                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                }

                            />
                        </View>


                        {/*  ++++++++++++++++++++++++++++++++++++++++++++++++++++++ Expert Talk Flatlist +++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

                        {/* <Text style={{fontSize:mobileW*4.5/100, color:Colors.black_color, fontWeight:'bold', marginTop:mobileW*2/100}}>Expert Talk</Text>
<View style={{marginTop:mobileW*3/100 }}>
<FlatList 
      data={Expert}
       horizontal={true}
       showsHorizontalScrollIndicator={false}
      renderItem={({item,index}) =>
      <View style={{width:mobileW*42/100,marginHorizontal:mobileW*2/100, }}>
      <Image resizeMode='contain' style={{width:mobileW*42/100,height:mobileW*25/100 , borderRadius:mobileW*2/100,}}
      source={item.image}></Image>
      <Text style={{fontSize:mobileW*3.3/100, color:Colors.black_color, fontWeight:'500'}}>{item.title}</Text>
<Text style={{fontSize:mobileW*2.5/100, color:Colors.gray, fontWeight:'bold' }}>{item.discripsion}</Text>
    </View>
    
    }
    
      />
</View> */}



                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:"red"
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
        height: mobileW * 8 / 100,
        tintColor: Colors.white_color
    },
    SearchIcon: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.white_color
    },
    MavenImageView: {
        width: mobileW * 14 / 100,
        height: mobileW * 14 / 100,
        backgroundColor: "#E3EDEC",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: mobileW * 7 / 100
    },
    LearnerCard: {
        width: mobileW * 35 / 100,
        height: mobileW * 30 / 100,
        padding: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
        marginHorizontal: mobileW * 1 / 100,
        borderRadius: mobileW * 2 / 100,
        elevation: 5,
        shadowColor: '#000',
        borderColor: "#e8edfb",
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        // shadowColor: '#000',
        shadowOpacity: 0.1,
        alignItems: 'center'
    },
    recommendedMaven: {
        width: mobileW * 92 / 100,
        height: mobileW * 30 / 100,
        borderRadius: mobileW * 2 / 100,
        marginTop: mobileW * 2 / 100,
        backgroundColor: Colors.white_color,
        elevation: 5,
        shadowColor: '#000',
        borderColor: "#e8edfb",
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
        // shadowColor: '#000',
        shadowOpacity: 0.1,
        padding: mobileW * 5 / 100,
        // flexDirection:'row',
        // alignItems:'center'
    },
    askAnithingButton: {
        marginBottom: mobileW * 2 / 100,
        width: mobileW * 30 / 100,
        justifyContent: 'center',
        marginHorizontal: mobileW * 8 / 100,
        alignItems: 'center',
        borderRadius: mobileW * 2 / 100,
        height: mobileW * 8 / 100,
        backgroundColor: Colors.themecolor
    },
    supportTeamData: {
        fontSize: mobileW * 3 / 100,
        color: Colors.black_color,
        fontWeight: '500',
        marginHorizontal: mobileW * 4 / 100
    }
})