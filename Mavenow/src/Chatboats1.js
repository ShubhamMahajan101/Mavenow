import { useState } from "react";
import { View, Text, StatusBar, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, Switch } from "react-native";
import { Colors } from './Provider/Colorsfont'

const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ChatBoats1({ navigation, route }) {
  const DATA = route.params.selectKeyword
  const [selectKeyword, setSelectKeyword] = useState(DATA)
  console.log(selectKeyword);

  return (
    <View style={{ flex: 1, }}>
      <SafeAreaView style={{ flex: 1, }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.themecolor} />

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Header +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <View style={styles.header_View}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} >
            <Image resizeMode='contain' source={require("./Icon/icon_back.png")} style={styles.BACK_ICON} />
          </TouchableOpacity>
          <Text style={styles.headerText}>I can teach</Text>
        </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Toggle Button +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <View style={{ margin: mobileW * 3 / 100 }}>
          <FlatList
            data={selectKeyword}
            renderItem={({ item }) =>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: mobileW * 2 / 100 }} >
                <Text style={{ fontSize: mobileW * 4 / 100, color: Colors.black_color }}>{item.key}</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={item.IsSuggested ? Colors.themecolor : '#f4f3f4'}
                  value={item.IsSuggested}
                  onChange={() => {
                    setSelectKeyword(selectKeyword.map(index =>
                      item.id === index.id
                        ? ({ ...index, IsSuggested: !index.IsSuggested })
                        : index
                    ))}}
                />
              </View>
            }
          />

        </View>

        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Continue Button +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <TouchableOpacity activeOpacity={0.8} style={styles.CONTINUE}>
          <Text style={styles.CONTINUE___text}>CONTINUE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_View: {
    width: mobileW,
    paddingHorizontal: mobileW * 4 / 100,
    height: mobileW * 15 / 100,
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: Colors.themecolor,
  },
  BACK_ICON: {
    height: mobileW * 4 / 100,
    width: mobileW * 4.5 / 100
  },
  headerText: {
    fontSize: mobileW * 4.5 / 100,
    fontWeight: '400',
    color: Colors.whiteColor,
    marginHorizontal: mobileW * 8 / 100
  },
  CONTINUE: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: mobileW * 95 / 100,
    height: mobileW * 13 / 100,
    backgroundColor: Colors.themecolor,
    borderRadius: mobileW * 2 / 100,
    bottom: 10,
    position: 'absolute',
    elevation: 1,
    shadowColor: '#000',
    borderColor: "#e8edfb",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, },
    shadowOpacity: 0.1,
  },
  CONTINUE___text: {
    fontSize: mobileW * 4 / 100,
    color: Colors.white_color,
    fontWeight: '500'
  },

});
