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
			name: "<scope:anonymouse>"
		}
		state.errorTail = () => `[${self.state.loc.start.line}:${self.state.loc.start.column}-${self.state.loc.end.line}:${self.state.loc.end.column}]`;
		//state.idBubble = ["this"];
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
		let self = this;
		this.state.setParentContext();
		return self.sn(['scope.arrayExpression(', expressionList, ')']);
	}

	arrayStart () {
		this.state.newChildContext();
		this.state.context.inArrayDefinition = true;
	}

	assignmentExpression (name, assignmentValue) {
		let self = this;
		return self.sn(['scope.assignmentExpression([', name, '],', assignmentValue, ')']);
	}

	assignmentValue (op, expression) {
		let self = this;
		return self.sn(['["', op, '", ', expression, ']']);
	}

	associativeDeclaration (name, type, expression) {
		const state = this.state;
		return {
			name: name,
			type: type,
			expression: expression
		};
	}

	associativeList (associativeList, associativeDeclaration) {
		const state = this.state;
		let result = '';
		let name = '';
		let self = this;
		if (associativeDeclaration === undefined) {
			associativeDeclaration = associativeList;
			result =  buildArgPartFromAssocPart(associativeDeclaration);
		} else {
			result = associativeList + buildArgPartFromAssocPart(associativeDeclaration, true);
		}
		if (associativeDeclaration.type === 'id') {
			name = associativeDeclaration.name;
		} else {
			name = associativeDeclaration.name.substr(1,associativeDeclaration.name.length - 2);
		}
		if (!state.context.inArrayDefinition) {
			state.context.scoping.let.set(name, true);
			state.context.args.push({name: name, default: associativeDeclaration.expression});
		}
		return self.sn(result);
	}

	binaryExpression (a, op, b) {
		let self = this;
		return self.sn([`scope.binaryExpression('${op}', ${a}, ${b})`]);
		//return self.sn([a, op, b]);
	}

	booleanLiteral (bool) {
		let self = this;
		return self.sn(bool.toString());
	}

	bracketExpression (expression) {
		let self = this;
		return self.sn(['[', expression, ']']);
	}

	bracketSelectorExpression (a, b) {
		let self = this;
		return [a + "", b + ""]
	}

	controlCode (controlCode="", expression) {
		let self = this;
		if (expression === undefined) {
			return self.sn("");
		}
		return self.sn([controlCode, expression, ';']);
	}

	declarationId (identifier) {
		return `"${identifier}"`;
	}

	declarationIdList (idList) {
		let node = idList;
		//console.log(JSON.stringify(idList));
		while(node.children.length === 3) {
			for (let i = 0; i < node.children.length; i += 1) {
				if (typeof node.children[i] === "string") {
					if (node.children[i] !== ",") {
						node.children[i] = '"' + node.children[i] + '"';
					}
				} else {
					node = node.children[i];
				}
			}
		}
		node.children[0] = '"' + node.children[0] + '"';
		//console.log(JSON.stringify(idList));
		return `[${idList}]`;
	}

	declarationExpression (type, name, value) {
		const state = this.state;
		if (name in api) {
			throw `Syntax Error: '${name}' is a reserved word ${this.state.errorTail()}`;
		}
		if (state.context.definedLocally(name)) {
			throw `Syntax Error: '${name}' has already been defined in this context. ${this.state.errorTail()}`;
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
		return 'scope.declarationExpression({' +
				'type:"' + type + '",' +
				'name:' + name + ',' +
				'value:' + value +
			'})';
	}

	emptyMapExpression () {
		this.state.setParentContext();
		return this.sn(["scope.mapExpression()"]);
	}

	expressionList (expression, expressionList) {
		let self = this;
		if (expressionList === undefined) {
			return self.sn(expression);
		}
		return self.sn([expression, ',', expressionList]);
	}
	
	identifier (name, notation, children) {
		const state = this.state;
		let self = this;

		if (this.parentNode === "assignmentExpression") {
			if (notation === 'dot') {
				return self.sn([name, ',"', children, '"'], `${name}.${children}`);
			}
			if (notation === "bracket") {
				if (children instanceof Array) {
					return self.sn([name, ',', children[0], ',', children[1]], `${name}[${children[0]}:${children[1]}]`);
				}
				return self.sn([name, ',', children], `${name}[${children}]`);
			}
			return self.sn(['"', name, '"'], `${name}`);
		}

		if (children === undefined) {
			if (name in api) {
				return self.sn(api[name], name);
			}
			if (allowedUndefinedIdExpressions.indexOf(this.parentNode) !== -1) {
				return self.sn(name, name);
			}
			return self.sn(['scope.identifier("', name, '")'], name);
		}
		/*if (this.parentNode === "invokeTracker") {
			self.state.idBubble.push(name);
		}*/
		
		if (notation === 'dot') {
			return self.sn([name, '["', children, '"]'], `${name}.${children}`);
		} else {
			if (children instanceof Array) {
				return self.sn([name, `.slice(${children[0]},${children[1]})`], `${name}[${children[0]}:${children[1]}]`);
			}
			return self.sn([name, '[', children, ']'], `${name}[${children}]`);
		}

	}

	idList (identifier, idList) {
		let self = this;
		if (idList === undefined) {
			return self.sn([identifier]);
		}
		return self.sn([identifier, ",", idList]);
	}

	importExpression (string) {
		let self = this;
		return self.sn([self.state.newImportExpression(string)]);
	}

	invokeArguments (expression="") {
		let self = this;
		return self.sn(expression);
	}

	invokeExpression (name, invokeArguments) {
		let self = this;
		/*let thisContext = "this";
		if (name instanceof Array) {
			[name, thisContext] = name;
		}*/
		return self.sn([name, '(', invokeArguments, ')'], 'invokeExpression');
		//return self.sn(['scope.invokeExpression({arguments:[', invokeArguments, '],context:', thisContext, 'function:', name, '})'], "<scope>");
	}

	invokeId (invokeExpression, notation, identifier) {
		let self = this;
		if (notation === 'dot') {
			return self.sn([invokeExpression, '["', identifier, '"]'], `<map>.${identifier}`);
		} else {
			if (identifier instanceof Array) {
				return self.sn([name, `.slice(${identifier[0]},${identifier[1]})`], `${name}[${identifier[0]}:${identifier[1]}]`);
			}
			return self.sn([name, '[', identifier, ']'], `${name}[${identifier}]`);
		}
	}

	invokeTracker (id) {
		/*if (this.state.idBubble.length > 1) {
			return [id, this.state.idBubble.pop()];
		}*/
		return id;
	}

	mapExpression (arrayStart, associativeList) {
		this.state.setParentContext();
		return this.sn(["scope.mapExpression(", associativeList, ")"]);
	}
	
	numericLiteral (n) {
		return this.sn(n.toString());
	}

	regexLiteral (r) {
		return this.sn(r);
	}

	returnExpression (expression) {
		let self = this;
		return self.sn(["return ", expression]);
	}

	scopeStart () {
		let self = this;
		self.state.newChildContext();
		return true;
	}

	scopeExpression (scopeStart, scopeArguments, controlCode) {
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
			argDeclarations += 'scope.declarationExpression({' +
				'type:"let",' +
				'name:"' + arg.name + '",' +
				'value:args[' + index + ']===undefined?' + arg.default + ':args[' + index + ']' +
			'});';
		});

		state.setParentContext();

		return self.sn(['scope.createScope(function(args){',
			argDeclarations,
			controlCode,
			"})"
		]);
	}

	scopeArguments (associativeList) {
		const state = this.state;
		let self = this;

		return self.sn(['[', associativeList, ']']);
	}

	stringLiteral (str) {
		let self = this;
		return self.sn(JSON.stringify(str));
	}

	unaryExpression (operator, expression) {
		let self = this;
		return self.sn([operator, expression]);
	}

	useExpression (usable, useOnly) {
		let self = this;
		if (useOnly === undefined) {
			return self.sn([`scope.use([${usable}])`]);
		}
		return self.sn([`scope.use([${usable}], [${useOnly}])`]);
	}

	usable (usable1, usable2) {
		let self = this;
		if (usable2 === undefined) {
			return usable1;
		}
		return self.sn([usable1, ",", usable2]);
	}

	useOnly (expressionList) {
		let self = this;
		return expressionList;
	}

	xmlControlCode (xmlControlCode="", expression) {
		let self = this;
		if (expression === undefined) {
			return "";
		}
		if (xmlControlCode !== "") {
			xmlControlCode.add(",");
		}
		return self.sn([xmlControlCode, expression]);
	}

	xmlAttributes (xmlAttributes="", name, value) {
		let self = this;
		if (name === undefined) {
			return "";
		}
		if (xmlAttributes !== "") {
			xmlAttributes.add(", ");
		}
		return self.sn([xmlAttributes, '"', name, '"', ":", value]);
	}

	xmlExpression (name, xmlAttributes, xmlControlCode) {
		let self = this;
		if (xmlControlCode === undefined) {
			return self.sn(['scope.xmlExpression("', name, '",{', xmlAttributes, '})']);
		}
		return self.sn(['scope.xmlExpression("', name, '",{', xmlAttributes, '},', xmlControlCode, ')']);
	}
}

export default ScopeRules;