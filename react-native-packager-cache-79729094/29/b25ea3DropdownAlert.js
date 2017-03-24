Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var DEFAULT_IMAGE_DIMENSIONS = 36;
var WINDOW = _reactNative.Dimensions.get('window');

var closeTimeoutId = null;
var panResponder;

var DropdownAlert = function (_Component) {
  babelHelpers.inherits(DropdownAlert, _Component);

  function DropdownAlert(props) {
    babelHelpers.classCallCheck(this, DropdownAlert);

    var _this = babelHelpers.possibleConstructorReturn(this, (DropdownAlert.__proto__ || Object.getPrototypeOf(DropdownAlert)).call(this, props));

    _this.state = {
      animationValue: new _reactNative.Animated.Value(0),
      duration: 450,
      type: '',
      message: '',
      title: '',
      isOpen: false,
      startDelta: props.startDelta,
      endDelta: props.endDelta,
      topValue: 0
    };

    _this.renderButton = _this.renderButton.bind(_this);
    _this.renderDropDown = _this.renderDropDown.bind(_this);

    _this.alert = _this.alert.bind(_this);
    _this.alertWithType = _this.alertWithType.bind(_this);
    _this.dismiss = _this.dismiss.bind(_this);
    _this.onCancel = _this.onCancel.bind(_this);
    _this.onClose = _this.onClose.bind(_this);

    _this.animate = _this.animate.bind(_this);

    _this.handlePanResponderMove = _this.handlePanResponderMove.bind(_this);
    _this.handlePanResponderEnd = _this.handlePanResponderEnd.bind(_this);
    _this.handleMoveShouldSetPanResponder = _this.handleMoveShouldSetPanResponder.bind(_this);
    _this.handleStartShouldSetPanResponder = _this.handleMoveShouldSetPanResponder.bind(_this);
    return _this;
  }

  babelHelpers.createClass(DropdownAlert, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      panResponder = _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
        onPanResponderMove: this.handlePanResponderMove,
        onPanResponderRelease: this.handlePanResponderEnd,
        onPanResponderTerminate: this.handlePanResponderEnd
      });
    }
  }, {
    key: 'alert',
    value: function alert(title, message) {
      if (title == undefined) {
        title = null;
      }
      if (message == undefined) {
        message = null;
      }
      this.alertWithType('custom', title, message);
    }
  }, {
    key: 'alertWithType',
    value: function alertWithType(type, title, message) {
      if (this.validateType(type) == false) {
        return;
      }
      if (typeof title !== 'string') {
        title = title.toString();
        console.warn('DropdownAlert: Title is not a string.');
      }
      if (typeof message !== 'string') {
        message = message.toString();
        console.warn('DropdownAlert: Message is not a string.');
      }
      if (this.props.replaceEnabled == false) {
        this.setState({
          type: type,
          message: message,
          title: title,
          isOpen: true,
          topValue: 0
        });
        if (this.state.isOpen == false) {
          this.animate(1);
        }
        if (this.props.closeInterval > 1) {
          if (closeTimeoutId != null) {
            clearTimeout(closeTimeoutId);
          }
          closeTimeoutId = setTimeout(function () {
            this.onClose();
          }.bind(this), this.props.closeInterval);
        }
      } else {
        var delayInMilliSeconds = 0;
        if (this.state.isOpen == true) {
          delayInMilliSeconds = 475;
          this.dismiss();
        }
        var self = this;
        setTimeout(function () {
          if (self.state.isOpen == false) {
            self.setState({
              type: type,
              message: message,
              title: title,
              isOpen: true,
              topValue: 0
            });
          }
          self.animate(1);
          if (self.props.closeInterval > 1) {
            closeTimeoutId = setTimeout(function () {
              self.onClose();
            }.bind(self), self.props.closeInterval);
          }
        }.bind(this), delayInMilliSeconds);
      }
    }
  }, {
    key: 'dismiss',
    value: function dismiss(onDismiss) {
      if (this.state.isOpen) {
        if (closeTimeoutId != null) {
          clearTimeout(closeTimeoutId);
        }
        this.animate(0);
        setTimeout(function () {
          if (this.state.isOpen) {
            this.setState({ isOpen: false });
            if (onDismiss) {
              var data = {
                type: this.state.type,
                title: this.state.title,
                message: this.state.message
              };
              onDismiss(data);
            }
          }
        }.bind(this), this.state.duration);
      }
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      this.dismiss(this.props.onClose);
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.dismiss(this.props.onCancel);
    }
  }, {
    key: 'animate',
    value: function animate(toValue) {
      _reactNative.Animated.spring(this.state.animationValue, {
        toValue: toValue,
        duration: this.state.duration,
        friction: 9
      }).start();
    }
  }, {
    key: 'onLayoutEvent',
    value: function onLayoutEvent(event) {
      var _event$nativeEvent$la = event.nativeEvent.layout,
          x = _event$nativeEvent$la.x,
          y = _event$nativeEvent$la.y,
          width = _event$nativeEvent$la.width,
          height = _event$nativeEvent$la.height;

      var actualStartDelta = this.state.startDelta;
      var actualEndDelta = this.state.endDelta;

      if (this.props.startDelta < 0) {
        var delta = 0 - height;
        if (delta != this.props.startDelta) {
          actualStartDelta = delta;
        }
      } else if (this.props.startDelta > WINDOW.height) {
        actualStartDelta = WINDOW.height + height;
      }
      if (this.props.endDelta < 0) {
        actualEndDelta = 0;
      } else if (this.props.endDelta > WINDOW.height) {
        actualEndDelta = WINDOW.height - height;
      }
      var heightDelta = WINDOW.height - this.props.endDelta - height;
      if (heightDelta < 0) {
        actualEndDelta = this.props.endDelta + heightDelta;
      }
      if (actualStartDelta != this.state.startDelta || actualEndDelta != this.state.endDelta) {
        this.setState({
          startDelta: actualStartDelta,
          endDelta: actualEndDelta
        });
      }
    }
  }, {
    key: 'validateType',
    value: function validateType(type) {
      if (type.length === 0 || type === null) {
        console.warn('Missing DropdownAlert type. Available types: info, warn, error or custom');
        return false;
      }
      if (type != 'info' && type != 'warn' && type != 'error' && type != 'custom' && type != 'success') {
        console.warn('Invalid DropdownAlert type. Available types: info, warn, error, success, or custom');
        return false;
      }
      return true;
    }
  }, {
    key: 'handleStartShouldSetPanResponder',
    value: function handleStartShouldSetPanResponder(e, gestureState) {
      return this.props.panResponderEnabled;
    }
  }, {
    key: 'handleMoveShouldSetPanResponder',
    value: function handleMoveShouldSetPanResponder(e, gestureState) {
      return gestureState.dx !== 0 && gestureState.dy !== 0 && this.props.panResponderEnabled;
    }
  }, {
    key: 'handlePanResponderMove',
    value: function handlePanResponderMove(e, gestureState) {
      if (gestureState.dy < 0) {
        this.setState({
          topValue: gestureState.dy
        });
      }
    }
  }, {
    key: 'handlePanResponderEnd',
    value: function handlePanResponderEnd(e, gestureState) {
      var delta = this.state.startDelta / 5;
      if (gestureState.dy < delta) {
        this.dismiss(this.props.onClose);
      }
    }
  }, {
    key: 'renderText',
    value: function renderText(text, style, numberOfLines) {
      if (text != null) {
        if (text.length > 0) {
          return _react2.default.createElement(
            _reactNative.Text,
            { style: style, numberOfLines: numberOfLines },
            text
          );
        }
      }
      return null;
    }
  }, {
    key: 'renderImage',
    value: function renderImage(source, style) {
      if (source != null) {
        if (typeof source === 'number') {
          return _react2.default.createElement(_reactNative.Image, { style: style, source: source });
        } else if (typeof source === 'string') {
          if (style['width'] == false) {
            style['width'] = DEFAULT_IMAGE_DIMENSIONS;
          }
          if (style['height'] == false) {
            style['height'] = DEFAULT_IMAGE_DIMENSIONS;
          }
          return _react2.default.createElement(_reactNative.Image, { style: style, source: { uri: source } });
        }
      }
      return null;
    }
  }, {
    key: 'renderStatusBar',
    value: function renderStatusBar(type, backgroundColor) {
      if (_reactNative.Platform.OS === 'android') {
        return _react2.default.createElement(_reactNative.StatusBar, { backgroundColor: backgroundColor });
      } else if (type != 'custom') {
        return _react2.default.createElement(_reactNative.StatusBar, { barStyle: 'light-content' });
      }
      return null;
    }
  }, {
    key: 'renderButton',
    value: function renderButton(source, style, onPress, underlayColor, isRendered) {
      if (source != null && isRendered) {
        return _react2.default.createElement(
          _reactNative.TouchableHighlight,
          { style: { alignSelf: style.alignSelf, width: style.width, height: style.height }, onPress: onPress, underlayColor: underlayColor },
          this.renderImage(source, style)
        );
      }
      return null;
    }
  }, {
    key: 'renderDropDown',
    value: function renderDropDown(isOpen) {
      var _this2 = this;

      if (isOpen == true) {
        var style = [styles.defaultContainer, this.props.containerStyle];
        var source = this.props.imageSrc;
        var backgroundColor = this.props.containerStyle.backgroundColor;
        switch (this.state.type) {
          case 'info':
            style = [styles.defaultContainer, { backgroundColor: this.props.infoColor }];
            source = require('./assets/info.png');
            backgroundColor = this.props.infoColor;
            break;
          case 'warn':
            style = [styles.defaultContainer, { backgroundColor: this.props.warnColor }];
            source = require('./assets/warn.png');
            backgroundColor = this.props.warnColor;
            break;
          case 'error':
            style = [styles.defaultContainer, { backgroundColor: this.props.errorColor }];
            source = require('./assets/error.png');
            backgroundColor = this.props.errorColor;
            break;
          case 'success':
            style = [styles.defaultContainer, { backgroundColor: this.props.successColor }];
            source = require('./assets/success.png');
            backgroundColor = this.props.successColor;
            break;
        }
        return _react2.default.createElement(
          _reactNative.Animated.View,
          babelHelpers.extends({
            ref: function ref(_ref) {
              return _this2.mainView = _ref;
            }
          }, panResponder.panHandlers, {
            style: {
              transform: [{
                translateY: this.state.animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.startDelta, this.state.endDelta]
                })
              }],
              position: 'absolute',
              top: this.state.topValue,
              left: 0,
              right: 0
            } }),
          this.renderStatusBar(this.state.type, backgroundColor),
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              onPress: this.props.showCancel ? null : this.onClose,
              underlayColor: backgroundColor,
              disabled: !this.props.tapToCloseEnabled,
              onLayout: function onLayout(event) {
                return _this2.onLayoutEvent(event);
              } },
            _react2.default.createElement(
              _reactNative.View,
              { style: style },
              this.renderImage(source, this.props.imageStyle),
              _react2.default.createElement(
                _reactNative.View,
                { style: styles.textContainer },
                this.renderText(this.state.title, this.props.titleStyle, this.props.titleNumOfLines),
                this.renderText(this.state.message, this.props.messageStyle, this.props.messageNumOfLines)
              ),
              this.renderButton(this.props.cancelBtnImageSrc, this.props.cancelBtnImageStyle, this.onCancel, backgroundColor, this.props.showCancel)
            )
          )
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderDropDown(this.state.isOpen);
    }
  }]);
  return DropdownAlert;
}(_react.Component);

