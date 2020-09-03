import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs'
import { decode, encode } from 'base-64'
import { Buffer } from 'buffer'

import phoneEffect from '../src/assets/sounds/phone.mp3'
import {
    Player,
    Recorder,
    MediaStates
} from '@react-native-community/audio-toolkit';


export const PLAY_SOUND = () => {
    console.log('PLAYING SOUND');
    try {

        // Load the sound file 'whoosh.mp3' from the app bundle
        // See notes below about preloading sounds within initialization code below.
        const player = new Player('phone.mp3').play()
            .on('ended', () => {
                // Enable button again after playback finishes
                console.log('FINISHED PLAYING');
            });
    } catch (error) {
        console.log('ERROR', error);
    }
}