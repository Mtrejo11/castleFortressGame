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


//Screens imports
import LoginScreen from '../login/login'
import MainScreen from "../game/main";

const initState = {
    email: '',
    password: '',
    loadingAction: false,
}
class LoadingScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...initState,
        }
    }

    render() {
        const { token } = this.props.context
        console.log('TOKEN', token);
        return (
            token ?
                <MainScreen {...this.props} />
                :
                <LoginScreen {...this.props} />
        )
    }
}

const ForwardRef = React.forwardRef((props, ref) => (
    <AppContext.Consumer>
        {context => {
            return <LoadingScreen context={context} {...props} />
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

