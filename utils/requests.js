import functions from "@react-native-firebase/functions";
import { Buffer } from 'buffer'
import RNFS from 'react-native-fs';
import { decode, encode } from 'base-64'


export const REGISTER_USER = async (data) => {
    console.log('DATA', data);
    const registerUser = functions().httpsCallable("registerUser")
    try {
        const result = await registerUser({
            ...data, //  number
        });
        console.log("FIRST RESULT", result);
        return result;
    } catch (error) {
        //console.log("ERROR", error);
        return error;
    }
}


export const SEND_AUDIO = async (urlaudio) => {
    try {
        const file = await RNFS.readFile(urlaudio, 'base64')
        const buffered = Buffer.from(file, 'base64')
        console.log('BUFFERED', buffered);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "audio/wave");

        const url = `https://castlefortress-game.web.app/api/v1/speech_conv_test`
        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            body: buffered,
            headers: myHeaders
        });
        const second_response = await response.json();
        if (response.status === 200 || response.status === 202) {
            return { status: true, message: second_response };
        } else {
            return { status: false, message: second_response };
        }
    } catch (error) {
        console.log("Error", error);
        return { status: false, message: "Ocurrió un error conectado con el servicio" };
    }
}


export const SEND_AUDIO_test = async (token, urlaudio) => {
    try {
        const file = await RNFS.readFile(urlaudio, 'base64')
        const buffered = Buffer.from(file, 'base64')
        // console.log('BUFFERED', buffered);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const data = {
            audioContent: buffered,
            idChat: token
        }

        const url = `https://castlefortress-game.web.app/api/v1/speech_test`
        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(data),
            headers: myHeaders
        });
        const second_response = await response.json();
        console.log('SECOND RESPONSE', second_response);
        const fileCreated = this.arrayBufferToBase64(second_response.audioContent.data)
        console.log('FILE CREATED AFTER RESPONSE', fileCreated);
        const buffered_response = Buffer.from(fileCreated, 'base64')
        console.log('BUFFERED RESPONSE', buffered_response);
        if (response.status === 200 || response.status === 202) {
            return { status: true, message: second_response };
        } else {
            return { status: false, message: second_response };
        }
    } catch (error) {
        console.log("Error", error);
        return { status: false, message: "Ocurrió un error conectado con el servicio" };
    }
}


arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return encode(binary);
}