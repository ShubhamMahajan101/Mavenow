// import { View, Text, SafeAreaView, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, Modal, } from 'react-native'
// import React, { useState } from 'react'
// import { Picker } from '@react-native-picker/picker';
// import { Colors } from './Provider/Colorsfont'
// import { Stack, TextInput, } from "@react-native-material/core";
// import Footer from './Provider/Footer';
// import HideWithKeyboard from 'react-native-hide-with-keyboard';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;

// const  Dashboard=()=> {
//     const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={{ flex: 1, }}>
//          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }} onPress={() => setModalVisible(true)}>
//            <Text>Dashboard</Text>
//           </TouchableOpacity>
    
//       {/* ---------------------------------------------------------------------------------------------11111111111111111111111111111111111111111111111                MODEL */}

//       <View >
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               Alert.alert("Modal has been closed.");
//               setModalVisible(!modalVisible);
//             }}>
//             <View style={{ flex: 1, alignSelf: "center", marginTop: mobileW * 20 / 100, padding: mobileW * 8 / 100 , }}>

//               <View style={{ backgroundColor: Colors.themecolor, height: mobileW * 9 / 100, borderTopLeftRadius: mobileW * 2 / 100, borderTopRightRadius: mobileW * 2 / 100 }}>
//                 <View style={{ flexDirection: "row", justifyContent: "flex-end", justifyContent: "space-around" }} >
//                   <Text></Text>
//                   <Text style={{ color: Colors.white_color, marginTop: mobileW * 2 / 100, fontSize: mobileW * 3.50 / 100 }}>Help : Update Profile</Text>
//                   <TouchableOpacity

//                     onPress={() => setModalVisible(!modalVisible)}
//                   >
//                     <Image style={{ width: mobileW * 5.20 / 100, height: mobileW * 5.20 / 100, tintColor: Colors.whiteColor, marginTop: mobileW * 2 / 100, }} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               <View style={{ backgroundColor: Colors.whiteColor, elevation: mobileW * 3 / 100, padding: mobileW * 3 / 100, borderBottomRightRadius: mobileW * 2 / 100, borderBottomLeftRadius: mobileW * 2 / 100, height: mobileW * 100 / 100,}}>

//                 <Text style={{textAlign:"center",color:Colors.gray}} >Kalam earned a degree in aeronautical engineering from the
//                   Madras Institute of Technology and in 1958 joined the Defence Research and Development
//                   Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
//                   was project director of the SLV-III, the first satellite launch vehicle that was both designed
//                   and produced in India. Rejoining DRDO in 1982, Kalam pl
//                   ich helped earn him the nickname “
//                   ich helped earn him the nickname “
//                   ich helped earn him the nickname “

//                   ich helped earn him the nickname “

//                   ich helped earn him the nickname “
//                   ich helped earn him the nickname “


//                   anned the program that produced a number
//                   of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first
//                   intermediate-range ballistic missile, which incorporated aspects of the
//                   SLV-III and was launched in 1989.</Text>
//               </View>
//             </View>

//           </Modal>
//         </View>
//         {/* ------=====================================mode=================================================================================l */}

//     </View>
//   )
// }
// export default Dashboard
// const styles=StyleSheet.create({
//     backIcon: {
//         width: mobileW * 6 / 100,
//         height: mobileW * 6 / 100,
//         tintColor: Colors.white_color,
//         marginTop: mobileW * 2 / 100
    
//       },
// })
import { View, Text,  StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, Modal, } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker';
import { Colors } from './Provider/Colorsfont'
import { Stack, TextInput, } from "@react-native-material/core";
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const  Dashboard=({navigation})=> {
   const backButton=()=>{
    setModalVisible(false)
    navigation.goBack()
   }
  useEffect(() => {
    setModalVisible(true)

  }, [])
  
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, }}>

    
      {/* ---------------------------------------------------------------------------------------------11111111111111111111111111111111111111111111111                MODEL */}

      <View >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}>
            <View style={{ flex: 1, alignSelf: "center", marginTop: mobileW * 20 / 100, padding: mobileW * 8 / 100 , }}>

              <View style={{ backgroundColor: Colors.themecolor, height: mobileW * 9 / 100, borderTopLeftRadius: mobileW * 2 / 100, borderTopRightRadius: mobileW * 2 / 100 }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", justifyContent: "space-around" }} >
                  <Text></Text>
                  <Text style={{ color: Colors.white_color, marginTop: mobileW * 2 / 100, fontSize: mobileW * 3.50 / 100 }}>Help : Update Profile</Text>
                  <TouchableOpacity

                    onPress={() => backButton()}
                  >
                    <Image style={{ width: mobileW * 5.20 / 100, height: mobileW * 5.20 / 100, tintColor: Colors.whiteColor, marginTop: mobileW * 2 / 100, }} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ backgroundColor: Colors.whiteColor, elevation: mobileW * 3 / 100, padding: mobileW * 3 / 100, borderBottomRightRadius: mobileW * 2 / 100, borderBottomLeftRadius: mobileW * 2 / 100, height: mobileW * 100 / 100,}}>
<ScrollView>
                <Text style={{textAlign:"center",color:Colors.gray}} >Kalam earned a degree in aeronautical engineering from the
                  Madras Institute of Technology and in 1958 joined the Defence Research and Development
                  Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                  was project director of the SLV-III, the first satellite launch vehicle that was both designed
                  and produced in India. Rejoining DRDO in 1982, Kalam pl
                  ich helped earn him the nickname “
                  ich helped earn him the nickname “
                  ich helped earn him the nickname “

                  ich helped earn him the nickname “

                  ich helped earn him the nickname “
                  ich helped earn him the nickname “


                  anned the program that produced a number
                  of successful missiles, which helped earn him the nickname “Missile Man.” Among those successes was Agni, India’s first
                  intermediate-range ballistic missile, which incorporated aspects of the
                  SLV-III and was launched in 1989.</Text>
                  </ScrollView>

              </View>
            </View>

          </Modal>
        </View>
        {/* ------=====================================mode=================================================================================l */}

    </View>
  )
}
export default Dashboard
const styles=StyleSheet.create({
    backIcon: {
        width: mobileW * 6 / 100,
        height: mobileW * 6 / 100,
        tintColor: Colors.white_color,
        marginTop: mobileW * 2 / 100
    
      },
})