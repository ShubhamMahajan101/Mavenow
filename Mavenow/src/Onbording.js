import { View,StatusBar, Text, FlatList, Image, Dimensions, ImageBackground, StyleSheet, SlideItem, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { config, msgProvider, msgText, consolepro, Lang_chg,  apifuntion, msgTitle, Font,  localimag, SocialLogin } from './Provider/utilslib/Utils';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './Provider/Colorsfont';
import SliderDot from './SliderDot';
import { localStorage } from './Provider/localStorageProvider';
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
global.togalemode =""
global.dashoard_modal = false;
const slides = [
  {
    id: 0,
    image: require('./Icon/welcome_one.png'),
    title: 'Maven',
    discription: 'An experienced professional who provides Instant Solutions, Mentorship, or Guidance to other professional to give instant Solutions.'
  },
  {
    id: 1,
    image: require('./Icon/welcome_two.png'),
    title: 'Learner',
    discription: 'A professional who is seeking Solutions, Mentorship, or Guidance to gain knowledge & sharpe his/her skills.'
  },
  {
    id: 2,
    image: require('./Icon/welcome_three.png'),
    title: 'Free Registration',
    discription: "Maven/ Learner can get Registered free as per their experties to become a part of Mavenow's vision to build empowered professionals globally."
  },
  {
    id: 3,
    image: require('./Icon/welcome_four.png'),
    title: 'Connect With Maven',
    discription: 'Learners can connect with their relevant expertise to chat and get instant solutions to their problems.'
  },
  {
    id: 4,
    image: require('./Icon/welcome_five.png'),
    title: 'Badges',
    discription: 'Maven get a chance to be awarded badges and get globally renowned for their expertise.'
  },
  {
    id: 5,
    image: require('./Icon/welcome_six.png'),
    title: 'Free Upskilling Cources',
    discription: 'Learners can upgrade and escalate profesional growth with free upskilling courses compiled by industry experts.',
  },
]

export default function Onbording({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [indexof, setIndex] = useState(1);
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX
            },
          },
        },
      ],
      {
        useNativeDriver: false
      },
    )(event)
  };
  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index + 1)
    console.log(viewableItems[0].index + 1, '-------------', viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const ITEM_WIDTH = mobileW * 100 / 100 // size of you element
  const flatListRef = useRef(null)
  const TochangeIndex = () => {
    console.log("indexof", indexof);
    if (indexof != 6) {
      setIndex(indexof)
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: indexof }) // Scroll to day 10
      }
    }
  }

  const NavigationPage = () =>{
    navigation.navigate('Login');
    localStorage.setItemString('OnboardingPage','Done');
   }

  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 1, }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
          {/* <ImageBackground resizeMode='contain' style={styles.backgroundImage}
            source={require('./Icon/screen_design.png')}> */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => NavigationPage()}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          {/* </ImageBackground> */}
          <View>
          <FlatList
            pagingEnabled
            viewabilityConfig={viewabilityConfig}
            snapToAlignment='center'
            onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}

            ref={flatListRef} // add ref
            getItemLayout={(data, index) => (
              { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
            )}
            data={slides}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            // onViewableItemsChanged={onViewRef.current}
            // viewabilityConfig={viewConfigRef.current}
            renderItem={({ item, index }) =>
              <View style={{  width: mobileW, }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: mobileW, padding: mobileW * 10 / 100  }}>

                  <Image resizeMode='contain' style={{ width: mobileW * 75 / 100, height: mobileH * 40 / 100  }}
                    source={item.image}></Image>

                  <Text style={{ alignItems: 'center', color: Colors.black_color, fontFamily:Font.FontSemiBold, fontSize: mobileW * 5 / 100 ,  }}>{item.title}</Text>
                  {/* <TouchableOpacity onPress={()=>indexChange()}> */}

                  <View style={{marginTop:mobileH*2/100, width: mobileW * 87 / 100}}>
                  <Text style={styles.description}>{item.discription}</Text>
                  </View>
                  </View>

              </View>

            }

          />
          </View>

