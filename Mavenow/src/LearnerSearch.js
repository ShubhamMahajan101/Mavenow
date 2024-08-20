import { View, ScrollView, StatusBar, Modal, Alert, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './Provider/Colorsfont';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function LearnerSearch({ navigation }) {
  const [number, onChangeNumber] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: mobileW * 2 / 100 }} onPress={() => navigation.goBack()}>
              <Image style={styles.backIcon_} resizeMode='contain'
                source={require("./Icon/bk.png")}></Image>
            </TouchableOpacity>
            <Text style={{ color: Colors.white_color, marginHorizontal: mobileW * 3 / 100, fontWeight: '500', fontSize: mobileW * 5 / 100 }}>Search</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)} style={{ marginRight: mobileW * 2 / 100 }} >
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
            }}>
            <View style={{ width: mobileW * 90 / 100, borderRadius: mobileW * 3 / 100, marginTop: mobileH * 25 / 100, alignSelf: 'center', backgroundColor: Colors.white_color, elevation: 5 }}>
              <View style={{ width: mobileW * 90 / 100, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: mobileW * 15 / 100, borderTopLeftRadius: mobileW * 2 / 100, borderTopRightRadius: mobileW * 2 / 100, backgroundColor: Colors.themecolor }}>
                <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontWeight: '500' }}></Text>
                <Text style={{ color: Colors.white_color, fontSize: mobileW * 5 / 100, fontWeight: '500' }}>Help:Search</Text>
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
        {/* ++++++++++++++++++++++++++++++++++++++ Search Bar ++++++++++++++++++++++++++++++++++++++++ */}
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholderTextColor={Colors.gray}
          fontSize={mobileW * 4 / 100}
          placeholder="Search Maven and Skils"
        // keyboardType="numeric"
        />
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  backIcon_: {
    width: mobileW * 9.5 / 100,
    height: mobileW * 9.5 / 100,
    tintColor: Colors.white_color
  },
  input: {
    height: mobileW * 12 / 100,
    margin: mobileW * 2 / 100,
    borderRadius: mobileW * 1 / 100,
    borderWidth: 1,
    padding: mobileW * 2 / 100,
    borderColor: Colors.themecolor
  },
}
)