#!/usr/bin/env node

var options = {};
var args = require(__dirname + '/compiler/args.js')(options);
var extData = {loaded: '', deps: []};
var extensions = require(__dirname + '/compiler/extensions')(extData);
var out = require(__dirname + '/compiler/out');
var generateJS = require(__dirname + '/compiler/generateJS');

if (options['flags'].indexOf('v') !== options['flags'].indexOf('version')) {
    console.log(require(__dirname + '/package.json').version);
    return;
}

out(args, generateJS(args,
    options,
    extensions,
    extData
), extData.deps);
