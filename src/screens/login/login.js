import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, Alert, Platform, KeyboardAvoidingView } from "react-native";
import { MainButton } from "../../components/buttons";
import LinearGradient from 'react-native-linear-gradient';
import logoMain from '../../assets/images/logo.png'
import { fonts } from "../../../utils/fonts";
import { colors } from "../../../utils/colors";
import { FormInput } from "../../components/inputs";
import auth from '@react-native-firebase/auth'
import { AppContext } from '../../context/provider'

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
        console.log('PROPS', this.props.context);
        this.setState({ loadingAction: true })
        try {
            const signedIn = await auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password.trim())
            console.log('SIGNED IN', signedIn);
            this.setState({ ...initState })
            await this.props.context.saveToken(signedIn.user.uid)
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
        console.log('THIS PROPS', this.props);
        return (
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>

                <SafeAreaView style={{ flex: 1, }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={styles.mainContainer}
                    >
                        <Image source={logoMain} style={{ height: 180, resizeMode: 'contain' }} />
                        <FormInput placeholder="Email" type={'text'} value={this.state.email} changeHandler={value => this._changeHandler('email', value)} />
                        <FormInput placeholder="Password" type={'password'} value={this.state.password} changeHandler={value => this._changeHandler('password', value)} />
                        <MainButton buttonText={'Login'} buttonAction={this._loginHandler} loading={this.state.loadingAction} />
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ fontFamily: fonts.fontRegular, color: colors.white, marginRight: 6 }}>¿Don't have an account yet? </Text><TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}><Text style={{ fontFamily: fonts.fontBold, color: '#2C45E1' }}>Register</Text></TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>

        )
    }
}
const ForwardRef = React.forwardRef((props, ref) => (
    <AppContext.Consumer>
        {context => {
            return <LoginScreen context={context} {...props} />
        }}
    </AppContext.Consumer>
));

export default ({ navigation }) => (

    <ForwardRef
        navigation={navigation}
    />


)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontFamily: 'TitilliumWeb-Bold'
    }
})

