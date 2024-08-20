import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

export default function Request({navigation}) {
  return (
    <View>
<TouchableOpacity onPress={()=>navigation.navigate('Login')}>
      <Text>Request</Text>
      </TouchableOpacity>

    </View>
  )
}