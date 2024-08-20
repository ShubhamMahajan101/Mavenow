import { View, ScrollView, StatusBar, Modal, Alert, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { config, msgProvider, msgText, consolepro, Lang_chg, msgTitle, localimag, apifuntion, notification } from './Provider/utilslib/Utils';
import { Colors, Font } from './Provider/Colorsfont';
import { SafeAreaView } from 'react-native-safe-area-context'

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function Refund({ navigation }) {
  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        {/* ++++++++++++++++++++++++++++++++++++++ Header ++++++++++++++++++++++++++++++++++++++++ */}
        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon_} resizeMode='contain' source={require("./Icon/back(1).png")}></Image>
          </TouchableOpacity>
          <Text style={styles.headerText}>{Lang_chg.RefundHeaderTxt[config.language]}</Text>
          <Text style={styles.headerText}> </Text>

        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Header: {
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft: mobileW * 4 / 100,
    paddingRight: mobileW * 4 / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_color,
  },
  backIcon_: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.black_color,
  },
  headerText: {
    color: Colors.black_color,
    fontFamily: Font.FontMedium,
    fontSize: mobileW * 4 / 100,
  },
})
