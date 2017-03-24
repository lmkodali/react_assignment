Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var width = _reactNative.Dimensions.get('window').width;

var NavigationBar = function (_Component) {
	babelHelpers.inherits(NavigationBar, _Component);

	function NavigationBar() {
		babelHelpers.classCallCheck(this, NavigationBar);
		return babelHelpers.possibleConstructorReturn(this, (NavigationBar.__proto__ || Object.getPrototypeOf(NavigationBar)).apply(this, arguments));
	}

	babelHelpers.createClass(NavigationBar, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.state = this._getStateFromProps(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			var newState = this._getStateFromProps(newProps);
			this.setState(newState);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState, context) {
			return JSON.stringify([nextState, context]) !== JSON.stringify([this.state, context]);
		}
	}, {
		key: '_getStateFromProps',
		value: function _getStateFromProps(props) {
			return babelHelpers.extends({}, props);
		}
	}, {
		key: '_renderLeftIcon',
		value: function _renderLeftIcon() {
			if (this.state.leftButtonIcon) {
				return _react2.default.createElement(_reactNative.Image, { style: styles.leftButtonIcon, resizeMode: 'contain', source: this.state.leftButtonIcon });
			}
			return null;
		}
	}, {
		key: '_renderRightIcon',
		value: function _renderRightIcon() {
			if (this.state.rightButtonIcon) {
				return _react2.default.createElement(_reactNative.Image, { style: styles.rightButtonIcon, resizeMode: 'contain', source: this.state.rightButtonIcon });
			}
			return null;
		}
	}, {
		key: '_onLeftButtonPressHandle',
		value: function _onLeftButtonPressHandle(event) {
			var onPress = this.state.onLeftButtonPress;
			typeof onPress === 'function' && onPress(event);
		}
	}, {
		key: '_onRightButtonPressHandle',
		value: function _onRightButtonPressHandle(event) {
			var onPress = this.state.onRightButtonPress;
			typeof onPress === 'function' && onPress(event);
		}
	}, {
		key: 'render',
		value: function render() {
			var height = _reactNative.Platform.OS === 'ios' ? this.state.height + 20 : this.state.height;
			return _react2.default.createElement(
				_reactNative.View,
				{ style: [styles.container, {
						height: height,
						backgroundColor: this.state.backgroundColor
					}] },
				_react2.default.createElement(
					_reactNative.TouchableOpacity,
					{ onPress: this._onLeftButtonPressHandle.bind(this) },
					_react2.default.createElement(
						_reactNative.View,
						{ style: styles.leftButton },
						this._renderLeftIcon(),
						_react2.default.createElement(
							_reactNative.Text,
							{ style: [styles.leftButtonTitle, { color: this.state.leftButtonTitleColor }] },
							this.state.leftButtonTitle
						)
					)
				),
				_react2.default.createElement(
					_reactNative.View,
					{ style: styles.title },
					_react2.default.createElement(
						_reactNative.Text,
						{ style: [styles.titleText, { color: this.state.titleColor }], numberOfLines: 1 },
						this.state.title
					)
				),
				_react2.default.createElement(
					_reactNative.TouchableOpacity,
					{ onPress: this._onRightButtonPressHandle.bind(this) },
					_react2.default.createElement(
						_reactNative.View,
						{ style: styles.rightButton },
						this._renderRightIcon(),
						_react2.default.createElement(
							_reactNative.Text,
							{ style: [styles.rightButtonTitle, { color: this.state.rightButtonTitleColor }] },
							this.state.rightButtonTitle
						)
					)
				)
			);
		}
	}]);
	return NavigationBar;
}(_react.Component);

NavigationBar.propTypes = {
	title: _react.PropTypes.string.isRequired,

	height: _react.PropTypes.number,
	titleColor: _react.PropTypes.string,
	backgroundColor: _react.PropTypes.string,
	leftButtonTitle: _react.PropTypes.string,
	leftButtonTitleColor: _react.PropTypes.string,
	onLeftButtonPress: _react.PropTypes.func,
	rightButtonTitle: _react.PropTypes.string,
	rightButtonTitleColor: _react.PropTypes.string,
	onRightButtonPress: _react.PropTypes.func
};
NavigationBar.defaultProps = {
	height: 44,
	titleColor: '#000',
	backgroundColor: '#f5f3f4',
	leftButtonTitle: null,
	leftButtonTitleColor: '#000',
	rightButtonTitle: null,
	rightButtonTitleColor: '#000'
};
exports.default = NavigationBar;
;

var styles = _reactNative.StyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		flexDirection: 'row',
		width: width
	},
	leftButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 90,
		paddingTop: 1,
		paddingLeft: 8
	},
	leftButtonIcon: {
		width: 12,
		height: 15,
		marginRight: 6
	},
	leftButtonTitle: {
		fontSize: 15
	},
	title: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 1,
		justifyContent: 'center',
		width: width - 200,
		overflow: 'hidden'
	},
	titleText: {
		fontSize: 18,
		fontWeight: '400'
	},
	rightButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: 90,
		paddingTop: 1,
		paddingRight: 8
	},
	rightButtonIcon: {
		width: 10,
		height: 15
	},
	rightButtonTitle: {
		fontSize: 15
	}
});

if (_reactNative.Platform.OS === 'ios') {
	styles = babelHelpers.extends({}, styles, {
		container: {
			flex: 1,
			position: 'absolute',
			top: 0,
			left: 0,
			flexDirection: 'row',
			width: width,
			paddingTop: 20
		},
		rightButton: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'center',
			width: 90,
			paddingTop: 1,
			paddingRight: 8
		}
	});
}