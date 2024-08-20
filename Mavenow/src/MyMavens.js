import {StatusBar, Modal, Alert, ScrollView, TextInput, FlatList, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
import { config, msgProvider, msgText, consolepro, Lang_chg, Font, localStorage, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const DATA = [
  {
    id: 1,
    title: 'Tata Coffee',
    name: 'Grand Instant Coffee',
    price: 250.80,
    time: "8:30",
    date: "nov 12 2021"
  },
]
const DATA1 = [
  {
    id: 1,
    title: 'Black Tea',
    name: 'Grand Instant Tea',
    price: 250.80,
    time: "2:30",
    date: "oct 5 2021"
  },
]

export default function MyMavens({ navigation }) {
  const [checked, setChecked] = useState('Current')
  const [show, setShow] = useState('Add')
  const [number, onChangeNumber] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 5 / 100 }} onPress={() => navigation.goBack()} >
              <Image style={styles.backIcon} resizeMode='contain'
                source={require("./Icon/icon_back.png")}></Image>
            </TouchableOpacity>

            <Text style={{ color: Colors.white_color, fontWeight: '500', fontSize: mobileW * 5 / 100 }}>My Maven(s)</Text>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('search')} style={{ marginRight: mobileW * 2 / 100 }} >
              <Image style={styles.SearchIcon} resizeMode='contain'source={require("./Icon/icon_search.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={{ marginRight: mobileW * 2 / 100 }} >
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
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.ModelCard}>
              <View style={styles.ModelHeader}>
                <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontWeight: '500' }}></Text>
                <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontWeight: '500' }}>Help:My Maven(s)</Text>
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

                  </Text>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>

        {show != 'Add' &&
          <View style={{ width: mobileW, height: mobileW * 15 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>
            <View style={{ backgroundColor: Colors.white_color, width: mobileW * 95 / 100, flexDirection: 'row', borderRadius: mobileW * 1 / 100, alignItems: 'center' }}>
              <TextInput
                style={{ width: mobileW * 85 / 100, borderRadius: mobileW * 1 / 100, height: mobileW * 10 / 100, backgroundColor: Colors.white_color }}
                onChangeText={onChangeNumber}
                value={number}
                placeholder=" Search..."/>
               <TouchableOpacity activeOpacity={0.8} onPress={() => setShow('Add')}>
                <Image resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, borderRadius: mobileW * 2 / 100, tintColor: Colors.themecolor }}
                  source={require('./Icon/close2.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>}

        <View style={{ backgroundColor: Colors.themecolor, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Current')} style={[{ backgroundColor: checked === 'Current' ? Colors.white_color : Colors.themecolor,},styles.CurrentButton  ]} >
            <Text style={{ color: checked === 'Current' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 4 / 100, fontWeight: '500' }}>{Lang_chg.CurrentMaven[config.language]}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked('Old')} style={[{backgroundColor: checked === 'Old' ? Colors.white_color : Colors.themecolor}, styles.CurrentButton]} >
            <Text style={{ color: checked === 'Old' ? Colors.themecolor : Colors.white_color, fontSize: mobileW * 4 / 100, fontWeight: '500' }}>(s){Lang_chg.OldMaven[config.language]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.flatList2_View}>
          <FlatList
            data={checked == 'Current' ? DATA : DATA1}
            renderItem={({ item, index }) =>
              <View>
                <View style={{ alignItems: 'center', marginTop: mobileW * 10 / 100 }}>
                  <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.black_color, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.black_color, fontWeight: 'bold' }}>{item.price}</Text>
                  <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.black_color, fontWeight: 'bold' }}>{item.time}</Text>
                  <Text style={{ fontSize: mobileW * 5 / 100, color: Colors.black_color, fontWeight: 'bold' }}>{item.date}</Text>
                </View>
              </View>}
            keyExtractor={item => item.id}
          />
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
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  ModelHeader:{ 
    width: mobileW * 90 / 100, 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    alignItems: 'center', 
    height: mobileW * 15 / 100, 
    borderTopLeftRadius: mobileW * 2 / 100, 
    borderTopRightRadius: mobileW * 2 / 100, 
    backgroundColor: Colors.themecolor 
  },
  ModelCard:{ 
    width: mobileW * 90 / 100, 
    borderRadius: mobileW * 3 / 100, 
    marginTop: mobileH * 25 / 100, 
    alignSelf: 'center', 
    backgroundColor: Colors.white_color, 
    elevation: 5 
  },
  CurrentButton:{
    justifyContent: 'center', 
    alignItems: 'center', 
    width: mobileW * 47 / 100, 
    height: mobileW * 13 / 100, 
    borderTopLeftRadius: mobileW * 2 / 100, 
    borderTopRightRadius: mobileW * 2 / 100,
  }
})