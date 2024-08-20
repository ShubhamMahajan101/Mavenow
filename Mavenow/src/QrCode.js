import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {  Font, Colors, config, msgProvider, msgText, consolepro, Lang_chg, localStorage, Currentltlg, msgTitle, localimag, apifuntion, notification, } from './Provider/utilslib/Utils';

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

const QrCode = () => {
  const qrData = 'Dummy QRCode'; // Replace with your actual data

  return (
    <View style={{flex:1,}}>
        <View style={styles.HeaderView}>
            <TouchableOpacity activeOpacity={0.8}>
            <Image resizeMode='contain' style={{width:mobileW*8/100, height:mobileW*8/100}}
            source={require("./Icon/back(1).png")}></Image>
            </TouchableOpacity>
            <Text style = {[styles.qrCodeTxt,{fontSize:mobileW*5/100}]}>QRCode</Text>
            <Text> </Text>
        </View>
    <View style={styles.container}>

        <View><Text style = {styles.qrCodeTxt}>QRCode</Text></View>
      <QRCode
        value={qrData}
        size={200} // Adjust the size of the QR code as needed
      />
    </View>
    </View>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 HeaderView:{
    width:mobileW, 
    padding:mobileW*4/100, 
    height:mobileH*10/100, 
    alignItems:'center', 
    flexDirection:'row', 
    backgroundColor:'red',
    justifyContent:'space-between',
},
  qrCodeTxt:{
      color:Colors.black_color,
      fontFamily:Font.FontSemiBold,
      fontSize : mobileW * 7 / 100,
}
});




