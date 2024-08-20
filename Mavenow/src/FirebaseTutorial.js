import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image,RefreshControl } from 'react-native'
// import React, { useState, useEffect } from 'react'
import { Colors, Font } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
 
import { SafeAreaView } from 'react-native-safe-area-context'
 
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
 

import React, { Component } from 'react'
import { setDate } from 'date-fns';



const data = [
  {
    Id:1,
    title: 'Firebase syllabus 1',
    status:false,
    items: [
      { subtitle: 'Firebase syllabus Topic 1' },
      { subtitle: 'Firebase syllabus Topic 2' },
      { subtitle: 'Firebase syllabus Topic 3' },
    ]
  },
  {
    Id:2,
    title: 'Firebase syllabus 2',
    status:false,
    items: [
      { subtitle: 'Firebase syllabus Topic 1' },
      { subtitle: 'Firebase syllabus Topic 2' },
      { subtitle: 'Firebase syllabus Topic 3' },
    ]
  }
]



export default class FirebaseTutorial extends Component {
  constructor(props) {
    super(props)
    this.state = {
       showAnswer: false,
       shouldShow: data,
       datasend:""
    };
   
 }

 question = (index) => {
  let data = this.state.shouldShow
  for (var i = 0; i < data.length; i++) {
     data[i].status = false;
  }
  data[index].status = !data[index].status
  this.setState({ shouldShow: data })
}

subListData = (item) => {
  console.log('item.................1111111111111',this.state.datasend);

  this.setState({ datasend: item })
setTimeout(() => {
  console.log('item.................22222222222222222',this.state.datasend);
  
}, 500);

}
  render() {
    return (
             <View style={{ flex: 1, }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor}/>
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.goBack()}  >
          <Image style={{width:mobileW*6/100, height:mobileW*6/100}} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
          </TouchableOpacity>
          <Text style={{ color: Colors.black_color, fontSize: mobileW *4/ 100,fontFamily:Font.FontSemiBold,}}>{Lang_chg.PreviewSyllabusTxt[config.language]}</Text>
          <Text></Text>
        </View> 

        <View style={{ alignSelf: 'center', width: mobileW * 96 / 100, marginTop:mobileW*1/100 }}>
          <View style={styles.CourseDetailsCard}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{ fontSize: mobileW * 3.6 / 100, fontFamily: Font.FontSemiBold, color: Colors.black_color }}>{Lang_chg.CourseDetailsTxt[config.language]}</Text>
           <TouchableOpacity >
            <Image style={{width:mobileW*8/100, height:mobileW*8/100,   }}
            resizeMode='contain' source={require("./Icon/Group_270.png")}></Image>
            </TouchableOpacity> 
            </View>
            <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
              <View style={{ width: mobileW * 46 / 100, flexDirection:'row', alignItems:'center' }}>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.SkillsTxt[config.language]} </Text>
                <Text style={{ color: Colors.gray, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular }}>Firebase</Text>
              </View>
              <View style={{ width: mobileW * 46 / 100, flexDirection:'row', alignItems:'center' }}>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.LevelTxt[config.language]} </Text>
                <Text style={{ color: Colors.gray, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular }}>Basic</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
              <View style={{ width: mobileW * 46 / 100, flexDirection:'row', alignItems:'center' }}>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.DurationTxt[config.language]} </Text>
                <Text style={{ color: Colors.gray, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular }}>5 days</Text>
              </View>
              <View style={{ width: mobileW * 46 / 100, flexDirection:'row', alignItems:'center' }}>
                <Text style={{ color: Colors.black_color, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.SessionTimeTxt[config.language]} </Text>
                <Text style={{ color: Colors.gray, fontSize: mobileW * 3.2 / 100, fontFamily: Font.FontRegular }}>120</Text>
              </View>
            </View>
          </View>

<View style={{flexDirection:'row', marginTop: mobileW * 5 / 100, alignItems:'center', justifyContent:'space-between'  }}>
          <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color,  fontFamily: Font.FontMedium}}>{Lang_chg.SyllabusDetailsTxt[config.language]}</Text>
          <TouchableOpacity activeOpacity={0.8} >
            <Image style={{width:mobileW*8/100, height:mobileW*8/100,   }}
            resizeMode='contain' source={require("./Icon/Group_270.png")}></Image>
            </TouchableOpacity>
            </View>
            <Text style={{color:Colors.themecolor, fontSize:mobileW*3.1/100, fontFamily:Font.FontMedium}}>Expand all sections</Text>

                  <FlatList
                     // showsHorizontalScrollIndicator={false}
                     // horizontal={this.state.isHorizontal}
                     contentContainerStyle={{ paddingBottom: mobileW*20/100 }}
                     data={this.state.shouldShow}
                     renderItem={({ item, index }) => {
                        return (
                           <View style={{
                              width: '100%', alignSelf: 'center', borderWidth: mobileW*0.2/100,
                              borderColor: '#ccc', marginTop: mobileW*5/100,  }}>
                              <View style={{ padding: mobileW*1.5/100, justifyContent: 'flex-start',alignItems: 'flex-start', marginVertical: mobileW*1.5/100}}>
                  <TouchableOpacity   style={{flexDirection:  'row', padding: mobileW*2/100, alignItems: "center"}}  onPress={() => this.question(index)}>
                                  
                  <Image style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100, }}source={require('./Icon/icon_drapdown.png')} ></Image>
                  <Text style={styles.text2}>{item.title}</Text>
                  </TouchableOpacity>
                        {item.status == true && 
                        <View style={{ flexWrap: 'wrap', width: '100%', alignSelf: 'center' }}>
                        <View style={{ borderColor: '#D0D7DE', width: '100%', height:mobileW*0.2/100, backgroundColor:Colors.gray}}></View>

                      <FlatList
                      data={item.items}
                      horizontal={false}
                      renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'row', }}>

                            <TouchableOpacity activeOpacity={0.8} style={{ padding: mobileW * 2 / 100, }} onPress={()=>this.subListData(item.subtitle)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[{ fontSize: mobileW * 4 / 100, color: Colors.gray, fontFamily: Font.FontRegular,}]}>{item.subtitle}</Text>
                            </View>
                            </TouchableOpacity>
                            </View>
                      }
                      keyExtractor={item => item.id}/>
                                 </View>
                                 }
                                 
                              </View>
                           </View>
                        )

                     }}/>
          </View>
{/* 
 <FlatList
            data={shouldShow}
            renderItem={({ item, index }) =>

              <View style={[{ marginTop: mobileW * 3 / 100, marginBottom: mobileW * 1 / 100 }, styles.DrowpdownCard]}  >  
                <TouchableOpacity  onPress={() => question(index)}  style={{ height: mobileW * 10 / 100, borderWidth: mobileW * 0.1 / 100, paddingHorizontal: mobileW * 2 / 100, flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, }}
                    source={require('./Icon/icon_drapdown.png')} ></Image>
                  <Text style={[{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, marginHorizontal: mobileW * 2 / 100, }]}>{item.title}</Text>
                </TouchableOpacity>

                {item.status== true&& 
                  <View style={{}}>
                    <FlatList
                      data={item.items}
                      horizontal={false}

                      renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'row', }}>

                          <TouchableOpacity activeOpacity={0.8} style={{ padding: mobileW * 2 / 100, }}  >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={[{ fontSize: mobileW * 4 / 100, color: Colors.gray, fontFamily: Font.FontRegular, }]}>{item.subtitle}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }
                      keyExtractor={item => item.id}
                    />
                  </View> }
              </View>

            }
            keyExtractor={item => item.id}
          />  */}

       


        <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 8 }}>
        <TouchableOpacity activeOpacity={0.8} style={{ width: mobileW * 43 / 100, height: mobileW * 12 / 100, backgroundColor: Colors.lightgray, marginHorizontal: mobileW * 1 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>{Lang_chg.CLOSETxt[config.language]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserMaven',{datasend : this.state.datasend})} activeOpacity={0.8} style={{ width: mobileW * 43 / 100, height: mobileW * 12 / 100, backgroundColor: Colors.themecolor, marginHorizontal: mobileW * 1 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontFamily: Font.FontMedium }}>{Lang_chg.SUBMITTxt[config.language]}</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft:mobileW*2/100,
    paddingRight:mobileW*2/100,
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row', 
  },
  CourseDetailsCard: {
    backgroundColor: Colors.white_color,
     borderWidth: mobileW * 0.2 / 100,
    borderColor: "#D0D7DE",
    padding: mobileW * 2 / 100,
    paddingTop: mobileW * 2 / 100,
    paddingBottom: mobileW * 4 / 100,
    borderRadius: mobileW * 2 / 100
  },
  text2:{
    fontSize:mobileW*4/100,
    fontFamily:Font.FontRegular,
    color:Colors.black_color,
    marginHorizontal:mobileW*2/100
  }
})

