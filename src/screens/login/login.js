import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";


class LoginScreen extends Component {
    render() {
        return (
            <View>
                <Text>Castle Fortress</Text>
                <TouchableOpacity>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoginScreen