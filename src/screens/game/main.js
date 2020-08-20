import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from "react-native";


class MainScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <Text style={styles.title}>Main Screen</Text>
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
    }
})

export default MainScreen