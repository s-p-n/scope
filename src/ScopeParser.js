import * as fs from "fs";
import * as path from "path";
import * as parser from "./parser.js";
import ScopeAst from "./ScopeAst.js";
import ScopeRules from "./ScopeRules.js";
import * as sourceMap from "source-map";
import * as babelCore from "babel-core";

class ScopeParser {
	constructor () {
		this.parser = new parser.Parser();
		this.parser.yy.scopeAst = ScopeAst;
		this.rules = new ScopeRules();
	}

	parse (code) {
		return this.parser.parse(code);
	}

	traverse (obj) {
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
			obj.body.forEach((i) => {
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

	translate (code, srcFilename="NO SOURCE FILE", mapFilename="NO MAP FILE") {
		let self = this;
		let ast = this.parse(code);
		let astJSON = JSON.stringify(ast, null, '  ');
		let scopeRuntime = fs.readFileSync(path.join(__dirname, "scopeRuntime.js"), "utf8");
		let scopeRuntimeErrorHandler = fs.readFileSync(path.join(__dirname, "scopeRuntimeErrorHandler.js"), "utf8");
		let result;
		let traversal;
		let locsMapped = [];
		self.sn = (chunk) => {
			let loc = self.rules.state.loc.start;
			let alreadyMapped = false;
			locsMapped.forEach((val) => {
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
				return new sourceMap.SourceNode(
					loc.line, 
					loc.column, 
					srcFilename, 
					chunk
				);
			//}
			//return new sourceMap.SourceNode();
		};
		let node = self.sn("");
		let map;
		self.rules = new ScopeRules();
		self.rules.node = node;
		self.rules.sn = self.sn;
		//scopeRuntime = babelCore.transform(scopeRuntime, {presets: ['minify-es2015']});
		//console.log(scopeRuntime);
		traversal = self.sn([
			scopeRuntime,
			`scope.sourceMapFilename="${mapFilename}";`,
			//scopeRuntimeErrorHandler,
			"module.exports=", 
			self.rules.invokeExpression(
				self.rules.scopeExpression(
					self.traverse(ast)
				),
				[]
			),
			";",
			`\n//# sourceMappingURL=${mapFilename}`
		]);
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
		return result;
	}
}

module.exports = ScopeParser;