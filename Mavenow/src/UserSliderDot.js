import { View, Animated, StyleSheet, Dimensions } from 'react-native'
import React from 'react';
import { Colors } from './Provider/Colorsfont';
const {width} = Dimensions.get('screen')
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;

export default function UserSliderDot({data, scrollX}) {
  return (
    <View style={styles.Container}>
      {/* <Text>SliderDot</Text> */}

      {data.map((_, idx) =>{
        const inputRange = [(idx-1)*width,idx * width,(idx+1)* width];
        const dotWidth =scrollX.interpolate({
            inputRange,
            outputRange:[4,4,4],
            extrapolate:'clamp'
        })
        const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#ccc', Colors.blackColor, '#ccc'],
            extrapolate: 'clamp',
          });
        return <Animated.View kay={idx.toString()} style={[styles.dot, {width: dotWidth, backgroundColor},]}/>
      })}
    </View>
  )
}
const styles = StyleSheet.create({
Container:{
position:'absolute',
bottom:8,
flexDirection:'row',
marginTop:mobileH*4/100,
width:'100%',
// alignItems:'center',
justifyContent:'center'

    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
      },
      dotActive: {
        backgroundColor: Colors.themecolor,
      },
//     StyleDot:{
// width:12, height:12, borderRadius:6,
// backgroundColor:Colors.themecolor
//     }
})