import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, Platform, BackHandler, SafeAreaView, View, Dimensions, TouchableOpacity, Image, Text, Modal } from "react-native";
const mobileW = Dimensions.get('window').width;
const mobileH = Dimensions.get('window').height;
import { Colors } from './Provider/Colorsfont';

export default function Terms({ navigation }) {
    const [modalVisible1, setModalVisible1] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setModalVisible1(false)
        }, 1500);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible1(!modalVisible1);
                }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000096' }}>
                    <Image style={{ width: mobileW * 25 / 100, height: mobileW * 12 / 100 }}
                        source={require("./Icon/neighcoach_loader.gif")}></Image>

                </View>
            </Modal>
            <View style={{ width: mobileW, backgroundColor: Colors.themecolor, padding: mobileW * 3 / 100 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <Image style={styles.backIcon} resizeMode='contain'
                        source={require("./Icon/bk.png")}></Image>
                </TouchableOpacity>

            </View>
            <WebView
                allowsBackForwardNavigationGestures // only works with iOS
                allowsInlineMediaPlayback
                style={styles.container}
                source={{ uri: "https://mavenow.com/privacy" }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backIcon: {
        width: mobileW * 10 / 100,
        height: mobileW * 10 / 100,
        tintColor: Colors.white_color
    },
    mavenowLogo: {
        width: mobileW * 70 / 100,
        height: mobileW * 18 / 100,
        alignSelf: 'center',
    },
    loginText: {
        fontSize: mobileW * 4.5 / 100,
        color: Colors.black_color,
        fontWeight: '500',
        marginTop: mobileW * 1 / 100
    },
});

