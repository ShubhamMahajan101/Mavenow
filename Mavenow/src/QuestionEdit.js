import { SafeAreaView,Modal,Alert,ScrollView, StatusBar, Animated, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'

import { Colors } from './Provider/Colorsfont';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';


const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;







export default function QuestionEdit({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);

// const [removedata,setRemovedata] = useState([])
const [discData, setDiscData] = useState(route.params.data)
const [select, setSelect] =useState(null)
// const [category, setCategory] = useState(discData)
 console.log("all Data",discData);

//  setCategory()


  const Kaywords = route.params.data;
  const Level = route.params.mediumLevel;
  console.log("selected Keywords=========",Kaywords)
  console.log("selected Level=========",Level.label)

  // const handleRemove = (id,index) => {
  //   const Datalist = discData.filter((items) => items.id !== id);
   
  //   // setFilterLabTests(Datalist);
  //   setDiscData(Datalist)
  //   console.log("Remove item :- ",Datalist);
  
  // };
  // shouldShoww={()=> handleRemove(item.id,item.totalItemCount)}
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ marginHorizontal: mobileW * 5 / 100 }} >
              <Image style={styles.backIcon} resizeMode='contain'
                source={require("./Icon/icon_back.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.white_color, fontWeight: '500', fontSize: mobileW * 5 / 100 }}>Write Your Question</Text>
          </View> 

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('QuestionPage')} style={styles.EditButton}>
            <Image resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 5 / 100, tintColor: Colors.themecolor }}
              source={require("./Icon/ic_edit.png")}></Image>
            <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.themecolor }}>Edit</Text>
          </TouchableOpacity>

        </View>
        <View style={{ padding: mobileW * 5 / 100, }}>
          <Text style={{ fontSize: mobileW * 4.5 / 100, color: Colors.themecolor }}>Please post problem below, you will get instant solution soon!</Text>
          <View style={{ marginTop: mobileW * 4 / 100 }}>
            <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>Question</Text>
            <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, marginTop: mobileW * 1 / 100 }}>Web</Text>
          </View>
          <View style={{ marginTop: mobileW * 4 / 100 }}>
            <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>Main Category</Text>
            <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, marginTop: mobileW * 1 / 100 }}>html</Text>
          </View>
          <View style={{ marginTop: mobileW * 4 / 100 }}>
            <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>Main Skill</Text>
            <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, marginTop: mobileW * 1 / 100 }}>Design</Text>
          </View>
          <View style={{ marginTop: mobileW * 4 / 100 }}>
            <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>Level</Text>
            <Text style={{ color: Colors.black_color, fontSize: mobileW * 4 / 100, marginTop: mobileW * 1 / 100 }}>{Level.label}</Text>
          </View>
          <View style={{ marginTop: mobileW * 4 / 100 }}>
            <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>Please Select Your Main Skill</Text>
            {/* <Text style={{ color: Colors.gray, fontSize: mobileW * 4 / 100 }}>{level}</Text> */}
            {/* <TouchableOpacity ></TouchableOpacity> */}
            <Text style={{marginHorizontal:mobileW*1/100, color:Colors.black_color, fontWeight: '500', fontSize: mobileW * 3.5 / 100 }}>{Kaywords}</Text>


          </View>

          
          {/* <FlatList
            data={discData}
horizontal={true}
            renderItem={({ item, index }) =>
          <TouchableOpacity activeOpacity={0.8} onPress={() =>setSelect(item)}   style={[styles.selectSkill,{backgroundColor: item===select? Colors.themecolor:"#D0D0D0"},]}>
            <Text style={{marginHorizontal:mobileW*1/100, color: item===select? Colors.white_color:Colors.black_color, fontWeight: '500', fontSize: mobileW * 3.5 / 100 }}>{item.SkillName}</Text>
            <View >
              {item===select &&
            <Image resizeMode='contain' style={styles.crossIcon}
              source={require("./Icon/close2.png")}></Image>
            }
              </View>
          </TouchableOpacity>
            }/> */}

          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={styles.SubmitButton}>
            <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.white_color, fontWeight: '700' }}>SUBMIT</Text>
          </TouchableOpacity>

        {/* =========================================================== Model Open ======================================================== */}
          <View  >
<Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex:1, backgroundColor:'#00000090'}}>
        <View style={styles.ModelCard}>
          <View style={styles.ModelHeader}>
          <Text style={{color:Colors.white_color, fontSize:mobileW*5/100, fontWeight:'500'}}>Success</Text>
          </View>
          <View style={{alignItems:'center', padding:mobileW*3/100}}>
            <Text style={{color:Colors.dark_gray,fontSize:mobileW*4/100,fontWeight:'500'}}>Great!</Text>
            <Text style={{color:Colors.dark_gray,fontSize:mobileW*4/100,fontWeight:'500'}}>Sit back and relax!</Text>
            <Text style={{color:Colors.dark_gray,fontSize:mobileW*4/100,fontWeight:'500'}}>We will bring relevant Maven for you soon.</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}  style={styles.okButton}>
              <Text style={{fontSize:mobileW*5/100,color:Colors.white_color, fontWeight:'500'}}>Okay</Text>
            </TouchableOpacity>
          </View>
  
        </View>
        </View>
        </Modal>
</View>
        
        </View>
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
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  EditButton:{ 
    borderRadius: mobileW * 1 / 100, 
    width: mobileW * 15 / 100, 
    height: mobileW * 6 / 100, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    backgroundColor: Colors.white_color,
     marginRight: mobileW * 5 / 100 
    },
  SubmitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 12 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    marginTop: mobileW * 20 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    // borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  selectSkill: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mobileW * 5 / 100,
    backgroundColor: Colors.themecolor,
    
    padding: mobileW * 2.5 / 100,
    marginHorizontal:mobileW*1/100,
    borderRadius: mobileW * 1 / 100
  },
  crossIcon:{
    marginHorizontal:mobileW*2/100, 
    width: mobileW * 4 / 100, 
    height: mobileW * 4 / 100, 
    tintColor: Colors.white_color 
  },
  ModelCard:{
    width:mobileW*90/100,
    borderRadius:mobileW*3/100, 
    alignSelf:'center',
    marginTop:mobileH*25/100, 
    backgroundColor:Colors.white_color,
    elevation:5
  },
  ModelHeader:{
    width:mobileW*90/100,
    justifyContent:'center',
    alignItems:'center', 
    height:mobileW*15/100,
    borderTopLeftRadius:mobileW*2/100, 
    borderTopRightRadius:mobileW*2/100, 
    backgroundColor:Colors.themecolor
  },
  okButton:{
    marginTop:mobileW*5/100, 
    backgroundColor:Colors.themecolor,
    justifyContent:'center',
    alignItems:'center',
    width:mobileW*20/100,
    height:mobileW*10/100,
    borderRadius:mobileW*2/100
  },
}
)