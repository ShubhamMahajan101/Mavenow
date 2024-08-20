import { View, Text, StatusBar, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, Modal, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Colors, Font } from './Provider/Colorsfont'
import { Stack, TextInput, } from "@react-native-material/core";
import { SafeAreaView } from 'react-native-safe-area-context'
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import { config } from './Provider/configProvider';
import UpdateMavenn_Profile from './UPdateLearnerProfile';
import { ScrollView } from 'react-native-gesture-handler';
import { localStorage } from './Provider/localStorageProvider';

const data8 = [
  { label: 'BASIC', value: '1' },
  { label: 'Medium', value: '2' },
  { label: 'Advance', value: '2' },
];
//  ................... here is api ..................
const Mprofile = ({ navigation }) => {
  const [Skill_Array, setSkill_Array] = useState([]);
  console.log('jhjhhjjjjjj', Skill_Array);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible_gif1, setModalVisible_gif1] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [skilldata, setskilldata] = useState('');

  // ---------------- MOdal State ----------------
  const [modalForCategory, setmodalForCategory] = useState(false);
  const [ModalValue, setModalValue] = useState(0);
  const [modalSkill, setmodalSkill] = useState(false);
  const [modal_level, setmodal_level] = useState(false);
  // ---------------- Category, Skills and Level Modal ----------------
  const [Category, setcategory] = useState('select');
  const [Category1, setcategory1] = useState('select');
  const [Category2, setcategory2] = useState('select');
  const [SkillName, setSkillName] = useState('select');
  const [SkillName1, setSkillName1] = useState('select');
  const [SkillName2, setSkillName2] = useState('select');
  const [label, setlabel] = useState('select');
  const [label1, setlabel1] = useState('select');  
  const [label2, setlabel2] = useState('select');
  const [userMode, setuserMode] = useState();

  const [search, setSearch] = useState([])
  // const [detail, setdetail] = useState({})
  const [Searchtext, setSearchtext] = useState('')
  useEffect(() => {
    SetMode();
    skills_api();
    apiCalling();
    
    // apiCalling_suggestion()

  }, [])

   const SetMode = async (data) => {
   const value = await localStorage.getItemString('UserMode')
    console.log(".......... m profile >> ", value);
    setuserMode(value)
 }
  // not availabale swagger  _______________________________________________________________________  
  // =================  asking about pradeep sir =================
  const apiCalling_suggestion = () => {
    console.log('jjjjjjjjjjjjjjjjjjj');
    axios.post("https://mavenow.com:8001/Tag/createSuggestedTag")
      .then(function (response) {
        var data = response
        console.log(' config( config data)------------------>', data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // api get all tag _______________________________________________________________________

  const apiCalling = () => {
    console.log("getalltag");
    axios.get('https://mavenow.com:8001//Tag/getAllTag')
      .then(res => {
        const sucessdata = res.data;
        const sucess = res.data.StatusCode;
        if (sucess == 200) {
          console.log(' getalldata------------<', sucessdata);
          setskilldata(succdataeeded)


        } else {
          alert('something went wrong===')
        }
      })
      .catch(function (error) {
        console.log('---------->', error);
      });
  }
  //    ____________________________________________________________________________________________________________________________________

  const skills_api = () => {
    console.log("i am here ");
    axios.get('https://mavenow.com:8001/category?type=active&addonemoreskill=true')
      .then(res => {
        console.log('res----------', res);
        const succdataeeded = res.data.result;
        const sucess = res.data.StatusCode;
        if (sucess == 200) {
          console.log(' skill {data }------------<', succdataeeded);
          setskilldata(succdataeeded)
} else {
          alert('something went wrong')
        }
      })
      .catch(function (error) {
        console.log('---------->', error);
      });
  }
  // _____________________________________________________________________________________________________________________________________________________
  const model_close = (item) => {
    console.log("am here", item);
    if (ModalValue == 0) {
      setcategory(item.name)
    } else if (ModalValue == 1) {
      setcategory1(item.name)
    } else if (ModalValue == 2) {
      setcategory2(item.name)
    }
    setSkill_Array(item.categorySkills)
    setmodalForCategory(false)
  }

  const skill_close = (item) => {
    if (ModalValue == 0) {
      setSkillName(item.SkillName)
    } else if (ModalValue == 1) {
      setSkillName1(item.SkillName)
    } else if (ModalValue == 2) {
      setSkillName2(item.SkillName)
    }
    setmodalSkill(false)
  }

  const close_lable = (item) => {
    console.log("am here", item);
    if (ModalValue == 0) {
      setlabel(item)
    } else if (ModalValue == 1) {
      setlabel1(item)
    } else if (ModalValue == 2) {
      setlabel2(item)
    }
    setmodal_level(false)
  }
  const UpdateMavenn_Profile = () => {
    setModalVisible_gif1(true)

    setTimeout(() => {
      navigation.navigate('UserMaven')
    }, 1000);

  }

  // _________________________________________________________________________________________________________________________________________


  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center',marginHorizontal:mobileW*0/100 }}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 3 / 100 }} onPress={() => navigation.goBack('UpdateMavenn_Profile')}>
              <Image style={styles.backIcon_top} resizeMode='contain' source={require("./Icon/bk.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.white_color, marginHorizontal: mobileW * 0/ 100, fontSize: mobileW * 4.3 / 100 ,fontFamily:Font.FontMedium}}>{userMode == 'maven' ? "Update Maven Profile" : "Update Learner Profile"}</Text>
            {/* {userMode == 'maven' ? "Update Maven Profile Request" : "Update Learner Profile "} */}
          </View>
          <TouchableOpacity activeOpacity={0.8} style={{ marginRight: mobileW * 2 / 100 }} onPress={() => setModalVisible(true)}>
            <Image style={styles.backIcon} resizeMode='contain' source={require("./Icon/icon_info.png")}></Image>
          </TouchableOpacity>
        </View>
        {/* ====================================================================================================================HEADER */}
        {/* == > categoey model  <== */}
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalForCategory}
          onRequestClose={() => {
            setmodalForCategory(!modalForCategory);
          }}>
          <View style={{ flex: 1, backgroundColor: '#00000060', alignItems: 'center', justifyContent: 'center', paddingVertical: mobileW * 10 / 100 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
            <View style={{ width: mobileW * 85 / 100, backgroundColor: Colors.whiteColor }}>
              <View style={{ backgroundColor: Colors.themecolor, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text></Text>
                <Text
                  style={{
                    padding: mobileW * 3 / 100,
                    alignSelf: "center",
                    color: Colors.white_color,
                    fontSize: mobileW * 4 / 100,
                    fontWeight: "700"
                  }}>Select Category</Text>
                <TouchableOpacity onPress={() => setmodalForCategory(!modalForCategory)}>
                  <Image
                    style={{
                      width: mobileW * 5.20 / 100,
                      height: mobileW * 5.20 / 100,
                      tintColor: Colors.whiteColor,
                      marginRight: mobileW * 2 / 100
                    }}
                    resizeMode='contain'
                    source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={skilldata}
                renderItem={({ item }) => <View>
                  <TouchableOpacity onPress={() => model_close(item)}>
                    <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.blackColor, padding: mobileW * 3 / 100 }}>{item.name}</Text>
                  </TouchableOpacity>
                </View>}
                keyExtractor={item => item.id} />
            </View>
          </View>
        </Modal>

        {/* -------------------------------------------------------------------------------------------- */}
        {/*  ==> skill modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSkill}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setmodalSkill(!modalSkill);
          }}>
          <View style={{ flex: 1, backgroundColor: '#00000090', alignItems: 'center', justifyContent: 'center', paddingVertical: mobileW * 10 / 100 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
            <View style={{ width: mobileW * 85 / 100, backgroundColor: Colors.whiteColor }}>
              <View style={{ backgroundColor: Colors.themecolor, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text></Text>
                <Text
                  style={{ padding: mobileW * 3 / 100, alignSelf: "center", color: Colors.white_color, fontSize: mobileW * 4 / 100, fontWeight: "700" }}>Select Skills</Text>
                <TouchableOpacity onPress={() => setmodalSkill(!modalSkill)}>
                  <Image style={{
                    width: mobileW * 5.20 / 100, height: mobileW * 5.20 / 100,
                    tintColor: Colors.whiteColor, marginRight: mobileW * 2 / 100
}}
                    resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={Skill_Array}
                renderItem={({ item }) => <View>

                  <TouchableOpacity onPress={() => skill_close(item)}>
                    <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.blackColor, padding: mobileW * 3 / 100 }}>
                      {item.SkillName}</Text>
                  </TouchableOpacity>

                </View>}
                keyExtractor={item => item.id}
              />

            </View>
          </View>
        </Modal>

        {/* =========================================================================== level modal  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal_level}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setmodal_level(!modal_level);
          }}>
          <View style={{ flex: 1, backgroundColor: '#00000090', alignItems: 'center', justifyContent: 'center', paddingVertical: mobileH * 10 / 100 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />


            <View style={{ width: mobileW * 85 / 100, backgroundColor: Colors.whiteColor }}>
              <View style={{ backgroundColor: Colors.themecolor, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text></Text>
                <Text
                  style={{ padding: mobileW * 3 / 100, alignSelf: "center", color: Colors.white_color, fontSize: mobileW * 4 / 100, fontWeight: "700" }}>Select Category</Text>
                <TouchableOpacity onPress={() => setmodal_level(!modal_level)}>
                  <Image style={{
                    width: mobileW * 5.20 / 100, height: mobileW * 5.20 / 100,
                    tintColor: Colors.whiteColor, marginRight: mobileW * 2 / 100
                  }}
                    resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                </TouchableOpacity>
              </View>
              <FlatList
                data={data8}
                renderItem={({ item }) => 
                <View>
                  <TouchableOpacity onPress={() => close_lable(item.label)}>
                    <Text style={{ fontSize: mobileW * 3 / 100, color: Colors.blackColor, padding: mobileW * 3 / 100 }}>{item.label}</Text>
                  </TouchableOpacity>
                </View>}
                keyExtractor={item => item.id} />

            </View>
          </View>
        </Modal>

        {/* ---------------------------  >  first arrow drop down  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible_gif1}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible_gif1(!modalVisible_gif1);
          }}>
          {/* <View style={{ flex: 1, width: mobileW * 88 / 100, height: mobileW * 18 / 100, justifyContent: "center", alignSelf: "center" }}> */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ width: mobileW * 25 / 100, height: mobileW * 12 / 100 }}
              source={require("./Icon/neighcoach_loader.gif")}></Image>

          </View>
        </Modal>


        {/*=========================================================================================================== modal */}
        <View >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalVisible1(!modalVisible1);
            }}>
            <View style={{
              flex: 1,
              alignSelf: "center",
              alignItems: 'center',
              backgroundColor: '#00000090',
              justifyContent: 'center',
              width: mobileW
            }}>
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.themecolor,
                width: mobileW * 90 / 100,
                height: mobileW * 12 / 100,
                borderTopLeftRadius: mobileW * 2 / 100,
                borderTopRightRadius: mobileW * 2 / 100
              }}>
                <Text style={{
                  color: Colors.white_color,
                  fontSize: mobileW * 3.60 / 100,
                  alignSelf: "center",
                  fontWeight: "700"
                }}>Add Tag</Text>
              </View>
              <View style={{
                backgroundColor: Colors.whiteColor,
                width: mobileW * 90 / 100,
                elevation: mobileW * 1 / 100,
                padding: mobileW * 3 / 100,
                borderBottomRightRadius: mobileW * 2 / 100,
                borderBottomLeftRadius: mobileW * 2 / 100,
              }}>
                <View style={{ marginTop: mobileW * 1.12 / 100 }}>
                  <TextInput
                    onPress={() => setFirstname()}
                    color={Colors.themecolor}
                    label="Enter Tag"
                    variant="outlined"
                    trailing={props => (<Text></Text>)} />

                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: mobileW * 2 / 100
                }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Colors.themecolor,
                      width: mobileW * 20 / 100,
                      height: mobileW * 7 / 100,
                      borderRadius: mobileW * 1 / 100
                    }}>
                    <Text style={{
                      color: Colors.whiteColor,
                      textAlign: "center"
                    }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible1(!modalVisible1)}
                    activeOpacity={0.8}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Colors.themecolor,
                      width: mobileW * 20 / 100,
                      height: mobileW * 7 / 100,
                      borderRadius: mobileW * 1 / 100,
                      marginHorizontal: mobileW * 4 / 100
                    }}>
                    <Text style={{
                      color: Colors.whiteColor,
                      textAlign: "center"
                    }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/*=========================================================================================================== modal  top */}
        <View >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000096'
            }}>
              <View style={{
                padding: mobileW * 2 / 100,
                width: mobileW * 90 / 100,
                backgroundColor: Colors.themecolor,
                borderTopLeftRadius: mobileW * 2 / 100,
                justifyContent: 'center',
                borderTopRightRadius: mobileW * 2 / 100,
              }}>
                <View style={{
                  flexDirection: "row",
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }} >
                  <Text></Text>
                  <Text style={{
                    color: Colors.white_color,
                    fontSize: mobileW * 3.8/ 100,
                    fontWeight: '500'
                  }}>           Help : Update Profile</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{ marginRight: mobileW * 2 / 100 }}>
                    <Image style={{
                      width: mobileW * 6 / 100,
                      height: mobileW * 6 / 100,
                      tintColor: Colors.whiteColor
                    }} resizeMode='contain' source={require("./Icon/close2.png")}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{
                backgroundColor: Colors.whiteColor,
                elevation: mobileW * 1 / 100,
                width: mobileW * 90 / 100,
                padding: mobileW * 3 / 100,
                borderBottomRightRadius: mobileW * 2 / 100,
                borderBottomLeftRadius: mobileW * 2 / 100,
              }}>

                <Text style={{ color: Colors.gray, textAlign: "center" ,fontSize:mobileW*4/100,fontWeight:"400"}} >Kalam earned a degree in aeronautical engineering from the
                  Madras Institute of Technology and in 1958 joined the Defence Research and Development
                  Organisation (DRDO). In 1969 he moved to the Indian Space Research Organisation, where he
                  was project director of the SLV-III,
                  the first satellite launch vehicle that was both designed
                  and produced in India. Rejoining DRD


                  O in 1982, Kalam planned the program that produced a number
                  of successful missiles, which helped earn him the
                  nickname “Missile Man.” Among those successes was A g n i, India’s first
                  intermediate-r a n g e ballistic m f f f
                  issile, which incorporated aspects of the
                  SLV-III and was launched in 1989.</Text>
              </View>
            </View>

          </Modal>
        </View>

        {/* ==========================================================================Drop Down */}
        {/* ---------------------------  >  first arrow drop down  */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: mobileW * 2 / 100 }}>
            <View style={[styles.BorderData]}>
              <View style={styles.BorderDataTop}>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Category</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { setmodalForCategory(true), setModalValue(0) }} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{Category} </Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Skill</Text>
                  <TouchableOpacity onPress={() => setmodalSkill(true)} activeOpacity={0.8} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{SkillName}</Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Level</Text>
                  <TouchableOpacity onPress={() => setmodal_level(true)} activeOpacity={0.8} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{label}</Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* _____________________________________   Drop Down Text  image SECOND  =* Second =* ___________________________________________________ */}
            <View style={styles.BorderData}>
              <View style={styles.BorderDataTop}>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Category</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { setmodalForCategory(true), setModalValue(1) }} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{Category1} </Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Skill</Text>
                  <TouchableOpacity onPress={() => setmodalSkill(true)} activeOpacity={0.8} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{SkillName1}</Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Level</Text>
                  <TouchableOpacity onPress={() => setmodal_level(true)} activeOpacity={0.8} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{label1}</Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* __________________________________________DROP Down TEXT ___________________________________________ */}
            <View style={styles.BorderData}>
              <View style={styles.BorderDataTop}>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Category</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => { setmodalForCategory(true), setModalValue(2) }} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{Category2} </Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Skill</Text>
                  <TouchableOpacity onPress={() => setmodalSkill(true)} activeOpacity={0.8} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{SkillName2}</Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.category_view}>
                  <Text style={styles.dropdown_txt}>Level</Text>
                  <TouchableOpacity onPress={() => setmodal_level(true)} activeOpacity={0.8} style={styles.view_direction}>
                    <Text numberOfLines={2} style={styles.data_text}>{label2}</Text>
                    <Image style={styles.dropdown_image} resizeMode='contain' source={require("./Icon/DownArrow.png")}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>





          <View style={{ flexDirection: "row", marginTop: mobileW * 3 / 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <View>
              {/* {item.data} */}

              <TextInput onChangeText={(text) => { setSearchtext(text) }}
                autoCorrect={false}
                value={search}
                style={{ width: mobileW * 86/ 100 }}
                color={Colors.themecolor}
                label="I can teach*"
                variant="outlined"
                trailing={props => (<Text> </Text>)}
              />


            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible1(true)} >
              <Image style={{
                width: mobileW * 5 / 100, height: mobileW * 6 / 100,
                tintColor: Colors.blackColor, margin: mobileW * 3 / 100
              }} resizeMode='contain' source={require("./Icon/plus.png")}></Image>
            </TouchableOpacity>
          </View>
          {Searchtext != '' &&
            <View style={{ height: mobileH * 35 / 100 }}>
              <FlatList
                data={search}
                renderItem={({ item, index }) =>
                  <View>
                    <Text>{item.name}</Text>
                  </View>
                }
                keyExtractor={item => item.id} />
            </View>}
          {/* ========================================================= > B U T T O N <==========================================================*/}
          <View style={{ flexDirection: "row", width: mobileW, justifyContent: "space-around", marginTop: mobileW * 4 / 100 }}>
            <View style={{
              backgroundColor: Colors.themecolor, width: mobileW * 45 / 100, height: mobileW * 11 / 100,
              borderRadius: mobileW * 2 / 100, justifyContent: 'center', alignItems: 'center'
            }}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100,fontFamily:Font.FontRegular }}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              backgroundColor: Colors.themecolor, width: mobileW * 45 / 100, height: mobileW * 11 / 100,
              borderRadius: mobileW * 2 / 100, justifyContent: 'center', alignItems: 'center'
            }}>
              <TouchableOpacity onPress={() => UpdateMavenn_Profile()}>
                <Text style={{ color: Colors.white_color, fontSize: mobileW * 4 / 100,fontFamily:Font.FontRegular }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ................... */}
          {/* =========================================================> B U T T  O N <==========================================================*/}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
