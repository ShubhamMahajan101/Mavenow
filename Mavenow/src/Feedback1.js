
// import React, { useState } from 'react';

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// const Feedback1 = () => {
//   // To set the default Star Selected
//   const [defaultRating, setDefaultRating] = useState(2);
//   // To set the max number of Stars
//   const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5,]);

//   const CustomRatingBar = () => {
//     return (
//       <View style={styles.customRatingBarStyle}>
//         {maxRating.map((item, key) => {
//           return (
//             <TouchableOpacity
//               activeOpacity={0.7}
//               key={item}
//               onPress={() => setDefaultRating(item)}>
//               <Image
//                 style={styles.starImageStyle}
//                 source={
//                   item <= defaultRating
//                     ? require('./Icon/star.png')

//                     :require('./Icon/SShare.png')
//                 }
//               />
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>


//         <CustomRatingBar />
//         <Text style={styles.textStyle}>

//           {defaultRating} / {Math.max.apply(null, maxRating)}
//         </Text>

//       </View>
//     </SafeAreaView>
//   );
// };

// export default Feedback1;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 10,
//     // justifyContent: 'center',
//     textAlign: 'center',
//   },
//   textStyle: {
//     textAlign: 'center',
//     fontSize: 23,
//     color: '#000',
//     marginTop: 15,
//   },
//   customRatingBarStyle: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 30,
//   },
//   starImageStyle: {
//     width: 40,
//     height: 40,
//     resizeMode: 'cover',
//   },
// });





import { StatusBar, ScrollView, Animated, FlatList, TextInput, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Font } from './Provider/Colorsfont';

// import { TextInput } from 'react-native-gesture-handler';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;


export default function Feedback1({navigation}) {
  const [description, setDescription] = useState(null);

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>

        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? require('./Icon/star.png')

                    : require('./Icon/SShare.png')
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };


  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
        <View style={styles.Header}>
        <TouchableOpacity activeOpacity={0.8} style={{}} onPress={()=>navigation.goBack()}>
            <Image style={{width:mobileW*6/100, height:mobileW*6/100}} resizeMode='contain'
               source={require("./Icon/back(1).png")}></Image>
           </TouchableOpacity>
          <Text style={styles.HeaderText}>Feedback1</Text>
          <Text style={styles.HeaderText}> </Text>
        </View>
        <ScrollView>
          <View style={styles.profileCard}>
            <Image resizeMode='contain' style={styles.profileImage}
              source={require('./Icon/ic_profile_placeholder_w.png')}></Image>
          </View>
          <Text style={styles.yourRating}>Your Rating:</Text>

          <CustomRatingBar />
          <View style={{ flexDirection: 'row', paddingRight: mobileW * 5 / 100, paddingLeft: mobileW * 5 / 100, justifyContent: 'space-between' }}>
            <View>
              <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
                source={require('./Icon/star.png')}></Image>
              <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3 / 100, textAlign: 'center', fontFamily: Font.FontRegular }}>Terrible</Text>
            </View>
            <View>
              <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
                source={require('./Icon/star.png')}></Image>
              <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3 / 100, textAlign: 'center', fontFamily: Font.FontRegular }}>Terrible</Text>
            </View>
            <View>
              <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
                source={require('./Icon/star.png')}></Image>
              <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3 / 100, textAlign: 'center', fontFamily: Font.FontRegular }}>Terrible</Text>
            </View>
            <View>
              <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
                source={require('./Icon/star.png')}></Image>
              <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3 / 100, textAlign: 'center', fontFamily: Font.FontRegular }}>Terrible</Text>
            </View>
            <View>
              <Image style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, tintColor: Colors.light_grey }}
                source={require('./Icon/star.png')}></Image>
              <Text style={{ color: Colors.dark_gray, fontSize: mobileW * 3 / 100, textAlign: 'center', fontFamily: Font.FontRegular }}>Terrible</Text>
            </View>
          </View>
          <Text style={styles.reviewDescription}>Review Description:</Text>
          <View style={styles.reviewCard}>
            <TextInput style={{ fontSize: mobileW * 5 / 100, color: Colors.gray, padding: mobileW * 2 / 100, fontFamily: Font.FontRegular }}
              multiline onChangeText={setDescription}
              value={description}
              placeholderTextColor={Colors.gray}
              placeholder="Review"
            // keyboardType="numeric"
            />
          </View>
          {/* ======================================= Login Button ===================================== */}
          <TouchableOpacity activeOpacity={0.8} style={styles.PostView}>
            <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.white_color, fontFamily: Font.FontMedium }}>POST</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header: {
    backgroundColor: Colors.white_color,
    width: mobileW,
    height: mobileW * 15 / 100,
    paddingLeft:mobileW*4/100, 
    paddingRight:mobileW*4/100,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  HeaderText: {
    fontSize: mobileW * 4 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontSemiBold,
    // paddingHorizontal: mobileW * 5 / 100
  },
  backIcon: {
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
    tintColor: Colors.white_color,
    borderRadius: mobileW * 4 / 100
  },
  SearchIcon: {
    width: mobileW * 6 / 100,
    height: mobileW * 6 / 100,
    tintColor: Colors.white_color
  },
  profileCard: {
    width: mobileW * 25 / 100,
    margin: mobileW * 4 / 100,
    height: mobileW * 25 / 100,
    borderWidth: mobileW * 0.8 / 100,
    borderColor: Colors.themecolor,
    borderRadius: mobileW * 15 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: mobileW * 22 / 100,
    height: mobileW * 22 / 100,
    marginTop: mobileW * 2 / 100,
    borderRadius: mobileW * 10 / 100,
    tintColor: Colors.gray
  },
  yourRating: {
    paddingLeft: mobileW * 4 / 100,
    color: Colors.black_color,
    fontFamily: Font.FontRegular,
    fontSize: mobileW * 4 / 100
  },
  PostView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mobileW * 14 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 3 / 100,
    margin: mobileW * 4 / 100,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  customRatingBarStyle: {
    flexDirection: 'row',
    paddingRight: mobileW * 4 / 100,
    paddingLeft: mobileW * 4 / 100,
    justifyContent: 'space-between'
  },
  starImageStyle: {
    width: mobileW * 10 / 100,
    height: mobileW * 10 / 100,
    resizeMode: 'cover',
  },
  reviewDescription: {
    paddingTop: mobileW * 5 / 100,
    paddingLeft: mobileW * 4 / 100,
    color: Colors.black_color,
    fontSize: mobileW * 4 / 100
  },
  reviewCard: {
    width: mobileW * 90 / 100,
    height: mobileH * 22 / 100,
    marginTop: mobileW * 2 / 100,
    backgroundColor: Colors.white_color,
    elevation: 1,
    borderColor: Colors.themecolor,
    borderWidth: mobileW * 0.4 / 100,
    alignSelf: 'center',
    borderRadius: mobileW * 3 / 100
  }
})