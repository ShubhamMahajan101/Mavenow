import { View, Text ,StyleSheet,Image,Dimensions,TouchableOpacity, ScrollView, ImageBackground, YellowBox,Alert,Modal,FlatList} from 'react-native'
import { Stack, TextInput, } from "@react-native-material/core";
import { StatusBar } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont'
import { Share } from 'react-native';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
const DATA_3 = [
  {
    id: 'bd7acbea-c1b1-4dddd6c2-aed5-3ad53abb28ba',
    title: 'First Item  here     ',
    skills: "Automation testing (Basic)   ",
    Category: 'Testing',
    start_Date: 'Dec 07,2022',
    End_Date: 'Dec 11,2021',
    class_name: "Automation testing"
  },
  {
    id1: 'bd7acbea-c1b1-4dddd6c2-aed5-3ad53abb28ba',
    title: 'First Item  here     ',
    skills: "Automation testing (Basic)   ",
    Category: 'Testing',
    start_Date: 'Dec 07,2022',
    End_Date: 'Dec 11,2021',
    class_name: "Automation testing"
  },
  {
    id2: 'bd7acbea-c1b1-4dddd6c2-aed5-3ad53abb28ba',
    title: 'First Item  here     ',
    skills: "Automation testing (Basic)  ",
    Category: 'Testing',
    start_Date: 'Dec 07,2022',
    End_Date: 'Dec 11,2021',
    class_name: "Automation testing"
  },
  {
    id3: 'bd7acbea-c1b1-4dddd6c2-aed5-3ad53abb28ba',
    title: 'First Item  here     ',
    skills: "Automation testing (Basic)  ",
    Category: 'Testing',
    start_Date: 'Dec 07,2022',
    End_Date: 'Dec 11,2021',
    class_name: "Automation testing"
  },
  {
    id4: 'bd7acbea-c1b1-4dddd6c2-aed5-3ad53abb28ba',
    title: 'First Item  here     ',
    skills: "Automation testing (Basic)  ",
    Category: 'Testing',
    start_Date: 'Dec 07,2022',
    End_Date: 'Dec 11,2021',
    class_name: "Automation testing"
  },





];

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    Sales: 'Sales(Basic)',
    Autamation: 'Automation testing(Basic)',
    Personal: 'Personal',
    Achievement:2,
    SessionComplete:5,
    ActiveSession:2,
    Learner:0

  },
 
];


