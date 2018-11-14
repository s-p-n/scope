let namedTokens = [
	["true|false", "BOOL"],
	["let|var|public|protected|private", function (txt) {
		this.pushState("declLeft");
		if (/^(?:let|var)$/i.test(txt)) {
			return "LET";
		}
		return txt.toUpperCase();
	}],
	["is", "EQ"],
	["isnt", "INEQ"],
	"AND",
	"BECOMES",
	"BY",
	"DECREMENT",
	"ELSE",
	"FOR",
	"FROM",
	"HAS",
	"IF",
	"IMPORT",
	"IN",
	"INCREMENT",
	"MINUS",
	"NEW",
	"OF",
	"ONLY",
	"OR",
	"PLUS",
	"RANDOM",
	"TIMES",
	"TO",
	"UNDEFINED",
	"USE",
	"WHILE"
];

let builtTokens = new Map();
function setToken(search, result) {
	if (typeof search !== "string") {
		throw new Error(`Bad Named Token in Parser. (search expected to be string)
got: ${search}
`);
	}
	builtTokens.set(new RegExp("^(?:" + search + ")$", "i"), result);
}

for (let token of namedTokens) {
	if (!(token instanceof Array)) {
		setToken(token, token);
		continue;
	}
	if (token.length === 0) {
		continue;
	}
	if (token.length === 1) {
		setToken(token[0], token[0]);
		continue;
	}
	if (token.length === 2) {
		setToken(token[0], token[1]);
		continue;
	}
	throw new Error(`Bad Named Token in Parser. (incorrect token layout).

got: ${token}
`);
}

module.exports = function setNamedTokens(parser) {
	parser.yy.namedTokens = builtTokens;
}