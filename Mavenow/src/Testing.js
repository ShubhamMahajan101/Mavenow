
import { StatusBar, Animated, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {config, msgProvider, msgText, consolepro, Lang_chg, localStorage, apifuntion, msgTitle, Font, localimag, SocialLogin} from './Provider/utilslib/Utils';
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors } from './Provider/Colorsfont';
import axios from "axios"
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function Testing({ navigation, route }) {

  const item = route.params.item
  console.log("find data=======",item);
  const [checked, setChecked] = useState('Basic')
  const refRBSheet = useRef();
  const [IsSuggestedItem, setIsSuggestedItem] = useState(null);
  const [array, setArray] = useState([]);


  useEffect(() => {
      apiCalling();
    }, [])
  
    const apiCalling = () => {
      axios.post('https://mavenow.com:8001/skills/MavanowSearchEngine', {
        keywordstring: item
      })
          .then(function (data) {
            var GetData = data.data.MavanowSearchEngine
            var ErrorMessage = data.data.ErrorMessage
            console.log("all data",ErrorMessage)
            console.log('All data==>',GetData);
            if(ErrorMessage=="successfuly") {
              setArray(GetData)

            }else{
      
            }
      
          })
          .catch(function (error) {
            console.log('======>',error);
          });
    }

  const [ selectedItem, setSelectedItem] = useState([])
  // const arr = []

  const List2 = (item, index) => {
    
    setIsSuggestedItem(item);
    item.IsSuggested = !item.IsSuggested;

    let temp = array.filter((parentItem) => parentItem.Id !== item.Id);
   const newArr = temp.filter((x) => (x.IsSuggested == true));
    setIsSuggestedItem(temp);
    console.log('all array=====>>>',newArr);
   
 // ==================================================================================================================================
if (item.IsSuggested === true) { 
  selectedItem.push(item)
}
console.log('Item is selected=====>>>',selectedItem);

  }

  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{}} >
              <Image style={styles.backIcon} resizeMode='contain'
                source={require("./Icon/icon_back.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.white_color, fontWeight: '500', paddingHorizontal: mobileW * 5 / 100, fontSize: mobileW * 5 / 100 }}>{item}</Text>
          </View>
        </View>

        <View style={{ paddingLeft: mobileW * 1 / 100, paddingRight: mobileW * 2 / 100,paddingBottom:mobileH*20/100 }}>
          <FlatList
            data={array}
            renderItem={({ item, index }) =>
              <View>
                <View style={{ marginTop: mobileW * 3 / 100, padding: mobileW * 3 / 100, borderRadius: mobileW * 2 / 100 }}  >
                  <Text style={[{ fontSize: mobileW * 3.5 / 100, fontWeight: 'bold', color: Colors.gray }]}>{item.name}</Text>
                  <View style={styles.TestingCard}>
                    <FlatList
                      data={item.skills}
                      horizontal={false}
                      contentContainerStyle ={{backgroundColor:'yellow',width:'100%',height:'100%',}}
                      style ={{width:'100%'}}
                      numColumns={4}
                      columnWrapperStyle={{flexWrap: 'wrap'}}
                      renderItem={({ item, index }) =>
                        <View style={{flexDirection:'row'}}>

                          <TouchableOpacity activeOpacity={0.8} onPress={() => List2(item) } 
                          style={[styles.TestingCard1,  { backgroundColor: item.IsSuggested ? Colors.themecolor : Colors.lightgray,marginLeft:mobileW*1/100 }]} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                     <Text style={[{ fontSize: mobileW * 3.5 / 100, fontWeight: 'bold', color: item.IsSuggested ? Colors.white_color : Colors.black_color }]}>{item.SkillName}</Text>

                              {item.IsSuggested != false &&
                                <Image resizeMode='contain' style={styles.listCloseIcon}
                                  source={require('./Icon/close2.png')}></Image>}
                            </View>
                          </TouchableOpacity>
                        </View>
                      }
                      keyExtractor={item => item.id}
                    />
                  </View>
                </View>

              </View>}
            keyExtractor={item => item.id}
          />

          <View style={{ backgroundColor: Colors.white }}>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => refRBSheet.current.open()} style={styles.SubmitButton}>
            <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.white_color, fontWeight: '700' }}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={mobileW * 77 / 100}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
        >
          <View style={{ padding: mobileW * 3 / 100 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: Colors.black_color, fontSize: mobileW * 4 / 100 }}>Select Expert Level</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => refRBSheet.current.close()}>
                <Image resizeMode='contain' style={styles.closeIcon}
                  source={require('./Icon/close2.png')}></Image>
              </TouchableOpacity>
            </View>
            <View style={{ width: mobileW * 92 / 100, height: mobileW * 0.3 / 100, marginTop: mobileW * 3 / 100, backgroundColor: Colors.gray }}></View>
            <Text style={{ color: Colors.gray, fontWeight: '500', marginTop: mobileW * 2 / 100, fontSize: mobileW * 4 / 100 }}>We have whom can help you immediately to fix your problem would like
              to connect level of maven experties</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: mobileW * 6 / 100, marginRight: mobileW * 5 / 100 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Basic')} style={[{ borderColor: checked === 'Basic' ? Colors.themecolor : Colors.gray }, styles.basicButton]}>
              {checked == 'Basic' ?
                  <Image resizeMode='contain' style={styles.iconTick}
                    source={require('./Icon/icon_tick.png')}></Image>
                    :
                    <Image resizeMode='contain' style={styles.iconTick}
                    ></Image>
                    }
                <Text style={{ fontSize: mobileW * 4 / 100, color: checked === 'Basic' ? Colors.themecolor : Colors.black_color, fontWeight: '500' }}>Basic</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Medium')} style={[{ borderColor: checked === 'Medium' ? Colors.themecolor : Colors.gray, }, styles.basicButton]}>
              {checked == 'Medium' ?
                  <Image resizeMode='contain' style={styles.iconTick}
                    source={require('./Icon/icon_tick.png')}></Image>
                    :
                    <Image resizeMode='contain' style={styles.iconTick}
                    ></Image>
                    }
                <Text style={{ fontSize: mobileW * 4 / 100, color: checked === 'Medium' ? Colors.themecolor : Colors.black_color, fontWeight: '500' }}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Advance')} style={[{ borderColor: checked === 'Advance' ? Colors.themecolor : Colors.gray, }, styles.basicButton]}>
                {checked == 'Advance' ?
                  <Image resizeMode='contain' style={styles.iconTick}
                    source={require('./Icon/icon_tick.png')}></Image>
                    :
                    <Image resizeMode='contain' style={styles.iconTick}
                    ></Image>
                    }
                <Text style={{ fontSize: mobileW * 4 / 100, color: checked === 'Advance' ? Colors.themecolor : Colors.black_color, fontWeight: '500' }}>Advance</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: mobileW * 5 / 100 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => refRBSheet.current.close()} style={styles.CancleButton}>
                <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color, fontWeight: '500' }}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Chatbots',{data:selectedItem})} style={styles.RbsubmitButton}>
                <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontWeight: '500' }}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>

        </RBSheet>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header: {
    backgroundColor: Colors.themecolor,
    width: mobileW, height: mobileW * 15 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mobileW * 5 / 100
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  TestingCard: {
    width: mobileW * 90 / 100,
    elevation: 1,
    padding: mobileW * 3 / 100,
    borderRadius: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    shadowColor: '#000',
    borderColor: "#000",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
    marginTop: mobileW * 5 / 100
  },
  TestingCard1: {
    elevation: 1,
    padding: mobileW * 3 / 100,
    borderRadius: mobileW * 2 / 100,
    marginTop: mobileW * 3 / 100
  },
  sublistData: {
    backgroundColor: Colors.viewColor,
    padding: mobileW * 2 / 100,
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    borderRadius: mobileW * 1 / 100
  },
  listCloseIcon: {
    width: mobileW * 4 / 100,
    marginLeft: mobileW * 5 / 100,
    height: mobileW * 4 / 100,
    alignSelf: 'flex-end',
    tintColor: Colors.white_color
  },
  SubmitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    width:mobileW*96/100,
    height: mobileW * 12 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    marginTop: mobileW * 10 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  basicButton: {
    width: mobileW * 28 / 100,
    height: mobileW * 13 / 100,
    borderWidth: mobileW * 0.3 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mobileW * 1 / 100,
    padding: mobileW * 1 / 100
  },
  CancleButton: {
    backgroundColor: Colors.lightgray,
    borderRadius: mobileW * 1 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: mobileW * 45 / 100,
    height: mobileW * 10 / 100,
    marginHorizontal: mobileW * 2 / 100
  },
  RbsubmitButton: {
    width: mobileW * 45 / 100,
    height: mobileW * 10 / 100,
    marginHorizontal: mobileW * 2 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 1 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconTick: {
    width: mobileW * 4 / 100,
    marginBottom: mobileW * -1.5 / 100,
    height: mobileW * 4 / 100,
    alignSelf: 'flex-end',
    tintColor: Colors.themecolor
  },
  closeIcon: {
    width: mobileW * 7 / 100,
    height: mobileW * 7 / 100,
    tintColor: Colors.red,
    marginRight: mobileW * 5 / 100
  }
}
)
