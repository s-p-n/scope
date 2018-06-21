"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
class DeclarationExpression {
	constructor(name, type, value) {}

	render() {
		return `declarationExpression("${this.name}")`;
	}
}

exports.default = DeclarationExpression;