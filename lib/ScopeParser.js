"use strict";

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _jison = require("jison");

var jison = _interopRequireWildcard(_jison);

var _path = require("path");

var path = _interopRequireWildcard(_path);

var _ScopeAst = require("./ScopeAst.js");

var _ScopeAst2 = _interopRequireDefault(_ScopeAst);

var _ScopeRules = require("./ScopeRules.js");

var _ScopeRules2 = _interopRequireDefault(_ScopeRules);

var _scope = require("./scope1.json");

var _scope2 = _interopRequireDefault(_scope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//var grammar = fs.readFileSync(path.join(__dirname, "../scope.jison"), "utf8");

var parser = new jison.Parser(_scope2.default);

class ScopeParser {
	constructor() {
		this.parser = new jison.Parser(_scope2.default);
		this.parser.yy.scopeAst = _ScopeAst2.default;
		this.rules = new _ScopeRules2.default();
	}

	parse(code) {
		return this.parser.parse(code);
	}

	traverse(obj) {
		const self = this;
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

	translate(code) {
		let self = this;
		let ast = this.parse(code);
		let scopeRuntime = fs.readFileSync(path.join(__dirname, "scopeRuntime.js"), "utf8");
		self.rules = new _ScopeRules2.default();
		return {
			ast: ast,
			js: ast === true ? "" : scopeRuntime + "exports.default = " + self.rules.invokeExpression(self.rules.scopeExpression(self.traverse(ast)), []) + ";"
		};
	}
}

module.exports = ScopeParser;