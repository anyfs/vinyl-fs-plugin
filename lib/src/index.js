'use strict';

var assign = require('object-assign');
var through = require('through2');
var gs = require('anyfs-glob-stream-plugin');
var File = require('vinyl');
var duplexify = require('duplexify');
var merge = require('merge-stream');

var filterSince = require('vinyl-filter-since');
var getContents = require('./getContents');

function createFile(globFile, enc, cb) {
  cb(null, new File(globFile));
}

function src(fs, glob, opt) {
  var options = assign({
    read: true,
    buffer: true
  }, opt);
  var pass, inputPass;

  if (!isValidGlob(glob)) {
    throw new Error('Invalid glob argument: ' + glob);
  }
  // return dead stream if empty array
  if (Array.isArray(glob) && glob.length === 0) {
    pass = through.obj();
    if (!options.passthrough) {
      process.nextTick(pass.end.bind(pass));
    }
    return pass;
  }

  var globStream = gs.create(fs, glob, options);

  var outputStream = globStream
    .pipe(through.obj(function(globFile, enc, cb) {
      fs.stat(globFile.path, function(err, stat) {
        if (err) {
          return cb(err);
        }

        globFile.stat = stat;
        cb(null, globFile);
      });
    }))
    .pipe(through.obj(createFile));

  if (options.since) {
    outputStream = outputStream
      .pipe(filterSince(options.since));
  }

  if (options.read !== false) {
    outputStream = outputStream
      .pipe(getContents(fs, options));
  }

  if (options.passthrough) {
    inputPass = through.obj();
    outputStream = duplexify.obj(inputPass, merge(outputStream, inputPass));
  }

  return outputStream;
}

function isValidGlob(glob) {
  if (typeof glob === 'string') {
    return true;
  }
  if (!Array.isArray(glob)) {
    return false;
  }
  if (glob.length !== 0) {
    return glob.every(isValidGlob);
  }
  return true;
}

module.exports = src;
