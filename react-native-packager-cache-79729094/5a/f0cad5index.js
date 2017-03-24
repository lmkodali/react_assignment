Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DURATION = undefined;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var DURATION = exports.DURATION = { LENGTH_LONG: 2000, LENGTH_SHORT: 500 };

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height,
    width = _Dimensions$get.width;

var Toast = function (_Component) {
    babelHelpers.inherits(Toast, _Component);

    function Toast(props) {
        babelHelpers.classCallCheck(this, Toast);

        var _this = babelHelpers.possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

        _this.state = {
            isShow: false,
            text: '',
            opacityValue: new _reactNative.Animated.Value(_this.props.opacity)
        };
        return _this;
    }

    babelHelpers.createClass(Toast, [{
        key: 'show',
        value: function show(text, duration) {
            var _this2 = this;

            this.duration = duration || DURATION.LENGTH_SHORT;

            this.setState({
                isShow: true,
                text: text
            });

            _reactNative.Animated.timing(this.state.opacityValue, {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration
            }).start(function () {
                _this2.isShow = true;
                _this2.close();
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var _this3 = this;

            var delay = this.duration;

            if (!this.isShow) return;
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                _reactNative.Animated.timing(_this3.state.opacityValue, {
                    toValue: 0.0,
                    duration: _this3.props.fadeOutDuration
                }).start(function () {
                    _this3.setState({
                        isShow: false
                    });
                    _this3.isShow = false;
                });
            }, delay);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.timer && clearTimeout(this.timer);
        }
    }, {
        key: 'render',
        value: function render() {
            var pos = void 0;
            switch (this.props.position) {
                case 'top':
                    pos = this.props.positionValue;
                    break;
                case 'center':
                    pos = height / 2;
                    break;
                case 'bottom':
                    pos = height - this.props.positionValue;
                    break;
            }
            var view = this.state.isShow ? _react2.default.createElement(
                _reactNative.View,
                {
                    style: [styles.container, { top: pos }],
                    pointerEvents: 'none'
                },
                _react2.default.createElement(
                    _reactNative.Animated.View,
                    {
                        style: [styles.content, { opacity: this.state.opacityValue }, this.props.style]
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        { style: this.props.textStyle },
                        this.state.text
                    )
                )
            ) : null;
            return view;
        }
    }]);
    return Toast;
}(_react.Component);

exports.default = Toast;


var styles = _reactNative.StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10
    },
    text: {
        color: 'white'
    }
});

Toast.propTypes = {
    style: _reactNative.View.propTypes.style,
    position: _react2.default.PropTypes.oneOf(['top', 'center', 'bottom']),
    textStyle: _reactNative.Text.propTypes.style,
    positionValue: _react2.default.PropTypes.number,
    fadeInDuration: _react2.default.PropTypes.number,
    fadeOutDuration: _react2.default.PropTypes.number,
    opacity: _react2.default.PropTypes.number
};

Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
};