export default Mprofile
const styles = StyleSheet.create({
  Header: {
    backgroundColor: Colors.themecolor,
    width: mobileW, 
    height: mobileW * 13 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  backIcon_top: {
    width: mobileW * 9.5 / 100,
    height: mobileW * 9.5/ 100,
    tintColor: Colors.white_color
  },
  placeholderStyle: {
    fontSize: mobileW * 3 / 100,
    color: 'black'
  },
  BorderData: {
    width: mobileW * 96 / 100,
    height: mobileW * 19 / 100,
    marginTop: mobileW * 3 / 100,
    borderWidth: mobileW * 0.2/ 100,
    borderRadius: mobileW * 1 / 100,
    padding: mobileW * 2 / 100,
    borderColor: Colors.gray,
    justifyContent: 'space-around',
  },
  BorderDataTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.themecolor
  },
  selectedTextStyle: {
    fontSize: mobileW * 4 / 100,
    color: 'black'
  },
  iconStyle: {
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
  },
  inputSearchStyle: {
    height: mobileW * 11 / 100,
    fontSize: mobileW * 4 / 100,
    color: 'black',
  },
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: mobileW * 12 / 100, 
    width: mobileW * 30 / 100,
    borderRadius: 0,
    paddingHorizontal: mobileW * 0 / 100,
  },
  icon: {
    marginRight: 0,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 2,
    zIndex: 999,
    paddingHorizontal: 0,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: mobileW * 3 / 100,
    marginHorizontal: mobileW * 1 / 100
  },
  selectedTextStyle: {
    fontSize: mobileW * 3.35 / 100,
    color: Colors.gray
  },
  iconStyle: {
    width: mobileW * 7 / 100,
    height: mobileW * 2 / 100,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  DanceView: { width: '32%', 
  height: mobileH * 6 / 100, 
  alignItems: 'center' 
},
  DanceViewUpper: { 
    flexDirection: 'row', 
    width: '100%', 
    alignItems: 'center' 
  },
  dropdown_txt: { 
    color: Colors.blackColor, 
    fontSize: mobileW * 3 / 100, 
    fontWeight: '500',
    alignSelf:"center" 
  },
  dropdown_image: { 
    width: mobileW * 3 / 100, 
    height: mobileW * 3 / 100,
    marginRight: mobileW * 4 / 100, 
    tintColor: Colors.greyColor 
  },
  data_text: { 
    fontSize: mobileW * 3 / 100, 
    fontWeight: '300', 
    color: Colors.blackColor, 
    width: mobileW * 24 / 100 
  },
  view_direction: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: "space-between", 
    width: '98%' 
  },
  category_view: { 
    width: '32%', 
    height: mobileW * 15 / 100, 
    justifyContent: 'center' 
  }
})
 
