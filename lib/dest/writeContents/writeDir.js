'use strict';

function writeDir(fs, writePath, file, cb) {
  fs.mkdir(writePath, cb);
}

module.exports = writeDir;
