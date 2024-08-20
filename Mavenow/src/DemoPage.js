// import React, { useState } from 'react'
// import {
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   LayoutAnimation,
//   UIManager,
//   Platform,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { mobileW } from "./Provider/utilslib/Utils";

// const { width } = Dimensions.get('window');

// const dummyData = [
//   {
//     id: 1,
//     name: "orange card",
//     color: "orange",
//     isselect: "false"
//   },
//   {
//     id: 2,
//     name: "red card",
//     color: "red",
//     isselect: "false"
//   },
//   {
//     id: 3,
//     name: "green card",
//     color: "green",
//     isselect: "false"
//   },
//   {
//     id: 4,
//     name: "blue card",
//     color: "blue",
//     isselect: "false"
//   },
//   {
//     id: 5,
//     name: "cyan card",
//     color: "cyan",
//     isselect: "false"
//   },
//   {
//     id: 6,
//     name: "red card",
//     color: "red",
//     isselect: "false"
//   },
 
// ];

// export default function App() {
//   const [data, setdata] = useState(dummyData); 

//   // const multipleSelect = (item) => {
//   //   let selectItem =dummyData.map((data)=>
//   //   data.id==item.id?{...data, isselect:false}:{...data, isselect:true}
//   //   )
//   //   setdata(selectItem)
//   // }
 
//   const multipleSelect = async (item) => {
//     const selectItem = dummyData.map(obj => {
//       if (obj.id === item.id) {
//         if (obj.isselect == true) {
//           return { ...obj,isselect: false };
  
//         } else {
  
//           return { ...obj,isselect: true };
//     } 
//       }
//       return obj;
//     });
//     setdata(selectItem);
//    console.log(selectItem, "...............>> .......");
//     // handleRemove()
//   };
      
//   return (
//     <View style={styles.container}>
//       <FlatList
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.flatList}
//         numColumns={2}
//         // horizontal={true}
//         data={data}
//         // keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => {
//           return (
//             <TouchableOpacity  onPress={() => multipleSelect(item)}  style={[styles.card, {backgroundColor: item.isselect==true?'green':'black'}]}
//               // onPress={() => removeItem(item.id)}
//  >
//                 <Text style={styles.text}>{item.name}</Text>
//             </TouchableOpacity>
//           );
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingTop: 120,
//     backgroundColor: "#ecf0f1",
//     padding: 8,
//   },
//   flatList: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//   },
//   cardContainer: {
//     height: 100,
//     width: width * 0.5,
//     marginRight: 8,
//   },
//   card: {
//     height: 100,
//     width: width * 0.4,
//     borderRadius: 12,
//     padding: 10,
//     marginHorizontal:mobileW*2/100,
//     marginVertical:mobileW*2/100,
//     alignItems:'center', justifyContent:'center'
//   },
//   text: { color: "white", fontWeight: 'bold' }
// });



// import React, { useState } from 'react'
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { set } from 'react-native-reanimated'

// export default function App() {
//   const [count, setCount] = useState(0)


//   const onAdd =()=>{
//     setCount(count+1)
// }
//   const onSubtract =()=>{
//       setCount(count==0?0:count-1)
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.button}
//         activeOpacity={0.8}
//         onPress={() => onAdd()}
//       >
//         <Text style={styles.text}>+</Text>
//       </TouchableOpacity>
//       <Text style={{fontSize: 18,padding:12}}>{`Pressed ${count} times`}</Text>
//       <TouchableOpacity
//         style={styles.button}
//         activeOpacity={0.8}
//         onPress={() => onSubtract ()}
//       >
//         <Text style={styles.text}>-</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     padding: 40,
//     borderRadius:100,
//     borderWidth: 1,
//     borderColor: 'green',
//     backgroundColor: 'lightgreen',
//     alignItems:'center',
//     justifyContent:'center'
   
//   },
//   text: {
//     // fontSize: 18,
  
//     alignItems:'center',
//     justifyContent:'center',
//     height:20,
//     width:20
//     // padding: 12,
//   },
// })



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { useState} from 'react'
// import { View, Text,TouchableOpacity,FlatList, Dimensions, StyleSheet } from 'react-native'
// import { log } from 'react-native-reanimated';
//  const mobileW = Dimensions.get('window').width;
//  const mobileH = Dimensions.get('window').height;
// //  import { mobileW } from "./Provider/utilslib/Utils";

