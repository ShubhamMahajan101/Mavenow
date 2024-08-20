import { View, Text, TouchableOpacity } from 'react-native'
import { Share } from 'react-native';
import React from 'react'

export default function Sharefile() {

  const onShare = async () => {
    console.log("sssss")
    try {
        const result = await Share.share({
            message: Platform.OS === "android" ?
                'https://play.google.com/store/search?q=trulinco&c=apps' :
                "https://apps.apple.com/in/app/trulinco/id1583020135",
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};
  return (
    <View>
                       <TouchableOpacity onPress={()=>onShare()}>
                       <Text>Sharefile</Text>
                       </TouchableOpacity>
     
    </View>
  )
}