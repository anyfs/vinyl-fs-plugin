'use strict';

var stripBom = require('strip-bom');

function streamFile(fs, file, cb) {
  file.contents = fs.createReadStream(file.path)
    .pipe(stripBom.stream());

  cb(null, file);
}

module.exports = streamFile;
