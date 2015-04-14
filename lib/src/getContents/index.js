'use strict';

var through2 = require('through2');
var readDir = require('./readDir');
var bufferFile = require('./bufferFile');
var streamFile = require('./streamFile');

function getContents(fs, opt) {
  return through2.obj(function(file, enc, cb) {
    // don't fail to read a directory
    if (file.isDirectory()) {
      return readDir(fs, file, cb);
    }

    // read and pass full contents
    if (opt.buffer !== false) {
      return bufferFile(fs, file, cb);
    }

    // dont buffer anything - just pass streams
    return streamFile(fs, file, cb);
  });
}

module.exports = getContents;
