import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';

var RNFS = require('react-native-fs');

import DropdownAlert from 'react-native-dropdownalert';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

const stop = require("../images/stop.png");
const record = require("../images/recordStart.png");
const pause = require("../images/pause.png");

export default class Recordings extends Component {

  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this)
    this.state = {
      time: new Date(),
      name: "",
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: RNFS.ExternalStorageDirectoryPath + '/test.aac',
      hasPermission: undefined,
    }
  }


  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = (data) => {
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL);
        }
      };
    });
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'Recordings needs access to your microphone.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  _buttonValue(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;
    return (
      <TouchableOpacity activeOpactiy={.5} onPress={onPress}>
        <Image style={styles.buttonImage} source={title}/>
      </TouchableOpacity>
    );
  }

  async _pause() {
    if (!this.state.recording) {
      return;
    }
    this.setState({stoppedRecording: true, recording: false});
    try {
      const filePath = await AudioRecorder.pauseRecording();
      // Pause is currently equivalent to stop on Android.
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
        this.showPauseAlert();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      return;
    }
    this.setState({stoppedRecording: true, recording: false});
    this.setState({currentTime: 0});

    try {
      const filePath = await AudioRecorder.stopRecording();
      if (Platform.OS === 'android') {
        this._finishRecording.bind(true, filePath);
        this.showAlert();
        this.props.recordTime(this.state.time)
        this.props.audioPath(this.state.audioPath)
        this.props.recording(this.state.recording)
      }
      return filePath;
    }catch (error) {
      console.error(error);
    }
  }

  async _record() {
    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath);
    }
    this.setState({recording: true});
    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed });
  }

  onClose(data) {
    console.log(data)
  }

  closeAlert() {
    this.dropdown.onClose()
  }

  showAlert() {
    this.dropdown.alertWithType('success','Recorder #', "Voice Recorded")
  }

  showPauseAlert() {
    this.dropdown.alertWithType('warn','Recorder #', "Voice Paused")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <Image style={styles.image} source={require('../images/record.png')}/>
          <Text style={styles.progressText}>{this.state.currentTime}s</Text>
          <View style={styles.buttonView}>
            {this._buttonValue(record, () => {this._record()}, this.state.recording )}
            {this._buttonValue(stop, () => {this._stop()} )}
            {this._buttonValue(pause, () => {this._pause()} )}
          </View>
          <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          onClose={(data) => this.onClose(data)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191919",
  },
  image: {
    width:200,
    height:200
  },
  buttonImage: {
    width:40,
    height:40
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    flexDirection: 'row',
    justifyContent:'space-around',
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#fff"
  },
  button: {
    borderWidth:1,
    borderColor:'grey',
    padding: 10,
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    fontSize: 15,
    color: "#fff"
  },
  activeButtonText: {
    fontSize: 15,
    color: "#B81F00"
  }
});

AppRegistry.registerComponent('Recordings', () => Recordings);
