"use strict";

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _path = require("path");

var path = _interopRequireWildcard(_path);

var _module = require("module");

var Module = _interopRequireWildcard(_module);

var _parser = require("./parser.js");

var parser = _interopRequireWildcard(_parser);

var _ScopeAst = require("./ScopeAst.js");

var _ScopeAst2 = _interopRequireDefault(_ScopeAst);

var _ScopeRules = require("./ScopeRules.js");

var _ScopeRules2 = _interopRequireDefault(_ScopeRules);

var _sourceMap = require("source-map");

var sourceMap = _interopRequireWildcard(_sourceMap);

var _combineSourceMap = require("combine-source-map");

var combine = _interopRequireWildcard(_combineSourceMap);

var _convertSourceMap = require("convert-source-map");

var convert = _interopRequireWildcard(_convertSourceMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ScopeParser {
	constructor() {
		this.parser = new parser.Parser();
		this.parser.yy.scopeAst = _ScopeAst2.default;
		this.rules = new _ScopeRules2.default();
	}

	libraryUtils() {
		return {
			runtime: require('./scopeRuntime.js'),
			api: require('./scopeRuntimeApi.js')
		};
	}

	parse(code) {
		return this.parser.parse(code);
	}

	traverse(obj) {
		const self = this;
		let result = "";
		if (obj === null) {
			return null;
		}
		if (typeof obj !== "object") {
			return obj;
		}
		if (obj.type === undefined) {
			return obj;
		}
		if (obj.loc !== undefined) {
			self.rules.state.loc = obj.loc;
		}

		if (obj.body instanceof Array) {
			let lastParent = self.rules.parentNode;
			obj.traversedBody = [];
			obj.body.forEach(i => {
				self.rules.parentNode = obj.type;
				obj.traversedBody.push(self.traverse(i));
			});
			self.rules.parentNode = lastParent;
		}
		if (self.rules[obj.type]) {
			if (obj.body instanceof Array) {
				return self.rules[obj.type](...obj.traversedBody);
			} else {
				return self.rules[obj.type](obj.body);
			}
		}
		console.log(`${obj.type} not implemented`);
		return "Not implemented";
	}

	import(srcFilename, libFilename, filename, lineOffset) {
		let self = this;
		filename = JSON.parse(filename);
		let mSrcFilename = path.resolve(path.dirname(srcFilename), filename);
		if (!fs.existsSync(mSrcFilename)) {
			let packagesDir = path.resolve(__dirname, "../packages");
			let packages = fs.readdirSync(packagesDir);
			if (packages.indexOf(filename) !== -1) {
				let scopePackageDir = path.join(packagesDir, filename);
				let spn = require(path.join(scopePackageDir, "spn.json"));
				let main = path.join(scopePackageDir, spn.main);
				mSrcFilename = path.resolve(path.dirname(srcFilename), main);
			} else {
				throw new Error(`File "${filename}" doesn't exist ${self.rules.state.errorTail()}`);
			}
		}
		if (/\.sc$/.test(mSrcFilename)) {
			let mLibFilename = path.resolve(path.dirname(libFilename), filename.replace(/\.sc$/, ".js"));
			let mCode = fs.readFileSync(mSrcFilename, 'utf8');
			let mResult = new ScopeParser().translate(mCode, mSrcFilename, mLibFilename);
			let mLibDirname = path.dirname(mLibFilename);
			if (!fs.existsSync(mLibDirname)) {
				fs.mkdirSync(mLibDirname);
			}
			fs.writeFileSync(mLibFilename, mResult.code);
			let file = {
				source: mResult.code,
				sourceFile: mLibFilename
			};
			self.imported.push({
				file: file,
				offset: {
					line: lineOffset
				}
			});
			return `scope.import(${JSON.stringify(mLibFilename)})`;
		} else {
			return `scope.import(${JSON.stringify(mSrcFilename)})`;
		}
	}

	translate(code, srcFilename = "NO SOURCE FILE", libFilename = "NO LIB FILE", asInclude = false) {
		let self = this;
		let ast = this.parse(code);
		let astJSON = JSON.stringify(ast, null, '  ');
		let scopeRuntime = "";
		if (typeof window === "undefined") {
			scopeRuntime += `#!/usr/bin/env node
\	\	\	\	"use strict";
\	\	\	\	global.__scopedir = __dirname;
\	\	\	\	require('source-map-support').install();
\	\	\	\	const scope = require("${path.join(__dirname, "scopeRuntime.js")}");
\	\	\	\	const ScopeApi = require("${path.join(__dirname, "scopeRuntimeApi.js")}")(scope);`;
		} else {
			scopeRuntime += `"use strict";\n`;
		}
		scopeRuntime += ``;
		//let scopeRuntimeErrorHandler = fs.readFileSync(path.join(__dirname, "scopeRuntimeErrorHandler.js"), "utf8");
		let result;
		let traversal;
		let locsMapped = [];
		self.sn = (chunk, name = "<anonymouse>") => {
			let loc = self.rules.state.loc.start;
			let alreadyMapped = false;
			locsMapped.forEach(val => {
				if (val.line === loc.line && val.column === loc.column) {
					alreadyMapped = true;
				}
			});
			locsMapped.push({
				line: loc.line,
				column: loc.column
			});
			return new sourceMap.SourceNode(loc.line, loc.column, srcFilename, chunk, name);
		};
		let node = self.sn("");
		let sm;
		self.imported = [];
		self.rules = new _ScopeRules2.default();
		self.rules.parser = self;
		self.rules.srcFilename = srcFilename;
		self.rules.libFilename = libFilename;
		self.rules.node = node;
		self.rules.sn = self.sn;
		//scopeRuntime = babelCore.transform(scopeRuntime, {presets: ['minify-es2015']});
		//console.log(scopeRuntime);
		if (asInclude) {
			return self.sn([self.rules.invokeExpression(self.rules.scopeExpression(self.traverse(ast)), [])]);
		} else {
			traversal = self.sn([scopeRuntime,
			//scopeRuntimeErrorHandler,
			"module.exports=", self.rules.invokeExpression(self.rules.scopeExpression(self.traverse(ast)), []), ";"]);
		}
		sm = traversal.toStringWithSourceMap();
		sm.map = JSON.parse(sm.map.toString());
		sm.map.sourcesContent = [code];
		sm.comment = convert.fromObject(sm.map).toComment();
		let mainFile = {
			source: sm.code + `\n${sm.comment}`,
			sourceFile: libFilename
		};
		let combination = combine.create(libFilename.replace(/\.js$/, ".min.js")).addFile(mainFile, { line: 1 });

		self.imported.forEach(o => {
			combination.addFile(o.file, o.offset);
		});
		let base64 = combination.base64();
		let newSm = convert.fromBase64(base64).toObject();
		result = {
			ast: astJSON,
			map: newSm,
			code: sm.code + `\n${sm.comment}`
		};
		return result;
	}
}

module.exports = ScopeParser;