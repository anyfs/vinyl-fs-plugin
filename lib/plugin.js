module.exports = Plugin;

var src = require('./src');
var dest = require('./dest');
function Plugin() {}

Plugin.prototype.register = function(fs) {
    fs.src = function() {

    }

    fs.src = function(glob, options) {
        return src(fs, glob, options);
    };

    fs.dest = function(outFolder, options) {
        return dest(fs, outFolder, options);
    };
};

Plugin.prototype.test = function(fs) {
    require('./test')(fs);
};