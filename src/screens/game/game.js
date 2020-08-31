import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from "react-native";
import RadioComponent from "../../components/radio";
import MessagesContainer from "../../components/messages";
import LinearGradient from "react-native-linear-gradient";

class MainScreen extends Component {
    render() {
        return (
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>
            
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.gameCanvas}>

                    <Text style={styles.title}>Main Screen</Text>
                    <View style={styles.charactersContainer}>
                        <View style={{ width: '60%', height: '100%' }}>
                            <MessagesContainer />
                        </View>
                        <View style={{ width: '40%', height: '100%', backgroundColor: 'blue' }}>

                        </View>
                    </View>
                </View>
                <RadioComponent />
            </SafeAreaView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    gameCanvas: {
        flex: 3,
        width: '100%',
    },
    title: {
        fontSize: 25,
        fontFamily: 'TitilliumWeb-Light'
    },
    charactersContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: '35%',
        flexDirection: 'row'
    },
    linearGradient: {
        flex: 1,
    },
})

export default MainScreen