const DATA_DialogBox = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Gaurav',
    Maven:"Maven",
    image: require('./Icon/icon_maven.png'),
    Date: '0-07-2022',
    skills: 'As a student  skill kotlin (medium)',
    session : '0 Session',
  },
  
];
const MyLearnerProfile=({navigation})=> {
    const [shouldShow1,SetShouldShow1]=useState("Rating")
    const [shouldShow2,SetShouldShow2]=useState("right")
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);


    const onShare = async () => {
      console.log("sssss")
      try {
          const result = await Share.share({
              message: Platform.OS === "android" ?
                  'https://play.google.com/store/search?q=trulinco&c=apps' :
                  "https://apps.apple.com/in/app/trulinco/id1583020135",
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
      } catch (error) {
          alert(error.message);
      }
  };
  
  
  return (
    <View style={{flex:1}}>
        <SafeAreaView style={{flex:1}}>
{/* <StatusBar barStyle = "light-content" hidden = {false} backgroundColor="#00959e"translucent = {true}/> */}
             <View style={styles.Header}>
<View style={{flexDirection:"row",}}>
     <TouchableOpacity activeOpacity={0.8} style={{marginHorizontal:mobileW*2/100}} onPress={()=>navigation.goBack()}>
            <Image style={styles.backIcon} resizeMode='contain'
               source={require("./Icon/icon_back.png")}></Image>
           </TouchableOpacity>
<Text style={{color:Colors.white_color,  fontSize:mobileW*5/100,marginHorizontal:mobileW*6/100}}>MyLearnerProfile</Text>
</View>
<View style={{flexDirection:"row"}}>
<TouchableOpacity activeOpacity={0.8}  onPress={()=>setModalVisible(true)}>
<Image style={styles.backIcon} resizeMode='contain'
               source={require("./Icon/icon_info.png")}></Image>
                </TouchableOpacity>
<TouchableOpacity activeOpacity={0.8} style={{marginRight:mobileW*2/100}} onPress={()=>navigation.navigate('UpdateMavenn_Profile')}>
             <Image style={styles.edit_Icon}  resizeMode="stretch"
               source={require("./Icon/ic_edit.png")}></Image>
           </TouchableOpacity>
           </View>
</View>
                 {/*======================================////// HEADER */}






                 {/* ----------------------------------------------------------------------------------model */}
                 <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex:1,alignSelf:"center",marginTop:mobileW*25/100,}}>
      
                          <View style={{backgroundColor:Colors.themecolor,height:mobileW*9/100,}}>
                <View style={{flexDirection:"row",justifyContent:"flex-end",justifyContent:"space-between"}} >
                  <Text></Text>
              <Text style={{color:Colors.white_color,marginTop:mobileW*2/100,fontSize:mobileW*3.80/100}}>Help : Profile</Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image style={{width:mobileW*5.20/100,height:mobileW*5.20/100,tintColor:Colors.whiteColor,marginTop:mobileW*2/100,marginRight:mobileW*3/100}} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
              </TouchableOpacity>
              </View>
              </View>
            <View style={{backgroundColor:Colors.whiteColor,elevation:mobileW*3/100,padding:mobileW*3/100,borderBottomRightRadius:mobileW*1/100,borderBottomLeftRadius:mobileW*1/100,height:mobileW*100/100,textAlign:"center"}}>
 <ScrollView>
              <Text style={{color:Colors.gray}}>Kalam earned a degree in aeronautical engineering from the
                 Madras Institute of Technology and in 1958 joined the Defence Research and Development
                  Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
                   and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
        rn him the ni
                Organisation (DRDO). In 1969 he moved to the Indian
                 Space Research Organisation, where he
                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
                   and produced in India. Rejoining DRDO 
                   in 1982, Kala
                   m planned the program that produced a number
                   ganisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
                   and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
        rn him the ni
                Organisation (DRDO). In 1969 he moved to the Indian
                 Space Research Organisation, where he
                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
                   and produced in India. Rejoining DRDO 
                   in 1982, Kala
                   m planned the progra
                   ganisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
                   and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
        rn him the ni
                Organisation (DRDO). In 1969 he moved to the Indian
                 Space Research Organisation, where he
                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
                   and produced in India. Rejoining DRDO 
                   in 1982, Kala
                   m planned the progra
                   ganisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
                   and produced in India. Rejoining DRDO in 1982, Kalam planned the program that produced a number
        rn him the ni
                Organisation (DRDO). In 1969 he moved to the Indian
                 Space Research Organisation, where he
                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
                   and produced in India. Rejoining DRDO 
                   in 1982, Kala
                   m planned the progra

                   of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first 
                   intermediate-range ballistic missile, which incorporated aspect
                     SLV-III and was launched in 1989.</Text>
                </ScrollView>
                </View>
          </View>
        
      </Modal>
      </View>
                 {/* ----------------------------------------------------------------------------------model */}
                   {/* ----------------------------------------------------------------------------------model */}
                   <View  >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}
      >
        <View style={{flex:1,alignSelf:"center",marginTop:mobileW*25/100,padding:mobileW*10/100,}}>
      
      
         
        
              {/* <FlatList 
                                    data={DATA_DialogBox }
                                   renderItem={({ item }) => */}
                                   <View style={{backgroundColor:"red",borderRadius:mobileW*4/100,borderBottomEndRadius:mobileW*4/100}} >
                                           <View style={{backgroundColor:Colors.themecolor,height:mobileW*20/100,borderTopLeftRadius:mobileW*3/100,borderTopRightRadius:mobileW*3/100}}>
            
            
           
       
            <Image style={{width:mobileW*42/100,height:mobileW*15/100,alignSelf:"flex-end",marginRight:mobileW*2/100}} resizeMode='contain' source={require("./Icon/new_logo_mavenow.png")}></Image>
           

            </View>
 <View style={{marginTop:mobileW*-3/100,backgroundColor:Colors.whiteColor,elevation:mobileW*4/100,textAlign:"center",width:mobileW*78/100,borderRadius:mobileW*0/100,borderRadius:mobileW*4/100}}>
                                  
                                   <View style={{flexDirection:"row"}}>
                                   <View style={styles.imageCard2}>
                                                  {/* <Image style={styles.imageIcon2} resizeMode='contain'
                                                      source={item.image}></Image> */}
            <Image style={styles.imageIcon2} resizeMode='contain' source={require('./Icon/icon_maven.png')}></Image>
                                              </View>
                   
                                              <Text style={{color:Colors.blackColor,marginTop:mobileW*4/100}}>Gaurav</Text>    
                                              <Text style={{color:Colors.themecolor,marginTop:mobileW*4/100,marginHorizontal:mobileW*2/100}}>Maven</Text>    
                  
                                {/* <Text style={{color:Colors.blackColor}}> {item.name}</Text> */}
                                {/* <Text style={{color:Colors.themecolor,marginHorizontal:mobileW*1/100}}>{item.Maven}</Text> */}
                                </View>
                                <View style={{flexDirection:"row",marginTop:mobileW*0/100,alignSelf:"center",marginRight:mobileW*11/100}}>
                        <TouchableOpacity>
                        <Image style={{width:mobileW*4/100,height:mobileW*4/100,tintColor:Colors.gray}}  resizeMode='contain'
                      source={require("./Icon/rating_emty.gif")}/>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={{width:mobileW*4/100,height:mobileW*4/100,tintColor:Colors.gray}}  resizeMode='contain'
                      source={require("./Icon/rating_emty.gif")}/>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={{width:mobileW*4/100,height:mobileW*4/100,tintColor:Colors.gray}}  resizeMode='contain'
                      source={require("./Icon/rating_emty.gif")}/>
                      </TouchableOpacity>
                        <Image style={{width:mobileW*4/100,height:mobileW*4/100,tintColor:Colors.gray}}  resizeMode='contain'
                      source={require("./Icon/rating_emty.gif")}/>
                         <TouchableOpacity>
                        <Image style={{width:mobileW*4/100,height:mobileW*4/100,tintColor:Colors.gray}}  resizeMode='contain'
                      source={require("./Icon/rating_emty.gif")}/>
                      </TouchableOpacity>
                    
                      </View>
                                <View style={{padding:mobileW*3/100}}>
                                <Text style={{color:Colors.blackColor,marginTop:mobileW*4/100}}>About</Text>
                                <Text style={{color:Colors.gray,}}>I am gaurav pathak</Text>
                                <View style={{marginTop:mobileW*3/100}}>
                                 <Text style={{color:Colors.blackColor,}}>joinining date</Text>
                                 <Text style={{color:Colors.gray}}>2-5-2002</Text>
                                 {/* <Text style={{color:Colors.themecolor,}}>{item.Date}</Text> */}
                                 </View>
                                 <View style={{marginTop:mobileW*2/100}} >
                <Text style={{fontSize:mobileW*4/100, color:Colors.black_color}}>Skills</Text>
                <Text style={{fontSize:mobileW*3/100, color:Colors.gray}}>dance</Text>
                {/* <Text style={{fontSize:mobileW*3/100, color:Colors.gray}}>{item.skills}</Text> */}
                </View>
                <View style={{marginTop:mobileW*3/100}}>
                <Text style={{color:Colors.black_color,}}>Completed sesssion</Text>
                <Text style={{color:Colors.gray,}}>0 Session</Text>

                                 {/* <Text style={{color:Colors.themecolor}}>{item.session}</Text> */}

