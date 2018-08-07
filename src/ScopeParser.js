import * as fs from "fs";
import * as path from "path";
import * as Module from "module";
import * as parser from "./parser.js";
import ScopeAst from "./ScopeAst.js";
import ScopeRules from "./ScopeRules.js";
import * as sourceMap from "source-map";
import * as combine from "combine-source-map";
import * as convert from "convert-source-map";
import * as shell from "shelljs";

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

	import (srcFilename, libFilename, filename, lineOffset) {
		let self = this;
		let mSrcFilename = path.resolve(path.dirname(srcFilename), JSON.parse(filename));
		if (!fs.existsSync(mSrcFilename)) {
			throw new Error(`File ${filename} doesn't exist ${self.rules.state.errorTail()}`);
		}
		if (/\.sc$/.test(mSrcFilename)) {
			let mLibFilename = path.resolve(path.dirname(libFilename), JSON.parse(filename).replace(/\.sc$/, ".js"));
			let mCode = fs.readFileSync(mSrcFilename, 'utf8');
			let mResult = new ScopeParser().translate(mCode, mSrcFilename, libFilename);
			let mLibDirname = path.dirname(mLibFilename);
			shell.mkdir('-p', mLibDirname);
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

	translate (code, srcFilename="NO SOURCE FILE", libFilename="NO LIB FILE", asInclude=false) {
		let self = this;
		let ast = this.parse(code);
		let astJSON = JSON.stringify(ast, null, '  ');
		let scopeRuntime = `#!/usr/bin/env node
\	\	\	"use strict";
\	\	\	require('source-map-support').install();
\	\	\	const scope = require("${path.join(__dirname, "scopeRuntime.js")}");
\	\	\	const ScopeApi = require("${path.join(__dirname, "scopeRuntimeApi.js")}")(scope);`;
		let scopeRuntimeErrorHandler = fs.readFileSync(path.join(__dirname, "scopeRuntimeErrorHandler.js"), "utf8");
		let result;
		let traversal;
		let locsMapped = [];
		self.sn = (chunk, name="<anonymouse>") => {
			let loc = self.rules.state.loc.start;
			let alreadyMapped = false;
			locsMapped.forEach((val) => {
				if (val.line === loc.line && val.column === loc.column) {
					alreadyMapped = true;
				}
			});
				locsMapped.push({
					line: loc.line,
					column: loc.column
				});
				return new sourceMap.SourceNode(
					loc.line, 
					loc.column, 
					srcFilename, 
					chunk,
					name
				);
		};
		let node = self.sn("");
		let sm;
		self.imported = [];
		self.rules = new ScopeRules();
		self.rules.parser = self;
		self.rules.srcFilename = srcFilename;
		self.rules.libFilename = libFilename;
		self.rules.node = node;
		self.rules.sn = self.sn;
		//scopeRuntime = babelCore.transform(scopeRuntime, {presets: ['minify-es2015']});
		//console.log(scopeRuntime);
		if (asInclude) {
			return self.sn([
				self.rules.invokeExpression(
					self.rules.scopeExpression(
						self.traverse(ast)
					),
					[]
				)
			]);
		} else {
			traversal = self.sn([
				scopeRuntime,
				//scopeRuntimeErrorHandler,
				"module.exports=", 
				self.rules.invokeExpression(
					self.rules.scopeExpression(
						self.traverse(ast)
					),
					[]
				),
				";"
			]);
		}
		sm = traversal.toStringWithSourceMap();
		sm.map = JSON.parse(sm.map.toString());
		sm.map.sourcesContent = [code];
		sm.comment = convert.fromObject(sm.map).toComment();
		let mainFile = {
			source: sm.code + `\n${sm.comment}`,
			sourceFile: libFilename
		};
		let combination = combine.
			create(libFilename.replace(/\.js$/, ".min.js")).
			addFile(mainFile, {line: 1});
		
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