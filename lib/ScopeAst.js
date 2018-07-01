"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function indentString(l) {
	var r = "";
	var i;
	for (i = 0; i < l; i += 1) {
		r += i + " ";
	}
	return r;
}

class ScopeAst {
	constructor(data, type, body) {
		this.type = type;
		this.body = body;
		this.loc = {
			start: {
				line: data.lexer.yylloc.first_line,
				column: data.lexer.yylloc.first_column
			},
			end: {
				line: data.lexer.yylloc.last_line,
				column: data.lexer.yylloc.last_column
			}
		};
		this.raw = data.lexer.matched;
		this.line = data.lexer.yylloc.first_line;
	}

	get(indent) {
		var r = indentString(indent) + "(" + this.type;
		var rem = this.body;
		if (rem.length == 1 && !(rem[0] instanceof ast)) {
			r += " '" + rem[0] + "'";
		} else for (i in rem) {
			if (rem[i] instanceof ast) {
				r += "\n" + rem[i].get(indent + 1);
			} else {
				r += "\n" + indentString(indent + 1);
				r += "'" + rem[i] + "'";
			}
		}
		return r + /*"\n" + indentString(indent) +*/")";
	}
}

exports.default = ScopeAst;