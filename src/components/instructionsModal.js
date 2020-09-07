import React from 'react';
import { View, Modal, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MainGameButton } from "../components/buttons";
import imagesrc from '../assets/images/instructions.png';
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

export default function InstructionsModal(props) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.goBack}
        >
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={styles.container}>
                        <Image source={imagesrc} style={{ resizeMode: 'contain', alignSelf: 'center', height: 500 }} />
                        <MainGameButton buttonText={'Close'} buttonAction={props.goBack} />
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexGrow: 1,
    },
    regularText: {
        fontFamily: fonts.fontLight,
        color: colors.white,
        maxWidth: 250,
        textAlign: 'center',
        fontSize: 16,
    },
    linearGradient: {
        flex: 1,
    },
});