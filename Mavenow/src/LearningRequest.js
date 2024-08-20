
import {StatusBar,ScrollView, TextInput,Modal,Alert, Animated,FlatList, View, Text,Dimensions,TouchableOpacity,Image, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { Colors } from './Provider/Colorsfont';
import { SafeAreaView } from 'react-native-safe-area-context';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
  {
    id: 1,
    image: require('./Icon/icon_maven.png'),
    name:'',
    request:'Learning',
    skills:'Automation testing',
    startdate:'Des 07.2022',
    level:'Basic',
    enddate:'Des 09.2022',
    postdate:'Des 06, 2022',
    Language: 'PHP',
    fee:'500 Rs',
    status:'Your request decline',
    // selected:false
  },
  {
    id: 2,
    image: require('./Icon/icon_maven.png'),
    name:'shubham',
    request:'Learning',
    skills:'Automation testing',
    startdate:'',
    level:'Basic',
    enddate:'',
    postdate:'Noc 21, 2022',
    Language: 'PHP',
    fee:'500 Rs',
    status:'Your request decline',
    // selected:false
  },
  {
    id: 3,
    image: require('./Icon/icon_maven.png'),
    name:'shubham',
    request:'Learning',
    skills:'Automation testing',
    startdate:'Nov 22, 2022',
    level:'Basic',
    enddate:'Nov 25, 2022',
    postdate:'Nov 21, 2022',
    Language: 'PHP',
    fee:'500 Rs',
    status:'Your request decline',
    // selected:false
  },
  {
    id: 4,
    image: require('./Icon/icon_maven.png'),
    name:'shubham',
    request:'Learning',
    skills:'Automation testing',
    startdate:'',
    level:'Basic',
    enddate:'',
    postdate:'Des 09.2022',
    Language: 'PHP',
    fee:'500 Rs',
    status:'Your request decline',
    // selected:false
  },
  {
    id: 5,
    image: require('./Icon/icon_maven.png'),
    name:'shubham',
    request:'Learning',
    skills:'Automation testing',
    startdate:'Oct 28, 2022',
    level:'Basic',
    enddate:' Oct 31, 2022',
    postdate:'Oct 27, 2022',
    Language: 'PHP',
    fee:'500 Rs',
    status:'Your request decline',
    // selected:false
  },
  {
    id: 6,
    image: require('./Icon/icon_maven.png'),
    name:'shubham',
    request:'Learning',
    skills:'Automation testing',
    startdate:'',
    level:'Basic',
    enddate:'',
    postdate:'Des 09.2022',
    Language: 'PHP',
    fee:'500 Rs',
    status:'Your request decline',
    // selected:false
  },
  {
    id: 7,
    image: require('./Icon/icon_maven.png'),
    name:'shubham',
    request:'Learning',
    skills:'Automation testing',
    startdate:'',
    level:'Basic',
    enddate:'',
    postdate:'Des 09.2022',
    Language: 'PHP',
    fee:'500 Rs',
    status:'Your request decline',
    // selected:false
  },
  
]
export default function LearnerRequest({navigation}) {
    const [checked, setChecked] = useState('Active')
    const [show, setShow] = useState('Add')
    const [number, onChangeNumber] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, }}>
    <SafeAreaView style={{ flex: 1,backgroundColor:Colors.white_color, }}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ={Colors.themecolor} />
         {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
         <View style={styles.Header}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
     <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.goBack()} style={{marginHorizontal:mobileW*5/100}} >
            <Image style={styles.backIcon_} resizeMode='contain'
               source={require("./Icon/icon_back.png")}></Image>
           </TouchableOpacity>
           <Text style={{color:Colors.white_color,  fontWeight:'500', fontSize:mobileW*5/100}}>Learning Request</Text>
           </View>
           <View style={{flexDirection:'row', alignItems:'center'}}>
<TouchableOpacity activeOpacity={0.8} onPress={()=>setShow('search')} style={{marginRight:mobileW*2/100}} >
            <Image style={styles.SearchIcon} resizeMode='contain'
               source={require("./Icon/icon_search.png")}></Image>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('QuestionPage')} activeOpacity={0.8}  style={{marginRight:mobileW*2/100}} >
            <Image style={styles.SearchIcon} resizeMode='contain'
               source={require("./Icon/plus.png")}></Image>
           </TouchableOpacity>
           <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}  style={{marginRight:mobileW*2/100}} >
            <Image style={styles.SearchIcon} resizeMode='contain'
               source={require("./Icon/icon_info.png")}></Image>
           </TouchableOpacity>
           </View>
