require("source-map-support").install();
import * as fs from "fs";
import * as path from "path";
import * as Module from "module";
import * as parser from "./parser.js";
import ScopeAst from "./ScopeAst.js";
import ScopeRules from "./ScopeRules.js";
import BacktickProcessor from "./BacktickProcessor.js";
import * as sourceMap from "source-map";
import * as combine from "combine-source-map";
import * as convert from "convert-source-map";

class ScopeParser {
	constructor () {
		const self = this;
		self.parser = new parser.Parser();
		self.rules = new ScopeRules();
		//console.log(self.parser.lexer.lex.toString());
		//console.log(self.parser.lexer.next.toString());
		/*
		let jisonLexer = self.parser.lexer.lex;
		self.parser.yy.scopeState = {
			inBacktick: false,
			inBacktickExpr: false
		};
		let once = false;
		
		self.parser.lexer.lex = function () {
			if (!once) {
				once = !once;
				//console.log(this);
				//console.log(this.rules);
			}
			//console.log("intercepted lex");
			//console.log("in backtick:", this.yy.scopeState.inBacktick);
			//console.log("yytext:", JSON.stringify(this.yytext));
			//console.log("input:", this.input());
			if (this.yytext === "`") {
				//console.log("switched backtick state");
				this.yy.scopeState.inBacktick = !this.yy.scopeState.inBacktick
			
			} else if (this.yy.scopeState.inBacktick) {
				//console.log ("attempting skip");
				//let next = this.next();
				let inputMatch, testMatch;
				let finalMatch = "";
				let btExprRegex = /^(?:(\s*)\$\{([^\}]*)\}(.*))/gus;
				let btBodyRegex = /^((?:\\`|[^`](?!\{))*)(.*)/gus;

				this._input = this.yytext + this._input;
				//console.log("btExprRegex:", btExprRegex);
				//console.log("btBodyRegex:", btBodyRegex);
				//console.log("match:", this.match);
				//console.log("matched:", this.matched);
				do {
					const btBody = 57;
					const btExprStart = 56;
					//const btExprEnd = ???
					//console.log("bt-input:", this._input);
					if (inputMatch = this._input.match(btExprRegex)) {
						let btExprMatch = btExprRegex.exec(this._input);
						let [
							btExprOriginal,
							btExprSpaces,
							btExprSrc,
							btExprLeftovers
						] = btExprMatch;
						//console.log("btExprMatch:", btExprMatch);
						//console.log("btExprOriginal:", btExprOriginal);
						//console.log("btExprSrc:", btExprSrc);
						//console.log("btExprLeftovers:", btExprLeftovers);
						this.yy.scopeState.inBacktick = false;
						this.yy.scopeState.inBacktickExpr = true;
						let newExprSrc = self.traverse(self.parse(btExprSrc + ";")).translation.replace(/;$/, "");
						//console.log("parse result:");
						//console.log(newExprSrc);
						this.yy.scopeState.inBacktick = true;
						this._input = this._input.replace(btExprRegex, () => {
							let prevChar = this.match.substr(this.match.length -1);
							this.match = btExprSpaces + '${' + newExprSrc + "}";
							return prevChar + btExprLeftovers;
						});
						finalMatch += this.match;
						//console.log("a: this.match after replacement:", this.match);
						//console.log("a: this._input after replacement:", this._input);
						//process.exit();
						continue;
					} else if (inputMatch = this._input.match(btBodyRegex)) {
						if (this._input[0] === "`") {
							break;
							//this.input();
							//this.yytext = "`";
							//return this.lex();
						}
						let match = btBodyRegex.exec(this._input);
						this._input = this._input.replace(btBodyRegex, (original, match, leftovers) => {
							let prevChar = this.match.substr(this.match.length - 1);
							this.match = match;
							finalMatch += match;
							return prevChar + leftovers;
						});
						//console.log("b: this.match after replacement:", this.match);
						//console.log("b: this._input after replacement:", this._input);
						//process.exit();
						continue;
					} else {
						testMatch = this.next();
						break;
					}
				} while((testMatch !== false) && this.input());
				//console.log("match:", this.match);
				//console.log("matched:", this.matched);
				//console.log("lastMatch:", "`" + finalMatch + "`");
				this.yy.scopeState.btString = "`" + finalMatch + "`";
				return testMatch?testMatch:jisonLexer.call(this);
			}
			let result = jisonLexer.call(this);
			//console.log("result:");
			//console.log(result);
			return result;
		};
		*/
		self.parser.yy.scopeAst = ScopeAst;
	}

