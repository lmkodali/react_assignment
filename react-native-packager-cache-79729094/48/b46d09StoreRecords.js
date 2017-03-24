"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSound = require('react-native-sound');

var _reactNativeSound2 = babelHelpers.interopRequireDefault(_reactNativeSound);

var RNFS = require('react-native-fs');

var StoreRecords = function (_Component) {
  babelHelpers.inherits(StoreRecords, _Component);

  function StoreRecords(props) {
    babelHelpers.classCallCheck(this, StoreRecords);

    var _this = babelHelpers.possibleConstructorReturn(this, (StoreRecords.__proto__ || Object.getPrototypeOf(StoreRecords)).call(this, props));

    _this.state = {
      id: 'StoreRecords',
      time: _this.props.time
    };
    return _this;
  }

  babelHelpers.createClass(StoreRecords, [{
    key: '_playAudio',
    value: function _playAudio() {
      var _this2 = this;

      return regeneratorRuntime.async(function _playAudio$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setTimeout(function () {
                var sound = new _reactNativeSound2.default(_this2.props.audioPath, '', function (error) {
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

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: '_deleteAudio',
    value: function _deleteAudio() {
      var _this3 = this;

      return regeneratorRuntime.async(function _deleteAudio$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', RNFS.unlink(this.props.audioPath).then(function () {
                _this3.setState({ time: null });
                console.log('FILE DELETED');
              }).catch(function (err) {
                console.log(err.message);
              }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.container },
        this.state.time != null ? _react2.default.createElement(
          _reactNative.View,
          { style: styles.welcome },
          _react2.default.createElement(
            _reactNative.TouchableOpacity,
            { activeOpacity: .5, onPress: this._playAudio.bind(this) },
            _react2.default.createElement(_reactNative.Image, { style: styles.image, source: require('../images/play_Icon.png') })
          ),
          _react2.default.createElement(
            _reactNative.Text,
            { style: styles.text },
            '     ',
            this.props.name,
            '  ',
            this.props.time,
            '     '
          ),
          _react2.default.createElement(
            _reactNative.TouchableOpacity,
            { activeOpacity: .5, onPress: this._deleteAudio.bind(this) },
            _react2.default.createElement(_reactNative.Image, { style: styles.image, source: require('../images/download.png') })
          )
        ) : _react2.default.createElement(
          _reactNative.View,
          { style: styles.welcome },
          _react2.default.createElement(
            _reactNative.Text,
            { style: styles.text },
            'No recording'
          )
        )
      );
    }
  }]);
  return StoreRecords;
}(_react.Component);

exports.default = StoreRecords;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    marginBottom: 350,
    flexDirection: 'row',
    width: 340,
    height: 100,
    backgroundColor: 'white'
  },
  text: {
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  image: {
    width: 30,
    height: 30
  }
});

_reactNative.AppRegistry.registerComponent('StoreRecords', function () {
  return StoreRecords;
});