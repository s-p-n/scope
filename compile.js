#!/usr/bin/env node

var options = {};
var args = require(__dirname + '/compiler/args.js')(
    options, /^[a-z]+\=.*$/
);
var extData = {loaded: '', deps: []};
var extensions = require(__dirname + '/compiler/extensions')(extData);
var out = require(__dirname + '/compiler/out');
var generateJS = require(__dirname + '/compiler/generateJS');

out(args, generateJS(args,
    options,
    extensions,
    extData
), extData.deps);
