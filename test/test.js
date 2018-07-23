const ScopeParser = require("../lib/ScopeParser.js");
const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').js_beautify;
const assert = require('assert');

let scope = new ScopeParser();
let srcDir = path.join(__dirname, "scopeSrc");
let libDir = path.join(__dirname, "scopeLib"); 
let expectDir = path.join(__dirname, "scopeExpect");
let srcFiles = fs.readdirSync(srcDir);

const tests = [];

srcFiles.forEach((f) => {
	let srcFilename = path.join(srcDir, f);
	let libFilename = path.join(libDir, f.replace(".sc", ".js"));
	let expectFilename = path.join(expectDir, f.replace(".sc", ".js"));
	let mapFilename = path.join(libDir, f.replace(".sc", ".map.js"));
	let srcCode = fs.readFileSync(srcFilename, "utf8");
	let translation = scope.translate(srcCode, srcFilename, mapFilename);
	
	if (!fs.existsSync(libDir)) {
		fs.mkdirSync(libDir);
	}
	fs.writeFileSync(mapFilename, translation.map);
	fs.writeFileSync(libFilename, translation.code);
	tests.push({
		program: require(libFilename),
		expectation: require(expectFilename)
	});
});

tests.forEach((obj) => {
	obj.expectation(assert, obj.program);
});