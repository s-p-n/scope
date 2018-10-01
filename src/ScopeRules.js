import * as fs from "fs";
import * as path from "path";

let api = {
	print: "ScopeApi.print",
	debug: "ScopeApi.debug",
	if: "ScopeApi['if']",
	each: "ScopeApi['each']",
	compile: "ScopeApi.compile",
	promise: "ScopeApi.promise",
	dereference: "ScopeApi.dereference",
	BSONtoMap: "ScopeApi.BSONtoMap",
	toJS: "ScopeApi.toJS",
	toJSON: "ScopeApi.toJSON",
	createTag: "ScopeApi.createTag",
	getTag: "ScopeApi.getTag",
	getAllTags: "ScopeApi.getAllTags"
};

let allowedUndefinedIdExpressions = [
	"xmlExpression",
	"invokeId"
];

let buildArgPartFromAssocPart = (assoc, addTo = false) => {
	let result = "";
	if (addTo) {
		result = ",";
	}
	if (assoc.type === "id") {
		result += `["${assoc.name}",${assoc.expression}]`;
	} else if (assoc.type === "string") {
		result += `[${assoc.name},${assoc.expression}]`;
	}
	return result;
}

let randStr = (len=16) => {
	let result = "";
	let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (let i = 0; i < len; i += 1) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

class ScopeRules {
	constructor (state = {context: {}}) {
		const self = this;
		self.parentNode = "program";
		self.state = state;
		state.loc = {
			start: {
				line: 0,
				column: 0
			},
			end: {
				line: 0,
				column: 0
			},
			name: "root"
		}
		state.errorTail = () => `[${self.state.loc.start.line}:${self.state.loc.start.column}-${self.state.loc.end.line}:${self.state.loc.end.column}]`;
		//state.idBubble = ["this"];
		state.importExpressions = new Map();
		state.root = state.context;
	    state.context = state.context;
	    state.context.args = [];
	    state.context.name = "root";
	    state.newChildContext = () => {
	    	let parent = state.context;
	    	let newContext = {
	    		scoping: {
			      let: new Map(),
			      private: new Map(),
			      protected: new Map(),
			      public: new Map(),
			      parent: parent
			    },
			    definedLocally: state.context.definedLocally,
			    idAvailable: state.context.idAvailable
	    	};
	    	newContext.args = [];
	    	newContext.inArrayDefinition = false;
	    	newContext.name = state.loc.name;
	    	state.context = newContext;
	    };

	    state.setName = (name) => {
	    	state.loc.name = name;
	    };

	    state.getName = () => {
	    	let name = state.loc.name;
	    	let ctx = state.context;
	    	while (ctx && ctx.scoping) {
	    		name = `${ctx.name}->${name}`;
	    		ctx = ctx.scoping.parent;
	    	}
	    	return name;
	    };

	    state.setParentContext = () => {
	    	state.context = state.context.scoping.parent;
	    };

	    state.newImportExpression = (str) => {
	    	let self = this;
	    	let result = self.parser.import(self.srcFilename, self.libFilename, str, self.state.loc.start.line);
	    	return result;
	    };

	    state.context.definedLocally = (id = "", me = state.context) => {
	    	if (me.scoping.let.has(id)) {
	    		return me.scoping.let.get(id);
	    	}
	    	if (me.scoping.private.has(id)) {
	    		return me.scoping.private.get(id);
	    	}
	    	if (me.scoping.protected.has(id)) {
	    		return me.scoping.protected.get(id);
	    	}
	    	if (me.scoping.public.has(id)) {
	    		return me.scoping.public.get(id);
	    	}
	    	return false;
	    }

	    state.context.idAvailable = (id="", me = state.context) => {
	    	if (!me) {
	    		return false;
	    	}

	    	if (me.definedLocally !== undefined && me.definedLocally(id, me)) {
	    		return true;
	    	}

	    	if (me.scoping && me.scoping.parent && me.scoping.parent.scoping) {
	    		return me.idAvailable(id, me.scoping.parent);
	    	}

	    	return false;
	    }

	    state.newChildContext();
	}

	arrayExpression (start, expressionList="") {
		const self = this;
		self.state.setParentContext();
		return self.mapAndParse({
			source: start.source + expressionList.source + "]", 
			translation: start.translation + expressionList.translation + ")",
			sn: self.sn([start.sn, expressionList.sn, ")"])
		});
	}

	arrayStart () {
		const self = this;
		self.state.newChildContext();
		self.state.context.inArrayDefinition = true;
		return self.mapAndParse({
			source: "[", 
			translation: "scope.arrayExpression(",
			sn: self.sn(["scope.arrayExpression("])
		});
	}

	assignmentExpression (name, assignmentValue) {
		let self = this;
		return self.mapAndParse({
			source: name.source + "=" + assignmentValue.source,
			translation: `scope.assignmentExpression([${name.translation}],${assignmentValue.translation})`,
			sn: self.sn(["scope.assignmentExpression([", name.sn, "],", assignmentValue.sn, ")"])
		});
	}

	assignmentValue (op, expression) {
		let self = this;
		return self.mapAndParse({
			source: op + expression.source,
			translation: `["${op}",${expression.translation}]`,
			sn: self.sn(['["', op, '",', expression.sn, ']'])
		});
	}

	associativeDeclaration (name, type, expression) {
		const self = this;
		let translatedName = name;
		if (type === "id") {
			translatedName = `"${name}"`;
		}
		return self.mapAndParse({
			source: `${name}:${expression.source}`,
			translation: `[${translatedName},${expression.translation}]`,
			sn: self.sn(["[", translatedName, ",", expression.sn, "]"])
		});
	}

	associativeList (associativeList, associativeDeclaration) {
		const self = this;
		let result = null;
		let name = '';
		if (associativeDeclaration === undefined) {
			associativeDeclaration = associativeList;
			result = {
				source: associativeDeclaration.source,
				translation: associativeDeclaration.translation,
				sn: self.sn([associativeDeclaration.sn])
			};
		} else {
			result = {
				source: associativeList.source + "," + associativeDeclaration.source,
				translation: associativeList.translation + "," + associativeDeclaration.translation,
				sn: self.sn([associativeList.sn, ",", associativeDeclaration.sn])
			}
		}
		return self.mapAndParse(result);
	}

	binaryExpression (a, op, b) {
		let self = this;
		let srcOp = "";
		switch (op) {
			case "&&":
				srcOp = ' and ';
				break;
			case "||":
				srcOp = ' or ';
				break;
			case "===":
				srcOp = ' is ';
				break;
			case "!==":
				srcOp = ' isnt ';
				break;
			case ">":
				srcOp = ' gt ';
				break;
			case "<":
				srcOp = ' lt ';
				break;
			case ">=":
				srcOp = ' gteq ';
				break;
			case "<=":
				srcOp = ' lteq ';
				break;
			default:
				srcOp = op;
				break;
		}
		return self.mapAndParse({
			source: `${a.source}${srcOp}${b.source}`,
			translation: `scope.binaryExpression("${op}",${a.translation},${b.translation})`,
			sn: self.sn(['scope.binaryExpression("', op, '",', a.sn, ',', b.sn, ')'])
		});
	}

	booleanLiteral (bool) {
		let self = this;
		return self.mapAndParse({
			source: `${bool}`,
			translation: `${bool}`,
			sn: self.sn([`${bool}`])
		});
	}
/*
	backtickBodyExpression (expression) {
		const self = this;
		return self.mapAndParse({
			source: expression.source,
			translation: expression.translation,
			sn: self.sn([expression.sn])
		});
	}

	backtickBodyString (char) {
		const self = this;
		return self.mapAndParse({
			source: char,
			translation: char,
			sn: char
		});
	}

	backtickBody (backtickBody, backtickBodyPart) {
		const self = this;
		if (backtickBody === undefined) {
			return self.mapAndParse({
				source: "",
				translation: "",
				sn: ""
			});
		}
		return self.mapAndParse({
			source: backtickBody.source + backtickBodyPart.source,
			translation: backtickBody.translation + backtickBodyPart.translation,
			sn: self.sn([backtickBody.sn, backtickBodyPart.sn])
		});
	}

	backtickString (backtickBody) {
		const self = this;
		return self.mapAndParse({
			source: '`' + backtickBody.source + '`',
			translation: '`' + backtickBody.translation + '`',
			sn: self.sn(['`', backtickBody.sn, '`'])
		});
	}
*/
	btString (backtickString) {
		const self = this;
		return self.mapAndParse({
			source: backtickString,
			translation: backtickString,
			sn: self.sn([backtickString]),
			isBString: true
		});
	}

	bracketExpression (expression) {
		let self = this;
		return self.mapAndParse({
			source: `[${expression.source}]`,
			translation: `[${expression.translation}]`,
			sn: self.sn(["[", expression.sn, "]"]),
			value: expression.translation
		});
	}

	bracketSelectorExpression (a, b) {
		let self = this;
		if (typeof a !== "object") {
			a = self.mapAndParse({
				source: "",
				translation: "0",
				sn: "0"
			});
		}
		if (typeof b !== "object") {
			b = self.mapAndParse({
				source: "",
				translation: "undefined",
				sn: "undefined"
			});
		}
		return self.mapAndParse({
			source: `[${a.source}:${b.source}]`,
			translation: `.slice(${a.translation},${b.translation})`,
			sn: self.sn([".slice(", a.sn, ",", b.sn, ")"]),
			values: [a.translation, b.translation]
		});
	}

	controlCode (controlCode="", expression) {
		let self = this;
		self.state.loc.name = self.state.context.name;
		if (expression === undefined) {
			return self.mapAndParse();
		}
		return self.mapAndParse({
			source: `${controlCode.source}${expression.source};`,
			translation: `${controlCode.translation}${expression.translation};`,
			sn: self.sn([controlCode.sn, expression.sn, ";"])
		});
	}

	declarationId (identifier) {
		const self = this;
		self.state.loc.name = identifier;
		return self.mapAndParse({
			source: `${identifier}`,
			translation: `"${identifier}"`,
			sn: self.sn(['"', identifier, '"'])
		});
	}

	declarationIdList (idList) {
		const self = this;
		let stringList = "";
		idList.values.forEach((id, index) => {
			if (index !== 0) {
				stringList += ",";
			}
			stringList += `"${id}"`;
		});
		return self.mapAndParse({
			source: `[${idList.source}]`,
			translation: `[${stringList}]`,
			sn: self.sn(["[", stringList, "]"])
		});
	}

	declarationExpression (type, name, value) {
		let self = this;
		const state = self.state;
		if (name in api) {
			throw `Syntax Error: '${name}' is a reserved word ${state.errorTail()}`;
		}
		if (state.context.definedLocally(name)) {
			throw `Syntax Error: '${name}' has already been defined in this context. ${state.errorTail()}`;
		}
		if (type === "let") {
			state.context.scoping.let.set(name, true);
		}
		if (type === "private") {
			state.context.scoping.private.set(name, true);
		}
		if (type === "protected") {
			state.context.scoping.protected.set(name, true);
		}
		if (type === "public") {
			state.context.scoping.public.set(name, true);
		}
		return self.mapAndParse({
			source: `${type} ${name.source} = ${value.source}`,
			translation: `scope.declarationExpression({type:"${type}",name:${name.translation},value:${value.translation}})`,
			sn: self.sn(['scope.declarationExpression({type:"', type, '",name:', name.sn, ',value:', value.sn, '})'])
		});
	}

	emptyMapExpression (arrayStart) {
		const self = this;
		self.state.setParentContext();
		return self.mapAndParse({
			source: `${arrayStart.source}]`,
			translation: `${arrayStart.translation})`,
			sn: self.sn([arrayStart.sn, ')'])
		});
	}

	expressionList (expression, expressionList) {
		let self = this;
		if (expressionList === undefined) {
			return self.mapAndParse({
				source: expression.source, 
				translation: expression.translation,
				sn: self.sn([expression.sn])
			});
		}
		return self.mapAndParse({
			source: `${expression.source},${expressionList.source}`,
			translation: `${expression.translation},${expressionList.translation}`,
			sn: self.sn([expression.sn, ",", expressionList.sn])
		});
	}
	
	identifier (name, notation, children) {
		const self = this;
		const state = self.state;

		if (self.parentNode === "assignmentExpression") {
			if (notation === 'dot') {
				return self.mapAndParse({
					source: `${name.source}.${children}`,
					translation: `${name.translation},"${children}"`,
					sn: self.sn([name.sn, ',"', children, '"'])
				});
			}
			if (notation === "bracket") {
				if (children.values) {
					//self.state.loc.name = `${self.state.loc.name}[${children[0]}:${children[1]}]`;
					return self.mapAndParse({
						source: `${name.source}${children.source}`,
						translation: `${name.translation},${children.values[0]},${children.values[1]}`,
						sn: self.sn([name.sn, ",", children.values[0], ",", children.values[1]])
					});
				}
				//self.state.loc.name = `${self.state.loc.name}[${children}]`;
				return self.mapAndParse({
					source: `${name.source}[${children.source}]`,
					translation: `${name.translation},${children.value}`,
					sn: self.sn([name.sn, ",", children.value])
				});
			}
			//self.state.loc.name = `${name}`;
			return self.mapAndParse({
				source: `${name}`,
				translation: `"${name}"`,
				sn: self.sn(['"', name, '"'])
			});
		}

		if (children === undefined) {
			//self.state.loc.name = `${name}`;
			if (name in api) {
				return self.mapAndParse({
					source: `${name}`,
					translation: `${api[name]}`,
					sn: self.sn([api[name]])
				});
			}
			if (allowedUndefinedIdExpressions.indexOf(this.parentNode) !== -1) {
				return self.mapAndParse({
					source: `${name}`,
					translation: `${name}`,
					sn: self.sn([name])
				});
			}
			return self.mapAndParse({
				source: `${name}`,
				translation: `scope.identifier("${name}")`,
				sn: self.sn(['scope.identifier("', name, '")'])
			});
		}
		
		if (notation === 'dot') {
			//self.state.loc.name = `${self.state.loc.name}.${children}`;
			return self.mapAndParse({
				source: `${name.source}.${children}`,
				translation: `${name.translation}["${children}"]`,
				sn: self.sn([name.sn, '["', children, '"]'])
			});
		} else {
			return self.mapAndParse({
				source: `${name.source}${children.source}`,
				translation: `${name.translation}${children.translation}`,
				sn: self.sn([name.sn, children.sn])
			});
		}
	}

	idList (identifier, idList) {
		const self = this;
		if (idList === undefined) {
			return self.mapAndParse({
				source: `${identifier}`,
				translation: `${identifier}`,
				sn: self.sn([identifier]),
				values: [identifier]
			});
		}
		let idListValues = idList.values.slice();
		idListValues.unshift(identifier);
		return self.mapAndParse({
			source: `${identifier},${idList.source}`,
			translation: `${identifier},${idList.translation}`,
			sn: self.sn([identifier, ",", idList.sn]),
			values: idListValues
		});
	}

	importExpression (string) {
		const self = this;
		return self.mapAndParse({
			source: `import ${string}`,
			translation: self.state.newImportExpression(string),
			sn: self.sn([self.state.newImportExpression(string)])
		});
	}

	invokeArguments (expressionList) {
		const self = this;
		if (expressionList === undefined) {
			return self.mapAndParse();
		}
		return self.mapAndParse({
			source: `${expressionList.source}`,
			translation: `${expressionList.translation}`,
			sn: self.sn([expressionList.sn])
		});
	}

	invokeExpression (name, invokeArguments) {
		const self = this;
		return self.mapAndParse({
			source: `${name.source}(${invokeArguments.source})`,
			translation: `${name.translation}(${invokeArguments.translation})`,
			sn: self.sn([name.sn, '(', invokeArguments.sn, ')'])
		});
	}

	invokeId (invokeExpression, notation, identifier) {
		const self = this;
		if (notation === 'dot') {
			return self.mapAndParse({
				source: `${invokeExpression.source}.${identifier.source}`,
				translation: `${invokeExpression.translation}["${identifier.translation}"]`,
				sn: self.sn([invokeExpression.sn, '["', identifier.sn, '"]'])
			});
		} else {
			return self.mapAndParse({
				source: `${invokeExpression.source}${identifier.source}`,
				translation: `${invokeExpression.translation}${identifier.translation}`,
				sn: self.sn([invokeExpression.sn, identifier.sn])
			});
		}
	}

	invokeTracker (id) {
		return id;
	}

	mapExpression (arrayStart, associativeList) {
		const self = this;
		self.state.setParentContext();
		return self.mapAndParse({
			source: `${arrayStart.source}${associativeList.source}]`,
			translation: `scope.mapExpression(${associativeList.translation})`,
			sn: self.sn(["scope.mapExpression(", associativeList.sn, ")"])
		});
	}
	
	numericLiteral (n) {
		const self = this;
		return self.mapAndParse({
			source: `${n}`,
			translation: `${n}`,
			sn: self.sn([`${n}`])
		});
	}

	regexLiteral (regex, modifiers) {
		const self = this;
		let result = `XRegExp(${JSON.stringify(regex.substr(1,regex.length - 2))},"${modifiers}")`
		return self.mapAndParse({
			source: `${regex}${modifiers}`,
			translation: `${r}`,
			sn: self.sn([`${r}`])
		});
	}

	returnExpression (expression) {
		const self = this;
		return self.mapAndParse({
			source: `return ${expression.source}`,
			translation: `return ${expression.translation}`,
			sn: self.sn(["return ", expression.sn])
		});
	}

	scopeStart () {
		const self = this;
		self.state.newChildContext();
		return self.mapAndParse({
			source: "{",
			translation: "scope.createScope(function(args){",
			sn: self.sn(["scope.createScope(function(args){"])
		});
	}

	scopeExpression (scopeStart, scopeArguments, controlCode) {
		const self = this;
		const state = self.state;
		let argDeclarations = "";
		if (scopeStart.source !== "{") {
			controlCode = scopeArguments;
			scopeArguments = scopeStart;
		}
		if (controlCode === undefined) {
			controlCode = scopeArguments;
			scopeArguments = {
				source: "",
				translation: "[]",
				sn: self.sn(["[]"]),
				values: []
			};
		}

		if (scopeArguments === undefined) {
			scopeArguments = {
				source: "",
				translation: "[]",
				sn: self.sn(["[]"]),
				values: []
			};
		}

		scopeArguments.values.forEach((arg, index) => {
			argDeclarations += 'scope.declarationExpression({' +
				'type:"let",' +
				`name:"${arg[0]}",` +
				`value:args[${index}]===undefined?${arg[1]}:args[${index}]` +
			'});';
		});

		state.setParentContext();
		return self.mapAndParse({
			source: `${scopeArguments.source}${scopeStart.source}${controlCode.source}}`,
			translation: `${scopeStart.translation}${argDeclarations}${controlCode.translation}})`,
			sn: self.sn([scopeStart.sn, argDeclarations, controlCode.sn, "})"])
		});
	}

	scopeArguments (scopeArgumentsList) {
		const self = this;
		return self.mapAndParse({
			source: `(${scopeArgumentsList.source})`,
			translation: `${scopeArgumentsList.translation}`,
			sn: self.sn([scopeArgumentsList.sn]),
			values: scopeArgumentsList.values
		});
	}

	scopeArgumentsList (scopeArgumentsListDeclaration, scopeArgumentsList) {
		const self = this;
		if (scopeArgumentsList === undefined) {
			return self.mapAndParse({
				source: `${scopeArgumentsListDeclaration.source}`,
				translation: `${scopeArgumentsListDeclaration.translation}`,
				sn: self.sn([scopeArgumentsListDeclaration.sn]),
				values: [scopeArgumentsListDeclaration.value]
			});
		}
		let scopeArgValues = scopeArgumentsList.values.slice();
		scopeArgValues.unshift(scopeArgumentsListDeclaration.value);
		return self.mapAndParse({
			source: `${scopeArgumentsListDeclaration.source},${scopeArgumentsList.source}`,
			translation: "",
			sn: "",
			values: scopeArgValues
		});
	}

	scopeArgumentsListDeclaration (identifier, expression) {
		const self = this;
		return self.mapAndParse({
			source: `${identifier}:${expression.source}`,
			translation: "",
			sn: "",
			value: [identifier, expression.translation]
		});
	}

	stringLiteral (str) {
		const self = this;
		if (str.isBString) {
			return self.mapAndParse(str);
		}
		let parsedStr = str.
			replace(/\\\r\n|\\\n/mg, "").
			replace(/\n/mg, "\\n").
			replace(/\r/mg, "\\r")
		return self.mapAndParse({
			source: str,
			translation: parsedStr,
			sn: self.sn([parsedStr])
		});
	}

	unaryExpression (operator, expression) {
		const self = this;
		return self.mapAndParse({
			source: `${operator} ${expression.source}`,
			translation: `${operator}${expression.translation}`,
			sn: self.sn([operator, expression.sn])
		});
	}

	useExpression (usable, useOnly) {
		const self = this;
		if (useOnly === undefined) {
			return self.mapAndParse({
				source: `use ${usable.source}`,
				translation: `scope.use([${usable.translation}])`,
				sn: self.sn(["scope.use([", usable.sn, "])"])
			})
		}
		return self.mapAndParse({
			source: `use ${usable.source} only ${useOnly.source}`,
			translation: `scope.use([${usable.translation}],[${useOnly.translation}])`,
			sn: self.sn(["scope.use([", usable.sn, "],[", useOnly.sn, "])"])
		});
	}

	usable (usable1, usable2) {
		const self = this;
		if (usable2 === undefined) {
			return self.mapAndParse({
				source: `${usable1.source}`,
				translation: `${usable1.translation}`,
				sn: self.sn([usable1.sn])
			});
		}
		return self.mapAndParse({
			source: `${usable1.source},${usable2.source}`,
			translation: `${usable1.translation},${usable2.translation}`,
			sn: self.sn([usable1.sn, ",", usable2.sn])
		});
	}

	useOnly (expressionList) {
		const self = this;
		return self.mapAndParse({
			source: `${expressionList.source}`,
			translation: `${expressionList.translation}`,
			sn: self.sn([expressionList.sn])
		});
	}

	xmlControlCode (xmlControlCode="", expression) {
		const self = this;
		if (expression === undefined) {
			return self.mapAndParse({
				source: "",
				translation: "",
				sn: "",
				first: true
			});
		}
		if (!xmlControlCode.first) {
			xmlControlCode.translation += ",";
			xmlControlCode.sn.add([","]);
		}
		return self.mapAndParse({
			source: `${xmlControlCode.source}${expression.source};`,
			translation: `${xmlControlCode.translation}${expression.translation}`,
			sn: self.sn([xmlControlCode.sn, expression.sn]),
			first: false
		});
	}

	xmlAttributes (xmlAttributes="", name, expression) {
		const self = this;
		if (name === undefined) {
			return self.mapAndParse({
				source: "",
				translation: "",
				sn: "",
				first: true
			});
		}
		if (!xmlAttributes.first) {
			xmlAttributes.translation += ",";
			xmlAttributes.sn.add([","]);
		}
		return self.mapAndParse({
			source: `${xmlAttributes.source} ${name}=${expression.source}`,
			translation: `${xmlAttributes.translation}"${name}":${expression.translation}`,
			sn: self.sn([xmlAttributes.sn, '"', name, '":', expression.sn]),
			first: false
		});
	}

	xmlExpression (name, xmlAttributes, xmlControlCode, closeName) {
		const self = this;
		if (xmlControlCode === undefined) {
			return self.mapAndParse({
				source: `<${name.source} ${xmlAttributes.source}/>`,
				translation: `scope.xmlExpression("${name.translation}",{${xmlAttributes.translation}})`,
				sn: self.sn(['scope.xmlExpression("', name.sn, '",{', xmlAttributes.sn, '})'])
			});
		}
		if (name.source !== closeName.source) {
			throw `Syntax Error: Unmatching XML Tags: <${name.source}>...</${closeName.source}> ${state.errorTail()}`;
		}
		return self.mapAndParse({
			source: `<${name.source} ${xmlAttributes.source}>${xmlControlCode.source}</${closeName.source}>`,
			translation: `scope.xmlExpression("${name.translation}",{${xmlAttributes.translation}},${xmlControlCode.translation})`,
			sn: self.sn(['scope.xmlExpression("', name.sn, '",{', xmlAttributes.sn, '},', xmlControlCode.sn, ')'])
		});
	}
}

export default ScopeRules;