</View>


</View>
<View style={{backgroundColor:Colors.themecolor,borderBottomLeftRadius:mobileW*3/100,height:mobileW*11/100,borderBottomRightRadius:mobileW*3/100, justifyContent:'center'}}>
  <View style={{flexDirection:"row",alignItems:'center',justifyContent:"space-between",}}>
    <View style={{flexDirection:"row", alignItems:'center',}}>
      <TouchableOpacity activeOpacity={0.8} style={{width:mobileW*5/100,marginHorizontal:mobileW*3/100, height:mobileW*5/100, backgroundColor:Colors.white_color,alignItems:'center', borderRadius:mobileW*4/100,justifyContent:'center'}}>
    <Image resizeMode='contain' style={{width:mobileW*3.5/100,height:mobileW*3.5/100,backgroundColor:Colors.white_color,tintColor:Colors.themecolor, borderRadius:mobileW*4/100,}}  
               source={require("./Icon/facebook_icon.png")}></Image>
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.8} style={{width:mobileW*5/100, height:mobileW*5/100, backgroundColor:Colors.white_color,alignItems:'center', borderRadius:mobileW*4/100,justifyContent:'center'}}>
    <Image resizeMode='contain' style={{width:mobileW*3/100,height:mobileW*3/100,backgroundColor:Colors.white_color,tintColor:Colors.themecolor }}  
               source={require("./Icon/linkedin.png")}></Image>
               </TouchableOpacity>
 
               <TouchableOpacity activeOpacity={0.8} style={{width:mobileW*5/100, marginHorizontal:mobileW*3/100,height:mobileW*5/100, backgroundColor:Colors.white_color,alignItems:'center', borderRadius:mobileW*4/100,justifyContent:'center'}}>
    <Image resizeMode='contain' style={{width:mobileW*3/100,height:mobileW*3/100,backgroundColor:Colors.white_color,tintColor:Colors.themecolor }}  
               source={require("./Icon/twitter.png")}></Image>
               </TouchableOpacity>
  </View>
    <Text style={{color:Colors.white_color,fontSize:mobileW*3.5/100,fontWeight:'500', marginRight:mobileW*3/100}}>www,navenow.com</Text>