DropdownAlert.propTypes = {
  imageSrc: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  cancelBtnImageSrc: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  infoColor: _react.PropTypes.string,
  warnColor: _react.PropTypes.string,
  errorColor: _react.PropTypes.string,
  successColor: _react.PropTypes.string,
  closeInterval: _react.PropTypes.number,
  startDelta: _react.PropTypes.number,
  endDelta: _react.PropTypes.number,
  containerStyle: _reactNative.View.propTypes.style,
  titleStyle: _reactNative.Text.propTypes.style,
  messageStyle: _reactNative.Text.propTypes.style,
  imageStyle: _reactNative.Image.propTypes.style,
  cancelBtnImageStyle: _reactNative.Image.propTypes.style,
  titleNumOfLines: _react.PropTypes.number,
  messageNumOfLines: _react.PropTypes.number,
  onClose: _react.PropTypes.func,
  onCancel: _react.PropTypes.func,
  showCancel: _react.PropTypes.bool,
  tapToCloseEnabled: _react.PropTypes.bool,
  panResponderEnabled: _react.PropTypes.bool,
  replaceEnabled: _react.PropTypes.bool
};
DropdownAlert.defaultProps = {
  onClose: null,
  onCancel: null,
  closeInterval: 4000,
  startDelta: -100,
  endDelta: 0,
  titleNumOfLines: 1,
  messageNumOfLines: 3,
  imageSrc: null,
  cancelBtnImageSrc: require('./assets/cancel.png'),
  infoColor: '#2B73B6',
  warnColor: '#cd853f',
  errorColor: '#cc3232',
  successColor: '#32A54A',
  showCancel: false,
  tapToCloseEnabled: true,
  panResponderEnabled: true,
  replaceEnabled: true,
  containerStyle: {
    padding: 16,
    flexDirection: 'row'
  },
  titleStyle: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent'
  },
  messageStyle: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'normal',
    color: 'white',
    backgroundColor: 'transparent'
  },
  imageStyle: {
    padding: 8,
    width: DEFAULT_IMAGE_DIMENSIONS,
    height: DEFAULT_IMAGE_DIMENSIONS,
    alignSelf: 'center'
  },
  cancelBtnImageStyle: {
    padding: 8,
    width: DEFAULT_IMAGE_DIMENSIONS,
    height: DEFAULT_IMAGE_DIMENSIONS,
    alignSelf: 'center'
  }
};
exports.default = DropdownAlert;


var styles = _reactNative.StyleSheet.create({
  defaultContainer: {
    padding: 8,
    paddingTop: _reactNative.Platform.OS === 'android' ? 0 : 20,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    padding: 8
  }
});