<View style={{}}>
  
           
          <View>
          {indexof != 6 ?
             <View style={{flexDirection:"row",justifyContent:'space-around',marginTop:mobileW*35/100,   }}>
             <View style={{marginHorizontal:mobileW*40/100,  }}>
             {indexof != 6 ?
           <SliderDot data={slides} scrollX={scrollX} />:null}
           </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => TochangeIndex()} style={styles.nextText}>
              <Text style={{fontSize:mobileW*5/100, fontFamily:Font.FontMedium, color:Colors.themecolor,}}>Next</Text>
              {/* <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, }}
                source={require('./Icon/icon_arrow_next.png')}></Image> */}
            </TouchableOpacity>
            </View>

             :
            <TouchableOpacity activeOpacity={0.8} style={styles.getstart} onPress={() => NavigationPage()}>
              <Text style={{ fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium, color: Colors.white_color }}>GET STARTED</Text>
            </TouchableOpacity>}
            </View>
             {/* {indexof != 6 ?
            <TouchableOpacity activeOpacity={0.8} onPress={() => TochangeIndex()} style={styles.NextPageArrow}>
              <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, }}
                source={require('./Icon/icon_arrow_next.png')}></Image>
            </TouchableOpacity> :
            <TouchableOpacity activeOpacity={0.8} style={styles.getstart} onPress={() => NavigationPage()}>
              <Text style={{ fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium, color: Colors.white_color }}>Get Started</Text>
            </TouchableOpacity>}
            <View>
            {indexof != 6 ?
          <SliderDot data={slides} scrollX={scrollX} />:null} */}
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipText: {
    fontSize: mobileW * 4 / 100,
    fontFamily:Font.FontMedium,
    color: Colors.black_color,
    alignSelf: 'flex-end',
    marginRight: mobileW * 5 / 100,
    marginTop: mobileW * 8 / 100
  },
  backgroundImage: {
    width: mobileW * 50 / 100, 
    alignSelf: 'flex-end',
    height: mobileW * 35 / 100,
    backgroundColor: Colors.white_color
  },
  nextText:{
right:mobileW*5/100
  },
  // NextPageArrow: {
  //   marginBottom: mobileH * 15 / 100,
  //   width: mobileW * 16 / 100,
  //   height: mobileW * 16 / 100,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: mobileW * 8 / 100,
  //   alignSelf: 'center',
  //   elevation: 1,
  //   shadowColor: '#000',
  //   borderColor: "#e8edfb",
  //   borderWidth: 1,
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, },
  //   shadowOpacity: 0.1,
  //   backgroundColor: Colors.themecolor
  // },
  getstart: {
    bottom:mobileW*-36/100,
    width: mobileW * 90 / 100,
    height: mobileW * 10 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mobileW * 1.5 / 100,
    alignSelf: 'center',
    backgroundColor: Colors.themecolor,
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  description:{ 
    alignItems: 'center', 
    textAlign: 'center', 
    color: Colors.gray, 
    fontFamily:Font.FontRegular, 
    fontSize: mobileW * 4 / 100 
  },
})



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import { View,StatusBar, Text, FlatList, Image, Dimensions, ImageBackground, StyleSheet, SlideItem, Animated, TouchableOpacity } from 'react-native'
// import React, { useRef, useState, useEffect } from 'react'
// import { config, msgProvider, msgText, consolepro, Lang_chg,  apifuntion, msgTitle, Font,  localimag, SocialLogin } from './Provider/utilslib/Utils';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Colors } from './Provider/Colorsfont';
// import SliderDot from './SliderDot';
// import { localStorage } from './Provider/localStorageProvider';
// const mobileW = Dimensions.get('window').width;
// const mobileH = Dimensions.get('window').height;
// global.togalemode =""
// global.dashoard_modal = false;
// const slides = [
//   {
//     id: 0,
//     image: require('./Icon/welcome_one.png'),
//     title: 'Maven',
//     discription: 'An experienced professional who provides Instant Solutions, Mentorship, or Guidance to other professional to give instant Solutions.'
//   },
//   {
//     id: 1,
//     image: require('./Icon/welcome_two.png'),
//     title: 'Learner',
//     discription: 'A professional who is seeking Solutions, Mentorship, or Guidance to gain knowledge & sharpe his/her skills.'
//   },
//   {
//     id: 2,
//     image: require('./Icon/welcome_three.png'),
//     title: 'Free Registration',
//     discription: "Maven/ Learner can get Registered free as per their experties to become a part of Mavenow's vision to build empowered professionals globally."
//   },
//   {
//     id: 3,
//     image: require('./Icon/welcome_four.png'),
//     title: 'Connect With Maven',
//     discription: 'Learners can connect with their relevant expertise to chat and get instant solutions to their problems.'
//   },
//   {
//     id: 4,
//     image: require('./Icon/welcome_five.png'),
//     title: 'Badges',
//     discription: 'Maven get a chance to be awarded badges and get globally renowned for their expertise.'
//   },
//   {
//     id: 5,
//     image: require('./Icon/welcome_six.png'),
//     title: 'Free Upskilling Cources',
//     discription: 'Learners can upgrade and escalate profesional growth with free upskilling courses compiled by industry experts.',
//   },
// ]

// export default function Onbording({ navigation }) {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [indexof, setIndex] = useState(1);
//   const handleOnScroll = event => {
//     Animated.event(
//       [
//         {
//           nativeEvent: {
//             contentOffset: {
//               x: scrollX
//             },
//           },
//         },
//       ],
//       {
//         useNativeDriver: false
//       },
//     )(event)
//   };
//   const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
//     setIndex(viewableItems[0].index + 1)
//     console.log(viewableItems[0].index + 1, '-------------', viewableItems[0].index);
//   }).current;

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;

