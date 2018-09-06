"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _path = require("path");

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let api = {
	print: "ScopeApi.print",
	debug: "ScopeApi.debug",
	if: "ScopeApi['if']",
	each: "ScopeApi['each']",
	compile: "ScopeApi.compile",
	promise: "ScopeApi.promise",
	dereference: "ScopeApi.dereference"
};

let allowedUndefinedIdExpressions = ["xmlExpression", "invokeId"];

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
};

let randStr = (len = 16) => {
	let result = "";
	let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (let i = 0; i < len; i += 1) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
};

class ScopeRules {
	constructor(state = { context: {} }) {
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
			name: "<scope:anonymouse>"
		};
		state.errorTail = () => `[${self.state.loc.start.line}:${self.state.loc.start.column}-${self.state.loc.end.line}:${self.state.loc.end.column}]`;

		state.importExpressions = new Map();
		state.root = state.context;
		state.context = state.context;
		state.context.args = [];
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
			state.context = newContext;
		};

		state.setParentContext = () => {
			state.context = state.context.scoping.parent;
		};

		state.newImportExpression = str => {
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
		};

		state.context.idAvailable = (id = "", me = state.context) => {
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
		};

		state.newChildContext();
	}

	arrayExpression(start, expressionList = "") {
		let self = this;
		this.state.setParentContext();
		return self.sn(['scope.arrayExpression(', expressionList, ')']);
	}

	arrayStart() {
		this.state.newChildContext();
		this.state.context.inArrayDefinition = true;
	}

	assignmentExpression(name, assignmentValue) {
		let self = this;
		return self.sn(['scope.assignmentExpression([', name, '],', assignmentValue, ')']);
	}

	assignmentValue(op, expression) {
		let self = this;
		return self.sn(['["', op, '", ', expression, ']']);
	}

	associativeDeclaration(name, type, expression) {
		const state = this.state;
		return {
			name: name,
			type: type,
			expression: expression
		};
	}

	associativeList(associativeList, associativeDeclaration) {
		const state = this.state;
		let result = '';
		let name = '';
		let self = this;
		if (associativeDeclaration === undefined) {
			associativeDeclaration = associativeList;
			result = buildArgPartFromAssocPart(associativeDeclaration);
		} else {
			result = associativeList + buildArgPartFromAssocPart(associativeDeclaration, true);
		}
		if (associativeDeclaration.type === 'id') {
			name = associativeDeclaration.name;
		} else {
			name = associativeDeclaration.name.substr(1, associativeDeclaration.name.length - 2);
		}
		if (!state.context.inArrayDefinition) {
			state.context.scoping.let.set(name, true);
			state.context.args.push({ name: name, default: associativeDeclaration.expression });
		}
		return self.sn(result);
	}

	binaryExpression(a, op, b) {
		let self = this;
		return self.sn([`scope.binaryExpression('${op}', ${a}, ${b})`]);
		//return self.sn([a, op, b]);
	}

	booleanLiteral(bool) {
		let self = this;
		return self.sn(bool.toString());
	}

	controlCode(controlCode = "", expression) {
		let self = this;
		if (expression === undefined) {
			return self.sn("");
		}
		return self.sn([controlCode, expression, ';']);
	}

	declarationExpression(type, name, value) {
		const state = this.state;
		if (name in api) {
			throw `Syntax Error: '${name}' is a reserved word ${this.state.errorTail()}`;
		}
		if (state.context.definedLocally(name)) {
			throw `Syntax Error: '${name}' has already been defined in this context. ${this.state.errorTail()}`;
		}
		if (type === "let") {
			state.context.scoping.let.set(name, true);
			return `scope.declarationExpression({
				type: "${type}",
				name: "${name}",
				value: ${value}
			})`;
		}
		if (type === "private") {
			state.context.scoping.private.set(name, true);
			return `scope.declarationExpression({
				type: "${type}",
				name: "${name}",
				value: ${value}
			})`;
		}
		if (type === "protected") {
			state.context.scoping.protected.set(name, true);
			return `scope.declarationExpression({
				type: "${type}",
				name: "${name}",
				value: ${value}
			})`;
		}
		if (type === "public") {
			state.context.scoping.public.set(name, true);
			return `scope.declarationExpression({
				type: "${type}",
				name: "${name}",
				value: ${value}
			})`;
		}
	}

	emptyMapExpression() {
		this.state.setParentContext();
		return this.sn(["scope.mapExpression()"]);
	}

	expressionList(expression, expressionList) {
		let self = this;
		if (expressionList === undefined) {
			return self.sn(expression);
		}
		return self.sn([expression, ',', expressionList]);
	}

	identifier(name, notation, children) {
		const state = this.state;
		let self = this;
		if (this.parentNode === "assignmentExpression") {
			if (notation === 'dot') {
				return self.sn([name, ',"', children, '"'], `${name}.${children}`);
			}
			if (notation === "bracket") {
				return self.sn([name, ',', children], `${name}[${children}]`);
			}
			return self.sn(['"', name, '"'], `${name}`);
			//throw `Identifier '${name}' is not defined ${this.state.errorTail()}`;
		}

		if (children === undefined) {
			if (name in api) {
				return self.sn(api[name], name);
			}
			if (allowedUndefinedIdExpressions.indexOf(this.parentNode) !== -1) {
				return self.sn(name, name);
			}
			return self.sn(['scope.identifier("', name, '")'], name);
			//throw `Identifier '${name}' is not defined ${this.state.errorTail()}`;
		}

		if (notation === 'dot') {
			return self.sn([name, '.get("', children, '")'], `${name}.${children}`);
		} else {
			return self.sn([name, '.get(', children, ')'], `${name}[${children}]`);
		}
	}

	idList(identifier, idList) {
		let self = this;
		if (idList === undefined) {
			return self.sn([identifier]);
		}
		return self.sn([identifier, ",", idList]);
	}

	importExpression(string) {
		let self = this;
		return self.sn([self.state.newImportExpression(string)]);
	}

	invokeArguments(expression = "") {
		let self = this;
		return self.sn(expression);
	}

	invokeExpression(name, invokeArguments) {
		let self = this;
		return self.sn(['scope.invokeExpression(', name, ',[', invokeArguments, '])'], "<scope>");
	}

	invokeId(invokeExpression, notation, identifier) {
		let self = this;
		if (notation === 'dot') {
			return self.sn([invokeExpression, '.get("', identifier, '")'], `<map>.${identifier}`);
		} else {
			return self.sn([invokeExpression, '.get(', identifier, ')'], `<map>[${identifier}]`);
		}
	}

	mapExpression(arrayStart, associativeList) {
		this.state.setParentContext();
		return this.sn(["scope.mapExpression(", associativeList, ")"]);
	}

	numericLiteral(n) {
		return this.sn(n.toString());
	}

	returnExpression(expression) {
		let self = this;
		return self.sn(["return ", expression]);
	}

	scopeStart() {
		let self = this;
		self.state.newChildContext();
		return true;
	}

	scopeExpression(scopeStart, scopeArguments, controlCode) {
		const state = this.state;
		let self = this;
		let argDeclarations = "";
		if (scopeStart !== true) {
			controlCode = scopeArguments;
			scopeArguments = scopeStart;
		}
		if (controlCode === undefined) {
			controlCode = scopeArguments;
			scopeArguments = "[]";
		}

		if (scopeArguments === undefined) {
			scopeArguments = "[]";
		}

		state.context.args.forEach((arg, index) => {
			argDeclarations += `scope.declarationExpression({
				type: "let",
				name: "${arg.name}",
				value: args[${index}] === undefined ? ${arg.default} : args[${index}]
			});\n`;
		});

		state.setParentContext();

		return self.sn(['scope.createScope((args)=>{', argDeclarations, controlCode, "})"]);
	}

	scopeArguments(associativeList) {
		const state = this.state;
		let self = this;

		return self.sn(['[', associativeList, ']']);
	}

	stringLiteral(str) {
		let self = this;
		return self.sn(JSON.stringify(str));
	}

	unaryExpression(operator, expression) {
		let self = this;
		return self.sn([operator, expression]);
	}

	useExpression(usable, useOnly) {
		let self = this;
		if (useOnly === undefined) {
			return self.sn([`scope.use([${usable}])`]);
		}
		return self.sn([`scope.use([${usable}], [${useOnly}])`]);
	}

	usable(usable1, usable2) {
		let self = this;
		if (usable2 === undefined) {
			return usable1;
		}
		return self.sn([usable1, ",", usable2]);
	}

	useOnly(expressionList) {
		let self = this;
		return expressionList;
	}

	xmlControlCode(xmlControlCode = "", expression) {
		let self = this;
		if (expression === undefined) {
			return "";
		}
		if (xmlControlCode !== "") {
			xmlControlCode.add(",");
		}
		return self.sn([xmlControlCode, expression]);
	}

	xmlAttributes(xmlAttributes = "", name, value) {
		let self = this;
		if (name === undefined) {
			return "";
		}
		if (xmlAttributes !== "") {
			xmlAttributes.add(", ");
		}
		return self.sn([xmlAttributes, '"', name, '"', ":", value]);
	}

	xmlExpression(name, xmlAttributes, xmlControlCode) {
		let self = this;
		if (xmlControlCode === undefined) {
			return self.sn(['scope.xmlExpression("', name, '",{', xmlAttributes, '})']);
		}
		return self.sn(['scope.xmlExpression("', name, '",{', xmlAttributes, '},', xmlControlCode, ')']);
	}
}

exports.default = ScopeRules;