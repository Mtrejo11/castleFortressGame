import React, { Component } from 'react';
import { StyleSheet, View, Button, StatusBar, FlatList, Text } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const MessageContainer = props => {
    const { userMessage, characterMessage } = props.message
    return (
        <View style={styles.messageBubbleContainer}>
            <Text style={styles.userMessage}>{userMessage}</Text>
            <Text style={styles.characterMessage}>{characterMessage}</Text>
        </View>
    )
}



export default class MessagesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };

    }




    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    ref={'_messagesList'}
                    style={{ maxHeight: '80%', zIndex:20}}
                    scrollEnabled
                    data={this.props.messages}
                    extraData={this.props.changeFlag}
                    keyExtractor={(value, index) => value.from + '' + index}
                    renderItem={(value) => <MessageContainer message={value.item}
                    />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 8
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    messageBubbleContainer: {
        borderRadius: 10,
        padding: 5,
    }, userMessage: {
        color: colors.yellowText,
        fontFamily: fonts.fontRegular,
        maxWidth: '80%',
        textAlign: 'left',
        marginBottom: 10,
        textTransform: 'capitalize'
    },
    characterMessage: {
        fontFamily: fonts.fontRegular,
        color: colors.white,
        maxWidth: '80%',
        textAlign: 'right',
        alignSelf: 'flex-end'
    }
});