import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView, Alert } from "react-native";
import { MainButton } from "../../components/buttons";
import LinearGradient from 'react-native-linear-gradient';
import logoMain from '../../assets/images/logo.png'
import { fonts } from "../../../utils/fonts";
import { colors } from "../../../utils/colors";
import { FormInput } from "../../components/inputs";
import { REGISTER_USER } from "../../../utils/requests";
import { isEmailValid, isUsernameValid, isPasswordValid } from "../../../utils/validations";
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
            email: this.state.email.trim(),
            username: this.state.username.trim(),
            password: this.state.password.trim()
        }
        const response = await REGISTER_USER(data)
        console.log('RESPONSE GOTTEN', response);
        if (response.data.status) {
            this.setState({ ...initState })
            Alert.alert('', 'User registered successfully')
            this._navigateMainHandler()
        } else {
            this.setState({ loadingAction: false })
            Alert.alert('', 'Somenthing went wrong when trying to register this account')
        }
    }

    checkAvailable = () => {
        const available = isEmailValid(this.state.email) && isPasswordValid(this.state.password) && isUsernameValid(this.state.username)
        console.log('AVAILABLE', available);
        return !(isEmailValid(this.state.email) && isPasswordValid(this.state.password) && isUsernameValid(this.state.username))
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
                        <Text style={styles.indications}>Must at least contain 6 characters and 1  number or 1 special character. </Text>
                        <FormInput placeholder="Email" type={'text'} value={this.state.email} changeHandler={value => this._changeHandler('email', value)} />
                        <FormInput placeholder="Password" type={'password'} value={this.state.password} changeHandler={value => this._changeHandler('password', value)} />
                        <Text style={styles.indications}>Must at least contain 8 characters, 1 uppercase, 1 number or 1 special character. </Text>
                        <MainButton buttonText={'Register'} buttonAction={this._registrationHandler} loading={this.state.loadingAction} disabled={this.checkAvailable()} />
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
    },
    indications: {
        fontFamily: fonts.fontLight,
        fontSize: 12,
        color: colors.yellowText,
        maxWidth: '80%',
        textAlign: 'center', marginTop: 5
    }
})

export default RegisterScreen