// ----------------------------------------------------------------------------------------------------------------------------------------

// import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { Stack, TextInput, } from "@react-native-material/core";
// import { Colors, Font } from './Provider/Colorsfont';
// import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
// import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { fonts } from 'react-native-elements/dist/config';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// import NestedListView, { NestedRow } from 'react-native-nested-listview'

// const data = [
//   {
//     Id:111111111111111,
//     title: 'Firebase syllabus 1',
//     status:false,
//     items: [
//       { subtitle: 'Firebase syllabus Topic 1' },
//       { subtitle: 'Firebase syllabus Topic 2' },
//       { subtitle: 'Firebase syllabus Topic 23' },
//     ]
//   },
//   {
//     Id:22222,
//     title: 'Firebase syllabus 2',
//     status:false,
//     items: [
//       { subtitle: 'Firebase syllabus Topic 1' },
//       { subtitle: 'Firebase syllabus Topic 2' },
//       { subtitle: 'Firebase syllabus Topic 3' },
//     ]
//   }
// ]
// const FirebaseTutorial = ({ navigation }) => {
 

//   const [shouldShow, setShouldShow] = useState(data);

//   const question = (index) => {
//     var DataToset = shouldShow
//     for (let i = 0; i < DataToset.length; i++) {
//       DataToset[i].status = false;
//     }
//     DataToset[index].status = !DataToset[index].status
//   setShouldShow(DataToset)
//   console.log('shouldShow----',DataToset);
    