</View>
</View>

<Text style={{color:Colors.blackColor,alignSelf:"center",marginTop:mobileW*2/100}}>This will share your Mavenow profile</Text>
<View style={{flexDirection:"row",justifyContent:"space-around",margin:mobileW*3/100}}>

  <View style={{backgroundColor:Colors.themecolor,width:mobileW*22/100,height:mobileW*6/100,borderRadius:mobileW*1/100,justifyContent:"center",alignItems:"center"}}>
  <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)}>
    <Text style={{color:Colors.whiteColor,alignSelf:"center",}}>Cancel</Text>
    </TouchableOpacity>
    </View>
   
  <View style={{backgroundColor:Colors.themecolor,width:mobileW*22/100,height:mobileW*6/100,borderRadius:mobileW*1/100,justifyContent:"center",alignItems:"center"}}>
 <TouchableOpacity onPress={()=>onShare()}>
    <Text style={{color:Colors.whiteColor}}>Share</Text>
  </TouchableOpacity>
    </View>
    

</View>
</View>
 </View>            
 {/* }/>      */}

           
              



        
   
 

                </View>
          {/* </View> */}
        
      </Modal>
      </View>
                 {/* ----------------------------------------------------------------------------------model */}
                 <View style={{backgroundColor:Colors.light_cyan,}}>
                  <View style={{alignSelf:"flex-end",}}>
                    <Text style={{fontSize:mobileW*3/100,margin:mobileW*1/100, color:Colors.black_color}} >Join Date 15,5,2015 </Text>
                    </View>

<View style={{}} >  
<FlatList 
               data={DATA}
                                 renderItem={({ item }) =>
                             <View>
                              <View style={{flexDirection:"row",alignSelf:"center"}}>
  <View style={{width:mobileW*19/100,}}>
  <View style={styles.imageCard}>
                        <Image style={styles.mavenImage}  resizeMode='contain'
                      source={require("./Icon/icon_maven.png")}></Image>
                     </View>
                     <Text style={{alignSelf:"center",marginTop:mobileW*1/100,color:Colors.blackColor}}>gaurav</Text>
                     <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:mobileW*1/100}}>
                        <TouchableOpacity>
                        <Image style={{width:mobileW*3.8/100,height:mobileW*3.8/100}}  resizeMode='contain'
                      source={require("./Icon/rating_emty.gif")}/>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={{width:mobileW*3.8/100,height:mobileW*3.8/100}}  resizeMode='contain'
                      source={require("./Icon/rating_emty.gif")}/>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={{width:mobileW*3.8/100,height:mobileW*3.8/100}}  resizeMode='contain'
                         source={require("./Icon/rating_emty.gif")}/>
                        </TouchableOpacity>
                        <Image style={{width:mobileW*3.8/100,height:mobileW*3.8/100}}  resizeMode='contain'
                        source={require("./Icon/rating_emty.gif")}/>
                        <TouchableOpacity>
                        <Image style={{width:mobileW*3.8/100,height:mobileW*3.8/100}}  resizeMode='contain'
                      source={require("./Icon/rating_emty.gif")}/>
                      </TouchableOpacity>
                    
                      </View>
  </View>
  <View style={{width:mobileW*79/100,}}>
    {/* <View>
    <Text style={{color:Colors.blackColor,fontSize:mobileW*3/100}}>hi I want to teach you testing</Text>
    <TouchableOpacity activeOpacity={0.8}  onPress={()=>setModalVisible1(true)} style={{marginTop:mobileW*2/100}}>
                          <Image style={styles.share_icon}  resizeMode='contain' source={require("./Icon/share.png")}></Image>
                          </TouchableOpacity>
    </View> */}
