{/* <TouchableOpacity onPress={() => navigation.navigate('Jobapply')}  */ }


import { View, StatusBar, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Alert, ScrollView, FlatList, TextInput, RefreshControl } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import axios from "axios"
import { it } from 'date-fns/locale';
// import { TextInput } from 'react-native-gesture-handler';


const jobdata = [
  {
    id: 1,
    company: 'Tata Consultancy Services',
    Company_Logo: require('./Icon/16.png'),
  },
  {
    id: 2,
    company: 'Infosys',
    Company_Logo: require('./Icon/Infosys.png'),
  },
  {
    id: 3,
    company: 'Paytm',
    Company_Logo: require('./Icon/paytmpng.png'),
  },
  {
    id: 4,
    company: 'Bigbasket',
    Company_Logo: require('./Icon/basket.png'),
  },
  {
    id: 5,
    company: 'Cibirix INC',
    Company_Logo: require('./Icon/cibipng.png'),
  },
  {
    id: 6,
    company: 'CSB Bank Limited',
    Company_Logo: require('./Icon/24.jpg'),
  },
  {
    id: 7,
    company: 'Bigbasket',
    Company_Logo: require('./Icon/basket.png'),
  },
  {
    id: 8,
    company: 'Cibirix INC',
    Company_Logo: require('./Icon/cibipng.png'),
  },
  {
    id: 9,
    company: 'Iksula',
    Company_Logo: require('./Icon/23.jpg'),
  },
  {
    id: 10,
    company: 'Bigbasket',
    Company_Logo: require('./Icon/basket.png'),
  }
]



const Job = ({ navigation }) => {

  const [companyList, setcompanyList] = useState(jobdata)
  const [searchQuery, setSearchQuery] = useState('');

  // ================ refresh controller 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  // ================ refresh controller 

  const _searchLearner = (text) => {
    setSearchQuery(text);
    const filteredResults = jobdata.filter((item) =>
      item.company.toLowerCase().includes(text.toLowerCase())
    );
    setcompanyList(filteredResults);
  };


  //   const _searchLearner = (textToSearch) => {
  //   var textToSearch = textToSearch.toString().toLowerCase();
  //   let data1 = companyList
  //   if (data1 != 'NA') {
  //      console.log('data1', data1);
  //     if (data1 != 'NA') {
  //       var text_data = textToSearch.trim();
  //       let newData = data1.filter(function (item) {
  //         var name = item.company
  //         return (
  //           name.toString().toLowerCase().indexOf(text_data) >= 0
  //         )
  //       });

  //       if (newData.length > 0) {
  //         setcompanyList(newData)
  //       } else if (newData.length <= 0) {
  //         setcompanyList('')
  //       }
  //     }
  //   }
  // }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white_color }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#00959e" translucent={true} />
        <ScrollView

          refreshControl={
            <RefreshControl
              // tintColor={Colors.themecolor}
              colors={[Colors.themecolor]}
              refreshing={refreshing} onRefresh={onRefresh} />
          }>

          <View style={styles.Header} >
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
              <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, }} source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.black_color, fontSize: mobileW * 4.2 / 100, fontFamily: Font.FontMedium }}>{Lang_chg.JobListTxt[config.language]}</Text>
            <Text>      </Text>
          </View>
          <View style={{}}>

            {/* 

           BL =  #121A23
White =  #FFFFFF
Gray =  #9B9B9B
BR =  #EFF2F1
BR2 =  #E7E8EA
Blue=  #00959E
BG =  #FAFAFA */}


            <View style={styles.SearchView}>
              <Image style={styles.SearchIcon} resizeMode='contain' source={require("./Icon/icon_search.png")}></Image>
              <TextInput
                placeholder={Lang_chg.SearchJobTxt[config.language]}
                placeholderTextColor={Colors.gray}
                color={Colors.black_color}
                // value={Search}
                value={searchQuery}
                onChangeText={(txt) => _searchLearner(txt)}
                style={{ left: mobileW * 3 / 100, fontFamily: Font.FontRegular, width: mobileW * 75 / 100, }}>
              </TextInput>
            </View>

            {companyList != "" ?
              <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: mobileW * 3 / 100 }}>

                <FlatList
                  numColumns={2}
                  data={companyList}
                  renderItem={({ item, id }) =>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Jobapply', { item: item })} style={styles.CardView}>
                      <View style={{ flexDirection: "row", padding: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.Company_LogoView}>
                          <Image resizeMode='contain' style={{ width: mobileW * 9 / 100, height: mobileW * 10 / 100 }} source={item.Company_Logo} />
                        </View>

                        <Text style={styles.CompanyName}>{item.company}</Text>
                      </View>
                    </TouchableOpacity>

                  } />
              </View>
              :
              <View style={{ alignItems: "center", justifyContent: "center", marginTop: mobileH * 35 / 100 }}>
                <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.blackColor, fontFamily: Font.FontMedium }}>{Lang_chg.Nodatafound[config.language]}</Text>
              </View>
            }
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
export default Job;
const styles = StyleSheet.create({
  Header: {
    width: mobileW,
    height: mobileW * 15 / 100,
    padding: mobileW * 4 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color
  },
  backIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    left: mobileW * 5.7 / 100,
  },
  SearchView:{
    flexDirection: 'row', 
    borderColor: "#E7E8EA", 
    left: mobileW * 4 / 100, 
    width: mobileW * 92 / 100, 
    height: mobileW * 12 / 100, 
    marginTop: mobileW * 4 / 100,
    borderRadius: mobileW * 6 / 100,
    borderWidth: mobileW * 0.3 / 100, 
  },
  SearchIcon: {
    alignSelf: 'center',
    tintColor: '#9B9B9B',
    left: mobileW * 2 / 100,
    width: mobileW * 5 / 100,
    height: mobileW * 5 / 100,
  },
  CardView: {
    alignSelf: "center",
    borderColor: "#E7E8EA",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: mobileW * 45 / 100,
    height: mobileW * 17.7 / 100,
    borderRadius: mobileW * 3 / 100,
    borderWidth: mobileW * 0.2 / 100,
    marginVertical: mobileW * 1 / 100,
    marginHorizontal: mobileW * 1 / 100,
  },
  Company_LogoView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
    borderRadius: mobileW * 1 / 100,
  },
  CompanyName: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    left: mobileW * 2 / 100,
    width: mobileW * 27.5 / 100,
    fontSize: mobileW * 3 / 100,
  }

})

