import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, ImageBackground } from "react-native";
import RadioComponent from "../../components/radio";
import MessagesContainer from "../../components/messages";
import LinearGradient from "react-native-linear-gradient";
import shadowBox from '../../assets/images/shadow.png'
import { CHARACTERS, SCENARIOS } from "../../../utils/assets";


const initialState = {
    currentAvatar: null,
    messages: [],
    messagesFlag: false,
    currentScenario: null,
    chatFlow: [],
}


class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...initialState

        }
    }

    _onMessageHandler = (response) => {
        console.log('DATA RECEIVED', response);
        const currentMessages = this.state.messages
        const currentChatFlow = this.state.chatFlow
        currentMessages.push({
            userMessage: response.user_txt,
            characterMessage: response.message
        })
        this.setState({ messages: currentMessages, messagesFlag: !this.state.messagesFlag, chatFlow: currentChatFlow, currentAvatar: CHARACTERS[response.img_avatar] })
    }

    render() {
        return (
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>

                <SafeAreaView style={styles.mainContainer}>
                    <View style={styles.gameCanvas}>
                        <ImageBackground
                            source={SCENARIOS[3]}
                            style={styles.image}
                        >


                            <View style={styles.charactersContainer}>
                                <View style={{ width: '60%', height: '100%', }}>
                                    <MessagesContainer messages={this.state.messages} changeFlag={this.state.messagesFlag} />
                                    {
                                        this.state.messages.length > 0 ? <Image source={shadowBox} style={{ height: '100%', width: '100%', position: 'absolute', }} /> : null
                                    }
                                </View>
                                <View style={{ width: '40%', height: '100%', }}>
                                    {
                                        this.state.currentAvatar ? <Image source={this.state.currentAvatar} style={{ maxWidth: '100%', maxHeight: '100%' }} /> : null
                                    }
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <RadioComponent onMessage={this._onMessageHandler} />
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
        width: '100%',
    },
    title: {
        fontSize: 25,
        fontFamily: 'TitilliumWeb-Light'
    },
    charactersContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: '35%',
        flexDirection: 'row'
    },
    linearGradient: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    },
})

export default MainScreen