</View>
{/* =================================================================Model================================================================ */}
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
        <View style={{width:mobileW*90/100,borderRadius:mobileW*3/100,marginTop:mobileH*25/100, alignSelf:'center', backgroundColor:Colors.white_color,elevation:5}}>
          <View style={styles.modelHeader}>
          <Text style={{color:Colors.white_color, fontSize:mobileW*5/100, fontWeight:'500'}}></Text>
          <Text style={{color:Colors.white_color, fontSize:mobileW*5/100, fontWeight:'500'}}>            Help: Learning Request(S)</Text>
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
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            </Text>
          </View>
          </ScrollView>
        </View>
        </Modal>
</View>
{show !='Add' &&
        <View style={{width:mobileW,height:mobileW*15/100, alignItems:'center',justifyContent:'center',backgroundColor:Colors.themecolor}}>
        <View style={{backgroundColor:Colors.white_color,width:mobileW*95/100,flexDirection:'row',borderRadius:mobileW*1/100, alignItems:'center'}}>
        <TextInput
        style={{width:mobileW*85/100,borderRadius:mobileW*1/100, height:mobileW*10/100,backgroundColor:Colors.white_color}}
        onChangeText={onChangeNumber}
        value={number}
        placeholder=" Search..."
        
      />
      <TouchableOpacity activeOpacity={0.8} onPress={()=>setShow('Add')}>
      <Image resizeMode='contain' style={{width:mobileW*6/100,height:mobileW*6/100,borderRadius:mobileW*2/100, tintColor:Colors.themecolor}}
      source={require('./Icon/close2.png')}></Image>
      </TouchableOpacity>
      </View>
        </View>}
<View style={{ padding:mobileW*2/100, }}>
    <View style={styles.buttonCard}>
    <TouchableOpacity activeOpacity={0.8} onPress={()=>setChecked('Active')} style={[ {backgroundColor:checked==='Active'?Colors.themecolor:Colors.white_color},styles.button]}>
        <Text style={{color:checked==='Active'?Colors.white_color:Colors.black_color, fontSize:mobileW*4/100, fontWeight:'500'}}>Active</Text>
    </TouchableOpacity >
    <TouchableOpacity activeOpacity={0.8} onPress={()=>setChecked('Scheduled')} style={[ {backgroundColor:checked==='Scheduled'?Colors.themecolor:Colors.white_color},styles.button]}>
        <Text style={{color:checked==='Scheduled'?Colors.white_color:Colors.black_color, fontSize:mobileW*4/100, fontWeight:'500'}}>Scheduled</Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} onPress={()=>setChecked('Completed')} style={[ {backgroundColor:checked==='Completed'?Colors.themecolor:Colors.white_color},styles.button]}>
        <Text style={{color:checked==='Completed'?Colors.white_color:Colors.black_color, fontSize:mobileW*4/100, fontWeight:'500'}}>Completed</Text>
    </TouchableOpacity>
    </View>
