import React from "react";
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { color } from "react-native-reanimated";

export const MainButton = props => {
    return (
        <TouchableOpacity style={props.disabled ? styles.buttonContainerDisabled : styles.buttonContainer} onPress={props.buttonAction} disabled={props.loading || props.disabled}>
            {
                props.loading ?
                    <ActivityIndicator color={colors.white} /> :
                    <Text style={styles.buttonText}>{props.buttonText}</Text>
            }
        </TouchableOpacity>
    )
}


export const MainGameButton = props => {
    return (
        <TouchableOpacity style={styles.buttonGameContainer} onPress={props.buttonAction}>
            <Text style={styles.buttonTextGame}>{props.buttonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.secondBlue,
        borderRadius: 10,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    buttonContainerDisabled: {
        backgroundColor: colors.disabled,
        borderRadius: 10,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    buttonGameContainer: {
        backgroundColor: colors.secondBlue,
        borderRadius: 10,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    buttonText: {
        fontFamily: fonts.fontLight,
        color: colors.white,
        letterSpacing: 5,
        textTransform: 'uppercase',
        fontSize: 16
    },
    buttonTextGame: {
        fontFamily: fonts.fontSemibold,
        color: colors.white,
        letterSpacing: 5,
        textTransform: 'uppercase',
        fontSize: 16
    }
})