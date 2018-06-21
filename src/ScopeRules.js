
let api = {
	print: "scope.print"
};

class ScopeRules {
	controlCode (controlCode="", expression) {
		if (expression === undefined) {
			return "";
		}
		return `${controlCode}${expression};\n`
	}
	declarationExpression (type, name, value) {
		if (name in api) {
			throw `Syntax Error: '${name}' is a reserved word`;
		}
		return `scope.declarationExpression({
			type: "${type}",
			name: "${name}",
			value: ${value}
		})`;
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
	identifier (name) {
		if (name in api) {
			return `${api[name]}`;
		}
		return `scope.identifier("${name}")`
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
		console.log(xmlAttributes);
		return `scope.xmlExpression("${name}", {${xmlAttributes}}, ${xmlControlCode})`;
	}
	invokeExpression (name, invokeArguments) {
		if (name in api) {
			return `${api[name]}(${invokeArguments})`;
		}
		return `scope.invokeExpression("${name}", [invokeArguments])`;
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