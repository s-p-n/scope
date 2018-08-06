import * as fs from "fs";
import * as path from "path";
import * as Module from "module";
import * as parser from "./parser.js";
import ScopeAst from "./ScopeAst.js";
import ScopeRules from "./ScopeRules.js";
import * as sourceMap from "source-map";
import * as combineSourceMap from "combine-source-map";
import * as convertSourceMap from "convert-source-map";

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

	import (srcFilename, filename, lineOffset) {
		let self = this;
		let mSrcFilename = path.resolve(path.dirname(srcFilename), JSON.parse(filename));
		let mCode = fs.readFileSync(mSrcFilename, 'utf8');
		let mResult = new ScopeParser().translate(mCode, mSrcFilename, "NO MAP FILE", true);
		self.imported.push({srcFilename: filename, code: mCode, offset: lineOffset});
		return mResult;
	}

	translate (code, srcFilename="NO SOURCE FILE", mapFilename="NO MAP FILE", asInclude=false) {
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
		self.imported = [];
		self.rules = new ScopeRules();
		self.rules.parser = self;
		self.rules.srcFilename = srcFilename;
		self.rules.node = node;
		self.rules.sn = self.sn;
		//scopeRuntime = babelCore.transform(scopeRuntime, {presets: ['minify-es2015']});
		//console.log(scopeRuntime);
		if (asInclude) {
			traversal = self.sn([
				self.rules.invokeExpression(
					self.rules.scopeExpression(
						self.traverse(ast)
					),
					[]
				)
			]);
			//traversal.setSourceContent(srcFilename, code);
			return traversal;
		} else {
			traversal = self.sn([
				scopeRuntime,
				`scope.sourceMapFilename=${JSON.stringify(mapFilename)};`,
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
		}
		//traversal.setSourceContent(srcFilename, code);
		self.imported.forEach(o => {
			//traversal.setSourceContent(o.srcFilename, o.code);
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
		/*
		if (self.rules.state.importExpressions.size > 0) {
			let importExpressions = self.rules.state.importExpressions;
			for (let [id, str] of importExpressions) {
				let mSrcFilename = path.resolve(path.dirname(srcFilename), JSON.parse(str));
				let mCode = fs.readFileSync(mSrcFilename, 'utf8');
				let mResult = self.translate(mCode, mSrcFilename, mSrcFilename.replace(/\.sc$/, '') + ".js.map", true);
				result.code = result.code.replace(id, mResult.code);
			}
		}
		*/
		return result;
	}
}

module.exports = ScopeParser;