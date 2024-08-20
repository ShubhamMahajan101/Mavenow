import { View, Text } from 'react-native'
import React from 'react'
import { mobileW } from './Provider/utilslib/Utils'
import { Colors } from 'react-native-paper'
import { Chip } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header() {
  return (
    <View style={{flexDirection:'row', width:mobileW}}>
    
    <View style={{marginTop:mobileW*5/100}} >
<Chip 
    title="Solid Chip"
/>
</View>

<View style={{marginTop:mobileW*5/100}} >
<Chip
    title="Disabled Chip"
   disabled
/>
</View>

<View style={{marginTop:mobileW*5/100}} >
<Chip 
    title="Outlined Chip"
    type="outline"
/>
</View>

<View style={{marginTop:mobileW*5/100}} >
<Chip
    title="Outlined & Disabled"
    type="outline"
    disabled
/>
</View>

<View style={{marginTop:mobileW*5/100}} >
<Chip
    title="Left Icon Chip"
    icon={{
    name: "bluetooth",
    type: "font-awesome",
    size: 20,
    color: 'white',
    }}
/>
</View>

<View style={{marginTop:mobileW*5/100}} >
<Chip
    title="Right Icon Chip"
    icon={{
    name: "close",
    type: "font-awesome",
    size: 20,
    color: "white",
    }}
    iconRight
/>
</View>

    </View>
  )
}

