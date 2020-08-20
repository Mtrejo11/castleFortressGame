import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from "react-native";


class LoginScreen extends Component {


    _navigateMainHandler = () => {
        this.props.navigation.navigate('Main')
    }
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <Text style={styles.title}>Castle Fortress</Text>
                <TouchableOpacity onPress={this._navigateMainHandler}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Register</Text>
                </TouchableOpacity>
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

export default LoginScreen