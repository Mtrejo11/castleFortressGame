import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, Button } from "react-native";
import { MainGameButton } from "../../components/buttons";
import LinearGradient from 'react-native-linear-gradient';
import logoMain from '../../assets/images/logo.png'
import { fonts } from "../../../utils/fonts";
import { colors } from "../../../utils/colors";
import { PLAY_SOUND } from "../../../utils/sound_effects";
class MainScreen extends Component {
    _navigateGameHandler = () =>{
        this.props.navigation.navigate('Game')
    }
    render() {
        return (
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>

                <SafeAreaView style={styles.mainContainer}>
                    <Image source={logoMain} style={{ height: 180, resizeMode: 'contain' }} />
                    <MainGameButton buttonText={'Play'} buttonAction={this._navigateGameHandler} />
                    <MainGameButton buttonText={'Instructions'} buttonAction={this._navigateMainHandler} />
                    <MainGameButton buttonText={'About'} buttonAction={this._navigateMainHandler} />
                    <Button title='PLAY SOUND' onPress={PLAY_SOUND}></Button>
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