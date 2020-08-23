import React, { Component } from 'react';
import { StyleSheet, View, Button, StatusBar, FlatList, Text } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

const MessageContainer = props => {
    const { from, message } = props.message
    return (
        <View style={styles.messageBubbleContainer}>
            <Text>{from}:</Text>
            <Text>{message}</Text>
        </View>
    )
}



export default class MessagesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: [
                { from: 'Dave', message: 'XDDDDD' },
                { from: 'Dave', message: 'XDDDDD' },
                { from: 'Gama', message: 'Wou' },
                { from: 'Gama', message: 'Wou' },
                { from: 'Gama', message: 'Wou' },
            ],
            messagesFlag: false,
        };

    }




    render() {
        return (
            <View style={styles.container}>
          
                <FlatList
                    ref={'_messagesList'}
                    style={{ maxHeight: '50%', transform: [{ scaleY: -1 }], }}
                    data={this.state.message}
                    extraData={this.state.messagesFlag}
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
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    messageBubbleContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
        transform: [{ scaleY: -1 }]
    }
});