"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

let api = {
	print: "ScopeApi.print",
	debug: "ScopeApi.debug",
	if: "ScopeApi['if']",
	each: "ScopeApi['each']",
	extend: "ScopeApi['extend']"
};

let allowedUndefinedIdExpressions = ["xmlExpression", "xmlAttributes", "invokeId"];

let buildArgPartFromAssocPart = (assoc, addTo = false) => {
	let result = "";
	if (addTo) {
		result = ",";
	}
	if (assoc.type === "id") {
		result += `{key: "${assoc.name}", value: ${assoc.expression}}`;
	} else if (assoc.type === "string") {
		result += `{key: ${assoc.name}, value: ${assoc.expression}}`;
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
			}
		};
		state.errorTail = () => `[${self.state.loc.start.line}:${self.state.loc.start.column}-${self.state.loc.end.line}:${self.state.loc.end.column}]`;
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

	arrayExpression(start, list = "") {
		let self = this;
		this.state.setParentContext();
		return self.sn(['scope.arrayExpression(', list, ')']);
	}

	arrayStart() {
		this.state.newChildContext();
		this.state.context.inArrayDefinition = true;
	}

	assignmentExpression(name, expression) {
		let self = this;
		return self.sn(['scope.assignmentExpression([', name, '],', expression, ')']);
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
		return self.sn([a, op, b]);
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
			if (children === undefined && state.context.idAvailable(name)) {
				return self.sn(['"', name, '"']);
			}

			if (notation === 'dot') {
				return self.sn([name, ',"', children, '"']);
			}
			if (notation === "bracket") {
				return self.sn([name, ',', children]);
			}

			throw `Identifier '${name}' is not defined ${this.state.errorTail()}`;
		}

		if (children === undefined) {
			if (name in api) {
				return self.sn(api[name]);
			}
			if (state.context.idAvailable(name)) {
				return self.sn(['scope.identifier("', name, '")']);
			}
			if (allowedUndefinedIdExpressions.indexOf(this.parentNode) !== -1) {
				return self.sn(name);
			}
			return self.sn(['scope.identifier("', name, '")']);
			//console.log(JSON.stringify(state.context, null, "  "));
			//throw `Identifier '${name}' is not defined ${this.state.errorTail()}`;
		}

		if (notation === 'dot') {
			return self.sn([name, '.get("', children, '")']);
		} else {
			return self.sn([name, '.get(', children, ')']);
		}
	}

	invokeArguments(expression = "") {
		let self = this;
		return self.sn(expression);
	}

	invokeExpression(name, invokeArguments) {
		let self = this;
		return self.sn(['scope.invokeExpression(', name, ',[', invokeArguments, '])']);
	}

	invokeId(invokeExpression, notation, identifier) {
		let self = this;
		if (notation === 'dot') {
			return self.sn([invokeExpression, '.get("', identifier, '")']);
		} else {
			return self.sn([invokeExpression, '.get(', identifier, ')']);
		}
	}

	numericLiteral(n) {
		return this.sn(n.toString());
	}

	returnExpression(expression) {
		let self = this;
		return self.sn(["return ", expression]);
	}

	scopeStart() {
		this.state.newChildContext();
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

		return self.sn(['scope.createScope((args=', scopeArguments, ')=>{', argDeclarations, controlCode, "})"]);
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
		return self.sn([xmlAttributes, name, ":", value]);
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