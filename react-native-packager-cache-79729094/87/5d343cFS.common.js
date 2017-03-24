

'use strict';

var RNFSManager = require('react-native').NativeModules.RNFSManager;

var NativeAppEventEmitter = require('react-native').NativeAppEventEmitter;
var DeviceEventEmitter = require('react-native').DeviceEventEmitter;
var base64 = require('base-64');
var utf8 = require('utf8');

var RNFSFileTypeRegular = RNFSManager.RNFSFileTypeRegular;
var RNFSFileTypeDirectory = RNFSManager.RNFSFileTypeDirectory;

var jobId = 0;

var getJobId = function getJobId() {
  jobId += 1;
  return jobId;
};

var normalizeFilePath = function normalizeFilePath(path) {
  return path.startsWith('file://') ? path.slice(7) : path;
};

function readFileGeneric(filepath, encodingOrOptions, command) {
  var options = {
    encoding: 'utf8'
  };

  if (encodingOrOptions) {
    if (typeof encodingOrOptions === 'string') {
      options.encoding = encodingOrOptions;
    } else if (typeof encodingOrOptions === 'object') {
      options = encodingOrOptions;
    }
  }

  return command(normalizeFilePath(filepath)).then(function (b64) {
    var contents;

    if (options.encoding === 'utf8') {
      contents = utf8.decode(base64.decode(b64));
    } else if (options.encoding === 'ascii') {
      contents = base64.decode(b64);
    } else if (options.encoding === 'base64') {
      contents = b64;
    } else {
      throw new Error('Invalid encoding type "' + String(options.encoding) + '"');
    }

    return contents;
  });
}

function readDirGeneric(dirpath, command) {
  return command(normalizeFilePath(dirpath)).then(function (files) {
    return files.map(function (file) {
      return {
        name: file.name,
        path: file.path,
        size: file.size,
        isFile: function isFile() {
          return file.type === RNFSFileTypeRegular;
        },
        isDirectory: function isDirectory() {
          return file.type === RNFSFileTypeDirectory;
        }
      };
    });
  });
}

