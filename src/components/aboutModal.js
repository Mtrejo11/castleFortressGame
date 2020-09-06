import React from 'react';
import { View, Modal, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import logoMain from '../assets/images/logo.png';
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

export default function AboutModal(props) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.goBack}
        >
            <LinearGradient colors={['#041936', '#06334f', '#041936']} style={styles.linearGradient}>
                <View style={{ flex: 1, flexDirection: 'column', paddingTop: 100 }}>
                    <View style={styles.container}>
                        <Image source={logoMain} style={{ resizeMode: 'contain', height: 150 }} />
                        <Text style={styles.regularText}>
                            A rookie FBI agent must solve the kidnapping case of two children
                            in a small rural town, but what begins as a small investigation
                             reveals darker secrets that were buried in the past.</Text>
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        flexGrow: 1,
    },
    regularText: {
        marginTop: 40,
        maxWidth: 400,
        textAlign: 'center',
        fontSize: 18,
        color: colors.white,
        fontFamily: fonts.fontLight,
    },
    linearGradient: {
        flex: 1,
    },
});