// const { width } = Dimensions.get('window');

 
// const dummyData = [
//   {
//     id: 1,
//     name: "orange card",
//     color: "orange",
//     isselect: "false"
//   },
//   {
//     id: 2,
//     name: "red card",
//     color: "red",
//     isselect: "false"
//   },
//   {
//     id: 3,
//     name: "green card",
//     color: "green",
//     isselect: "false"
//   },
//   {
//     id: 4,
//     name: "blue card",
//     color: "blue",
//     isselect: "false"
//   },
//   {
//     id: 5,
//     name: "cyan card",
//     color: "cyan",
//     isselect: "false"
//   },
//   {
//     id: 6,
//     name: "red card",
//     color: "red",
//     isselect: "false"
//   },
  
// ];

// const  Expertarea= ()=> {
//   const [data,setdata] =useState(dummyData)
//   const [select,setSelect] =useState(false)

//   const AllSelect = ()=>{
//     const selectData = data.map(obj => {
//       setSelect(!select)
//      if(obj.isselect== true){
//       return{...obj, isselect:false}
//      }
//     if(select!=false){
     
//       return {...obj, isselect: false}
//     }else{
//       return {...obj,isselect: true}
//     }
//   })
//   setdata(selectData)
//   console.log("selectData===========",selectData);
//   }

// const multipleSelect = async (item) => {
//   const newState = data.map(obj => {
//     if (obj.id === item.id) {

//       if (obj.isselect == true) {
       
//         return { ...obj, isselect: false };
      
//       } else {
//         // setSelect(!select)
       
//         return { ...obj, isselect: true };
//   }
  
//     }

// return obj;

//   }
  
//   );
//   setdata(newState);
//   console.log(newState, "...............>> .......");
//   // handleRemove()
// };
//   return (
//     <View > 
//       <TouchableOpacity activeOpacity={0.8} onPress={()=>AllSelect() } style={[styles.card,{backgroundColor:select? 'green':"black"}]}>
//       <Text style={styles.text}>All Select</Text>
//         {/* {select?
//       <Text style={styles.text}>All Select</Text>:
//       <Text style={styles.text}>Select</Text>} */}
//       </TouchableOpacity>
 
//       <FlatList
//       data={data}
//       numColumns={2}
//       renderItem={({item,Object})=>
//           <View style={{padding:mobileW*3/100}}>
//             {/* <TouchableOpacity onPress={()=>List2(item)} style={{borderRadius:mobileW*10/100,borderWidth:mobileW*2/100,backgroundColor:item.isselect==true?"white":"green"}}>
//            <Text>{item.name}</Text>
//            </TouchableOpacity> */}
//             <TouchableOpacity activeOpacity={0.8}  onPress={() => multipleSelect(item)}  style={[styles.card, {backgroundColor: item.isselect==true?'green':'black'}]}
//               // onPress={() => removeItem(item.id)}
//  >
//                 <Text style={styles.text}>{item.name}</Text>
//             </TouchableOpacity>
//            </View>
//     }/>
//     </View>
//   )}

// export default  Expertarea;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingTop: 120,
//     backgroundColor: "#ecf0f1",
//     padding: 8,
//   },
//   flatList: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//   },
//   cardContainer: {
//     height: 100,
//     width: width * 0.5,
//     marginRight: 8,
//   },
//   card: {
//     height: 100,
//     width: width * 0.4,
//     borderRadius: 12,
//     padding: 10,
//     marginHorizontal:mobileW*2/100,
//     marginVertical:mobileW*2/100,
//     alignItems:'center', 
//     justifyContent:'center'
//   },
//   text: { color: "white", fontWeight: 'bold' }
// });

import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import LinkedInModal from 'react-native-linkedin'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default class DemoPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinkedInModal
          clientID="77bdw3u6uborp2"
          clientSecret="7m7uDmHOcZeiS4Sq"
          redirectUri="https://www.linkedin.com/developers/apps/verification/92b99669-9ea9-4a4f-af27-bd3d14731354"
          onSuccess={token => console.log(JSON.stringify(token, null, 2))}
          renderButton={() => <Item />} 
        />
      </View>
    )
  }
}