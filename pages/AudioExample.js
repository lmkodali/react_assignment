import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Recordings from './Recordings.js';
import StoreRecords from './StoreRecords.js';
import NavigationBar from 'react-native-navigation-bar';

export default class AudioExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: null,
      name: "Test.aac",
      audioPath: null,
      recording: null
    }
  }


  _setTime(date) {
    var value = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    this.setState({time: value})
  }

  _setName(value) {
    this.setState({name: value})
  }

  _setAudio(value) {
    this.setState({audioPath: value})
  }

  _setRecord(value) {
    this.setState({recording: value})
  }

  render() {
    return(
      <View style={styles.container}>
        <NavigationBar 
          title={'Audio Recorder'}
          height={50}
          titleColor={'#fff'}
          backgroundColor={'#149be0'}
          leftButtonTitleColor={'#fff'}
        />
        <ScrollableTabView style={styles.scrollBar}>
          <Recordings tabLabel="Records" 
            recordTime={(value) => this._setTime(value)}
            recordName={(value) => this._setName(value)}
            audioPath={(value) => this._setAudio(value)}
            recording={(value) => this._setRecord(value)}
          />
          <StoreRecords tabLabel="Recorded" 
            time={this.state.time}
            name={this.state.name}
            audioPath={this.state.audioPath}
            recording={this.state.recording}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent',
  },
  scrollBar: {
    marginTop:50,
    backgroundColor:'#149be0'
  },
});

AppRegistry.registerComponent('AudioExample', () => AudioExample);