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


export const SEND_AUDIO_GAME = async (id, urlaudio) => {
    try {
        const file = await RNFS.readFile(urlaudio, 'base64')
        const buffered = Buffer.from(file, 'base64')
        // console.log('BUFFERED', buffered);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const data = {
            audioContent: buffered,
            idChat: id
        }

        console.log('DATA SENT', id);
        const url = `https://castlefortress-game.web.app/api/v1/gameNPL`
        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(data),
            headers: myHeaders
        });
        const second_response = await response.json();
        // console.log('SECOND RESPONSE', second_response);
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

