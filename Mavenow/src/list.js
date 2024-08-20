



import { View, Text } from 'react-native'
import React from 'react'

export default function list() {
  return (
    <View>
      <Text>list</Text>
    </View>
  )
}




                                    // ............................................................................................................................
// import React,{useEffect,useState} from 'react';
// import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { MultiSelect } from 'react-native-element-dropdown';
// import axios from "axios"

// const DATA = [
//     { label: 'React Naive', value: '1' },
//     { label: 'Javascript', value: '2' },
//     { label: 'Laravel', value: '3' },
//     { label: 'PHP', value: '4' },
//     { label: 'jQuery', value: '5' },
//     { label: 'Bootstrap', value: '6' },
//     { label: 'HTML', value: '7' },
//     { label: 'CSS', value: '8' },
// ];

// const App = () => {

//   const [selected, setSelected] = React.useState([]);
//   const [tag, setTag] = useState([]);

      
//   useEffect(() => {
//     apiCalling();
//     console.log('hello i am here');
//   }, [])

//   const apiCalling = () => {
//     axios.get('https://mavenow.com:8001/Tag/getAllTag')
//       .then(res => {
//         const nameList = res.data.getAllTag;
//        console.log('----------..................>', nameList)
//        setTag(nameList)
//                      })
//              .catch(function (error) {
//         console.log('---------->', error);
//       });
//   }

//     const renderDataItem = (item) => {
//         return (
//             <View style={styles.item}>
//                 <Text style={styles.selectedTextStyle}>{item.name}</Text>
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//                <MultiSelect
//                 // style={styles.dropdown}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 // inputSearchStyle={styles.inputSearchStyle}
//                 // iconStyle={styles.iconStyle}
//                 data={tag}
//                 labelField="name"
//                 valueField="name"
//                 placeholder="Multi Select item"
//                 value={selected}
//                 search
//                 searchPlaceholder="Search..."
//                 onChange={item => {
//                     setSelected(item);
//                 }}
//                 // renderLeftIcon={() => (
//                 // )}
//                 // renderItem={renderDataItem}
//                 renderSelectedItem={(item, unSelect) => (

//                 <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
//                 <View style={styles.selectedStyle}>
//                 <Text style={styles.textSelectedStyle}>{item.name}</Text>
//                 </View>
//                 </TouchableOpacity>
// )}
//             />
//             <StatusBar />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
      
//         paddingTop: 30,
//         flex:1
//     },
//        dropdown: {
//         height: 50,
//         backgroundColor: 'white',
       
        
//         padding: 12,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.2,
//         shadowRadius: 1.41,

//         elevation: 2,
//     },
//     placeholderStyle: {
//         fontSize: 16,
//     },
//     selectedTextStyle: {
//         fontSize: 14,
//     },
//     iconStyle: {
//         width: 20,
//         height: 20,
//     },
//     inputSearchStyle: {
//         height: 40,
//         fontSize: 16,
//     },
//     icon: {
//         marginRight: 5,
//     },
//     item: {
//         padding: 17,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     selectedStyle: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 14,
//         backgroundColor: 'white',
//         shadowColor: '#000',
//         marginTop: 8,
//         marginRight: 12,
//         paddingHorizontal: 12,
//         paddingVertical: 8,
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.2,
//         shadowRadius: 1.41,

//         elevation: 2,
//     },
//     textSelectedStyle: {
//         marginRight: 5,
//         fontSize: 16,
//     },
// });

// export default App;








































// // import React,{useState, useEffect} from 'react';
// // import {View,Text,FlatList} from 'react-native';
// // import {SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'
// // import axios from "axios"

// // const list = () => {

// //   const data = [

// //     {key:'Canada', value:'Canada'},
// //     {key:'England', value:'England'},
// //     {key:'Pakistan', value:'Pakistan'},
// //     {key:'India', value:'India'},
// //     {key:'NewZealand', value:'NewZealand'},
// //   ]

// //   const [selected, setSelected] = React.useState("");
// //   const [categories, setCategories] = React.useState([]);
// //   const [tag, setTag] = useState([]);

  


// //               // ==========================================================================  >                  get language  

// //   useEffect(() => {
// //     apiCalling();
// //   }, [])

// //   const apiCalling = () => {
// //     axios.get('https://mavenow.com:8001/Tag/getAllTag')
// //       .then(res => {
// //         const nameList = res.data.getAllTag;
// //        console.log('----------..................>', nameList)
// //        setTag(nameList)
// //                      })
// //              .catch(function (error) {
// //         console.log('---------->', error);
// //       });
// //   }
  
// // // ==========================================================================     >            get language
// //   return(
// //     <View style={{paddingHorizontal:15,marginTop:15}}>
// //     {tag!=''&&
// //   <MultipleSelectList 
// //         //setSelected={(val) => setSelected(val)} 
// //         data={tag} 
// //         save="name"
// //         onSelect={() => alert(selected)} 
// //     />}
// // {/* <FlatList
// //             data={tag}
// //             renderItem={({ item, index }) => 
// //             <Text>{item.name}</Text>}/> */}
// //       {/* <SelectList  save="name" setSelected={setSelected} data={tag} /> */}
// //       {/* <SelectList 
// //         setSelected={(val) => setSelected(val)} 
// //         data={tag} 
// //         save="name"
// //     /> */}


// //       {/* <MultipleSelectList 
// //         setSelected={(val) => setCategories(val)} 
// //         data={data} 
// //         save="value"
// //         label="Categories"
// //         boxStyles={{marginTop:25}}
// //     /> */}



    
      

    

// //     </View>
    
// //   )

// // };

// // export default list;