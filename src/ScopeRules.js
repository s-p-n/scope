
let api = {
	print: "ScopeApi.print"
};

let allowedUndefinedIdExpressions = [
	"xmlExpression",
	"xmlAttributes"
];

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
			}
		}
		state.errorTail = () => `[${self.state.loc.start.line}:${self.state.loc.start.column}-${self.state.loc.end.line}:${self.state.loc.end.column}]`;
		state.root = state.context;
	    state.parent = state.context;
	    state.context = state.context;
	    state.context.scoping = {
	      let: new Map(),
	      private: new Map(),
	      protected: new Map(),
	      public: new Map()
	    };
	    state.context.args = [];
	    state.newChildContext = () => {
	    	state.parent = state.context;
	    	let newContext = {
	    		scoping: {
			      let: new Map(),
			      private: new Map(),
			      protected: new Map(),
			      public: new Map()
			    },
			    definedLocally: state.context.definedLocally,
			    idAvailable: state.context.idAvailable
	    	}
	    	newContext.args = [];
	    	state.context = newContext;
	    };

	    state.setParentContext = () => {
	    	state.context = state.parent;
	    };

	    state.context.definedLocally = (id="") => {
	    	let me = state.context;
	    	if (me.scoping.let.has(id)) {
	    		return me.scoping.let.get(id);
	    	}
	    	if (me.scoping.private.has(id)) {
	    		return me.scoping.private.get(id);
	    	}
	    	if (me.scoping.protected.has(id)) {
	    		return me.scoping.protected.get(id);
	    	}
	    	if (id in me.scoping.public) {
	    		return me.scoping.public[id];
	    	}
	    	return false;
	    }
	    state.context.idAvailable = (id="") => {
	    	let me = state.context;
	    	if (me.definedLocally(id)) {
	    		return true;
	    	}

	    	// TODO: Implement lexical scoping and shit..

	    	return false;
	    }
	}

	scopeStart () {
		this.state.newChildContext();
		console.log("New scope definition is starting..");
		return true;
	}

	scopeExpression (scopeStart, scopeArguments, controlCode) {
		const state = this.state;
		let argDeclarations = "";
		console.log("scopeExpression:", scopeStart, scopeArguments, controlCode);
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
			console.log(arg);
			argDeclarations += `scope.declarationExpression({
				type: "let",
				name: "${arg.name}",
				value: args[${index}] === undefined ? ${arg.default} : args[${index}]
			});`;
		});

		state.setParentContext();

		return `scope.createScope((args = ${scopeArguments}) => {
			scope.newChildContext();
			${argDeclarations}
			${controlCode}
			scope.setParentContext();
		})`;
	}

	scopeArguments (associativeList) {
		const state = this.state;

		console.log("scopeArguments:", associativeList);

		return `[${associativeList}]`;
	}

	associativeList (associativeList, associativeDeclaration) {
		const state = this.state;
		let result = '';
		let name = '';
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
		state.context.scoping.let.set(name, true);
		state.context.args.push({name: name, default: associativeDeclaration.expression});
		return result;
	}

	associativeDeclaration (name, type, expression) {
		const state = this.state;
		return {
			name: name,
			type: type,
			expression: expression
		};
	}

	controlCode (controlCode="", expression) {
		if (expression === undefined) {
			return "";
		}
		return `${controlCode}${expression};\n`
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
			console.log(`Defined '${name}'`)
			return `scope.declarationExpression({
				type: "${type}",
				name: "${name}",
				value: ${value}
			})`;
		}
		throw "TODO: Implement more declarations.";
	}
	stringLiteral (str) {
		return JSON.stringify(str);
	}
	numericLiteral (n) {
		return n;
	}
	booleanLiteral (bool) {
		return bool;
	}
	identifier (name, children) {
		const state = this.state;
		console.log("parent:", this.parentNode);
		if (children === undefined) {
			if (name in api) {
				return `${api[name]}`;
			}
			if (state.context.idAvailable(name)) {
				return `scope.identifier("${name}")`;
			}
			if (allowedUndefinedIdExpressions.indexOf(this.parentNode) !== -1) {
				return name;
			}
			throw `Identifier '${name}' is not defined ${this.state.errorTail()}`;
		}
		throw `TODO: Implement identifier children in parser ${this.state.errorTail()}`;

	}
	binaryExpression (a, op, b) {
		return `${a} ${op} ${b}`;
	}
	xmlControlCode (xmlControlCode="", expression) {
		if (expression === undefined) {
			return "";
		}
		if (xmlControlCode !== "") {
			xmlControlCode += ", \n";
		}
		return `${xmlControlCode}${expression}`;
	}
	xmlAttributes (xmlAttributes="", name, value) {
		if (name === undefined) {
			return "";
		}
		if (xmlAttributes !== "") {
			xmlAttributes += ", ";
		}
		return `${xmlAttributes} ${name}: ${value}`;
	}
	xmlExpression (name, xmlAttributes, xmlControlCode) {
		if (xmlControlCode === undefined) {
			return `scope.xmlExpression("${name}", {${xmlAttributes}})`;
		}
		return `scope.xmlExpression("${name}", {${xmlAttributes}}, ${xmlControlCode})`;
	}
	invokeExpression (name, invokeArguments) {
		return `scope.invokeExpression(${name}, [${invokeArguments}])`;
	}
	invokeArguments (expression="") {
		return `${expression}`;
	}
	expressionList (expression, expressionList) {
		if (expressionList === undefined) {
			return `${expression}`;
		}
		return `${expression}, ${expressionList}`;
	}
}

export default ScopeRules;