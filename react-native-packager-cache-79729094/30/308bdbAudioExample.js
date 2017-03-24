Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeScrollableTabView = require('react-native-scrollable-tab-view');

var _reactNativeScrollableTabView2 = babelHelpers.interopRequireDefault(_reactNativeScrollableTabView);

var _Recordings = require('./Recordings.js');

var _Recordings2 = babelHelpers.interopRequireDefault(_Recordings);

var _StoreRecords = require('./StoreRecords.js');

var _StoreRecords2 = babelHelpers.interopRequireDefault(_StoreRecords);

var _reactNativeNavigationBar = require('react-native-navigation-bar');

var _reactNativeNavigationBar2 = babelHelpers.interopRequireDefault(_reactNativeNavigationBar);

var AudioExample = function (_Component) {
  babelHelpers.inherits(AudioExample, _Component);

  function AudioExample(props) {
    babelHelpers.classCallCheck(this, AudioExample);

    var _this = babelHelpers.possibleConstructorReturn(this, (AudioExample.__proto__ || Object.getPrototypeOf(AudioExample)).call(this, props));

    _this.state = {
      time: null,
      name: "Test.aac",
      audioPath: null,
      recording: null
    };
    return _this;
  }

  babelHelpers.createClass(AudioExample, [{
    key: '_setTime',
    value: function _setTime(date) {
      var value = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      this.setState({ time: value });
    }
  }, {
    key: '_setName',
    value: function _setName(value) {
      this.setState({ name: value });
    }
  }, {
    key: '_setAudio',
    value: function _setAudio(value) {
      this.setState({ audioPath: value });
    }
  }, {
    key: '_setRecord',
    value: function _setRecord(value) {
      this.setState({ recording: value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.container },
        _react2.default.createElement(_reactNativeNavigationBar2.default, {
          title: 'Audio Recorder',
          height: 50,
          titleColor: '#fff',
          backgroundColor: '#149be0',
          leftButtonTitleColor: '#fff'
        }),
        _react2.default.createElement(
          _reactNativeScrollableTabView2.default,
          { style: styles.scrollBar },
          _react2.default.createElement(_Recordings2.default, { tabLabel: 'Records',
            recordTime: function recordTime(value) {
              return _this2._setTime(value);
            },
            recordName: function recordName(value) {
              return _this2._setName(value);
            },
            audioPath: function audioPath(value) {
              return _this2._setAudio(value);
            },
            recording: function recording(value) {
              return _this2._setRecord(value);
            }
          }),
          _react2.default.createElement(_StoreRecords2.default, { tabLabel: 'Recorded',
            time: this.state.time,
            name: this.state.name,
            audioPath: this.state.audioPath,
            recording: this.state.recording
          })
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
    backgroundColor: 'transparent'
  },
  scrollBar: {
    marginTop: 50,
    backgroundColor: '#149be0'
  }
});

_reactNative.AppRegistry.registerComponent('AudioExample', function () {
  return AudioExample;
});