//   const ITEM_WIDTH = mobileW * 100 / 100 // size of you element
//   const flatListRef = useRef(null)
//   const TochangeIndex = () => {
//     console.log("indexof", indexof);
//     if (indexof != 6) {
//       setIndex(indexof)
//       if (flatListRef.current) {
//         flatListRef.current.scrollToIndex({ index: indexof }) // Scroll to day 10
//       }
//     }
//   }

//   const NavigationPage = () =>{
//     navigation.navigate('Login');
//     localStorage.setItemString('OnboardingPage','Done');
//    }

//   return (
//     <View style={{ flex: 1 }}>

//       <View style={{ flex: 1, }}>
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white_color }}>
//           <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />
//           <ImageBackground resizeMode='contain' style={styles.backgroundImage}
//             source={require('./Icon/screen_design.png')}>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => NavigationPage()}>
//               <Text style={styles.skipText}>Skip</Text>
//             </TouchableOpacity>
//           </ImageBackground>
//           <View>
//           <FlatList
//             pagingEnabled
//             viewabilityConfig={viewabilityConfig}
//             snapToAlignment='center'
//             onScroll={handleOnScroll}
//             onViewableItemsChanged={handleOnViewableItemsChanged}

//             ref={flatListRef} // add ref
//             getItemLayout={(data, index) => (
//               { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
//             )}
//             data={slides}
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             keyExtractor={(item, index) => index.toString()}
//             // onViewableItemsChanged={onViewRef.current}
//             // viewabilityConfig={viewConfigRef.current}
//             renderItem={({ item, index }) =>
//               <View style={{  width: mobileW, }}>

//                 <View style={{ justifyContent: 'center', alignItems: 'center', width: mobileW, padding: mobileW * 10 / 100  }}>

//                   <Image resizeMode='contain' style={{ width: mobileW * 75 / 100, height: mobileH * 40 / 100  }}
//                     source={item.image}></Image>

//                   <Text style={{ alignItems: 'center', color: Colors.themecolor, fontFamily:Font.FontSemiBold, fontSize: mobileW * 5 / 100 ,  }}>{item.title}</Text>
//                   {/* <TouchableOpacity onPress={()=>indexChange()}> */}

//                   <View style={{marginTop:mobileH*2/100, width: mobileW * 87 / 100}}>
//                   <Text style={styles.description}>{item.discription}</Text>
//                   </View>
//                   </View>

//               </View>

//             }

//           />
//           </View>
//              {indexof != 6 ?
//             <TouchableOpacity activeOpacity={0.8} onPress={() => TochangeIndex()} style={styles.NextPageArrow}>
//               <Image resizeMode='contain' style={{ width: mobileW * 7 / 100, height: mobileW * 7 / 100, }}
//                 source={require('./Icon/icon_arrow_next.png')}></Image>
//             </TouchableOpacity> :
//             <TouchableOpacity activeOpacity={0.8} style={styles.getstart} onPress={() => NavigationPage()}>
//               <Text style={{ fontSize: mobileW * 4 / 100, fontFamily:Font.FontMedium, color: Colors.white_color }}>Get Started</Text>
//             </TouchableOpacity>}
//             <View>
//             {indexof != 6 ?
//           <SliderDot data={slides} scrollX={scrollX} />:null}
//           </View>
//         </SafeAreaView>
//       </View>
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   skipText: {
//     fontSize: mobileW * 4 / 100,
//     fontFamily:Font.FontMedium,
//     color: Colors.white_color,
//     alignSelf: 'flex-end',
//     marginRight: mobileW * 5 / 100,
//     marginTop: mobileW * 8 / 100
//   },
//   backgroundImage: {
//     width: mobileW * 50 / 100, 
//     alignSelf: 'flex-end',
//     height: mobileW * 35 / 100,
//     backgroundColor: Colors.white_color
//   },
//   NextPageArrow: {
//     marginBottom: mobileH * 15 / 100,
//     width: mobileW * 16 / 100,
//     height: mobileW * 16 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: mobileW * 8 / 100,
//     alignSelf: 'center',
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//     backgroundColor: Colors.themecolor
//   },
//   getstart: {
//     marginBottom: mobileH * 12 / 100,
//     width: mobileW * 90 / 100,
//     height: mobileW * 10 / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: mobileW * 4 / 100,
//     alignSelf: 'center',
//     backgroundColor: Colors.themecolor,
//     elevation: 1,
//     shadowColor: '#000',
//     borderColor: "#e8edfb",
//     // borderWidth: 1,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, },
//     shadowOpacity: 0.1,
//   },
//   description:{ 
//     alignItems: 'center', 
//     textAlign: 'center', 
//     color: Colors.blackColor, 
//     fontFamily:Font.FontRegular, 
//     fontSize: mobileW * 4 / 100 
//   },
// })


