import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { colors } from '../../utils/colors'
import { fonts } from '../../utils/fonts'


export const FormInput = props => {
    return (
        <TextInput
            placeholder={props.placeholder}
            value={props.value}
            style={styles.inputContainer}
            placeholderTextColor={colors.white}
            onChangeText={props.changeHandler}
            returnKeyType='done'
            autoCapitalize={'none'}
            secureTextEntry={props.type === 'password' ? true : false}
        />
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 10,
        borderWidth: 2,
        height: 40,
        borderColor: colors.white,
        backgroundColor: colors.mainBlue,
        width: '70%',
        paddingHorizontal: 10,
        fontFamily: fonts.fontRegular,
        color: colors.white,
        marginTop: 20,
    },
})