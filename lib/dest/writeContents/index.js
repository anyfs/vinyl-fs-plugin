'use strict';

var writeDir = require('./writeDir');
var writeStream = require('./writeStream');
var writeBuffer = require('./writeBuffer');

function writeContents(fs, writePath, file, cb) {
  // if directory then mkdirp it
  if (file.isDirectory()) {
    return writeDir(fs, writePath, file, written);
  }

  // stream it to disk yo
  if (file.isStream()) {
    return writeStream(fs, writePath, file, written);
  }

  // write it like normal
  if (file.isBuffer()) {
    return writeBuffer(fs, writePath, file, written);
  }

  // if no contents then do nothing
  if (file.isNull()) {
    return complete();
  }

  function complete(err) {
    cb(err, file);
  }

  function written(err) {

    if (isErrorFatal(err)) {
      return complete(err);
    }

    return complete();
  }

  function isErrorFatal(err) {
    if (!err) {
      return false;
    }

    // Handle scenario for file overwrite failures.
    else if (err.code === 'EEXIST' && file.flag === 'wx') {
      return false;   // "These aren't the droids you're looking for"
    }

    // Otherwise, this is a fatal error
    return true;
  }
}

module.exports = writeContents;