//     setTimeout(() => {
//       console.log('shouldShow----',shouldShow);
//     }, 1000);
//  }

//   return (
//         <View style={{ flex: 1, }}>
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
//         <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
//         {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
//         <View style={styles.Header}>
//           {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
//           <TouchableOpacity activeOpacity={0.8} style={{}} onPress={() => navigation.goBack()}>
//             <Image style={{ height: mobileW * 10 / 100, height: mobileW * 10 / 100,marginHorizontal:mobileW*-2.1/100}} resizeMode='contain' source={require("./Icon/bk.png")}></Image>
//           </TouchableOpacity>
//           <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, color: Colors.black_color, marginRight:mobileW*9/100}}>Preview Syllabus</Text>
//           <Text style={{ fontSize: mobileW * 3.3 / 100, fontFamily: Font.FontRegular, color: Colors.black_color, }}></Text>
//         </View>


//         <View style={{ alignSelf: 'center', width: mobileW * 94 / 100, }}>
//           <View style={styles.CourseDetailsCard}>
//             <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium, color: Colors.black_color }}>Course Details</Text>
//             <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
//               <View style={{ width: mobileW * 45 / 100, }}>
//                 <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Skills</Text>
//                 <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100, fontFamily: Font.FontRegular }}>Firebase</Text>
//               </View>
//               <View style={{ width: mobileW * 45 / 100, }}>
//                 <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Level</Text>
//                 <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100, fontFamily: Font.FontRegular }}>Basic</Text>
//               </View>
//             </View>
//             <View style={{ flexDirection: 'row', marginTop: mobileW * 2 / 100 }}>
//               <View style={{ width: mobileW * 45 / 100, }}>
//                 <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Duration</Text>
//                 <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100, fontFamily: Font.FontRegular }}>5 days</Text>
//               </View>
//               <View style={{ width: mobileW * 45 / 100, }}>
//                 <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, fontFamily: Font.FontMedium }}>Session Time</Text>
//                 <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100, fontFamily: Font.FontRegular }}>120</Text>
//               </View>
//             </View>
//           </View>

//           <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, marginLeft: mobileW * 1 / 100, fontFamily: Font.FontMedium, marginTop: mobileW * 5 / 100 }}>Syllabus Details</Text>




//                  <FlatList
//                      // showsHorizontalScrollIndicator={false}
//                      // horizontal={this.state.isHorizontal}
//                      contentContainerStyle={{ paddingBottom: 90 }}
//                      data={shouldShow}
//                      renderItem={({ item, index }) => {
//                         return (
//                            <View style={{
//                               width: '96%', alignSelf: 'center', borderWidth: 1,
//                               borderColor: '#ccc', marginTop: 20, }}>
//                               <View style={{
//                                  padding: 6, justifyContent: 'flex-start',
//                                  alignItems: 'flex-start', marginVertical: 5
//                               }}>
//                   <TouchableOpacity   style={{flexDirection: 'row',padding: 8, alignItems: "center"}}  onPress={() => question(index)}>
                                  