	libraryUtils () {
		return {
			runtime: require('./scopeRuntime.js'),
			api: require('./scopeRuntimeApi.js')
		};
	}

	parse (code) {
		const self = this;
		let jisonLexer = self.parser.lexer.lex;
		self.parser.yy.scopeState = {};
		let btProcessor = new BacktickProcessor(self);

		self.parser.lexer.lex = function () {
			let code;

			code = btProcessor.lex(this);
			if (code !== false) {
				return code;
			}
			return jisonLexer.call(this);
		}

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
			let name = self.rules.state.loc.name;
			self.rules.state.loc = obj.loc;
			self.rules.state.loc.name = name;
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
			self.rules.state.setName(obj.type);
			if (obj.body instanceof Array) {
				return self.rules[obj.type](...obj.traversedBody);
			} else {
				self.rules.state.loc.sourceCode = obj.body;
				return self.rules[obj.type](obj.body);
			}
		}
		console.log(`${obj.type} not implemented`);
		return "Not implemented";
	}

	import (srcFilename, libFilename, filename, lineOffset) {
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

	translate (code, srcFilename="NO SOURCE FILE", libFilename="NO LIB FILE", asInclude=false) {
		let self = this;
		let scopeRuntime = "";
		if (typeof window === "undefined") {
			scopeRuntime += '#!/usr/bin/env node\n' +
				'"use strict";' +
				'global.__scopedir=__dirname;' +
				'require("source-map-support").install();' +
				'const scope=require("' + path.join(__dirname, "scopeRuntime.js") + '");' +
				'const ScopeApi=require("' + path.join(__dirname, "scopeRuntimeApi.js") + '")(scope);';
		} else {
			scopeRuntime += '"use strict";';
		}
		//let scopeRuntimeErrorHandler = fs.readFileSync(path.join(__dirname, "scopeRuntimeErrorHandler.js"), "utf8");
		let result;
		let traversal;
		//let sourceNodes = [];
		//let locsMapped = [];
		self.mapAndParse = (data = {source:"", translation:"", sn: ""}) => {
			//console.log(data.source);
			//let loc = self.rules.state.loc.start;
			//console.log(self.rules.state.getName());
			if (typeof data.sn !== "string") {
				data.sn.setSourceContent(srcFilename, data.source);
			}
			//sourceNodes.push(sn);
			//console.log(data.source, loc);
			return data;
		};
		self.sn = (chunk, name=self.rules.state.getName()) => {
			let loc = self.rules.state.loc.start;
			//console.log("chunk:", chunk);
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
		self.rules.mapAndParse = self.mapAndParse;
		let ast = this.parse(code);
		let astJSON = JSON.stringify(ast, null, '  ');
		let parseResult = self.traverse(ast);
		//scopeRuntime = babelCore.transform(scopeRuntime, {presets: ['minify-es2015']});
		//console.log(scopeRuntime);
		if (asInclude) {
			return self.rules.invokeExpression(
					self.rules.scopeExpression(
						parseResult
					),
					self.rules.invokeArguments()
				).sn
		} else {
			traversal = self.rules.invokeExpression(
				self.rules.scopeExpression(
					self.rules.scopeStart(),
					parseResult
				),
				self.rules.invokeArguments()
			).sn;

			traversal.prepend([
				scopeRuntime,
				//scopeRuntimeErrorHandler,
				"module.exports="
			]);
			traversal.add([";"]);
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