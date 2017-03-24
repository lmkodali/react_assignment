"use strict";
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
  Navigator,
  TouchableOpacity
} from 'react-native';

import Sound from 'react-native-sound';
var RNFS = require('react-native-fs');

export default class StoreRecords extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: 'StoreRecords',
      time: this.props.time
    }
  }

  async _playAudio() {
    setTimeout(() => {
      var sound = new Sound(this.props.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _deleteAudio() {
    return RNFS.unlink(this.props.audioPath)
    .then(() => {
      this.setState({time:null})
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log(err.message);
    });
  }


  render() {
    return (
      <View style={styles.container}>
        
        {this.state.time!=null?
        <View style={styles.welcome}>

        <TouchableOpacity activeOpacity={.5} onPress={this._playAudio.bind(this)}>
        <Image style={styles.image} source={require('../images/play_Icon.png')}/>
        </TouchableOpacity>

        <Text style={styles.text}>{'     '}{this.props.name}{'  '}{this.props.time}{'     '}</Text>

        <TouchableOpacity activeOpacity={.5} onPress={this._deleteAudio.bind(this)}>
          <Image style={styles.image} source={require('../images/download.png')}/>
        </TouchableOpacity>

        </View>:

        <View style={styles.welcome}>
          <Text style={styles.text}>No recording</Text>
        </View>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    marginBottom:350,
    flexDirection: 'row',
    width:340,
    height:100,
    backgroundColor:'white',
  },
  text: {
    alignItems:'center',
    color:'black',
    fontWeight:'bold'
  },
  image: {
    width:30,
    height:30
  },
});

AppRegistry.registerComponent('StoreRecords', () => StoreRecords);