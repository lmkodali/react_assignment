'use strict';

var _react = require("react");

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require("react-native");

var _reactNative2 = babelHelpers.interopRequireDefault(_reactNative);

var AudioRecorderManager = _reactNative.NativeModules.AudioRecorderManager;

var AudioRecorder = {
  prepareRecordingAtPath: function prepareRecordingAtPath(path, options) {
    var _this = this;

    if (this.progressSubscription) this.progressSubscription.remove();
    this.progressSubscription = _reactNative.NativeAppEventEmitter.addListener('recordingProgress', function (data) {
      if (_this.onProgress) {
        _this.onProgress(data);
      }
    });

    if (this.finishedSubscription) this.finishedSubscription.remove();
    this.finishedSubscription = _reactNative.NativeAppEventEmitter.addListener('recordingFinished', function (data) {
      if (_this.onFinished) {
        _this.onFinished(data);
      }
    });

    var defaultOptions = {
      SampleRate: 44100.0,
      Channels: 2,
      AudioQuality: 'High',
      AudioEncoding: 'ima4',
      OutputFormat: 'mpeg_4',
      MeteringEnabled: false,
      AudioEncodingBitRate: 32000
    };

    var recordingOptions = babelHelpers.extends({}, defaultOptions, options);

    if (_reactNative.Platform.OS === 'ios') {
      AudioRecorderManager.prepareRecordingAtPath(path, recordingOptions.SampleRate, recordingOptions.Channels, recordingOptions.AudioQuality, recordingOptions.AudioEncoding, recordingOptions.MeteringEnabled);
    } else {
      return AudioRecorderManager.prepareRecordingAtPath(path, recordingOptions);
    }
  },
  startRecording: function startRecording() {
    return AudioRecorderManager.startRecording();
  },
  pauseRecording: function pauseRecording() {
    return AudioRecorderManager.pauseRecording();
  },
  stopRecording: function stopRecording() {
    return AudioRecorderManager.stopRecording();
  },
  checkAuthorizationStatus: AudioRecorderManager.checkAuthorizationStatus,
  requestAuthorization: AudioRecorderManager.requestAuthorization,
  removeListeners: function removeListeners() {
    if (this.progressSubscription) this.progressSubscription.remove();
    if (this.finishedSubscription) this.finishedSubscription.remove();
  }
};

var AudioUtils = {};

if (_reactNative.Platform.OS === 'ios') {
  AudioUtils = {
    MainBundlePath: AudioRecorderManager.MainBundlePath,
    CachesDirectoryPath: AudioRecorderManager.NSCachesDirectoryPath,
    DocumentDirectoryPath: AudioRecorderManager.NSDocumentDirectoryPath,
    LibraryDirectoryPath: AudioRecorderManager.NSLibraryDirectoryPath
  };
} else if (_reactNative.Platform.OS === 'android') {
  AudioUtils = {
    MainBundlePath: AudioRecorderManager.MainBundlePath,
    CachesDirectoryPath: AudioRecorderManager.CachesDirectoryPath,
    DocumentDirectoryPath: AudioRecorderManager.DocumentDirectoryPath,
    LibraryDirectoryPath: AudioRecorderManager.LibraryDirectoryPath,
    PicturesDirectoryPath: AudioRecorderManager.PicturesDirectoryPath,
    MusicDirectoryPath: AudioRecorderManager.MusicDirectoryPath,
    DownloadsDirectoryPath: AudioRecorderManager.DownloadsDirectoryPath
  };
}

module.exports = { AudioRecorder: AudioRecorder, AudioUtils: AudioUtils };