var AnyFS = require('anyfs');
var plugin = new (require('./'));

var fs = new AnyFS(new AnyFS.MemoryAdapter());
fs.addPlugin(plugin);

plugin.test(fs);