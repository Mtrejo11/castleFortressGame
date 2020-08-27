import React, { Component } from 'react';
import { StyleSheet, View, Button, StatusBar } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import toWav from 'audiobuffer-to-wav'
import RNFS from 'react-native-fs'
import { decode, encode } from 'base-64'
import auth from '@react-native-firebase/auth'
import { SEND_AUDIO } from '../../utils/requests'

export default class RadioComponent extends Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true
  };

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

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
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
    const sentFile = await SEND_AUDIO(audioFile);
    if (sentFile.status) {
      // console.log('RESPONSE FROM API', sentFile);
      this.playResponse(sentFile.message.speech.audioContent)
    }
    else {
      console.log('SOMETHING WENT WRONG');
    }
  };

  loadResponse = async buffer => {
    console.log('LOADING RESPONSE');

    try {
      const fileCreated = this.arrayBufferToBase64(buffer.data)
      console.log('FILE CREATED', fileCreated);
      let path = `${RNFS.DocumentDirectoryPath}/response.mp3`;
      RNFS.writeFile(path, fileCreated, 'base64').then(() => playSound())
      const playSound = () => {
        const sound = new Sound(path, '', () => callback(sound))
      }
      const callback = (sound) => sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        this.setState({ paused: true });
        // this.sound.release();
      })
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

  playResponse = async (buffer) => {
    if (!this.state.loaded) {
      try {
        await this.loadResponse(buffer);
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');

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
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
              <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
            )}
        </View>
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
  }
});