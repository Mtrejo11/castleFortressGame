import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView, Alert } from "react-native";
import { MainButton } from "../../components/buttons";
import LinearGradient from 'react-native-linear-gradient';
import logoMain from '../../assets/images/logo.png'
import { fonts } from "../../../utils/fonts";
import { colors } from "../../../utils/colors";
import { FormInput } from "../../components/inputs";
import { REGISTER_USER } from "../../../utils/requests";
const initState = {
    username: '',
    email: '',
    password: '',
    loadingAction: false,

}
class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...initState,
        }
    }

    _navigateMainHandler = () => {
        this.props.navigation.navigate('Main')
    }

    _changeHandler = (name, value) => {

        this.setState({ [name]: value })
    }

    _registrationHandler = async () => {
        this.setState({ loadingAction: true })

        const data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        const response = await REGISTER_USER(data)
        console.log('RESPONSE GOTTEN', response);
        if (response.data.status) {
            this.setState({ ...initState })
            Alert.alert('', 'User registered successfully')
            this._navigateMainHandler()
        } else {
            Alert.alert('', 'Somenthing went wrong when trying to register this account')
        }
    }

    render() {
        return (
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>

                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={styles.mainContainer}
                    >
                        <Image source={logoMain} style={{ height: 180, resizeMode: 'contain', marginBottom: 20 }} />
                        <FormInput placeholder="Username" type={'text'} value={this.state.username} changeHandler={value => this._changeHandler('username', value)} />
                        <FormInput placeholder="Email" type={'text'} value={this.state.email} changeHandler={value => this._changeHandler('email', value)} />
                        <FormInput placeholder="Password" type={'password'} value={this.state.password} changeHandler={value => this._changeHandler('password', value)} />
                        <MainButton buttonText={'Register'} buttonAction={this._registrationHandler} loading={this.state.loadingAction} />
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>

        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 80
    },
    linearGradient: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontFamily: 'TitilliumWeb-Bold'
    }
})

export default RegisterScreen