<View style={{flexDirection:"row",marginTop:mobileW*12/100,marginHorizontal:mobileW*2/100}}>
  <View style={{width:mobileW*19.7/100}}>
  <TouchableOpacity  activeOpacity={0.8} onPress={()=>navigation.navigate('Badges')} style={{alignItems:"center",marginTop:mobileW*2/100}}>
               <Image style={{width:mobileW*5/100,height:mobileW*5/100,tintColor:Colors.themecolor,}}   resizeMode='contain'
               source={require("./Icon/ic_reward_w.png")}></Image>
              <Text style={{color:Colors.blackColor,alignSelf:'center'}}>{item.Achievement}</Text>
                <Text style={{fontSize:mobileW*3/100,color:Colors.blackColor}}>Achievement </Text>
               </TouchableOpacity>
  </View>
  <View style={{width:mobileW*19.8/100,}}>
  <TouchableOpacity  activeOpacity={0.8} style={{alignItems:"center",marginTop:mobileW*2/100}} >
               <Image style={{width:mobileW*5/100,height:mobileW*5/100,tintColor:Colors.themecolor,}}   resizeMode='contain'
               source={require("./Icon/Session_Completed.png")}></Image>
               <Text style={{color:Colors.blackColor,alignSelf:'center'}}>{item.SessionComplete}</Text>
                <Text style={{fontSize:mobileW*3/100,textAlign:"center",color:Colors.blackColor}}>Session Completed</Text>
               </TouchableOpacity>
  </View>
  <View style={{width:mobileW*19.7/100}}>
  <TouchableOpacity  activeOpacity={0.8} style={{alignItems:"center",marginTop:mobileW*2/100}} >
               <Image style={{width:mobileW*5/100,height:mobileW*5/100,tintColor:Colors.themecolor,}}   resizeMode='contain'
               source={require("./Icon/icon_info.png")}></Image>
               <Text style={{color:Colors.blackColor,alignSelf:'center'}}>{item.ActiveSession}</Text>
                <Text style={{fontSize:mobileW*3/100,textAlign:"center",color:Colors.blackColor}}>Active Session</Text>
               </TouchableOpacity>
  </View>
  <View style={{width:mobileW*19.8/100,}}>
  <TouchableOpacity  activeOpacity={0.8} style={{alignItems:"center",marginTop:mobileW*2/100}} >
               <Image style={{width:mobileW*5/100,height:mobileW*5/100,tintColor:Colors.themecolor,}}   resizeMode='contain'
               source={require("./Icon/icon_student.png")}></Image>
               <Text style={{color:Colors.blackColor,alignSelf:'center'}}>{item.Learner}</Text>
                <Text style={{fontSize:mobileW*3/100,textAlign:"center",color:Colors.blackColor}}>Learner</Text>
               </TouchableOpacity>
  </View>
</View>


  
</View>
</View>
                               <Text style={{color:Colors.gray,fontSize:mobileW*3/100,padding:mobileW*2/100}}>Skills</Text>
                               <View style={{flexDirection:"row",padding:mobileW*2/100}}>
                                     <View >
                                       
                                     <Text style={{fontSize:mobileW*3.5/100, color:Colors.blackColor,}}>{item.Sales}</Text>

                                     <Text style={{fontSize:mobileW*3.5/100, color:Colors.blackColor,marginTop:mobileW*2/100}}>{item.Autamation}</Text>
                                     <Text style={{fontSize:mobileW*3.5/100, color:Colors.blackColor,marginTop:mobileW*2/100}}>{item.Personal}</Text>
                                     
                                     </View>
                                     <Image style={{width:mobileW*8/100,height:mobileW*8/100,alignSelf:"center",marginLeft:mobileW*15/100}}   resizeMode='contain'
               source={require("./Icon/you_tube.png")}></Image>
               </View>
                              </View>
                                    }/> 
                                     
                          {/* <Image style={{width:mobileW*10/100,height:mobileW*10/100,alignSelf:"center",marginRight:mobileW*15/100}}   resizeMode='contain'
               source={require("./Icon/you_tube.png")}></Image> */}
              
              



        
   