//                   <Image style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100, }}source={require('./Icon/icon_drapdown.png')}></Image>
//                   <Text style={styles.text2}>{item.title}</Text>
//                   </TouchableOpacity>
//                         {item.status == true && 
//                         <View style={{ flexWrap: 'wrap', width: '100%', alignSelf: 'center' }}>
//                                     <View style={{ borderColor: '#D0D7DE', width: '100%', borderWidth: 1, }}></View>
//                                     <Text>I am SubList</Text>
//                                     <Text>I am SubList</Text>
//                                     <Text>I am SubList</Text>
//                                  </View>
//                                  }
                                 
//                               </View>

//                            </View>
//                         )

//                      }}
//                    /> 



//  {/* <FlatList
//             data={shouldShow}
//             renderItem={({ item, index }) =>

//               <View style={[{ marginTop: mobileW * 3 / 100, marginBottom: mobileW * 1 / 100 }, styles.DrowpdownCard]}  >  
//                 <TouchableOpacity  onPress={() => question(index)}  style={{ height: mobileW * 10 / 100, borderWidth: mobileW * 0.1 / 100, paddingHorizontal: mobileW * 2 / 100, flexDirection: 'row', alignItems: 'center' }}>
//                   <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, }}
//                     source={require('./Icon/icon_drapdown.png')} ></Image>
//                   <Text style={[{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium, marginHorizontal: mobileW * 2 / 100, }]}>{item.title}</Text>
//                 </TouchableOpacity>

//                 {item.status== true&& 
//                   <View style={{}}>
//                     <FlatList
//                       data={item.items}
//                       horizontal={false}

//                       renderItem={({ item, index }) =>
//                         <View style={{ flexDirection: 'row', }}>

//                           <TouchableOpacity activeOpacity={0.8} style={{ padding: mobileW * 2 / 100, }}  >
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                               <Text style={[{ fontSize: mobileW * 4 / 100, color: Colors.gray, fontFamily: Font.FontRegular, }]}>{item.subtitle}</Text>
//                             </View>
//                           </TouchableOpacity>
//                         </View>
//                       }
//                       keyExtractor={item => item.id}
//                     />
//                   </View> }
//               </View>

//             }
//             keyExtractor={item => item.id}
//           />   */}

//         </View>


//         <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 8 }}>
//           <TouchableOpacity activeOpacity={0.8} style={{ width: mobileW * 43 / 100, height: mobileW * 12 / 100, backgroundColor: Colors.lightgray, marginHorizontal: mobileW * 1 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center' }}>
//             <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontFamily: Font.FontMedium }}>CLOSE</Text>
//           </TouchableOpacity>
//           <TouchableOpacity activeOpacity={0.8} style={{ width: mobileW * 43 / 100, height: mobileW * 12 / 100, backgroundColor: Colors.themecolor, marginHorizontal: mobileW * 1 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center' }}>
//             <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontFamily: Font.FontMedium }}>SUBMIT</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </View>
//   )
// }
// export default FirebaseTutorial;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   Header: {
//     backgroundColor: Colors.white_color,
//     width: mobileW,
//     height: mobileW * 13 / 100,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
 
//   CourseDetailsCard: {
//     backgroundColor: Colors.white_color,
//     elevation: 5,
//     shadowColor: '#000',
//     borderWidth: mobileW * 0.2 / 100,
//     borderColor: "#9f9f9f",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     padding: mobileW * 2 / 100,
//     paddingTop: mobileW * 4 / 100,
//     paddingBottom: mobileW * 4 / 100,
//     borderRadius: mobileW * 2 / 100
//   },
//   DrowpdownCard: {
//     backgroundColor: Colors.white_color,
//     elevation: 5,
//     shadowColor: '#000',
//     borderWidth: mobileW * 0.2 / 100,
//     borderColor: "#9f9f9f",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     // padding: mobileW * 2 / 100,
//     // paddingTop: mobileW * 4 / 100,
//     // paddingBottom: mobileW * 4 / 100,
//     // borderRadius: mobileW * 2 / 100
//   },
//   text2:{
//     fontSize:mobileW*4/100,
//     fontFamily:Font.FontRegular,
//     color:Colors.black_color,
//     marginHorizontal:mobileW*2/100

//   }
// })

// ============================================================================================================================================================




