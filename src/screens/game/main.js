import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, Button } from "react-native";
import { MainGameButton } from "../../components/buttons";
import LinearGradient from 'react-native-linear-gradient';
import logoMain from '../../assets/images/logo.png'
import { fonts } from "../../../utils/fonts";
import { colors } from "../../../utils/colors";
import { PLAY_SOUND } from "../../../utils/sound_effects";
import { AppContext } from '../../context/provider'
import Permissions, { PERMISSIONS } from 'react-native-permissions';

import auth from '@react-native-firebase/auth'
import InstructionsModal from "../../components/instructionsModal";
import AboutModal from '../../components/aboutModal';

const initState = {
    instructionsVisible: false,
    aboutVisible: false
}
class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initState }
    }

    _navigateGameHandler = () => {
        this.props.navigation.navigate('Game')
    }

    async componentDidMount() {
        await this.checkPermission()
    }

    checkPermission = async () => {
        const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO
        const p = await Permissions.check(permission);
        if (p === 'authorized') return;
        return this.requestPermission();
      };
    
      requestPermission = async () => {
        const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO
        const p = await Permissions.request(permission);
    
      };
    

    _logoutHandler = async (action) => {
        console.log('LOGIN OUT');
        this.props.navigation.navigate('Loading')
        try {

            await action()
            // await auth().signOut()
        } catch (error) {
            console.log('ERROR', error);
        }
    }
    render() {
        return (
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>

                <SafeAreaView style={styles.mainContainer}>
                    <Image source={logoMain} style={{ height: 180, resizeMode: 'contain' }} />
                    <MainGameButton buttonText={'Play'} buttonAction={this._navigateGameHandler} />
                    <MainGameButton buttonText={'Instructions'} buttonAction={() => this.setState({ instructionsVisible: true })} />
                    <MainGameButton buttonText={'About'} buttonAction={() => this.setState({ aboutVisible: true })} />
                    <AppContext.Consumer>
                        {
                            context =>
                                <MainGameButton buttonText={'Logout'} buttonAction={() => this._logoutHandler(context.removeToken)} />
                        }
                    </AppContext.Consumer>
                </SafeAreaView>
                <InstructionsModal visible={this.state.instructionsVisible} goBack={() => this.setState({ instructionsVisible: false })} />
                <AboutModal visible={this.state.aboutVisible} goBack={() => this.setState({ aboutVisible: false })} />
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
        backgroundColor: 'lightblue',
        width: '100%',
    },
    title: {
        fontSize: 25,
        fontFamily: 'TitilliumWeb-Light'
    },
    linearGradient: {
        flex: 1,
    },
    charactersContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: '35%',
        flexDirection: 'row'
    },
})

export default MainScreen