</View> 
 </View>





  <View style={{flexDirection:"row",alignSelf:"center",}}>
<TouchableOpacity style={{marginTop:mobileW*2/100,backgroundColor:shouldShow1==='Rating'?Colors.themecolor:Colors.light_cyan,width:mobileW*49/100,height:mobileW*10/100,borderBottomLeftRadius:mobileW*3/100}}  onPress={() => SetShouldShow1('Rating')}> 
<Text style={{alignSelf:"center",marginTop:mobileW*2/100,color:shouldShow1==='Rating'?Colors.white_color:Colors.blackColor}}>Rating & Review</Text>
</TouchableOpacity>

<TouchableOpacity style={{marginTop:mobileW*2/100,backgroundColor:shouldShow1==='About'?Colors.themecolor:Colors.light_cyan,width:mobileW*49/100,height:mobileW*10/100,borderBottomRightRadius:mobileW*3/100}}  onPress={() => SetShouldShow1("About")}>
<Text style={{alignSelf:"center",marginTop:mobileW*2/100,color:shouldShow1==='About'?Colors.white_color:Colors.blackColor}}>About Me</Text>
</TouchableOpacity> 

 

</View>
{shouldShow1=='About'&&
<View>
  {shouldShow2=="right" ?
  <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:mobileW*2/100}}>
  <TextInput color={Colors.themecolor} editable={false} style={{width:mobileW*85/100,height:mobileW*5/100,borderBottomWidth:mobileW*1/100,borderBottomColor:Colors.themecolor}}
  placeholder="write"
  />
  <TouchableOpacity onPress={()=>SetShouldShow2('write')}>
    <Image style={{width:mobileW*6/100,height:mobileW*6/100,tintColor:Colors.blackColor}}  resizeMode='contain'
               source={require("./Icon/ic_edit.png")}></Image>
</TouchableOpacity>
</View>:
<View style={{flexDirection:"row",justifyContent:"space-around",marginTop:mobileW*2/100}}>
  <View style={{width:mobileW*85/100,height:mobileW*5/100,}}>
  <TextInput color={Colors.themecolor} style={{width:mobileW*85/100,height:mobileW*5/100,borderBottomWidth:mobileW*1/100,borderBottomColor:Colors.themecolor}}
  placeholder="write"
  />
  </View>

  <TouchableOpacity onPress={()=>SetShouldShow2('right')} 
  style={{ width:mobileW*7/100,height:mobileW*7/100,backgroundColor:Colors.themecolor,alignItems:"center",justifyContent:"center",borderRadius:mobileW*4/100}}>
  <Image style={{width:mobileW*4/100,height:mobileW*4/100,tintColor:Colors.whiteColor}}
           source={require("./Icon/check.png")}></Image>
