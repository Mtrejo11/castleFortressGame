import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, Alert } from "react-native";
import { MainButton } from "../../components/buttons";
import LinearGradient from 'react-native-linear-gradient';
import logoMain from '../../assets/images/logo.png'
import { fonts } from "../../../utils/fonts";
import { colors } from "../../../utils/colors";
import { FormInput } from "../../components/inputs";
import auth from '@react-native-firebase/auth'

const initState = {
    email: '',
    password: '',
    loadingAction: false,
}
class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...initState,
        }
    }

    _loginHandler = async () => {
        this.setState({ loadingAction: true })
        try {
            const signedIn = await auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            console.log('SIGNED IN', signedIn);
            this.setState({ ...initState })

            this._navigateMainHandler()
        } catch (error) {
            console.log('ERROR', error);
            Alert.alert('', 'Sign in failed')
            this.setState({ loadingAction: false })
        }

    }

    _navigateMainHandler = () => {
        this.props.navigation.navigate('Main')
    }

    _changeHandler = (name, value) => {
        this.setState({ [name]: value })
    }

    render() {
        return (
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>

                <SafeAreaView style={styles.mainContainer}>
                    <Image source={logoMain} style={{ height: 180, resizeMode: 'contain' }} />
                    <FormInput placeholder="Email" type={'text'} value={this.state.email} changeHandler={value => this._changeHandler('email', value)} />
                    <FormInput placeholder="Password" type={'password'} value={this.state.password} changeHandler={value => this._changeHandler('password', value)} />
                    <MainButton buttonText={'Login'} buttonAction={this._loginHandler} loading={this.state.loadingAction} />
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Text style={{ fontFamily: fonts.fontRegular, color: colors.white, marginRight: 6 }}>¿Don't have an account yet? </Text><TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}><Text style={{ fontFamily: fonts.fontBold, color: '#2C45E1' }}>Register</Text></TouchableOpacity>
                    </View>
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
        marginTop: 150
    },
    linearGradient: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontFamily: 'TitilliumWeb-Bold'
    }
})

export default LoginScreen