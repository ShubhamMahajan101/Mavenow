import { View, ScrollView, StatusBar, Modal, Alert, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { SelectList, MultiSelect } from 'react-native-element-dropdown';
import axios from "axios"
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
export default function isepage({ navigation }) {
  const [number, onChangeNumber] = useState(null);
  const [number1, onChangeNumber1] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [State, setlanguage11] = useState('');
  const [selected, setSelected] = React.useState([]);
  const [tag, setTag] = useState([]);
  //  ............................................................................................ here is api ..................


  useEffect(() => {
    apiCalling();
    console.log('hello i am here');
  }, [])

  const apiCalling = () => {
    axios.get('https://mavenow.com:8001/Tag/getAllTag')
      .then(res => {
        const nameList = res.data.getAllTag;
        console.log('----------..................>', nameList)
        setTag(nameList)
      })
      .catch(function (error) {
        console.log('---------->', error);

      });
  }

  //  ............................................................................................ here is api ..................

  // const renderDataItem = (item) => {
  //   return (
  //       <View style={styles.item}>
  //           <Text style={styles.selectedTextStyle}>{item.name}</Text>
  //       </View>
  //   );
  // };
  // .....................................................................................................................  VALIDATION ............................







  // .....................................................................................................................  VALIDATION ............................

  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />


        {/* .....................................................            header */}
        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 5 / 100 }} onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/icon_back.png")}></Image>
          </TouchableOpacity>
          <Text style={{ color: Colors.white_color, marginHorizontal: mobileW * 5 / 100, fontWeight: '500', fontSize: mobileW * 5 / 100 }}>Write Your ise</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={{ marginRight: mobileW * 2 / 100 }} >
            <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/icon_info.png")}>
            </Image>
          </TouchableOpacity>
        </View>


        {/* .....................................................            header */}
        <ScrollView>
          <View style={{ padding: mobileW * 4 / 100 }}>
            <Text style={{ color: Colors.themecolor, fontSize: mobileW * 4 / 100 }}>Tell us About Your Skills</Text>
            {/* ..................................................................... here code is select list ........................... */}
            {/* <View style={styles.digitalmarketerView}>
    <TextInput
         style={{fontSize:mobileW*3.5/100,color:Colors.gray,padding:mobileW*2/100,}}
         multiline
        onChangeText={onChangeNumber}
              value={State}
        placeholderTextColor = {Colors.gray}
        placeholder="i.e: I Can Mentor as Digital Marketer"
        // keyboardType="numeric"
      />
      
      </View>
  */}
            {/* ..................................................................... here code is select list ........................... */}

            {/* .......................................##  ADD selection  list ## ................................... */}
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={tag}
              labelField="name"
              valueField="name"
              placeholder="i.e: I Can Mentor as Digital Marketer"
              value={selected}
              search
              searchPlaceholder="Search..."
              onChange={item => {
                setSelected(item);
                <Text style={styles.textSelectedStyle}>{item.name}</Text>
              }}
            // renderLeftIcon={() => (
            // )}
            // renderItem={renderDataItem}
            // renderSelectedItem={(item, unSelect) => (
            // <View style={styles.selectedStyle}>
            // <Text style={styles.textSelectedStyle}>{item.name}</Text>
            // </View>

            // )}
            />
            {/* <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
               
               </TouchableOpacity> */}
            {/* .......................................##  ADD selection  list ## ................................... */}
            <View style={styles.inputBoxView}>
              <TextInput style={{ fontSize: mobileW * 5 / 100, color: Colors.gray, padding: mobileW * 2 / 100, }}
                multiline onChangeText={onChangeNumber1}
                value={number1}
                placeholderTextColor={Colors.gray}
                placeholder="Write your Question"
              // keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        {/* ======================================= Post Profile ===================================== */}

        <TouchableOpacity activeOpacity={0.8} style={styles.LoginView}>
          <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.white_color, fontWeight: '500', }}>POST YOUR PROFILE</Text>
        </TouchableOpacity>

        {/* =========================================================== Model Open ======================================================== */}

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{ flex: 1, backgroundColor: '#00000060' }}>
              <View style={{ width: mobileW * 90 / 100, borderRadius: mobileW * 3 / 100, alignSelf: 'center', backgroundColor: Colors.white_color, elevation: 5 }}>
                <View style={{ width: mobileW * 90 / 100, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: mobileW * 15 / 100, borderTopLeftRadius: mobileW * 2 / 100, borderTopRightRadius: mobileW * 2 / 100, backgroundColor: Colors.themecolor }}>
                  <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontWeight: '500' }}></Text>
                  <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontWeight: '500' }}>Help</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{ marginRight: mobileW * 2 / 100 }} >
                    <Image style={styles.backIcon} resizeMode='contain'
                      source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  <View style={{ alignItems: 'center', padding: mobileW * 3 / 100 }}>

                    <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 4 / 100, fontWeight: '500' }}>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
                      making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                      looked up one of the more obscure Latin words, consectetur,
                      from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                      Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                      written in 45 BC.
                      This book is a treatise on the theory of ethics, very popular during the Renaissance.
                      The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                      This book is a treatise on the theory of ethics, very popular during the Renaissance.
                      The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                    </Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(!modalVisible)} style={{ marginBottom: mobileW * 15 / 100, marginTop: mobileW * 5 / 100, backgroundColor: Colors.themecolor, justifyContent: 'center', alignItems: 'center', width: mobileW * 20 / 100, height: mobileW * 10 / 100, borderRadius: mobileW * 2 / 100 }}>
                      <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.white_color, fontWeight: '500' }}>Ok</Text>
                    </TouchableOpacity>

                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        {/* =========================================================== Model Open ======================================================== */}
      </SafeAreaView>
    </View>)
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
  digitalmarketerView: {
    width: mobileW * 96 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 2 / 100,
    marginTop: mobileW * 3 / 100,
    borderWidth: 1,
    borderColor: Colors.themecolor
  },
  inputBoxView: {
    borderColor: Colors.themecolor,
    marginTop: mobileW * 5 / 100,
    borderRadius: mobileW * 2 / 100,
    borderWidth: 1,
    width: mobileW * 96 / 100,
    alignSelf: 'center',
    height: mobileH * 63 / 100
  },
  LoginView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: mobileW * 90 / 100,
    bottom: mobileH * 3 / 100,
    height: mobileW * 12 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 3 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
})