</View>
<ScrollView>
<FlatList
            data={DATA}
            renderItem={({ item, index }) =>
            <View  style={styles.flatlistCard}>
            <View style={{ flexDirection:'row' }}>
              <View style={{width:mobileW*24/100,alignItems:'center',padding:mobileW*2/100}}>
                <View style={styles.imageCard}>
              <Image resizeMode='contain' style={styles.mavenImage}
                  source={item.image}></Image>
                  </View>
                <Text  style={{fontSize:mobileW*4/100, color:Colors.black_color}}>{item.name} </Text>
                <Text  style={{fontSize:mobileW*4/100, color:Colors.black_color}}>[Maven]</Text>
            
              </View>
              <View style={{width:mobileW*24/100,}}>
                <View style={{marginTop:mobileW*2/100}} >
                <Text style={{fontSize:mobileW*4/100, color:Colors.black_color}}>Request:</Text>
                <Text style={{fontSize:mobileW*3/100, color:Colors.gray}}>{item.request}</Text>
                </View>
                <View style={{marginTop:mobileW*2/100}} >
                <Text style={{fontSize:mobileW*4/100, color:Colors.black_color}}>Skills</Text>
                <Text style={{fontSize:mobileW*3/100, color:Colors.gray}}>{item.skills}</Text>
                </View>
              </View>
              <View style={{width:mobileW*24/100,}}>
              <View style={{marginTop:mobileW*2/100}} >
                <Text style={{fontSize:mobileW*4/100, color:Colors.black_color}}>Start Date</Text>
                <Text style={{fontSize:mobileW*3/100, color:Colors.gray}}>{item.startdate}</Text>
                </View>
                <View style={{marginTop:mobileW*2/100}} >
                <Text style={{fontSize:mobileW*4/100, color:Colors.black_color}}>Level</Text>
                <Text style={{fontSize:mobileW*3/100, color:Colors.gray}}>{item.level}</Text>
                </View>
              </View>
              <View style={{width:mobileW*24/100,}}>
                <View style={{marginTop:mobileW*2/100}} >
                <Text style={{fontSize:mobileW*4/100, color:Colors.black_color}}>End Date</Text>
                <Text style={{fontSize:mobileW*3/100, color:Colors.gray}}>{item.enddate}</Text>
                </View>
                <View style={{marginTop:mobileW*2/100}} >
                <Text style={{fontSize:mobileW*4/100, color:Colors.black_color}}>Post date:</Text>
                <Text style={{fontSize:mobileW*3/100, color:Colors.gray}}>{item.postdate}</Text>
                </View>
              </View>
              
            </View>
            <View style={styles.flatlistFootar}>
              <Text style={{fontSize:mobileW*4/100, color:Colors.white_color}}>{item.fee}</Text>
              <Text style={{fontSize:mobileW*4/100, color:Colors.black_color}}>{item.status}</Text>
            </View>
            </View> 
              }
              keyExtractor={item => item.id}/>
</ScrollView>
    </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
  flex:1,
  // backgroundColor:"red"
    },
    Header:{
      backgroundColor:Colors.themecolor, 
      width:mobileW, height:mobileW*15/100, 
      flexDirection:'row', 
      alignItems:'center',
      justifyContent:'space-between'
    },
    backIcon:{ 
      width: mobileW * 8 / 100, 
      height: mobileW * 6 / 100, 
      tintColor: Colors.white_color 
    },
    backIcon_:{ 
      width: mobileW * 8 / 100, 
      height: mobileW * 6 / 100, 
      tintColor: Colors.white_color ,
    
    },
    SearchIcon:{ 
      width: mobileW * 8 / 100, 
      height: mobileW * 6 / 100, 
      tintColor: Colors.white_color 
    },
    modelHeader:{
      width:mobileW*90/100,
      justifyContent:'space-between',
      flexDirection:'row', 
      alignItems:'center', 
      height:mobileW*15/100,
      borderTopLeftRadius:mobileW*2/100, 
      borderTopRightRadius:mobileW*2/100, 
      backgroundColor:Colors.themecolor
    },
    buttonCard:{
        flexDirection:'row', 
        backgroundColor:Colors.white_color,
        // backgroundColor:'red',
        elevation:5,
        shadowColor: '#000',
        borderColor:"#e8edfb",
        borderWidth:1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, },
       // shadowColor: '#000',
        shadowOpacity: 0.1,
       
    },
    button:{
      width:mobileW*32/100, 
      height:mobileW*12/100,
      justifyContent:'center',
      alignItems:'center', 
      borderRadius:mobileW*2/100
    },
    flatlistCard:{ 
      width:mobileW*96/100,
      alignSelf:'center',
      marginTop:mobileW*3/100, 
      
      borderRadius:mobileW*2/100, 
      backgroundColor:Colors.white_color,
      elevation:5,
    shadowColor: '#000',
    borderColor:"#e8edfb",
    borderWidth:1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
   // shadowColor: '#000',
    shadowOpacity: 0.1,
    },
    imageCard:{
      width:mobileW*12/100,
      height:mobileW*12/100,
      borderRadius:mobileW*10/100,
      borderWidth:mobileW*0.6/100,
      borderColor:Colors.themecolor, 
      alignItems:'center',
      justifyContent:'center'
    },
    mavenImage:{
      width:mobileW*10/100,
      height:mobileW*10/100,
      borderRadius:mobileW*2/100, 
      tintColor:Colors.themecolor
    },
    flatlistFootar:{
      width:mobileW*96/100,
      flexDirection:'row',
      alignItems:'center',
      padding:mobileW*2/100, 
      justifyContent:'space-between', 
      borderBottomLeftRadius:mobileW*2/100, 
      borderBottomRightRadius:mobileW*2/100, 
      backgroundColor:Colors.themecolor, 
      marginTop:mobileW*5/100
    }
}
)









