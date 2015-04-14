# vinyl-fs-plugin

[![npm](https://img.shields.io/npm/v/anyfs-vinyl-fs-plugin.svg?style=flat-square)](https://www.npmjs.com/package/anyfs-vinyl-fs-plugin)
[![npm](https://img.shields.io/npm/dm/anyfs-vinyl-fs-plugin.svg?style=flat-square)](https://www.npmjs.com/package/anyfs-vinyl-fs-plugin)
[![Travis](https://img.shields.io/travis/anyfs/vinyl-fs-plugin.svg?style=flat-square)](https://travis-ci.org/anyfs/vinyl-fs-plugin)
![npm](https://img.shields.io/npm/l/anyfs-vinyl-fs-plugin.svg?style=flat-square)

Vinyl-fs plugin for AnyFS.

## Usage

```js
var fs = new AnyFS(adapter);
var plugin = new (require('anyfs-vinyl-fs-plugin'));
fs.addPlugin(plugin);

fs.src('js/**/*.js')
  .pipe(fs.dest('backup'));
```

## Acknowledgement

This plugin is based on [wearefractal](https://github.com/wearefractal)'s [vinyl-fs](https://github.com/wearefractal/vinyl-fs) package.