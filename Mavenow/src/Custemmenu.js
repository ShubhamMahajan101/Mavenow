// import { MenuProvider } from 'react-native-popup-menu';
// import { Modal, Alert, ScrollView, TextInput, StatusBar, Animated, FlatList, RefreshControl, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
// import React, { useState, useEffect } from 'react';

// export const App = () => (
//   <MenuProvider>
//     <YourApp />
//   </MenuProvider>
// );

// // somewhere in your app
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';

// export const YourComponent = () => (
//   <View>
//     <Text>Hello world!</Text>
//     <Menu>
//       <MenuTrigger text='Select action' />
//       <MenuOptions>
//         <MenuOption onSelect={() => alert(`Save`)} text='Save' />
//         <MenuOption onSelect={() => alert(`Delete`)} >
//           <Text style={{color: 'red'}}>Delete</Text>
//         </MenuOption>
//         <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
//       </MenuOptions>
//     </Menu>
//   </View>
// );

import { View, Text } from 'react-native'
import React from 'react'

export default function Custemmenu() {
  return (
    <View>
      <Text>Custemmenu</Text>
    </View>
  )
}