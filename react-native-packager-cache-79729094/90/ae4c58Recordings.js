Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeDropdownalert = require('react-native-dropdownalert');

var _reactNativeDropdownalert2 = babelHelpers.interopRequireDefault(_reactNativeDropdownalert);

var _reactNativeSound = require('react-native-sound');

var _reactNativeSound2 = babelHelpers.interopRequireDefault(_reactNativeSound);

var _reactNativeAudio = require('react-native-audio');

var RNFS = require('react-native-fs');

var stop = require("../images/stop.png");
var record = require("../images/recordStart.png");
var pause = require("../images/pause.png");

var Recordings = function (_Component) {
  babelHelpers.inherits(Recordings, _Component);

  function Recordings(props) {
    babelHelpers.classCallCheck(this, Recordings);

    var _this = babelHelpers.possibleConstructorReturn(this, (Recordings.__proto__ || Object.getPrototypeOf(Recordings)).call(this, props));

    _this.showAlert = _this.showAlert.bind(_this);
    _this.state = {
      time: new Date(),
      name: "",
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: RNFS.ExternalStorageDirectoryPath + '/test.aac',
      hasPermission: undefined
    };
    return _this;
  }

  babelHelpers.createClass(Recordings, [{
    key: 'prepareRecordingPath',
    value: function prepareRecordingPath(audioPath) {
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
        'message': 'Recordings needs access to your microphone.'
      };

      return _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale).then(function (result) {
        return result === true || result === _reactNative.PermissionsAndroid.RESULTS.GRANTED;
      });
    }
  }, {
    key: '_buttonValue',
    value: function _buttonValue(title, onPress, active) {
      var style = active ? styles.activeButtonText : styles.buttonText;
      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        { activeOpactiy: .5, onPress: onPress },
        _react2.default.createElement(_reactNative.Image, { style: styles.buttonImage, source: title })
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
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              this.setState({ stoppedRecording: true, recording: false });
              _context.prev = 3;
              _context.next = 6;
              return regeneratorRuntime.awrap(_reactNativeAudio.AudioRecorder.pauseRecording());

            case 6:
              filePath = _context.sent;

              if (_reactNative.Platform.OS === 'android') {
                this._finishRecording(true, filePath);
                this.showPauseAlert();
              }
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](3);

              console.error(_context.t0);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[3, 10]]);
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
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return');

            case 2:
              this.setState({ stoppedRecording: true, recording: false });
              this.setState({ currentTime: 0 });

              _context2.prev = 4;
              _context2.next = 7;
              return regeneratorRuntime.awrap(_reactNativeAudio.AudioRecorder.stopRecording());

            case 7:
              filePath = _context2.sent;

              if (_reactNative.Platform.OS === 'android') {
                this._finishRecording.bind(true, filePath);
                this.showAlert();
                this.props.recordTime(this.state.time);
                this.props.audioPath(this.state.audioPath);
                this.props.recording(this.state.recording);
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
    key: '_record',
    value: function _record() {
      var filePath;
      return regeneratorRuntime.async(function _record$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.state.stoppedRecording) {
                this.prepareRecordingPath(this.state.audioPath);
              }
              this.setState({ recording: true });
              _context3.prev = 2;
              _context3.next = 5;
              return regeneratorRuntime.awrap(_reactNativeAudio.AudioRecorder.startRecording());

            case 5:
              filePath = _context3.sent;
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3['catch'](2);

              console.error(_context3.t0);

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this, [[2, 8]]);
    }
  }, {
    key: '_finishRecording',
    value: function _finishRecording(didSucceed, filePath) {
      this.setState({ finished: didSucceed });
    }
  }, {
    key: 'onClose',
    value: function onClose(data) {
      console.log(data);
    }
  }, {
    key: 'closeAlert',
    value: function closeAlert() {
      this.dropdown.onClose();
    }
  }, {
    key: 'showAlert',
    value: function showAlert() {
      this.dropdown.alertWithType('success', 'Recorder #', "Voice Recorded");
    }
  }, {
    key: 'showPauseAlert',
    value: function showPauseAlert() {
      this.dropdown.alertWithType('warn', 'Recorder #', "Voice Paused");
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.container },
        _react2.default.createElement(
          _reactNative.View,
          { style: styles.controls },
          _react2.default.createElement(_reactNative.Image, { style: styles.image, source: require('../images/record.png') }),
          _react2.default.createElement(
            _reactNative.Text,
            { style: styles.progressText },
            this.state.currentTime,
            's'
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: styles.buttonView },
            this._buttonValue(record, function () {
              _this3._record();
            }, this.state.recording),
            this._buttonValue(stop, function () {
              _this3._stop();
            }),
            this._buttonValue(pause, function () {
              _this3._pause();
            })
          ),
          _react2.default.createElement(_reactNativeDropdownalert2.default, {
            ref: function ref(_ref) {
              return _this3.dropdown = _ref;
            },
            onClose: function onClose(data) {
              return _this3.onClose(data);
            } })
        )
      );
    }
  }]);
  return Recordings;
}(_react.Component);

exports.default = Recordings;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191919"
  },
  image: {
    width: 200,
    height: 200
  },
  buttonImage: {
    width: 40,
    height: 40
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

_reactNative.AppRegistry.registerComponent('Recordings', function () {
  return Recordings;
});