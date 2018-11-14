
// Gather preload functions.
// They take the parser as the sole argument.
// They might add state functions or something
// for different language structures.
// When all is said and done, `preloads`
// looks like:
//     Map { ...'preloadFile' => [Function: preloadFile] }
let fs = require("fs");
let path = require("path");
const preloads = (function () {
	let preloadsDir = path.join(__dirname, "preloads");
	let preloadFileArray = fs.readdirSync(preloadsDir);
	let preloads = new Map();
	let jsExtension = /\.js$/i;
	for (let i = 0; i < preloadFileArray.length; i += 1) {
		preloads.set(
			preloadFileArray[i].replace(jsExtension, ""), 
			require(path.join(preloadsDir, preloadFileArray[i]))
		);
	}
	return preloads;
}());

let macros = {
	cwd: process.cwd(),
	include ({file}) {
		let p;
		if (file[0] !== "/") {
			p = path.join(this.cwd, file);
		} else {
			p = file;
		}
		let oldCwd = this.cwd;
		this.cwd = path.dirname(p);
		let contents = fs.readFileSync(p, "utf8");
		contents = parseMacros(contents);
		this.cwd = oldCwd;
		return `(function () {
${contents}
}())`;
	}
}

function parseMacros(code) {
	const tagSearch = /\<([a-z]+)\s*((?:[a-z]+\s*\=\s*\"(?:\\.|[^"])*\"\s*)*)\/\>/igm;
	const attrSearch = /([a-z]+)\s*\=\s*(\"(?:\\.|[^"])*\")/igm;
	function getAttributesObj (attributes) {
		let obj = Object.create(null);
		attributes.replace(attrSearch, function (fullMatch, name, value) {
			obj[name] = JSON.parse(value);
			return "";
		});
		return obj;
	}
	let match;
	while ((match = tagSearch.exec(code)) !== null) {
		code = code.replace(tagSearch, function (fullMatch, name, attributes) {
			if (attributes === "") {
				return macros[name]();
			}
			return macros[name](getAttributesObj(attributes));
		});
	}
	return code;
}

function requireFromString(src, filename) {
	let parent = module.parent;
	const Module = module.constructor;
	const m = new Module(filename, parent);
	m.filename = filename;
	m.paths = Module._nodeModulePaths(path.dirname(filename));
	m._compile(src, filename);
	return m.exports;
}

module.exports = function setState (parser, runtime={}) {

	// Run all preloads (from the preloads directory).
	for (let [,prep] of preloads) prep(parser);

	parser.eval = function () {
		let code = `[${Object.keys(runtime).join(',')}]=[${Object.values(runtime).join(',')}];`;
		code += parser.yy.expressions.join(";");
		code = parseMacros(code);
		return requireFromString(code, "shell");
	}

	parser.yy.parseError = function parseError (str="", hash={
		text: "",
		line: 0,
		token: "",
		loc: [],
		expected: [],
		recoverable: false
	}) {
		let solution = "unknown";
		if (hash.solution) {
			solution = hash.solution;
		}
		console.log(`
${str}
Line: ${hash.line + 1}
Text: ${hash.text}
Token: ${hash.token}`);
		if (solution !== "unknown") {
			console.log(`Suggested Fix: ${solution}`);
		}

		if (hash.recoverable) {
			console.log("Error is recoverable.");
		} else {
			process.exit();
		}
	}

	parser.yy.expressions = [];
	parser.yy.expressions.parent = null;
}