</TouchableOpacity>
</View>
  }
  </View>
  }
  {/* { Rating==} */}
  {shouldShow1 == 'Rating' &&
        <ScrollView>
          <View>

            <FlatList
              data={DATA_3}
              renderItem={({ item }) =>
                <View>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AutomationTesingScreen')} style={{ backgroundColor: Colors.white_color, elevation: 1, width: mobileW * 95 / 100, alignSelf: 'center', borderRadius: mobileW * 1 / 100, marginTop: mobileW * 2 / 100, padding: mobileW * 2 / 100 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                      <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100 }}>Overall Rating</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: mobileW * 5 / 100 }}>
                        <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray, }} resizeMode='contain' source={require("./Icon/rating_emty.gif")} />
                        <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/rating_emty.gif")} />
                        <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/rating_emty.gif")} />
                        <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/rating_emty.gif")} />
                        <Image style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, tintColor: Colors.gray }} resizeMode='contain' source={require("./Icon/rating_emty.gif")} />

                      </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1 / 100 }}>
                      <View style={{ width: mobileW * 20 / 100 }}>
                        <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>Class Name</Text>
                      </View>
                      <View style={{ width: mobileW * 75 / 100 }}>
                        <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100 }}>{item.class_name}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1 / 100 }}>
                      <View style={{ width: mobileW * 20 / 100 }}>
                        <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>Skills</Text>
                      </View>
                      <View style={{ width: mobileW * 75 / 100 }}>
                        <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100 }}>{item.skills}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: mobileW * 1 / 100 }}>
                      <View style={{ width: mobileW * 20 / 100 }}>
                        <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>Category</Text>
                      </View>
                      <View style={{ width: mobileW * 75 / 100 }}>
                        <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100 }}>{item.Category}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: mobileW * 1 / 100 }}>
                      <View>
                        <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>Start Date</Text>
                        <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100 }}>{item.start_Date}</Text>
                      </View>
                      <View>
                        <Text style={{ color: Colors.gray, fontSize: mobileW * 3 / 100 }}>End Date</Text>
                        <Text style={{ color: Colors.blackColor, fontSize: mobileW * 3.5 / 100 }}>{item.End_Date}</Text>
                      </View>
                    </View>


                  </TouchableOpacity>
                </View>
                ///////////////////////////////////////////////////////////////////////////////////////////2nd time data  came to flat list
              } />


          </View>

        </ScrollView>
}

</SafeAreaView>

</View>
)
};
export default  MyLearnerProfile  
const styles=StyleSheet.create({
Header:{
    backgroundColor:Colors.themecolor, 
    width:mobileW, height:mobileW*15/100, 
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'space-between'
  },
  backIcon:{ 
    width: mobileW * 6 / 100, 
    height: mobileW * 6 / 100, 
    tintColor: Colors.white_color 
  },
  edit_Icon:{ 
    width: mobileW * 5/ 100, 
    height: mobileW * 7 / 100, 
    tintColor: Colors.white_color ,
    alignSelf:"center",
    marginHorizontal:mobileW*3/100
  },
  share_icon:{ 
    width: mobileW * 5 / 100, 
    height: mobileW * 5 / 100, 
    tintColor: Colors.green_color,
    marginTop:mobileW*1/100,
    
   
    

  
  },
  edit_backIcon:{ 
    width: mobileW * 6 / 100, 
    height: mobileW * 8 / 100, 
    tintColor: Colors.white_color,
    marginHorizontal:mobileW*2/100 
  },
  learner_icon:{ 
    width: mobileW * 15 / 100, 
    height: mobileW * 15 / 100, 
    tintColor: Colors.themecolor,
    alignSelf:"center",
    borderWidth:mobileW*0.25/100,
    borderColor:Colors.themecolor,
    borderRadius:mobileW*10/100,
    marginTop:mobileW*-2/100

    

  },
  
  
  
  learner_icon2:{ 
    width: mobileW * 15 / 100, 
    height: mobileW * 15 / 100, 
    tintColor: Colors.themecolor,
    alignSelf:"center",
    borderWidth:mobileW*0.25/100,
    borderColor:Colors.themecolor,
    borderRadius:mobileW*10/100,
    marginTop:mobileW*-2/100

    

  },customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 0,
  },
  imageCard:{
    width:mobileW*18/100,
    height:mobileW*18/100,
    borderRadius:mobileW*10/100,
    borderWidth:mobileW*0.6/100,
    borderColor:Colors.themecolor, 
    alignItems:'center',
    justifyContent:'center',


  },
  imageCard2:{
    width:mobileW*17/100,
    height:mobileW*17/100,
    borderRadius:mobileW*10/100,

    // borderColor:Colors.themecolor, 
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:mobileW*3/100,
    marginTop:mobileW*-7/100,
    backgroundColor:Colors.white_color,
    elevation:mobileW*2/100
  },
  imageIcon: {
    width: mobileW * 12 / 100,
    height: mobileW * 12 / 100,
    tintColor: Colors.themecolor,
    marginHorizontal: mobileW * 2 / 100
},
imageIcon2: {
  width: mobileW * 13 / 100,
  height: mobileW * 13 / 100,
  tintColor: Colors.themecolor,
  marginHorizontal: mobileW * 2 / 100
},
  mavenImage:{
    width:mobileW*16/100,
    height:mobileW*16/100,
    borderRadius:mobileW*8/100, 
    tintColor:Colors.themecolor
  },
  
    
    
})