import { View,ScrollView,StatusBar,Modal,Alert,FlatList, Text,TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
  {
    id: 1,
    image: require('./Icon/icon_notification.png'),
    title:'Feedback Notification',
    description:'Your classes of Automation testion has been completed successfully. Please submit reviews for vinay ',
  },
  {
    id: 2,
    image: require('./Icon/ic_coach_w.png'),
    title:'Request joined by participant',
    description:'Your classes of Automation testion has been completed successfully. Please submit reviews for vinay ',
  },
  {
    id: 2,
    image: require('./Icon/icon_learner_strok.png'),
    title:'Your request has been rejected',
    description:'Your classes of Automation testion has been completed successfully. Please submit reviews for vinay ',
  },
]


export default function LearnerNotification({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, }}>
    <SafeAreaView style={{ flex: 1,backgroundColor:Colors.white_color }}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ={Colors.themecolor} />
         {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
         <View style={styles.Header}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
     <TouchableOpacity activeOpacity={0.8} style={{marginHorizontal:mobileW*5/100}} onPress={()=>navigation.goBack()}>
            <Image style={styles.backIcon} resizeMode='contain'
               source={require("./Icon/icon_back.png")}></Image>
           </TouchableOpacity>
<Text style={{color:Colors.white_color, marginHorizontal:mobileW*5/100, fontWeight:'500', fontSize:mobileW*5/100}}>Notification</Text>
</View>
<TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}  style={{marginRight:mobileW*2/100}} >
            <Image style={styles.backIcon} resizeMode='contain'
               source={require("./Icon/icon_info.png")}></Image>
           </TouchableOpacity>
</View>
<View  >
<Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{width:mobileW*90/100,borderRadius:mobileW*3/100,marginTop:mobileH*35/100, alignSelf:'center', backgroundColor:Colors.white_color,elevation:5}}>
          <View style={{width:mobileW*90/100,justifyContent:'space-between',flexDirection:'row', alignItems:'center', height:mobileW*15/100,borderTopLeftRadius:mobileW*2/100, borderTopRightRadius:mobileW*2/100, backgroundColor:Colors.themecolor}}>
          <Text style={{color:Colors.white_color, fontSize:mobileW*5/100, fontWeight:'500'}}></Text>
          <Text style={{color:Colors.white_color, fontSize:mobileW*5/100, fontWeight:'500'}}>Learner Notification</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{marginRight:mobileW*2/100}} >
            <Image style={styles.backIcon} resizeMode='contain'
               source={require("./Icon/close2.png")}></Image>
           </TouchableOpacity>
          </View>
          <ScrollView>
          <View style={{alignItems:'center', padding:mobileW*3/100}}>
            
            <Text style={{color:Colors.dark_gray,fontSize:mobileW*4/100,fontWeight:'500'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
           

            </Text>
          </View>
          </ScrollView>
        </View>
        </Modal>
</View>

<ScrollView style={{}}>
<FlatList
            data={DATA}
            renderItem={({ item, index }) =>
          <View>
            <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:Colors.light_cyan,padding:mobileW*2/100, width:mobileW*98/100,  margin:mobileW*1/100, flexDirection:'row',alignItems:'center'}}>
    <View style={{width:mobileW*16/100,height:mobileW*16/100,borderRadius:mobileW*15/100,alignItems:'center',justifyContent:'center', backgroundColor:Colors.themecolor}}>
    <Image resizeMode='contain' style={{width:mobileW*8/100, height:mobileW*8/100}} 
    source={item.image}></Image>
    </View>
    <View style={{ width:mobileW*76/100, padding:mobileW*3/100}}>
    <Text style={{fontSize:mobileW*4/100,color:Colors.black_color, fontWeight:'500' }}>{item.title}</Text>
    <Text style={{fontSize:mobileW*3.2/100,color:Colors.gray, fontWeight:"500"  }}>{item.description}</Text>
    </View>
</TouchableOpacity> 
          </View>
          }
           keyExtractor={item => item.id}/>
          </ScrollView>
{/* 
<TouchableOpacity activeOpacity={0.8} style={{backgroundColor:Colors.light_cyan,padding:mobileW*2/100, width:mobileW*98/100,  margin:mobileW*1/100, flexDirection:'row',alignItems:'center'}}>
    <View style={{width:mobileW*18/100,height:mobileW*18/100,borderRadius:mobileW*15/100,alignItems:'center',justifyContent:'center', backgroundColor:Colors.themecolor}}>
    <Image resizeMode='contain' style={{width:mobileW*10/100, height:mobileW*10/100}} 
    source={require('./Icon/icon_notification.png')}></Image>
    </View>
    <View style={{ width:mobileW*76/100, padding:mobileW*3/100}}>
    <Text style={{fontSize:mobileW*4/100,color:Colors.black_color, fontWeight:'500' }}>Feedback Notification</Text>
    <Text style={{fontSize:mobileW*3.2/100,color:Colors.gray, fontWeight:"500"  }}>Your classes of Automation testion has been completed successfully. Please submit reviews for vinay </Text>
    </View>
</TouchableOpacity> */}
            </SafeAreaView>
            </View>
  )
}
const styles = StyleSheet.create({
    container: {
  flex:1
    },
    Header:{
        backgroundColor:Colors.themecolor, 
        width:mobileW, height:mobileW*15/100, 
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between'
      },
    backIcon:{ 
      width: mobileW * 6 / 100, 
      height: mobileW * 6  / 100, 
      tintColor: Colors.white_color 
    },
}
)