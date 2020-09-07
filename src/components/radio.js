import React, { Component } from 'react';
import { StyleSheet, View, Button, StatusBar, TouchableOpacity, Image, Text, Platform, Alert } from 'react-native';
import { Buffer } from 'buffer';
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs'
import { decode, encode } from 'base-64'
import { SEND_AUDIO_GAME } from '../../utils/requests'
import speakIcon from '../assets/images/speak.png'
import stopIcon from '../assets/images/stopIcon.png'
import cluesIcon from '../assets/images/clues.png'
import rightArrow from '../assets/images/right_arrow.png'
import leftArrow from '../assets/images/left_arrow.png'
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import {
  Player
} from '@react-native-community/audio-toolkit';




export default class RadioComponent extends Component {


  constructor(props) {
    super(props)
    this.state = {
      audioFile: '',
      recording: false,
      loaded: false,
      paused: true,
      step: 0,
    };
    this.initialRequest()

  }


  async componentDidMount() {
    await this.checkPermission();
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,     // android only (see below)
      wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
      // do something with audio chunk
    });
  }

  initialRequest = async () => {
    const sentFile = await SEND_AUDIO_GAME(0, null);
    if (sentFile.status) {
      // console.log('RESPONSE FROM API', sentFile);
      this.props.onMessage({ ...sentFile.message, speech: null })
      this.playResponse(sentFile.message.speech.audioContent)
    }
    else {
      Alert.alert('Something went wrong', 'Please try again')
      console.log('SOMETHING WENT WRONG', sentFile.message);
    }
  }


  checkPermission = async () => {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO
    const p = await Permissions.check(permission);
    if (p === 'authorized') {
      return;
    }
    return this.requestPermission();
  };

  requestPermission = async () => {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO
    const p = await Permissions.request(permission);

  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();

  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ audioFile, recording: false });
    // const token = await auth().currentUser.getIdToken()
    const player = new Player('radio.mp3').play()
      .on('ended', () => {
        // Enable button again after playback finishes
        console.log('FINISHED PLAYING');
      })
      .on('error', (error) => {
        // Enable button again after playback finishes
        console.log('FINISHED PLAYING WITH ERROR', error);
      });
    const sentFile = await SEND_AUDIO_GAME(this.props.lastMessage, audioFile);
    if (sentFile.status) {
      // console.log('RESPONSE FROM API', sentFile);

      this.props.onMessage({ ...sentFile.message, speech: null })
      this.playResponse(sentFile.message.speech.audioContent, player)
    }
    else {
      Alert.alert('Something went wrong', 'Please try again')
      console.log('SOMETHING WENT WRONG', sentFile.message);
    }
  };

  loadResponse = async (buffer, radioPlayer) => {
    console.log('LOADING RESPONSE');

    try {
      const fileCreated = this.arrayBufferToBase64(buffer.data)
      // console.log('FILE CREATED', fileCreated);
      let path = `${RNFS.DocumentDirectoryPath}/response${this.state.step}.mp3`;
      RNFS.writeFile(path, fileCreated, 'base64').then(() => playSound()).catch(err => {
        console.log('ERROR OCURRED', err);
      })

      const playSound = () => {
        if (radioPlayer) radioPlayer.stop()
        console.log('PLAYING SOUND');
        const sound = new Sound(path, '', () => callback(sound))
      }
      const callback = (sound) => {
        Sound.setCategory('Playback');

        sound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
          this.setState({ paused: true, step: this.state.step + 1 });
          // this.sound.release();
        })
      }
    } catch (error) {
      console.log('ERROR', error);
      return error
    }

  }


  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }
      console.log('CURRENT SOUND TO LOAD', this.state.audioFile);
      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };
  arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return encode(binary);
  }

  playResponse = async (buffer, player) => {
    if (!this.state.loaded) {
      try {

        await this.loadResponse(buffer, player);
      } catch (error) {
        console.log(error);
      }
    }


    this.setState({ paused: false });

  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');
    console.log('CURRENTLY PLAYING', this.sound);
    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.stationContainer}>
          <TouchableOpacity>
            <Image source={leftArrow} style={{ width: 40, height: 40, marginTop: -5 }} />
          </TouchableOpacity>
          <View style={styles.stationBox}>
            <Text style={styles.stationText}>404</Text>
          </View>
          <TouchableOpacity>
            <Image source={rightArrow} style={{ width: 40, height: 40, marginTop: -5 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <TouchableOpacity style={{ width: 60, height: 60 }}>
              <Image source={cluesIcon} style={{ width: 'auto', height: '100%', resizeMode: 'contain' }} />
            </TouchableOpacity>
            {
              !this.state.recording ? <TouchableOpacity style={{ width: 60, height: 60 }} onPress={this.start} >
                <Image source={speakIcon} style={{ width: 'auto', height: '100%', resizeMode: 'contain' }} />
              </TouchableOpacity>
                :
                <TouchableOpacity style={{ width: 60, height: 60 }} onPress={this.stop}>
                  <Image source={stopIcon} style={{ width: 'auto', height: '100%', resizeMode: 'contain' }} />
                </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  stationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  stationBox: {
    height: 45,
    width: 60,
    borderColor: colors.white,
    borderWidth: 1.5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stationText: {
    color: colors.yellowText,
    fontFamily: fonts.fontSemibold,
    fontSize: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', width: '100%'
  }
});