import { View, Text ,StyleSheet,Image,Dimensions,TouchableOpacity, ScrollView} from 'react-native'
import { Stack, TextInput, } from "@react-native-material/core";
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont'
import PhoneInput from 'react-native-phone-number-input';
import { RadioButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;



const  UpdateMavenProfile=({navigation})=> {
  const [mobile, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [checked, setChecked] = React.useState('first');
 
  const phoneInput = useRef(null);
  return (
                 <View style={{flex:1}}>
                  <ScrollView>
           {/* ===============               HEADER ===================== */}
            <View style={styles.Header}>
             <TouchableOpacity activeOpacity={0.8} style={{marginHorizontal:mobileW*5/100}} onPress={()=>navigation.goBack()}>
             <Image style={styles.backIcon} resizeMode='contain'source={require("./Icon/icon_back.png")}></Image>
             </TouchableOpacity>
             <Text style={{color:Colors.white_color, marginHorizontal:mobileW*5/100, fontWeight:'500', fontSize:mobileW*5/100}}>Write Your Expertise</Text>
             <TouchableOpacity activeOpacity={0.8} style={{marginRight:mobileW*2/100}} >
             <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/icon_info.png")}></Image>
              </TouchableOpacity>
              </View>
              {/* ===============               HEADER ===================== */}
               <View style={{flexDirection:"row",justifyContent:"center",}}>
               <Image style={{tintColor:Colors.themecolor,alignSelf:"center",borderRadius:mobileW*15/100,borderColor:Colors.themecolor,width:mobileW*28/100,height:mobileW*28/100,borderWidth:mobileW*0.80/100,margin:mobileW*2/100}} source={require('./Icon/ic_coach_w.png')}/>
               <Image style={{tintColor:Colors.themecolor,alignSelf:"center",borderRadius:mobileW*15/100,borderColor:Colors.themecolor,width:mobileW*10/100,height:mobileW*10/100,borderWidth:mobileW*0.80/100,margin:mobileW*2/100,marginHorizontal:mobileW*5/100,marginLeft:mobileW*-11/100,marginBottom:mobileW*-12/100}} source={require('./Icon/ic_coach_w.png')}/>
                </View>

               {/*============================= TextInput */}
                <View style={{padding:mobileW*2.35/100}}>
                 <View  style={{ flexDirection:"column", }}>
                 <TextInput  color={Colors.themecolor} label="Full Name"  variant="outlined" trailing={props => (<Text></Text>)}/>
                 <TextInput  color={Colors.themecolor} label="Email"  variant="outlined" trailing={props => (<Text></Text>)}/>
                 </View>      
                  {/*============================= TextInput */}
                  
            <PhoneInput
              ref={phoneInput}
              //  defaultValue={phoneNumber}
              defaultCode="IN"
              layout="first"
              withShadow
              // autoFocus
              containerStyle={styles.containerstyle}
              textContainerStyle={{ paddingVertical: 0,paddingHorizontal:0,  borderRadius: mobileW * 10 / 100,color:Colors.themecolor }}
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
                setCountryCode(phoneInput.current?.getCountryCode() || '');
              }} />
 
         
          <View style={{marginTop:mobileW*2/100}}>
          <TextInput color={Colors.themecolor} style={{alignItems:"center",justifyContent:"center"}} label="Date of Birth"  variant="outlined" trailing={props => (<Text></Text>)}/>
          </View>

      {/*====================== Radio buton  */}
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <RadioButton value="first" color={Colors.themecolor} status={ checked === 'first' ? 'checked' : 'unchecked' } onPress={() => setChecked('first')}/>
      <Text>Male</Text>
      <RadioButton value="second"color={Colors.themecolor}status={ checked === 'second' ? 'checked' : 'unchecked' } onPress={() => setChecked('second')}/>
      <Text>Female</Text>
      </View>
      {/*====================== Radio buton  */}


       <View style={{marginTop:mobileW*2/100}}>
       <TextInput color={Colors.themecolor} borderRadius={mobileW*15/100} label="Profile  youtube video link"  variant="outlined" trailing={props => (<Text></Text>)}/>
       </View>
        </View>

        {/* //=== ==========================================   BUTTON */}
        <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:mobileW*4/100,}}>
        <View style={{backgroundColor:Colors.themecolor,width:mobileW*40/100,height:mobileW*15/100,borderRadius:mobileW*2/100}}>
        <TouchableOpacity><Text style={{color:Colors.white_color,fontSize:mobileW*5/100,alignSelf:'center',marginTop:mobileW*3/100}}>Cancel</Text></TouchableOpacity></View>
        <View style={{backgroundColor:Colors.themecolor,width:mobileW*40/100,height:mobileW*15/100,borderRadius:mobileW*2/100}}>
        <TouchableOpacity><Text style={{color:Colors.white_color,fontSize:mobileW*5/100,alignSelf:'center',marginTop:mobileW*4/100}}>Next</Text></TouchableOpacity></View>
        </View>
        </ScrollView>
        </View>
           )
           }

export default UpdateMavenProfile  
const styles = StyleSheet.create({
  
Header:{
  backgroundColor:Colors.themecolor, 
  width:mobileW, height:mobileW*15/100, 
  flexDirection:'row', 
  alignItems:'center',
  justifyContent:'space-between'
},
backIcon:{ 
  width: mobileW * 6 / 100, 
  height: mobileW * 8 / 100, 
  tintColor: Colors.white_color 
},
phoneView: {
 justifyContent: 'center',
  height: mobileW * 13 / 100,
  width:mobileW*97/100,
  backgroundColor: Colors.white_color,
  borderRadius: mobileW * 5 / 100,
  // elevation: 1,
  shadowColor: '#000',
  borderWidth: mobileW*1/100,
  // shadowOpacity: 0.1,
  shadowOffset: { width: 0, },
  shadowOpacity: 0.1,
  // borderColor: Colors.gray,
  // borderWidth: mobileW*0.70/100,
},
containerstyle: {


  height: mobileW * 15 / 100,
  // backgroundColor: Colors.white_color,
  width:mobileW*95/100,
  marginTop:mobileW*2/100,
  borderRadius:mobileW*1/100,
  // elevation: 1,
  // shadowColor: '#000',
  // borderColor: "#e8edfb",
   borderColor: Colors.gray,
  borderWidth: mobileW*0.15/100,
  // shadowOpacity: 0.1,
  // shadowOffset: { width: 0, },
  // shadowOpacity: 0.1,
 
},

})
