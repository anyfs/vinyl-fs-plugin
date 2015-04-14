'use strict';

var assign = require('object-assign');
var path = require('path');
var nodeFS = require('fs');

function prepareWrite(fs, outFolder, file, opt, cb) {
  var options = assign({
    cwd: '',
  }, opt);

  var cwd = fs.resolve(options.cwd);

  if (typeof outFolder !== 'string' && typeof outFolder !== 'function') {
    throw new Error('Invalid output folder');
  }

  var outFolderPath = (
    typeof outFolder === 'string' ? outFolder : outFolder(file)
  );
  var basePath = fs.resolve(cwd, outFolderPath);
  var writePath = fs.resolve(basePath, file.relative);
  var writeFolder = path.dirname(writePath);

  // wire up new properties
  file.stat = (file.stat || new nodeFS.Stats());
  file.stat.mode = options.mode;
  file.flag = options.flag;
  file.cwd = cwd;
  file.base = basePath;
  file.path = writePath;

  fs.mkdir(writeFolder, function(err) {
    if (err) {
      return cb(err);
    }
    cb(null, writePath);
  });
}

module.exports = prepareWrite;
