import * as fs from "fs";
import * as jison from "jison";
import * as path from "path";
import ScopeAst from "./ScopeAst.js";
import ScopeRules from "./ScopeRules.js";
import grammar from "./scope1.json";
//var grammar = fs.readFileSync(path.join(__dirname, "../scope.jison"), "utf8");

var parser = new jison.Parser(grammar);

class ScopeParser {
	constructor () {
		this.parser = new jison.Parser(grammar);
		this.parser.yy.scopeAst = ScopeAst;
		this.rules = new ScopeRules();
	}

	parse (code) {
		return this.parser.parse(code);
	}

	traverse (obj) {
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
		if (obj.body instanceof Array) {
			obj.traversedBody = [];
			obj.body.forEach((i) => {
				obj.traversedBody.push(self.traverse(i));
			});
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

	translate (code) {
		let self = this;
		let ast = this.parse(code);
		let scopeRuntime = fs.readFileSync(path.join(__dirname, "scopeRuntime.js"), "utf8");
		return {
			ast: ast,
			js: ast === true ? "" : (scopeRuntime + self.traverse(ast))
		}
	}
}

module.exports = ScopeParser;