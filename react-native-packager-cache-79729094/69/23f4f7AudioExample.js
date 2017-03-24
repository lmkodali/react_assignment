Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeFs = require('react-native-fs');

var _reactNativeNavigationBar = require('react-native-navigation-bar');

var _reactNativeNavigationBar2 = babelHelpers.interopRequireDefault(_reactNativeNavigationBar);

var _reactNativeFileProvider = require('react-native-file-provider');

var _reactNativeFileProvider2 = babelHelpers.interopRequireDefault(_reactNativeFileProvider);

var _reactNativeSound = require('react-native-sound');

var _reactNativeSound2 = babelHelpers.interopRequireDefault(_reactNativeSound);

var _reactNativeAudio = require('react-native-audio');

var AudioExample = function (_Component) {
  babelHelpers.inherits(AudioExample, _Component);

  function AudioExample(props) {
    babelHelpers.classCallCheck(this, AudioExample);

    var _this = babelHelpers.possibleConstructorReturn(this, (AudioExample.__proto__ || Object.getPrototypeOf(AudioExample)).call(this, props));

    _this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: _reactNativeFs.ExternalStorageDirectoryPath + '/test.aac',
      hasPermission: undefined
    };
    return _this;
  }

  babelHelpers.createClass(AudioExample, [{
    key: 'prepareRecordingPath',
    value: function prepareRecordingPath(audioPath) {
      console.log(audioPath);
      _reactNativeAudio.AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        AudioEncodingBitRate: 32000
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._checkPermission().then(function (hasPermission) {
        _this2.setState({ hasPermission: hasPermission });

        if (!hasPermission) return;

        _this2.prepareRecordingPath(_this2.state.audioPath);

        _reactNativeAudio.AudioRecorder.onProgress = function (data) {
          _this2.setState({ currentTime: Math.floor(data.currentTime) });
        };

        _reactNativeAudio.AudioRecorder.onFinished = function (data) {
          if (_reactNative.Platform.OS === 'ios') {
            _this2._finishRecording(data.status === "OK", data.audioFileURL);
          }
        };
      });
    }
  }, {
    key: '_checkPermission',
    value: function _checkPermission() {
      if (_reactNative.Platform.OS !== 'android') {
        return Promise.resolve(true);
      }

      var rationale = {
        'title': 'Microphone Permission',
        'message': 'AudioExample needs access to your microphone.'
      };

      return _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale).then(function (result) {
        console.log('Permission result:', result);
        return result === true || result === _reactNative.PermissionsAndroid.RESULTS.GRANTED;
      });
    }
  }, {
    key: '_buttonValue',
    value: function _buttonValue(title, onPress, active) {
      var style = active ? styles.activeButtonText : styles.buttonText;

      return _react2.default.createElement(
        _reactNative.TouchableHighlight,
        { style: styles.button, onPress: onPress },
        _react2.default.createElement(
          _reactNative.Text,
          { style: style },
          title
        )
      );
    }
  }, {
    key: '_pause',
    value: function _pause() {
      var filePath;
      return regeneratorRuntime.async(function _pause$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.state.recording) {
                _context.next = 3;
                break;
              }

              console.warn('Can\'t pause, not recording!');
              return _context.abrupt('return');

            case 3:

              this.setState({ stoppedRecording: true, recording: false });

              _context.prev = 4;
              _context.next = 7;
              return regeneratorRuntime.awrap(_reactNativeAudio.AudioRecorder.pauseRecording());

            case 7:
              filePath = _context.sent;

              if (_reactNative.Platform.OS === 'android') {
                this._finishRecording(true, filePath);
              }
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](4);

              console.error(_context.t0);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[4, 11]]);
    }
  }, {
    key: '_stop',
    value: function _stop() {
      var filePath;
      return regeneratorRuntime.async(function _stop$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.state.recording) {
                _context2.next = 3;
                break;
              }

              console.warn('Can\'t stop, not recording!');
              return _context2.abrupt('return');

            case 3:

              this.setState({ stoppedRecording: true, recording: false });

              _context2.prev = 4;
              _context2.next = 7;
              return regeneratorRuntime.awrap(_reactNativeAudio.AudioRecorder.stopRecording());

            case 7:
              filePath = _context2.sent;


              if (_reactNative.Platform.OS === 'android') {
                this._finishRecording(true, filePath);
              }
              return _context2.abrupt('return', filePath);

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](4);

              console.error(_context2.t0);

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this, [[4, 12]]);
    }
  }, {
    key: '_play',
    value: function _play() {
      var _this3 = this;

      return regeneratorRuntime.async(function _play$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.state.recording) {
                _context3.next = 3;
                break;
              }

              _context3.next = 3;
              return regeneratorRuntime.awrap(this._stop());

            case 3:
              setTimeout(function () {
                var sound = new _reactNativeSound2.default(_this3.state.audioPath, '', function (error) {
                  if (error) {
                    console.log('failed to load the sound', error);
                  }
                });

                setTimeout(function () {
                  sound.play(function (success) {
                    if (success) {
                      console.log('successfully finished playing');
                    } else {
                      console.log('playback failed due to audio decoding errors');
                    }
                  });
                }, 100);
              }, 100);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: '_delete',
    value: function _delete() {
      var filepath;
      return regeneratorRuntime.async(function _delete$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              filepath = this.state.audioPath;


              _reactNativeFs.RNFS.exists(filepath).then(function (result) {
                console.log("file exists: ", result);

                if (result) {
                  return _reactNativeFs.RNFS.unlink(filepath).then(function () {
                    console.log('FILE DELETED');
                  }).catch(function (err) {
                    console.log(err.message);
                  });
                }
              }).catch(function (err) {
                console.log(err.message);
              });

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: '_record',
    value: function _record() {
      var filePath;
      return regeneratorRuntime.async(function _record$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.state.recording) {
                _context5.next = 3;
                break;
              }

              console.warn('Already recording!');
              return _context5.abrupt('return');

            case 3:
              if (this.state.hasPermission) {
                _context5.next = 6;
                break;
              }

              console.warn('Can\'t record, no permission granted!');
              return _context5.abrupt('return');

            case 6:

              if (this.state.stoppedRecording) {
                this.prepareRecordingPath(this.state.audioPath);
              }

              this.setState({ recording: true });

              _context5.prev = 8;
              _context5.next = 11;
              return regeneratorRuntime.awrap(_reactNativeAudio.AudioRecorder.startRecording());

            case 11:
              filePath = _context5.sent;
              _context5.next = 17;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5['catch'](8);

              console.error(_context5.t0);

            case 17:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, this, [[8, 14]]);
    }
  }, {
    key: '_finishRecording',
    value: function _finishRecording(didSucceed, filePath) {
      this.setState({ finished: didSucceed });
      console.log('Finished recording of duration ' + this.state.currentTime + ' seconds at path: ' + filePath);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.container },
        _react2.default.createElement(_reactNativeNavigationBar2.default, {
          title: 'Recorder',
          height: 50,
          titleColor: '#fff',
          backgroundColor: '#149be0',
          leftButtonTitleColor: '#fff'
        }),
        _react2.default.createElement(
          _reactNative.View,
          { style: styles.controls },
          _react2.default.createElement(_reactNative.Image, { style: styles.image, source: require('./record.png') }),
          _react2.default.createElement(
            _reactNative.Text,
            { style: styles.progressText },
            this.state.currentTime,
            's'
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: styles.buttonView },
            this._buttonValue("RECORD", function () {
              _this4._record();
            }, this.state.recording),
            this._buttonValue("PLAY", function () {
              _this4._play();
            }),
            this._buttonValue("STOP", function () {
              _this4._stop();
            }),
            this._buttonValue("PAUSE", function () {
              _this4._pause();
            }),
            this._buttonValue("DELETE", function () {
              _this4._delete();
            })
          )
        )
      );
    }
  }]);
  return AudioExample;
}(_react.Component);

exports.default = AudioExample;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191919"
  },
  image: {
    width: 200,
    height: 200
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  buttonView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#fff"
  },
  button: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10
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

_reactNative.AppRegistry.registerComponent('AudioExample', function () {
  return AudioExample;
});