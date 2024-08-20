import { View,ScrollView,StatusBar,Modal,Alert, FlatList, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image,RefreshControl } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { config, msgProvider, msgText, consolepro, Lang_chg,  localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { Colors, Font } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
  {
    id: 1,
    image: require('./Icon/icon_notification.png'),
    title:'Feedback Notification',
    description:'Your classes of Engineering has been completed successfully.  ',
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

export default function Notification({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setrefresh] = useState(false)

    // -------------------------- refresh --------------------
    const _onRefresh = async () => {
      console.log('_onRefresh', '_onRefresh')
      setrefresh(true)
      setTimeout(() => {
        setrefresh(false)
      }, 1200);
    }
    // -----------------------refresh-------------------

  return (
    <View style={{ flex: 1, }}>
    <SafeAreaView style={{ flex: 1,backgroundColor:Colors.white_color }}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ={Colors.themecolor} />
         {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
         <View style={styles.Header}>
            {/* <View style={{flexDirection:'row',alignItems:'center'}}> */}
     <TouchableOpacity activeOpacity={0.8} style={{}} onPress={()=>navigation.goBack()}>
            <Image style={styles.backIcon_top} resizeMode='contain'
               source={require("./Icon/back(1).png")}></Image>
           </TouchableOpacity>
<Text style={{color:Colors.black_color, marginHorizontal:mobileW*3/100,fontSize:mobileW*4.5/100,fontFamily:Font.FontMedium}}>{Lang_chg.NotificationTxt[config.language] }</Text>
{/* </View> */}
<TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}  style={{marginRight:mobileW*4/100}} >
            <Image style={styles.backIcon} resizeMode='contain'
               source={require("./Icon/about.png")}></Image>
           </TouchableOpacity>
</View>

<ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={_onRefresh}
              tintColor={Colors.themecolor}
              colors={[Colors.themecolor]}
            />
          }>

<FlatList
            data={DATA}
            renderItem={({ item, index }) =>
          <View>
            <TouchableOpacity activeOpacity={0.8} style={styles.ListCard}>
    <View style={styles.ImageCard}>
    <Image resizeMode='contain' style={{width:mobileW*8/100, height:mobileW*8/100}} 
    source={item.image}></Image>
    </View>
    <View style={{ width:mobileW*76/100, padding:mobileW*3/100}}>
    <Text style={{fontSize:mobileW*3.3/100,color:Colors.black_color,fontFamily:Font.FontMedium}}>{item.title}</Text>
    <Text style={{fontSize:mobileW*2.8/100,color:Colors.gray, fontFamily:Font.FontMedium   }}>{item.description}</Text>
    </View>
</TouchableOpacity> 
          </View>
          }
           keyExtractor={item => item.id}/>
          </ScrollView>

  {/* =================================================================Model================================================================ */}
  <View  >
<Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex:1, backgroundColor:'#00000060'}}>

        <View style={styles.ModalCard}>
          <View style={styles.ModalHeader}>
          <Text style={{color:Colors.black_color, fontSize:mobileW*4/100, fontFamily:Font.FontMedium}}>Help : Notification</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)}  >
            <Image style={styles.backIcon_close} resizeMode='contain'
               source={require("./Icon/close2.png")}></Image>
           </TouchableOpacity>
          </View>
          <View style={{width:mobileW*90/100, height:mobileW*0.2/100, backgroundColor:'#E7E8EA'}}></View>
          <ScrollView>
          <View style={{alignItems:'center', padding:mobileW*3/100}}>
            
            <Text style={{color:Colors.dark_gray,fontSize:mobileW*3.5/100,fontFamily:Font.FontRegular}}>
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
  flex:1
    },
    Header:{
        backgroundColor:Colors.white_color, 
        width:mobileW, height:mobileW*15/100, 
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between'
      },
    backIcon:{ 
      width: mobileW * 5 / 100, 
      height: mobileW * 5  / 100, 
      tintColor: Colors.black_color 
    },
    backIcon_close:{ 
      width: mobileW * 6 / 100, 
      height: mobileW * 6  / 100, 
      tintColor:Colors.color_orange
    
    },
    backIcon_top:{ 
      width: mobileW * 6/ 100, 
      height: mobileW * 6  / 100, 
      tintColor: Colors.black_color ,
      marginLeft:mobileW*4/100
    },
    ListCard:{backgroundColor:'#FAFAFA',
      padding:mobileW*2/100, 
      width:mobileW*98/100,  
      margin:mobileW*1/100, 
      flexDirection:'row',
      alignItems:'center'
    },
    ImageCard:{
      width:mobileW*16/100,
      height:mobileW*16/100,
      borderRadius:mobileW*15/100,
      alignItems:'center',
      justifyContent:'center', 
      backgroundColor:Colors.themecolor
    },
    ModalCard:{
      width:mobileW*90/100,
      borderRadius:mobileW*3/100,
      marginTop:mobileH*25/100, 
      alignSelf:'center', 
      backgroundColor:Colors.white_color,
      elevation:5
    },
    ModalHeader:{
      width:mobileW*90/100,
      justifyContent:'space-between',
      flexDirection:'row', 
      alignItems:'center', 
      height:mobileW*12/100,
      borderTopLeftRadius:mobileW*2/100, 
      borderTopRightRadius:mobileW*2/100, 
      paddingLeft:mobileW*3/100,
      paddingRight:mobileW*3/100,
      backgroundColor:Colors.white_color
    }
}
)