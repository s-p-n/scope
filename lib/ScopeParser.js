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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ScopeParser {
	constructor() {
		this.parser = new parser.Parser();
		this.parser.yy.scopeAst = _ScopeAst2.default;
		this.rules = new _ScopeRules2.default();
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

	translate(code, srcFilename = "NO SOURCE FILE", mapFilename = "NO MAP FILE", asInclude = false) {
		let self = this;
		let ast = this.parse(code);
		let astJSON = JSON.stringify(ast, null, '  ');
		let scopeRuntime = fs.readFileSync(path.join(__dirname, "scopeRuntime.js"), "utf8");
		let scopeRuntimeErrorHandler = fs.readFileSync(path.join(__dirname, "scopeRuntimeErrorHandler.js"), "utf8");
		let result;
		let traversal;
		let locsMapped = [];
		self.sn = chunk => {
			let loc = self.rules.state.loc.start;
			let alreadyMapped = false;
			locsMapped.forEach(val => {
				if (val.line === loc.line && val.column === loc.column) {
					alreadyMapped = true;
				}
			});
			//if (!alreadyMapped) {
			//console.log(loc, chunk);
			locsMapped.push({
				line: loc.line,
				column: loc.column
			});
			return new sourceMap.SourceNode(loc.line, loc.column, srcFilename, chunk);
			//}
			//return new sourceMap.SourceNode();
		};
		let node = self.sn("");
		let map;
		self.rules = new _ScopeRules2.default();
		self.rules.srcFilename = srcFilename;
		self.rules.node = node;
		self.rules.sn = self.sn;
		//scopeRuntime = babelCore.transform(scopeRuntime, {presets: ['minify-es2015']});
		//console.log(scopeRuntime);
		if (asInclude) {
			traversal = self.sn([self.rules.invokeExpression(self.rules.scopeExpression(self.traverse(ast)), [])]);
		} else {
			traversal = self.sn([scopeRuntime, `scope.sourceMapFilename="${mapFilename}";`,
			//scopeRuntimeErrorHandler,
			"module.exports=", self.rules.invokeExpression(self.rules.scopeExpression(self.traverse(ast)), []), ";", `\n//# sourceMappingURL=${mapFilename}`]);
		}
		traversal.setSourceContent({
			sourceFile: srcFilename,
			sourceContent: code
		});
		//console.log(traversal);
		map = traversal.toStringWithSourceMap({
			file: mapFilename
		});
		//console.log(map);
		result = {
			ast: astJSON,
			map: map.map,
			code: map.code
		};
		if (self.rules.state.importExpressions.size > 0) {
			let importExpressions = self.rules.state.importExpressions;
			for (let [id, str] of importExpressions) {
				let mSrcFilename = path.resolve(path.dirname(srcFilename), JSON.parse(str));
				let mCode = fs.readFileSync(mSrcFilename, 'utf8');
				let mResult = self.translate(mCode, mSrcFilename, mSrcFilename.replace(/\.sc$/, '') + ".js.map", true);

				result.code = result.code.replace(id, mResult.code);
			}
		}
		return result;
	}
}

module.exports = ScopeParser;