var RNFS = {
  mkdir: function mkdir(filepath) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return RNFSManager.mkdir(normalizeFilePath(filepath), options).then(function () {
      return void 0;
    });
  },
  moveFile: function moveFile(filepath, destPath) {
    return RNFSManager.moveFile(normalizeFilePath(filepath), normalizeFilePath(destPath)).then(function () {
      return void 0;
    });
  },
  copyFile: function copyFile(filepath, destPath) {
    return RNFSManager.copyFile(normalizeFilePath(filepath), normalizeFilePath(destPath)).then(function () {
      return void 0;
    });
  },
  pathForBundle: function pathForBundle(bundleNamed) {
    return RNFSManager.pathForBundle(bundleNamed);
  },
  getFSInfo: function getFSInfo() {
    return RNFSManager.getFSInfo();
  },
  unlink: function unlink(filepath) {
    return RNFSManager.unlink(normalizeFilePath(filepath)).then(function () {
      return void 0;
    });
  },
  exists: function exists(filepath) {
    return RNFSManager.exists(normalizeFilePath(filepath));
  },
  stopDownload: function stopDownload(jobId) {
    RNFSManager.stopDownload(jobId);
  },
  stopUpload: function stopUpload(jobId) {
    RNFSManager.stopUpload(jobId);
  },
  readDir: function readDir(dirpath) {
    return readDirGeneric(dirpath, RNFSManager.readDir);
  },
  readDirAssets: function readDirAssets(dirpath) {
    if (!RNFSManager.readDirAssets) {
      throw new Error('readDirAssets is not available on this platform');
    }
    return readDirGeneric(dirpath, RNFSManager.readDirAssets);
  },
  existsAssets: function existsAssets(filepath) {
    if (!RNFSManager.existsAssets) {
      throw new Error('existsAssets is not available on this platform');
    }
    return RNFSManager.existsAssets(filepath);
  },
  readdir: function readdir(dirpath) {
    return RNFS.readDir(normalizeFilePath(dirpath)).then(function (files) {
      return files.map(function (file) {
        return file.name;
      });
    });
  },
  stat: function stat(filepath) {
    return RNFSManager.stat(normalizeFilePath(filepath)).then(function (result) {
      return {
        'ctime': new Date(result.ctime * 1000),
        'mtime': new Date(result.mtime * 1000),
        'size': result.size,
        'mode': result.mode,
        isFile: function isFile() {
          return result.type === RNFSFileTypeRegular;
        },
        isDirectory: function isDirectory() {
          return result.type === RNFSFileTypeDirectory;
        }
      };
    });
  },
  readFile: function readFile(filepath, encodingOrOptions) {
    return readFileGeneric(filepath, encodingOrOptions, RNFSManager.readFile);
  },
  readFileAssets: function readFileAssets(filepath, encodingOrOptions) {
    if (!RNFSManager.readFileAssets) {
      throw new Error('readFileAssets is not available on this platform');
    }
    return readFileGeneric(filepath, encodingOrOptions, RNFSManager.readFileAssets);
  },
  hash: function hash(filepath, algorithm) {
    return RNFSManager.hash(filepath, algorithm);
  },
  copyFileAssets: function copyFileAssets(filepath, destPath) {
    if (!RNFSManager.copyFileAssets) {
      throw new Error('copyFileAssets is not available on this platform');
    }
    return RNFSManager.copyFileAssets(normalizeFilePath(filepath), normalizeFilePath(destPath)).then(function () {
      return void 0;
    });
  },
  writeFile: function writeFile(filepath, contents, encodingOrOptions) {
    var b64;

    var options = {
      encoding: 'utf8'
    };

    if (encodingOrOptions) {
      if (typeof encodingOrOptions === 'string') {
        options.encoding = encodingOrOptions;
      } else if (typeof encodingOrOptions === 'object') {
        options = encodingOrOptions;
      }
    }

    if (options.encoding === 'utf8') {
      b64 = base64.encode(utf8.encode(contents));
    } else if (options.encoding === 'ascii') {
      b64 = base64.encode(contents);
    } else if (options.encoding === 'base64') {
      b64 = contents;
    } else {
      throw new Error('Invalid encoding type "' + options.encoding + '"');
    }

    return RNFSManager.writeFile(normalizeFilePath(filepath), b64).then(function () {
      return void 0;
    });
  },
  appendFile: function appendFile(filepath, contents, encodingOrOptions) {
    var b64;

    var options = {
      encoding: 'utf8'
    };

    if (encodingOrOptions) {
      if (typeof encodingOrOptions === 'string') {
        options.encoding = encodingOrOptions;
      } else if (typeof encodingOrOptions === 'object') {
        options = encodingOrOptions;
      }
    }

    if (options.encoding === 'utf8') {
      b64 = base64.encode(utf8.encode(contents));
    } else if (options.encoding === 'ascii') {
      b64 = base64.encode(contents);
    } else if (options.encoding === 'base64') {
      b64 = contents;
    } else {
      throw new Error('Invalid encoding type "' + options.encoding + '"');
    }

    return RNFSManager.appendFile(normalizeFilePath(filepath), b64);
  },
  downloadFile: function downloadFile(options) {
    if (typeof options !== 'object') throw new Error('downloadFile: Invalid value for argument `options`');
    if (typeof options.fromUrl !== 'string') throw new Error('downloadFile: Invalid value for property `fromUrl`');
    if (typeof options.toFile !== 'string') throw new Error('downloadFile: Invalid value for property `toFile`');
    if (options.headers && typeof options.headers !== 'object') throw new Error('downloadFile: Invalid value for property `headers`');
    if (options.background && typeof options.background !== 'boolean') throw new Error('downloadFile: Invalid value for property `background`');
    if (options.progressDivider && typeof options.progressDivider !== 'number') throw new Error('downloadFile: Invalid value for property `progressDivider`');

    var jobId = getJobId();
    var subscriptions = [];

    if (options.begin) {
      subscriptions.push(NativeAppEventEmitter.addListener('DownloadBegin-' + jobId, options.begin));
    }

    if (options.progress) {
      subscriptions.push(NativeAppEventEmitter.addListener('DownloadProgress-' + jobId, options.progress));
    }

    var bridgeOptions = {
      jobId: jobId,
      fromUrl: options.fromUrl,
      toFile: normalizeFilePath(options.toFile),
      headers: options.headers || {},
      background: !!options.background,
      progressDivider: options.progressDivider || 0
    };

    return {
      jobId: jobId,
      promise: RNFSManager.downloadFile(bridgeOptions).then(function (res) {
        subscriptions.forEach(function (sub) {
          return sub.remove();
        });
        return res;
      })
    };
  },
  uploadFiles: function uploadFiles(options) {
    if (!RNFSManager.uploadFiles) {
      return {
        jobId: -1,
        promise: Promise.reject(new Error('`uploadFiles` is unsupported on this platform'))
      };
    }

    var jobId = getJobId();
    var subscriptions = [];

    if (typeof options !== 'object') throw new Error('uploadFiles: Invalid value for argument `options`');
    if (typeof options.toUrl !== 'string') throw new Error('uploadFiles: Invalid value for property `toUrl`');
    if (!Array.isArray(options.files)) throw new Error('uploadFiles: Invalid value for property `files`');
    if (options.headers && typeof options.headers !== 'object') throw new Error('uploadFiles: Invalid value for property `headers`');
    if (options.fields && typeof options.fields !== 'object') throw new Error('uploadFiles: Invalid value for property `fields`');
    if (options.method && typeof options.method !== 'string') throw new Error('uploadFiles: Invalid value for property `method`');

    if (options.begin) {
      subscriptions.push(NativeAppEventEmitter.addListener('UploadBegin-' + jobId, options.begin));
    }
    if (options.beginCallback && options.beginCallback instanceof Function) {
      subscriptions.push(NativeAppEventEmitter.addListener('UploadBegin-' + jobId, options.beginCallback));
    }

    if (options.progress) {
      subscriptions.push(NativeAppEventEmitter.addListener('UploadProgress-' + jobId, options.progress));
    }
    if (options.progressCallback && options.progressCallback instanceof Function) {
      subscriptions.push(NativeAppEventEmitter.addListener('UploadProgress-' + jobId, options.progressCallback));
    }

    var bridgeOptions = {
      jobId: jobId,
      toUrl: options.toUrl,
      files: options.files,
      headers: options.headers || {},
      fields: options.fields || {},
      method: options.method || 'POST'
    };

    return {
      jobId: jobId,
      promise: RNFSManager.uploadFiles(bridgeOptions).then(function (res) {
        subscriptions.forEach(function (sub) {
          return sub.remove();
        });
        return res;
      })
    };
  },


  MainBundlePath: RNFSManager.RNFSMainBundlePath,
  CachesDirectoryPath: RNFSManager.RNFSCachesDirectoryPath,
  DocumentDirectoryPath: RNFSManager.RNFSDocumentDirectoryPath,
  ExternalDirectoryPath: RNFSManager.RNFSExternalDirectoryPath,
  ExternalStorageDirectoryPath: RNFSManager.RNFSExternalStorageDirectoryPath,
  TemporaryDirectoryPath: RNFSManager.RNFSTemporaryDirectoryPath,
  LibraryDirectoryPath: RNFSManager.RNFSLibraryDirectoryPath,
  PicturesDirectoryPath: RNFSManager.RNFSPicturesDirectoryPath

};

module.exports = RNFS;